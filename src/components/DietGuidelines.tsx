import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Check, X, Apple, Salad, Coffee } from 'lucide-react';
import type { Language } from '../App';

interface DietGuidelinesProps {
  language: Language;
}

const translations = {
  en: {
    title: 'Diet Guidelines',
    description: 'Personalized diet plans based on Ayurvedic principles',
    dailyPlan: 'Daily Plan',
    foodsToEat: 'Foods to Eat',
    foodsToAvoid: 'Foods to Avoid',
    breakfast: 'Breakfast',
    midMorning: 'Mid-Morning Snack',
    lunch: 'Lunch',
    evening: 'Evening Snack',
    dinner: 'Dinner',
    recommended: 'Recommended',
    avoid: 'Avoid',
    ayurvedicTips: 'Ayurvedic Tips',
  },
  hi: {
    title: 'आहार दिशानिर्देश',
    description: 'आयुर्वेदिक सिद्धांतों पर आधारित व्यक्तिगत आहार योजना',
    dailyPlan: 'दैनिक योजना',
    foodsToEat: 'खाने योग्य खाद्य पदार्थ',
    foodsToAvoid: 'बचने योग्य खाद्य पदार्थ',
    breakfast: 'नाश्ता',
    midMorning: 'मध्य-सुबह का नाश्ता',
    lunch: 'दोपहर का भोजन',
    evening: 'शाम का नाश्ता',
    dinner: 'रात का खाना',
    recommended: 'अनुशंसित',
    avoid: 'बचें',
    ayurvedicTips: 'आयुर्वेदिक सुझाव',
  },
};

const dailyMeals = [
  {
    time: 'breakfast',
    timeHi: 'नाश्ता',
    emoji: '🌅',
    items: [
      {
        name: 'Oatmeal with fruits and nuts',
        nameHi: 'फलों और मेवों के साथ ओटमील',
        calories: '350 kcal',
        benefits: 'High fiber, sustained energy',
        benefitsHi: 'उच्च फाइबर, निरंतर ऊर्जा',
      },
      {
        name: 'Herbal tea or warm water',
        nameHi: 'हर्बल चाय या गर्म पानी',
        calories: '0 kcal',
        benefits: 'Hydration, aids digestion',
        benefitsHi: 'हाइड्रेशन, पाचन में सहायक',
      },
    ],
  },
  {
    time: 'midMorning',
    timeHi: 'मध्य-सुबह',
    emoji: '🥤',
    items: [
      {
        name: 'Fresh fruit or fruit juice',
        nameHi: 'ताजे फल या फलों का रस',
        calories: '100 kcal',
        benefits: 'Vitamins, natural sugars',
        benefitsHi: 'विटामिन, प्राकृतिक शर्करा',
      },
    ],
  },
  {
    time: 'lunch',
    timeHi: 'दोपहर का भोजन',
    emoji: '☀️',
    items: [
      {
        name: 'Dal (lentils), rice, roti',
        nameHi: 'दाल, चावल, रोटी',
        calories: '500 kcal',
        benefits: 'Complete protein, complex carbs',
        benefitsHi: 'पूर्ण प्रोटीन, जटिल कार्ब्स',
      },
      {
        name: 'Mixed vegetable curry',
        nameHi: 'मिश्रित सब्जी करी',
        calories: '150 kcal',
        benefits: 'Vitamins, minerals, fiber',
        benefitsHi: 'विटामिन, खनिज, फाइबर',
      },
      {
        name: 'Curd/yogurt',
        nameHi: 'दही',
        calories: '80 kcal',
        benefits: 'Probiotics, cooling effect',
        benefitsHi: 'प्रोबायोटिक्स, ठंडक प्रभाव',
      },
    ],
  },
  {
    time: 'evening',
    timeHi: 'शाम',
    emoji: '🌆',
    items: [
      {
        name: 'Green tea with light snacks',
        nameHi: 'ग्रीन टी के साथ हल्का नाश्ता',
        calories: '150 kcal',
        benefits: 'Antioxidants, metabolism boost',
        benefitsHi: 'एंटीऑक्सीडेंट, चयापचय बढ़ावा',
      },
    ],
  },
  {
    time: 'dinner',
    timeHi: 'रात का खाना',
    emoji: '🌙',
    items: [
      {
        name: 'Light vegetable soup',
        nameHi: 'हल्का सब्जी का सूप',
        calories: '200 kcal',
        benefits: 'Easy to digest, nutrient-rich',
        benefitsHi: 'पचाने में आसान, पोषक तत्वों से भरपूर',
      },
      {
        name: 'Salad with olive oil',
        nameHi: 'जैतून के तेल के साथ सलाद',
        calories: '150 kcal',
        benefits: 'Raw nutrients, healthy fats',
        benefitsHi: 'कच्चे पोषक तत्व, स्वस्थ वसा',
      },
    ],
  },
];

const foodsToEat = [
  { name: 'Whole grains (brown rice, quinoa)', nameHi: 'साबुत अनाज (ब्राउन राइस, क्विनोआ)', category: 'Grains' },
  { name: 'Fresh vegetables (spinach, carrots, broccoli)', nameHi: 'ताजी सब्जियां (पालक, गाजर, ब्रोकली)', category: 'Vegetables' },
  { name: 'Lentils and beans', nameHi: 'दाल और बीन्स', category: 'Protein' },
  { name: 'Fresh fruits (apples, berries, pomegranate)', nameHi: 'ताजे फल (सेब, बेरी, अनार)', category: 'Fruits' },
  { name: 'Nuts and seeds (almonds, walnuts, flaxseeds)', nameHi: 'मेवे और बीज (बादाम, अखरोट, अलसी)', category: 'Healthy Fats' },
  { name: 'Herbal teas (tulsi, ginger, chamomile)', nameHi: 'हर्बल चाय (तुलसी, अदरक, कैमोमाइल)', category: 'Beverages' },
  { name: 'Ghee (clarified butter)', nameHi: 'घी', category: 'Healthy Fats' },
  { name: 'Spices (turmeric, cumin, coriander)', nameHi: 'मसाले (हल्दी, जीरा, धनिया)', category: 'Spices' },
];

