import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Leaf, Droplet, Clock, AlertTriangle, ChefHat } from 'lucide-react';
import type { AyurvedicRemedy } from '../../types';
import type { Language } from '../../App';

interface RemedyRecipeModalProps {
  open: boolean;
  onClose: () => void;
  remedy: AyurvedicRemedy;
  language: Language;
}

export function RemedyRecipeModal({ open, onClose, remedy, language }: RemedyRecipeModalProps) {
  const ingredients = language === 'en' ? remedy.ingredients : remedy.ingredientsHi;
  const preparation = language === 'en' ? remedy.preparation : remedy.preparationHi;

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      amber: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
      green: { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
      pink: { bg: 'bg-pink-50', text: 'text-pink-800', border: 'border-pink-200' },
    };
    return colorMap[color] || colorMap.emerald;
  };

  const colors = getColorClasses(remedy.color);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center text-2xl`}>
              {remedy.emoji}
            </div>
            <div>
              <DialogTitle className={`text-2xl ${colors.text}`}>
                {language === 'en' ? remedy.name : remedy.nameHi}
              </DialogTitle>
              <DialogDescription>
                <Badge variant="secondary" className={`${colors.bg} ${colors.text} mt-1`}>
                  {language === 'en' ? remedy.condition : remedy.conditionHi}
                </Badge>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Ingredients */}
          <div className={`${colors.bg} rounded-lg p-4 border ${colors.border}`}>
            <div className="flex items-center gap-2 mb-3">
              <Leaf className={`h-5 w-5 ${colors.text}`} />
              <h4 className={colors.text}>Ingredients</h4>
            </div>
            <ul className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className={`${colors.text} mt-0.5`}>•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preparation Steps */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ChefHat className={`h-5 w-5 ${colors.text}`} />
              <h4 className={colors.text}>Preparation Method</h4>
            </div>
            <div className="space-y-3">
              {preparation.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 bg-${remedy.color}-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm`}>
                    {index + 1}
                  </div>
                  <p className="flex-1 text-gray-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dosage and Timing */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`${colors.bg} rounded-lg p-4 border ${colors.border}`}>
              <div className="flex items-start gap-2">
                <Droplet className={`h-4 w-4 ${colors.text} mt-0.5`} />
                <div>
                  <h4 className={`text-sm ${colors.text} mb-1`}>Dosage</h4>
                  <p className="text-sm text-gray-700">
                    {language === 'en' ? remedy.dosage : remedy.dosageHi}
                  </p>
                </div>
              </div>
            </div>

            <div className={`${colors.bg} rounded-lg p-4 border ${colors.border}`}>
              <div className="flex items-start gap-2">
                <Clock className={`h-4 w-4 ${colors.text} mt-0.5`} />
                <div>
                  <h4 className={`text-sm ${colors.text} mb-1`}>Best Time</h4>
                  <p className="text-sm text-gray-700">
                    {language === 'en' ? remedy.timing : remedy.timingHi}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Warnings */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-amber-900 mb-1">Important Warnings</h4>
                <p className="text-sm text-amber-700">
                  {language === 'en' ? remedy.warnings : remedy.warningsHi}
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-blue-900 mb-2">💡 Tips for Best Results:</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Use fresh, organic ingredients when possible</li>
              <li>• Store in a clean, dry container</li>
              <li>• Take consistently for best results</li>
              <li>• Consult an Ayurvedic practitioner for personalized advice</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
