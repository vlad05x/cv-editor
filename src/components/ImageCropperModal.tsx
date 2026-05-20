import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, RotateCw, Check } from 'lucide-react';

interface ImageCropperModalProps {
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedImageBase64: string) => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({ imageSrc, onClose, onCropComplete }) => {
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset edits when image changes
  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  }, [imageSrc]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    setZoom((prev) => Math.max(1, Math.min(3, prev - e.deltaY * 0.001)));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleApply = () => {
    const img = imageRef.current;
    if (!img) return;

    // Create rendering canvas
    const canvas = document.createElement('canvas');
    const size = 300; // Standard premium avatar output size
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);

    // Save initial context state
    ctx.save();
    
    // Translate origin to the center of canvas
    ctx.translate(size / 2, size / 2);
    
    // Rotate canvas around its center
    ctx.rotate((rotation * Math.PI) / 180);
    
    // Retrieve native and display dimensions
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    
    // fitting scale of the original image inside the 200px mask preview
    const maxDim = Math.max(imgWidth, imgHeight);
    const displayScale = 200 / maxDim;
    
    const drawScale = (size / 200) * zoom;
    const scaleFactor = size / 200;

    // Apply drag pan translation
    ctx.translate(offset.x * scaleFactor, offset.y * scaleFactor);
    
    // Apply final zoom scale
    ctx.scale(drawScale * displayScale, drawScale * displayScale);
    
    // Draw original image centered
    ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2);
    
    ctx.restore();

    // Export cropped image as base64
    const base64 = canvas.toDataURL('image/jpeg', 0.9);
    onCropComplete(base64);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in no-print">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800/60 flex justify-between items-center bg-slate-950/40">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Position & Crop Photo</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Crop Window */}
        <div className="p-8 flex flex-col items-center justify-center bg-slate-950/20">
          {/* Interactive mask area */}
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            className={`w-[200px] h-[200px] rounded-full border-2 border-blue-500/80 shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-slate-950 overflow-hidden relative cursor-move flex items-center justify-center select-none ${
              isDragging ? 'border-blue-400' : 'border-blue-500/60 hover:border-blue-500'
            }`}
          >
            {/* Dark background overlay on the outside of circular mask */}
            <div className="absolute inset-0 rounded-full ring-[999px] ring-slate-900/70 pointer-events-none z-10" />

            <img
              ref={imageRef}
              src={imageSrc}
              alt="Crop preview"
              draggable={false}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-4">
            Drag photo to reposition • Scroll or use slider to zoom
          </span>
        </div>

        {/* Controls Panel */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/20 space-y-4">
          {/* Zoom Slider */}
          <div className="flex items-center gap-3">
            <ZoomIn size={14} className="text-slate-400 flex-shrink-0" />
            <span className="text-xs font-bold text-slate-400 w-10">Zoom:</span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-xs font-semibold text-slate-400 w-8 text-right">{Math.round(zoom * 100)}%</span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-4 pt-2">
            <button
              onClick={handleRotate}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-all cursor-pointer active:scale-95"
            >
              <RotateCw size={12} />
              Rotate 90°
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 hover:bg-slate-800/80 text-xs font-bold text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-5 py-2 text-xs font-bold text-white rounded-xl shadow-lg shadow-blue-500/25 transition-all cursor-pointer active:scale-95"
              >
                <Check size={12} />
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
