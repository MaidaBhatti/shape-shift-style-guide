
import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, RotateCcw, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onBack: () => void;
}

const CameraCapture = ({ onCapture, onBack }: CameraCaptureProps) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      console.log('Starting camera...');
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 720 },
          height: { ideal: 1280 }
        }
      });
      
      console.log('Camera stream obtained:', stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
        console.log('Camera started successfully');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Unable to access camera. Please check permissions.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    console.log('Stopping camera...');
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log('Stopped track:', track.kind);
      });
      streamRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const capturePhoto = useCallback(() => {
    console.log('Capturing photo...');
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context && video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        stopCamera();
        console.log('Photo captured successfully');
      } else {
        console.error('Failed to capture photo: invalid video dimensions');
        setError('Failed to capture photo. Please try again.');
      }
    }
  }, [stopCamera]);

  const retakePhoto = useCallback(() => {
    console.log('Retaking photo...');
    setCapturedImage(null);
    setError(null);
    startCamera();
  }, [startCamera]);

  const confirmPhoto = useCallback(() => {
    console.log('Confirming photo...');
    if (capturedImage) {
      onCapture(capturedImage);
    }
  }, [capturedImage, onCapture]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="hover:bg-purple-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Body Scan
        </h2>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <p>{error}</p>
          <Button 
            onClick={() => {
              setError(null);
              startCamera();
            }}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white"
            size="sm"
          >
            Try Again
          </Button>
        </div>
      )}

      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
        {!isStreaming && !capturedImage && (
          <div className="aspect-[9/16] flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 p-8">
            <Camera className="w-16 h-16 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ready to scan?</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Position yourself in good lighting and make sure your full body is visible
            </p>
            <Button 
              onClick={startCamera}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Camera className="w-4 h-4 mr-2" />
              Start Camera
            </Button>
          </div>
        )}

        {isStreaming && (
          <div className="relative aspect-[9/16]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Overlay guide */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-4 border-2 border-white/50 border-dashed rounded-lg flex items-center justify-center">
                <div className="text-white/80 text-center bg-black/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm">Position your full body within the frame</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <Button 
                onClick={capturePhoto}
                size="lg"
                className="rounded-full w-16 h-16 bg-white hover:bg-gray-100 text-purple-600 shadow-lg"
              >
                <Camera className="w-6 h-6" />
              </Button>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="relative aspect-[9/16]">
            <img 
              src={capturedImage} 
              alt="Captured body scan" 
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
              <Button 
                onClick={retakePhoto}
                variant="outline"
                className="bg-white/90 backdrop-blur-sm"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake
              </Button>
              <Button 
                onClick={confirmPhoto}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Check className="w-4 h-4 mr-2" />
                Confirm
              </Button>
            </div>
          </div>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default CameraCapture;
