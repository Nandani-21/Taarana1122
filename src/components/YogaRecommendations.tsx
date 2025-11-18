import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Clock, AlertCircle, Target, Play } from 'lucide-react';
import { YogaPracticeModal } from './Modals/YogaPracticeModal';
import { YogaStepsModal } from './Modals/YogaStepsModal';
import { yogaDatabase } from '../data/yogaDatabase';
import type { Language } from '../App';
import type { YogaPose } from '../types';

interface YogaRecommendationsProps {
  language: Language;
}

const translations = {
  en: {
    title: 'Yoga Recommendations',
    description: 'Personalized yoga poses for your health conditions',
    forDisease: 'For Your Conditions',
    menstrualPhase: 'For Menstrual Phase',
    general: 'General Wellness',
    benefits: 'Benefits',
    duration: 'Duration',
    precautions: 'Precautions',
    startPractice: 'Start Practice',
    viewSteps: 'View Steps',
  },
  hi: {
    title: 'योग सिफारिशें',
    description: 'आपकी स्वास्थ्य स्थितियों के लिए व्यक्तिगत योग आसन',
    forDisease: 'आपकी स्थितियों के लिए',
    menstrualPhase: 'मासिक चरण के लिए',
    general: 'सामान्य कल्याण',
    benefits: 'लाभ',
    duration: 'अवधि',
    precautions: 'सावधानियां',
    startPractice: 'अभ्यास शुरू करें',
    viewSteps: 'चरण देखें',
  },
};

export function YogaRecommendations({ language }: YogaRecommendationsProps) {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('disease');
  const [practiceModal, setPracticeModal] = useState<{ open: boolean; pose: YogaPose | null }>({
    open: false,
    pose: null,
  });
  const [stepsModal, setStepsModal] = useState<{ open: boolean; pose: YogaPose | null }>({
    open: false,
    pose: null,
  });

  const yogaPoses = {
    disease: yogaDatabase.filter(p => p.category === 'disease'),
    menstrual: yogaDatabase.filter(p => p.category === 'menstrual'),
    general: yogaDatabase.filter(p => p.category === 'general'),
  };

  const renderYogaCard = (pose: YogaPose) => (
    <Card key={pose.id} className="bg-white/70 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center text-3xl">
            {pose.emoji}
          </div>
          <div className="flex-1">
            <CardTitle className="text-emerald-900">
              {language === 'en' ? pose.name : (pose.nameHi || pose.name)}
            </CardTitle>
            {pose.condition && (
              <CardDescription className="mt-1">
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                  {pose.condition}
                </Badge>
              </CardDescription>
            )}
            {pose.phase && (
              <CardDescription className="mt-1">
                <Badge variant="secondary" className="bg-pink-50 text-pink-700">
                  {pose.phase}
                </Badge>
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Target className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-emerald-800">{t.benefits}</p>
              <p className="text-sm text-emerald-600">
                {language === 'en' ? pose.benefits : pose.benefitsHi}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-teal-800">{t.duration}</p>
              <p className="text-sm text-teal-600">{pose.duration}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-amber-800">{t.precautions}</p>
              <p className="text-sm text-amber-600">
                {language === 'en' ? pose.precautions : pose.precautionsHi}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1 bg-emerald-500 hover:bg-emerald-600"
            onClick={() => setPracticeModal({ open: true, pose })}
          >
            <Play className="h-4 w-4 mr-2" />
            {t.startPractice}
          </Button>
          <Button 
            variant="outline" 
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            onClick={() => setStepsModal({ open: true, pose })}
          >
            {t.viewSteps}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-emerald-900 mb-2">{t.title}</h2>
        <p className="text-emerald-700">{t.description}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/70 border border-emerald-200">
          <TabsTrigger value="disease" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            {t.forDisease}
          </TabsTrigger>
          <TabsTrigger value="menstrual" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
            {t.menstrualPhase}
          </TabsTrigger>
          <TabsTrigger value="general" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            {t.general}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="disease" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {yogaPoses.disease.map(renderYogaCard)}
          </div>
        </TabsContent>

        <TabsContent value="menstrual" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {yogaPoses.menstrual.map(renderYogaCard)}
          </div>
        </TabsContent>

        <TabsContent value="general" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {yogaPoses.general.map(renderYogaCard)}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {practiceModal.pose && (
        <YogaPracticeModal
          open={practiceModal.open}
          onClose={() => setPracticeModal({ open: false, pose: null })}
          pose={practiceModal.pose}
          language={language}
        />
      )}

      {stepsModal.pose && (
        <YogaStepsModal
          open={stepsModal.open}
          onClose={() => setStepsModal({ open: false, pose: null })}
          pose={stepsModal.pose}
          language={language}
        />
      )}
    </div>
  );
}