
import { ArrowLeft, Heart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StyleRecommendationsProps {
  bodyType: string;
  onTryAR: () => void;
  onBack: () => void;
}

const styleRecommendations = {
  hourglass: {
    title: 'Hourglass Figure',
    description: 'Emphasize your natural waistline and balanced proportions',
    tops: ['Wrap tops', 'Fitted blouses', 'V-neck sweaters', 'Peplum tops'],
    bottoms: ['High-waisted jeans', 'A-line skirts', 'Straight-leg pants', 'Pencil skirts'],
    dresses: ['Wrap dresses', 'Fit-and-flare', 'Bodycon dresses', 'Belted styles'],
    avoid: ['Boxy cuts', 'Shapeless clothing', 'Drop-waist styles'],
    colors: ['Deep jewel tones', 'Classic navy', 'Rich burgundy', 'Emerald green']
  },
  pear: {
    title: 'Pear Shape',
    description: 'Balance your proportions by highlighting your upper body',
    tops: ['Statement sleeves', 'Boat neck tops', 'Embellished blouses', 'Horizontal stripes'],
    bottoms: ['Dark straight jeans', 'A-line skirts', 'Wide-leg pants', 'Boot-cut jeans'],
    dresses: ['A-line dresses', 'Empire waist', 'Fit-and-flare', 'Off-shoulder styles'],
    avoid: ['Tight bottoms', 'Hip details', 'Tapered pants'],
    colors: ['Bright tops', 'Bold patterns', 'Light upper colors', 'Dark lower colors']
  },
  apple: {
    title: 'Apple Shape',
    description: 'Create definition and elongate your silhouette',
    tops: ['V-neck styles', 'Empire waist', 'Tunic tops', 'Wrap styles'],
    bottoms: ['Straight-leg jeans', 'Wide-leg pants', 'A-line skirts', 'Bootcut jeans'],
    dresses: ['Empire waist', 'A-line dresses', 'Wrap dresses', 'Shirt dresses'],
    avoid: ['Tight waistbands', 'Clingy fabrics', 'High necklines'],
    colors: ['Vertical stripes', 'Monochromatic looks', 'Dark colors', 'Strategic color blocking']
  },
  rectangle: {
    title: 'Rectangle Shape',
    description: 'Create curves and define your waistline',
    tops: ['Peplum styles', 'Ruffled blouses', 'Cropped tops', 'Textured fabrics'],
    bottoms: ['Skinny jeans', 'Flare pants', 'Pleated skirts', 'High-waisted styles'],
    dresses: ['Belted dresses', 'Fit-and-flare', 'Bodycon styles', 'Tiered dresses'],
    avoid: ['Straight cuts', 'Boxy styles', 'Drop-waist designs'],
    colors: ['Bold patterns', 'Color blocking', 'Textured fabrics', 'Layered looks']
  },
  'inverted-triangle': {
    title: 'Inverted Triangle',
    description: 'Balance your shoulders with fuller hips and defined waist',
    tops: ['Scoop necks', 'V-necks', 'Simple styles', 'Solid colors'],
    bottoms: ['Wide-leg pants', 'Flare jeans', 'Pleated skirts', 'Bold patterns'],
    dresses: ['A-line dresses', 'Fit-and-flare', 'Patterned bottoms', 'Empire waist'],
    avoid: ['Shoulder pads', 'Boat necks', 'Horizontal stripes on top'],
    colors: ['Dark tops', 'Bright bottoms', 'Bold lower patterns', 'Light lower colors']
  }
};

const StyleRecommendations = ({ bodyType, onTryAR, onBack }: StyleRecommendationsProps) => {
  const recommendations = styleRecommendations[bodyType as keyof typeof styleRecommendations];

  if (!recommendations) {
    return <div>Body type not found</div>;
  }

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
          Your Style Guide
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 mb-4">
            <Star className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-bold text-purple-800">{recommendations.title}</h3>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">{recommendations.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-purple-700 border-b border-purple-200 pb-2">Perfect Tops</h4>
            <ul className="space-y-2">
              {recommendations.tops.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Heart className="w-3 h-3 text-pink-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-purple-700 border-b border-purple-200 pb-2">Perfect Bottoms</h4>
            <ul className="space-y-2">
              {recommendations.bottoms.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Heart className="w-3 h-3 text-pink-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-purple-700 border-b border-purple-200 pb-2">Perfect Dresses</h4>
            <ul className="space-y-2">
              {recommendations.dresses.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Heart className="w-3 h-3 text-pink-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-purple-700 border-b border-purple-200 pb-2">Color Palette</h4>
            <ul className="space-y-2">
              {recommendations.colors.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Heart className="w-3 h-3 text-pink-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <h4 className="font-semibold text-red-800 mb-2">Styles to Avoid</h4>
          <div className="flex flex-wrap gap-2">
            {recommendations.avoid.map((item, index) => (
              <span key={index} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={onTryAR}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Eye className="w-5 h-5 mr-2" />
            Try AR Virtual Fitting
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StyleRecommendations;
