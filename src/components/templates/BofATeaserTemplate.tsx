import React from 'react';
import { CompanyData, Template } from '../../types';
import { LineChart } from './common/LineChart';

interface TeaserTemplateProps {
  template: Template;
  companyData: CompanyData;
}

const BofATeaserTemplate: React.FC<TeaserTemplateProps> = ({ template, companyData }) => {
  return (
    <div 
      className="w-full h-full flex flex-col"
      style={{ 
        fontFamily: template.fontFamily,
        padding: '15mm',
        color: template.primaryColor,
        backgroundColor: template.backgroundColor
      }}
    >
      {/* Header with red banner */}
      <header className="relative mb-8">
        <div 
          className="absolute top-0 left-0 right-0 h-16" 
          style={{ backgroundColor: template.secondaryColor }}
        ></div>
        
        <div className="relative flex justify-between items-center pt-3 pb-3 px-4">
          <div className="flex items-center">
            {companyData.logo ? (
              <img src={companyData.logo} alt="Company Logo" className="h-10 mr-4 bg-white p-1 rounded" />
            ) : (
              <div className="h-10 w-24 bg-white flex items-center justify-center mr-4 text-sm text-gray-400 rounded">Logo</div>
            )}
            <h1 className="text-2xl font-bold text-white">
              {companyData.companyName}
            </h1>
          </div>
          <div className="bg-white px-3 py-1 rounded text-sm" style={{ color: template.secondaryColor }}>
            <span className="font-bold">CONFIDENTIAL OPPORTUNITY</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-grow grid grid-cols-12 gap-6">
        {/* Left column - 5/12 */}
        <div className="col-span-5 space-y-6">
          {/* Location Image */}
          <div className="mb-6">
            <div 
              className="text-sm font-bold py-2 px-4 text-white mb-3"
              style={{ backgroundColor: template.secondaryColor }}
            >
              {companyData.location.toUpperCase()}
            </div>
            <div className="overflow-hidden border" style={{ borderColor: template.accentColor }}>
              {companyData.locationImage ? (
                <img 
                  src={companyData.locationImage} 
                  alt={companyData.location} 
                  className="w-full h-48 object-cover" 
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Location Image</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Market Section */}
          <div>
            <div 
              className="text-sm font-bold py-2 px-4 text-white mb-3"
              style={{ backgroundColor: template.secondaryColor }}
            >
              MARKET OVERVIEW
            </div>
            <div className="border p-4" style={{ borderColor: template.accentColor }}>
              <p className="text-sm leading-relaxed" style={{ color: template.primaryColor }}>
                {companyData.marketInfo}
              </p>
            </div>
          </div>
          
          {/* Transaction Objective */}
          <div>
            <div 
              className="text-sm font-bold py-2 px-4 text-white mb-3"
              style={{ backgroundColor: template.secondaryColor }}
            >
              TRANSACTION OBJECTIVE
            </div>
            <div className="border p-4" style={{ borderColor: template.accentColor }}>
              <p className="text-sm leading-relaxed" style={{ color: template.primaryColor }}>
                {companyData.transactionObjective}
              </p>
            </div>
          </div>
        </div>
        
        {/* Right column - 7/12 */}
        <div className="col-span-7">
          {/* Company Description */}
          <div className="mb-6">
            <div 
              className="text-sm font-bold py-2 px-4 text-white mb-3"
              style={{ backgroundColor: template.secondaryColor }}
            >
              COMPANY PROFILE
            </div>
            <div className="border p-4 mb-6" style={{ borderColor: template.accentColor }}>
              <p className="text-sm leading-relaxed" style={{ color: template.primaryColor }}>
                {companyData.companyDescription}
              </p>
            </div>
            
            <div 
              className="text-sm font-bold py-2 px-4 text-white mb-3"
              style={{ backgroundColor: template.secondaryColor }}
            >
              KEY STRENGTHS
            </div>
            <div className="border p-4" style={{ borderColor: template.accentColor }}>
              <ul className="list-none">
                {companyData.companyStrengths.map((strength, index) => (
                  <li 
                    key={index} 
                    className="text-sm mb-2 leading-relaxed flex items-start"
                    style={{ color: template.primaryColor }}
                  >
                    <div className="font-bold mr-2" style={{ color: template.secondaryColor }}>•</div>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* KPIs */}
          <div className="mb-6">
            <div 
              className="text-sm font-bold py-2 px-4 text-white mb-3"
              style={{ backgroundColor: template.secondaryColor }}
            >
              FINANCIAL HIGHLIGHTS
            </div>
            <div className="border p-4" style={{ borderColor: template.accentColor }}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {companyData.kpis.map((kpi, index) => (
                  <div 
                    key={index} 
                    className="p-3 text-center border"
                    style={{ borderColor: template.secondaryColor }}
                  >
                    <p 
                      className="text-xl font-bold" 
                      style={{ color: template.secondaryColor }}
                    >
                      {kpi.value}
                    </p>
                    <p className="text-xs mt-1" style={{ color: template.primaryColor }}>
                      {kpi.name}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 
                    className="text-sm font-semibold mb-2 text-center" 
                    style={{ color: template.primaryColor }}
                  >
                    Revenue (M$)
                  </h3>
                  <LineChart 
                    historicalData={companyData.revenueData.historical} 
                    projectedData={companyData.revenueData.projected}
                    colors={{
                      historical: template.secondaryColor,
                      projected: template.accentColor,
                      grid: '#e5e7eb'
                    }}
                  />
                </div>
                <div>
                  <h3 
                    className="text-sm font-semibold mb-2 text-center" 
                    style={{ color: template.primaryColor }}
                  >
                    EBITDA (M$)
                  </h3>
                  <LineChart 
                    historicalData={companyData.ebitdaData.historical} 
                    projectedData={companyData.ebitdaData.projected}
                    colors={{
                      historical: template.secondaryColor,
                      projected: template.accentColor,
                      grid: '#e5e7eb'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Transaction Suggestions */}
          <div>
            <div 
              className="text-sm font-bold py-2 px-4 text-white mb-3"
              style={{ backgroundColor: template.secondaryColor }}
            >
              TRANSACTION OPTIONS
            </div>
            <div className="border p-4" style={{ borderColor: template.accentColor }}>
              <ul className="list-none grid grid-cols-1 gap-2">
                {companyData.transactionSuggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    className="text-sm leading-relaxed flex items-center p-2 border"
                    style={{ borderColor: '#e5e7eb', color: template.primaryColor }}
                  >
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center mr-3 text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: template.secondaryColor }}
                    >
                      {index + 1}
                    </div>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer 
        className="mt-6 pt-3 text-xs text-white"
        style={{ backgroundColor: template.secondaryColor }}
      >
        <div className="px-4 py-2 flex justify-between">
          <div>
            CONFIDENTIAL INVESTMENT OPPORTUNITY
          </div>
          <div>
            This document is for informational purposes only and does not constitute an offer to sell or solicitation of an offer to buy any securities.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BofATeaserTemplate;