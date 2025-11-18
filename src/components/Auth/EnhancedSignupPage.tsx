import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Loader2, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Textarea } from '../ui/textarea';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import logo from 'figma:asset/b351f80226d29dc81dd89730efa7bf2830c8c39f.png';
import { Badge } from '../ui/badge';

interface EnhancedSignupPageProps {
  onSignupSuccess: () => void;
  onSwitchToLogin: () => void;
}

interface ProfileData {
  // Step 1 - Basic Info
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  
  // Step 2 - Personal Details
  age: string;
  gender: 'male' | 'female' | 'other' | '';
  
  // Step 3 - Health Goals & Conditions
  healthGoals: string[];
  diseases: string[];
  symptoms: string[];
  otherConditions: string;
  
  // Step 4 - Female-Specific (if applicable)
  lastPeriodDate: string;
  cycleLength: string;
  periodDuration: string;
  hasPCOS: boolean;
  hasPCOD: boolean;
  hasThyroid: boolean;
  thyroidType: string;
  otherFemaleConditions: string;
}

const healthGoalOptions = [
  { id: 'weight_loss', label: 'Weight Loss', labelHi: 'वजन घटाना' },
  { id: 'stress_relief', label: 'Stress Relief', labelHi: 'तनाव से राहत' },
  { id: 'better_sleep', label: 'Better Sleep', labelHi: 'बेहतर नींद' },
  { id: 'flexibility', label: 'Flexibility', labelHi: 'लचीलापन' },
  { id: 'immunity', label: 'Boost Immunity', labelHi: 'प्रतिरक्षा बढ़ाना' },
  { id: 'energy', label: 'Increase Energy', labelHi: 'ऊर्जा बढ़ाना' },
  { id: 'hormonal_balance', label: 'Hormonal Balance', labelHi: 'हार्मोनल संतुलन' },
  { id: 'digestive_health', label: 'Digestive Health', labelHi: 'पाचन स्वास्थ्य' },
];

const diseaseOptions = [
  { id: 'diabetes', label: 'Diabetes', labelHi: 'मधुमेह' },
  { id: 'obesity', label: 'Obesity', labelHi: 'मोटापा' },
  { id: 'back_pain', label: 'Back Pain', labelHi: 'पीठ दर्द' },
  { id: 'migraine', label: 'Migraine', labelHi: 'माइग्रेन' },
  { id: 'hypertension', label: 'Hypertension', labelHi: 'उच्च रक्तचाप' },
  { id: 'arthritis', label: 'Arthritis', labelHi: 'गठिया' },
  { id: 'asthma', label: 'Asthma', labelHi: 'दमा' },
  { id: 'anxiety', label: 'Anxiety', labelHi: 'चिंता' },
];

const symptomOptions = [
  { id: 'fatigue', label: 'Fatigue', labelHi: 'थकान' },
  { id: 'headache', label: 'Headache', labelHi: 'सिरदर्द' },
  { id: 'insomnia', label: 'Insomnia', labelHi: 'अनिद्रा' },
  { id: 'joint_pain', label: 'Joint Pain', labelHi: 'जोड़ों का दर्द' },
  { id: 'digestive_issues', label: 'Digestive Issues', labelHi: 'पाचन संबंधी समस्याएं' },
  { id: 'mood_swings', label: 'Mood Swings', labelHi: 'मूड स्विंग' },
  { id: 'irregular_periods', label: 'Irregular Periods', labelHi: 'अनियमित माहवारी' },
  { id: 'weight_gain', label: 'Weight Gain', labelHi: 'वजन बढ़ना' },
];

