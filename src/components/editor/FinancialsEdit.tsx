import React from 'react';
import { CompanyData } from '../../types';

interface FinancialsEditProps {
  companyData: CompanyData;
  onChange: (data: Partial<CompanyData>) => void;
}

const FinancialsEdit: React.FC<FinancialsEditProps> = ({ companyData, onChange }) => {
  const handleKpiChange = (index: number, field: 'name' | 'value', value: string) => {
    const updatedKpis = [...companyData.kpis];
    updatedKpis[index] = { ...updatedKpis[index], [field]: value };
    onChange({ kpis: updatedKpis });
  };

  const addKpi = () => {
    onChange({ kpis: [...companyData.kpis, { name: '', value: '' }] });
  };

  const removeKpi = (index: number) => {
    const updatedKpis = companyData.kpis.filter((_, i) => i !== index);
    onChange({ kpis: updatedKpis });
  };

  const handleRevenueDataChange = (isHistorical: boolean, index: number, field: 'year' | 'value', value: string) => {
    const newValue = field === 'value' ? parseFloat(value) || 0 : value;
    
    if (isHistorical) {
      const updatedHistorical = [...companyData.revenueData.historical];
      updatedHistorical[index] = { 
        ...updatedHistorical[index], 
        [field]: newValue 
      };
      onChange({ 
        revenueData: { 
          ...companyData.revenueData, 
          historical: updatedHistorical 
        } 
      });
    } else {
      const updatedProjected = [...companyData.revenueData.projected];
      updatedProjected[index] = { 
        ...updatedProjected[index], 
        [field]: newValue 
      };
      onChange({ 
        revenueData: { 
          ...companyData.revenueData, 
          projected: updatedProjected 
        } 
      });
    }
  };

  const handleEbitdaDataChange = (isHistorical: boolean, index: number, field: 'year' | 'value', value: string) => {
    const newValue = field === 'value' ? parseFloat(value) || 0 : value;
    
    if (isHistorical) {
      const updatedHistorical = [...companyData.ebitdaData.historical];
      updatedHistorical[index] = { 
        ...updatedHistorical[index], 
        [field]: newValue 
      };
      onChange({ 
        ebitdaData: { 
          ...companyData.ebitdaData, 
          historical: updatedHistorical 
        } 
      });
    } else {
      const updatedProjected = [...companyData.ebitdaData.projected];
      updatedProjected[index] = { 
        ...updatedProjected[index], 
        [field]: newValue 
      };
      onChange({ 
        ebitdaData: { 
          ...companyData.ebitdaData, 
          projected: updatedProjected 
        } 
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Key Performance Indicators (KPIs)
          </label>
          <button
            type="button"
            onClick={addKpi}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            + Add KPI
          </button>
        </div>
        
        <div className="space-y-3">
          {companyData.kpis.map((kpi, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="text"
                value={kpi.name}
                onChange={(e) => handleKpiChange(index, 'name', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="KPI Name"
              />
              <input
                type="text"
                value={kpi.value}
                onChange={(e) => handleKpiChange(index, 'value', e.target.value)}
                className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Value"
              />
              <button
                type="button"
                onClick={() => removeKpi(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Revenue Data (in millions $)</h3>
        
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-700 mb-2">Historical</h4>
          <div className="grid grid-cols-2 gap-4">
            {companyData.revenueData.historical.map((item, index) => (
              <React.Fragment key={`historical-${index}`}>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Year</label>
                  <input
                    type="text"
                    value={item.year}
                    onChange={(e) => handleRevenueDataChange(true, index, 'year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Value</label>
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => handleRevenueDataChange(true, index, 'value', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-700 mb-2">Projected</h4>
          <div className="grid grid-cols-2 gap-4">
            {companyData.revenueData.projected.map((item, index) => (
              <React.Fragment key={`projected-${index}`}>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Year</label>
                  <input
                    type="text"
                    value={item.year}
                    onChange={(e) => handleRevenueDataChange(false, index, 'year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Value</label>
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => handleRevenueDataChange(false, index, 'value', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">EBITDA Data (in millions $)</h3>
        
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-700 mb-2">Historical</h4>
          <div className="grid grid-cols-2 gap-4">
            {companyData.ebitdaData.historical.map((item, index) => (
              <React.Fragment key={`ebitda-historical-${index}`}>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Year</label>
                  <input
                    type="text"
                    value={item.year}
                    onChange={(e) => handleEbitdaDataChange(true, index, 'year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Value</label>
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => handleEbitdaDataChange(true, index, 'value', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2">Projected</h4>
          <div className="grid grid-cols-2 gap-4">
            {companyData.ebitdaData.projected.map((item, index) => (
              <React.Fragment key={`ebitda-projected-${index}`}>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Year</label>
                  <input
                    type="text"
                    value={item.year}
                    onChange={(e) => handleEbitdaDataChange(false, index, 'year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Value</label>
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => handleEbitdaDataChange(false, index, 'value', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialsEdit;