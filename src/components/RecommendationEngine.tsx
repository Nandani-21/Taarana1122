import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Sparkles, Activity, Leaf, UtensilsCrossed, ArrowRight, RefreshCw } from 'lucide-react';
import type { Language } from '../App';
import { Separator } from './ui/separator';

interface RecommendationEngineProps {
  language: Language;
}

const translations = {
  en: {
    title: 'Personalized Health Recommendations',
    description: 'Select your symptoms to get AI-powered yoga, Ayurvedic, and diet recommendations',
    selectSymptoms: 'Select Your Symptoms',
    getRecommendations: 'Get Recommendations',
    reset: 'Reset',
    possibleConditions: 'Possible Conditions',
    yogaRecommendations: 'Yoga Recommendations',
    ayurvedicRemedies: 'Ayurvedic Remedies',
    dietGuidelines: 'Diet Guidelines',
    lifestyleAdvice: 'Lifestyle Advice',
    disclaimer: 'Disclaimer: These are general recommendations. Please consult a healthcare professional for proper diagnosis and treatment.',
  },
  hi: {
    title: 'व्यक्तिगत स्वास्थ्य सिफारिशें',
    description: 'एआई-संचालित योग, आयुर्वेदिक और आहार सिफारिशें प्राप्त करने के लिए अपने लक्षण चुनें',
    selectSymptoms: 'अपने लक्षण चुनें',
    getRecommendations: 'सिफारिशें प्राप्त करें',
    reset: 'रीसेट करें',
    possibleConditions: 'संभावित स्थितियां',
    yogaRecommendations: 'योग सिफारिशें',
    ayurvedicRemedies: 'आयुर्वेदिक उपचार',
    dietGuidelines: 'आहार दिशानिर्देश',
    lifestyleAdvice: 'जीवनशैली सलाह',
    disclaimer: 'अस्वीकरण: ये सामान्य सिफारिशें हैं। उचित निदान और उपचार के लिए कृपया स्वास्थ्य पेशेवर से परामर्श करें।',
  },
};

const symptoms = [
  { id: 'fatigue', label: 'Fatigue / Tiredness', labelHi: 'थकान / थकावट', category: 'general' },
  { id: 'headache', label: 'Headache / Migraine', labelHi: 'सिरदर्द / माइग्रेन', category: 'neurological' },
  { id: 'back_pain', label: 'Back Pain', labelHi: 'पीठ दर्द', category: 'musculoskeletal' },
  { id: 'joint_pain', label: 'Joint Pain', labelHi: 'जोड़ों का दर्द', category: 'musculoskeletal' },
  { id: 'insomnia', label: 'Insomnia / Sleep Issues', labelHi: 'अनिद्रा / नींद की समस्या', category: 'general' },
  { id: 'anxiety', label: 'Anxiety / Stress', labelHi: 'चिंता / तनाव', category: 'mental' },
  { id: 'weight_gain', label: 'Weight Gain', labelHi: 'वजन बढ़ना', category: 'metabolic' },
  { id: 'digestive', label: 'Digestive Issues', labelHi: 'पाचन संबंधी समस्याएं', category: 'digestive' },
  { id: 'irregular_periods', label: 'Irregular Periods', labelHi: 'अनियमित माहवारी', category: 'hormonal' },
  { id: 'mood_swings', label: 'Mood Swings', labelHi: 'मूड स्विंग', category: 'hormonal' },
  { id: 'acne', label: 'Acne / Skin Issues', labelHi: 'मुंहासे / त्वचा समस्याएं', category: 'hormonal' },
  { id: 'hair_loss', label: 'Hair Loss', labelHi: 'बाल झड़ना', category: 'hormonal' },
];

// Disease mapping based on symptom patterns
const diseaseMapping = {
  pcos: {
    symptoms: ['irregular_periods', 'weight_gain', 'acne', 'hair_loss', 'mood_swings'],
    name: 'PCOS (Polycystic Ovary Syndrome)',
    nameHi: 'पीसीओएस (पॉलीसिस्टिक ओवरी सिंड्रोम)',
    threshold: 3,
  },
  diabetes: {
    symptoms: ['fatigue', 'weight_gain'],
    name: 'Pre-Diabetes / Metabolic Issues',
    nameHi: 'प्री-डायबिटीज / चयापचय संबंधी समस्याएं',
    threshold: 2,
  },
  migraine: {
    symptoms: ['headache', 'fatigue', 'mood_swings'],
    name: 'Migraine / Chronic Headaches',
    nameHi: 'माइग्रेन / पुरानी सिरदर्द',
    threshold: 2,
  },
  arthritis: {
    symptoms: ['joint_pain', 'back_pain', 'fatigue'],
    name: 'Arthritis / Joint Disorders',
    nameHi: 'गठिया / जोड़ों के विकार',
    threshold: 2,
  },
  anxiety_disorder: {
    symptoms: ['anxiety', 'insomnia', 'headache', 'digestive'],
    name: 'Anxiety / Stress Disorder',
    nameHi: 'चिंता / तनाव विकार',
    threshold: 2,
  },
  digestive_disorder: {
    symptoms: ['digestive', 'fatigue', 'mood_swings'],
    name: 'Digestive Disorder',
    nameHi: 'पाचन विकार',
    threshold: 2,
  },
};

