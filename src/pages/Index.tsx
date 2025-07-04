
import { useState } from 'react';
import { Camera, Sparkles, User, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CameraCapture from '@/components/CameraCapture';
import BodyAnalysis from '@/components/BodyAnalysis';
import StyleRecommendations from '@/components/StyleRecommendations';
import ARTryOn from '@/components/ARTryOn';

type AppStep = 'welcome' | 'camera' | 'analysis' | 'recommendations' | 'ar-tryon';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [bodyType, setBodyType] = useState<string | null>(null);

  const handleImageCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setCurrentStep('analysis');
  };

  const handleAnalysisComplete = (detectedBodyType: string) => {
    setBodyType(detectedBodyType);
    setCurrentStep('recommendations');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20 scale-150"></div>
              <Sparkles className="w-24 h-24 mx-auto text-purple-600 relative z-10" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                StyleAR
              </h1>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                Discover your perfect style with AI-powered body analysis and AR try-on
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                <Camera className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold mb-2">Scan Your Body</h3>
                <p className="text-sm text-muted-foreground">
                  Use your camera to capture your body shape
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                <User className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get your body type analyzed by our AI
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                <Shirt className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold mb-2">Style Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized fashion recommendations
                </p>
              </div>
            </div>

            <Button 
              onClick={() => setCurrentStep('camera')}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Button>
          </div>
        );

      case 'camera':
        return (
          <CameraCapture 
            onCapture={handleImageCapture}
            onBack={() => setCurrentStep('welcome')}
          />
        );

      case 'analysis':
        return (
          <BodyAnalysis 
            imageData={capturedImage!}
            onAnalysisComplete={handleAnalysisComplete}
            onBack={() => setCurrentStep('camera')}
          />
        );

      case 'recommendations':
        return (
          <StyleRecommendations
            bodyType={bodyType!}
            onTryAR={() => setCurrentStep('ar-tryon')}
            onBack={() => setCurrentStep('analysis')}
          />
        );

      case 'ar-tryon':
        return (
          <ARTryOn
            bodyType={bodyType!}
            onBack={() => setCurrentStep('recommendations')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default Index;
