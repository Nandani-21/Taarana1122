export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface YogaPose {
  id: string;
  name: string;
  nameHi: string;
  emoji: string;
  category: 'disease' | 'menstrual' | 'general';
  condition?: string;
  conditionHi?: string;
  phase?: string;
  benefits: string;
  benefitsHi: string;
  duration: string;
  precautions: string;
  precautionsHi: string;
  steps: string[];
  stepsHi: string[];
  videoUrl?: string;
}

export interface AyurvedicRemedy {
  id: string;
  name: string;
  nameHi: string;
  emoji: string;
  condition: string;
  conditionHi: string;
  ingredients: string[];
  ingredientsHi: string[];
  preparation: string[];
  preparationHi: string[];
  dosage: string;
  dosageHi: string;
  timing: string;
  timingHi: string;
  warnings: string;
  warningsHi: string;
  color: string;
}

export interface Reminder {
  id: string;
  user_id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  time: string;
  category: 'yoga' | 'remedies' | 'hydration' | 'diet' | 'lifestyle';
  completed: boolean;
  icon: string;
  color: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  date: string;
  yoga_completed: boolean;
  remedies_taken: number;
  water_cups: number;
  meals_completed: number;
}
