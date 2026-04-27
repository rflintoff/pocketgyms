// ─── AUTH BOOT ────────────────────────────────────────────────────────────────
let isSignUp = false;
let authBootCompleted = false;

function getAuthModalEl() {
  return document.getElementById('auth-modal');
}

function getOnboardingEl() {
  return document.getElementById('onboarding');
}

function setBootVisibility(isVisible) {
  document.body.style.visibility = isVisible ? 'visible' : 'hidden';
}

function setMainAppVisible(isVisible) {
  const appScreenEls = document.querySelectorAll('.screen');
  const headerEl = document.querySelector('.header');
  const navEl = document.querySelector('.nav');
  appScreenEls.forEach((el) => {
    el.style.display = isVisible ? '' : 'none';
  });
  if (headerEl) headerEl.style.display = isVisible ? '' : 'none';
  if (navEl) navEl.style.display = isVisible ? '' : 'none';
}

function showAuthOnly() {
  const onboardingEl = getOnboardingEl();
  const authModalEl = getAuthModalEl();
  setMainAppVisible(false);
  if (onboardingEl) onboardingEl.style.display = 'none';
  if (authModalEl) authModalEl.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function showMainApp() {
  const authModalEl = getAuthModalEl();
  if (authModalEl) authModalEl.style.display = 'none';
  setMainAppVisible(true);
  document.body.style.overflow = '';
}

function logAuthDebug(event, session) {
  const debugPayload = {
    event,
    hasSession: !!session,
    hasUser: !!session?.user,
    userId: session?.user?.id || null,
    email: session?.user?.email || null,
    bootCompleted: authBootCompleted
  };
  console.debug('[Auth Debug]', debugPayload);
}

setBootVisibility(false);
setMainAppVisible(false);
const onboardingEl = getOnboardingEl();
const authModalEl = getAuthModalEl();
if (onboardingEl) onboardingEl.style.display = 'none';
if (authModalEl) authModalEl.style.display = 'none';

function toggleAuthMode() {
  isSignUp = !isSignUp;
  document.getElementById('auth-toggle-btn').textContent =
    isSignUp ? 'Have an account? Sign in' : 'No account? Sign up';
  document.getElementById('auth-submit-btn').textContent = isSignUp ? 'Sign Up' : 'Sign In';
}

async function handleEmailAuth() {
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  const errEl = document.getElementById('auth-error');
  errEl.style.display = 'none';

  const fn = isSignUp ? PG.auth.signUpEmail : PG.auth.signInEmail;
  const { error } = await fn(email, password);

  if (error) {
    errEl.textContent = error.message;
    errEl.style.display = 'block';
  }
}

PG.db.auth.getSession()
  .then(async ({ data: { session } }) => {
    logAuthDebug('INITIAL_SESSION', session);
    if (session?.user) {
      await loadUserEmail();
      await initApp(session.user);
    } else {
      showAuthOnly();
    }
  })
  .catch((err) => {
    console.error('Auth session boot failed:', err);
    showAuthOnly();
  })
  .finally(() => {
    authBootCompleted = true;
    setBootVisibility(true);
  });

PG.db.auth.onAuthStateChange(async (event, session) => {
  logAuthDebug(event, session);
  if (!authBootCompleted) return;
  if (event === 'SIGNED_IN') {
    await loadUserEmail();
    await initApp(session.user);
  } else if (event === 'SIGNED_OUT') {
    showAuthOnly();
  }
});

async function initApp(user) {
  const profile = await PG.profile.get();
  const isBrandNewUser = !profile || profile.onboarded !== true;

  if (isBrandNewUser) showOnboarding();
  else {
    showMainApp();
    await loadFromStorage();
  }
}

async function loadUserEmail() {
  try {
    const { data, error } = await PG.db.auth.getUser();
    if (error) throw error;
    const email = data?.user?.email || 'Not available';
    const accountEmailEl = document.getElementById('account-email');
    if (accountEmailEl) accountEmailEl.textContent = email;
  } catch (err) {
    console.error('loadUserEmail:', err);
  }
}

async function signOut() {
  try {
    await PG.auth.signOut();
  } finally {
    window.location.reload();
  }
}
// ===================== TRANSLATIONS =====================
const translations = {
    en: {
        langTitle:'Choose Language', langSub:'Select your preferred language', langBtn:'Continue',
        pathTitle:'Welcome to PocketGyms', pathSub:'How do you want to get started?',
        setupTitle:'Set Up My Goals', setupSub:'Personalise your targets and get a custom plan',
        fastTitle:'Jump Straight In', fastSub:'Skip setup and start tracking now',
        detailsTitle:'About You', detailsSub:'Tell us a bit about yourself',
        statsTitle:'Your Stats', statsSub:"We'll calculate your perfect targets",
        letsGo:"Let's Go 🚀", next:'Next',
        home:'Home', train:'Train', nutrition:'Nutrition', progress:'Progress', settings:'Settings',
        coach:'COACH', todayScore:"TODAY'S SCORE", outOf:'OUT OF 100', weeklyStreak:'Weekly Streak',
        todayProgress:"TODAY'S PROGRESS", myPhase:'MY PHASE', daysTraining:'Days Training',
        weight:'WEIGHT', current:'Current', target:'Target', toGo:'To Go', badges:'BADGES',
        logWorkout:'LOG A WORKOUT',
        coachNoTrain:"You haven't trained today — get it done",
        coachProtein:'Need <strong>{x}g more protein</strong> today',
        coachCalories:'Only {x} calories logged — you need more fuel',
        coachSteps:'<strong>{x} steps</strong> remaining today',
        coachWater:'Drink more water — only {x}L logged',
        coachPerfect:"You're absolutely smashing it today!",
        howTrain:'HOW DO YOU WANT TO TRAIN?',
        myRoutines:'My Routines', myRoutinesSub:'Start a saved workout',
        quickWorkout:'Quick Workout', quickWorkoutSub:'Pick a category and go',
        createRoutine:'Create Routine', createRoutineSub:'Build and save a new routine',
        cardio:'Cardiovascular', cardioSub:'Running, cycling, walking and more',
        selectCategory:'SELECT CATEGORY', addExercise:'ADD EXERCISE', addExBtn:'+ Add Exercise',
        saveWorkout:'Save Workout', saveCardio:'Save Cardio',
        workoutTime:'WORKOUT TIME', restTimer:'REST TIMER', stop:'Stop', sessionTime:'SESSION TIME',
        autoProgression:'AUTO PROGRESSION', lastSession:'LAST SESSION', noPrevData:'No previous data',
        tryToday:'Try {x}kg today (last: {y}kg)',
        running:'Running', cycling:'Cycling', walking:'Walking', rowing:'Rowing',
        fixedBike:'Fixed Bike', hiit:'HIIT', swimming:'Swimming', other:'Other',
        easy:'Easy', moderate:'Moderate', hard:'Hard',
        duration:'Duration (minutes)', distance:'Distance (km)', intensity:'Intensity', notes:'Notes',
        todaysNutrition:"TODAY'S NUTRITION", dailyTotals:'DAILY TOTALS',
        date:'Date', status:'Status', onTrack:'On Track', behindEat:'Behind — eat more',
        calories:'Calories', protein:'Protein', carbs:'Carbs', fat:'Fat',
        steps:'Steps', water:'Water',
        addMeal:'+ Add Meal', mealName:'Meal name:',
        stepsWater:'STEPS & WATER', stepsToday:'Steps Today', waterLitres:'Water (litres)',
        save:'Save', supplements:'SUPPLEMENTS',
        addFood:'+ Add Food', portion:'Portion (g or ml)', addToMeal:'Add to Meal',
        allFoods:'All', noFoodsFound:'No foods found',
        supp_creatine:'Creatine', supp_whey:'Whey Protein', supp_vitd:'Vitamin D',
        supp_omega:'Omega 3', supp_multi:'Multivitamin', supp_pre:'Pre-Workout', supp_mag:'Magnesium',
        currentPhase:'CURRENT PHASE', phaseHistory:'PHASE HISTORY',
        consistency:'CONSISTENCY', daysLogged:'Days logged (last 30)',
        workoutsCompleted:'Workouts completed', cardioSessions:'Cardio sessions',
        personalBests:'PERSONAL BESTS', bodyMeasurements:'BODY MEASUREMENTS',
        chest:'Chest (cm)', waist:'Waist (cm)', hips:'Hips (cm)', arms:'Arms (cm)', legs:'Legs (cm)',
        saveMeasurements:'Save Measurements',
        weeklyCheckin:'WEEKLY CHECK-IN', checkinWeight:'Weight this week (kg)',
        checkinEnergy:'Energy levels (1-10)', checkinNotes:'Notes',
        saveCheckin:'Save Check-In', workoutHistory:'WORKOUT HISTORY',
        weightToGoal:'Weight to Goal', daysTrainingLabel:'Days Training',
        completePhase:'Complete Phase & Start New', noSessions:'No sessions logged yet.',
        noPBs:'Log workouts to track PBs.',
        badge_first_workout:'First Workout', badge_five_workouts:'5 Workouts',
        badge_ten_workouts:'10 Workouts', badge_first_pb:'Personal Best',
        badge_first_cardio:'First Cardio', badge_week_streak:'7 Day Streak',
        yourDetails:'YOUR DETAILS', name:'Name', age:'Age', gender:'Gender',
        male:'Male', female:'Female',
        height:'Height (cm)', currentWeight:'Current Weight (kg)', targetWeight:'Target Weight (kg)',
        activityLevel:'Activity Level',
        sedentary:'Sedentary — Little/no exercise',
        lightlyActive:'Lightly Active — 1-3 days/week',
        moderatelyActive:'Moderately Active — 3-5 days/week',
        veryActive:'Very Active — 6-7 days/week',
        goal:'Goal', beginner:'Beginner', fatLoss:'Fat Loss',
        muscleBuilding:'Muscle Building', generalFitness:'General Fitness',
        trainingEnv:'Training Environment', gym:'Gym', homeEnv:'Home', both:'Both',
        dietaryPref:'Dietary Preference', standard:'Standard', vegan:'Vegan', halal:'Halal',
        units:'Units', kgKm:'kg / km', lbsMiles:'lbs / miles', language:'Language',
        myTransformation:'MY TRANSFORMATION PHASE',
        phaseDesc:'Optional: Set a goal phase to track your transformation progress.',
        phaseName:'Phase Name', phaseDuration:'Duration',
        w4:'4 Weeks', w6:'6 Weeks', w8:'8 Weeks', w10:'10 Weeks', w12:'12 Weeks',
        trainingDays:'Training Days Per Week',
        appearance:'APPEARANCE', darkMode:'Dark Mode',
        yourTargets:'YOUR CALCULATED TARGETS', tdee:'TDEE',
        calTarget:'Calorie Target', proteinTarget:'Protein Target', stepsTarget:'Steps Target',
        platesCalc:'PLATES CALCULATOR', targetWeightPlates:'Target Weight (kg)',
        barWeight:'Bar Weight', standard20:'20kg Standard', womens15:"15kg Women's", short10:'10kg Short',
        calcPlates:'Calculate Plates', eachSide:'Each side', barOnly:'Bar only',
        saveSettings:'Save & Calculate Targets',
        back:'← Back', delete:'Delete', noRoutinesYet:'No routines yet. Create one first.',
        routineName:'Routine Name', selectCategory2:'Select Category',
        addCustomEx:'Add Custom Exercise', typeExercise:'Type exercise name...',
        saveRoutine:'Save Routine', addCustomExercise:'Add custom exercise...',
    },
    pt: {
        langTitle:'Escolha o Idioma', langSub:'Selecione seu idioma preferido', langBtn:'Continuar',
        pathTitle:'Bem-vindo ao PocketGyms', pathSub:'Como quer começar?',
        setupTitle:'Configurar Meus Objetivos', setupSub:'Personalize seus alvos',
        fastTitle:'Entrar Direto', fastSub:'Pule a configuração e comece agora',
        detailsTitle:'Sobre Você', detailsSub:'Conte-nos um pouco sobre você',
        statsTitle:'Suas Estatísticas', statsSub:'Calcularemos seus alvos perfeitos',
        letsGo:'Vamos lá 🚀', next:'Próximo',
        home:'Início', train:'Treino', nutrition:'Nutrição', progress:'Progresso', settings:'Configurações',
        coach:'COACH', todayScore:'PONTUAÇÃO DE HOJE', outOf:'DE 100', weeklyStreak:'Sequência Semanal',
        todayProgress:'PROGRESSO DE HOJE', myPhase:'MINHA FASE', daysTraining:'Dias Treinando',
        weight:'PESO', current:'Atual', target:'Meta', toGo:'Faltam', badges:'CONQUISTAS',
        logWorkout:'REGISTRAR TREINO',
        coachNoTrain:'Você não treinou hoje — vamos lá',
        coachProtein:'Precisa de <strong>mais {x}g de proteína</strong> hoje',
        coachCalories:'Apenas {x} calorias registradas — você precisa comer mais',
        coachSteps:'<strong>{x} passos</strong> restantes hoje',
        coachWater:'Beba mais água — apenas {x}L registrado',
        coachPerfect:'Você está arrasando hoje!',
        howTrain:'COMO QUER TREINAR?',
        myRoutines:'Meus Treinos', myRoutinesSub:'Iniciar um treino salvo',
        quickWorkout:'Treino Rápido', quickWorkoutSub:'Escolha uma categoria e comece',
        createRoutine:'Criar Rotina', createRoutineSub:'Construa e salve uma nova rotina',
        cardio:'Cardiovascular', cardioSub:'Corrida, ciclismo, caminhada e mais',
        selectCategory:'SELECIONAR CATEGORIA', addExercise:'ADICIONAR EXERCÍCIO', addExBtn:'+ Adicionar Exercício',
        saveWorkout:'Salvar Treino', saveCardio:'Salvar Cardio',
        workoutTime:'TEMPO DE TREINO', restTimer:'TIMER DE DESCANSO', stop:'Parar', sessionTime:'TEMPO DE SESSÃO',
        autoProgression:'PROGRESSÃO AUTOMÁTICA', lastSession:'ÚLTIMA SESSÃO', noPrevData:'Sem dados anteriores',
        tryToday:'Tente {x}kg hoje (último: {y}kg)',
        running:'Corrida', cycling:'Ciclismo', walking:'Caminhada', rowing:'Remo',
        fixedBike:'Bicicleta Fixa', hiit:'HIIT', swimming:'Natação', other:'Outro',
        easy:'Fácil', moderate:'Moderado', hard:'Difícil',
        duration:'Duração (minutos)', distance:'Distância (km)', intensity:'Intensidade', notes:'Notas',
        todaysNutrition:'NUTRIÇÃO DE HOJE', dailyTotals:'TOTAIS DO DIA',
        date:'Data', status:'Status', onTrack:'No Caminho Certo', behindEat:'Atrasado — coma mais',
        calories:'Calorias', protein:'Proteína', carbs:'Carboidratos', fat:'Gordura',
        steps:'Passos', water:'Água',
        addMeal:'+ Adicionar Refeição', mealName:'Nome da refeição:',
        stepsWater:'PASSOS E ÁGUA', stepsToday:'Passos Hoje', waterLitres:'Água (litros)',
        save:'Salvar', supplements:'SUPLEMENTOS',
        addFood:'+ Adicionar Alimento', portion:'Porção (g ou ml)', addToMeal:'Adicionar à Refeição',
        allFoods:'Todos', noFoodsFound:'Nenhum alimento encontrado',
        supp_creatine:'Creatina', supp_whey:'Proteína Whey', supp_vitd:'Vitamina D',
        supp_omega:'Ômega 3', supp_multi:'Multivitamínico', supp_pre:'Pré-Treino', supp_mag:'Magnésio',
        currentPhase:'FASE ATUAL', phaseHistory:'HISTÓRICO DE FASES',
        consistency:'CONSISTÊNCIA', daysLogged:'Dias registrados (últimos 30)',
        workoutsCompleted:'Treinos completos', cardioSessions:'Sessões cardiovasculares',
        personalBests:'RECORDES PESSOAIS', bodyMeasurements:'MEDIDAS CORPORAIS',
        chest:'Peito (cm)', waist:'Cintura (cm)', hips:'Quadril (cm)', arms:'Braços (cm)', legs:'Pernas (cm)',
        saveMeasurements:'Salvar Medidas',
        weeklyCheckin:'CHECK-IN SEMANAL', checkinWeight:'Peso desta semana (kg)',
        checkinEnergy:'Nível de energia (1-10)', checkinNotes:'Notas',
        saveCheckin:'Salvar Check-In', workoutHistory:'HISTÓRICO DE TREINOS',
        weightToGoal:'Peso até a Meta', daysTrainingLabel:'Dias Treinando',
        completePhase:'Completar Fase e Começar Nova', noSessions:'Nenhuma sessão registrada.',
        noPBs:'Registre treinos para acompanhar recordes.',
        badge_first_workout:'Primeiro Treino', badge_five_workouts:'5 Treinos',
        badge_ten_workouts:'10 Treinos', badge_first_pb:'Recorde Pessoal',
        badge_first_cardio:'Primeiro Cardio', badge_week_streak:'Sequência de 7 Dias',
        yourDetails:'SEUS DADOS', name:'Nome', age:'Idade', gender:'Gênero',
        male:'Masculino', female:'Feminino',
        height:'Altura (cm)', currentWeight:'Peso Atual (kg)', targetWeight:'Peso Alvo (kg)',
        activityLevel:'Nível de Atividade',
        sedentary:'Sedentário — Pouco/nenhum exercício',
        lightlyActive:'Levemente Ativo — 1-3 dias/semana',
        moderatelyActive:'Moderadamente Ativo — 3-5 dias/semana',
        veryActive:'Muito Ativo — 6-7 dias/semana',
        goal:'Objetivo', beginner:'Iniciante', fatLoss:'Perda de Gordura',
        muscleBuilding:'Ganho de Músculo', generalFitness:'Condicionamento Geral',
        trainingEnv:'Ambiente de Treino', gym:'Academia', homeEnv:'Casa', both:'Ambos',
        dietaryPref:'Preferência Alimentar', standard:'Padrão', vegan:'Vegano', halal:'Halal',
        units:'Unidades', kgKm:'kg / km', lbsMiles:'lbs / milhas', language:'Idioma',
        myTransformation:'MINHA FASE DE TRANSFORMAÇÃO',
        phaseDesc:'Opcional: Defina uma fase objetivo para rastrear seu progresso.',
        phaseName:'Nome da Fase', phaseDuration:'Duração',
        w4:'4 Semanas', w6:'6 Semanas', w8:'8 Semanas', w10:'10 Semanas', w12:'12 Semanas',
        trainingDays:'Dias de Treino por Semana',
        appearance:'APARÊNCIA', darkMode:'Modo Escuro',
        yourTargets:'SEUS ALVOS CALCULADOS', tdee:'TDEE',
        calTarget:'Alvo de Calorias', proteinTarget:'Alvo de Proteína', stepsTarget:'Alvo de Passos',
        platesCalc:'CALCULADORA DE ANILHAS', targetWeightPlates:'Peso Alvo (kg)',
        barWeight:'Peso da Barra', standard20:'20kg Padrão', womens15:'15kg Feminina', short10:'10kg Curta',
        calcPlates:'Calcular Anilhas', eachSide:'Cada lado', barOnly:'Apenas barra',
        saveSettings:'Salvar e Calcular Alvos',
        back:'← Voltar', delete:'Excluir', noRoutinesYet:'Nenhuma rotina ainda. Crie uma primeiro.',
        routineName:'Nome da Rotina', selectCategory2:'Selecionar Categoria',
        addCustomEx:'Adicionar Exercício Personalizado', typeExercise:'Digite o nome do exercício...',
        saveRoutine:'Salvar Rotina', addCustomExercise:'Adicionar exercício personalizado...',
    },
    es: {
        langTitle:'Elegir Idioma', langSub:'Selecciona tu idioma preferido', langBtn:'Continuar',
        pathTitle:'Bienvenido a PocketGyms', pathSub:'¿Cómo quieres empezar?',
        setupTitle:'Configurar Mis Objetivos', setupSub:'Personaliza tus objetivos',
        fastTitle:'Entrar Directamente', fastSub:'Salta la configuración y empieza ahora',
        detailsTitle:'Sobre Ti', detailsSub:'Cuéntanos un poco sobre ti',
        statsTitle:'Tus Estadísticas', statsSub:'Calcularemos tus objetivos perfectos',
        letsGo:'¡Vamos! 🚀', next:'Siguiente',
        home:'Inicio', train:'Entrenar', nutrition:'Nutrición', progress:'Progreso', settings:'Ajustes',
        coach:'COACH', todayScore:'PUNTUACIÓN DE HOY', outOf:'DE 100', weeklyStreak:'Racha Semanal',
        todayProgress:'PROGRESO DE HOY', myPhase:'MI FASE', daysTraining:'Días Entrenando',
        weight:'PESO', current:'Actual', target:'Meta', toGo:'Faltan', badges:'LOGROS',
        logWorkout:'REGISTRAR ENTRENAMIENTO',
        coachNoTrain:'No has entrenado hoy — ¡a por ello!',
        coachProtein:'Necesitas <strong>{x}g más de proteína</strong> hoy',
        coachCalories:'Solo {x} calorías registradas — necesitas comer más',
        coachSteps:'<strong>{x} pasos</strong> restantes hoy',
        coachWater:'Bebe más agua — solo {x}L registrado',
        coachPerfect:'¡Lo estás haciendo genial hoy!',
        howTrain:'¿CÓMO QUIERES ENTRENAR?',
        myRoutines:'Mis Rutinas', myRoutinesSub:'Iniciar un entrenamiento guardado',
        quickWorkout:'Entrenamiento Rápido', quickWorkoutSub:'Elige una categoría y empieza',
        createRoutine:'Crear Rutina', createRoutineSub:'Construye y guarda una nueva rutina',
        cardio:'Cardiovascular', cardioSub:'Correr, ciclismo, caminar y más',
        selectCategory:'SELECCIONAR CATEGORÍA', addExercise:'AÑADIR EJERCICIO', addExBtn:'+ Añadir Ejercicio',
        saveWorkout:'Guardar Entrenamiento', saveCardio:'Guardar Cardio',
        workoutTime:'TIEMPO DE ENTRENAMIENTO', restTimer:'TEMPORIZADOR DE DESCANSO', stop:'Parar', sessionTime:'TIEMPO DE SESIÓN',
        autoProgression:'PROGRESIÓN AUTOMÁTICA', lastSession:'ÚLTIMA SESIÓN', noPrevData:'Sin datos anteriores',
        tryToday:'Intenta {x}kg hoy (último: {y}kg)',
        running:'Correr', cycling:'Ciclismo', walking:'Caminar', rowing:'Remo',
        fixedBike:'Bicicleta Fija', hiit:'HIIT', swimming:'Natación', other:'Otro',
        easy:'Fácil', moderate:'Moderado', hard:'Difícil',
        duration:'Duración (minutos)', distance:'Distancia (km)', intensity:'Intensidad', notes:'Notas',
        todaysNutrition:'NUTRICIÓN DE HOY', dailyTotals:'TOTALES DEL DÍA',
        date:'Fecha', status:'Estado', onTrack:'En Camino', behindEat:'Atrasado — come más',
        calories:'Calorías', protein:'Proteína', carbs:'Carbohidratos', fat:'Grasa',
        steps:'Pasos', water:'Agua',
        addMeal:'+ Añadir Comida', mealName:'Nombre de la comida:',
        stepsWater:'PASOS Y AGUA', stepsToday:'Pasos Hoy', waterLitres:'Agua (litros)',
        save:'Guardar', supplements:'SUPLEMENTOS',
        addFood:'+ Añadir Alimento', portion:'Porción (g o ml)', addToMeal:'Añadir a Comida',
        allFoods:'Todo', noFoodsFound:'No se encontraron alimentos',
        supp_creatine:'Creatina', supp_whey:'Proteína Whey', supp_vitd:'Vitamina D',
        supp_omega:'Omega 3', supp_multi:'Multivitamínico', supp_pre:'Pre-Entreno', supp_mag:'Magnesio',
        currentPhase:'FASE ACTUAL', phaseHistory:'HISTORIAL DE FASES',
        consistency:'CONSISTENCIA', daysLogged:'Días registrados (últimos 30)',
        workoutsCompleted:'Entrenamientos completados', cardioSessions:'Sesiones cardiovasculares',
        personalBests:'RÉCORDS PERSONALES', bodyMeasurements:'MEDIDAS CORPORALES',
        chest:'Pecho (cm)', waist:'Cintura (cm)', hips:'Caderas (cm)', arms:'Brazos (cm)', legs:'Piernas (cm)',
        saveMeasurements:'Guardar Medidas',
        weeklyCheckin:'CHECK-IN SEMANAL', checkinWeight:'Peso esta semana (kg)',
        checkinEnergy:'Nivel de energía (1-10)', checkinNotes:'Notas',
        saveCheckin:'Guardar Check-In', workoutHistory:'HISTORIAL DE ENTRENAMIENTOS',
        weightToGoal:'Peso hasta el Objetivo', daysTrainingLabel:'Días Entrenando',
        completePhase:'Completar Fase e Iniciar Nueva', noSessions:'No hay sesiones registradas.',
        noPBs:'Registra entrenamientos para rastrear récords.',
        badge_first_workout:'Primer Entrenamiento', badge_five_workouts:'5 Entrenamientos',
        badge_ten_workouts:'10 Entrenamientos', badge_first_pb:'Récord Personal',
        badge_first_cardio:'Primer Cardio', badge_week_streak:'Racha de 7 Días',
        yourDetails:'TUS DATOS', name:'Nombre', age:'Edad', gender:'Género',
        male:'Masculino', female:'Femenino',
        height:'Altura (cm)', currentWeight:'Peso Actual (kg)', targetWeight:'Peso Objetivo (kg)',
        activityLevel:'Nivel de Actividad',
        sedentary:'Sedentario — Poco/ningún ejercicio',
        lightlyActive:'Levemente Activo — 1-3 días/semana',
        moderatelyActive:'Moderadamente Activo — 3-5 días/semana',
        veryActive:'Muy Activo — 6-7 días/semana',
        goal:'Objetivo', beginner:'Principiante', fatLoss:'Pérdida de Grasa',
        muscleBuilding:'Ganancia Muscular', generalFitness:'Fitness General',
        trainingEnv:'Entorno de Entrenamiento', gym:'Gimnasio', homeEnv:'Casa', both:'Ambos',
        dietaryPref:'Preferencia Alimentaria', standard:'Estándar', vegan:'Vegano', halal:'Halal',
        units:'Unidades', kgKm:'kg / km', lbsMiles:'lbs / millas', language:'Idioma',
        myTransformation:'MI FASE DE TRANSFORMACIÓN',
        phaseDesc:'Opcional: Establece una fase objetivo para seguir tu progreso.',
        phaseName:'Nombre de Fase', phaseDuration:'Duración',
        w4:'4 Semanas', w6:'6 Semanas', w8:'8 Semanas', w10:'10 Semanas', w12:'12 Semanas',
        trainingDays:'Días de Entrenamiento por Semana',
        appearance:'APARIENCIA', darkMode:'Modo Oscuro',
        yourTargets:'TUS OBJETIVOS CALCULADOS', tdee:'TDEE',
        calTarget:'Objetivo de Calorías', proteinTarget:'Objetivo de Proteína', stepsTarget:'Objetivo de Pasos',
        platesCalc:'CALCULADORA DE DISCOS', targetWeightPlates:'Peso Objetivo (kg)',
        barWeight:'Peso de la Barra', standard20:'20kg Estándar', womens15:'15kg Femenina', short10:'10kg Corta',
        calcPlates:'Calcular Discos', eachSide:'Cada lado', barOnly:'Solo barra',
        saveSettings:'Guardar y Calcular Objetivos',
        back:'← Atrás', delete:'Eliminar', noRoutinesYet:'Sin rutinas aún. Crea una primero.',
        routineName:'Nombre de Rutina', selectCategory2:'Seleccionar Categoría',
        addCustomEx:'Añadir Ejercicio Personalizado', typeExercise:'Escribe el nombre del ejercicio...',
        saveRoutine:'Guardar Rutina', addCustomExercise:'Añadir ejercicio personalizado...',
    },
    fr: {
        langTitle:'Choisir la Langue', langSub:'Sélectionnez votre langue préférée', langBtn:'Continuer',
        pathTitle:'Bienvenue sur PocketGyms', pathSub:'Comment voulez-vous commencer?',
        setupTitle:'Configurer Mes Objectifs', setupSub:'Personnalisez vos objectifs',
        fastTitle:'Commencer Directement', fastSub:'Sautez la configuration et commencez maintenant',
        detailsTitle:'À Propos de Vous', detailsSub:'Parlez-nous un peu de vous',
        statsTitle:'Vos Statistiques', statsSub:'Nous calculerons vos objectifs parfaits',
        letsGo:'Allons-y 🚀', next:'Suivant',
        home:'Accueil', train:'Entraîner', nutrition:'Nutrition', progress:'Progrès', settings:'Paramètres',
        coach:'COACH', todayScore:"SCORE D'AUJOURD'HUI", outOf:'SUR 100', weeklyStreak:'Série Hebdomadaire',
        todayProgress:"PROGRÈS D'AUJOURD'HUI", myPhase:'MA PHASE', daysTraining:"Jours d'Entraînement",
        weight:'POIDS', current:'Actuel', target:'Objectif', toGo:'Restant', badges:'BADGES',
        logWorkout:"ENREGISTRER L'ENTRAÎNEMENT",
        coachNoTrain:"Vous n'avez pas entraîné aujourd'hui — allez-y!",
        coachProtein:'Besoin de <strong>{x}g de protéines supplémentaires</strong> aujourd\'hui',
        coachCalories:'Seulement {x} calories enregistrées — mangez plus',
        coachSteps:'<strong>{x} pas</strong> restants aujourd\'hui',
        coachWater:"Buvez plus d'eau — seulement {x}L enregistré",
        coachPerfect:"Vous êtes absolument au top aujourd'hui!",
        howTrain:'COMMENT VOULEZ-VOUS VOUS ENTRAÎNER?',
        myRoutines:'Mes Routines', myRoutinesSub:'Démarrer un entraînement sauvegardé',
        quickWorkout:'Entraînement Rapide', quickWorkoutSub:'Choisissez une catégorie et commencez',
        createRoutine:'Créer une Routine', createRoutineSub:'Construisez et sauvegardez une nouvelle routine',
        cardio:'Cardiovasculaire', cardioSub:'Course, cyclisme, marche et plus',
        selectCategory:'SÉLECTIONNER CATÉGORIE', addExercise:'AJOUTER EXERCICE', addExBtn:'+ Ajouter Exercice',
        saveWorkout:"Sauvegarder l'Entraînement", saveCardio:'Sauvegarder Cardio',
        workoutTime:"TEMPS D'ENTRAÎNEMENT", restTimer:'MINUTEUR DE REPOS', stop:'Arrêter', sessionTime:'TEMPS DE SESSION',
        autoProgression:'PROGRESSION AUTOMATIQUE', lastSession:'DERNIÈRE SÉANCE', noPrevData:'Aucune donnée précédente',
        tryToday:'Essayez {x}kg aujourd\'hui (dernier: {y}kg)',
        running:'Course', cycling:'Cyclisme', walking:'Marche', rowing:'Aviron',
        fixedBike:'Vélo Fixe', hiit:'HIIT', swimming:'Natation', other:'Autre',
        easy:'Facile', moderate:'Modéré', hard:'Difficile',
        duration:'Durée (minutes)', distance:'Distance (km)', intensity:'Intensité', notes:'Notes',
        todaysNutrition:"NUTRITION D'AUJOURD'HUI", dailyTotals:'TOTAUX QUOTIDIENS',
        date:'Date', status:'Statut', onTrack:'En Bonne Voie', behindEat:'En retard — mangez plus',
        calories:'Calories', protein:'Protéines', carbs:'Glucides', fat:'Lipides',
        steps:'Pas', water:'Eau',
        addMeal:'+ Ajouter Repas', mealName:'Nom du repas:',
        stepsWater:'PAS ET EAU', stepsToday:"Pas Aujourd'hui", waterLitres:'Eau (litres)',
        save:'Sauvegarder', supplements:'SUPPLÉMENTS',
        addFood:'+ Ajouter Aliment', portion:'Portion (g ou ml)', addToMeal:'Ajouter au Repas',
        allFoods:'Tout', noFoodsFound:'Aucun aliment trouvé',
        supp_creatine:'Créatine', supp_whey:'Protéine Whey', supp_vitd:'Vitamine D',
        supp_omega:'Oméga 3', supp_multi:'Multivitamine', supp_pre:'Pré-Entraînement', supp_mag:'Magnésium',
        currentPhase:'PHASE ACTUELLE', phaseHistory:'HISTORIQUE DES PHASES',
        consistency:'COHÉRENCE', daysLogged:'Jours enregistrés (30 derniers)',
        workoutsCompleted:'Entraînements complétés', cardioSessions:'Séances cardiovasculaires',
        personalBests:'RECORDS PERSONNELS', bodyMeasurements:'MESURES CORPORELLES',
        chest:'Poitrine (cm)', waist:'Taille (cm)', hips:'Hanches (cm)', arms:'Bras (cm)', legs:'Jambes (cm)',
        saveMeasurements:'Sauvegarder Mesures',
        weeklyCheckin:'CHECK-IN HEBDOMADAIRE', checkinWeight:'Poids cette semaine (kg)',
        checkinEnergy:'Niveaux d\'énergie (1-10)', checkinNotes:'Notes',
        saveCheckin:'Sauvegarder Check-In', workoutHistory:"HISTORIQUE D'ENTRAÎNEMENTS",
        weightToGoal:"Poids jusqu'à l'Objectif", daysTrainingLabel:"Jours d'Entraînement",
        completePhase:'Terminer Phase et Commencer Nouvelle', noSessions:'Aucune session enregistrée.',
        noPBs:'Enregistrez des entraînements pour suivre les records.',
        badge_first_workout:'Premier Entraînement', badge_five_workouts:'5 Entraînements',
        badge_ten_workouts:'10 Entraînements', badge_first_pb:'Record Personnel',
        badge_first_cardio:'Premier Cardio', badge_week_streak:'Série de 7 Jours',
        yourDetails:'VOS DONNÉES', name:'Nom', age:'Âge', gender:'Genre',
        male:'Masculin', female:'Féminin',
        height:'Taille (cm)', currentWeight:'Poids Actuel (kg)', targetWeight:'Poids Cible (kg)',
        activityLevel:"Niveau d'Activité",
        sedentary:'Sédentaire — Peu/aucun exercice',
        lightlyActive:'Légèrement Actif — 1-3 jours/semaine',
        moderatelyActive:'Modérément Actif — 3-5 jours/semaine',
        veryActive:'Très Actif — 6-7 jours/semaine',
        goal:'Objectif', beginner:'Débutant', fatLoss:'Perte de Graisse',
        muscleBuilding:'Prise de Muscle', generalFitness:'Forme Générale',
        trainingEnv:"Environnement d'Entraînement", gym:'Salle de Sport', homeEnv:'Maison', both:'Les Deux',
        dietaryPref:'Préférence Alimentaire', standard:'Standard', vegan:'Végétalien', halal:'Halal',
        units:'Unités', kgKm:'kg / km', lbsMiles:'lbs / miles', language:'Langue',
        myTransformation:'MA PHASE DE TRANSFORMATION',
        phaseDesc:'Optionnel: Définissez une phase objectif pour suivre votre progression.',
        phaseName:'Nom de Phase', phaseDuration:'Durée',
        w4:'4 Semaines', w6:'6 Semaines', w8:'8 Semaines', w10:'10 Semaines', w12:'12 Semaines',
        trainingDays:"Jours d'Entraînement par Semaine",
        appearance:'APPARENCE', darkMode:'Mode Sombre',
        yourTargets:'VOS OBJECTIFS CALCULÉS', tdee:'TDEE',
        calTarget:'Objectif Calorique', proteinTarget:'Objectif Protéique', stepsTarget:'Objectif de Pas',
        platesCalc:'CALCULATEUR DE DISQUES', targetWeightPlates:'Poids Cible (kg)',
        barWeight:'Poids de la Barre', standard20:'20kg Standard', womens15:'15kg Femmes', short10:'10kg Courte',
        calcPlates:'Calculer Disques', eachSide:'Chaque côté', barOnly:'Barre seule',
        saveSettings:'Sauvegarder et Calculer',
        back:'← Retour', delete:'Supprimer', noRoutinesYet:'Pas de routines encore. Créez-en une.',
        routineName:'Nom de Routine', selectCategory2:'Sélectionner Catégorie',
        addCustomEx:'Ajouter Exercice Personnalisé', typeExercise:"Tapez le nom de l'exercice...",
        saveRoutine:'Sauvegarder Routine', addCustomExercise:'Ajouter exercice personnalisé...',
    },
    de: {
        langTitle:'Sprache Wählen', langSub:'Wählen Sie Ihre bevorzugte Sprache', langBtn:'Weiter',
        pathTitle:'Willkommen bei PocketGyms', pathSub:'Wie möchten Sie beginnen?',
        setupTitle:'Meine Ziele Einrichten', setupSub:'Personalisieren Sie Ihre Ziele',
        fastTitle:'Direkt Einsteigen', fastSub:'Überspringen Sie die Einrichtung und beginnen Sie jetzt',
        detailsTitle:'Über Sie', detailsSub:'Erzählen Sie uns ein bisschen über sich',
        statsTitle:'Ihre Statistiken', statsSub:'Wir berechnen Ihre perfekten Ziele',
        letsGo:'Los geht\'s 🚀', next:'Weiter',
        home:'Start', train:'Training', nutrition:'Ernährung', progress:'Fortschritt', settings:'Einstellungen',
        coach:'COACH', todayScore:'HEUTIGER SCORE', outOf:'VON 100', weeklyStreak:'Wöchentliche Serie',
        todayProgress:'HEUTIGER FORTSCHRITT', myPhase:'MEINE PHASE', daysTraining:'Trainingstage',
        weight:'GEWICHT', current:'Aktuell', target:'Ziel', toGo:'Noch', badges:'ABZEICHEN',
        logWorkout:'TRAINING STARTEN',
        coachNoTrain:'Sie haben heute noch nicht trainiert — auf geht\'s!',
        coachProtein:'Benötigen <strong>{x}g mehr Protein</strong> heute',
        coachCalories:'Nur {x} Kalorien erfasst — essen Sie mehr',
        coachSteps:'<strong>{x} Schritte</strong> verbleibend heute',
        coachWater:'Trinken Sie mehr Wasser — nur {x}L erfasst',
        coachPerfect:'Sie machen das heute absolut großartig!',
        howTrain:'WIE MÖCHTEN SIE TRAINIEREN?',
        myRoutines:'Meine Routinen', myRoutinesSub:'Gespeichertes Training starten',
        quickWorkout:'Schnelles Training', quickWorkoutSub:'Kategorie wählen und loslegen',
        createRoutine:'Routine Erstellen', createRoutineSub:'Neue Routine erstellen und speichern',
        cardio:'Kardiovaskulär', cardioSub:'Laufen, Radfahren, Gehen und mehr',
        selectCategory:'KATEGORIE WÄHLEN', addExercise:'ÜBUNG HINZUFÜGEN', addExBtn:'+ Übung Hinzufügen',
        saveWorkout:'Training Speichern', saveCardio:'Kardio Speichern',
        workoutTime:'TRAININGSZEIT', restTimer:'RUHETIMER', stop:'Stopp', sessionTime:'SITZUNGSZEIT',
        autoProgression:'AUTOMATISCHE PROGRESSION', lastSession:'LETZTE EINHEIT', noPrevData:'Keine vorherigen Daten',
        tryToday:'Versuchen Sie {x}kg heute (letztes: {y}kg)',
        running:'Laufen', cycling:'Radfahren', walking:'Gehen', rowing:'Rudern',
        fixedBike:'Heimtrainer', hiit:'HIIT', swimming:'Schwimmen', other:'Sonstiges',
        easy:'Leicht', moderate:'Moderat', hard:'Schwer',
        duration:'Dauer (Minuten)', distance:'Distanz (km)', intensity:'Intensität', notes:'Notizen',
        todaysNutrition:'HEUTIGE ERNÄHRUNG', dailyTotals:'TÄGLICHE SUMMEN',
        date:'Datum', status:'Status', onTrack:'Auf Kurs', behindEat:'Rückstand — mehr essen',
        calories:'Kalorien', protein:'Protein', carbs:'Kohlenhydrate', fat:'Fett',
        steps:'Schritte', water:'Wasser',
        addMeal:'+ Mahlzeit Hinzufügen', mealName:'Mahlzeit Name:',
        stepsWater:'SCHRITTE & WASSER', stepsToday:'Schritte Heute', waterLitres:'Wasser (Liter)',
        save:'Speichern', supplements:'NAHRUNGSERGÄNZUNG',
        addFood:'+ Lebensmittel Hinzufügen', portion:'Portion (g oder ml)', addToMeal:'Zur Mahlzeit Hinzufügen',
        allFoods:'Alle', noFoodsFound:'Keine Lebensmittel gefunden',
        supp_creatine:'Kreatin', supp_whey:'Whey Protein', supp_vitd:'Vitamin D',
        supp_omega:'Omega 3', supp_multi:'Multivitamin', supp_pre:'Pre-Workout', supp_mag:'Magnesium',
        currentPhase:'AKTUELLE PHASE', phaseHistory:'PHASENHISTORIE',
        consistency:'KONSISTENZ', daysLogged:'Protokollierte Tage (letzte 30)',
        workoutsCompleted:'Abgeschlossene Trainings', cardioSessions:'Kardio-Einheiten',
        personalBests:'PERSÖNLICHE BESTLEISTUNGEN', bodyMeasurements:'KÖRPERMASSE',
        chest:'Brust (cm)', waist:'Taille (cm)', hips:'Hüfte (cm)', arms:'Arme (cm)', legs:'Beine (cm)',
        saveMeasurements:'Maße Speichern',
        weeklyCheckin:'WÖCHENTLICHES CHECK-IN', checkinWeight:'Gewicht diese Woche (kg)',
        checkinEnergy:'Energielevel (1-10)', checkinNotes:'Notizen',
        saveCheckin:'Check-In Speichern', workoutHistory:'TRAININGSHISTORIE',
        weightToGoal:'Gewicht bis zum Ziel', daysTrainingLabel:'Trainingstage',
        completePhase:'Phase Abschließen und Neue Beginnen', noSessions:'Noch keine Einheiten aufgezeichnet.',
        noPBs:'Trainings aufzeichnen, um Bestleistungen zu verfolgen.',
        badge_first_workout:'Erstes Training', badge_five_workouts:'5 Trainings',
        badge_ten_workouts:'10 Trainings', badge_first_pb:'Persönliche Bestleistung',
        badge_first_cardio:'Erstes Kardio', badge_week_streak:'7-Tage-Serie',
        yourDetails:'IHRE DATEN', name:'Name', age:'Alter', gender:'Geschlecht',
        male:'Männlich', female:'Weiblich',
        height:'Größe (cm)', currentWeight:'Aktuelles Gewicht (kg)', targetWeight:'Zielgewicht (kg)',
        activityLevel:'Aktivitätsniveau',
        sedentary:'Sitzend — Wenig/kein Sport',
        lightlyActive:'Leicht Aktiv — 1-3 Tage/Woche',
        moderatelyActive:'Mäßig Aktiv — 3-5 Tage/Woche',
        veryActive:'Sehr Aktiv — 6-7 Tage/Woche',
        goal:'Ziel', beginner:'Anfänger', fatLoss:'Fettabbau',
        muscleBuilding:'Muskelaufbau', generalFitness:'Allgemeine Fitness',
        trainingEnv:'Trainingsumgebung', gym:'Fitnessstudio', homeEnv:'Zuhause', both:'Beides',
        dietaryPref:'Ernährungspräferenz', standard:'Standard', vegan:'Vegan', halal:'Halal',
        units:'Einheiten', kgKm:'kg / km', lbsMiles:'lbs / Meilen', language:'Sprache',
        myTransformation:'MEINE TRANSFORMATIONSPHASE',
        phaseDesc:'Optional: Legen Sie eine Zielphase fest, um Ihren Fortschritt zu verfolgen.',
        phaseName:'Phasenname', phaseDuration:'Dauer',
        w4:'4 Wochen', w6:'6 Wochen', w8:'8 Wochen', w10:'10 Wochen', w12:'12 Wochen',
        trainingDays:'Trainingstage pro Woche',
        appearance:'ERSCHEINUNGSBILD', darkMode:'Dunkelmodus',
        yourTargets:'IHRE BERECHNETEN ZIELE', tdee:'TDEE',
        calTarget:'Kalorienziel', proteinTarget:'Proteinziel', stepsTarget:'Schrittziel',
        platesCalc:'SCHEIBENKALKULATOR', targetWeightPlates:'Zielgewicht (kg)',
        barWeight:'Stangengewicht', standard20:'20kg Standard', womens15:'15kg Damen', short10:'10kg Kurz',
        calcPlates:'Scheiben Berechnen', eachSide:'Jede Seite', barOnly:'Nur Stange',
        saveSettings:'Speichern und Ziele Berechnen',
        back:'← Zurück', delete:'Löschen', noRoutinesYet:'Noch keine Routinen. Erstellen Sie eine.',
        routineName:'Routinenname', selectCategory2:'Kategorie Wählen',
        addCustomEx:'Benutzerdefinierte Übung Hinzufügen', typeExercise:'Übungsname eingeben...',
        saveRoutine:'Routine Speichern', addCustomExercise:'Benutzerdefinierte Übung hinzufügen...',
    }
};

// ===================== FOOD DATABASE =====================
const foodDB = {
    protein: [
        {name:'Chicken Breast',cal:165,protein:31,carbs:0,fat:3.6,tags:['standard','halal']},
        {name:'Turkey',cal:135,protein:30,carbs:0,fat:1,tags:['standard','halal']},
        {name:'Beef Mince (5%)',cal:137,protein:21,carbs:0,fat:5,tags:['standard','halal']},
        {name:'Salmon',cal:208,protein:20,carbs:0,fat:13,tags:['standard']},
        {name:'Tuna (Tin)',cal:116,protein:26,carbs:0,fat:1,tags:['standard']},
        {name:'Eggs (1 egg)',cal:78,protein:6,carbs:0,fat:5,tags:['standard','halal']},
        {name:'Greek Yogurt',cal:59,protein:10,carbs:3.6,fat:0.4,tags:['standard','halal']},
        {name:'Cottage Cheese',cal:98,protein:11,carbs:3.4,fat:4.3,tags:['standard','halal']},
        {name:'Whey Protein (scoop)',cal:120,protein:25,carbs:3,fat:1.5,tags:['standard']},
        {name:'Halal Chicken',cal:165,protein:31,carbs:0,fat:3.6,tags:['halal']},
        {name:'Halal Beef',cal:250,protein:26,carbs:0,fat:17,tags:['halal']},
        {name:'Halal Lamb',cal:294,protein:25,carbs:0,fat:21,tags:['halal']},
        {name:'Tofu',cal:76,protein:8,carbs:1.9,fat:4.8,tags:['vegan']},
        {name:'Tempeh',cal:193,protein:19,carbs:9,fat:11,tags:['vegan']},
        {name:'Edamame',cal:121,protein:11,carbs:9,fat:5,tags:['vegan']},
        {name:'Lentils (cooked)',cal:116,protein:9,carbs:20,fat:0.4,tags:['vegan','halal']},
        {name:'Chickpeas',cal:164,protein:9,carbs:27,fat:2.6,tags:['vegan','halal']},
        {name:'Black Beans',cal:132,protein:9,carbs:24,fat:0.5,tags:['vegan','halal']},
        {name:'Pea Protein (scoop)',cal:100,protein:21,carbs:2,fat:1.5,tags:['vegan']},
        {name:'Seitan',cal:370,protein:75,carbs:14,fat:1.9,tags:['vegan']}
    ],
    carbs: [
        {name:'White Rice (cooked)',cal:130,protein:2.7,carbs:28,fat:0.3,tags:['standard','vegan','halal']},
        {name:'Brown Rice (cooked)',cal:112,protein:2.6,carbs:24,fat:0.9,tags:['standard','vegan','halal']},
        {name:'Oats',cal:389,protein:17,carbs:66,fat:7,tags:['standard','vegan','halal']},
        {name:'Pasta (cooked)',cal:131,protein:5,carbs:25,fat:1.1,tags:['standard','vegan','halal']},
        {name:'Sweet Potato',cal:86,protein:1.6,carbs:20,fat:0.1,tags:['standard','vegan','halal']},
        {name:'White Potato',cal:77,protein:2,carbs:17,fat:0.1,tags:['standard','vegan','halal']},
        {name:'White Bread (slice)',cal:79,protein:2.7,carbs:15,fat:1,tags:['standard','vegan','halal']},
        {name:'Bagel',cal:245,protein:9,carbs:48,fat:1.5,tags:['standard','vegan','halal']},
        {name:'Rice Cakes (2)',cal:70,protein:1.4,carbs:15,fat:0.6,tags:['standard','vegan','halal']},
        {name:'Quinoa (cooked)',cal:120,protein:4.4,carbs:21,fat:1.9,tags:['vegan','halal']}
    ],
    fats: [
        {name:'Avocado (half)',cal:120,protein:1.5,carbs:6,fat:11,tags:['standard','vegan','halal']},
        {name:'Almonds (30g)',cal:173,protein:6,carbs:6,fat:15,tags:['standard','vegan','halal']},
        {name:'Walnuts (30g)',cal:196,protein:4.6,carbs:4,fat:19,tags:['standard','vegan','halal']},
        {name:'Peanut Butter (tbsp)',cal:94,protein:4,carbs:3,fat:8,tags:['standard','vegan','halal']},
        {name:'Olive Oil (tbsp)',cal:119,protein:0,carbs:0,fat:14,tags:['standard','vegan','halal']},
        {name:'Cheddar Cheese (30g)',cal:120,protein:7,carbs:0.1,fat:10,tags:['standard','halal']},
        {name:'Chia Seeds (tbsp)',cal:58,protein:2,carbs:5,fat:3.7,tags:['vegan','halal']},
        {name:'Flaxseeds (tbsp)',cal:55,protein:1.9,carbs:3,fat:4.3,tags:['vegan','halal']},
        {name:'Tahini (tbsp)',cal:89,protein:2.6,carbs:3.2,fat:8,tags:['vegan','halal']}
    ],
    veg: [
        {name:'Broccoli',cal:34,protein:2.8,carbs:7,fat:0.4,tags:['standard','vegan','halal']},
        {name:'Spinach',cal:23,protein:2.9,carbs:3.6,fat:0.4,tags:['standard','vegan','halal']},
        {name:'Kale',cal:49,protein:4.3,carbs:9,fat:0.9,tags:['standard','vegan','halal']},
        {name:'Peppers',cal:31,protein:1,carbs:6,fat:0.3,tags:['standard','vegan','halal']},
        {name:'Carrots',cal:41,protein:0.9,carbs:10,fat:0.2,tags:['standard','vegan','halal']},
        {name:'Cucumber',cal:16,protein:0.7,carbs:3.6,fat:0.1,tags:['standard','vegan','halal']},
        {name:'Mushrooms',cal:22,protein:3.1,carbs:3.3,fat:0.3,tags:['standard','vegan','halal']},
        {name:'Courgette',cal:17,protein:1.2,carbs:3.1,fat:0.3,tags:['standard','vegan','halal']}
    ],
    dairy: [
        {name:'Whole Milk (200ml)',cal:122,protein:6.6,carbs:9.4,fat:7,tags:['standard','halal']},
        {name:'Skimmed Milk (200ml)',cal:66,protein:6.8,carbs:9.8,fat:0.4,tags:['standard','halal']},
        {name:'Oat Milk (200ml)',cal:90,protein:1.4,carbs:16,fat:1.5,tags:['vegan']},
        {name:'Almond Milk (200ml)',cal:24,protein:0.8,carbs:2,fat:1.4,tags:['vegan']},
        {name:'Soy Milk (200ml)',cal:66,protein:6,carbs:5,fat:2,tags:['vegan']},
        {name:'Coconut Yogurt',cal:90,protein:0.8,carbs:8,fat:6,tags:['vegan']}
    ],
    snacks: [
        {name:'Banana',cal:89,protein:1.1,carbs:23,fat:0.3,tags:['standard','vegan','halal']},
        {name:'Apple',cal:52,protein:0.3,carbs:14,fat:0.2,tags:['standard','vegan','halal']},
        {name:'Dates (3)',cal:69,protein:0.5,carbs:18,fat:0.1,tags:['standard','vegan','halal']},
        {name:'Protein Bar',cal:200,protein:20,carbs:20,fat:7,tags:['standard']},
        {name:'Rice Cake (1)',cal:35,protein:0.7,carbs:7.5,fat:0.3,tags:['standard','vegan','halal']},
        {name:'Mixed Nuts (30g)',cal:185,protein:5,carbs:7,fat:16,tags:['standard','vegan','halal']},
        {name:'Nakd Bar',cal:140,protein:4,carbs:22,fat:5,tags:['vegan','halal']}
    ],
    drinks: [
        {name:'Water (250ml)',cal:0,protein:0,carbs:0,fat:0,water:0.25,tags:['standard','vegan','halal']},
        {name:'Water (500ml)',cal:0,protein:0,carbs:0,fat:0,water:0.5,tags:['standard','vegan','halal']},
        {name:'Water (1L)',cal:0,protein:0,carbs:0,fat:0,water:1,tags:['standard','vegan','halal']},
        {name:'Black Coffee',cal:2,protein:0.3,carbs:0,fat:0,tags:['standard','vegan','halal']},
        {name:'Coffee with Milk',cal:30,protein:1.5,carbs:2.5,fat:1.2,tags:['standard','halal']},
        {name:'Latte (medium)',cal:120,protein:6,carbs:10,fat:5,tags:['standard','halal']},
        {name:'Cappuccino',cal:80,protein:4,carbs:7,fat:3,tags:['standard','halal']},
        {name:'Espresso',cal:5,protein:0.1,carbs:0.5,fat:0,tags:['standard','vegan','halal']},
        {name:'Black Tea',cal:2,protein:0,carbs:0.5,fat:0,tags:['standard','vegan','halal']},
        {name:'Green Tea',cal:2,protein:0,carbs:0.5,fat:0,tags:['standard','vegan','halal']},
        {name:'Orange Juice (200ml)',cal:88,protein:1.4,carbs:20,fat:0.2,tags:['standard','vegan','halal']},
        {name:'Coconut Water (330ml)',cal:62,protein:0.6,carbs:15,fat:0.2,tags:['standard','vegan','halal']},
        {name:'Protein Shake',cal:150,protein:30,carbs:5,fat:2,tags:['standard']},
        {name:'Monster Energy (500ml)',cal:95,protein:0,carbs:23,fat:0,tags:['standard','vegan']},
        {name:'Red Bull (250ml)',cal:110,protein:1,carbs:28,fat:0,tags:['standard','vegan']},
        {name:'Reign (500ml)',cal:10,protein:0,carbs:3,fat:0,tags:['standard','vegan']},
        {name:'Coca Cola (330ml)',cal:139,protein:0,carbs:35,fat:0,tags:['standard','vegan','halal']},
        {name:'Diet Coke (330ml)',cal:1,protein:0,carbs:0,fat:0,tags:['standard','vegan','halal']},
        {name:'Fanta Orange (330ml)',cal:139,protein:0,carbs:34,fat:0,tags:['standard','vegan','halal']},
        {name:'Sprite (330ml)',cal:138,protein:0,carbs:35,fat:0,tags:['standard','vegan','halal']},
        {name:'Guaraná Antarctica (350ml)',cal:140,protein:0,carbs:35,fat:0,tags:['standard','vegan','halal']},
        {name:'Guaraná Zero (350ml)',cal:2,protein:0,carbs:0.5,fat:0,tags:['standard','vegan','halal']},
        {name:'Açaí Juice (200ml)',cal:60,protein:1,carbs:12,fat:1,tags:['standard','vegan','halal']},
        {name:'Coconut Water (330ml)',cal:62,protein:0.6,carbs:15,fat:0.2,tags:['standard','vegan','halal']},
        {name:'Beer (330ml)',cal:143,protein:1,carbs:13,fat:0,tags:['standard','vegan']},
        {name:'Wine, Red (175ml)',cal:149,protein:0.1,carbs:4,fat:0,tags:['standard','vegan']},
        {name:'Spirits (25ml)',cal:56,protein:0,carbs:0,fat:0,tags:['standard']}
    ]
};

// ===================== EXERCISE DATABASE =====================
const exerciseDB = {
    Push: ['Bench Press','Shoulder Press','Incline Press','Tricep Dips','Lateral Raises','Push Ups','Cable Fly','Arnold Press'],
    Pull: ['Deadlift','Pull Ups','Bent Over Row','Lat Pulldown','Bicep Curl','Face Pulls','Cable Row','Chin Up'],
    Legs: ['Squat','Leg Press','Romanian Deadlift','Leg Curl','Leg Extension','Calf Raises','Bulgarian Split Squat','Hip Thrust'],
    Core: ['Plank','Crunches','Hanging Leg Raise','Cable Crunch','Ab Wheel','Russian Twist','Leg Raise','Mountain Climber'],
    Chest: {gym:['Barbell Bench Press','Dumbbell Bench Press','Incline Barbell Press','Incline Dumbbell Press','Decline Bench Press','Cable Fly','Dumbbell Fly','Pec Deck Machine','Machine Chest Press','Chest Dip'],home:['Push Up','Wide Push Up','Decline Push Up','Diamond Push Up','Pike Push Up','Archer Push Up','Chair Dip']},
    Back: {gym:['Deadlift','Barbell Row','Dumbbell Row','Lat Pulldown','Pull Up','Chin Up','Seated Cable Row','T-Bar Row','Face Pull','Machine Row','Rack Pull'],home:['Pull Up','Chin Up','Resistance Band Row','Towel Row','Superman','Reverse Snow Angel','Doorframe Row']},
    Shoulders: {gym:['Barbell Overhead Press','Dumbbell Shoulder Press','Arnold Press','Lateral Raise','Front Raise','Reverse Fly','Face Pull','Cable Lateral Raise','Machine Shoulder Press','Upright Row','Shrugs'],home:['Pike Push Up','Handstand Push Up','Lateral Raise (Bottles)','Front Raise (Bottles)','Band Pull Apart']},
    Biceps: {gym:['Barbell Curl','Dumbbell Curl','Hammer Curl','Incline Dumbbell Curl','Cable Curl','Preacher Curl','Concentration Curl','Machine Curl','EZ Bar Curl','Spider Curl'],home:['Resistance Band Curl','Chin Up','Towel Curl','Backpack Curl','Isometric Curl']},
    Triceps: {gym:['Close Grip Bench Press','Skull Crusher','Tricep Dip','Cable Pushdown','Rope Pushdown','Overhead Tricep Extension','Kickback','Machine Tricep Press'],home:['Diamond Push Up','Chair Dip','Tricep Extension (Bottle)','Resistance Band Pushdown','Close Grip Push Up']},
    Quads: {gym:['Barbell Squat','Front Squat','Hack Squat','Leg Press','Leg Extension','Bulgarian Split Squat','Lunge','Step Up','Smith Machine Squat','Goblet Squat'],home:['Bodyweight Squat','Jump Squat','Lunge','Reverse Lunge','Step Up','Wall Sit','Pistol Squat']},
    Hamstrings: {gym:['Romanian Deadlift','Lying Leg Curl','Seated Leg Curl','Nordic Curl','Good Morning','Stiff Leg Deadlift','Cable Pull Through'],home:['Glute Bridge','Single Leg Glute Bridge','Nordic Curl','Good Morning (Bodyweight)','Resistance Band Curl']},
    Glutes: {gym:['Hip Thrust','Glute Bridge','Cable Kickback','Abductor Machine','Romanian Deadlift','Sumo Squat','Step Up'],home:['Glute Bridge','Hip Thrust (Sofa)','Donkey Kick','Fire Hydrant','Resistance Band Walk','Sumo Squat','Reverse Lunge']},
    Calves: {gym:['Standing Calf Raise','Seated Calf Raise','Leg Press Calf Raise','Donkey Calf Raise','Single Leg Calf Raise','Smith Machine Calf Raise'],home:['Standing Calf Raise','Single Leg Calf Raise','Jump Rope','Stair Calf Raise']},
    Abs: {gym:['Plank','Crunch','Bicycle Crunch','Leg Raise','Hanging Leg Raise','Cable Crunch','Ab Wheel','Russian Twist','Cable Woodchop'],home:['Plank','Crunch','Bicycle Crunch','Leg Raise','Mountain Climber','Ab Wheel','Hollow Hold','V-Up','Flutter Kick','Reverse Crunch']}
};

const supplementsList = ['Creatine','Whey Protein','Vitamin D','Omega 3','Multivitamin','Pre-Workout','Magnesium'];
const mealPresets = ['Breakfast','Lunch','Dinner','Snack','Pre-Workout','Post-Workout'];

// ===================== STATE =====================
let selectedMuscle='', exercises=[], workoutHistory=[], cardioHistory=[], checkinHistory=[];
let personalBests={}, settings={}, savedRoutines=[], customExercises={}, meals=[], phaseHistory=[], measurements={};
let timerInterval=null, workoutTimerInterval=null, workoutStartTime=null, cardioTimerInterval=null;
let currentCardioType='', selectedFood=null, foodFilter='all', currentMealIndex=null;
let selectedLang='en', selectedHeightUnit='cm', selectedWeightUnit='kg';
let firstSetLogged=false;

// ===================== TRANSLATIONS =====================
function t(key) { return (translations[selectedLang]&&translations[selectedLang][key])||translations.en[key]||key; }

function applyTranslations() {
    const set=(id,key)=>{const el=document.getElementById(id);if(el&&key)el.textContent=t(key);};
    const setPlaceholder=(id,key)=>{const el=document.getElementById(id);if(el&&key)el.placeholder=t(key);};
    // Nav
    set('nav-txt-home','home');set('nav-txt-train','train');set('nav-txt-nutrition','nutrition');
    set('nav-txt-progress','progress');set('nav-txt-settings','settings');
    // Home
    set('txt-today-score','todayScore');set('txt-out-of','outOf');set('txt-weekly-streak','weeklyStreak');
    set('txt-coach','coach');set('txt-today-progress','todayProgress');set('txt-my-phase','myPhase');
    set('txt-days-training','daysTraining');set('txt-weight','weight');
    set('txt-current','current');set('txt-target','target');set('txt-to-go','toGo');
    set('txt-badges','badges');set('txt-log-workout','logWorkout');
    // Train
    set('txt-how-train','howTrain');set('txt-my-routines','myRoutines');set('txt-my-routines-sub','myRoutinesSub');
    set('txt-quick-workout','quickWorkout');set('txt-quick-workout-sub','quickWorkoutSub');
    set('txt-create-routine','createRoutine');set('txt-create-routine-sub','createRoutineSub');
    set('txt-cardio','cardio');set('txt-cardio-sub','cardioSub');
    set('txt-select-category','selectCategory');set('txt-add-exercise','addExercise');
    set('txt-add-ex-btn','addExBtn');set('save-btn','saveWorkout');
    set('txt-workout-time','workoutTime');set('txt-rest-timer','restTimer');
    set('txt-stop','stop');set('txt-save-cardio','saveCardio');set('txt-session-time','sessionTime');
    set('lbl-duration','duration');set('lbl-distance','distance');
    set('lbl-intensity','intensity');set('lbl-notes','notes');
    set('txt-create-routine-title','createRoutine');set('txt-cardio-title','cardio');
    set('txt-my-routines-title','myRoutines');set('no-routines-msg','noRoutinesYet');
    set('lbl-routine-name','routineName');set('lbl-select-category','selectCategory2');
    set('lbl-custom-ex','addCustomEx');set('txt-save-routine','saveRoutine');
    setPlaceholder('routine-name','routineName');setPlaceholder('create-custom-ex','typeExercise');
    setPlaceholder('custom-exercise','addCustomExercise');
    // Cardio types
    set('txt-running','running');set('txt-cycling','cycling');set('txt-walking','walking');
    set('txt-rowing','rowing');set('txt-fixedbike','fixedBike');set('txt-hiit','hiit');
    set('txt-swimming','swimming');set('txt-other','other');
    // Intensity options
    const intensityEl=document.getElementById('cardio-intensity');
    if(intensityEl){intensityEl.options[0].text=t('easy');intensityEl.options[1].text=t('moderate');intensityEl.options[2].text=t('hard');}
    // Back buttons
    ['txt-back-1','txt-back-2','txt-back-3','txt-back-4','txt-back-5','txt-back-6'].forEach(id=>set(id,'back'));
    // Nutrition
    set('txt-todays-nutrition','todaysNutrition');set('txt-daily-totals','dailyTotals');
    set('txt-date-label','date');set('txt-status','status');
    set('home-txt-cal-label','calories');set('nut-txt-cal-label','calories');set('txt-prot-label','protein');
    set('txt-carbs-label','carbs');set('txt-fat-label','fat');
    set('txt-steps-label','steps');set('txt-water-label','water');
    set('txt-add-meal','addMeal');set('txt-steps-water','stepsWater');
    set('lbl-steps-today','stepsToday');set('lbl-water','waterLitres');
    set('txt-save-sw','save');set('txt-supplements','supplements');
    set('filter-all','allFoods');set('txt-add-to-meal','addToMeal');set('lbl-portion','portion');
    // Supplements translated
    const suppNames=[t('supp_creatine'),t('supp_whey'),t('supp_vitd'),t('supp_omega'),t('supp_multi'),t('supp_pre'),t('supp_mag')];
    suppNames.forEach((name,i)=>{supplementsList[i]=name;});
    renderSupplements();
    // Progress
    set('txt-current-phase','currentPhase');set('txt-phase-history','phaseHistory');
    set('txt-consistency','consistency');set('txt-days-logged','daysLogged');
    set('txt-workouts-completed','workoutsCompleted');set('txt-cardio-sessions','cardioSessions');
    set('txt-personal-bests','personalBests');set('txt-body-measurements','bodyMeasurements');
    set('lbl-chest','chest');set('lbl-waist','waist');set('lbl-hips','hips');
    set('lbl-arms','arms');set('lbl-legs','legs');
    set('txt-save-measurements','saveMeasurements');
    set('txt-weekly-checkin','weeklyCheckin');set('lbl-checkin-weight','checkinWeight');
    set('lbl-checkin-energy','checkinEnergy');set('lbl-checkin-notes','checkinNotes');
    set('txt-save-checkin','saveCheckin');set('txt-workout-history','workoutHistory');
    set('txt-weight-to-go','weightToGoal');set('txt-days-training-prog','daysTrainingLabel');
    set('txt-complete-phase','completePhase');
    // Settings
    set('txt-your-details','yourDetails');set('lbl-set-name','name');set('lbl-set-age','age');
    set('lbl-set-gender','gender');set('lbl-set-height','height');set('lbl-set-weight','currentWeight');
    set('lbl-set-target','targetWeight');set('lbl-set-activity','activityLevel');
    set('lbl-set-goal','goal');set('lbl-set-env','trainingEnv');set('lbl-set-diet','dietaryPref');
    set('lbl-set-units','units');set('lbl-set-lang','language');
    set('txt-my-transformation','myTransformation');set('txt-phase-desc','phaseDesc');
    set('lbl-phase-name','phaseName');set('lbl-phase-duration','phaseDuration');
    set('lbl-training-days','trainingDays');set('txt-appearance','appearance');
    set('txt-dark-mode','darkMode');set('txt-your-targets','yourTargets');
    set('txt-tdee','tdee');set('txt-cal-target','calTarget');
    set('txt-protein-target','proteinTarget');set('txt-steps-target','stepsTarget');
    set('txt-plates-calc','platesCalc');set('lbl-plates-weight','targetWeightPlates');
    set('lbl-plates-bar','barWeight');set('txt-calc-plates','calcPlates');
    set('txt-save-settings','saveSettings');
    // Settings select options
    const genderEl=document.getElementById('set-gender');
    if(genderEl){genderEl.options[0].text=t('male');genderEl.options[1].text=t('female');}
    const actEl=document.getElementById('set-activity');
    if(actEl){actEl.options[0].text=t('sedentary');actEl.options[1].text=t('lightlyActive');actEl.options[2].text=t('moderatelyActive');actEl.options[3].text=t('veryActive');}
    const goalEl=document.getElementById('set-goal');
    if(goalEl){goalEl.options[0].text=t('beginner');goalEl.options[1].text=t('fatLoss');goalEl.options[2].text=t('muscleBuilding');goalEl.options[3].text=t('generalFitness');}
    const envEl=document.getElementById('set-environment');
    if(envEl){envEl.options[0].text=t('gym');envEl.options[1].text=t('homeEnv');envEl.options[2].text=t('both');}
    const dietEl=document.getElementById('set-diet');
    if(dietEl){dietEl.options[0].text=t('standard');dietEl.options[1].text=t('vegan');dietEl.options[2].text=t('halal');}
    const unitsEl=document.getElementById('set-units');
    if(unitsEl){unitsEl.options[0].text=t('kgKm');unitsEl.options[1].text=t('lbsMiles');}
    const durEl=document.getElementById('set-phase-duration');
    if(durEl){durEl.options[0].text=t('w4');durEl.options[1].text=t('w6');durEl.options[2].text=t('w8');durEl.options[3].text=t('w10');durEl.options[4].text=t('w12');}
    const barEl=document.getElementById('plates-bar');
    if(barEl){barEl.options[0].text=t('standard20');barEl.options[1].text=t('womens15');barEl.options[2].text=t('short10');}
    // Onboarding
    set('ob-title-lang','langTitle');set('ob-sub-lang','langSub');set('ob-btn-lang','langBtn');
    set('ob-title-path','pathTitle');set('ob-sub-path','pathSub');
    set('ob-path-setup-title','setupTitle');set('ob-path-setup-sub','setupSub');
    set('ob-path-fast-title','fastTitle');set('ob-path-fast-sub','fastSub');
    set('ob-title-details','detailsTitle');set('ob-sub-details','detailsSub');set('ob-btn-details','next');
    set('ob-title-stats','statsTitle');set('ob-sub-stats','statsSub');set('ob-btn-stats','letsGo');
    renderBadges();
    updateHome();
}

// ===================== ONBOARDING =====================
function selectLang(lang,el) {
    selectedLang=lang;
    document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('selected'));
    el.classList.add('selected');
    applyTranslations();
}

