import React, { useState } from 'react';
import { ArrowLeft, Eye, Save } from 'lucide-react';
import { CompanyData, Template } from '../types';
import CompanyInfoEdit from './editor/CompanyInfoEdit';
import MarketInfoEdit from './editor/MarketInfoEdit';
import FinancialsEdit from './editor/FinancialsEdit';
import TransactionEdit from './editor/TransactionEdit';

interface EditorProps {
  template: Template;
  companyData: CompanyData;
  onDataChange: (data: CompanyData) => void;
  onBackToTemplates: () => void;
  onPreview: () => void;
}

const Editor: React.FC<EditorProps> = ({ 
  template, 
  companyData, 
  onDataChange, 
  onBackToTemplates,
  onPreview
}) => {
  const [activeTab, setActiveTab] = useState('company');

  const handleChange = (partialData: Partial<CompanyData>) => {
    onDataChange({ ...companyData, ...partialData });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'locationImage') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        handleChange({ [field]: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBackToTemplates}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back to Templates
        </button>
        
        <div className="flex space-x-3">
          <button 
            onClick={onPreview}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Eye size={18} className="mr-2" />
            Preview
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b">
          <nav className="flex overflow-x-auto">
            {['company', 'market', 'financials', 'transaction'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Information
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'company' && (
            <CompanyInfoEdit 
              companyData={companyData}
              onChange={handleChange}
              onFileUpload={handleFileUpload}
            />
          )}
          
          {activeTab === 'market' && (
            <MarketInfoEdit 
              companyData={companyData}
              onChange={handleChange}
            />
          )}
          
          {activeTab === 'financials' && (
            <FinancialsEdit 
              companyData={companyData}
              onChange={handleChange}
            />
          )}
          
          {activeTab === 'transaction' && (
            <TransactionEdit 
              companyData={companyData}
              onChange={handleChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;