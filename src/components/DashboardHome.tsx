import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Activity, Leaf, UtensilsCrossed, Calendar, Mic, TrendingUp, Heart, Droplets } from 'lucide-react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import type { Language, ViewType } from '../App';

interface DashboardHomeProps {
  language: Language;
  onNavigate: (view: ViewType) => void;
}

const translations = {
  en: {
    welcomeBack: 'Welcome back',
    todaysPlan: "Today's Wellness Plan",
    yogaOfTheDay: 'Yoga of the Day',
    ayurvedicRemedy: 'Ayurvedic Remedy',
    dietPlan: 'Diet Plan',
    menstrualPhase: 'Menstrual Phase',
    upcomingReminders: 'Upcoming Reminders',
    quickActions: 'Quick Actions',
    voiceQuery: 'Voice Query',
    updateSymptoms: 'Update Symptoms',
    healthStats: 'Health Statistics',
    weeklyProgress: 'Weekly Progress',
    viewAll: 'View All',
    completedToday: 'Completed Today',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    follicular: 'Follicular Phase',
    follicularDesc: 'Energy levels are rising',
  },
  hi: {
    welcomeBack: 'स्वागत है',
    todaysPlan: 'आज की स्वास्थ्य योजना',
    yogaOfTheDay: 'आज का योग',
    ayurvedicRemedy: 'आयुर्वेदिक उपचार',
    dietPlan: 'आहार योजना',
    menstrualPhase: 'मासिक चरण',
    upcomingReminders: 'आगामी अनुस्मारक',
    quickActions: 'त्वरित क्रियाएं',
    voiceQuery: 'आवाज क्वेरी',
    updateSymptoms: 'लक्षण अपडेट करें',
    healthStats: 'स्वास्थ्य सांख्यिकी',
    weeklyProgress: 'साप्ताहिक प्रगति',
    viewAll: 'सभी देखें',
    completedToday: 'आज पूर्ण हुआ',
    morning: 'सुबह',
    afternoon: 'दोपहर',
    evening: 'शाम',
    follicular: 'फॉलिक्युलर चरण',
    follicularDesc: 'ऊर्जा स्तर बढ़ रहे हैं',
  },
};

export function DashboardHome({ language, onNavigate }: DashboardHomeProps) {
  const t = translations[language];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-3xl mb-2">{t.welcomeBack}, Priya! 🙏</h2>
        <p className="text-emerald-100">Let's continue your wellness journey today</p>
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/60 backdrop-blur-sm border-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600">Yoga Streak</p>
                <p className="text-2xl text-emerald-800">7 days</p>
              </div>
              <Activity className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-teal-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Remedies Taken</p>
                <p className="text-2xl text-teal-800">12/14</p>
              </div>
              <Leaf className="h-8 w-8 text-teal-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-lime-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-lime-700">Diet Adherence</p>
                <p className="text-2xl text-lime-800">85%</p>
              </div>
              <Heart className="h-8 w-8 text-lime-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-cyan-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-600">Hydration</p>
                <p className="text-2xl text-cyan-800">6/8 cups</p>
              </div>
              <Droplets className="h-8 w-8 text-cyan-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yoga Widget */}
        <Card className="bg-white/70 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-emerald-800">{t.yogaOfTheDay}</CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-emerald-600 hover:bg-emerald-50"
                onClick={() => onNavigate('yoga')}
              >
                {t.viewAll}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-emerald-50 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-emerald-200 rounded-lg flex items-center justify-center text-3xl">
                  🧘‍♀️
                </div>
                <div className="flex-1">
                  <h4 className="text-emerald-900 mb-1">Surya Namaskar (Sun Salutation)</h4>
                  <p className="text-sm text-emerald-700 mb-2">Energizes body, improves flexibility</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">15 min</Badge>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">{t.morning}</Badge>
                  </div>
                </div>
              </div>
            </div>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Start Practice</Button>
          </CardContent>
        </Card>

        {/* Ayurveda Widget */}
        <Card className="bg-white/70 backdrop-blur-sm border-teal-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-teal-600" />
                <CardTitle className="text-teal-800">{t.ayurvedicRemedy}</CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-teal-600 hover:bg-teal-50"
                onClick={() => onNavigate('ayurveda')}
              >
                {t.viewAll}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-teal-50 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-teal-200 rounded-lg flex items-center justify-center text-3xl">
                  🌿
                </div>
                <div className="flex-1">
                  <h4 className="text-teal-900 mb-1">Turmeric Golden Milk</h4>
                  <p className="text-sm text-teal-700 mb-2">Anti-inflammatory, boosts immunity</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-teal-100 text-teal-700">Before bed</Badge>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-700">1 cup</Badge>
                  </div>
                </div>
              </div>
            </div>
            <Button className="w-full bg-teal-500 hover:bg-teal-600">View Recipe</Button>
          </CardContent>
        </Card>

        {/* Diet Widget */}
        <Card className="bg-white/70 backdrop-blur-sm border-lime-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5 text-lime-700" />
                <CardTitle className="text-lime-800">{t.dietPlan}</CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-lime-700 hover:bg-lime-50"
                onClick={() => onNavigate('diet')}
              >
                {t.viewAll}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-lime-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌅</span>
                  <div>
                    <p className="text-sm text-lime-900">Breakfast</p>
                    <p className="text-xs text-lime-700">Oats with fruits & nuts</p>
                  </div>
                </div>
                <Badge className="bg-lime-200 text-lime-800">✓</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-lime-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">☀️</span>
                  <div>
                    <p className="text-sm text-lime-900">Lunch</p>
                    <p className="text-xs text-lime-700">Dal, rice, vegetables</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-lime-300 text-lime-700">Pending</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-lime-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌙</span>
                  <div>
                    <p className="text-sm text-lime-900">Dinner</p>
                    <p className="text-xs text-lime-700">Light soup & salad</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-lime-300 text-lime-700">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menstrual Tracker Widget */}
        <Card className="bg-white/70 backdrop-blur-sm border-pink-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-pink-600" />
                <CardTitle className="text-pink-800">{t.menstrualPhase}</CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-pink-600 hover:bg-pink-50"
                onClick={() => onNavigate('menstrual')}
              >
                {t.viewAll}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-pink-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center text-xl">
                  🌸
                </div>
                <div>
                  <h4 className="text-pink-900">{t.follicular}</h4>
                  <p className="text-sm text-pink-700">{t.follicularDesc}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-pink-700">Cycle Day</span>
                  <span className="text-pink-900">Day 8 of 28</span>
                </div>
                <Progress value={28} className="bg-pink-100" />
              </div>
            </div>
            <div className="bg-pink-50 rounded-lg p-3">
              <p className="text-sm text-pink-800">💡 Recommendation: Focus on strength training and high-energy yoga poses</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/70 backdrop-blur-sm border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-800">{t.quickActions}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto py-4 flex-col gap-2 bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
              <Mic className="h-6 w-6" />
              <span>{t.voiceQuery}</span>
            </Button>
            <Button className="h-auto py-4 flex-col gap-2 bg-gradient-to-br from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600">
              <TrendingUp className="h-6 w-6" />
              <span>{t.updateSymptoms}</span>
            </Button>
            <Button className="h-auto py-4 flex-col gap-2 bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              <Calendar className="h-6 w-6" />
              <span>Track Progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
