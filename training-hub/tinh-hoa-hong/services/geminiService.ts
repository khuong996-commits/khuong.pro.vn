
import { GoogleGenAI, Type } from "@google/genai";
import type { CalculationResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RULES = `
Bạn là trợ lý tính hoa hồng môi giới bất động sản tên là "Tính hoa hồng".
Nhiệm vụ của bạn: tính toán và phân chia hoa hồng dựa trên QUY TRÌNH NGHIÊM NGẶT 5 BƯỚC sau:

BƯỚC 1: XÁC ĐỊNH HOA HỒNG GỘP (GROSS)
- Nếu có giá lô đất: HH Gộp = (Giá lô - Thưởng nóng) * %Hoa hồng + Thưởng nóng.
- Nếu nhập thẳng tiền: HH Gộp = Số tiền người dùng nhập.

BƯỚC 2: TÍNH HOA HỒNG RÒNG (NET BASE) - ĐÂY LÀ MỐC TỐI QUAN TRỌNG
- HH Ròng = HH Gộp - Tổng chi phí - Tiền cắt máu.
- Ví dụ của người dùng: Tổng HH 105tr, chi phí 5tr => HH Ròng = 100tr. 
- Mọi con số % sau đây PHẢI tính trên HH Ròng này.

BƯỚC 3: TRÍCH PHÍ CÔNG TY (10% HH RÒNG)
- Phí Công ty = 10% * HH Ròng.
- Theo ví dụ: 10% của 100tr = 10tr (Không được tính 10% của 105tr).

BƯỚC 4: PHÂN CHIA ĐỘI NHÓM (90% HH RÒNG)
- Tổng tiền dành cho đội nhóm = 90% * HH Ròng.
- Tỷ lệ cá nhân: Tiền HH cá nhân = HH Ròng * (% của cá nhân / 100).
- Tổng tỷ lệ các cá nhân trong danh sách phải cộng lại bằng đúng 90%.

BƯỚC 5: HOÀN CHI PHÍ (REIMBURSEMENT)
- Nếu một thành viên có tên trong danh sách "Chi phí khác" (là người đã ứng tiền), họ phải được CỘNG HOÀN lại số tiền đó vào số tiền thực nhận.
- Thực nhận cuối cùng = (Tiền HH theo tỷ lệ) + (Tiền chi phí đã ứng).

BƯỚC 6: TỔNG HỢP THEO TÊN (AGGREGATION) - QUAN TRỌNG
- Nếu cùng một người (cùng tên) xuất hiện ở nhiều vai trò khác nhau (ví dụ: vừa ở Đội Chiến Dịch, vừa ở Phân chia đội nhóm), bạn PHẢI gộp họ thành MỘT dòng duy nhất trong splitDetails.
- 'amount' sẽ là tổng tiền thực nhận từ tất cả các vai trò của người đó.
- 'percentage' sẽ là tổng tỷ lệ % của người đó.
- 'role' sẽ liệt kê tất cả các vai trò của họ, nối bằng dấu cộng (ví dụ: 'Nguồn khách (Chiến dịch) + Gọi khách').
- 'calculation' PHẢI diễn giải chi tiết từng phần đóng góp: "(HH Ròng * % vai trò 1) + (HH Ròng * % vai trò 2) + Hoàn ứng (nếu có)".

YÊU CẦU ĐẦU RA:
- Trả về JSON chính xác. 
- "finalCommission" trong summary là tổng tiền chia cho đội nhóm (90% HH Ròng).
- "amount" trong splitDetails là con số thực nhận cuối cùng (đã gồm tiền hoàn ứng và đã được gộp nếu trùng tên).
- Đảm bảo không có tên nào bị lặp lại trong danh sách splitDetails.
`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.OBJECT,
            properties: {
                totalValue: { type: Type.NUMBER, description: 'Giá trị lô đất' },
                commissionRate: { type: Type.NUMBER, description: '% HH' },
                hotBonus: { type: Type.NUMBER, description: 'Thưởng nóng' },
                totalExpenses: { type: Type.NUMBER, description: 'Tổng chi phí ứng trước' },
                bloodCut: { type: Type.NUMBER, description: 'Tiền cắt máu' },
                companyCut: { type: Type.NUMBER, description: 'Phí công ty (10% của HH Ròng)' },
                finalCommission: { type: Type.NUMBER, description: 'Tổng tiền đội nhóm nhận (90% của HH Ròng)' },
            },
            required: ["totalValue", "commissionRate", "hotBonus", "totalExpenses", "bloodCut", "companyCut", "finalCommission"]
        },
        splitDetails: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    role: { type: Type.STRING },
                    percentage: { type: Type.NUMBER },
                    amount: { type: Type.NUMBER, description: 'Tiền HH theo % + Hoàn chi phí' },
                    calculation: { type: Type.STRING, description: 'Giải thích: (HH Ròng * %) + Hoàn ứng' },
                },
                required: ["name", "role", "percentage", "amount"]
            },
        },
        calculationSteps: {
            type: Type.OBJECT,
            properties: {
                step1: { type: Type.STRING, description: 'Cách tính HH Gộp' },
                step2: { type: Type.STRING, description: 'Cách tính HH Ròng (sau trừ phí/cắt máu)' },
                step3: { type: Type.STRING, description: 'Cách chia 10/90' },
            },
            required: ["step1", "step2", "step3"]
        },
        notes: { type: Type.STRING },
    },
    required: ["summary", "splitDetails", "calculationSteps"]
};

export const calculateCommission = async (userInput: string): Promise<CalculationResult> => {
    const prompt = `
    ${RULES}
    Hãy phân tích và tính toán cho đầu vào sau:
    """${userInput}"""
    `;

    try {
        const response = await ai.models.generateContent({
            // Fix: Updated model to gemini-3-flash-preview as recommended for basic text/reasoning tasks.
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        return JSON.parse(response.text.trim()) as CalculationResult;
    } catch (error) {
        console.error("Gemini Error:", error);
        throw new Error("Lỗi khi gọi AI xử lý dữ liệu.");
    }
};
