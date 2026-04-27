// ─── supabase.js ──────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://thgwkprbrjzjwwwnmowm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoZ3drcHJicmp6and3d25tb3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMjQzODIsImV4cCI6MjA5MTYwMDM4Mn0.dHtcJkABWYLiQ_292zL-L1CoFQgzuCi5c6Ch845ZyUs';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PROFILE_COLUMNS = new Set([
  'id','name','goal','training_env','dietary_pref','gender','age','height_cm','weight_kg','target_weight_kg',
  'activity_level','units','language','dark_mode','tdee','calorie_target','protein_target','steps_target',
  'premium_status','programme_codes','onboarded','badges','created_at','updated_at'
]);
const WORKOUT_COLUMNS = new Set(['category','routine_name','duration_seconds','notes','exercises','is_rest_day','logged_at']);
const CARDIO_COLUMNS = new Set(['type','duration_minutes','distance_km','intensity','notes','logged_at']);
const NUTRITION_COLUMNS = new Set(['meals','total_calories','total_protein_g','total_carbs_g','total_fat_g','water_litres','steps']);
const PROGRESS_COLUMNS = new Set(['logged_at','weight_kg','energy_level','notes','chest_cm','waist_cm','hips_cm','arms_cm','legs_cm']);
const ROUTINE_COLUMNS = new Set(['name','category','exercises']);

function toNumberOrNull(value) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : null;
}

function stripUnknownAndEmpty(payload, allowedColumns, keepNullKeys = []) {
  const keepNullSet = new Set(keepNullKeys);
  const cleaned = {};
  Object.entries(payload || {}).forEach(([key, value]) => {
    if (!allowedColumns.has(key)) return;
    if (value === undefined) return;
    if (value === null && !keepNullSet.has(key)) return;
    cleaned[key] = value;
  });
  return cleaned;
}

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
  const mapped = { ...(updates || {}) };
  if (mapped.activity !== undefined) { mapped.activity_level = mapped.activity; delete mapped.activity; }
  if (mapped.darkMode !== undefined) { mapped.dark_mode = mapped.darkMode; delete mapped.darkMode; }
  if (mapped.diet !== undefined) { mapped.dietary_pref = mapped.diet; delete mapped.diet; }
  if (mapped.environment !== undefined) { mapped.training_env = mapped.environment; delete mapped.environment; }
  if (mapped.height !== undefined) { mapped.height_cm = mapped.height; delete mapped.height; }
  if (mapped.targetWeight !== undefined) { mapped.target_weight_kg = mapped.targetWeight; delete mapped.targetWeight; }
  if (mapped.weight !== undefined) { mapped.weight_kg = mapped.weight; delete mapped.weight; }
  if (mapped.calTarget !== undefined) { mapped.calorie_target = mapped.calTarget; delete mapped.calTarget; }
  if (mapped.proteinTarget !== undefined) { mapped.protein_target = mapped.proteinTarget; delete mapped.proteinTarget; }
  if (mapped.stepsTarget !== undefined) { mapped.steps_target = mapped.stepsTarget; delete mapped.stepsTarget; }

  if (mapped.dark_mode !== undefined) mapped.dark_mode = mapped.dark_mode === 'dark' || mapped.dark_mode === true;
  if (mapped.units !== undefined) mapped.units = (mapped.units === 'kg' || mapped.units === 'kg / km' || mapped.units === 'metric') ? 'metric' : 'imperial';
  if (mapped.activity_level !== undefined) {
    const actMap = { 1.2: 'sedentary', 1.375: 'lightly_active', 1.55: 'moderately_active', 1.725: 'very_active' };
    if (typeof mapped.activity_level === 'number') mapped.activity_level = actMap[mapped.activity_level] || 'moderately_active';
  }

  if (mapped.height_cm !== undefined) mapped.height_cm = toNumberOrNull(mapped.height_cm);
  if (mapped.weight_kg !== undefined) mapped.weight_kg = toNumberOrNull(mapped.weight_kg);
  if (mapped.target_weight_kg !== undefined) mapped.target_weight_kg = toNumberOrNull(mapped.target_weight_kg);
  if (mapped.age !== undefined) {
    const ageVal = parseInt(mapped.age, 10);
    mapped.age = Number.isFinite(ageVal) ? ageVal : null;
  }

  const payload = stripUnknownAndEmpty(
    { id: user.id, ...mapped, updated_at: new Date().toISOString() },
    PROFILE_COLUMNS,
    ['height_cm', 'weight_kg', 'target_weight_kg', 'age']
  );
  console.log('[Supabase] saveProfile cleaned payload:', payload);
  const { error } = await db.from('profiles').upsert(payload, { onConflict: 'id' });
  if (error) {
    console.error('saveProfile error:', error, 'payload:', payload);
    return { ok: false, error };
  }
  return { ok: true, error: null };
}


