import React from 'react';
import { CompanyData, Template } from '../../types';
import { LineChart } from './common/LineChart';

interface TeaserTemplateProps {
  template: Template;
  companyData: CompanyData;
}

const CreditSuisseTeaserTemplate: React.FC<TeaserTemplateProps> = ({ template, companyData }) => {
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
      {/* Header with Swiss inspiration */}
      <header className="flex justify-between items-center mb-6 pb-6 border-b-2" style={{ borderColor: template.secondaryColor }}>
        <div className="flex items-center space-x-4">
          {companyData.logo ? (
            <img src={companyData.logo} alt="Company Logo" className="h-12" />
          ) : (
            <div className="h-12 w-32 bg-gray-100 flex items-center justify-center text-sm text-gray-400">Logo</div>
          )}
          <div className="border-l-2 pl-4" style={{ borderColor: template.secondaryColor }}>
            <h1 className="text-2xl font-bold" style={{ color: template.primaryColor }}>
              {companyData.companyName}
            </h1>
            <p className="text-sm" style={{ color: template.secondaryColor }}>
              {companyData.location}
            </p>
          </div>
        </div>
        <div 
          className="px-4 py-2 text-sm"
          style={{ 
            color: '#ffffff',
            backgroundColor: template.secondaryColor,
            borderRadius: '0' 
          }}
        >
          CONFIDENTIAL INVESTMENT OPPORTUNITY
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="flex-grow grid grid-cols-4 gap-6">
        {/* First column */}
        <div className="col-span-1 space-y-6">
          {/* Market Section */}
          <div>
            <h2 
              className="text-sm font-bold border-b-2 pb-2 mb-3 uppercase" 
              style={{ 
                color: template.secondaryColor, 
                borderColor: template.accentColor 
              }}
            >
              Market Analysis
            </h2>
            <div className="text-sm leading-relaxed" style={{ color: template.primaryColor }}>
              {companyData.marketInfo}
            </div>
          </div>
          
          {/* Location Image */}
          <div>
            <h2 
              className="text-sm font-bold border-b-2 pb-2 mb-3 uppercase" 
              style={{ 
                color: template.secondaryColor, 
                borderColor: template.accentColor 
              }}
            >
              Geographic Presence
            </h2>
            <div className="overflow-hidden">
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
          
          {/* KPIs in vertical layout */}
          <div>
            <h2 
              className="text-sm font-bold border-b-2 pb-2 mb-3 uppercase" 
              style={{ 
                color: template.secondaryColor, 
                borderColor: template.accentColor 
              }}
            >
              Key Performance Metrics
            </h2>
            <div className="space-y-3">
              {companyData.kpis.map((kpi, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center p-2 bg-gray-50"
                >
                  <p className="text-xs font-medium" style={{ color: template.primaryColor }}>
                    {kpi.name}
                  </p>
                  <p 
                    className="text-base font-bold" 
                    style={{ color: template.secondaryColor }}
                  >
                    {kpi.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Middle columns - span 2 */}
        <div className="col-span-2 space-y-6">
          {/* Company Description */}
          <div>
            <h2 
              className="text-sm font-bold border-b-2 pb-2 mb-3 uppercase" 
              style={{ 
                color: template.secondaryColor, 
                borderColor: template.accentColor 
              }}
            >
              Company Overview
            </h2>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: template.primaryColor }}>
              {companyData.companyDescription}
            </p>
          </div>
          
          {/* Key Strengths */}
          <div>
            <h2 
              className="text-sm font-bold border-b-2 pb-2 mb-3 uppercase" 
              style={{ 
                color: template.secondaryColor, 
                borderColor: template.accentColor 
              }}
            >
              Strategic Advantages
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {companyData.companyStrengths.map((strength, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-2 bg-gray-50"
                >
                  <div 
                    className="w-5 h-5 flex items-center justify-center rounded-full mr-2 text-white text-xs flex-shrink-0"
                    style={{ backgroundColor: template.secondaryColor }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm" style={{ color: template.primaryColor }}>
                    {strength}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 
                className="text-sm font-bold border-b-2 pb-2 mb-3 uppercase" 
                style={{ 
                  color: template.secondaryColor, 
                  borderColor: template.accentColor 
                }}
              >
                Revenue Development (M$)
              </h2>
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
              <h2 
                className="text-sm font-bold border-b-2 pb-2 mb-3 uppercase" 
                style={{ 
                  color: template.secondaryColor, 
                  borderColor: template.accentColor 
                }}
              >
                EBITDA Development (M$)
              </h2>
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
        
        {/* Right column */}
        <div className="col-span-1 space-y-6">
          {/* Transaction Objective */}
          <div>
            <h2 
              className="text-sm font-bold border-b-2 pb-2 mb-3 uppercase" 
              style={{ 
                color: template.secondaryColor, 
                borderColor: template.accentColor 
              }}
            >
              Transaction Objective
            </h2>
            <div 
              className="p-3 bg-gray-50"
            >
              <p className="text-sm leading-relaxed" style={{ color: template.primaryColor }}>
                {companyData.transactionObjective}
              </p>
            </div>
          </div>
          
          {/* Transaction Suggestions */}
          <div>
            <h2 
              className="text-sm font-bold border-b-2 pb-2 mb-3 uppercase" 
              style={{ 
                color: template.secondaryColor, 
                borderColor: template.accentColor 
              }}
            >
              Transaction Alternatives
            </h2>
            <div className="space-y-3">
              {companyData.transactionSuggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="p-3 text-sm leading-relaxed bg-gray-50"
                  style={{ color: template.primaryColor, borderLeft: `3px solid ${template.secondaryColor}` }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-6 pt-4 border-t-2 text-xs" style={{ borderColor: template.secondaryColor }}>
        <div className="grid grid-cols-3">
          <div className="text-left" style={{ color: template.secondaryColor }}>
            CONFIDENTIAL
          </div>
          <div className="text-center">
            <div 
              className="inline-block w-6 h-6"
              style={{ backgroundColor: template.secondaryColor }}
            ></div>
          </div>
          <div className="text-right" style={{ color: template.primaryColor }}>
            This document does not constitute an offer to sell or a solicitation of an offer to buy securities in any jurisdiction.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreditSuisseTeaserTemplate;