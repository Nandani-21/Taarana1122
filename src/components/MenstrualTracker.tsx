import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar as CalendarIcon, Activity, Leaf, UtensilsCrossed, Heart, Smile, Frown, Meh, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import type { Language } from '../App';

interface MenstrualTrackerProps {
  language: Language;
}

const translations = {
  en: {
    title: 'Menstrual Cycle Tracker',
    description: 'Track your cycle and get personalized wellness advice',
    currentPhase: 'Current Phase',
    cycleDay: 'Cycle Day',
    nextPeriod: 'Next Period Expected',
    logSymptoms: 'Log Symptoms',
    phaseRecommendations: 'Phase Recommendations',
    yoga: 'Yoga',
    ayurveda: 'Ayurveda',
    diet: 'Diet',
    lifestyle: 'Lifestyle',
    moodTracker: 'Mood Tracker',
    symptoms: 'Common Symptoms',
    menstrual: 'Menstrual Phase',
    follicular: 'Follicular Phase',
    ovulation: 'Ovulation Phase',
    luteal: 'Luteal Phase',
    days: 'days',
    updateCycle: 'Update Cycle Data',
    lastPeriodStart: 'Last Period Start Date',
    avgCycleLength: 'Average Cycle Length',
    save: 'Save',
    in: 'in',
  },
  hi: {
    title: 'मासिक चक्र ट्रैकर',
    description: 'अपने चक्र को ट्रैक करें और व्यक्तिगत स्वास्थ्य सलाह प्राप्त करें',
    currentPhase: 'वर्तमान चरण',
    cycleDay: 'चक्र दिवस',
    nextPeriod: 'अगली माहवारी अपेक्षित',
    logSymptoms: 'लक्षण लॉग करें',
    phaseRecommendations: 'चरण सिफारिशें',
    yoga: 'योग',
    ayurveda: 'आयुर्वेद',
    diet: 'आहार',
    lifestyle: 'जीवनशैली',
    moodTracker: 'मूड ट्रैकर',
    symptoms: 'सामान्य लक्षण',
    menstrual: 'मासिक धर्म चरण',
    follicular: 'फॉलिक्युलर चरण',
    ovulation: 'ओव्यूलेशन चरण',
    luteal: 'ल्यूटियल चरण',
    days: 'दिन',
    updateCycle: 'चक्र डेटा अपडेट करें',
    lastPeriodStart: 'अंतिम माहवारी शुरू तिथि',
    avgCycleLength: 'औसत चक्र लंबाई',
    save: 'सहेजें',
    in: 'में',
  },
};

const phases = [
  {
    id: 'menstrual',
    name: 'Menstrual Phase',
    nameHi: 'मासिक धर्म चरण',
    emoji: '🌙',
    dayRange: [1, 5],
    color: 'rose',
    description: 'Period days - Time for rest and self-care',
    descriptionHi: 'माहवारी के दिन - आराम और आत्म-देखभाल का समय',
    yoga: 'Gentle poses: Balasana, Supta Baddha Konasana',
    yogaHi: 'सौम्य आसन: बालासन, सुप्त बद्ध कोणासन',
    ayurveda: 'Warm herbal teas, light warming foods',
    ayurvedaHi: 'गर्म हर्बल चाय, हल्के गर्म खाद्य पदार्थ',
    diet: 'Iron-rich foods, dates, leafy greens',
    dietHi: 'आयरन युक्त खाद्य पदार्थ, खजूर, हरी सब्जियां',
    lifestyle: 'Rest, avoid intense workouts, stay warm',
    lifestyleHi: 'आराम करें, तीव्र कसरत से बचें, गर्म रहें',
  },
  {
    id: 'follicular',
    name: 'Follicular Phase',
    nameHi: 'फॉलिक्युलर चरण',
    emoji: '🌸',
    dayRange: [6, 13],
    color: 'emerald',
    description: 'Energy building - Great time to start new projects',
    descriptionHi: 'ऊर्जा निर्माण - नई परियोजनाएं शुरू करने का अच्छा समय',
    yoga: 'Dynamic flows: Surya Namaskar, Warrior poses',
    yogaHi: 'गतिशील प्रवाह: सूर्य नमस्कार, योद्धा आसन',
    ayurveda: 'Shatavari, cooling herbs',
    ayurvedaHi: 'शतावरी, ठंडी जड़ी बूटियां',
    diet: 'Fresh vegetables, lean proteins, whole grains',
    dietHi: 'ताजी सब्जियां, लीन प्रोटीन, साबुत अनाज',
    lifestyle: 'High-energy workouts, socialize, creative activities',
    lifestyleHi: 'उच्च ऊर्जा कसरत, सामाजिककरण, रचनात्मक गतिविधियां',
  },
  {
    id: 'ovulation',
    name: 'Ovulation Phase',
    nameHi: 'ओव्यूलेशन चरण',
    emoji: '🌟',
    dayRange: [14, 16],
    color: 'amber',
    description: 'Peak energy - Most fertile time',
    descriptionHi: 'चरम ऊर्जा - सबसे उपजाऊ समय',
    yoga: 'Strength poses: Plank, Boat pose, Power yoga',
    yogaHi: 'शक्ति आसन: प्लैंक, नौकासन, पावर योग',
    ayurveda: 'Cooling foods, coconut water, aloe vera',
    ayurvedaHi: 'ठंडे खाद्य पदार्थ, नारियल पानी, एलोवेरा',
    diet: 'Fiber-rich, antioxidant foods, berries',
    dietHi: 'फाइबर युक्त, एंटीऑक्सीडेंट खाद्य पदार्थ, बेरी',
    lifestyle: 'High-intensity workouts, public speaking, connect with others',
    lifestyleHi: 'उच्च तीव्रता कसरत, सार्वजनिक बोलना, दूसरों से जुड़ना',
  },
  {
    id: 'luteal',
    name: 'Luteal Phase',
    nameHi: 'ल्यूटियल चरण',
    emoji: '🍂',
    dayRange: [17, 28],
    color: 'purple',
    description: 'Winding down - Time to slow down and reflect',
    descriptionHi: 'धीमा होना - धीमा होने और प्रतिबिंबित करने का समय',
    yoga: 'Restorative: Yin yoga, gentle stretches',
    yogaHi: 'पुनर्स्थापना: यिन योग, सौम्य खिंचाव',
    ayurveda: 'Ashwagandha for mood, magnesium-rich foods',
    ayurvedaHi: 'मूड के लिए अश्वगंधा, मैग्नीशियम युक्त खाद्य पदार्थ',
    diet: 'Complex carbs, healthy fats, dark chocolate',
    dietHi: 'जटिल कार्ब्स, स्वस्थ वसा, डार्क चॉकलेट',
    lifestyle: 'Moderate exercise, journaling, self-care',
    lifestyleHi: 'मध्यम व्यायाम, जर्नलिंग, आत्म-देखभाल',
  },
];

