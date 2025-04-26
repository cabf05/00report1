import React from 'react';
import { ArrowLeft, Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { CompanyData, Template } from '../types';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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
  const [autoScale, setAutoScale] = React.useState(true);

  // Recalculate scale when window is resized
  React.useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current || !autoScale) return;

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
  }, [autoScale]);

  const handleZoomIn = () => {
    setAutoScale(false);
    setScale(prev => Math.min(prev + 0.1, 1));
  };

  const handleZoomOut = () => {
    setAutoScale(false);
    setScale(prev => Math.max(prev - 0.1, 0.3));
  };

  const handleResetZoom = () => {
    setAutoScale(true);
  };

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
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 mr-4">
            <button 
              onClick={handleZoomOut}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm text-gray-600">
              {Math.round(scale * 100)}%
            </span>
            <button 
              onClick={handleZoomIn}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
            <button 
              onClick={handleResetZoom}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              title="Reset Zoom"
            >
              <RotateCcw size={18} />
            </button>
          </div>
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
        className="mx-auto bg-gray-100 p-8 rounded-lg shadow-inner overflow-auto"
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
        <p>Use the zoom controls to adjust the preview size. The document will maintain A4 proportions when exported.</p>
      </div>
    </div>
  );
};

export default Preview;