function obNext(step) {
    if(!document.getElementById('ob-step-'+step)||!document.getElementById('dot-'+step))return;
    document.querySelectorAll('.onboarding-step').forEach(s=>s.classList.remove('active'));
    document.querySelectorAll('.step-dot').forEach(d=>d.classList.remove('active'));
    document.getElementById('ob-step-'+step).classList.add('active');
    document.getElementById('dot-'+step).classList.add('active');
}

function showOnboarding() {
    const onboarding=document.getElementById('onboarding');
    const authModalEl=getAuthModalEl();
    setMainAppVisible(false);
    if(onboarding)onboarding.style.display='flex';
    if(authModalEl)authModalEl.style.display='none';
    document.body.style.overflow = 'hidden';
    obNext(0);
}

async function fastTrack() {
    const onboarding=document.getElementById('onboarding');if(onboarding)onboarding.style.display='none';
    settings={name:'',goal:'fitness',environment:'gym',diet:'standard',weight:0,targetWeight:0,
        calTarget:2000,proteinTarget:150,stepsTarget:8000,language:selectedLang,
        phaseName:'Phase 1',phaseStartDate:new Date().toLocaleDateString('en-GB'),
        phaseDuration:56,trainingDays:4,units:'kg',onboarded:true};
    await PG.profile.save(settings);
    showMainApp();
    await loadFromStorage();
}

