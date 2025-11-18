import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardHome } from './components/DashboardHome';
import { YogaRecommendations } from './components/YogaRecommendations';
import { AyurvedicRemedies } from './components/AyurvedicRemedies';
import { DietGuidelines } from './components/DietGuidelines';
import { MenstrualTracker } from './components/MenstrualTracker';
import { RemindersPanel } from './components/RemindersPanel';
import { LoginPage } from './components/Auth/LoginPage';
import { SignupPage } from './components/Auth/SignupPage';
import { EnhancedSignupPage } from './components/Auth/EnhancedSignupPage';
import { OTPLoginPage } from './components/Auth/OTPLoginPage';
import { Chatbot } from './components/Chatbot';
import { RecommendationEngine } from './components/RecommendationEngine';
import { SplashScreen } from './components/SplashScreen';
import { supabase } from './utils/supabase/client';
import logo from 'figma:asset/b351f80226d29dc81dd89730efa7bf2830c8c39f.png';

export type Language = 'en' | 'hi';
export type ViewType = 'home' | 'yoga' | 'ayurveda' | 'diet' | 'menstrual' | 'reminders' | 'recommendations';
export type AuthView = 'login' | 'signup' | 'otp' | 'enhanced-signup';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('otp');
  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setCurrentView('home');
    setAuthView('otp');
  };

  if (showSplash && loading) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (loading && !showSplash) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <img src={logo} alt="Taarana Logo" className="h-32 w-auto animate-pulse" />
          </div>
          <p className="text-xl text-gray-600 italic mb-2">आरोग्यं परमं भाग्यम्</p>
          <p className="text-emerald-700">Loading Taarana...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (authView === 'enhanced-signup') {
      return (
        <EnhancedSignupPage
          onSignupSuccess={() => setAuthView('otp')}
          onSwitchToLogin={() => setAuthView('otp')}
        />
      );
    }
    if (authView === 'signup') {
      return (
        <SignupPage
          onSignupSuccess={() => setAuthView('login')}
          onSwitchToLogin={() => setAuthView('login')}
        />
      );
    }
    if (authView === 'otp') {
      return (
        <OTPLoginPage
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={() => setAuthView('enhanced-signup')}
          onSwitchToPasswordLogin={() => setAuthView('login')}
        />
      );
    }
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignup={() => setAuthView('enhanced-signup')}
      />
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <DashboardHome language={language} onNavigate={setCurrentView} />;
      case 'yoga':
        return <YogaRecommendations language={language} />;
      case 'ayurveda':
        return <AyurvedicRemedies language={language} />;
      case 'diet':
        return <DietGuidelines language={language} />;
      case 'menstrual':
        return <MenstrualTracker language={language} />;
      case 'reminders':
        return <RemindersPanel language={language} />;
      case 'recommendations':
        return <RecommendationEngine language={language} />;
      default:
        return <DashboardHome language={language} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header 
        language={language} 
        onLanguageChange={setLanguage}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onLogout={handleLogout}
      />
      
      <div className="flex">
        <Sidebar 
          currentView={currentView}
          onNavigate={setCurrentView}
          language={language}
          isOpen={sidebarOpen}
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
          <div className="container mx-auto p-6 max-w-7xl">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Floating Chatbot */}
      <Chatbot language={language} />
    </div>
  );
}