const foodsToAvoid = [
  { name: 'Processed foods and packaged snacks', nameHi: 'प्रसंस्कृत खाद्य पदार्थ और पैकेज्ड स्नैक्स' },
  { name: 'Refined sugar and artificial sweeteners', nameHi: 'परिष्कृत चीनी और कृत्रिम मिठास' },
  { name: 'Deep fried foods', nameHi: 'तली हुई चीजें' },
  { name: 'Excessive red meat', nameHi: 'अत्यधिक लाल मांस' },
  { name: 'Carbonated drinks and sodas', nameHi: 'कार्बोनेटेड पेय और सोडा' },
  { name: 'Excessive caffeine', nameHi: 'अत्यधिक कैफीन' },
  { name: 'Cold foods from refrigerator', nameHi: 'रेफ्रिजरेटर से ठंडा खाना' },
  { name: 'Heavy meals late at night', nameHi: 'देर रात भारी भोजन' },
];

const ayurvedicTips = [
  {
    title: 'Eat mindfully',
    titleHi: 'ध्यानपूर्वक खाएं',
    description: 'Focus on your food without distractions. Chew thoroughly.',
    descriptionHi: 'ध्यान भटकाए बिना अपने भोजन पर ध्यान दें। अच्छी तरह चबाएं।',
  },
  {
    title: 'Warm over cold',
    titleHi: 'ठंडे के बजाय गर्म',
    description: 'Prefer warm, freshly cooked meals. Avoid cold leftovers.',
    descriptionHi: 'गर्म, ताजा पका भोजन पसंद करें। ठंडे बचे हुए खाने से बचें।',
  },
  {
    title: 'Largest meal at lunch',
    titleHi: 'दोपहर का भोजन सबसे बड़ा',
    description: 'Digestive fire (Agni) is strongest at midday.',
    descriptionHi: 'पाचन अग्नि दोपहर में सबसे मजबूत होती है।',
  },
  {
    title: 'Include all six tastes',
    titleHi: 'सभी छह स्वाद शामिल करें',
    description: 'Sweet, sour, salty, pungent, bitter, and astringent.',
    descriptionHi: 'मीठा, खट्टा, नमकीन, तीखा, कड़वा, और कसैला।',
  },
];

export function DietGuidelines({ language }: DietGuidelinesProps) {
  const t = translations[language];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-emerald-900 mb-2">{t.title}</h2>
        <p className="text-emerald-700">{t.description}</p>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/70 border border-emerald-200">
          <TabsTrigger value="daily" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            {t.dailyPlan}
          </TabsTrigger>
          <TabsTrigger value="eat" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            {t.foodsToEat}
          </TabsTrigger>
          <TabsTrigger value="avoid" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
            {t.foodsToAvoid}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-6 space-y-4">
          {dailyMeals.map((meal) => (
            <Card key={meal.time} className="bg-white/70 backdrop-blur-sm border-emerald-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
                    {meal.emoji}
                  </div>
                  <CardTitle className="text-emerald-900">
                    {language === 'en' ? t[meal.time as keyof typeof t] : meal.timeHi}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {meal.items.map((item, index) => (
                    <div key={index} className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-emerald-900">
                          {language === 'en' ? item.name : item.nameHi}
                        </h4>
                        <Badge variant="secondary" className="bg-emerald-200 text-emerald-800">
                          {item.calories}
                        </Badge>
                      </div>
                      <p className="text-sm text-emerald-700">
                        {language === 'en' ? item.benefits : item.benefitsHi}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200">
            <CardHeader>
              <CardTitle className="text-teal-900">{t.ayurvedicTips}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ayurvedicTips.map((tip, index) => (
                  <div key={index} className="bg-white/60 rounded-lg p-4">
                    <h4 className="text-teal-900 mb-2">
                      {language === 'en' ? tip.title : tip.titleHi}
                    </h4>
                    <p className="text-sm text-teal-700">
                      {language === 'en' ? tip.description : tip.descriptionHi}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eat" className="mt-6">
          <Card className="bg-white/70 backdrop-blur-sm border-green-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Check className="h-6 w-6 text-green-600" />
                <CardTitle className="text-green-900">{t.recommended}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {foodsToEat.map((food, index) => (
                  <div key={index} className="flex items-start gap-3 bg-green-50 rounded-lg p-3">
                    <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-green-900">
                        {language === 'en' ? food.name : food.nameHi}
                      </p>
                      <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700 text-xs">
                        {food.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avoid" className="mt-6">
          <Card className="bg-white/70 backdrop-blur-sm border-rose-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <X className="h-6 w-6 text-rose-600" />
                <CardTitle className="text-rose-900">{t.avoid}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {foodsToAvoid.map((food, index) => (
                  <div key={index} className="flex items-start gap-3 bg-rose-50 rounded-lg p-3">
                    <div className="w-10 h-10 bg-rose-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <X className="h-5 w-5 text-rose-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-rose-900">
                        {language === 'en' ? food.name : food.nameHi}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
