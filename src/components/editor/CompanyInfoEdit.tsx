import React from 'react';
import { Upload } from 'lucide-react';
import { CompanyData } from '../../types';

interface CompanyInfoEditProps {
  companyData: CompanyData;
  onChange: (data: Partial<CompanyData>) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'locationImage') => void;
}

const CompanyInfoEdit: React.FC<CompanyInfoEditProps> = ({ 
  companyData, 
  onChange,
  onFileUpload 
}) => {
  const handleStrengthChange = (index: number, value: string) => {
    const updatedStrengths = [...companyData.companyStrengths];
    updatedStrengths[index] = value;
    onChange({ companyStrengths: updatedStrengths });
  };

  const addStrength = () => {
    onChange({ companyStrengths: [...companyData.companyStrengths, ''] });
  };

  const removeStrength = (index: number) => {
    const updatedStrengths = companyData.companyStrengths.filter((_, i) => i !== index);
    onChange({ companyStrengths: updatedStrengths });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            value={companyData.companyName}
            onChange={(e) => onChange({ companyName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={companyData.location}
            onChange={(e) => onChange({ location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Logo
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <div className="h-20 w-32 border border-gray-300 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
              {companyData.logo ? (
                <img 
                  src={companyData.logo} 
                  alt="Company Logo" 
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-gray-400 text-sm">No logo</span>
              )}
            </div>
            <label className="cursor-pointer px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 flex items-center">
              <Upload size={16} className="mr-2" />
              <span>Upload</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFileUpload(e, 'logo')}
              />
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location Image
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <div className="h-20 w-32 border border-gray-300 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
              {companyData.locationImage ? (
                <img 
                  src={companyData.locationImage} 
                  alt="Location" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">No image</span>
              )}
            </div>
            <label className="cursor-pointer px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 flex items-center">
              <Upload size={16} className="mr-2" />
              <span>Upload</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFileUpload(e, 'locationImage')}
              />
            </label>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Description
        </label>
        <textarea
          value={companyData.companyDescription}
          onChange={(e) => onChange({ companyDescription: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Company Strengths
          </label>
          <button
            type="button"
            onClick={addStrength}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            + Add Strength
          </button>
        </div>
        
        <div className="space-y-3">
          {companyData.companyStrengths.map((strength, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={strength}
                onChange={(e) => handleStrengthChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeStrength(index)}
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

export default CompanyInfoEdit;