export function RecommendationEngine({ language }: RecommendationEngineProps) {
  const t = translations[language];
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any>(null);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const generateRecommendations = () => {
    if (selectedSymptoms.length === 0) return;

    // Detect possible conditions
    const detectedConditions = Object.entries(diseaseMapping)
      .filter(([_, disease]) => {
        const matchCount = disease.symptoms.filter((s) => selectedSymptoms.includes(s)).length;
        return matchCount >= disease.threshold;
      })
      .map(([id, disease]) => ({ id, ...disease }));

    // Generate yoga recommendations based on symptoms
    const yogaRecs: string[] = [];
    if (selectedSymptoms.includes('back_pain') || selectedSymptoms.includes('joint_pain')) {
      yogaRecs.push(
        language === 'en' ? 'Bhujangasana (Cobra Pose) - 5 minutes' : 'भुजंगासन (कोबरा पोज) - 5 मिनट',
        language === 'en' ? 'Balasana (Child Pose) - 3 minutes' : 'बालासन (बाल मुद्रा) - 3 मिनट'
      );
    }
    if (selectedSymptoms.includes('anxiety') || selectedSymptoms.includes('insomnia')) {
      yogaRecs.push(
        language === 'en' ? 'Pranayama (Anulom Vilom) - 10 minutes' : 'प्राणायाम (अनुलोम विलोम) - 10 मिनट',
        language === 'en' ? 'Shavasana - 5 minutes' : 'शवासन - 5 मिनट'
      );
    }
    if (selectedSymptoms.includes('weight_gain')) {
      yogaRecs.push(
        language === 'en' ? 'Surya Namaskar - 12 rounds' : 'सूर्य नमस्कार - 12 चक्र',
        language === 'en' ? 'Navasana (Boat Pose) - 3 sets' : 'नौकासन (बोट पोज) - 3 सेट'
      );
    }
    if (selectedSymptoms.includes('digestive')) {
      yogaRecs.push(
        language === 'en' ? 'Pawanmuktasana (Wind Relief Pose)' : 'पवनमुक्तासन',
        language === 'en' ? 'Ardha Matsyendrasana (Spinal Twist)' : 'अर्ध मत्स्येन्द्रासन'
      );
    }
    if (selectedSymptoms.includes('irregular_periods') || selectedSymptoms.includes('mood_swings')) {
      yogaRecs.push(
        language === 'en' ? 'Baddha Konasana (Butterfly Pose)' : 'बद्ध कोणासन (तितली मुद्रा)',
        language === 'en' ? 'Supta Baddha Konasana' : 'सुप्त बद्ध कोणासन'
      );
    }

    // Generate Ayurvedic recommendations
    const ayurvedicRecs: string[] = [];
    if (selectedSymptoms.includes('fatigue')) {
      ayurvedicRecs.push(
        language === 'en' ? 'Ashwagandha - 1 tsp with warm milk at night' : 'अश्वगंधा - रात में गर्म दूध के साथ 1 चम्मच',
        language === 'en' ? 'Chyawanprash - 1 tsp daily' : 'च्यवनप्राश - दैनिक 1 चम्मच'
      );
    }
    if (selectedSymptoms.includes('digestive')) {
      ayurvedicRecs.push(
        language === 'en' ? 'Triphala powder - Before bed' : 'त्रिफला चूर्ण - सोने से पहले',
        language === 'en' ? 'Ginger-Honey mix - Before meals' : 'अदरक-शहद मिश्रण - भोजन से पहले'
      );
    }
    if (selectedSymptoms.includes('insomnia')) {
      ayurvedicRecs.push(
        language === 'en' ? 'Brahmi tea - Evening' : 'ब्राह्मी चाय - शाम',
        language === 'en' ? 'Warm milk with nutmeg' : 'जायफल के साथ गर्म दूध'
      );
    }
    if (selectedSymptoms.includes('irregular_periods') || selectedSymptoms.includes('acne')) {
      ayurvedicRecs.push(
        language === 'en' ? 'Shatavari - For hormonal balance' : 'शतावरी - हार्मोनल संतुलन के लिए',
        language === 'en' ? 'Tulsi tea - Daily' : 'तुलसी चाय - दैनिक'
      );
    }

    // Generate diet recommendations
    const dietRecs: string[] = [];
    if (selectedSymptoms.includes('weight_gain')) {
      dietRecs.push(
        language === 'en' ? 'Increase fiber intake (vegetables, whole grains)' : 'फाइबर का सेवन बढ़ाएं (सब्जियां, साबुत अनाज)',
        language === 'en' ? 'Reduce sugar and processed foods' : 'चीनी और प्रसंस्कृत खाद्य पदार्थों को कम करें',
        language === 'en' ? 'Drink green tea daily' : 'दैनिक ग्रीन टी पिएं'
      );
    }
    if (selectedSymptoms.includes('digestive')) {
      dietRecs.push(
        language === 'en' ? 'Eat probiotic foods (yogurt, buttermilk)' : 'प्रोबायोटिक खाद्य पदार्थ खाएं (दही, छाछ)',
        language === 'en' ? 'Avoid spicy and oily foods' : 'मसालेदार और तैलीय भोजन से बचें'
      );
    }
    if (selectedSymptoms.includes('fatigue')) {
      dietRecs.push(
        language === 'en' ? 'Iron-rich foods (spinach, dates, jaggery)' : 'आयरन युक्त खाद्य पदार्थ (पालक, खजूर, गुड़)',
        language === 'en' ? 'Vitamin B12 sources' : 'विटामिन बी12 स्रोत'
      );
    }
    if (selectedSymptoms.includes('irregular_periods')) {
      dietRecs.push(
        language === 'en' ? 'Omega-3 fatty acids (flaxseeds, walnuts)' : 'ओमेगा-3 फैटी एसिड (अलसी के बीज, अखरोट)',
        language === 'en' ? 'Low glycemic index foods' : 'कम ग्लाइसेमिक इंडेक्स खाद्य पदार्थ'
      );
    }

    // Lifestyle advice
    const lifestyleRecs: string[] = [];
    if (selectedSymptoms.includes('insomnia') || selectedSymptoms.includes('anxiety')) {
      lifestyleRecs.push(
        language === 'en' ? 'Maintain regular sleep schedule (10 PM - 6 AM)' : 'नियमित नींद कार्यक्रम बनाए रखें (रात 10 - सुबह 6)',
        language === 'en' ? 'Avoid screens 1 hour before bed' : 'सोने से 1 घंटे पहले स्क्रीन से बचें',
        language === 'en' ? 'Practice meditation daily' : 'दैनिक ध्यान का अभ्यास करें'
      );
    }
    if (selectedSymptoms.includes('weight_gain')) {
      lifestyleRecs.push(
        language === 'en' ? 'Walk 30 minutes daily' : 'दैनिक 30 मिनट चलें',
        language === 'en' ? 'Drink 8-10 glasses of water' : '8-10 गिलास पानी पिएं'
      );
    }
    lifestyleRecs.push(
      language === 'en' ? 'Maintain consistent meal times' : 'भोजन का समय निरंतर बनाए रखें',
      language === 'en' ? 'Reduce stress through hobbies' : 'शौक के माध्यम से तनाव कम करें'
    );

    setRecommendations({
      conditions: detectedConditions,
      yoga: yogaRecs,
      ayurveda: ayurvedicRecs,
      diet: dietRecs,
      lifestyle: lifestyleRecs,
    });
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setRecommendations(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-emerald-900 mb-2">{t.title}</h2>
        <p className="text-emerald-700">{t.description}</p>
      </div>

      {/* Symptom Selection */}
      <Card className="bg-white/70 backdrop-blur-sm border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            {t.selectSymptoms}
          </CardTitle>
          <CardDescription>
            Select all symptoms you are currently experiencing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {symptoms.map((symptom) => (
              <div key={symptom.id} className="flex items-center space-x-2">
                <Checkbox
                  id={symptom.id}
                  checked={selectedSymptoms.includes(symptom.id)}
                  onCheckedChange={() => handleSymptomToggle(symptom.id)}
                />
                <Label htmlFor={symptom.id} className="cursor-pointer">
                  {language === 'en' ? symptom.label : symptom.labelHi}
                </Label>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              onClick={generateRecommendations}
              disabled={selectedSymptoms.length === 0}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              {t.getRecommendations}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-emerald-300"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t.reset}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Display */}
      {recommendations && (
        <div className="space-y-4">
          {/* Possible Conditions */}
          {recommendations.conditions.length > 0 && (
            <Card className="bg-amber-50/70 backdrop-blur-sm border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">{t.possibleConditions}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recommendations.conditions.map((condition: any) => (
                    <Badge key={condition.id} className="bg-amber-500 text-white">
                      {language === 'en' ? condition.name : condition.nameHi}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-amber-800 mt-3">
                  {t.disclaimer}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Yoga Recommendations */}
          {recommendations.yoga.length > 0 && (
            <Card className="bg-teal-50/70 backdrop-blur-sm border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-900 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  {t.yogaRecommendations}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.yoga.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">✦</span>
                      <span className="text-teal-900">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Ayurvedic Remedies */}
          {recommendations.ayurveda.length > 0 && (
            <Card className="bg-green-50/70 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  {t.ayurvedicRemedies}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.ayurveda.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">🌿</span>
                      <span className="text-green-900">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Diet Guidelines */}
          {recommendations.diet.length > 0 && (
            <Card className="bg-lime-50/70 backdrop-blur-sm border-lime-200">
              <CardHeader>
                <CardTitle className="text-lime-900 flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5" />
                  {t.dietGuidelines}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.diet.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-lime-600 mt-1">🥗</span>
                      <span className="text-lime-900">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Lifestyle Advice */}
          {recommendations.lifestyle.length > 0 && (
            <Card className="bg-purple-50/70 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">{t.lifestyleAdvice}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.lifestyle.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">💡</span>
                      <span className="text-purple-900">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
