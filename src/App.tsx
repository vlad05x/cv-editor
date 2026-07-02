import { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Printer, Palette, Type, Sliders, Layout, RotateCcw, FileUp, FileDown, Save } from 'lucide-react';
import { CVPreview } from './components/CVPreview';
import { CVEditor } from './components/CVEditor';
import { ImageCropperModal } from './components/ImageCropperModal';
import { defaultCvData } from './data/cvData';
import type { CVData } from './data/cvData';

function App() {
  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem('cv_builder_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultCvData,
          ...parsed,
          personalInfo: { ...defaultCvData.personalInfo, ...parsed.personalInfo },
          skills: { ...defaultCvData.skills, ...parsed.skills },
          workExperience: parsed.workExperience ?? defaultCvData.workExperience,
          customization: { ...defaultCvData.customization, ...parsed.customization }
        };
      }
    } catch (e) {
      console.error('Failed to load saved CV data:', e);
    }
    return defaultCvData;
  });

  const [photoUrl, setPhotoUrl] = useState<string | null>(() => {
    return localStorage.getItem('cv_builder_photo') || null;
  });

  const [croppingImage, setCroppingImage] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  
  const componentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${cvData.personalInfo.name.replace(/\s+/g, '_')}_CV`,
  });

  // Debounced auto-saving to localStorage
  useEffect(() => {
    setSaveStatus('saving');
    
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('cv_builder_data', JSON.stringify(cvData));
        setSaveStatus('saved');
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }, 500); // 500ms debounce for smoother keyboard inputs

    return () => clearTimeout(timer);
  }, [cvData]);

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setCroppingImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedBase64: string) => {
    setPhotoUrl(croppedBase64);
    localStorage.setItem('cv_builder_photo', croppedBase64);
    setCroppingImage(null);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all CV data to the default template? This will erase your current changes.")) {
      setCvData(defaultCvData);
      setPhotoUrl(null);
      localStorage.removeItem('cv_builder_data');
      localStorage.removeItem('cv_builder_photo');
    }
  };

  const updateCustomization = (key: keyof CVData['customization'], value: string) => {
    setCvData(prev => ({
      ...prev,
      customization: {
        ...prev.customization,
        [key]: value
      }
    }));
  };

  const handleExportJson = () => {
    try {
      const backupData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        cvData: cvData,
        photoUrl: photoUrl
      };
      const jsonString = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cvData.personalInfo.name.replace(/\s+/g, '_')}_cv_backup.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export CV backup:', error);
      alert('Failed to export backup. Please try again.');
    }
  };

  const handleSaveToCodebase = async () => {
    try {
      const response = await fetch('/api/save-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cvData)
      });
      if (response.ok) {
        alert('Successfully saved to cvData.ts! Your local codebase is now updated. You can commit and push these changes.');
      } else {
        alert('Failed to save to codebase. Check terminal logs.');
      }
    } catch (error) {
      console.error('Failed to save to codebase:', error);
      alert('Error communicating with local server. Ensure Vite is running.');
    }
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonContent = event.target?.result as string;
        const parsed = JSON.parse(jsonContent);
        
        if (parsed && parsed.cvData) {
          const importedCv = parsed.cvData;
          const validatedCv = {
            ...defaultCvData,
            ...importedCv,
            personalInfo: { ...defaultCvData.personalInfo, ...importedCv.personalInfo },
            skills: { ...defaultCvData.skills, ...importedCv.skills },
            workExperience: importedCv.workExperience ?? defaultCvData.workExperience,
            customization: { ...defaultCvData.customization, ...importedCv.customization }
          };
          
          setCvData(validatedCv);
          
          if (parsed.photoUrl) {
            setPhotoUrl(parsed.photoUrl);
            localStorage.setItem('cv_builder_photo', parsed.photoUrl);
          } else {
            setPhotoUrl(null);
            localStorage.removeItem('cv_builder_photo');
          }
          
          alert('CV backup successfully restored!');
        } else {
          alert('Invalid backup file structure. Make sure you are loading a file exported from this builder.');
        }
      } catch (error) {
        console.error('Failed to parse backup JSON:', error);
        alert('Invalid file format. Please upload a valid JSON backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar Editor */}
      <div className="w-[450px] flex-shrink-0 bg-slate-900 border-r border-slate-800 shadow-2xl z-20 flex flex-col no-print">
        {/* Editor Title Bar */}
        <div className="p-5 bg-slate-950/80 border-b border-slate-800/80 flex justify-between items-center flex-shrink-0 backdrop-blur-md">
          <h1 className="text-xl font-extrabold tracking-tight flex items-center gap-2.5">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-2.5 py-1 rounded-lg text-sm shadow-md shadow-blue-500/25">CV</span>
            <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">Builder Studio</span>
          </h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleReset}
              className="p-2 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-xl border border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Reset all data to default template"
            >
              <RotateCcw size={14} />
            </button>
            <button 
              onClick={() => handlePrint()}
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 transition-all px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Autosave & Backup Bar */}
        <div className="px-5 py-2.5 bg-slate-900/60 border-b border-slate-800 flex justify-between items-center flex-shrink-0 text-xs">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 select-none">
            {saveStatus === 'saved' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                <span className="text-slate-400 font-medium">Auto-saved locally</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-ping" />
                <span className="text-amber-400 font-medium">Saving changes...</span>
              </>
            )}
          </div>
          
          {/* Backup / Restore Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveToCodebase}
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 px-2.5 py-1 rounded-lg border border-blue-500/30 hover:border-blue-400 font-medium"
              title="Save current data directly to src/data/cvData.ts"
            >
              <Save size={12} />
              <span>Save to Code</span>
            </button>
            <div className="w-px h-4 bg-slate-700/50 mx-1"></div>
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer bg-slate-800/40 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-800/80 hover:border-slate-700 font-medium"
              title="Download full backup as a JSON file"
            >
              <FileDown size={12} />
              <span>Backup JSON</span>
            </button>
            <label
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer bg-slate-800/40 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-800/80 hover:border-slate-700 font-medium"
              title="Load full backup from a JSON file"
            >
              <FileUp size={12} />
              <span>Restore</span>
              <input 
                type="file" 
                accept=".json" 
                onChange={handleImportJson} 
                className="hidden" 
              />
            </label>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-auto">
          <CVEditor 
            data={cvData} 
            onChange={setCvData} 
            onPhotoUpload={handlePhotoUpload}
          />
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 overflow-auto p-8 flex flex-col justify-start items-center bg-[#f1f5f9] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(186,230,253,0.35),rgba(255,255,255,0))] preview-container relative">
        {/* Customization Floating Toolbar (Hidden during print) */}
        <div className="no-print w-full max-w-[210mm] mb-6 bg-white/70 border border-slate-200/80 rounded-2xl p-4 flex flex-wrap gap-6 justify-between items-center backdrop-blur-md shadow-xl shadow-slate-100">
          
          {/* Active Customizer Group */}
          <div className="flex items-center gap-6 flex-wrap">
            {/* Theme Colors */}
            <div className="flex items-center gap-2">
              <Palette size={14} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-500 mr-1">Theme:</span>
              <div className="flex gap-2">
                {[
                  { name: "sapphire", class: "bg-blue-600 shadow-blue-500/20" },
                  { name: "emerald", class: "bg-emerald-600 shadow-emerald-500/20" },
                  { name: "bronze", class: "bg-amber-700 shadow-amber-600/20" },
                  { name: "obsidian", class: "bg-slate-700 shadow-slate-600/20" }
                ].map(theme => (
                  <button
                    key={theme.name}
                    onClick={() => updateCustomization("themeColor", theme.name)}
                    className={`w-5 h-5 rounded-full ${theme.class} border-2 transition-all cursor-pointer ${
                      cvData.customization.themeColor === theme.name 
                        ? 'border-white scale-125 ring-2 ring-blue-500/50 shadow-md' 
                        : 'border-transparent hover:scale-110'
                    }`}
                    title={theme.name}
                  />
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="flex items-center gap-2">
              <Type size={14} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-500">Font:</span>
              <select
                value={cvData.customization.fontFamily}
                onChange={(e) => updateCustomization("fontFamily", e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
              >
                <option value="sans">Inter (Modern)</option>
                <option value="outfit">Outfit (Clean)</option>
                <option value="serif">Lora (Elegant)</option>
              </select>
            </div>

            {/* Layout Options */}
            <div className="flex items-center gap-2">
              <Layout size={14} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-500">Layout:</span>
              <select
                value={cvData.customization.layoutStyle}
                onChange={(e) => updateCustomization("layoutStyle", e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
              >
                <option value="classic">Split Columns</option>
                <option value="modern">Modern Banner</option>
                <option value="minimalist">Single Column</option>
              </select>
            </div>

            {/* Padding/Density */}
            <div className="flex items-center gap-2">
              <Sliders size={14} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-500">Density:</span>
              <select
                value={cvData.customization.density}
                onChange={(e) => updateCustomization("density", e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
              >
                <option value="compact">Compact</option>
                <option value="normal">Normal</option>
                <option value="relaxed">Spacious</option>
              </select>
            </div>
          </div>

          {/* Right Tag */}
          <div className="no-print bg-slate-100 text-slate-600 border border-slate-200/60 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 select-none">
            <Printer size={12} className="text-blue-500" />
            <span>A4 Print Scale</span>
          </div>
        </div>

        {/* The CV Render Container */}
        <div className="flex-1 flex justify-center items-start w-full overflow-visible py-2">
          <CVPreview ref={componentRef} data={cvData} photoUrl={photoUrl} />
        </div>
      </div>

      {croppingImage && (
        <ImageCropperModal 
          imageSrc={croppingImage} 
          onClose={() => setCroppingImage(null)} 
          onCropComplete={handleCropComplete} 
        />
      )}
    </div>
  );
}

export default App;
