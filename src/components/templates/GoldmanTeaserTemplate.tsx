import React from 'react';
import { CompanyData, Template } from '../../types';
import { LineChart } from './common/LineChart';

interface TeaserTemplateProps {
  template: Template;
  companyData: CompanyData;
}

const GoldmanTeaserTemplate: React.FC<TeaserTemplateProps> = ({ template, companyData }) => {
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
      {/* Header */}
      <header className="flex justify-between items-center mb-6 pb-4 border-b-2" style={{ borderColor: template.primaryColor }}>
        <div className="flex items-center">
          {companyData.logo ? (
            <img src={companyData.logo} alt="Company Logo" className="h-12 mr-4" />
          ) : (
            <div className="h-12 w-32 bg-gray-100 flex items-center justify-center mr-4 text-sm text-gray-400">Logo</div>
          )}
          <h1 className="text-2xl font-bold" style={{ color: template.primaryColor }}>
            {companyData.companyName}
          </h1>
        </div>
        <div className="text-right">
          <p className="text-sm" style={{ color: template.secondaryColor }}>STRICTLY CONFIDENTIAL</p>
          <p className="text-sm" style={{ color: template.secondaryColor }}>INVESTMENT OPPORTUNITY</p>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-grow grid grid-cols-3 gap-6">
        {/* Left column */}
        <div className="col-span-1 flex flex-col space-y-6">
          {/* Market Section */}
          <div 
            className="bg-gray-50 p-4 rounded-sm"
            style={{ border: `1px solid ${template.accentColor}` }}
          >
            <h2 
              className="text-lg font-bold mb-3 pb-2 border-b" 
              style={{ color: template.primaryColor, borderColor: template.accentColor }}
            >
              MARKET
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: template.primaryColor }}>
              {companyData.marketInfo}
            </p>
          </div>
          
          {/* Location Image */}
          <div>
            <h2 
              className="text-lg font-bold mb-3" 
              style={{ color: template.primaryColor }}
            >
              {companyData.location}
            </h2>
            <div className="aspect-video overflow-hidden rounded-sm">
              {companyData.locationImage ? (
                <img 
                  src={companyData.locationImage} 
                  alt={companyData.location} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Location Image</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Transaction Objective */}
          <div>
            <h2 
              className="text-lg font-bold mb-3 pb-2 border-b" 
              style={{ color: template.primaryColor, borderColor: template.accentColor }}
            >
              OBJECTIVE
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: template.primaryColor }}>
              {companyData.transactionObjective}
            </p>
          </div>
        </div>
        
        {/* Middle and Right columns */}
        <div className="col-span-2">
          {/* Company Description */}
          <div className="mb-6">
            <h2 
              className="text-lg font-bold mb-3 pb-2 border-b" 
              style={{ color: template.primaryColor, borderColor: template.accentColor }}
            >
              COMPANY
            </h2>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: template.primaryColor }}>
              {companyData.companyDescription}
            </p>
            
            <h3 
              className="text-md font-bold mb-2" 
              style={{ color: template.secondaryColor }}
            >
              KEY STRENGTHS
            </h3>
            <ul className="list-disc pl-5 mb-6">
              {companyData.companyStrengths.map((strength, index) => (
                <li 
                  key={index} 
                  className="text-sm mb-1 leading-relaxed"
                  style={{ color: template.primaryColor }}
                >
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          
          {/* KPIs */}
          <div className="mb-6">
            <h2 
              className="text-lg font-bold mb-3 pb-2 border-b" 
              style={{ color: template.primaryColor, borderColor: template.accentColor }}
            >
              HIGHLIGHTS
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {companyData.kpis.map((kpi, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 p-3 rounded-sm text-center"
                  style={{ border: `1px solid ${template.accentColor}` }}
                >
                  <p 
                    className="text-xl font-bold" 
                    style={{ color: template.secondaryColor }}
                  >
                    {kpi.value}
                  </p>
                  <p className="text-sm" style={{ color: template.primaryColor }}>
                    {kpi.name}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 
                  className="text-md font-semibold mb-2 text-center" 
                  style={{ color: template.secondaryColor }}
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
                  className="text-md font-semibold mb-2 text-center" 
                  style={{ color: template.secondaryColor }}
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
          
          {/* Transaction Suggestions */}
          <div>
            <h2 
              className="text-lg font-bold mb-3 pb-2 border-b" 
              style={{ color: template.primaryColor, borderColor: template.accentColor }}
            >
              TRANSACTION STRUCTURE
            </h2>
            <ul className="list-disc pl-5">
              {companyData.transactionSuggestions.map((suggestion, index) => (
                <li 
                  key={index} 
                  className="text-sm mb-1 leading-relaxed"
                  style={{ color: template.primaryColor }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-6 pt-4 border-t text-xs flex justify-between items-center" style={{ borderColor: template.accentColor }}>
        <div style={{ color: template.secondaryColor }}>
          CONFIDENTIAL INVESTMENT TEASER
        </div>
        <div style={{ color: template.primaryColor }}>
          This document is for discussion purposes only and does not constitute an offer to sell or a solicitation of an offer to purchase any security.
        </div>
      </footer>
    </div>
  );
};

export default GoldmanTeaserTemplate;