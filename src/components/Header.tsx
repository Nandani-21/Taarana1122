import { Search, Bell, Menu, User, Settings, LogOut, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import type { Language } from '../App';
import logo from 'figma:asset/b351f80226d29dc81dd89730efa7bf2830c8c39f.png';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onToggleSidebar: () => void;
  onLogout: () => void;
}

const translations = {
  en: {
    appName: 'HealMate',
    tagline: 'Holistic Wellness Platform',
    notifications: 'Notifications',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
  },
  hi: {
    appName: 'हीलमेट',
    tagline: 'समग्र स्वास्थ्य मंच',
    notifications: 'सूचनाएं',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    logout: 'लॉगआउट',
  },
};

export function Header({ language, onLanguageChange, onToggleSidebar, onLogout }: HeaderProps) {
  const t = translations[language];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-emerald-200 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo & Menu Toggle */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <img src={logo} alt="Taarana Logo" className="h-10 w-auto" />
            <div className="hidden md:block">
              <p className="text-sm text-gray-500 italic">आरोग्यं परमं भाग्यम्</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-emerald-50">
                <Globe className="h-5 w-5 text-emerald-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onLanguageChange('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange('hi')}>
                हिंदी (Hindi)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-emerald-50">
                <Bell className="h-5 w-5 text-emerald-700" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <p className="text-emerald-800 mb-2">{t.notifications}</p>
                <div className="space-y-2">
                  <div className="p-2 bg-emerald-50 rounded-md text-sm">
                    🧘‍♀️ Time for your morning yoga routine
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-md text-sm">
                    🌿 Remember to take your herbal remedy
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-md text-sm">
                    💧 Drink water - Stay hydrated!
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-emerald-50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-emerald-500 text-white">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-emerald-800 hidden md:inline">Priya Sharma</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                {t.profile}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {t.settings}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-rose-600" onClick={onLogout}>
                {t.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}