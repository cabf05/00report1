import React from 'react';
import { CompanyData } from '../../types';

interface MarketInfoEditProps {
  companyData: CompanyData;
  onChange: (data: Partial<CompanyData>) => void;
}

const MarketInfoEdit: React.FC<MarketInfoEditProps> = ({ companyData, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Market Information
        </label>
        <textarea
          value={companyData.marketInfo}
          onChange={(e) => onChange({ marketInfo: e.target.value })}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the market context, size, growth trends, and other relevant information..."
        />
      </div>
    </div>
  );
};

export default MarketInfoEdit;