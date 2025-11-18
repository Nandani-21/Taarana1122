import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Bell, Clock, Droplets, Leaf, Activity, Moon, Sun, Coffee } from 'lucide-react';
import type { Language } from '../App';

interface RemindersPanelProps {
  language: Language;
}

const translations = {
  en: {
    title: 'Smart Reminders',
    description: 'Your personalized wellness reminders',
    todaysReminders: "Today's Reminders",
    upcoming: 'Upcoming',
    completed: 'Completed',
    addReminder: 'Add New Reminder',
    markComplete: 'Mark Complete',
    snooze: 'Snooze',
    all: 'All',
    yoga: 'Yoga',
    remedies: 'Remedies',
    hydration: 'Hydration',
    diet: 'Diet',
    lifestyle: 'Lifestyle',
  },
  hi: {
    title: 'स्मार्ट अनुस्मारक',
    description: 'आपके व्यक्तिगत स्वास्थ्य अनुस्मारक',
    todaysReminders: 'आज के अनुस्मारक',
    upcoming: 'आगामी',
    completed: 'पूर्ण',
    addReminder: 'नया अनुस्मारक जोड़ें',
    markComplete: 'पूर्ण चिह्नित करें',
    snooze: 'स्नूज़',
    all: 'सभी',
    yoga: 'योग',
    remedies: 'उपचार',
    hydration: 'जलयोजन',
    diet: 'आहार',
    lifestyle: 'जीवनशैली',
  },
};

const reminders = [
  {
    id: 1,
    title: 'Morning Yoga Practice',
    titleHi: 'सुबह की योग साधना',
    time: '06:00 AM',
    category: 'yoga',
    icon: Activity,
    color: 'emerald',
    completed: true,
    description: 'Surya Namaskar - 15 minutes',
    descriptionHi: 'सूर्य नमस्कार - 15 मिनट',
  },
  {
    id: 2,
    title: 'Drink Water',
    titleHi: 'पानी पीएं',
    time: '08:00 AM',
    category: 'hydration',
    icon: Droplets,
    color: 'cyan',
    completed: true,
    description: 'Target: 2 cups',
    descriptionHi: 'लक्ष्य: 2 कप',
  },
  {
    id: 3,
    title: 'Take Turmeric Milk',
    titleHi: 'हल्दी का दूध लें',
    time: '09:00 AM',
    category: 'remedies',
    icon: Leaf,
    color: 'amber',
    completed: false,
    description: 'Turmeric Golden Milk',
    descriptionHi: 'हल्दी गोल्डन मिल्क',
  },
  {
    id: 4,
    title: 'Healthy Lunch',
    titleHi: 'स्वस्थ दोपहर का भोजन',
    time: '01:00 PM',
    category: 'diet',
    icon: Coffee,
    color: 'lime',
    completed: false,
    description: 'Dal, rice, vegetables',
    descriptionHi: 'दाल, चावल, सब्जियां',
  },
  {
    id: 5,
    title: 'Afternoon Water Break',
    titleHi: 'दोपहर का पानी विराम',
    time: '03:00 PM',
    category: 'hydration',
    icon: Droplets,
    color: 'cyan',
    completed: false,
    description: 'Target: 2 cups',
    descriptionHi: 'लक्ष्य: 2 कप',
  },
  {
    id: 6,
    title: 'Evening Yoga - Gentle Stretch',
    titleHi: 'शाम का योग - सौम्य खिंचाव',
    time: '06:00 PM',
    category: 'yoga',
    icon: Activity,
    color: 'emerald',
    completed: false,
    description: 'Relaxing poses - 10 minutes',
    descriptionHi: 'आरामदायक आसन - 10 मिनट',
  },
  {
    id: 7,
    title: 'Ashwagandha Tea',
    titleHi: 'अश्वगंधा चाय',
    time: '07:00 PM',
    category: 'remedies',
    icon: Leaf,
    color: 'teal',
    completed: false,
    description: 'For stress relief',
    descriptionHi: 'तनाव राहत के लिए',
  },
  {
    id: 8,
    title: 'Bedtime Routine',
    titleHi: 'सोने का समय दिनचर्या',
    time: '10:00 PM',
    category: 'lifestyle',
    icon: Moon,
    color: 'purple',
    completed: false,
    description: 'Meditation & sleep preparation',
    descriptionHi: 'ध्यान और नींद की तैयारी',
  },
];

