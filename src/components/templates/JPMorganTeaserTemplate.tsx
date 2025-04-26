import React from 'react';
import { CompanyData, Template } from '../../types';
import { LineChart } from './common/LineChart';

interface TeaserTemplateProps {
  template: Template;
  companyData: CompanyData;
}

const JPMorganTeaserTemplate: React.FC<TeaserTemplateProps> = ({ template, companyData }) => {
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
      <header className="mb-6">
        <div className="flex justify-between items-center pb-4">
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
          <div 
            className="px-4 py-2 text-white text-sm font-bold"
            style={{ backgroundColor: template.primaryColor }}
          >
            CONFIDENTIAL
          </div>
        </div>
        <div 
          className="w-full h-1"
          style={{ backgroundColor: template.secondaryColor }}
        ></div>
      </header>

      {/* Main content */}
      <div className="flex-grow grid grid-cols-12 gap-6">
        {/* Left column */}
        <div className="col-span-4 space-y-6">
          {/* Market Section */}
          <div className="border rounded-sm p-4" style={{ borderColor: template.secondaryColor }}>
            <h2 
              className="text-lg font-bold mb-3 pb-2" 
              style={{ color: template.secondaryColor, borderBottom: `2px solid ${template.secondaryColor}` }}
            >
              MARKET OVERVIEW
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: template.primaryColor }}>
              {companyData.marketInfo}
            </p>
          </div>
          
          {/* Location Image */}
          <div>
            <h2 
              className="text-lg font-bold mb-3 pb-2" 
              style={{ color: template.secondaryColor, borderBottom: `2px solid ${template.secondaryColor}` }}
            >
              {companyData.location.toUpperCase()}
            </h2>
            <div className="overflow-hidden rounded-sm">
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
          
          {/* Transaction Objective */}
          <div className="border rounded-sm p-4" style={{ borderColor: template.accentColor }}>
            <h2 
              className="text-lg font-bold mb-3 pb-2" 
              style={{ color: template.secondaryColor, borderBottom: `2px solid ${template.secondaryColor}` }}
            >
              TRANSACTION OBJECTIVE
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: template.primaryColor }}>
              {companyData.transactionObjective}
            </p>
          </div>
        </div>
        
        {/* Middle and Right columns */}
        <div className="col-span-8">
          {/* Company Description */}
          <div className="mb-6">
            <h2 
              className="text-lg font-bold mb-3 pb-2" 
              style={{ color: template.secondaryColor, borderBottom: `2px solid ${template.secondaryColor}` }}
            >
              COMPANY PROFILE
            </h2>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: template.primaryColor }}>
              {companyData.companyDescription}
            </p>
            
            <h3 
              className="text-md font-bold mb-2" 
              style={{ color: template.primaryColor }}
            >
              KEY STRENGTHS
            </h3>
            <ul className="list-none mb-6">
              {companyData.companyStrengths.map((strength, index) => (
                <li 
                  key={index} 
                  className="text-sm mb-2 pl-4 leading-relaxed flex items-start"
                  style={{ color: template.primaryColor }}
                >
                  <span className="mr-2 text-lg" style={{ color: template.secondaryColor }}>•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          
          {/* KPIs */}
          <div className="mb-6">
            <h2 
              className="text-lg font-bold mb-4 pb-2" 
              style={{ color: template.secondaryColor, borderBottom: `2px solid ${template.secondaryColor}` }}
            >
              FINANCIAL HIGHLIGHTS
            </h2>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {companyData.kpis.map((kpi, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-sm text-center"
                  style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff', border: `1px solid ${template.secondaryColor}` }}
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
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 
                  className="text-md font-semibold mb-2 text-center" 
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
                  className="text-md font-semibold mb-2 text-center" 
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
          
          {/* Transaction Suggestions */}
          <div>
            <h2 
              className="text-lg font-bold mb-3 pb-2" 
              style={{ color: template.secondaryColor, borderBottom: `2px solid ${template.secondaryColor}` }}
            >
              SUGGESTED TRANSACTION OPTIONS
            </h2>
            <ul className="list-none">
              {companyData.transactionSuggestions.map((suggestion, index) => (
                <li 
                  key={index} 
                  className="text-sm mb-2 pl-4 leading-relaxed flex items-start"
                  style={{ color: template.primaryColor }}
                >
                  <div 
                    className="mr-3 w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-white font-bold text-xs"
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
      
      {/* Footer */}
      <footer className="mt-6 pt-4 border-t text-xs" style={{ borderColor: template.secondaryColor }}>
        <div className="flex justify-between">
          <div style={{ color: template.secondaryColor }}>
            STRICTLY PRIVATE AND CONFIDENTIAL
          </div>
          <div style={{ color: template.primaryColor }}>
            For qualified investors only. This document does not constitute an offer to sell or solicitation of an offer to buy.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JPMorganTeaserTemplate;