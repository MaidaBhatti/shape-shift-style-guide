
import { useState, useEffect } from 'react';
import { ArrowLeft, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface BodyAnalysisProps {
  imageData: string;
  onAnalysisComplete: (bodyType: string) => void;
  onBack: () => void;
}

const bodyTypes = [
  { id: 'hourglass', name: 'Hourglass', description: 'Balanced bust and hips with defined waist' },
  { id: 'pear', name: 'Pear', description: 'Hips wider than bust with defined waist' },
  { id: 'apple', name: 'Apple', description: 'Fuller midsection with narrower hips' },
  { id: 'rectangle', name: 'Rectangle', description: 'Similar bust, waist, and hip measurements' },
  { id: 'inverted-triangle', name: 'Inverted Triangle', description: 'Broader shoulders than hips' }
];

const BodyAnalysis = ({ imageData, onAnalysisComplete, onBack }: BodyAnalysisProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing AI...');
  const [detectedBodyType, setDetectedBodyType] = useState<string | null>(null);

  useEffect(() => {
    const simulateAnalysis = async () => {
      const steps = [
        'Initializing AI...',
        'Detecting body landmarks...',
        'Measuring proportions...',
        'Analyzing body shape...',
        'Calculating recommendations...',
        'Analysis complete!'
      ];

      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i]);
        setProgress((i + 1) * (100 / steps.length));
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Simulate body type detection (in real app, this would be AI analysis)
      const randomBodyType = bodyTypes[Math.floor(Math.random() * bodyTypes.length)];
      setDetectedBodyType(randomBodyType.id);
      
      setTimeout(() => {
        onAnalysisComplete(randomBodyType.id);
      }, 1500);
    };

    simulateAnalysis();
  }, [imageData, onAnalysisComplete]);

  const selectedBodyType = bodyTypes.find(type => type.id === detectedBodyType);

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
          AI Analysis
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Captured Image */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img 
            src={imageData} 
            alt="Body scan for analysis" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Analysis Progress */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <Zap className="w-8 h-8 text-purple-600" />
                <div className="absolute inset-0 bg-purple-600 rounded-full blur opacity-20 animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Analyzing Your Body Type</h3>
                <p className="text-muted-foreground">Our AI is processing your image...</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{currentStep}</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {detectedBodyType && selectedBodyType && (
              <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 animate-scale-in">
                <div className="flex items-center gap-3 mb-3">
                  <User className="w-6 h-6 text-purple-600" />
                  <h4 className="font-semibold text-lg">Body Type Detected</h4>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-purple-700">{selectedBodyType.name}</h5>
                  <p className="text-sm text-muted-foreground">{selectedBodyType.description}</p>
                </div>
              </div>
            )}
          </div>

          {progress === 100 && (
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Analysis Complete! Redirecting to recommendations...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyAnalysis;