export function MenstrualTracker({ language }: MenstrualTrackerProps) {
  const t = translations[language];
  
  // State for cycle tracking
  const [lastPeriodDate, setLastPeriodDate] = useState<Date>(new Date('2024-01-01'));
  const [cycleLength, setCycleLength] = useState(28);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [tempLastPeriod, setTempLastPeriod] = useState('');
  const [tempCycleLength, setTempCycleLength] = useState('28');
  
  // Calculate current day of cycle: day_number = today - last_period
  const today = new Date();
  const daysSinceLastPeriod = Math.floor((today.getTime() - lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24));
  const cycleDay = (daysSinceLastPeriod % cycleLength) + 1;
  
  // Calculate next period: next_period = last_period + cycle_length
  const nextPeriodDate = new Date(lastPeriodDate);
  nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);
  const daysUntilNextPeriod = Math.floor((nextPeriodDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Determine current phase based on cycle day
  const getCurrentPhase = () => {
    for (const phase of phases) {
      if (cycleDay >= phase.dayRange[0] && cycleDay <= phase.dayRange[1]) {
        return phase;
      }
    }
    return phases[3]; // Default to luteal if beyond day 16
  };
  
  const currentPhase = getCurrentPhase();
  const progress = (cycleDay / cycleLength) * 100;

  const handleSaveCycleData = () => {
    if (tempLastPeriod) {
      setLastPeriodDate(new Date(tempLastPeriod));
    }
    if (tempCycleLength) {
      setCycleLength(parseInt(tempCycleLength));
    }
    setEditDialogOpen(false);
  };

  const moodOptions = [
    { icon: Smile, label: 'Happy', labelHi: 'खुश', color: 'text-emerald-600' },
    { icon: Meh, label: 'Neutral', labelHi: 'तटस्थ', color: 'text-gray-600' },
    { icon: Frown, label: 'Low', labelHi: 'कम', color: 'text-rose-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-emerald-900 mb-2">{t.title}</h2>
          <p className="text-emerald-700">{t.description}</p>
        </div>
        
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-emerald-300">
              <Edit className="h-4 w-4 mr-2" />
              {t.updateCycle}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.updateCycle}</DialogTitle>
              <DialogDescription>Update your cycle information for accurate tracking</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="lastPeriod">{t.lastPeriodStart}</Label>
                <Input
                  id="lastPeriod"
                  type="date"
                  value={tempLastPeriod}
                  onChange={(e) => setTempLastPeriod(e.target.value)}
                  className="border-emerald-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cycleLength">{t.avgCycleLength} ({t.days})</Label>
                <Input
                  id="cycleLength"
                  type="number"
                  min="21"
                  max="35"
                  value={tempCycleLength}
                  onChange={(e) => setTempCycleLength(e.target.value)}
                  className="border-emerald-200"
                />
              </div>
              <Button onClick={handleSaveCycleData} className="w-full bg-emerald-500 hover:bg-emerald-600">
                {t.save}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Current Phase Overview */}
      <Card className={`bg-gradient-to-br from-${currentPhase.color}-50 to-${currentPhase.color}-100 border-${currentPhase.color}-200`}>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 bg-${currentPhase.color}-200 rounded-full flex items-center justify-center text-3xl`}>
              {currentPhase.emoji}
            </div>
            <div className="flex-1">
              <CardTitle className={`text-${currentPhase.color}-900`}>
                {language === 'en' ? currentPhase.name : currentPhase.nameHi}
              </CardTitle>
              <CardDescription className={`text-${currentPhase.color}-700`}>
                {language === 'en' ? currentPhase.description : currentPhase.descriptionHi}
              </CardDescription>
            </div>
            <Badge className={`bg-${currentPhase.color}-500 text-white`}>
              {t.days} {currentPhase.dayRange[0]}-{currentPhase.dayRange[1]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className={`text-${currentPhase.color}-700`}>{t.cycleDay}</span>
              <span className={`text-${currentPhase.color}-900`}>
                {t.cycleDay} {cycleDay} {t.of} {cycleLength}
              </span>
            </div>
            <Progress value={progress} className={`bg-${currentPhase.color}-200`} />
          </div>
          
          <div className={`bg-white/60 rounded-lg p-4 border border-${currentPhase.color}-200`}>
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className={`h-4 w-4 text-${currentPhase.color}-700`} />
              <span className={`text-sm text-${currentPhase.color}-800`}>{t.nextPeriod}</span>
            </div>
            <p className={`text-${currentPhase.color}-900`}>
              {t.in} {daysUntilNextPeriod} {t.days}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {nextPeriodDate.toLocaleDateString()}
            </p>
          </div>

          <Button className={`w-full bg-${currentPhase.color}-500 hover:bg-${currentPhase.color}-600`}>
            {t.logSymptoms}
          </Button>
        </CardContent>
      </Card>

      {/* Mood Tracker */}
      <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            {t.moodTracker}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {moodOptions.map((mood) => {
              const Icon = mood.icon;
              return (
                <Button
                  key={mood.label}
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2 border-purple-200 hover:bg-purple-50"
                >
                  <Icon className={`h-8 w-8 ${mood.color}`} />
                  <span className="text-sm">{language === 'en' ? mood.label : mood.labelHi}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Phase Recommendations */}
      <div>
        <h3 className="text-2xl text-emerald-900 mb-4">{t.phaseRecommendations}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white/70 backdrop-blur-sm border-teal-200">
            <CardHeader>
              <CardTitle className="text-teal-900 flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5" />
                {t.yoga}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-teal-800">
                {language === 'en' ? currentPhase.yoga : currentPhase.yogaHi}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="text-green-900 flex items-center gap-2 text-lg">
                <Leaf className="h-5 w-5" />
                {t.ayurveda}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-800">
                {language === 'en' ? currentPhase.ayurveda : currentPhase.ayurvedaHi}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-lime-200">
            <CardHeader>
              <CardTitle className="text-lime-900 flex items-center gap-2 text-lg">
                <UtensilsCrossed className="h-5 w-5" />
                {t.diet}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-lime-900">
                {language === 'en' ? currentPhase.diet : currentPhase.dietHi}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900 flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5" />
                {t.lifestyle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-800">
                {language === 'en' ? currentPhase.lifestyle : currentPhase.lifestyleHi}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* All Phases Timeline */}
      <Card className="bg-white/70 backdrop-blur-sm border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">28-Day Cycle Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {phases.map((phase) => {
              const isCurrentPhase = phase.id === currentPhase.id;
              return (
                <div
                  key={phase.id}
                  className={`p-4 rounded-lg border-2 ${
                    isCurrentPhase
                      ? `bg-${phase.color}-100 border-${phase.color}-400`
                      : `bg-${phase.color}-50 border-${phase.color}-200`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{phase.emoji}</span>
                    <div className="flex-1">
                      <h4 className={`text-${phase.color}-900`}>
                        {language === 'en' ? phase.name : phase.nameHi}
                      </h4>
                      <p className={`text-sm text-${phase.color}-700`}>
                        {t.days} {phase.dayRange[0]}-{phase.dayRange[1]}
                      </p>
                    </div>
                    {isCurrentPhase && (
                      <Badge className={`bg-${phase.color}-500 text-white`}>
                        {t.currentPhase}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
