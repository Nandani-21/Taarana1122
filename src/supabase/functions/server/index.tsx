import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Sign up route
app.post('/make-server-fed60181/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true,
    });

    if (error) {
      console.log('Signup error:', error.message);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true, 
      user: { 
        id: data.user.id, 
        email: data.user.email,
        name: data.user.user_metadata?.name 
      } 
    });
  } catch (error: any) {
    console.log('Signup error:', error.message);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Get user profile
app.get('/make-server-fed60181/profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    return c.json({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || 'User',
    });
  } catch (error: any) {
    console.log('Profile error:', error.message);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Save user progress
app.post('/make-server-fed60181/progress', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const progressData = await c.req.json();
    const { kv } = await import('./kv_store.tsx');
    
    const key = `progress:${user.id}:${progressData.date}`;
    await kv.set(key, progressData);

    return c.json({ success: true });
  } catch (error: any) {
    console.log('Progress save error:', error.message);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get user progress
app.get('/make-server-fed60181/progress', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { kv } = await import('./kv_store.tsx');
    const prefix = `progress:${user.id}:`;
    const progressData = await kv.getByPrefix(prefix);

    return c.json({ progress: progressData });
  } catch (error: any) {
    console.log('Progress get error:', error.message);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Save reminder
app.post('/make-server-fed60181/reminders', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const reminderData = await c.req.json();
    const { kv } = await import('./kv_store.tsx');
    
    const reminderId = reminderData.id || crypto.randomUUID();
    const key = `reminder:${user.id}:${reminderId}`;
    await kv.set(key, { ...reminderData, id: reminderId, user_id: user.id });

    return c.json({ success: true, id: reminderId });
  } catch (error: any) {
    console.log('Reminder save error:', error.message);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get reminders
app.get('/make-server-fed60181/reminders', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { kv } = await import('./kv_store.tsx');
    const prefix = `reminder:${user.id}:`;
    const reminders = await kv.getByPrefix(prefix);

    return c.json({ reminders });
  } catch (error: any) {
    console.log('Reminders get error:', error.message);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update reminder status
app.put('/make-server-fed60181/reminders/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const reminderId = c.req.param('id');
    const updateData = await c.req.json();
    const { kv } = await import('./kv_store.tsx');
    
    const key = `reminder:${user.id}:${reminderId}`;
    const existing = await kv.get(key);
    
    if (existing) {
      await kv.set(key, { ...existing, ...updateData });
      return c.json({ success: true });
    }

    return c.json({ error: 'Reminder not found' }, 404);
  } catch (error: any) {
    console.log('Reminder update error:', error.message);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Health check
app.get('/make-server-fed60181/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
