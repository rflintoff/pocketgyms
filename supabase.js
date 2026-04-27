// ─── supabase.js ──────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://thgwkprbrjzjwwwnmowm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoZ3drcHJicmp6and3d25tb3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMjQzODIsImV4cCI6MjA5MTYwMDM4Mn0.dHtcJkABWYLiQ_292zL-L1CoFQgzuCi5c6Ch845ZyUs';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function signUpEmail(email, password) {
  const { data, error } = await db.auth.signUp({ email, password });
  return { data, error };
}

async function signInEmail(email, password) {
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  return { data, error };
}

async function signInGoogle() {
  await db.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin }
  });
}

async function signInApple() {
  await db.auth.signInWithOAuth({
    provider: 'apple',
    options: { redirectTo: window.location.origin }
  });
}

async function signOut() {
  await db.auth.signOut();
}

async function getUser() {
  const { data: { user } } = await db.auth.getUser();
  return user;
}

async function getProfile() {
  const user = await getUser();
  if (!user) return null;
  const { data, error } = await db.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (error) console.error('getProfile:', error);
  return data;
}

async function saveProfile(updates) {
  const user = await getUser();
  if (!user) return { ok: false, error: { message: 'No authenticated user' } };
  if (updates.height_cm !== undefined) updates.height_cm = isNaN(parseFloat(updates.height_cm)) ? null : parseFloat(updates.height_cm);
  if (updates.weight_kg !== undefined) updates.weight_kg = isNaN(parseFloat(updates.weight_kg)) ? null : parseFloat(updates.weight_kg);
  if (updates.target_weight_kg !== undefined) updates.target_weight_kg = isNaN(parseFloat(updates.target_weight_kg)) ? null : parseFloat(updates.target_weight_kg);
  if (updates.age !== undefined) updates.age = isNaN(parseInt(updates.age)) ? null : parseInt(updates.age);
  if (updates.activity !== undefined) { updates.activity_level = updates.activity; delete updates.activity; }
  if (updates.darkMode !== undefined) { updates.dark_mode = updates.darkMode; delete updates.darkMode; }
  if (updates.diet !== undefined) { updates.dietary_pref = updates.diet; delete updates.diet; }
  if (updates.environment !== undefined) { updates.training_env = updates.environment; delete updates.environment; }
  if (updates.height !== undefined) { updates.height_cm = updates.height; delete updates.height; }
  if (updates.targetWeight !== undefined) { updates.target_weight_kg = updates.targetWeight; delete updates.targetWeight; }
  if (updates.weight !== undefined) { updates.weight_kg = updates.weight; delete updates.weight; }
  if (updates.dark_mode !== undefined) updates.dark_mode = updates.dark_mode === 'dark' || updates.dark_mode === true;
if (updates.height_cm !== undefined) updates.height_cm = isNaN(parseFloat(updates.height_cm)) ? null : parseFloat(updates.height_cm);
if (updates.weight_kg !== undefined) updates.weight_kg = isNaN(parseFloat(updates.weight_kg)) ? null : parseFloat(updates.weight_kg);
if (updates.target_weight_kg !== undefined) updates.target_weight_kg = isNaN(parseFloat(updates.target_weight_kg)) ? null : parseFloat(updates.target_weight_kg);
if (updates.activity_level !== undefined) {
  const actMap = { 1.2: 'sedentary', 1.375: 'lightly_active', 1.55: 'moderately_active', 1.725: 'very_active' };
  updates.activity_level = actMap[updates.activity_level] || String(updates.activity_level);
}
  const payload = { id: user.id, ...updates, updated_at: new Date().toISOString() };
  const { error } = await db.from('profiles').upsert(payload, { onConflict: 'id' });
  if (error) {
    console.error('saveProfile error:', error, 'payload:', payload);
    return { ok: false, error };
  }
  return { ok: true, error: null };
}

async function saveWorkout(workoutData) {
  const user = await getUser();
  if (!user) return;
  const { error } = await db.from('workouts')
    .insert({ user_id: user.id, ...workoutData });
  if (error) console.error('saveWorkout:', error);
}

async function getWorkouts(limit = 50) {
  const user = await getUser();
  if (!user) return [];
  const { data } = await db.from('workouts')
    .select('*')
    .eq('user_id', user.id)
    .order('logged_at', { ascending: false })
    .limit(limit);
  return data || [];
}

async function getTodayWorkout() {
  const user = await getUser();
  if (!user) return null;
  const today = new Date().toISOString().split('T')[0];
  const { data } = await db.from('workouts')
    .select('*')
    .eq('user_id', user.id)
    .eq('logged_at', today)
    .maybeSingle();
  return data;
}

async function saveCardio(cardioData) {
  const user = await getUser();
  if (!user) return;
  const { error } = await db.from('cardio_sessions')
    .insert({ user_id: user.id, ...cardioData });
  if (error) console.error('saveCardio:', error);
}

async function getCardioSessions(limit = 30) {
  const user = await getUser();
  if (!user) return [];
  const { data } = await db.from('cardio_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('logged_at', { ascending: false })
    .limit(limit);
  return data || [];
}

async function getTodayNutrition() {
  const user = await getUser();
  if (!user) return null;
  const today = new Date().toISOString().split('T')[0];
  const { data } = await db.from('nutrition_logs')
    .select('*')
    .eq('user_id', user.id)
    .eq('logged_at', today)
    .maybeSingle();
  return data;
}

async function saveNutrition(nutritionData) {
  const user = await getUser();
  if (!user) return;
  const today = new Date().toISOString().split('T')[0];
  const { error } = await db.from('nutrition_logs')
    .upsert({ user_id: user.id, logged_at: today, ...nutritionData });
  if (error) console.error('saveNutrition:', error);
}

async function saveProgressLog(progressData) {
  const user = await getUser();
  if (!user) return;
  const { error } = await db.from('progress_logs')
    .insert({ user_id: user.id, ...progressData });
  if (error) console.error('saveProgress:', error);
}

async function getProgressLogs(limit = 20) {
  const user = await getUser();
  if (!user) return [];
  const { data } = await db.from('progress_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('logged_at', { ascending: false })
    .limit(limit);
  return data || [];
}

async function getRoutines() {
  const user = await getUser();
  if (!user) return [];
  const { data } = await db.from('routines')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  return data || [];
}

async function saveRoutine(routineData) {
  const user = await getUser();
  if (!user) return;
  const { error } = await db.from('routines')
    .insert({ user_id: user.id, ...routineData });
  if (error) console.error('saveRoutine:', error);
}

async function deleteRoutine(routineId) {
  const user = await getUser();
  if (!user) return;
  await db.from('routines').delete().eq('id', routineId).eq('user_id', user.id);
}

window.PG = {
  db,
  auth: { signUpEmail, signInEmail, signInGoogle, signInApple, signOut, getUser },
  profile: { get: getProfile, save: saveProfile },
  workouts: { save: saveWorkout, getAll: getWorkouts, getToday: getTodayWorkout },
  cardio: { save: saveCardio, getAll: getCardioSessions },
  nutrition: { getToday: getTodayNutrition, save: saveNutrition },
  progress: { save: saveProgressLog, getAll: getProgressLogs },
  routines: { getAll: getRoutines, save: saveRoutine, delete: deleteRoutine }
};