export function RemindersPanel({ language }: RemindersPanelProps) {
  const t = translations[language];

  const upcomingReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
      cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
      lime: { bg: 'bg-lime-50', text: 'text-lime-700', border: 'border-lime-200' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    };
    return colorMap[color] || colorMap.emerald;
  };

  const renderReminder = (reminder: typeof reminders[0], showCheckbox = true) => {
    const Icon = reminder.icon;
    const colors = getColorClasses(reminder.color);

    return (
      <Card
        key={reminder.id}
        className={`${colors.bg} border-2 ${colors.border} ${
          reminder.completed ? 'opacity-60' : ''
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {showCheckbox && (
              <Checkbox
                checked={reminder.completed}
                className="mt-1"
              />
            )}
            
            <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Icon className={`h-5 w-5 ${colors.text}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className={`${colors.text} ${reminder.completed ? 'line-through' : ''}`}>
                  {language === 'en' ? reminder.title : reminder.titleHi}
                </h4>
                <Badge variant="outline" className={`${colors.border} ${colors.text} flex-shrink-0`}>
                  <Clock className="h-3 w-3 mr-1" />
                  {reminder.time}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {language === 'en' ? reminder.description : reminder.descriptionHi}
              </p>
              
              {!reminder.completed && (
                <div className="flex gap-2">
                  <Button size="sm" className={`bg-${reminder.color}-500 hover:bg-${reminder.color}-600`}>
                    <Bell className="h-3 w-3 mr-1" />
                    {t.markComplete}
                  </Button>
                  <Button size="sm" variant="outline" className={colors.border}>
                    {t.snooze}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-emerald-900 mb-2">{t.title}</h2>
          <p className="text-emerald-700">{t.description}</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Bell className="h-4 w-4 mr-2" />
          {t.addReminder}
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600">{t.todaysReminders}</p>
                <p className="text-2xl text-emerald-800">{reminders.length}</p>
              </div>
              <Bell className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-600">{t.upcoming}</p>
                <p className="text-2xl text-cyan-800">{upcomingReminders.length}</p>
              </div>
              <Clock className="h-8 w-8 text-cyan-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">{t.completed}</p>
                <p className="text-2xl text-green-800">{completedReminders.length}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Reminders */}
      <div>
        <h3 className="text-xl text-emerald-900 mb-4 flex items-center gap-2">
          <Sun className="h-5 w-5" />
          {t.upcoming}
        </h3>
        <div className="space-y-3">
          {upcomingReminders.map(reminder => renderReminder(reminder))}
        </div>
      </div>

      {/* Completed Reminders */}
      {completedReminders.length > 0 && (
        <div>
          <h3 className="text-xl text-gray-700 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            {t.completed}
          </h3>
          <div className="space-y-3">
            {completedReminders.map(reminder => renderReminder(reminder))}
          </div>
        </div>
      )}

      {/* Quick Categories */}
      <Card className="bg-white/70 backdrop-blur-sm border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">Reminder Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { key: 'all', icon: Bell, color: 'emerald', count: reminders.length },
              { key: 'yoga', icon: Activity, color: 'teal', count: reminders.filter(r => r.category === 'yoga').length },
              { key: 'remedies', icon: Leaf, color: 'amber', count: reminders.filter(r => r.category === 'remedies').length },
              { key: 'hydration', icon: Droplets, color: 'cyan', count: reminders.filter(r => r.category === 'hydration').length },
              { key: 'lifestyle', icon: Moon, color: 'purple', count: reminders.filter(r => r.category === 'lifestyle').length },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.key}
                  variant="outline"
                  className={`h-auto py-4 flex-col gap-2 border-${cat.color}-200 hover:bg-${cat.color}-50`}
                >
                  <Icon className={`h-6 w-6 text-${cat.color}-600`} />
                  <span className="text-sm">{t[cat.key as keyof typeof t]}</span>
                  <Badge className={`bg-${cat.color}-100 text-${cat.color}-700`}>{cat.count}</Badge>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
