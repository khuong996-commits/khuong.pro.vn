
import React, { useState } from 'react';
import type { CalculationResult } from '../types';
import { SparklesIcon, DocumentTextIcon, UsersIcon, ClipboardIcon, CheckIcon } from './Icons';

interface ResultDisplayProps {
  result: CalculationResult;
}

const formatCurrency = (value: number): string => {
  // Fix: Corrected Intl.FormatNumber to Intl.NumberFormat
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const { summary, splitDetails, calculationSteps, notes } = result;
  const [copied, setCopied] = useState(false);

  // HH Ròng chính xác là tổng của Phí Cty (10%) và Tổng Đội Nhóm (90%)
  const netBase = summary.companyCut + summary.finalCommission;

  const handleCopy = async () => {
    const lines = [
      "📊 BẢNG TÍNH HOA HỒNG CHI TIẾT",
      "------------------------------",
      summary.totalValue > 0 ? `💰 Tổng giá trị lô: ${formatCurrency(summary.totalValue)}` : null,
      summary.commissionRate > 0 ? `🔖 % Hoa hồng: ${summary.commissionRate}%` : null,
      summary.hotBonus > 0 ? `🔥 Thưởng nóng: ${formatCurrency(summary.hotBonus)}` : null,
      "------------------------------",
      `💸 Chi phí/Cắt máu: -${formatCurrency(summary.totalExpenses + summary.bloodCut)}`,
      `✨ HH RÒNG (MỐC TÍNH %): ${formatCurrency(netBase)}`,
      `🏢 Phí công ty (10%): -${formatCurrency(summary.companyCut)}`,
      `👥 TỔNG ĐỘI NHÓM (90%): ${formatCurrency(summary.finalCommission)}`,
      "",
      "📋 THỰC NHẬN CỤ THỂ (Đã gồm hoàn phí ứng):",
      ...splitDetails.map((p, i) => `${i + 1}. ${p.name} (${p.role}): ${formatCurrency(p.amount)}`),
      "",
      "------------------------------",
      "🤖 Trợ lý Tính Hoa Hồng (AI Powered)"
    ].filter(Boolean);

    const textToCopy = lines.join('\n');
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/80 animate-fade-in relative">
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
                <SparklesIcon className="w-6 h-6 text-violet-500 mr-3" />
                <h2 className="text-xl font-bold text-slate-800">Tổng kết bảng tính</h2>
            </div>
            <button 
                onClick={handleCopy}
                className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    copied 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-violet-600 hover:text-white hover:shadow-lg'
                }`}
            >
                {copied ? <CheckIcon className="w-4 h-4 mr-1.5" /> : <ClipboardIcon className="w-4 h-4 mr-1.5" />}
                {copied ? 'Đã sao chép' : 'Sao chép KQ'}
            </button>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 ring-2 ring-violet-500/5">
             <div className="flex justify-between items-center py-1.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hoa hồng Ròng</span>
                <span className="text-lg font-black text-slate-900">{formatCurrency(netBase)}</span>
             </div>
             <p className="text-[10px] text-slate-400 italic font-medium">Đây là số tiền còn lại sau khi trừ Chi phí & Cắt máu. 10% phí công ty và 90% đội nhóm được tính từ con số này.</p>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-slate-100 text-sm">
            <span className="text-slate-600">Phí công ty (10% HH Ròng)</span>
            <span className="font-bold text-red-600">-{formatCurrency(summary.companyCut)}</span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900 tracking-tight">Tổng đội nhóm (90% HH Ròng)</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiền hoa hồng để chia</span>
            </div>
            <span className="text-2xl font-black text-violet-600 tracking-tighter">{formatCurrency(summary.finalCommission)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/80 animate-fade-in" style={{ animationDelay: '150ms' }}>
        <div className="flex items-center mb-6">
          <UsersIcon className="w-6 h-6 text-violet-500 mr-3" />
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Thực nhận cuối cùng</h2>
        </div>
        <div className="space-y-4">
          {splitDetails.map((person, index) => (
            <div key={index} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 hover:border-violet-200 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-black text-slate-900 text-sm uppercase">{person.name}</p>
                  <p className="text-[11px] font-bold text-violet-500 uppercase tracking-tighter">{person.role} • {person.percentage}% HH Ròng</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-black text-green-700 tracking-tighter">{formatCurrency(person.amount)}</p>
                </div>
              </div>
              {person.calculation && <p className="text-[10px] text-slate-400 mt-2 font-medium italic border-t border-slate-100 pt-2">{person.calculation}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/80 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center mb-4">
          <DocumentTextIcon className="w-6 h-6 text-violet-500 mr-3" />
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Công thức tính AI</h2>
        </div>
        <div className="space-y-4 text-[11px] text-slate-600 font-mono leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p><span className="font-black text-violet-600 mr-1">B1:</span> {calculationSteps.step1}</p>
          <p><span className="font-black text-violet-600 mr-1">B2:</span> {calculationSteps.step2}</p>
          <p><span className="font-black text-violet-600 mr-1">B3:</span> {calculationSteps.step3}</p>
        </div>
      </div>

      {notes && notes.trim() && (
        <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-900 p-5 rounded-xl shadow-sm animate-fade-in" style={{ animationDelay: '450ms' }}>
          <p className="font-black text-xs uppercase tracking-widest mb-1">Ghi chú AI</p>
          <p className="text-sm font-medium leading-relaxed">{notes}</p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
