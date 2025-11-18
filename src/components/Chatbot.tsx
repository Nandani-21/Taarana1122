import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Send, Bot, User, Loader2, X, MessageCircle } from 'lucide-react';
import type { Language } from '../App';
import { Badge } from './ui/badge';

interface ChatbotProps {
  language: Language;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const translations = {
  en: {
    title: 'Wellness Assistant',
    placeholder: 'Ask about yoga, ayurveda, diet, or symptoms...',
    send: 'Send',
    typing: 'Wellness assistant is typing...',
    greeting: "Namaste! 🙏 I'm your wellness assistant. I can help you with yoga recommendations, Ayurvedic remedies, diet plans, and answer your health questions. How can I assist you today?",
  },
  hi: {
    title: 'स्वास्थ्य सहायक',
    placeholder: 'योग, आयुर्वेद, आहार या लक्षणों के बारे में पूछें...',
    send: 'भेजें',
    typing: 'स्वास्थ्य सहायक टाइप कर रहा है...',
    greeting: "नमस्ते! 🙏 मैं आपका स्वास्थ्य सहायक हूं। मैं योग सिफारिशों, आयुर्वेदिक उपचार, आहार योजनाओं में मदद कर सकता हूं और आपके स्वास्थ्य प्रश्नों का उत्तर दे सकता हूं। मैं आज आपकी कैसे मदद कर सकता हूं?",
  },
};

const quickSuggestions = {
  en: [
    "What yoga poses help with back pain?",
    "Remedies for better sleep",
    "Diet plan for weight loss",
    "Symptoms of PCOS",
    "How to reduce stress?",
  ],
  hi: [
    "पीठ दर्द के लिए कौन से योग आसन मदद करते हैं?",
    "बेहतर नींद के लिए उपाय",
    "वजन घटाने के लिए आहार योजना",
    "पीसीओएस के लक्षण",
    "तनाव कैसे कम करें?",
  ],
};

export function Chatbot({ language }: ChatbotProps) {
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      // Add greeting message
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: t.greeting,
          timestamp: new Date(),
          suggestions: quickSuggestions[language],
        },
      ]);
    }
  }, [language]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const processMessage = async (userMessage: string): Promise<string> => {
    // Simple rule-based responses with dataset lookup
    const lowerMessage = userMessage.toLowerCase();
    
    // Yoga queries
    if (lowerMessage.includes('yoga') || lowerMessage.includes('asana') || lowerMessage.includes('pose')) {
      if (lowerMessage.includes('back') || lowerMessage.includes('pain')) {
        return language === 'en'
          ? "For back pain, I recommend:\n\n1. **Bhujangasana (Cobra Pose)** - Strengthens spine\n2. **Balasana (Child's Pose)** - Gentle stretch\n3. **Marjaryasana-Bitilasana (Cat-Cow)** - Improves flexibility\n\nWould you like detailed steps for any of these?"
          : "पीठ दर्द के लिए, मैं सुझाव देता हूं:\n\n1. **भुजंगासन (कोबरा पोज)** - रीढ़ को मजबूत करता है\n2. **बालासन (बाल मुद्रा)** - सौम्य खिंचाव\n3. **मार्जरीआसन-बितिलासन (बिल्ली-गाय)** - लचीलापन बढ़ाता है\n\nक्या आप इनमें से किसी के लिए विस्तृत चरण चाहेंगे?";
      }
      if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety')) {
        return language === 'en'
          ? "For stress relief, try:\n\n1. **Pranayama (Breath Work)** - Anulom Vilom, Bhramari\n2. **Shavasana** - Deep relaxation\n3. **Meditation** - 10 minutes daily\n\nThese practices calm the nervous system and reduce cortisol levels."
          : "तनाव से राहत के लिए, प्रयास करें:\n\n1. **प्राणायाम** - अनुलोम विलोम, भ्रामरी\n2. **शवासन** - गहरी विश्राम\n3. **ध्यान** - दैनिक 10 मिनट\n\nये अभ्यास तंत्रिका तंत्र को शांत करते हैं और कोर्टिसोल के स्तर को कम करते हैं।";
      }
    }

    // Ayurveda queries
    if (lowerMessage.includes('ayurved') || lowerMessage.includes('remedy') || lowerMessage.includes('herb')) {
      if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
        return language === 'en'
          ? "For better sleep, Ayurveda recommends:\n\n1. **Ashwagandha** - Take 1 tsp with warm milk before bed\n2. **Brahmi** - Calms the mind\n3. **Warm milk with nutmeg** - Natural sedative\n\nAlso maintain regular sleep schedule and avoid screens 1 hour before bed."
          : "बेहतर नींद के लिए, आयुर्वेद सिफारिश करता है:\n\n1. **अश्वगंधा** - सोने से पहले गर्म दूध के साथ 1 चम्मच लें\n2. **ब्राह्मी** - मन को शांत करता है\n3. **जायफल के साथ गर्म दूध** - प्राकृतिक शामक\n\nनियमित नींद कार्यक्रम बनाए रखें और सोने से 1 घंटे पहले स्क्रीन से बचें।";
      }
      if (lowerMessage.includes('digestion') || lowerMessage.includes('stomach')) {
        return language === 'en'
          ? "For digestive health:\n\n1. **Triphala** - Take at night with warm water\n2. **Ginger-Honey Mix** - Before meals\n3. **Cumin Water** - Drink on empty stomach\n\nEat mindfully and avoid cold water with meals."
          : "पाचन स्वास्थ्य के लिए:\n\n1. **त्रिफला** - रात में गर्म पानी के साथ लें\n2. **अदरक-शहद मिश्रण** - भोजन से पहले\n3. **जीरा पानी** - खाली पेट पिएं\n\nध्यानपूर्वक खाएं और भोजन के साथ ठंडे पानी से बचें।";
      }
    }

    // Diet queries
    if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
      if (lowerMessage.includes('weight') || lowerMessage.includes('loss')) {
        return language === 'en'
          ? "Healthy weight loss diet tips:\n\n1. **Breakfast**: Oats with fruits, green tea\n2. **Lunch**: Brown rice, dal, vegetables\n3. **Dinner**: Light soup, salad, grilled protein\n\nAvoid: Processed foods, sugar, late-night eating\nDrink: 8-10 glasses of water daily"
          : "स्वस्थ वजन घटाने के आहार सुझाव:\n\n1. **नाश्ता**: फलों के साथ ओट्स, ग्रीन टी\n2. **दोपहर का भोजन**: ब्राउन राइस, दाल, सब्जियां\n3. **रात का खाना**: हल्का सूप, सलाद, ग्रिल्ड प्रोटीन\n\nबचें: प्रसंस्कृत खाद्य पदार्थ, चीनी, देर रात खाना\nपिएं: रोजाना 8-10 गिलास पानी";
      }
    }

    // PCOS/Hormonal queries
    if (lowerMessage.includes('pcos') || lowerMessage.includes('pcod') || lowerMessage.includes('hormonal')) {
      return language === 'en'
        ? "PCOS Management Tips:\n\n**Yoga**: Butterfly pose, Surya Namaskar, Pranayama\n**Diet**: Low glycemic index foods, fiber-rich meals\n**Herbs**: Shatavari, Ashwagandha\n**Lifestyle**: Regular exercise, stress management, adequate sleep\n\nConsult a healthcare provider for personalized treatment."
        : "पीसीओएस प्रबंधन सुझाव:\n\n**योग**: तितली मुद्रा, सूर्य नमस्कार, प्राणायाम\n**आहार**: कम ग्लाइसेमिक इंडेक्स खाद्य पदार्थ, फाइबर युक्त भोजन\n**जड़ी बूटियां**: शतावरी, अश्वगंधा\n**जीवनशैली**: नियमित व्यायाम, तनाव प्रबंधन, पर्याप्त नींद\n\nव्यक्तिगत उपचार के लिए स्वास्थ्य सेवा प्रदाता से परामर्श करें।";
    }

    // Symptom queries
    if (lowerMessage.includes('symptom') || lowerMessage.includes('feeling')) {
      if (lowerMessage.includes('tired') || lowerMessage.includes('fatigue')) {
        return language === 'en'
          ? "Fatigue can be due to:\n- Poor sleep quality\n- Nutritional deficiencies (Iron, B12)\n- Dehydration\n- Stress\n\n**Quick fixes**:\n1. Drink water\n2. Take a short walk\n3. Practice deep breathing\n4. Ensure 7-8 hours sleep\n\nIf persistent, consult a doctor."
          : "थकान के कारण हो सकते हैं:\n- खराब नींद की गुणवत्ता\n- पोषण की कमी (आयरन, बी12)\n- निर्जलीकरण\n- तनाव\n\n**त्वरित सुधार**:\n1. पानी पिएं\n2. छोटी सैर करें\n3. गहरी सांस लेने का अभ्यास करें\n4. 7-8 घंटे की नींद सुनिश्चित करें\n\nयदि लगातार है, तो डॉक्टर से परामर्श करें।";
      }
    }

    // Default response
    return language === 'en'
      ? "I can help you with:\n\n• Yoga recommendations for specific conditions\n• Ayurvedic remedies and herbs\n• Diet and nutrition advice\n• Symptom analysis\n• Menstrual health guidance\n\nPlease ask a specific question, and I'll provide detailed information!"
      : "मैं आपकी मदद कर सकता हूं:\n\n• विशिष्ट स्थितियों के लिए योग सिफारिशें\n• आयुर्वेदिक उपचार और जड़ी बूटियां\n• आहार और पोषण सलाह\n• लक्षण विश्लेषण\n• मासिक स्वास्थ्य मार्गदर्शन\n\nकृपया एक विशिष्ट प्रश्न पूछें, और मैं विस्तृत जानकारी प्रदान करूंगा!";
  };

  const handleSend = async (message?: string) => {
    const messageToSend = message || input.trim();
    if (!messageToSend) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(async () => {
      const response = await processMessage(messageToSend);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-emerald-500 hover:bg-emerald-600 z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col bg-white/95 backdrop-blur-md border-emerald-200">
      <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-lg flex-row items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-lg">{t.title}</CardTitle>
            <p className="text-xs text-emerald-50">Online</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className={`rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    
                    {/* Quick suggestions */}
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="cursor-pointer hover:bg-emerald-50 border-emerald-300 text-xs"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-gray-700" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 border-emerald-200"
              disabled={isTyping}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-emerald-500 hover:bg-emerald-600"
              size="icon"
            >
              {isTyping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
