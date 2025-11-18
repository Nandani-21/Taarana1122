import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Leaf, Clock, Droplet, AlertTriangle, BookOpen } from 'lucide-react';
import { RemedyRecipeModal } from './Modals/RemedyRecipeModal';
import { remediesDatabase } from '../data/remediesDatabase';
import type { Language } from '../App';
import type { AyurvedicRemedy } from '../types';

interface AyurvedicRemediesProps {
  language: Language;
}

const translations = {
  en: {
    title: 'Ayurvedic Remedies',
    description: 'Natural herbal remedies based on ancient Ayurvedic wisdom',
    ingredients: 'Ingredients',
    dosage: 'Dosage',
    timing: 'Best Time',
    warnings: 'Warnings',
    preparation: 'Preparation',
    viewRecipe: 'View Full Recipe',
    markTaken: 'Mark as Taken',
  },
  hi: {
    title: 'आयुर्वेदिक उपचार',
    description: 'प्राचीन आयुर्वेदिक ज्ञान पर आधारित प्राकृतिक हर्बल उपचार',
    ingredients: 'सामग्री',
    dosage: 'खुराक',
    timing: 'सर्वोत्तम समय',
    warnings: 'चेतावनी',
    preparation: 'तैयारी',
    viewRecipe: 'पूर्��� विधि देखें',
    markTaken: 'लिया गया चिह्नित करें',
  },
};

export function AyurvedicRemedies({ language }: AyurvedicRemediesProps) {
  const t = translations[language];
  const [recipeModal, setRecipeModal] = useState<{ open: boolean; remedy: AyurvedicRemedy | null }>({
    open: false,
    remedy: null,
  });

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
      amber: {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-800',
        badge: 'bg-amber-100 text-amber-700',
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        badge: 'bg-green-100 text-green-700',
      },
      teal: {
        bg: 'bg-teal-50',
        border: 'border-teal-200',
        text: 'text-teal-800',
        badge: 'bg-teal-100 text-teal-700',
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-800',
        badge: 'bg-orange-100 text-orange-700',
      },
      emerald: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-800',
        badge: 'bg-emerald-100 text-emerald-700',
      },
      pink: {
        bg: 'bg-pink-50',
        border: 'border-pink-200',
        text: 'text-pink-800',
        badge: 'bg-pink-100 text-pink-700',
      },
    };
    return colorMap[color] || colorMap.emerald;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-emerald-900 mb-2">{t.title}</h2>
        <p className="text-emerald-700">{t.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {remediesDatabase.map((remedy) => {
          const colors = getColorClasses(remedy.color);
          
          return (
            <Card key={remedy.id} className={`bg-white/70 backdrop-blur-sm ${colors.border} hover:shadow-lg transition-all`}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center text-3xl`}>
                    {remedy.emoji}
                  </div>
                  <div className="flex-1">
                    <CardTitle className={colors.text}>
                      {language === 'en' ? remedy.name : remedy.nameHi}
                    </CardTitle>
                    <Badge variant="secondary" className={`mt-2 ${colors.badge}`}>
                      {language === 'en' ? remedy.condition : remedy.conditionHi}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className={`${colors.bg} rounded-lg p-3`}>
                    <div className="flex items-start gap-2">
                      <Leaf className={`h-4 w-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                      <div className="flex-1">
                        <p className={`text-sm ${colors.text}`}>{t.ingredients}</p>
                        <p className="text-sm text-gray-700">
                          {language === 'en' ? remedy.ingredients : remedy.ingredientsHi}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className={`${colors.bg} rounded-lg p-3`}>
                      <div className="flex items-start gap-2">
                        <Droplet className={`h-4 w-4 ${colors.text} flex-shrink-0`} />
                        <div>
                          <p className={`text-xs ${colors.text}`}>{t.dosage}</p>
                          <p className="text-xs text-gray-700">
                            {language === 'en' ? remedy.dosage : remedy.dosageHi}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`${colors.bg} rounded-lg p-3`}>
                      <div className="flex items-start gap-2">
                        <Clock className={`h-4 w-4 ${colors.text} flex-shrink-0`} />
                        <div>
                          <p className={`text-xs ${colors.text}`}>{t.timing}</p>
                          <p className="text-xs text-gray-700">
                            {language === 'en' ? remedy.timing : remedy.timingHi}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-amber-800">{t.warnings}</p>
                        <p className="text-sm text-amber-700">
                          {language === 'en' ? remedy.warnings : remedy.warningsHi}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    className={`flex-1 bg-${remedy.color}-500 hover:bg-${remedy.color}-600`}
                    onClick={() => setRecipeModal({ open: true, remedy })}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    {t.viewRecipe}
                  </Button>
                  <Button variant="outline" className={`${colors.border} ${colors.text} hover:${colors.bg}`}>
                    {t.markTaken}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recipe Modal */}
      {recipeModal.remedy && (
        <RemedyRecipeModal
          open={recipeModal.open}
          onClose={() => setRecipeModal({ open: false, remedy: null })}
          remedy={recipeModal.remedy}
          language={language}
        />
      )}
    </div>
  );
}