function selectHeightUnit(unit) {
    selectedHeightUnit=unit;
    document.querySelectorAll('#ob-step-3 .unit-btn').forEach(b=>b.classList.remove('selected'));
    const el=document.getElementById('height-unit-'+unit);if(el)el.classList.add('selected');
    document.getElementById('height-cm-input').style.display=unit==='cm'?'block':'none';
    document.getElementById('height-ft-input').style.display=unit==='ft'?'block':'none';
}

function selectWeightUnit(unit) {
    selectedWeightUnit=unit;
    ['kg','lbs','st'].forEach(u=>{const el=document.getElementById('weight-unit-'+u);if(el)el.classList.remove('selected');});
    const sel=document.getElementById('weight-unit-'+unit);if(sel)sel.classList.add('selected');
    document.getElementById('ob-weight').placeholder=unit==='kg'?'e.g. 80':unit==='lbs'?'e.g. 176':'e.g. 12.5';
    document.getElementById('ob-target').placeholder=unit==='kg'?'e.g. 75':unit==='lbs'?'e.g. 165':'e.g. 11.5';
}

function getHeightInCm() {
    if(selectedHeightUnit==='cm') return parseFloat(document.getElementById('ob-height-cm').value)||175;
    const ft=parseFloat(document.getElementById('ob-height-ft').value)||5;
    const inch=parseFloat(document.getElementById('ob-height-in').value)||9;
    return Math.round((ft*30.48)+(inch*2.54));
}

