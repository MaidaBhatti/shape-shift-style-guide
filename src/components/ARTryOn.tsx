
import { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeft, Camera, RotateCcw, Shirt, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ARTryOnProps {
  bodyType: string;
  onBack: () => void;
}

const clothingItems = [
  { id: 1, name: 'Classic Blazer', category: 'tops', color: '#2D3748', image: '👔' },
  { id: 2, name: 'Wrap Blouse', category: 'tops', color: '#E53E3E', image: '👚' },
  { id: 3, name: 'V-Neck Sweater', category: 'tops', color: '#38A169', image: '🧥' },
  { id: 4, name: 'Skinny Jeans', category: 'bottoms', color: '#2B6CB0', image: '👖' },
  { id: 5, name: 'A-Line Skirt', category: 'bottoms', color: '#553C9A', image: '👗' },
  { id: 6, name: 'Wide-Leg Pants', category: 'bottoms', color: '#1A202C', image: '👖' },
];

const ARTryOn = ({ bodyType, onBack }: ARTryOnProps) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedClothing, setSelectedClothing] = useState<number[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const toggleClothing = (id: number) => {
    setSelectedClothing(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            stopCamera();
            onBack();
          }}
          className="hover:bg-purple-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          AR Virtual Try-On
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* AR Camera View */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {!isStreaming ? (
              <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 p-8">
                <Camera className="w-16 h-16 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Start AR Try-On</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-sm">
                  Turn on your camera to see how clothes look on you in real-time
                </p>
                <Button 
                  onClick={startCamera}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Start AR Camera
                </Button>
              </div>
            ) : (
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform scale-x-[-1]"
                />
                
                {/* AR Overlay for selected clothing */}
                {selectedClothing.length > 0 && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                        <div className="flex gap-2 text-2xl">
                          {selectedClothing.map(id => {
                            const item = clothingItems.find(c => c.id === id);
                            return item ? <span key={id}>{item.image}</span> : null;
                          })}
                        </div>
                        <p className="text-white text-sm mt-2 text-center">Virtual clothing overlay</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute top-4 right-4">
                  <Button 
                    onClick={stopCamera}
                    variant="outline"
                    size="sm"
                    className="bg-white/90 backdrop-blur-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clothing Selection */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shirt className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold">Virtual Wardrobe</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">TOPS</span>
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {clothingItems.filter(item => item.category === 'tops').map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleClothing(item.id)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedClothing.includes(item.id)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.image}</span>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div 
                              className="w-3 h-3 rounded-full border"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-xs text-muted-foreground">Available</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <span className="text-sm bg-pink-100 text-pink-700 px-2 py-1 rounded">BOTTOMS</span>
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {clothingItems.filter(item => item.category === 'bottoms').map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleClothing(item.id)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedClothing.includes(item.id)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.image}</span>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div 
                              className="w-3 h-3 rounded-full border"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-xs text-muted-foreground">Available</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {selectedClothing.length > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-sm">Selected Items</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedClothing.length} item{selectedClothing.length !== 1 ? 's' : ''} selected for AR try-on
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARTryOn;
