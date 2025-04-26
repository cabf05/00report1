import React from 'react';
import { CompanyData, Template } from '../../types';
import { LineChart } from './common/LineChart';

interface TeaserTemplateProps {
  template: Template;
  companyData: CompanyData;
}

const MorganStanleyTeaserTemplate: React.FC<TeaserTemplateProps> = ({ template, companyData }) => {
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
      <header className="mb-8">
        <div 
          className="w-full h-1 mb-4"
          style={{ backgroundColor: template.secondaryColor }}
        ></div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {companyData.logo ? (
              <img src={companyData.logo} alt="Company Logo" className="h-10 mr-4" />
            ) : (
              <div className="h-10 w-24 bg-gray-100 flex items-center justify-center mr-4 text-sm text-gray-400">Logo</div>
            )}
            <div>
              <h1 className="text-2xl font-bold" style={{ color: template.primaryColor }}>
                {companyData.companyName}
              </h1>
              <p className="text-sm font-medium" style={{ color: template.secondaryColor }}>
                {companyData.location}
              </p>
            </div>
          </div>
          <div 
            className="px-4 py-2 text-white text-sm"
            style={{ backgroundColor: template.primaryColor }}
          >
            CONFIDENTIAL
          </div>
        </div>
        <div 
          className="w-full h-1 mt-4"
          style={{ backgroundColor: template.secondaryColor }}
        ></div>
      </header>

      {/* Three column layout */}
      <div className="flex-grow grid grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Market Section */}
          <div>
            <h2 
              className="text-lg font-bold mb-3" 
              style={{ color: template.secondaryColor }}
            >
              MARKET
            </h2>
            <div 
              className="p-4 rounded-sm border"
              style={{ borderColor: template.accentColor }}
            >
              <p className="text-sm leading-relaxed" style={{ color: template.primaryColor }}>
                {companyData.marketInfo}
              </p>
            </div>
          </div>
          
          {/* Location Image */}
          <div>
            <h2 
              className="text-lg font-bold mb-3" 
              style={{ color: template.secondaryColor }}
            >
              LOCATION
            </h2>
            <div className="overflow-hidden rounded-sm border" style={{ borderColor: template.accentColor }}>
              {companyData.locationImage ? (
                <img 
                  src={companyData.locationImage} 
                  alt={companyData.location} 
                  className="w-full h-40 object-cover" 
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Location Image</span>
                </div>
              )}
            </div>
          </div>
          
          {/* KPIs */}
          <div>
            <h2 
              className="text-lg font-bold mb-3" 
              style={{ color: template.secondaryColor }}
            >
              KEY METRICS
            </h2>
            <div className="space-y-2">
              {companyData.kpis.map((kpi, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center p-3 border"
                  style={{ borderColor: template.accentColor }}
                >
                  <p className="text-sm font-medium" style={{ color: template.primaryColor }}>
                    {kpi.name}
                  </p>
                  <p 
                    className="text-lg font-bold" 
                    style={{ color: template.secondaryColor }}
                  >
                    {kpi.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Middle column */}
        <div className="space-y-6">
          {/* Company Description */}
          <div>
            <h2 
              className="text-lg font-bold mb-3" 
              style={{ color: template.secondaryColor }}
            >
              COMPANY
            </h2>
            <div 
              className="p-4 rounded-sm border"
              style={{ borderColor: template.accentColor }}
            >
              <p className="text-sm leading-relaxed" style={{ color: template.primaryColor }}>
                {companyData.companyDescription}
              </p>
            </div>
          </div>
          
          {/* Company Strengths */}
          <div>
            <h2 
              className="text-lg font-bold mb-3" 
              style={{ color: template.secondaryColor }}
            >
              STRENGTHS
            </h2>
            <div 
              className="p-4 rounded-sm border"
              style={{ borderColor: template.accentColor }}
            >
              <ul className="list-none space-y-3">
                {companyData.companyStrengths.map((strength, index) => (
                  <li 
                    key={index} 
                    className="text-sm leading-relaxed flex items-start"
                    style={{ color: template.primaryColor }}
                  >
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-white text-xs"
                      style={{ backgroundColor: template.accentColor }}
                    >
                      {index + 1}
                    </div>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Revenue Chart */}
          <div>
            <h2 
              className="text-lg font-bold mb-3" 
              style={{ color: template.secondaryColor }}
            >
              REVENUE (M$)
            </h2>
            <div 
              className="p-3 rounded-sm border"
              style={{ borderColor: template.accentColor }}
            >
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
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          {/* EBITDA Chart */}
          <div>
            <h2 
              className="text-lg font-bold mb-3" 
              style={{ color: template.secondaryColor }}
            >
              EBITDA (M$)
            </h2>
            <div 
              className="p-3 rounded-sm border"
              style={{ borderColor: template.accentColor }}
            >
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
          
          {/* Transaction Objective */}
          <div>
            <h2 
              className="text-lg font-bold mb-3" 
              style={{ color: template.secondaryColor }}
            >
              OBJECTIVE
            </h2>
            <div 
              className="p-4 rounded-sm border"
              style={{ borderColor: template.accentColor }}
            >
              <p className="text-sm leading-relaxed" style={{ color: template.primaryColor }}>
                {companyData.transactionObjective}
              </p>
            </div>
          </div>
          
          {/* Transaction Suggestions */}
          <div>
            <h2 
              className="text-lg font-bold mb-3" 
              style={{ color: template.secondaryColor }}
            >
              TRANSACTION OPTIONS
            </h2>
            <div 
              className="p-4 rounded-sm border"
              style={{ borderColor: template.accentColor }}
            >
              <ul className="list-none space-y-3">
                {companyData.transactionSuggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    className="text-sm leading-relaxed"
                    style={{ color: template.primaryColor }}
                  >
                    <div className="flex items-start">
                      <span 
                        className="font-bold mr-2"
                        style={{ color: template.secondaryColor }}
                      >
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {suggestion}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-8">
        <div 
          className="w-full h-1 mb-3"
          style={{ backgroundColor: template.secondaryColor }}
        ></div>
        <div className="flex justify-between text-xs">
          <div style={{ color: template.secondaryColor }}>
            STRICTLY CONFIDENTIAL
          </div>
          <div style={{ color: template.primaryColor }}>
            This material is provided for information purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MorganStanleyTeaserTemplate;