async function saveWorkout(workoutData) {
  const user = await getUser();
  if (!user) return { ok: false, error: { message: 'No authenticated user' } };
  const mapped = { ...(workoutData || {}) };
  if (mapped.duration !== undefined && mapped.duration_seconds === undefined) mapped.duration_seconds = mapped.duration;
  const payload = stripUnknownAndEmpty({
    category: mapped.category,
    routine_name: mapped.routine_name,
    duration_seconds: mapped.duration_seconds,
    notes: mapped.notes,
    exercises: Array.isArray(mapped.exercises) ? mapped.exercises : undefined,
    is_rest_day: mapped.is_rest_day,
    logged_at: mapped.logged_at
  }, WORKOUT_COLUMNS);
  console.log('[Supabase] saveWorkout cleaned payload:', payload);
  const { error } = await db.from('workouts')
    .insert({ user_id: user.id, ...payload });
  if (error) {
    console.error('saveWorkout:', error);
    return { ok: false, error };
  }
  return { ok: true, error: null };
}

async function getWorkouts(limit = 50) {
  const user = await getUser();
  if (!user) return [];
  const { data } = await db.from('workouts')
    .select('*')
    .eq('user_id', user.id)
    .order('logged_at', { ascending: false })
    .limit(limit);
  console.log('[Supabase] getWorkouts rows:', data || []);
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
  if (!user) return { ok: false, error: { message: 'No authenticated user' } };
  const mapped = { ...(cardioData || {}) };
  if (mapped.duration !== undefined && mapped.duration_minutes === undefined) mapped.duration_minutes = mapped.duration;
  if (mapped.distance !== undefined && mapped.distance_km === undefined) mapped.distance_km = mapped.distance;
  const payload = stripUnknownAndEmpty({
    type: mapped.type,
    duration_minutes: mapped.duration_minutes,
    distance_km: mapped.distance_km,
    intensity: mapped.intensity,
    notes: mapped.notes,
    logged_at: mapped.logged_at
  }, CARDIO_COLUMNS);
  console.log('[Supabase] saveCardio cleaned payload:', payload);
  const { error } = await db.from('cardio_sessions')
    .insert({ user_id: user.id, ...payload });
  if (error) {
    console.error('saveCardio:', error);
    return { ok: false, error };
  }
  return { ok: true, error: null };
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
  console.log('[Supabase] getTodayNutrition row:', data || null);
  return data;
}