function getWeightInKg(value) {
    if(selectedWeightUnit==='kg') return value;
    if(selectedWeightUnit==='lbs') return Math.round(value*0.453592*10)/10;
    if(selectedWeightUnit==='st') return Math.round(value*6.35029*10)/10;
    return value;
}

async function completeOnboarding() {
    const age=parseInt(document.getElementById('ob-age').value)||25;
    const weightRaw=parseFloat(document.getElementById('ob-weight').value)||80;
    const targetRaw=parseFloat(document.getElementById('ob-target').value)||75;
    const weight=getWeightInKg(weightRaw);
    const targetWeight=getWeightInKg(targetRaw);
    const height=getHeightInCm();
    const gender=document.getElementById('ob-gender').value;
    const goal=document.getElementById('ob-goal').value;
    const name=document.getElementById('ob-name').value||'Athlete';
    const activity=parseFloat(document.getElementById('ob-activity').value)||1.55;
    let bmr=gender==='male'?10*weight+6.25*height-5*age+5:10*weight+6.25*height-5*age-161;
    const tdee=Math.round(bmr*activity);
    const calTarget=goal==='fatloss'?tdee-500:goal==='muscle'?tdee+300:tdee;
    const proteinTarget=Math.round(weight*(goal==='muscle'?2.4:2.0));
    settings={name,age,weight,targetWeight,height,gender,goal,
        environment:document.getElementById('ob-environment').value,
        diet:document.getElementById('ob-diet').value,
        activity,tdee,calTarget,proteinTarget,stepsTarget:8000,
        phaseName:'Phase 1',phaseStartDate:new Date().toLocaleDateString('en-GB'),
        phaseDuration:56,trainingDays:4,units:selectedWeightUnit,language:selectedLang,onboarded:true};
    await PG.profile.save(settings);
    const onboarding=document.getElementById('onboarding');if(onboarding)onboarding.style.display='none';
    showMainApp();
    await loadFromStorage();
}

// ===================== THEME =====================
async function toggleTheme() {
    document.body.classList.toggle('dark');
    const toggle=document.getElementById('dark-toggle');if(toggle)toggle.classList.toggle('on');
}

function showSaveMessage(id, text) {
    const el=document.getElementById(id);
    if(!el)return;
    el.textContent=text;
    el.style.display='block';
    setTimeout(()=>{el.style.display='none';},1600);
}

let toastTimer=null;
function showToast(message,type='success',duration=2000){
    const toast=document.getElementById('toast');
    if(!toast)return;
    if(toastTimer)clearTimeout(toastTimer);
    toast.textContent=message;
    toast.className=type==='error'?'toast toast-error':'toast toast-success';
    toast.style.display='block';
    requestAnimationFrame(()=>toast.classList.add('show'));
    toastTimer=setTimeout(()=>{
        toast.classList.remove('show');
        setTimeout(()=>{toast.style.display='none';},250);
    },duration);
}

