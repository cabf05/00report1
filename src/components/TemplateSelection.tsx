import React from 'react';
import { FileText } from 'lucide-react';
import { Template } from '../types';

interface TemplateSelectionProps {
  templates: Template[];
  onSelect: (template: Template) => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({ templates, onSelect }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Financial Blind Teaser Generator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select from one of our professional investment banking templates to create your one-page blind teaser document.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {templates.map((template) => (
          <div 
            key={template.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            onClick={() => onSelect(template)}
          >
            <div className="aspect-[210/297] bg-gray-100 relative overflow-hidden">
              {template.thumbnailUrl ? (
                <img 
                  src={template.thumbnailUrl} 
                  alt={template.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200">
                  <FileText size={48} className="text-gray-400" />
                </div>
              )}
              <div 
                className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent"
              >
                <h3 className="text-white text-xl font-bold">{template.name}</h3>
                <p className="text-white/80 text-sm">{template.bank}</p>
              </div>
            </div>
            <div className="p-4 bg-white border-t">
              <button 
                className="w-full py-2 text-center rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Select Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;