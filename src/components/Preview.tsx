import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { CompanyData, Template } from '../types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Import templates
import GoldmanTeaserTemplate from './templates/GoldmanTeaserTemplate';
import JPMorganTeaserTemplate from './templates/JPMorganTeaserTemplate';
import BofATeaserTemplate from './templates/BofATeaserTemplate';
import MorganStanleyTeaserTemplate from './templates/MorganStanleyTeaserTemplate';
import CreditSuisseTeaserTemplate from './templates/CreditSuisseTeaserTemplate';

interface PreviewProps {
  template: Template;
  companyData: CompanyData;
  onBackToEdit: () => void;
}

const Preview: React.FC<PreviewProps> = ({ template, companyData, onBackToEdit }) => {
  const previewRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  // Recalculate scale when window is resized
  React.useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth - 64; // Account for padding
      const containerHeight = window.innerHeight - 200; // Account for header and padding

      // A4 dimensions in mm
      const a4Width = 210;
      const a4Height = 297;

      // Calculate scale to fit in viewport while maintaining A4 proportions
      const newScale = Math.min(
        containerWidth / a4Width,
        containerHeight / a4Height,
        1 // Never scale up, only down
      );

      setScale(newScale * 0.95); // Add a small margin for safety
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        windowWidth: 210 * 3.78, // Convert mm to pixels (96dpi)
        windowHeight: 297 * 3.78
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // A4 dimensions in mm: 210 x 297
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`${companyData.companyName.replace(/\s+/g, '-').toLowerCase()}-teaser.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleExportPNG = async () => {
    if (!previewRef.current) return;
    
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        windowWidth: 210 * 3.78, // Convert mm to pixels (96dpi)
        windowHeight: 297 * 3.78
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${companyData.companyName.replace(/\s+/g, '-').toLowerCase()}-teaser.png`;
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Failed to generate PNG. Please try again.');
    }
  };

  const renderTemplate = () => {
    switch (template.id) {
      case 'goldman-inspired':
        return <GoldmanTeaserTemplate template={template} companyData={companyData} />;
      case 'jpmorgan-inspired':
        return <JPMorganTeaserTemplate template={template} companyData={companyData} />;
      case 'bofa-inspired':
        return <BofATeaserTemplate template={template} companyData={companyData} />;
      case 'morgan-stanley-inspired':
        return <MorganStanleyTeaserTemplate template={template} companyData={companyData} />;
      case 'credit-suisse-inspired':
        return <CreditSuisseTeaserTemplate template={template} companyData={companyData} />;
      default:
        return <GoldmanTeaserTemplate template={template} companyData={companyData} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBackToEdit}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back to Editor
        </button>
        
        <div className="flex space-x-3">
          <button 
            onClick={handleExportPDF}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download size={18} className="mr-2" />
            Download PDF
          </button>
          <button 
            onClick={handleExportPNG}
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            <Download size={18} className="mr-2" />
            Download PNG
          </button>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="mx-auto bg-gray-100 p-8 rounded-lg shadow-inner overflow-hidden"
        style={{
          height: `calc(100vh - 200px)`,
        }}
      >
        <div 
          className="flex justify-center items-start h-full"
        >
          <div
            ref={previewRef}
            className="bg-white shadow-lg"
            style={{
              width: '210mm',
              height: '297mm',
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-gray-600">
        <p>This is a preview of how your document will look when printed or exported. The document is sized to fit an A4 page.</p>
      </div>
    </div>
  );
};

export default Preview;