async function saveProfileSettings() {
    try{
        const payload={
            name:document.getElementById('set-name').value,
            age:parseInt(document.getElementById('set-age').value),
            gender:document.getElementById('set-gender').value,
            height:parseFloat(document.getElementById('set-height').value),
            weight:parseFloat(document.getElementById('set-weight').value),
            targetWeight:parseFloat(document.getElementById('set-target-weight').value),
            activity:parseFloat(document.getElementById('set-activity').value),
            goal:document.getElementById('set-goal').value,
            environment:document.getElementById('set-environment').value,
            diet:document.getElementById('set-diet').value,
            units:document.getElementById('set-units').value,
            language:document.getElementById('set-language').value,
            darkMode:document.body.classList.contains('dark')?'dark':'light'
        };
        console.log('[Settings] Save & Update payload:', payload);
        settings={...settings,...payload};
        selectedLang=payload.language||selectedLang;
        const saveResult=await PG.profile.save(payload);
        console.log('[Settings] Save & Update result:', saveResult);
        if(saveResult?.ok===false){
            showToast('Save failed — please try again','error',4000);
            return;
        }
        applyTranslations();
        updateHome();
        showSaveMessage('settings-save-msg','Saved!');
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('saveProfileSettings:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

async function savePhaseSettings() {
    try{
        const phaseName=document.getElementById('set-phase-name').value||'Phase 1';
        const durationDays=parseInt(document.getElementById('set-phase-duration').value)||56;
        const trainingDays=parseInt(document.getElementById('set-training-days').value)||4;
        settings={...settings,phaseName,phaseDuration:durationDays,trainingDays};
        await PG.progress.save({
            phase_name:phaseName,
            duration_weeks:Math.round(durationDays/7),
            training_days_per_week:trainingDays
        });
        await PG.profile.save({phaseName,phaseDuration:durationDays,trainingDays});
        showSaveMessage('phase-save-msg','Phase saved!');
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('savePhaseSettings:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

// ===================== NAVIGATION =====================
function showScreen(id) {
    window.scrollTo(0,0);
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    const navMap={'screen-home':'nav-home','screen-train':'nav-train','screen-calories':'nav-calories','screen-progress':'nav-progress','screen-settings':'nav-settings'};
    if(navMap[id])document.getElementById(navMap[id]).classList.add('active');
    if(id==='screen-home')updateHome();
    if(id==='screen-calories'){loadNutrition();renderSupplements();renderMeals();}
    if(id==='screen-progress')updateProgress();
    if(id==='screen-settings')loadSettings();
    if(id==='screen-train'){showTrainSection('menu');renderRoutinesList();updateStepsDisplay();}
}

// ===================== TRAIN =====================
function showTrainSection(section) {
    ['menu','routines','quick','create','cardio','active','cardio-active'].forEach(s=>{const el=document.getElementById('train-'+s);if(el)el.style.display='none';});
    const target=document.getElementById('train-'+section);if(target)target.style.display='block';
    if(section==='menu'){const prev=document.getElementById('previous-workout-summary');if(prev)prev.style.display='none';}
    if(section==='create')buildCreateExercisePicker();
    if(section==='active')buildActiveExercisePicker();
}

function getExercisesForCategory(cat) {
    const env=settings.environment||'gym';
    if(['Push','Pull','Legs','Core'].includes(cat)) return [...(exerciseDB[cat]||[]),...(customExercises[cat]||[])];
    const catDB=exerciseDB[cat];
    if(!catDB) return customExercises[cat]||[];
    let list=[];
    if(typeof catDB==='object'&&!Array.isArray(catDB)){
        if(env==='both') list=[...new Set([...(catDB.gym||[]),...(catDB.home||[])])];
        else list=catDB[env]||catDB.gym||[];
    } else {list=catDB;}
    return [...list,...(customExercises[cat]||[])];
}

function startQuickWorkout(category) {
    selectedMuscle=category;exercises=[];firstSetLogged=false;
    showTrainSection('active');showPreviousWorkoutSummary(category);buildActiveExercisePicker();
    document.getElementById('save-btn').style.display='none';
    document.getElementById('exercise-log').innerHTML='';
    const timerBar=document.getElementById('workout-timer-bar');if(timerBar)timerBar.style.display='none';
}

function buildActiveExercisePicker() {
    const filter=document.getElementById('active-category-filter');if(!filter)return;
    const cats=['Push','Pull','Legs','Core','Chest','Back','Shoulders','Biceps','Triceps','Quads','Hamstrings','Glutes','Calves','Abs'];
    filter.innerHTML=cats.map(c=>`<button class="filter-btn ${c===selectedMuscle?'active':''}" onclick="switchActiveCategory('${c}',this)">${c}</button>`).join('');
    renderActiveTags(selectedMuscle);
}

function switchActiveCategory(cat,btn) {
    document.querySelectorAll('#active-category-filter .filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');selectedMuscle=cat;showPreviousWorkoutSummary(cat);renderActiveTags(cat);
}

function renderActiveTags(cat) {
    const tags=document.getElementById('exercise-tags');if(!tags)return;
    tags.innerHTML=getExercisesForCategory(cat).map(ex=>`<span class="tag" onclick="this.classList.toggle('selected')">${ex}</span>`).join('');
}

function buildCreateExercisePicker() {
    const filter=document.getElementById('create-category-filter');
    const cats=['Push','Pull','Legs','Core','Chest','Back','Shoulders','Biceps','Triceps','Quads','Hamstrings','Glutes','Calves','Abs'];
    filter.innerHTML=cats.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" onclick="switchCreateCategory('${c}',this)">${c}</button>`).join('');
    renderCreateTags(cats[0]);
}

function switchCreateCategory(cat,btn) {
    document.querySelectorAll('#create-category-filter .filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');renderCreateTags(cat);
}

function renderCreateTags(cat) {
    const tags=document.getElementById('create-exercise-tags');if(!tags)return;
    tags.innerHTML=getExercisesForCategory(cat).map(ex=>`<span class="tag" onclick="this.classList.toggle('selected')">${ex}</span>`).join('');
}

function saveRoutine() {
    const name=document.getElementById('routine-name').value.trim();
    if(!name){alert('Please name your routine');return;}
    const selected=[...document.querySelectorAll('#create-exercise-tags .tag.selected')].map(t=>t.textContent);
    const customText=document.getElementById('create-custom-ex').value.trim();
    if(customText){
        selected.push(customText);
        const activeCat=document.querySelector('#create-category-filter .filter-btn.active');
        if(activeCat){const cat=activeCat.textContent;if(!customExercises[cat])customExercises[cat]=[];if(!customExercises[cat].includes(customText))customExercises[cat].push(customText);}
    }
    if(selected.length===0){alert('Please select at least one exercise');return;}
    savedRoutines.push({name,exercises:selected,created:new Date().toLocaleDateString('en-GB')});
    saveToStorage();
    document.getElementById('routine-name').value='';document.getElementById('create-custom-ex').value='';
    showTrainSection('routines');renderRoutinesList();
}

function renderRoutinesList() {
    const list=document.getElementById('routines-list');
    const msg=document.getElementById('no-routines-msg');
    if(!list)return;
    if(savedRoutines.length===0){
        list.innerHTML=`<div style="text-align:center;padding:32px 16px;">
            <div style="font-size:48px;margin-bottom:12px;">🏋️</div>
            <div style="color:var(--text);font-size:16px;font-weight:700;margin-bottom:8px;">No routines yet</div>
            <div style="color:var(--text-muted);font-size:13px;margin-bottom:16px;">Create your first routine or unlock a programme with a code</div>
            <button class="btn" onclick="showTrainSection('create')">Create Routine</button>
        </div>`;
        if(msg)msg.style.display='none';
        return;
    }
    if(msg)msg.style.display='none';
    list.innerHTML=savedRoutines.map((r,i)=>`
        <div style="background:var(--card);border:1.5px solid var(--border);border-radius:14px;padding:16px;margin-bottom:10px;">
            <div onclick="startRoutine(${i})" style="cursor:pointer;margin-bottom:10px;">
                <div style="color:var(--text);font-size:15px;font-weight:700;">${r.name}</div>
                <div style="color:var(--text-muted);font-size:12px;margin-top:4px;">${r.exercises.length} exercises • ${r.created}${r.duration?' • '+r.duration+' mins':''}</div>
                ${r.programme?`<div style="color:var(--gold);font-size:11px;font-weight:700;margin-top:2px;">⭐ ${r.programme}</div>`:''}
            </div>
            <div style="display:flex;gap:8px;">
                <button class="btn" onclick="startRoutine(${i})" style="flex:1;margin-bottom:0;padding:10px;">▶ Start</button>
                <button class="btn-danger" onclick="deleteRoutine(${i})" style="padding:10px 14px;">Delete</button>
            </div>
        </div>`
    ).join('');
}

let routineSelection = [];

function addToRoutineSelection() {
    const selected=[...document.querySelectorAll('#create-exercise-tags .tag.selected')].map(t=>t.textContent);
    if(selected.length===0){alert('Select at least one exercise first');return;}
    selected.forEach(ex=>{if(!routineSelection.find(r=>r===ex))routineSelection.push(ex);});
    document.querySelectorAll('#create-exercise-tags .tag').forEach(t=>t.classList.remove('selected'));
    renderRoutineSelectionList();
}

function addCustomToSelection() {
    const custom=document.getElementById('create-custom-ex').value.trim();
    if(!custom)return;
    if(!routineSelection.includes(custom))routineSelection.push(custom);
    const activeCat=document.querySelector('#create-category-filter .filter-btn.active');
    if(activeCat){const cat=activeCat.textContent;if(!customExercises[cat])customExercises[cat]=[];if(!customExercises[cat].includes(custom))customExercises[cat].push(custom);}
    document.getElementById('create-custom-ex').value='';
    renderRoutineSelectionList();
}

function renderRoutineSelectionList() {
    const list=document.getElementById('routine-selection-list');if(!list)return;
    if(routineSelection.length===0){list.innerHTML='';return;}
    list.innerHTML=`<div style="background:var(--primary-light);border-radius:10px;padding:10px;"><div style="color:var(--primary);font-size:11px;font-weight:700;margin-bottom:6px;">SELECTED (${routineSelection.length})</div>${routineSelection.map((ex,i)=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid var(--border);"><span style="color:var(--text);font-size:13px;">${ex}</span><span onclick="removeFromSelection(${i})" style="color:var(--danger);cursor:pointer;font-size:16px;">✕</span></div>`).join('')}</div>`;
}

function removeFromSelection(index){routineSelection.splice(index,1);renderRoutineSelectionList();}

function saveRoutine() {
    const name=document.getElementById('routine-name').value.trim();
    if(!name){alert('Please name your routine');return;}
    if(routineSelection.length===0){alert('Please select at least one exercise');return;}
    savedRoutines.push({name,exercises:routineSelection,created:new Date().toLocaleDateString('en-GB')});
    routineSelection=[];
    saveToStorage();
    document.getElementById('routine-name').value='';
    document.getElementById('create-custom-ex').value='';
    renderRoutineSelectionList();
    showTrainSection('routines');renderRoutinesList();
}
function startRoutine(index) {
    const routine=savedRoutines[index];
    selectedMuscle=routine.name;
    firstSetLogged=false;
    if(routine.programmeData){
        exercises=routine.programmeData.map(ex=>({
            name:ex.name,
            sets:[{reps:'',weight:''}],
            targetReps:ex.reps,
            targetSets:ex.sets
        }));
    } else {
        exercises=routine.exercises.map(name=>({
            name:typeof name==='string'?name:name.name,
            sets:[{reps:'',weight:''}]
        }));
    }
    showTrainSection('active');
    showPreviousWorkoutSummary(routine.name);
    buildActiveExercisePicker();
    const timerBar=document.getElementById('workout-timer-bar');
    if(timerBar)timerBar.style.display='none';
    document.getElementById('save-btn').style.display='block';
    renderExercises();
}
function deleteRoutine(index){if(confirm('Delete this routine?')){savedRoutines.splice(index,1);saveToStorage();renderRoutinesList();}}

function addExercise() {
    const selected=[...document.querySelectorAll('#exercise-tags .tag.selected')].map(t=>t.textContent);
    const custom=document.getElementById('custom-exercise').value.trim();
    if(custom){
        selected.push(custom);
        if(!customExercises[selectedMuscle])customExercises[selectedMuscle]=[];
        if(!customExercises[selectedMuscle].includes(custom)){customExercises[selectedMuscle].push(custom);saveToStorage();renderActiveTags(selectedMuscle);}
    }
    if(selected.length===0)return;
    selected.forEach(name=>{if(!exercises.find(e=>e.name===name))exercises.push({name,sets:[{reps:'',weight:''}]});});
    document.getElementById('custom-exercise').value='';
    document.querySelectorAll('#exercise-tags .tag').forEach(t=>t.classList.remove('selected'));
    document.getElementById('save-btn').style.display='block';renderExercises();
}

function renderExercises() {
    const log=document.getElementById('exercise-log');if(!log)return;
    log.innerHTML='';
    exercises.forEach((ex,ei)=>{
        const block=document.createElement('div');block.className='exercise-block';
        const lastSession=workoutHistory.find(w=>w.exercises&&w.exercises.find(e=>e.name===ex.name));
        const lastEx=lastSession?lastSession.exercises.find(e=>e.name===ex.name):null;
        const pb=personalBests[ex.name];
        let suggestion='';
        if(lastEx&&lastEx.sets.length>0){
            const lastWeight=parseFloat(lastEx.sets[0].weight)||0;
            const suggested=lastWeight>0?(lastWeight+2.5).toFixed(1):'—';
            suggestion=`<div style="background:#F0FDF4;border:1px solid #86EFAC;border-radius:8px;padding:8px;margin-bottom:8px;"><div style="color:#16A34A;font-size:11px;font-weight:700;margin-bottom:2px;">${t('autoProgression')}</div><div style="color:#166534;font-size:12px;">${t('tryToday').replace('{x}',suggested).replace('{y}',lastWeight)}</div></div>`;
        }
        const lastPerf=lastEx?`<div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:8px;padding:8px;margin-bottom:10px;"><div style="color:#EA580C;font-size:11px;font-weight:700;margin-bottom:4px;">${t('lastSession')}</div>${lastEx.sets.map((s,i)=>`<div style="color:#9A3412;font-size:12px;">Set ${i+1}: ${s.reps} reps @ ${s.weight}kg</div>`).join('')}</div>`:`<div style="color:var(--text-muted);font-size:12px;margin-bottom:10px;">${t('noPrevData')}</div>`;
        const pbBadge=pb?`<span class="pr-badge">PB: ${pb.weight}kg×${pb.reps}</span>`:'';
        const targetInfo=ex.targetReps?`<div style="background:#F0FDF4;border-radius:6px;padding:4px 8px;margin-bottom:8px;color:#16A34A;font-size:12px;font-weight:600;">Target: ${ex.targetSets} sets × ${ex.targetReps} reps</div>`:'';
        let setsHTML=`<div class="set-headers"><div class="set-header">SET</div><div class="set-header">REPS</div><div class="set-header">KG</div><div class="set-header"></div></div>`;
        ex.sets.forEach((set,si)=>{
            const isWarmup=set.warmup||false;
            setsHTML+=`<div class="set-row" style="${isWarmup?'opacity:0.6;':''}">
                <div class="set-num" style="cursor:pointer;" onclick="toggleWarmup(${ei},${si})" title="Toggle warm up">${isWarmup?'🔥':''+( si+1)}</div>
                <input class="set-input" type="number" placeholder="Reps" value="${set.reps}" onchange="updateSet(${ei},${si},'reps',this.value)" style="${isWarmup?'border-color:#F59E0B;':''}">
                <input class="set-input" type="number" placeholder="KG" value="${set.weight}" onchange="updateSet(${ei},${si},'weight',this.value)" style="${isWarmup?'border-color:#F59E0B;':''}">
                <div class="remove-set" onclick="removeSet(${ei},${si})">✕</div>
            </div>
            ${isWarmup?'<div style="color:#F59E0B;font-size:10px;font-weight:700;margin-bottom:4px;margin-left:44px;">WARM UP — not counted</div>':''}`;
        });
        block.innerHTML=`<div class="exercise-name" style="justify-content:space-between;">
<span onclick="showExerciseHistory(${JSON.stringify(ex.name)})">${ex.name} ${pbBadge}</span>
<div style="display:flex;gap:6px;align-items:center;">
    ${ei>0?`<button type="button" onclick="moveExercise(${ei},-1)" style="background:var(--primary-light);color:var(--primary);border:none;border-radius:6px;padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer;">↑</button>`:''}
    ${ei<exercises.length-1?`<button type="button" onclick="moveExercise(${ei},1)" style="background:var(--primary-light);color:var(--primary);border:none;border-radius:6px;padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer;">↓</button>`:''}
    <button type="button" onclick="removeExercise(${ei})" style="background:#FEF2F2;color:var(--danger);border:none;border-radius:6px;padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer;">Remove</button>
</div></div>${targetInfo}${suggestion}${lastPerf}${setsHTML}<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
    <button class="btn-outline" onclick="addSet(${ei})" style="flex:1;margin-bottom:0;">+ Set</button>
    <button class="btn-small" onclick="startTimer(60,${ei})">60s</button>
    <button class="btn-small" onclick="startTimer(90,${ei})">90s</button>
</div>`;
        log.appendChild(block);
    });
}

function updateSet(ei,si,field,val) {
    exercises[ei].sets[si][field]=val;
    if(!firstSetLogged&&val&&parseFloat(val)>0){
        // Only start timer on working sets not warm ups
        if(!exercises[ei].sets[si].warmup){
            firstSetLogged=true;startWorkoutTimer();
            const timerBar=document.getElementById('workout-timer-bar');if(timerBar)timerBar.style.display='flex';
        }
    }
}

function addSet(ei){exercises[ei].sets.push({reps:'',weight:''});renderExercises();}
function removeSet(ei,si){if(exercises[ei].sets.length>1){exercises[ei].sets.splice(si,1);renderExercises();}}

function startTimer(seconds,ei){
    if(timerInterval)clearInterval(timerInterval);
    let remaining=seconds;
    document.getElementById('rest-timer').style.display='block';
    document.getElementById('rest-count').textContent=remaining;
    timerInterval=setInterval(()=>{remaining--;document.getElementById('rest-count').textContent=remaining;if(remaining<=0){clearInterval(timerInterval);document.getElementById('rest-timer').style.display='none';}},1000);
}

function stopTimer(){clearInterval(timerInterval);document.getElementById('rest-timer').style.display='none';}

function startWorkoutTimer() {
    workoutStartTime=Date.now();
    if(workoutTimerInterval)clearInterval(workoutTimerInterval);
    workoutTimerInterval=setInterval(()=>{
        const elapsed=Math.floor((Date.now()-workoutStartTime)/1000);
        const mins=Math.floor(elapsed/60).toString().padStart(2,'0');
        const secs=(elapsed%60).toString().padStart(2,'0');
        const el=document.getElementById('workout-timer');if(el)el.textContent=mins+':'+secs;
    },1000);
}

function showCompletionScreen(muscle,duration,exs){
    const pbs=exs.filter(ex=>ex.sets.some(s=>!s.warmup&&parseFloat(s.weight)>0&&personalBests[ex.name]&&parseFloat(s.weight)>=personalBests[ex.name].weight)).length;
    const modal=document.createElement('div');
    modal.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:var(--primary);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;text-align:center;';
    modal.innerHTML=`
        <div style="font-size:64px;margin-bottom:16px;">💪</div>
        <div style="color:#fff;font-size:28px;font-weight:800;margin-bottom:8px;">Session Complete!</div>
        <div style="color:rgba(255,255,255,0.8);font-size:16px;margin-bottom:24px;">${muscle}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:32px;width:100%;max-width:400px;">
            <div style="background:rgba(255,255,255,0.15);border-radius:12px;padding:16px;">
                <div style="color:#fff;font-size:24px;font-weight:800;">${duration||0}</div>
                <div style="color:rgba(255,255,255,0.7);font-size:11px;margin-top:4px;">MINS</div>
            </div>
            <div style="background:rgba(255,255,255,0.15);border-radius:12px;padding:16px;">
                <div style="color:#fff;font-size:24px;font-weight:800;">${exs.length}</div>
                <div style="color:rgba(255,255,255,0.7);font-size:11px;margin-top:4px;">EXERCISES</div>
            </div>
            <div style="background:rgba(255,255,255,0.15);border-radius:12px;padding:16px;">
                <div style="color:#FFD700;font-size:24px;font-weight:800;">${pbs}</div>
                <div style="color:rgba(255,255,255,0.7);font-size:11px;margin-top:4px;">PBs HIT</div>
            </div>
        </div>
        <button type="button" class="completion-btn-progress" style="background:#fff;color:var(--primary);border:none;border-radius:14px;padding:16px 32px;font-size:16px;font-weight:800;cursor:pointer;width:100%;max-width:400px;">View Progress</button>
        <button type="button" class="completion-btn-home" style="background:transparent;color:rgba(255,255,255,0.8);border:2px solid rgba(255,255,255,0.3);border-radius:14px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer;width:100%;max-width:400px;margin-top:10px;">Back to Home</button>
    `;
    modal.querySelector('.completion-btn-progress').onclick=()=>{modal.remove();showScreen('screen-progress');};
    modal.querySelector('.completion-btn-home').onclick=()=>{modal.remove();showScreen('screen-home');};
    document.body.appendChild(modal);
}

async function saveWorkout() {
    const date=new Date().toLocaleDateString('en-GB');
    const duration=workoutStartTime?Math.floor((Date.now()-workoutStartTime)/60000):0;
    clearInterval(workoutTimerInterval);
    const muscle=selectedMuscle;
    const exSnapshot=JSON.parse(JSON.stringify(exercises));
    exercises.forEach(ex=>{
        ex.sets.filter(s=>!s.warmup).forEach(set=>{
            const w=parseFloat(set.weight)||0;const r=parseInt(set.reps)||0;
            if(w>0&&r>0&&(!personalBests[ex.name]||w>personalBests[ex.name].weight))
                personalBests[ex.name]={weight:w,reps:r,date};
        });
    });
    workoutHistory.unshift({
        muscle:selectedMuscle,
        exercises:JSON.parse(JSON.stringify(exercises)),
        date,
        duration,
        durationDisplay:duration>0?duration+'min':'—'
    });
    exercises=[];selectedMuscle='';firstSetLogged=false;
    document.getElementById('exercise-log').innerHTML='';
    document.getElementById('save-btn').style.display='none';
    const timerBar=document.getElementById('workout-timer-bar');if(timerBar)timerBar.style.display='none';
    try{
        await saveToStorage();
        checkBadges();
        showCompletionScreen(muscle,duration,exSnapshot);
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('saveWorkout:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

function startCardio(type) {
    currentCardioType=type;
    document.getElementById('cardio-type-title').textContent=type.toUpperCase();
    showTrainSection('cardio-active');
    const startBtn=document.getElementById('cardio-start-btn');
    const timerBar=document.getElementById('cardio-timer-bar');
    if(startBtn)startBtn.style.display='block';
    if(timerBar)timerBar.style.display='none';
}

function startCardioTimer() {
    const startBtn=document.getElementById('cardio-start-btn');
    const timerBar=document.getElementById('cardio-timer-bar');
    if(startBtn)startBtn.style.display='none';
    if(timerBar)timerBar.style.display='flex';
    let cardioSecs=0;
    if(cardioTimerInterval)clearInterval(cardioTimerInterval);
    cardioTimerInterval=setInterval(()=>{
        cardioSecs++;
        const mins=Math.floor(cardioSecs/60).toString().padStart(2,'0');
        const secs=(cardioSecs%60).toString().padStart(2,'0');
        const el=document.getElementById('cardio-timer');if(el)el.textContent=mins+':'+secs;
    },1000);
}

function stopCardioTimer() {
    clearInterval(cardioTimerInterval);
    const timerBar=document.getElementById('cardio-timer-bar');
    if(timerBar)timerBar.style.display='none';
    const startBtn=document.getElementById('cardio-start-btn');
    if(startBtn)startBtn.style.display='block';
}

async function saveCardio() {
    clearInterval(cardioTimerInterval);
    const date=new Date().toLocaleDateString('en-GB');
    cardioHistory.unshift({type:currentCardioType,duration:document.getElementById('cardio-duration').value,distance:document.getElementById('cardio-distance').value,intensity:document.getElementById('cardio-intensity').value,notes:document.getElementById('cardio-notes').value,date});
    try{
        await saveToStorage();
        showScreen('screen-progress');
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('saveCardio:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

// ===================== NUTRITION =====================
function addMeal() {
    const today=new Date().toLocaleDateString('en-GB');
    const mealCount=meals.filter(m=>m.date===today).length;
    const presetName=mealPresets[mealCount]||'Meal '+(mealCount+1);
    const name=prompt(t('mealName'),presetName)||presetName;
    meals.push({name,date:today,foods:[]});
    saveToStorage();renderMeals();
}

function renderMeals() {
    const today=new Date().toLocaleDateString('en-GB');
    const todayMeals=meals.filter(m=>m.date===today);
    const container=document.getElementById('meals-container');if(!container)return;
    if(todayMeals.length===0){
        container.innerHTML=`<div style="text-align:center;padding:32px 16px;">
            <div style="font-size:48px;margin-bottom:12px;">🥗</div>
            <div style="color:var(--text);font-size:16px;font-weight:700;margin-bottom:8px;">No meals logged today</div>
            <div style="color:var(--text-muted);font-size:13px;margin-bottom:16px;">Start tracking your nutrition to hit your targets</div>
            <button class="btn" onclick="addMeal()">+ Add First Meal</button>
        </div>`;
        return;
    }
    container.innerHTML=todayMeals.map(meal=>{
        const mealIndex=meals.indexOf(meal);
        const totalCal=meal.foods.reduce((s,f)=>s+f.cal,0);
        const totalProt=meal.foods.reduce((s,f)=>s+f.protein,0).toFixed(1);
        const totalCarbs=meal.foods.reduce((s,f)=>s+f.carbs,0).toFixed(1);
        const totalFat=meal.foods.reduce((s,f)=>s+f.fat,0).toFixed(1);
        return `<div class="meal-block"><div class="meal-header"><div><div class="meal-name">${meal.name}</div><div class="meal-totals">${totalCal} kcal • P:${totalProt}g • C:${totalCarbs}g • F:${totalFat}g</div></div><div style="display:flex;gap:6px;">
    <button class="btn-small" onclick="openFoodModal(${mealIndex})">+ Add Food</button>
    <button class="btn-small" onclick="currentMealIndex=${mealIndex};saveMealTemplate()" style="background:#FEF3C7;color:#92400E;">📋 Save as Template</button>
</div></div>${meal.foods.map((f,fi)=>`<div class="food-entry"><div class="food-entry-info"><div class="food-entry-name">${f.name} (${f.portion}${f.isLiquid?'ml':'g'})</div><div class="food-entry-macros">P: ${f.protein}g • C: ${f.carbs}g • F: ${f.fat}g</div></div><div class="food-entry-cals">${f.cal} kcal</div><div class="food-entry-delete" onclick="deleteFoodFromMeal(${mealIndex},${fi})">✕</div></div>`).join('')}</div>`;
    }).join('');
}

function openFoodModal(mealIndex) {
    currentMealIndex=mealIndex;
    document.getElementById('food-modal').style.display='block';
    document.getElementById('food-modal-title').textContent='Add to '+meals[mealIndex].name;
    foodFilter='all';document.getElementById('food-search').value='';
    document.querySelectorAll('#food-filter-bar .filter-btn').forEach(b=>b.classList.remove('active'));
    const allBtn=document.getElementById('filter-all');if(allBtn)allBtn.classList.add('active');
    filterFoods();
    updateFoodModalTotals();
}

function updateFoodModalTotals() {
    const today=new Date().toLocaleDateString('en-GB');
    const todayMeals=meals.filter(m=>m.date===today);
    let totalCal=0,totalProtein=0,totalCarbs=0,totalFat=0;
    todayMeals.forEach(meal=>meal.foods.forEach(f=>{totalCal+=f.cal;totalProtein+=f.protein;totalCarbs+=f.carbs;totalFat+=f.fat;}));
    const el=document.getElementById('food-modal-totals');
    if(el)el.innerHTML=`Today so far: <strong>${totalCal} kcal</strong> • P: ${totalProtein.toFixed(0)}g • C: ${totalCarbs.toFixed(0)}g • F: ${totalFat.toFixed(0)}g`;
}

function closeFoodModal(){document.getElementById('food-modal').style.display='none';selectedFood=null;document.getElementById('food-portion').style.display='none';}

function setFoodFilter(filter,btn){foodFilter=filter;document.querySelectorAll('#food-filter-bar .filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');filterFoods();}

async function filterFoods() {
    const search=(document.getElementById('food-search').value||'').toLowerCase();
    const diet=settings.diet||'standard';
    const list=document.getElementById('food-list');if(!list)return;
    let foods=[];
    const categories=foodFilter==='all'?Object.keys(foodDB):[foodFilter];
    categories.forEach(cat=>{if(foodDB[cat])foodDB[cat].forEach(food=>{if((diet==='standard'||food.tags.includes(diet))&&food.name.toLowerCase().includes(search))foods.push({...food,category:cat});});});

    // Recent foods at top when no search
    let recentHTML='';
    if(!search){
        const todayNutrition=await PG.nutrition.getToday();
        const recent=todayNutrition?.recentFoods||[];
        if(recent.length>0){
            recentHTML=`<div style="margin-bottom:12px;">
                <div style="color:var(--text-muted);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Recent & Common</div>
                ${recent.slice(0,5).map(f=>`<div style="padding:10px 0;border-bottom:1px solid var(--border);cursor:pointer;" onclick='selectFood(${JSON.stringify(f).replace(/'/g,"&#39;")})'>
                    <div style="font-weight:600;color:var(--text);font-size:13px;">${f.name}</div>
                    <div style="margin-top:4px;"><span class="macro-pill">${f.cal} kcal</span><span class="macro-pill protein">P: ${f.protein}g</span><span class="macro-pill carbs">C: ${f.carbs}g</span><span class="macro-pill fat">F: ${f.fat}g</span></div>
                </div>`).join('')}
                <div style="color:var(--text-muted);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin:12px 0 8px;">All Foods</div>
            </div>`;
        }
    }

    list.innerHTML=recentHTML+( foods.map(f=>`<div style="padding:10px 0;border-bottom:1px solid var(--border);cursor:pointer;" onclick='selectFood(${JSON.stringify(f).replace(/'/g,"&#39;")})'>
        <div style="font-weight:600;color:var(--text);font-size:13px;">${f.name}</div>
        <div style="margin-top:4px;"><span class="macro-pill">${f.cal} kcal</span><span class="macro-pill protein">P: ${f.protein}g</span><span class="macro-pill carbs">C: ${f.carbs}g</span><span class="macro-pill fat">F: ${f.fat}g</span>${f.water?`<span class="macro-pill" style="background:#EFF6FF;color:#2563EB;">💧 +${f.water}L</span>`:''}</div>
    </div>`).join('')||`<p style="color:var(--text-muted);padding:12px 0;">${t('noFoodsFound')}</p>`);
}

function selectFood(food) {
    selectedFood=food;
    const isLiquid=food.category==='drinks';
    document.getElementById('food-portion').style.display='block';
    document.getElementById('food-portion-label').textContent=food.name;
    document.getElementById('lbl-portion').textContent=isLiquid?'Portion (ml)':'Portion (g)';
    document.getElementById('food-portion-amount').value=isLiquid?'250':'100';
    updatePortionPreview();
}

function updatePortionPreview() {
    if(!selectedFood)return;
    const portion=parseFloat(document.getElementById('food-portion-amount').value)||100;
    const ratio=portion/100;
    document.getElementById('food-portion-preview').textContent=`${Math.round(selectedFood.cal*ratio)} kcal • P: ${(selectedFood.protein*ratio).toFixed(1)}g • C: ${(selectedFood.carbs*ratio).toFixed(1)}g • F: ${(selectedFood.fat*ratio).toFixed(1)}g`;
}

async function addFoodEntry() {
    if(!selectedFood||currentMealIndex===null)return;
    try{
        const isLiquid=selectedFood.category==='drinks';
        const portion=parseFloat(document.getElementById('food-portion-amount').value)||(isLiquid?250:100);
        const ratio=portion/100;
        const entry={name:selectedFood.name,portion,isLiquid,
            cal:Math.round(selectedFood.cal*ratio),
            protein:Math.round(selectedFood.protein*ratio*10)/10,
            carbs:Math.round(selectedFood.carbs*ratio*10)/10,
            fat:Math.round(selectedFood.fat*ratio*10)/10,
            category:selectedFood.category
        };
        // Save to recent foods
        const todayNutrition=await PG.nutrition.getToday();
        const recent=todayNutrition?.recentFoods||[];
        const exists=recent.findIndex(f=>f.name===selectedFood.name);
        if(exists>-1)recent.splice(exists,1);
        recent.unshift({...selectedFood});
        await PG.nutrition.save({recentFoods:recent.slice(0,10)});
        if(selectedFood.water){
            const nd=await PG.nutrition.getToday()||{steps:0,water:0,restDay:false};
            const servingMl=Math.max(1,Math.round(selectedFood.water*1000));
            const addWater=selectedFood.water*(portion/servingMl);
            nd.water=Math.round(((parseFloat(nd.water)||0)+addWater)*100)/100;
            await PG.nutrition.save(nd);
        }
        meals[currentMealIndex].foods.push(entry);
        await saveToStorage();updateFoodModalTotals();closeFoodModal();renderMeals();loadNutrition();updateHome();
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('addFoodEntry:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

function deleteFoodFromMeal(mealIndex,foodIndex){meals[mealIndex].foods.splice(foodIndex,1);saveToStorage();renderMeals();loadNutrition();updateHome();if(document.getElementById('food-modal')?.style.display==='block')updateFoodModalTotals();}

async function saveStepsWater() {
    const today=new Date().toLocaleDateString('en-GB');
    let data=await PG.nutrition.getToday()||{steps:0,water:0};
    const steps=document.getElementById('input-steps-train').value;
    const water=document.getElementById('input-water').value;
    if(steps)data.steps=parseInt(steps);if(water)data.water=parseFloat(water);
    try{
        await PG.nutrition.save(data);
        loadNutrition();updateHome();
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('saveStepsWater:',err);
        showToast('Save failed — please try again','error',4000);
    }
}
async function saveWater() {
    const today=new Date().toLocaleDateString('en-GB');
    let data=await PG.nutrition.getToday()||{steps:0,water:0};
    const water=document.getElementById('input-water').value;
    if(water)data.water=parseFloat(water);
    try{
        await PG.nutrition.save(data);
        loadNutrition();
        updateHome();
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('saveWater:',err);
        showToast('Save failed — please try again','error',4000);
    }
}
async function loadNutrition() {
    const today=new Date().toLocaleDateString('en-GB');
    const calTarget=settings.calTarget||2000;const proteinTarget=settings.proteinTarget||150;const stepsTarget=settings.stepsTarget||8000;
    const remainingCaloriesForMacros=Math.max(calTarget-(proteinTarget*4),0);
    const carbsTarget=settings.carbsTarget||Math.max(Math.round((remainingCaloriesForMacros*0.5)/4),0);
    const fatTarget=settings.fatTarget||Math.max(Math.round((remainingCaloriesForMacros*0.5)/9),0);
    const calDateEl=document.getElementById('cal-date');if(calDateEl)calDateEl.textContent=today;
    const todayMeals=meals.filter(m=>m.date===today);
    let totalCal=0,totalProtein=0,totalCarbs=0,totalFat=0;
    todayMeals.forEach(meal=>meal.foods.forEach(f=>{totalCal+=f.cal;totalProtein+=f.protein;totalCarbs+=f.carbs;totalFat+=f.fat;}));
    const nd=await PG.nutrition.getToday()||{steps:0,water:0,restDay:false};
    const steps=parseInt(nd.steps)||0;
    const water=parseFloat(nd.water)||0;
    const setEl=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
    const setWidth=(id,pct)=>{const el=document.getElementById(id);if(el)el.style.width=pct+'%';};
    setEl('nut-show-calories',`${totalCal} / ${calTarget} kcal`);
    const remaining=calTarget-totalCal;
    const remainingEl=document.getElementById('cal-remaining');
    if(remainingEl){
        if(remaining>0){
            remainingEl.textContent=remaining+' kcal remaining';
            remainingEl.style.color='#10B981';
        } else {
            remainingEl.textContent=Math.abs(remaining)+' kcal over target';
            remainingEl.style.color='#EF4444';
        }
    }
    setEl('show-protein',`${totalProtein.toFixed(1)} / ${proteinTarget}g`);
    setEl('show-carbs',`${totalCarbs.toFixed(1)}g`);setEl('show-fat',`${totalFat.toFixed(1)}g`);
    setEl('show-steps',`${steps} / ${stepsTarget}`);setEl('show-water',`${water.toFixed(1)} / 2.5L`);
    setWidth('nut-bar-calories',Math.min((totalCal/calTarget)*100,100));
    setWidth('bar-protein',Math.min((totalProtein/proteinTarget)*100,100));
    setWidth('bar-carbs',Math.min((totalCarbs/Math.max(carbsTarget,1))*100,100));
    setWidth('bar-fat',Math.min((totalFat/Math.max(fatTarget,1))*100,100));
    setWidth('bar-steps',Math.min((steps/stepsTarget)*100,100));
    setWidth('bar-water',Math.min((water/2.5)*100,100));
    const hour=new Date().getHours();const expectedCals=Math.round((hour/24)*calTarget);
    const calStatus=document.getElementById('cal-status');
    if(calStatus){if(totalCal>=expectedCals){calStatus.textContent=t('onTrack');calStatus.style.color='#10B981';}else{calStatus.textContent=t('behindEat');calStatus.style.color='#F59E0B';}}
    await renderSupplements();
}

async function renderSupplements() {
    const today=new Date().toLocaleDateString('en-GB');
    const nutritionData=await PG.nutrition.getToday();
    const done=nutritionData?.['supplements_'+today]||[];
    const list=document.getElementById('supplement-list');if(!list)return;
    list.innerHTML=supplementsList.map((s,i)=>`<div class="supplement-item"><div class="supplement-name">${s}</div><div class="supplement-check ${done.includes(i)?'done':''}" onclick="toggleSupplement(${i})">${done.includes(i)?'✓':''}</div></div>`).join('');
}

async function toggleSupplement(index){const today=new Date().toLocaleDateString('en-GB');const nutritionData=await PG.nutrition.getToday();let done=nutritionData?.['supplements_'+today]||[];done.includes(index)?done.splice(done.indexOf(index),1):done.push(index);await PG.nutrition.save({['supplements_'+today]:done});renderSupplements();}

// ===================== HOME =====================
async function updateHome() {
    const s=settings;const calTarget=s.calTarget||2000;const proteinTarget=s.proteinTarget||150;const stepsTarget=s.stepsTarget||8000;
    const remainingCaloriesForMacros=Math.max(calTarget-(proteinTarget*4),0);
    const carbsTarget=s.carbsTarget||Math.max(Math.round((remainingCaloriesForMacros*0.5)/4),0);
    const fatTarget=s.fatTarget||Math.max(Math.round((remainingCaloriesForMacros*0.5)/9),0);
    if(s.name)document.getElementById('header-greeting').textContent='Hi '+s.name+' 👋';
    if(s.phaseName){
        const setEl=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
        setEl('home-phase-name',s.phaseName);
        if(s.phaseStartDate){
            const parts=s.phaseStartDate.split('/');const start=new Date(parts[2],parts[1]-1,parts[0]);
            const daysDiff=Math.max(0,Math.floor((Date.now()-start)/86400000));
            setEl('home-days-training',daysDiff+' days');
            const totalDays=s.phaseDuration||56;const pct=Math.min(Math.round((daysDiff/totalDays)*100),100);
            const bar=document.getElementById('home-prog-bar');if(bar)bar.style.width=pct+'%';
            const pctEl=document.getElementById('home-prog-pct');if(pctEl)pctEl.textContent=pct+'% complete';
            const recordEl=document.getElementById('streak-record');
if(recordEl){const progressEntries=await PG.progress.getAll();recordEl.textContent=(progressEntries?.[0]?.streakRecord||'0')+'/7';}
}
}
    const quoteEl=document.getElementById('daily-quote');
    if(quoteEl)quoteEl.textContent='"'+getDailyQuote()+'"';
    const currentW=Number(s.weight);
    if(Number.isFinite(currentW)&&currentW>0){
        const setEl=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
        const tw=Number(s.targetWeight);
        const hasTarget=Number.isFinite(tw)&&tw>0;
        setEl('home-current-weight',currentW+'kg');
        setEl('home-target-weight',hasTarget?tw+'kg':'—');
        const diff=Math.abs(currentW-(hasTarget?tw:currentW)).toFixed(1);
        setEl('home-weight-change',diff+'kg to go');
    }
    const today=new Date().toLocaleDateString('en-GB');
    const todayMeals=meals.filter(m=>m.date===today);
    let cals=0,protein=0,steps=0,water=0;
    let carbs=0,fats=0;
    todayMeals.forEach(meal=>meal.foods.forEach(f=>{cals+=f.cal;protein+=f.protein;carbs+=f.carbs;fats+=f.fat;}));
    const nd=await PG.nutrition.getToday()||{};
    steps=parseInt(nd.steps)||0;water=parseFloat(nd.water)||0;
    const setEl=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
    const setWidth=(id,pct)=>{const el=document.getElementById(id);if(el)el.style.width=pct+'%';};
    setEl('home-show-calories',`${cals} / ${calTarget} kcal`);setEl('home-protein',`${protein.toFixed(1)} / ${proteinTarget}g`);
    setEl('home-carbs',`${carbs.toFixed(1)}g`);
    setEl('home-fats',`${fats.toFixed(1)}g`);
    setEl('home-steps',`${steps} / ${stepsTarget}`);setEl('home-water',`${water.toFixed(1)} / 2.5L`);
    setWidth('home-bar-calories',Math.min((cals/calTarget)*100,100));
    setWidth('home-bar-protein',Math.min((protein/proteinTarget)*100,100));
    setWidth('home-bar-carbs',Math.min((carbs/Math.max(carbsTarget,1))*100,100));
    setWidth('home-bar-fat',Math.min((fats/Math.max(fatTarget,1))*100,100));
    setWidth('home-bar-steps',Math.min((steps/stepsTarget)*100,100));
    setWidth('home-bar-water',Math.min((water/2.5)*100,100));
    const todayWorkout=workoutHistory.find(w=>w.date===today)||cardioHistory.find(w=>w.date===today);
    const score=Math.round(Math.min((cals/calTarget)*25,25)+Math.min((protein/proteinTarget)*25,25)+Math.min((steps/stepsTarget)*25,25)+(todayWorkout?25:0));
    const scoreEl=document.getElementById('today-score');if(scoreEl)scoreEl.textContent=score;
    const streakBar=document.getElementById('streak-bar');
    if(streakBar){
        const days=['M','T','W','T','F','S','S'];const now=new Date();const dow=now.getDay();let streakCount=0;
        streakBar.innerHTML='';
        for(let i=0;i<7;i++){
            const d=document.createElement('div');d.className='streak-day';
            const dayDate=new Date(now);dayDate.setDate(now.getDate()-((dow+6-i)%7));
            const dateStr=dayDate.toLocaleDateString('en-GB');
            const nd=await PG.nutrition.getToday()||{};
            const calTarget=settings.calTarget||2000;
            const proteinTarget=settings.proteinTarget||150;
            const stepsTarget=settings.stepsTarget||8000;
            const todayMealsForDate=meals.filter(m=>m.date===dateStr);
            let dayCals=0,dayProtein=0;
            todayMealsForDate.forEach(meal=>meal.foods.forEach(f=>{dayCals+=f.cal;dayProtein+=f.protein;}));
            const daySteps=parseInt(nd.steps)||0;
            const dayWater=parseFloat(nd.water)||0;
            const hasWorkout=workoutHistory.find(w=>w.date===dateStr)||cardioHistory.find(w=>w.date===dateStr);
            const isRestDay=nd.restDay||false;
            let score=0;
            if(hasWorkout||isRestDay) score++;
            if(dayCals>=calTarget*0.9) score++;
            if(dayProtein>=proteinTarget*0.9) score++;
            if(daySteps>=stepsTarget) score++;
            if(dayWater>=2) score++;
            const accomplished=score>=3;
            if(accomplished){d.classList.add('done');streakCount++;}
if(isRestDay){
    d.textContent='😴';
    d.style.fontSize='14px';
    if(!accomplished)d.style.opacity='0.6';
} else {
    d.textContent=days[i];
}
if(i===(dow===0?6:dow-1))d.classList.add('today');
streakBar.appendChild(d);
        }
        const scEl=document.getElementById('streak-count');if(scEl)scEl.textContent=streakCount+'/7';
    }
    const prompts=[];
    const hourNow=new Date().getHours();
    if(!todayWorkout&&!nd.restDay)prompts.push({text:t('coachNoTrain'),type:''});
    if(nd.restDay)prompts.push({text:'😴 Rest day — focus on nutrition and steps today',type:''});
    if(protein<proteinTarget)prompts.push({text:t('coachProtein').replace('{x}',Math.round(proteinTarget-protein)),type:''});
    if(cals<calTarget*0.5&&hourNow>14)prompts.push({text:t('coachCalories').replace('{x}',cals),type:''});
    if(steps<stepsTarget)prompts.push({text:t('coachSteps').replace('{x}',stepsTarget-steps),type:''});
    if(water<2)prompts.push({text:t('coachWater').replace('{x}',water.toFixed(1)),type:''});
    if(prompts.length===0)prompts.push({text:t('coachPerfect'),type:'success'});
    const coachEl=document.getElementById('coach-prompts');
    if(coachEl)coachEl.innerHTML=prompts.map(p=>`<div class="coach-prompt ${p.type}">${p.text}</div>`).join('');
    renderBadges();
    const nextWorkout=getNextWorkoutSuggestion();
const nextEl=document.getElementById('next-workout-suggestion');
const nextText=document.getElementById('next-workout-text');
if(nextEl&&nextText&&nextWorkout){
    nextEl.style.display='block';
    nextText.textContent=nextWorkout+' Day — based on your last session';
}
}

function getNextWorkoutSuggestion() {
    if(Array.isArray(workoutHistory)&&workoutHistory.length>0){
        const lastWorkout=workoutHistory.find(w=>w&&w.type!=='rest');
        if(lastWorkout&&lastWorkout.muscle){
            return 'Next: '+lastWorkout.muscle;
        }
    }
    return 'Upper Body';
}

// ===================== PROGRESS =====================
async function updateProgress() {
    const s=settings;
    if(s.phaseName){
        const setEl=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
        setEl('prog-phase-name',s.phaseName);
        setEl('prog-weight-to-go',Math.abs((s.weight||0)-(s.targetWeight||0)).toFixed(1)+'kg');
        if(s.phaseStartDate){
            const parts=s.phaseStartDate.split('/');const start=new Date(parts[2],parts[1]-1,parts[0]);
            const daysDiff=Math.max(0,Math.floor((Date.now()-start)/86400000));
            setEl('prog-days-training',daysDiff+' days');
            const totalDays=s.phaseDuration||56;const pct=Math.min(Math.round((daysDiff/totalDays)*100),100);
            const bar=document.getElementById('prog-bar');if(bar)bar.style.width=pct+'%';
            const pctEl=document.getElementById('prog-pct');if(pctEl)pctEl.textContent=pct+'% complete';
        }
    }
    if(phaseHistory.length>0){
        const histCard=document.getElementById('phase-history-card');if(histCard)histCard.style.display='block';
        const histList=document.getElementById('phase-history-list');
        if(histList)histList.innerHTML=phaseHistory.map(p=>`<div class="phase-history-item"><div style="font-weight:700;color:var(--text);">${p.name}</div><div style="color:var(--text-muted);font-size:12px;margin-top:4px;">${p.startDate} → ${p.days} days</div><div style="color:var(--primary);font-size:13px;font-weight:600;margin-top:4px;">${p.result}</div></div>`).join('');
    }
    const setEl=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
    setEl('workouts-count',workoutHistory.length);setEl('cardio-count',cardioHistory.length);
    let daysHit=0;
    const todayNutrition=await PG.nutrition.getToday();
    for(let i=0;i<30;i++){const d=new Date();d.setDate(d.getDate()-i);if(todayNutrition||meals.some(m=>m.date===d.toLocaleDateString('en-GB')&&m.foods.length>0))daysHit++;}
    setEl('consistency-score',daysHit+'/30 days');
    const pbs=Object.entries(personalBests);
    const pbList=document.getElementById('pb-list');
    if(pbList)pbList.innerHTML=pbs.length===0?`<p style="color:var(--text-muted);">${t('noPBs')}</p>`:pbs.map(([name,pb])=>`<div class="pb-item"><div><div class="pb-exercise">${name}</div><div style="color:var(--text-muted);font-size:11px;">${pb.date}</div></div><div class="pb-value">${pb.weight}kg × ${pb.reps}</div></div>`).join('');
    const chkHistory=document.getElementById('checkin-history');
    if(chkHistory&&checkinHistory.length>0)chkHistory.innerHTML='<div style="margin-top:16px;">'+checkinHistory.map(c=>`<div class="checkin-item"><div class="checkin-date">${c.date}</div><div class="checkin-detail">Weight: ${c.weight}kg • Energy: ${c.energy}/10</div><div class="checkin-detail">${c.notes}</div></div>`).join('')+'</div>';
    if(measurements.chest){
        const setVal=(id,val)=>{const el=document.getElementById(id);if(el&&val)el.value=val;};
        setVal('meas-chest',measurements.chest);setVal('meas-waist',measurements.waist);
        setVal('meas-hips',measurements.hips);setVal('meas-arms',measurements.arms);setVal('meas-legs',measurements.legs);
    }
    renderHistory();
    renderWeightChart();
}

async function completePhase() {
    if(!settings.phaseName)return;
    const result=prompt('How did this phase go?')||'Phase completed';
    const parts=(settings.phaseStartDate||'').split('/');
    const start=new Date(parts[2],parts[1]-1,parts[0]);
    const days=Math.floor((Date.now()-start)/86400000);
    phaseHistory.unshift({name:settings.phaseName,startDate:settings.phaseStartDate,days,result});
    const newName=prompt('Name your next phase:','Phase '+(phaseHistory.length+1))||'New Phase';
    const dur=parseInt(prompt('Duration in days (e.g. 56 for 8 weeks):','56'))||56;
    settings.phaseName=newName;settings.phaseStartDate=new Date().toLocaleDateString('en-GB');settings.phaseDuration=dur;
    await PG.profile.save(settings);
    saveToStorage();updateProgress();updateHome();
}

async function saveCheckin() {
    try{
        const entry={date:new Date().toLocaleDateString('en-GB'),weight:document.getElementById('checkin-weight').value,energy:document.getElementById('checkin-energy').value,notes:document.getElementById('checkin-notes').value};
        if(entry.weight){settings.weight=parseFloat(entry.weight);await PG.profile.save(settings);}
        checkinHistory.unshift(entry);await saveToStorage();
        document.getElementById('checkin-weight').value='';document.getElementById('checkin-energy').value='';document.getElementById('checkin-notes').value='';
        updateProgress();
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('saveCheckin:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

async function saveMeasurements() {
    try{
        measurements={date:new Date().toLocaleDateString('en-GB'),chest:document.getElementById('meas-chest').value,waist:document.getElementById('meas-waist').value,hips:document.getElementById('meas-hips').value,arms:document.getElementById('meas-arms').value,legs:document.getElementById('meas-legs').value};
        await PG.progress.save(measurements);
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('saveMeasurements:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

async function renderHistory() {
    const list=document.getElementById('history-list');if(!list)return;
    const all=[
        ...workoutHistory.map(w=>({...w,type:w.type||'workout'})),
        ...cardioHistory.map(c=>({...c,type:'cardio'}))
    ];
    all.sort((a,b)=>new Date(b.date.split('/').reverse().join('-'))-new Date(a.date.split('/').reverse().join('-')));
    if(all.length===0){
        list.innerHTML=`<div style="text-align:center;padding:32px 16px;">
            <div style="font-size:48px;margin-bottom:12px;">💪</div>
            <div style="color:var(--text);font-size:16px;font-weight:700;margin-bottom:8px;">No sessions yet</div>
            <div style="color:var(--text-muted);font-size:13px;margin-bottom:16px;">Log your first workout to start tracking your progress</div>
            <button class="btn" onclick="showScreen('screen-train')">Start Training</button>
        </div>`;
        return;
    }
    const nutritionData=await PG.nutrition.getToday();
    list.innerHTML=all.map(w=>{
        const nd=nutritionData||{};
        const daySteps=parseInt(nd.steps)||0;
        if(w.type==='rest'){
            return `<div style="border-bottom:1px solid var(--border);padding:12px 0;">
                <div style="color:#0F4C81;font-weight:700;font-size:13px;">😴 Rest Day — ${w.date}</div>
                <div style="color:var(--text-muted);font-size:12px;margin-top:2px;">${daySteps>0?daySteps.toLocaleString()+' steps':'No steps logged'}</div>
            </div>`;
        }
        if(w.type==='cardio'){
            return `<div style="border-bottom:1px solid var(--border);padding:12px 0;">
                <div style="color:#10B981;font-weight:700;font-size:13px;">🏃 ${w.type} — ${w.date}${w.duration?' • '+w.duration+' mins':''}</div>
                <div style="color:var(--text-muted);font-size:12px;margin-top:2px;">${w.distance?w.distance+'km • ':''}${w.intensity||''}${daySteps>0?' • '+daySteps.toLocaleString()+' steps':''}</div>
            </div>`;
        }
        return `<div style="border-bottom:1px solid var(--border);padding:12px 0;">
            <div style="color:var(--primary);font-weight:700;font-size:13px;">💪 ${w.muscle} — ${w.date}${w.duration&&w.duration>0?' • '+w.duration+' mins':''}</div>
            ${w.exercises?w.exercises.map(e=>`<div style="color:var(--text-muted);font-size:12px;margin-top:2px;">${e.name} — ${e.sets.length} sets</div>`).join(''):''}
            ${daySteps>0?`<div style="color:var(--text-muted);font-size:12px;margin-top:2px;">${daySteps.toLocaleString()} steps</div>`:''}
        </div>`;
    }).join('');
}


// ===================== SETTINGS =====================
async function saveSettings() {
    try{
    const nameValue=document.getElementById('set-name').value;
    const age=parseInt(document.getElementById('set-age').value);
    const weight=parseFloat(document.getElementById('set-weight').value);
    const height=parseFloat(document.getElementById('set-height').value);
    const gender=document.getElementById('set-gender').value;
    const activity=parseFloat(document.getElementById('set-activity').value);
    const goal=document.getElementById('set-goal').value;
    const phaseDuration=parseInt(document.getElementById('set-phase-duration').value)||56;
    let bmr=gender==='male'?10*weight+6.25*height-5*age+5:10*weight+6.25*height-5*age-161;
    const tdee=Math.round(bmr*activity);
    const calTarget=goal==='fatloss'?tdee-500:goal==='muscle'?tdee+300:tdee;
    const proteinTarget=Math.round(weight*(goal==='muscle'?2.4:2.0));
    const darkMode=document.body.classList.contains('dark')?'dark':'light';
    settings={...settings,name:nameValue,age,weight,height,gender,activity,goal,
        environment:document.getElementById('set-environment').value,diet:document.getElementById('set-diet').value,
        units:document.getElementById('set-units').value,language:document.getElementById('set-language').value,
        targetWeight:parseFloat(document.getElementById('set-target-weight').value),
        phaseName:document.getElementById('set-phase-name').value||settings.phaseName,
        phaseDuration,trainingDays:parseInt(document.getElementById('set-training-days').value),
        tdee,calTarget,proteinTarget,stepsTarget:8000,darkMode};
    selectedLang=settings.language;
    const saveResult=await PG.profile.save({
        name:nameValue,
        goal:settings.goal,
        age:settings.age,
        gender:settings.gender,
        height:settings.height,
        weight:settings.weight,
        targetWeight:settings.targetWeight,
        activity:settings.activity,
        units:settings.units,
        language:settings.language,
        darkMode:settings.darkMode,
        environment:settings.environment,
        diet:settings.diet,
        phaseName:settings.phaseName,
        phaseDuration:settings.phaseDuration,
        trainingDays:settings.trainingDays,
        tdee:settings.tdee,
        calTarget:settings.calTarget,
        proteinTarget:settings.proteinTarget,
        stepsTarget:settings.stepsTarget
    });
    if(saveResult?.ok===false){
        showToast('Save failed — please try again','error',4000);
        return;
    }
    const tdeeEl=document.getElementById('tdee-result');if(tdeeEl)tdeeEl.style.display='block';
    const setEl=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
    setEl('tdee-value',tdee+' kcal');setEl('cal-target-value',calTarget+' kcal');setEl('protein-target-value',proteinTarget+'g');
    applyTranslations();updateHome();showToast('Saved!','success',2000);
    }catch(err){
        console.error('saveSettings:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

function loadSettings() {
    if(!settings.name&&!settings.calTarget)return;
    const setVal=(id,val)=>{const el=document.getElementById(id);if(el&&val!==undefined)el.value=val;};
    setVal('set-name',settings.name);setVal('set-age',settings.age);setVal('set-gender',settings.gender);
    setVal('set-height',settings.height);setVal('set-weight',settings.weight);setVal('set-target-weight',settings.targetWeight);
    setVal('set-activity',settings.activity);setVal('set-goal',settings.goal);setVal('set-environment',settings.environment);
    setVal('set-diet',settings.diet);setVal('set-units',settings.units);setVal('set-language',settings.language);
    setVal('set-phase-name',settings.phaseName);setVal('set-phase-duration',settings.phaseDuration||56);
    setVal('set-training-days',settings.trainingDays);
    if(settings.tdee){
        const tdeeEl=document.getElementById('tdee-result');if(tdeeEl)tdeeEl.style.display='block';
        const setEl=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
        setEl('tdee-value',settings.tdee+' kcal');setEl('cal-target-value',settings.calTarget+' kcal');setEl('protein-target-value',settings.proteinTarget+'g');
    }
}

function calculatePlates() {
    const target=parseFloat(document.getElementById('plates-weight').value);
    const bar=parseFloat(document.getElementById('plates-bar').value);
    const result=document.getElementById('plates-result');if(!result)return;
    if(!target||target<=bar){result.style.display='block';result.textContent='Weight must be greater than bar weight';return;}
    const remaining=(target-bar)/2;const plates=[25,20,15,10,5,2.5,1.25];let left=remaining;const parts=[];
    plates.forEach(p=>{const count=Math.floor(left/p);if(count>0){parts.push(`${count}×${p}kg`);left=Math.round((left-count*p)*100)/100;}});
    result.style.display='block';
    result.textContent=parts.length>0?t('eachSide')+': '+parts.join(' + '):t('barOnly');
}

// ===================== BADGES =====================
const badgeDefinitions=[
    {id:'first_workout',nameKey:'badge_first_workout',icon:'🎉',check:()=>workoutHistory.length>=1},
    {id:'five_workouts',nameKey:'badge_five_workouts',icon:'💪',check:()=>workoutHistory.length>=5},
    {id:'ten_workouts',nameKey:'badge_ten_workouts',icon:'🔥',check:()=>workoutHistory.length>=10},
    {id:'first_pb',nameKey:'badge_first_pb',icon:'🏆',check:()=>Object.keys(personalBests).length>=1},
    {id:'first_cardio',nameKey:'badge_first_cardio',icon:'🏃',check:()=>cardioHistory.length>=1},
    {id:'week_streak',nameKey:'badge_week_streak',icon:'⚡',check:async ()=>{let s=0;const todayNutrition=await PG.nutrition.getToday();for(let i=0;i<7;i++){const d=new Date();d.setDate(d.getDate()-i);if(todayNutrition||workoutHistory.find(w=>w.date===d.toLocaleDateString('en-GB')))s++;}return s>=7;}}
];

async function checkBadges(){const profile=await PG.profile.get();const earned=profile?.badges||[];for(const b of badgeDefinitions){const unlocked=await b.check();if(!earned.includes(b.id)&&unlocked)earned.push(b.id);}await PG.profile.save({badges:earned});}
async function renderBadges(){const profile=await PG.profile.get();const earned=profile?.badges||[];const el=document.getElementById('badges-display');if(el)el.innerHTML=badgeDefinitions.map(b=>`<span class="badge ${earned.includes(b.id)?'earned':''}">${b.icon} ${t(b.nameKey)}</span>`).join('');}

function showPreviousWorkoutSummary(category) {
    const last=workoutHistory.find(w=>w.muscle===category);
    const el=document.getElementById('previous-workout-summary');
    if(!el)return;
    if(!last){el.style.display='none';return;}
    const topLift=last.exercises&&last.exercises.length>0?last.exercises[0]:null;
    el.style.display='block';
    el.innerHTML=`<div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:10px;padding:12px;margin-bottom:12px;">
        <div style="color:#EA580C;font-size:11px;font-weight:700;margin-bottom:4px;">LAST ${category.toUpperCase()} SESSION</div>
        <div style="color:var(--text);font-size:13px;">${last.date} • ${last.duration||0} mins</div>
        ${topLift?`<div style="color:var(--text-muted);font-size:12px;margin-top:4px;">${topLift.name} — ${topLift.sets.length} sets</div>`:''}
    </div>`;
}

const quotes = [
    "The only bad workout is the one that didn't happen.",
    "Push yourself because no one else is going to do it for you.",
    "Your body can stand almost anything. It's your mind you have to convince.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Don't stop when you're tired. Stop when you're done.",
    "Success starts with self discipline.",
    "It never gets easier. You just get stronger.",
    "Train insane or remain the same.",
    "Champions aren't made in gyms. They're made from what they have inside.",
    "God is great. Work is the prayer.",
];

function getDailyQuote() {
    const day = Math.floor(Date.now() / 86400000);
    return quotes[day % quotes.length];
}

function removeExercise(ei){
    if(confirm('Remove this exercise?')){
        exercises.splice(ei,1);
        renderExercises();
    }
}

function moveExercise(ei,direction){
    const newIndex=ei+direction;
    if(newIndex<0||newIndex>=exercises.length)return;
    const temp=exercises[ei];
    exercises[ei]=exercises[newIndex];
    exercises[newIndex]=temp;
    renderExercises();
}

function showExerciseHistory(exerciseName){
    const rows=[];
    workoutHistory.forEach(w=>{
        if(!w.exercises)return;
        const found=w.exercises.find(e=>e.name===exerciseName);
        if(!found)return;
        const working=found.sets.filter(s=>!s.warmup);
        const summary=working.map((s,i)=>'Set '+(i+1)+': '+s.reps+' @ '+s.weight+'kg').join(' · ');
        rows.push(w.date+(w.muscle?' ('+w.muscle+')':'')+': '+summary);
    });
    if(rows.length===0){alert('No logged history for '+exerciseName+'.');return;}
    alert(rows.slice(0,20).join('\n'));
}

// ===================== STORAGE =====================
function getRowTimestamp(row){
    if(!row||typeof row!=='object') return 0;
    const raw=row.updated_at||row.created_at||row.logged_at||row.date;
    if(!raw) return 0;
    const ts=Date.parse(raw);
    return Number.isFinite(ts)?ts:0;
}

function pickLatestRow(rows){
    if(!Array.isArray(rows)||rows.length===0) return {};
    return [...rows].sort((a,b)=>getRowTimestamp(b)-getRowTimestamp(a))[0]||{};
}

function normalizeHistoryRows(rows,snapshotKey){
    if(!Array.isArray(rows)||rows.length===0) return [];
    const latestSnapshot=pickLatestRow(rows.filter(r=>Array.isArray(r?.[snapshotKey])));
    if(Array.isArray(latestSnapshot?.[snapshotKey])) return latestSnapshot[snapshotKey];
    return rows.map(r=>({
        ...r,
        id:undefined,
        user_id:undefined,
        created_at:undefined,
        updated_at:undefined
    })).map(({id,user_id,created_at,updated_at,...rest})=>rest);
}

function normalizeProgressRows(rows){
    const normalized={checkinHistory:[],personalBests:{},meals:[],phaseHistory:[],measurements:{},streakRecord:0};
    if(!Array.isArray(rows)||rows.length===0) return normalized;
    const sorted=[...rows].sort((a,b)=>getRowTimestamp(b)-getRowTimestamp(a));
    const latest=sorted[0]||{};
    if(Array.isArray(latest.checkinHistory)) normalized.checkinHistory=latest.checkinHistory;
    if(latest.personalBests&&typeof latest.personalBests==='object') normalized.personalBests=latest.personalBests;
    if(Array.isArray(latest.meals)) normalized.meals=latest.meals;
    if(Array.isArray(latest.phaseHistory)) normalized.phaseHistory=latest.phaseHistory;
    if(typeof latest.streakRecord==='number') normalized.streakRecord=latest.streakRecord;
    const measurementSnapshot=sorted.find(r=>r&&typeof r==='object'&&(r.measurements||r.chest||r.waist||r.hips||r.arms||r.legs));
    if(measurementSnapshot?.measurements&&typeof measurementSnapshot.measurements==='object'){
        normalized.measurements=measurementSnapshot.measurements;
    } else if(measurementSnapshot){
        normalized.measurements={
            date:measurementSnapshot.date||'',
            chest:measurementSnapshot.chest||'',
            waist:measurementSnapshot.waist||'',
            hips:measurementSnapshot.hips||'',
            arms:measurementSnapshot.arms||'',
            legs:measurementSnapshot.legs||''
        };
    }
    return normalized;
}

function normalizeRoutinesRows(rows){
    const normalized={savedRoutines:[],customExercises:{},mealTemplates:[],unlockedCodes:[]};
    if(!Array.isArray(rows)||rows.length===0) return normalized;
    const sorted=[...rows].sort((a,b)=>getRowTimestamp(b)-getRowTimestamp(a));
    const latestSnapshot=pickLatestRow(sorted.filter(r=>Array.isArray(r?.savedRoutines)));
    if(Array.isArray(latestSnapshot.savedRoutines)){
        normalized.savedRoutines=latestSnapshot.savedRoutines;
        normalized.customExercises=latestSnapshot.customExercises&&typeof latestSnapshot.customExercises==='object'
            ? latestSnapshot.customExercises
            : {};
    } else {
        normalized.savedRoutines=sorted
            .filter(r=>r&&typeof r==='object'&&typeof r.name==='string'&&Array.isArray(r.exercises))
            .map(r=>({name:r.name,exercises:r.exercises,created:r.created,programmeData:r.programmeData,locked:r.locked}));
    }
    const latestTemplates=pickLatestRow(sorted.filter(r=>Array.isArray(r?.mealTemplates)));
    if(Array.isArray(latestTemplates.mealTemplates)) normalized.mealTemplates=latestTemplates.mealTemplates;
    const latestUnlocked=pickLatestRow(sorted.filter(r=>Array.isArray(r?.unlockedCodes)));
    if(Array.isArray(latestUnlocked.unlockedCodes)) normalized.unlockedCodes=latestUnlocked.unlockedCodes;
    return normalized;
}

async function saveToStorage() {
    await PG.workouts.save({history:workoutHistory});
    await PG.cardio.save({history:cardioHistory});
    await PG.progress.save({checkinHistory,personalBests,meals,phaseHistory});
    await PG.routines.save({savedRoutines,customExercises});
}

async function loadFromStorage() {
    const profile=await PG.profile.get()||{};
    const theme=profile.darkMode||profile.theme;
    if(theme==='dark'){document.body.classList.add('dark');const t=document.getElementById('dark-toggle');if(t)t.classList.add('on');}
    const workouts=await PG.workouts.getAll();
    const cardio=await PG.cardio.getAll();
    const routinesData=await PG.routines.getAll();
    const progressData=await PG.progress.getAll();
    workoutHistory=normalizeHistoryRows(workouts,'history');
    cardioHistory=normalizeHistoryRows(cardio,'history');
    const normalizedProgress=normalizeProgressRows(progressData);
    checkinHistory=normalizedProgress.checkinHistory;
    personalBests=normalizedProgress.personalBests;
    meals=normalizedProgress.meals;
    phaseHistory=normalizedProgress.phaseHistory;
    measurements=normalizedProgress.measurements;
    const normalizedRoutines=normalizeRoutinesRows(routinesData);
    savedRoutines=normalizedRoutines.savedRoutines;
    customExercises=normalizedRoutines.customExercises;
    settings=profile;
    selectedLang=settings.language||'en';
    if(profile.onboarded)document.getElementById('onboarding').style.display='none';
    applyTranslations();checkBadges();updateHome();
}
// ===================== PROGRAMME TEMPLATES =====================
const programmeTemplates = {
    PGBEGIN: {
        name: "Beginner's Guide to the Gym",
        code: 'PGBEGIN',
        routines: [
            {
                name: "Beginner — Push Day",
                exercises: [
                    {name:'Dumbbell Bench Press', sets:3, reps:'10-12'},
                    {name:'Incline Dumbbell Bench Press', sets:3, reps:'10-12'},
                    {name:'Dumbbell Shoulder Press', sets:3, reps:'10-12'},
                    {name:'Dumbbell Lateral Raise', sets:3, reps:'12-15'},
                    {name:'Cable Tricep Pushdown', sets:3, reps:'10-12'}
                ]
            },
            {
                name: "Beginner — Pull Day",
                exercises: [
                    {name:'Lat Pulldown', sets:3, reps:'10-12'},
                    {name:'Seated Cable Row', sets:3, reps:'10-12'},
                    {name:'Face Pull', sets:3, reps:'12-15'},
                    {name:'Dumbbell Bicep Curl', sets:3, reps:'10-12'},
                    {name:'Dumbbell Hammer Curl', sets:3, reps:'10-12'}
                ]
            },
            {
                name: "Beginner — Legs Day",
                exercises: [
                    {name:'Squat or Leg Press', sets:3, reps:'10-12'},
                    {name:'Romanian Deadlift', sets:3, reps:'10-12'},
                    {name:'Walking Lunges', sets:3, reps:'10-12'},
                    {name:'Hamstring Curl', sets:3, reps:'10-12'},
                    {name:'Standing Calf Raise', sets:3, reps:'12-15'},
                    {name:'Glute Bridge', sets:3, reps:'10-12'}
                ]
            },
            {
                name: "Beginner — Core Day",
                exercises: [
                    {name:'Crunches or Sit Ups', sets:3, reps:'15-20'},
                    {name:'Plank', sets:3, reps:'45-60 seconds'},
                    {name:'Cable Crunch', sets:3, reps:'15-20'},
                    {name:'Farmer Carry', sets:3, reps:'30-40 seconds'}
                ]
            }
        ]
    },
    PGFATLOSS: {
        name: "Fat Loss Programme",
        code: 'PGFATLOSS',
        routines: [
            {
                name: "Fat Loss — Push Day",
                gym: [
                    {name:'Dumbbell Bench Press', sets:3, reps:'10-15'},
                    {name:'Incline Dumbbell Bench Press', sets:3, reps:'10-15'},
                    {name:'Dumbbell Shoulder Press', sets:3, reps:'10-15'},
                    {name:'Dumbbell Lateral Raise', sets:3, reps:'10-15'},
                    {name:'Cable Tricep Pushdown', sets:3, reps:'10-15'}
                ],
                home: [
                    {name:'Push Ups', sets:3, reps:'10-15'},
                    {name:'Incline Push Ups', sets:3, reps:'10-15'},
                    {name:'Pike Push Ups', sets:3, reps:'10-15'},
                    {name:'Resistance Band Raise', sets:3, reps:'10-15'},
                    {name:'Chair Dips', sets:3, reps:'10-15'}
                ]
            },
            {
                name: "Fat Loss — Pull Day",
                gym: [
                    {name:'Lat Pulldown', sets:3, reps:'10-15'},
                    {name:'Cable Row', sets:3, reps:'10-15'},
                    {name:'Face Pull', sets:3, reps:'10-15'},
                    {name:'Dumbbell Bicep Curl', sets:3, reps:'10-15'},
                    {name:'Dumbbell Hammer Curl', sets:3, reps:'10-15'}
                ],
                home: [
                    {name:'Resistance Band Pull Down', sets:3, reps:'10-15'},
                    {name:'Resistance Band Row', sets:3, reps:'10-15'},
                    {name:'Resistance Band Face Pull', sets:3, reps:'10-15'},
                    {name:'Resistance Band Curl', sets:3, reps:'10-15'},
                    {name:'Resistance Band Hammer Curl', sets:3, reps:'10-15'}
                ]
            },
            {
                name: "Fat Loss — Legs Day",
                gym: [
                    {name:'Squat or Leg Press', sets:3, reps:'10-15'},
                    {name:'Romanian Deadlift', sets:3, reps:'10-15'},
                    {name:'Dumbbell Walking Lunges', sets:3, reps:'10-15'},
                    {name:'Hamstring Curl', sets:3, reps:'10-15'},
                    {name:'Standing Calf Raise', sets:3, reps:'10-15'},
                    {name:'Glute Bridges', sets:3, reps:'10-15'}
                ],
                home: [
                    {name:'Bodyweight Squats', sets:3, reps:'10-15'},
                    {name:'Hip Hinge / Banded Romanian Deadlifts', sets:3, reps:'10-15'},
                    {name:'Walking Lunges', sets:3, reps:'10-15'},
                    {name:'Standing Hamstring Curl', sets:3, reps:'10-15'},
                    {name:'Standing Calf Raise', sets:3, reps:'10-15'},
                    {name:'Bodyweight Glute Bridges', sets:3, reps:'15-20'}
                ]
            },
            {
                name: "Fat Loss — Core Day",
                gym: [
                    {name:'Sit Ups / Crunches', sets:3, reps:'15-20'},
                    {name:'Plank', sets:3, reps:'45-60 seconds'},
                    {name:'Cable Crunches', sets:3, reps:'15-20'},
                    {name:'Hanging Knee Raise', sets:3, reps:'15-20'},
                    {name:'Farmer Carry', sets:3, reps:'30-40 seconds'}
                ],
                home: [
                    {name:'Sit Ups / Crunches', sets:3, reps:'10-15'},
                    {name:'Plank', sets:3, reps:'45-60 seconds'},
                    {name:'Resistance Band Crunches', sets:3, reps:'15-20'},
                    {name:'Lying Leg Raise', sets:3, reps:'15-20'},
                    {name:'Suitcase / Bag Carry', sets:3, reps:'30-40 seconds'}
                ]
            }
        ]
    },
    PGMUSCLE: {
        name: "Muscle Building Programme",
        code: 'PGMUSCLE',
        routines: [
            {
                name: "Muscle Building — Push Day",
                exercises: [
                    {name:'Barbell or Dumbbell Bench Press', sets:3, reps:'6-8'},
                    {name:'Incline Dumbbell Bench Press', sets:3, reps:'8-10'},
                    {name:'Dumbbell Fly or Pec Dec', sets:3, reps:'10-12'},
                    {name:'Dumbbell Shoulder Press', sets:3, reps:'8-10'},
                    {name:'Dumbbell Lateral Raise', sets:3, reps:'12-15'},
                    {name:'Cable Tricep Pushdown', sets:3, reps:'10-12'},
                    {name:'Single Arm Overhead Extensions', sets:3, reps:'10-12'}
                ]
            },
            {
                name: "Muscle Building — Pull Day",
                exercises: [
                    {name:'Lat Pulldown or Pull Ups', sets:3, reps:'8-10'},
                    {name:'Barbell or Cable Row', sets:3, reps:'8-10'},
                    {name:'Standing 45 Degree Cable Row', sets:3, reps:'8-10'},
                    {name:'Face Pull', sets:3, reps:'12-15'},
                    {name:'Dumbbell Bicep Curl', sets:3, reps:'10-12'},
                    {name:'Dumbbell Hammer Curl', sets:3, reps:'12-15'}
                ]
            },
            {
                name: "Muscle Building — Legs Day",
                exercises: [
                    {name:'Squat or Leg Press', sets:3, reps:'6-10'},
                    {name:'Romanian Deadlift', sets:3, reps:'8-10'},
                    {name:'Dumbbell Walking Lunges', sets:3, reps:'10-12'},
                    {name:'Hamstring Curl', sets:3, reps:'10-12'},
                    {name:'Standing Calf Raise', sets:3, reps:'12-15'},
                    {name:'Glute Bridges', sets:3, reps:'10-12'}
                ]
            },
            {
                name: "Muscle Building — Core Day",
                exercises: [
                    {name:'Sit Ups / Crunches', sets:3, reps:'15-20'},
                    {name:'Plank', sets:3, reps:'45-60 seconds'},
                    {name:'Cable Crunch', sets:3, reps:'15-20'},
                    {name:'Hanging Knee Raise', sets:3, reps:'10-15'},
                    {name:'Farmer Carry', sets:3, reps:'30-40 seconds'}
                ]
            }
        ]
    }
};

// ===================== CODE UNLOCK =====================
async function unlockProgramme() {
    const code = document.getElementById('programme-code').value.trim().toUpperCase();
    const programme = programmeTemplates[code];
    if (!programme) {
        alert('Invalid code. Please check your code and try again.');
        return;
    }
    const routinesData=await PG.routines.getAll();
    const routinesMeta=normalizeRoutinesRows(routinesData);
    const unlockedCodes = routinesMeta.unlockedCodes;
    if (unlockedCodes.includes(code)) {
        alert('This programme is already unlocked!');
        return;
    }
    const env = settings.environment || 'gym';
    programme.routines.forEach(routine => {
        let exercises;
        if (routine.exercises) {
            exercises = routine.exercises;
        } else {
            exercises = env === 'home' ? routine.home : routine.gym;
        }
        const routineEntry = {
            name: routine.name,
            exercises: exercises.map(ex => ex.name),
            created: new Date().toLocaleDateString('en-GB'),
            programmeData: exercises,
            locked: false
        };
        if (!savedRoutines.find(r => r.name === routine.name)) {
            savedRoutines.push(routineEntry);
        }
    });
    unlockedCodes.push(code);
    await PG.routines.save({unlockedCodes});
    await saveToStorage();
    document.getElementById('programme-code').value = '';
    alert('🎉 ' + programme.name + ' unlocked! Check My Routines.');
    renderRoutinesList();
}
async function logRestDay() {
    const today=new Date().toLocaleDateString('en-GB');
    let data=await PG.nutrition.getToday()||{steps:0,water:0};
    if(data.restDay){
        alert('Rest day already logged for today 😴');
        return;
    }
    data.restDay=true;
    data.restDayTime=new Date().toLocaleTimeString('en-GB');
    await PG.nutrition.save(data);
    // Add to workout history as a rest day entry
    const alreadyLogged=workoutHistory.find(w=>w.date===today&&w.type==='rest');
    if(!alreadyLogged){
        workoutHistory.unshift({
            type:'rest',
            muscle:'Rest Day',
            date:today,
            duration:0,
            exercises:[]
        });
        await saveToStorage();
    }
    checkBadges();
    updateHome();
    updateStepsDisplay();
    if(document.getElementById('screen-progress').classList.contains('active')) updateProgress();
    alert('😴 Rest day logged! Focus on hitting your nutrition and steps today.');
}


async function saveStepsTrain() {
    try{
        const nd=await PG.nutrition.getToday()||{steps:0,water:0,restDay:false};
        const stepsInput=document.getElementById('input-steps-train').value;
        if(stepsInput!=='')nd.steps=parseInt(stepsInput,10)||0;
        await PG.nutrition.save(nd);
        document.getElementById('input-steps-train').value='';
        updateStepsDisplay();
        updateHome();
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('saveStepsTrain:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

async function updateStepsDisplay() {
    const today=new Date().toLocaleDateString('en-GB');
    const data=await PG.nutrition.getToday()||{steps:0,water:0};
    const steps=parseInt(data.steps)||0;
    const stepsTarget=settings.stepsTarget||8000;
    const el=document.getElementById('steps-display-train');
    const bar=document.getElementById('steps-bar-train');
    if(el)el.textContent=steps+' / '+stepsTarget.toLocaleString();
    if(bar)bar.style.width=Math.min((steps/stepsTarget)*100,100)+'%';
}

function toggleWarmup(ei,si) {
    exercises[ei].sets[si].warmup=!exercises[ei].sets[si].warmup;
    renderExercises();
}

function getWorkingSets(ex) {
    return ex.sets.filter(s=>!s.warmup);
}

async function saveMealTemplate() {
    if(!currentMealIndex&&currentMealIndex!==0)return;
    const meal=meals[currentMealIndex];
    if(!meal||meal.foods.length===0){alert('Add some foods to this meal first');return;}
    const routinesData=await PG.routines.getAll();
    const templates=normalizeRoutinesRows(routinesData).mealTemplates;
    const name=prompt('Save this meal as a template:',meal.name)||meal.name;
    templates.push({name,foods:meal.foods,saved:new Date().toLocaleDateString('en-GB')});
    await PG.routines.save({mealTemplates:templates});
    alert('✅ Meal template saved!');
}

async function loadMealTemplate() {
    const routinesData=await PG.routines.getAll();
    const templates=normalizeRoutinesRows(routinesData).mealTemplates;
    if(templates.length===0){alert('No saved meal templates yet. Add foods to a meal and save it as a template first.');return;}
    const list=templates.map((t,i)=>`${i+1}. ${t.name} (${t.foods.length} foods)`).join('\n');
    const choice=prompt(`Load a meal template:\n\n${list}\n\nEnter number:`);
    if(!choice)return;
    const index=parseInt(choice)-1;
    if(index>=0&&index<templates.length){
        const template=templates[index];
        const today=new Date().toLocaleDateString('en-GB');
        meals.push({name:template.name,date:today,foods:[...template.foods]});
        saveToStorage();renderMeals();loadNutrition();updateHome();
        closeMealTemplateModal();
    }
}
function renderWeightChart() {
    const canvas=document.getElementById('weight-chart');if(!canvas)return;
    const ctx=canvas.getContext('2d');
    const data=checkinHistory.slice(0,8).reverse();
    if(data.length<2){
        ctx.fillStyle='var(--text-muted)';
        ctx.font='13px sans-serif';
        ctx.textAlign='center';
        ctx.fillText('Log 2+ check-ins to see your trend',canvas.width/2,canvas.height/2);
        return;
    }
    const weights=data.map(d=>parseFloat(d.weight)||0);
    const min=Math.min(...weights)-2;
    const max=Math.max(...weights)+2;
    const w=canvas.width;const h=canvas.height;
    const pad=30;
    ctx.clearRect(0,0,w,h);
    // Grid lines
    ctx.strokeStyle='#E2E8F0';ctx.lineWidth=1;
    for(let i=0;i<=4;i++){
        const y=pad+(h-pad*2)*(i/4);
        ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(w-pad,y);ctx.stroke();
    }
    // Line
    ctx.strokeStyle='#2563EB';ctx.lineWidth=2.5;ctx.beginPath();
    data.forEach((d,i)=>{
        const x=pad+(w-pad*2)*(i/(data.length-1));
        const y=pad+(h-pad*2)*(1-(parseFloat(d.weight)-min)/(max-min));
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    });
    ctx.stroke();
    // Dots
    ctx.fillStyle='#2563EB';
    data.forEach((d,i)=>{
        const x=pad+(w-pad*2)*(i/(data.length-1));
        const y=pad+(h-pad*2)*(1-(parseFloat(d.weight)-min)/(max-min));
        ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();
    });
    // Labels
    ctx.fillStyle='#64748B';ctx.font='11px sans-serif';ctx.textAlign='center';
    data.forEach((d,i)=>{
        const x=pad+(w-pad*2)*(i/(data.length-1));
        ctx.fillText(d.weight+'kg',x,h-8);
    });
}
