import React, { useState } from 'react';
import TemplateSelection from './components/TemplateSelection';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { templates } from './data/templates';
import { defaultCompanyData } from './data/defaultData';
import { CompanyData, Template } from './types';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [companyData, setCompanyData] = useState<CompanyData>(defaultCompanyData);
  const [mode, setMode] = useState<'select' | 'edit' | 'preview'>('select');

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setMode('edit');
  };

  const handleBackToTemplates = () => {
    setMode('select');
  };

  const handlePreview = () => {
    setMode('preview');
  };

  const handleEdit = () => {
    setMode('edit');
  };

  const handleDataChange = (newData: CompanyData) => {
    setCompanyData(newData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {mode === 'select' && (
        <TemplateSelection 
          templates={templates} 
          onSelect={handleTemplateSelect} 
        />
      )}
      
      {mode === 'edit' && selectedTemplate && (
        <Editor 
          template={selectedTemplate} 
          companyData={companyData} 
          onDataChange={handleDataChange}
          onBackToTemplates={handleBackToTemplates}
          onPreview={handlePreview}
        />
      )}
      
      {mode === 'preview' && selectedTemplate && (
        <Preview 
          template={selectedTemplate} 
          companyData={companyData}
          onBackToEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default App;