async function saveNutrition(nutritionData) {
  const user = await getUser();
  if (!user) return { ok: false, error: { message: 'No authenticated user' } };
  const today = new Date().toISOString().split('T')[0];
  const mapped = { ...(nutritionData || {}) };
  if (mapped.water !== undefined && mapped.water_litres === undefined) mapped.water_litres = mapped.water;
  if (mapped.calories !== undefined && mapped.total_calories === undefined) mapped.total_calories = mapped.calories;
  if (mapped.protein !== undefined && mapped.total_protein_g === undefined) mapped.total_protein_g = mapped.protein;
  if (mapped.carbs !== undefined && mapped.total_carbs_g === undefined) mapped.total_carbs_g = mapped.carbs;
  if (mapped.fat !== undefined && mapped.total_fat_g === undefined) mapped.total_fat_g = mapped.fat;
  if (mapped.totals && typeof mapped.totals === 'object') {
    if (mapped.total_calories === undefined && mapped.totals.calories !== undefined) mapped.total_calories = mapped.totals.calories;
    if (mapped.total_protein_g === undefined && mapped.totals.protein !== undefined) mapped.total_protein_g = mapped.totals.protein;
    if (mapped.total_carbs_g === undefined && mapped.totals.carbs !== undefined) mapped.total_carbs_g = mapped.totals.carbs;
    if (mapped.total_fat_g === undefined && mapped.totals.fat !== undefined) mapped.total_fat_g = mapped.totals.fat;
  }
  const cleaned = stripUnknownAndEmpty(mapped, NUTRITION_COLUMNS);
  const payload = { user_id: user.id, logged_at: today, ...cleaned };
  console.log('[Supabase] saveNutrition cleaned payload:', payload);
  const { error } = await db.from('nutrition_logs')
    .upsert(payload, { onConflict: 'user_id,logged_at' });
  if (error) {
    console.error('saveNutrition:', error);
    return { ok: false, error };
  }
  return { ok: true, error: null };
}

async function saveProgressLog(progressData) {
  const user = await getUser();
  if (!user) return { ok: false, error: { message: 'No authenticated user' } };
  const mapped = { ...(progressData || {}) };
  if (mapped.chest !== undefined && mapped.chest_cm === undefined) mapped.chest_cm = mapped.chest;
  if (mapped.waist !== undefined && mapped.waist_cm === undefined) mapped.waist_cm = mapped.waist;
  if (mapped.hips !== undefined && mapped.hips_cm === undefined) mapped.hips_cm = mapped.hips;
  if (mapped.arms !== undefined && mapped.arms_cm === undefined) mapped.arms_cm = mapped.arms;
  if (mapped.legs !== undefined && mapped.legs_cm === undefined) mapped.legs_cm = mapped.legs;
  if (mapped.weight !== undefined && mapped.weight_kg === undefined) mapped.weight_kg = mapped.weight;
  if (mapped.energy !== undefined && mapped.energy_level === undefined) mapped.energy_level = mapped.energy;
  const payload = stripUnknownAndEmpty({
    logged_at: mapped.logged_at,
    weight_kg: mapped.weight_kg,
    energy_level: mapped.energy_level,
    notes: mapped.notes,
    chest_cm: mapped.chest_cm,
    waist_cm: mapped.waist_cm,
    hips_cm: mapped.hips_cm,
    arms_cm: mapped.arms_cm,
    legs_cm: mapped.legs_cm
  }, PROGRESS_COLUMNS);
  console.log('[Supabase] saveProgressLog cleaned payload:', payload);
  const { error } = await db.from('progress_logs')
    .insert({ user_id: user.id, ...payload });
  if (error) {
    console.error('saveProgress:', error);
    return { ok: false, error };
  }
  return { ok: true, error: null };
}

async function getProgressLogs(limit = 20) {
  const user = await getUser();
  if (!user) return [];
  const { data } = await db.from('progress_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('logged_at', { ascending: false })
    .limit(limit);
  console.log('[Supabase] getProgressLogs rows:', data || []);
  return data || [];
}

async function getRoutines() {
  const user = await getUser();
  if (!user) return [];
  const { data } = await db.from('routines')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  console.log('[Supabase] getRoutines rows:', data || []);
  return data || [];
}

async function saveRoutine(routineData) {
  const user = await getUser();
  if (!user) return { ok: false, error: { message: 'No authenticated user' } };
  const mapped = { ...(routineData || {}) };
  const payload = stripUnknownAndEmpty({
    name: mapped.name,
    category: mapped.category,
    exercises: Array.isArray(mapped.exercises) ? mapped.exercises : undefined
  }, ROUTINE_COLUMNS);
  console.log('[Supabase] saveRoutine cleaned payload:', payload);
  const { error } = await db.from('routines')
    .insert({ user_id: user.id, ...payload });
  if (error) {
    console.error('saveRoutine:', error);
    return { ok: false, error };
  }
  return { ok: true, error: null };
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