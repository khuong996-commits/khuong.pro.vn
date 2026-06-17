import re

file_path = '/Users/khuongtrinh/Downloads/antigravity/CONG_VIEC/Nhan_su/TRAINING_HUB/BANG_HANG_TL_LAND.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add CSS root variables
css_vars = """    --gradient-hoa-lac: linear-gradient(135deg, #ea580c, #dc2626);
    --gradient-son-tay: linear-gradient(135deg, #10b981, #059669);
    --gradient-khac: linear-gradient(135deg, #64748b, #475569);"""
content = content.replace("--gradient-hoa-lac: linear-gradient(135deg, #ea580c, #dc2626);", css_vars)

# 2. Add CSS pseudo classes for sub-region-header
sub_region_css = """.sub-region-header.hoa-lac::before { background: var(--gradient-hoa-lac); }
.sub-region-header.son-tay::before { background: var(--gradient-son-tay); }
.sub-region-header.khac::before { background: var(--gradient-khac); }"""
content = content.replace(".sub-region-header.hoa-lac::before { background: var(--gradient-hoa-lac); }", sub_region_css)

# 3. Add CSS pseudo classes for product-card
card_css = """.product-card.hoa-lac::before { background: var(--gradient-hoa-lac); }
.product-card.son-tay::before { background: var(--gradient-son-tay); }
.product-card.khac::before { background: var(--gradient-khac); }"""
content = content.replace(".product-card.hoa-lac::before { background: var(--gradient-hoa-lac); }", card_css)

# 4. Extract and remove Xuan Khanh products from Hoa Lac
pattern1 = r"""\s*\{\s*name:\s*'63 lô Xuân Khanh, Sơn Tây',[\s\S]*?\},"""
content = re.sub(pattern1, "", content)

pattern2 = r"""\s*\{\s*name:\s*'55 lô Xuân Khanh, Sơn Tây',[\s\S]*?\},"""
content = re.sub(pattern2, "", content)

pattern3 = r"""\s*\{\s*name:\s*'43 lô Xuân Khanh, Sơn Tây',[\s\S]*?\},"""
content = re.sub(pattern3, "", content)

# Remove trailing comma from the last element if necessary (though in our case they were middle elements except maybe one, wait, they were in the middle).

# 5. Append new regions to the regions array
# We need to find the end of the regions array. It ends around line 999 where it says:
#                     ]
#                 }
#             ]
#         }
#     ]
# };

regions_to_add = """        },
        // =============================================
        // KHU VỰC 4: SƠN TÂY
        // =============================================
        {
            id: 'son-tay',
            name: 'Sơn Tây',
            icon: 'fa-solid fa-map-location-dot',
            gradient: 'var(--gradient-son-tay)',
            subRegions: [
                {
                    name: null,
                    products: [
                        {
                            name: '63 lô Xuân Khanh, Sơn Tây',
                            totalPrice: '1,9 tỷ',
                            unitPrice: '38 triệu/m²',
                            area: '50 m²',
                            frontage: '',
                            commission: '4% + thưởng 50 triệu + vé bốc thăm Tucson và iPhone 17 Promax'
                        },
                        {
                            name: '55 lô Xuân Khanh, Sơn Tây',
                            totalPrice: '2 tỷ',
                            unitPrice: '41 – 49 triệu/m²',
                            area: '50 – 61 m²',
                            frontage: '',
                            commission: '4% + thưởng 50 triệu + vé bốc thăm Tucson và iPhone 17 Promax'
                        },
                        {
                            name: '43 lô Xuân Khanh, Sơn Tây',
                            totalPrice: '1,6 tỷ – 1,8 tỷ',
                            unitPrice: '33,5 – 41 triệu/m²',
                            area: '50 – 51 m²',
                            frontage: '4,2 – 5,6 m',
                            commission: '4% + thưởng 50 triệu + vé bốc thăm Tucson và iPhone 17 Promax',
                            note: 'Còn 2 lô'
                        }
                    ]
                }
            ]
        },
        // =============================================
        // KHU VỰC 5: THỊ TRƯỜNG KHÁC
        // =============================================
        {
            id: 'khac',
            name: 'Thị Trường Khác',
            icon: 'fa-solid fa-earth-asia',
            gradient: 'var(--gradient-khac)',
            subRegions: [
                {
                    name: null,
                    products: []
                }
            ]
        }
    ]
};"""

content = content.replace("        }\n    ]\n};", regions_to_add)
content = content.replace("        }\r\n    ]\r\n};", regions_to_add)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Update completed.")
