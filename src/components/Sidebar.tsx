import { Home, Activity, Leaf, UtensilsCrossed, Calendar, Bell, Download, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import type { Language, ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  language: Language;
  isOpen: boolean;
}

const translations = {
  en: {
    home: 'Dashboard',
    yoga: 'Yoga Recommendations',
    ayurveda: 'Ayurvedic Remedies',
    diet: 'Diet Guidelines',
    menstrual: 'Menstrual Tracker',
    reminders: 'Reminders',
    recommendations: 'AI Recommendations',
    export: 'Export PDF',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
  },
  hi: {
    home: 'डैशबोर्ड',
    yoga: 'योग सिफारिशें',
    ayurveda: 'आयुर्वेदिक उपचार',
    diet: 'आहार दिशानिर्देश',
    menstrual: 'मासिक चक्र ट्रैकर',
    reminders: 'अनुस्मारक',
    recommendations: 'एआई सिफारिशें',
    export: 'पीडीएफ निर्यात करें',
    about: 'के बारे में',
    contact: 'संपर्क करें',
    privacy: 'गोपनीयता नीति',
  },
};

const navItems = [
  { id: 'home' as ViewType, icon: Home, color: 'emerald' },
  { id: 'recommendations' as ViewType, icon: Sparkles, color: 'purple' },
  { id: 'yoga' as ViewType, icon: Activity, color: 'teal' },
  { id: 'ayurveda' as ViewType, icon: Leaf, color: 'green' },
  { id: 'diet' as ViewType, icon: UtensilsCrossed, color: 'lime' },
  { id: 'menstrual' as ViewType, icon: Calendar, color: 'pink' },
  { id: 'reminders' as ViewType, icon: Bell, color: 'amber' },
];

export function Sidebar({ currentView, onNavigate, language, isOpen }: SidebarProps) {
  const t = translations[language];

  if (!isOpen) return null;

  const handleExportPDF = () => {
    alert('PDF Export feature - This would generate and download your personalized wellness plan');
  };

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white/80 backdrop-blur-md border-r border-emerald-100 shadow-lg z-40 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start gap-3 ${
                isActive 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                  : 'hover:bg-emerald-50 text-emerald-800'
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span>{t[item.id]}</span>
            </Button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-emerald-100">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            onClick={handleExportPDF}
          >
            <Download className="h-5 w-5" />
            <span>{t.export}</span>
          </Button>
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-emerald-100 bg-white/60 backdrop-blur-sm">
        <div className="space-y-1 text-xs text-emerald-600">
          <button className="hover:text-emerald-800 block">{t.about}</button>
          <button className="hover:text-emerald-800 block">{t.contact}</button>
          <button className="hover:text-emerald-800 block">{t.privacy}</button>
        </div>
        <p className="text-xs text-emerald-500 mt-3">© 2025 HealMate</p>
      </div>
    </aside>
  );
}