export function EnhancedSignupPage({ onSignupSuccess, onSwitchToLogin }: EnhancedSignupPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    healthGoals: [],
    diseases: [],
    symptoms: [],
    otherConditions: '',
    lastPeriodDate: '',
    cycleLength: '28',
    periodDuration: '5',
    hasPCOS: false,
    hasPCOD: false,
    hasThyroid: false,
    thyroidType: '',
    otherFemaleConditions: '',
  });

  const totalSteps = profileData.gender === 'female' ? 4 : 3;

  const handleCheckboxChange = (field: 'healthGoals' | 'diseases' | 'symptoms', value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const validateStep = () => {
    setError('');
    
    if (currentStep === 1) {
      if (!profileData.name || !profileData.email || !profileData.phone) {
        setError('Please fill in all required fields');
        return false;
      }
      if (!profileData.password || profileData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
      if (profileData.password !== profileData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    
    if (currentStep === 2) {
      if (!profileData.age || !profileData.gender) {
        setError('Please fill in all required fields');
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError('');

    try {
      // Call backend signup API
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/server/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          password: profileData.password,
          age: parseInt(profileData.age),
          gender: profileData.gender,
          healthGoals: profileData.healthGoals,
          diseases: profileData.diseases,
          symptoms: profileData.symptoms,
          otherConditions: profileData.otherConditions,
          femaleHealth: profileData.gender === 'female' ? {
            lastPeriodDate: profileData.lastPeriodDate,
            cycleLength: parseInt(profileData.cycleLength),
            periodDuration: parseInt(profileData.periodDuration),
            hasPCOS: profileData.hasPCOS,
            hasPCOD: profileData.hasPCOD,
            hasThyroid: profileData.hasThyroid,
            thyroidType: profileData.thyroidType,
            otherConditions: profileData.otherFemaleConditions,
          } : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      setSuccess(true);
      setTimeout(() => {
        onSignupSuccess();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-md border-emerald-200">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl text-emerald-900 mb-2">Account Created!</h3>
            <p className="text-gray-600">Redirecting to login...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img src={logo} alt="Taarana Logo" className="h-24 w-auto" />
          </div>
          <p className="text-xl text-gray-600 italic">आरोग्यं परमं भाग्यम्</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-md border-emerald-200">
          <CardHeader>
            <CardTitle className="text-2xl text-emerald-900">Create Your Wellness Profile</CardTitle>
            <CardDescription>Step {currentStep} of {totalSteps}</CardDescription>
            
            {/* Progress Bar */}
            <div className="flex gap-2 mt-4">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${
                    i < currentStep ? 'bg-emerald-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="border-emerald-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="border-emerald-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+91 1234567890"
                    className="border-emerald-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={profileData.password}
                    onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                    placeholder="Min. 6 characters"
                    className="border-emerald-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={profileData.confirmPassword}
                    onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                    className="border-emerald-200"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Personal Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profileData.age}
                    onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                    className="border-emerald-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <RadioGroup
                    value={profileData.gender}
                    onValueChange={(value) => setProfileData({ ...profileData, gender: value as any })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="cursor-pointer">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="cursor-pointer">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="cursor-pointer">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 3: Health Goals & Conditions */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Health Goals (select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {healthGoalOptions.map((goal) => (
                      <div key={goal.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal.id}
                          checked={profileData.healthGoals.includes(goal.id)}
                          onCheckedChange={() => handleCheckboxChange('healthGoals', goal.id)}
                        />
                        <Label htmlFor={goal.id} className="cursor-pointer text-sm">
                          {goal.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Existing Health Conditions</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {diseaseOptions.map((disease) => (
                      <div key={disease.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={disease.id}
                          checked={profileData.diseases.includes(disease.id)}
                          onCheckedChange={() => handleCheckboxChange('diseases', disease.id)}
                        />
                        <Label htmlFor={disease.id} className="cursor-pointer text-sm">
                          {disease.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Current Symptoms</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {symptomOptions.map((symptom) => (
                      <div key={symptom.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom.id}
                          checked={profileData.symptoms.includes(symptom.id)}
                          onCheckedChange={() => handleCheckboxChange('symptoms', symptom.id)}
                        />
                        <Label htmlFor={symptom.id} className="cursor-pointer text-sm">
                          {symptom.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherConditions">Other Conditions or Notes</Label>
                  <Textarea
                    id="otherConditions"
                    value={profileData.otherConditions}
                    onChange={(e) => setProfileData({ ...profileData, otherConditions: e.target.value })}
                    placeholder="Any other health conditions, allergies, or information we should know..."
                    className="border-emerald-200"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Female-Specific (only if gender is female) */}
            {currentStep === 4 && profileData.gender === 'female' && (
              <div className="space-y-6">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="text-purple-900 mb-2">Menstrual & Reproductive Health</h4>
                  <p className="text-sm text-purple-700">
                    This information helps us provide personalized cycle-based recommendations
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastPeriodDate">Last Period Start Date</Label>
                  <Input
                    id="lastPeriodDate"
                    type="date"
                    value={profileData.lastPeriodDate}
                    onChange={(e) => setProfileData({ ...profileData, lastPeriodDate: e.target.value })}
                    className="border-emerald-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
                    <Input
                      id="cycleLength"
                      type="number"
                      value={profileData.cycleLength}
                      onChange={(e) => setProfileData({ ...profileData, cycleLength: e.target.value })}
                      min="21"
                      max="35"
                      className="border-emerald-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="periodDuration">Period Duration (days)</Label>
                    <Input
                      id="periodDuration"
                      type="number"
                      value={profileData.periodDuration}
                      onChange={(e) => setProfileData({ ...profileData, periodDuration: e.target.value })}
                      min="1"
                      max="10"
                      className="border-emerald-200"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Hormonal Conditions</Label>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pcos"
                      checked={profileData.hasPCOS}
                      onCheckedChange={(checked) => setProfileData({ ...profileData, hasPCOS: checked as boolean })}
                    />
                    <Label htmlFor="pcos" className="cursor-pointer">
                      PCOS (Polycystic Ovary Syndrome)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pcod"
                      checked={profileData.hasPCOD}
                      onCheckedChange={(checked) => setProfileData({ ...profileData, hasPCOD: checked as boolean })}
                    />
                    <Label htmlFor="pcod" className="cursor-pointer">
                      PCOD (Polycystic Ovarian Disease)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="thyroid"
                      checked={profileData.hasThyroid}
                      onCheckedChange={(checked) => setProfileData({ ...profileData, hasThyroid: checked as boolean })}
                    />
                    <Label htmlFor="thyroid" className="cursor-pointer">
                      Thyroid Disorder
                    </Label>
                  </div>

                  {profileData.hasThyroid && (
                    <div className="ml-6 space-y-2">
                      <RadioGroup
                        value={profileData.thyroidType}
                        onValueChange={(value) => setProfileData({ ...profileData, thyroidType: value })}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hypothyroid" id="hypothyroid" />
                          <Label htmlFor="hypothyroid" className="cursor-pointer">Hypothyroidism</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hyperthyroid" id="hyperthyroid" />
                          <Label htmlFor="hyperthyroid" className="cursor-pointer">Hyperthyroidism</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherFemaleConditions">Other Reproductive Health Notes</Label>
                  <Textarea
                    id="otherFemaleConditions"
                    value={profileData.otherFemaleConditions}
                    onChange={(e) => setProfileData({ ...profileData, otherFemaleConditions: e.target.value })}
                    placeholder="Endometriosis, fibroids, fertility concerns, etc..."
                    className="border-emerald-200"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 border-emerald-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                >
                  {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Complete Signup
                </Button>
              )}
            </div>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-emerald-600 hover:underline"
              >
                Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
