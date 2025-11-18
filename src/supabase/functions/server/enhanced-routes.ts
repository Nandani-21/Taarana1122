// Enhanced API Routes for Taarana Wellness Platform
// This file contains additional backend endpoints

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const handleEnhancedSignup = async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );

  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      password,
      age,
      gender,
      healthGoals,
      diseases,
      symptoms,
      otherConditions,
      femaleHealth,
    } = body;

    // Create auth user
    const { data: authData, error: authError } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Store user profile in database
    const { data: profileData, error: profileError } = await supabaseClient
      .from('user_profiles')
      .insert([
        {
          user_id: authData.user?.id,
          name,
          email,
          phone,
          age,
          gender,
          health_goals: healthGoals,
          diseases,
          symptoms,
          other_conditions: otherConditions,
          female_health: femaleHealth,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (profileError) throw profileError;

    return new Response(
      JSON.stringify({
        success: true,
        user: authData.user,
        profile: profileData[0],
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
};

export const handleGetRecommendations = async (req: Request, userId: string) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );

  try {
    // Get user profile
    const { data: profile, error } = await supabaseClient
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    // Generate personalized recommendations based on profile
    const recommendations = {
      yoga: generateYogaRecommendations(profile),
      ayurveda: generateAyurvedicRecommendations(profile),
      diet: generateDietRecommendations(profile),
      lifestyle: generateLifestyleRecommendations(profile),
    };

    return new Response(
      JSON.stringify({
        success: true,
        recommendations,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
};

export const handleChatMessage = async (req: Request, userId: string) => {
  try {
    const { message } = await req.json();

    // Simple rule-based chatbot response
    // In production, this would connect to an LLM or RAG system
    const response = await generateChatbotResponse(message);

    return new Response(
      JSON.stringify({
        success: true,
        response,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
};

export const handleCreateReminder = async (req: Request, userId: string) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );

  try {
    const body = await req.json();
    const { title, description, time, frequency, notificationType } = body;

    const { data, error } = await supabaseClient
      .from('reminders')
      .insert([
        {
          user_id: userId,
          title,
          description,
          time,
          frequency,
          notification_type: notificationType, // 'sms' | 'push' | 'both'
          is_active: true,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    // Schedule notification (would integrate with SMS/Push service here)
    if (notificationType === 'sms' || notificationType === 'both') {
      // await sendSMSReminder(userId, title, time);
    }
    if (notificationType === 'push' || notificationType === 'both') {
      // await sendPushNotification(userId, title, description);
    }

    return new Response(
      JSON.stringify({
        success: true,
        reminder: data[0],
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
};

export const handleTrackProgress = async (req: Request, userId: string) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );

  try {
    const body = await req.json();
    const { activityType, activityName, duration, completed, date } = body;

    const { data, error } = await supabaseClient
      .from('user_progress')
      .insert([
        {
          user_id: userId,
          activity_type: activityType, // 'yoga' | 'remedy' | 'diet' | 'meditation'
          activity_name: activityName,
          duration,
          completed,
          date: date || new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    return new Response(
      JSON.stringify({
        success: true,
        progress: data[0],
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
};

// Helper functions for recommendation engine
function generateYogaRecommendations(profile: any): string[] {
  const recommendations: string[] = [];
  
  if (profile.diseases?.includes('diabetes')) {
    recommendations.push('Surya Namaskar (Sun Salutation) - 12 rounds');
    recommendations.push('Dhanurasana (Bow Pose) - 3 sets');
  }
  
  if (profile.diseases?.includes('back_pain')) {
    recommendations.push('Bhujangasana (Cobra Pose) - 5 minutes');
    recommendations.push('Balasana (Child Pose) - 3 minutes');
  }
  
  if (profile.symptoms?.includes('anxiety')) {
    recommendations.push('Pranayama (Anulom Vilom) - 10 minutes');
    recommendations.push('Shavasana - 5 minutes');
  }
  
  return recommendations;
}

function generateAyurvedicRecommendations(profile: any): string[] {
  const recommendations: string[] = [];
  
  if (profile.symptoms?.includes('fatigue')) {
    recommendations.push('Ashwagandha - 1 tsp with warm milk at night');
  }
  
  if (profile.symptoms?.includes('digestive')) {
    recommendations.push('Triphala powder - Before bed');
  }
  
  if (profile.gender === 'female' && profile.female_health?.hasPCOS) {
    recommendations.push('Shatavari - For hormonal balance');
  }
  
  return recommendations;
}

function generateDietRecommendations(profile: any): string[] {
  const recommendations: string[] = [];
  
  if (profile.health_goals?.includes('weight_loss')) {
    recommendations.push('Increase fiber intake (vegetables, whole grains)');
    recommendations.push('Reduce sugar and processed foods');
  }
  
  if (profile.diseases?.includes('diabetes')) {
    recommendations.push('Low glycemic index foods');
    recommendations.push('Avoid refined carbohydrates');
  }
  
  return recommendations;
}

function generateLifestyleRecommendations(profile: any): string[] {
  const recommendations: string[] = [];
  
  if (profile.symptoms?.includes('insomnia')) {
    recommendations.push('Maintain regular sleep schedule (10 PM - 6 AM)');
    recommendations.push('Avoid screens 1 hour before bed');
  }
  
  recommendations.push('Walk 30 minutes daily');
  recommendations.push('Practice meditation for 10 minutes');
  
  return recommendations;
}

async function generateChatbotResponse(message: string): Promise<string> {
  // Simple rule-based chatbot
  // In production, integrate with OpenAI, Anthropic, or custom LLM
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('yoga') || lowerMessage.includes('asana')) {
    return 'I can help you with yoga recommendations! What specific condition would you like help with? (e.g., back pain, stress relief, flexibility)';
  }
  
  if (lowerMessage.includes('ayurveda') || lowerMessage.includes('herb')) {
    return 'I can suggest Ayurvedic remedies. What symptoms are you experiencing? (e.g., fatigue, digestive issues, sleep problems)';
  }
  
  if (lowerMessage.includes('diet') || lowerMessage.includes('food')) {
    return 'I can provide diet recommendations. What are your health goals? (e.g., weight loss, better digestion, energy boost)';
  }
  
  return 'I can help you with yoga, Ayurvedic remedies, diet plans, and general wellness advice. What would you like to know?';
}

// SMS and Push Notification functions (to be implemented with actual services)
async function sendSMSReminder(userId: string, message: string, time: string) {
  // Integrate with Fast2SMS, MSG91, or Twilio
  // Example:
  // const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
  //   method: 'POST',
  //   headers: { 'authorization': 'YOUR_API_KEY' },
  //   body: JSON.stringify({
  //     route: 'v3',
  //     sender_id: 'TAARANA',
  //     message: message,
  //     // ... other params
  //   })
  // });
  console.log(`SMS scheduled for user ${userId}: ${message} at ${time}`);
}

async function sendPushNotification(userId: string, title: string, body: string) {
  // Integrate with Firebase Cloud Messaging
  // Example:
  // const response = await fetch('https://fcm.googleapis.com/fcm/send', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': 'key=YOUR_SERVER_KEY',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     to: userDeviceToken,
  //     notification: { title, body }
  //   })
  // });
  console.log(`Push notification sent to user ${userId}: ${title}`);
}
