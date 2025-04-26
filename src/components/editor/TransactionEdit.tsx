import React from 'react';
import { CompanyData } from '../../types';

interface TransactionEditProps {
  companyData: CompanyData;
  onChange: (data: Partial<CompanyData>) => void;
}

const TransactionEdit: React.FC<TransactionEditProps> = ({ companyData, onChange }) => {
  const handleSuggestionChange = (index: number, value: string) => {
    const updatedSuggestions = [...companyData.transactionSuggestions];
    updatedSuggestions[index] = value;
    onChange({ transactionSuggestions: updatedSuggestions });
  };

  const addSuggestion = () => {
    onChange({ transactionSuggestions: [...companyData.transactionSuggestions, ''] });
  };

  const removeSuggestion = (index: number) => {
    const updatedSuggestions = companyData.transactionSuggestions.filter((_, i) => i !== index);
    onChange({ transactionSuggestions: updatedSuggestions });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Transaction Objective
        </label>
        <textarea
          value={companyData.transactionObjective}
          onChange={(e) => onChange({ transactionObjective: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the objective of the transaction..."
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Transaction Suggestions
          </label>
          <button
            type="button"
            onClick={addSuggestion}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            + Add Suggestion
          </button>
        </div>
        
        <div className="space-y-3">
          {companyData.transactionSuggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={suggestion}
                onChange={(e) => handleSuggestionChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeSuggestion(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionEdit;