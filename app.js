// ─── AUTH BOOT ────────────────────────────────────────────────────────────────
function hapticTap(){ try{ navigator.vibrate(10); }catch(_){} }
function hapticError(){ try{ navigator.vibrate(50); }catch(_){} }
function hapticAchievement(){ try{ navigator.vibrate([30,20,30]); }catch(_){} }
// ── DEV MODE ─────────────────────────────────────────────
if (new URLSearchParams(window.location.search).get('dev') === 'true') {
  localStorage.setItem('devMode', 'true');
}
const isDevMode = localStorage.getItem('devMode') === 'true';
const PROGRAM_TEMPLATES = [
  {
    id: 'beginner',
    name: 'Beginner Gym Plan',
    goal: 'fitness',
    durationWeeks: 6,
    workoutsPerWeek: 3,
    difficulty: 'Beginner',
    description: 'Perfect starting point. Full body focus, 3 days a week.',
    workouts: [
      {
        id: 'full_body_a',
        name: 'Full Body A',
        focus: 'Full Body',
        duration: 45,
        calories: 320,
        scheduledDays: ['Monday', 'Wednesday', 'Friday'],
        exercises: [
          { name: 'Barbell Squat', sets: 3, repsRange: '8-10', muscleGroup: 'Legs', equipment: 'Barbell' },
          { name: 'Bench Press', sets: 3, repsRange: '8-10', muscleGroup: 'Chest', equipment: 'Barbell' },
          { name: 'Bent Over Row', sets: 3, repsRange: '8-10', muscleGroup: 'Back', equipment: 'Barbell' },
          { name: 'Overhead Press', sets: 3, repsRange: '8-10', muscleGroup: 'Shoulders', equipment: 'Barbell' },
          { name: 'Romanian Deadlift', sets: 3, repsRange: '10-12', muscleGroup: 'Legs', equipment: 'Barbell' },
          { name: 'Plank', sets: 3, repsRange: '30-60s', muscleGroup: 'Core', equipment: 'Bodyweight' }
        ]
      }
    ]
  },
  {
    id: 'fat_loss',
    name: '6 Week Cut',
    goal: 'fatloss',
    durationWeeks: 6,
    workoutsPerWeek: 4,
    difficulty: 'Intermediate',
    description: 'High intensity 4 day programme focused on fat loss.',
    workouts: [
      {
        id: 'upper_a',
        name: 'Upper A',
        focus: 'Chest, Shoulders, Triceps',
        duration: 50,
        calories: 420,
        scheduledDays: ['Monday', 'Thursday'],
        exercises: [
          { name: 'Bench Press', sets: 4, repsRange: '8-12', muscleGroup: 'Chest', equipment: 'Barbell' },
          { name: 'Incline Dumbbell Press', sets: 3, repsRange: '10-12', muscleGroup: 'Chest', equipment: 'Dumbbell' },
          { name: 'Lateral Raise', sets: 3, repsRange: '12-15', muscleGroup: 'Shoulders', equipment: 'Dumbbell' },
          { name: 'Tricep Pushdown', sets: 3, repsRange: '12-15', muscleGroup: 'Arms', equipment: 'Cable' },
          { name: 'Overhead Tricep Extension', sets: 3, repsRange: '12-15', muscleGroup: 'Arms', equipment: 'Dumbbell' }
        ]
      },
      {
        id: 'lower_a',
        name: 'Lower A',
        focus: 'Quads, Hamstrings, Glutes',
        duration: 55,
        calories: 460,
        scheduledDays: ['Tuesday', 'Friday'],
        exercises: [
          { name: 'Barbell Squat', sets: 4, repsRange: '8-12', muscleGroup: 'Legs', equipment: 'Barbell' },
          { name: 'Romanian Deadlift', sets: 3, repsRange: '10-12', muscleGroup: 'Legs', equipment: 'Barbell' },
          { name: 'Leg Press', sets: 3, repsRange: '12-15', muscleGroup: 'Legs', equipment: 'Machine' },
          { name: 'Leg Curl', sets: 3, repsRange: '12-15', muscleGroup: 'Legs', equipment: 'Machine' },
          { name: 'Calf Raise', sets: 4, repsRange: '15-20', muscleGroup: 'Legs', equipment: 'Machine' }
        ]
      }
    ]
  },
  {
    id: 'muscle',
    name: '8 Week Muscle Builder',
    goal: 'muscle',
    durationWeeks: 8,
    workoutsPerWeek: 4,
    difficulty: 'Intermediate',
    description: 'Upper/lower split focused on hypertrophy and strength.',
    workouts: [
      {
        id: 'push',
        name: 'Push Day',
        focus: 'Chest, Shoulders, Triceps',
        duration: 55,
        calories: 480,
        scheduledDays: ['Monday', 'Thursday'],
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, repsRange: '6-8', muscleGroup: 'Chest', equipment: 'Barbell' },
          { name: 'Incline Dumbbell Press', sets: 3, repsRange: '8-10', muscleGroup: 'Chest', equipment: 'Dumbbell' },
          { name: 'Machine Shoulder Press', sets: 3, repsRange: '8-10', muscleGroup: 'Shoulders', equipment: 'Machine' },
          { name: 'Cable Fly', sets: 3, repsRange: '10-12', muscleGroup: 'Chest', equipment: 'Cable' },
          { name: 'Tricep Pushdown', sets: 3, repsRange: '10-12', muscleGroup: 'Arms', equipment: 'Cable' },
          { name: 'Overhead Tricep Extension', sets: 3, repsRange: '10-12', muscleGroup: 'Arms', equipment: 'Dumbbell' }
        ]
      },
      {
        id: 'pull',
        name: 'Pull Day',
        focus: 'Back, Biceps',
        duration: 55,
        calories: 460,
        scheduledDays: ['Tuesday', 'Friday'],
        exercises: [
          { name: 'Deadlift', sets: 4, repsRange: '4-6', muscleGroup: 'Back', equipment: 'Barbell' },
          { name: 'Pull Up', sets: 3, repsRange: '6-10', muscleGroup: 'Back', equipment: 'Bodyweight' },
          { name: 'Barbell Row', sets: 3, repsRange: '8-10', muscleGroup: 'Back', equipment: 'Barbell' },
          { name: 'Cable Row', sets: 3, repsRange: '10-12', muscleGroup: 'Back', equipment: 'Cable' },
          { name: 'Barbell Curl', sets: 3, repsRange: '10-12', muscleGroup: 'Arms', equipment: 'Barbell' },
          { name: 'Hammer Curl', sets: 3, repsRange: '10-12', muscleGroup: 'Arms', equipment: 'Dumbbell' }
        ]
      }
    ]
  },
  {
    id: 'hybrid',
    name: 'Hybrid Athlete',
    goal: 'hybrid',
    durationWeeks: 8,
    workoutsPerWeek: 5,
    difficulty: 'Advanced',
    description: 'Strength and conditioning combined. 5 days a week.',
    workouts: [
      {
        id: 'push',
        name: 'Push Day',
        focus: 'Chest, Shoulders, Triceps',
        duration: 55,
        calories: 480,
        scheduledDays: ['Monday'],
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, repsRange: '6-8', muscleGroup: 'Chest', equipment: 'Barbell' },
          { name: 'Incline Dumbbell Press', sets: 3, repsRange: '8-10', muscleGroup: 'Chest', equipment: 'Dumbbell' },
          { name: 'Overhead Press', sets: 3, repsRange: '8-10', muscleGroup: 'Shoulders', equipment: 'Barbell' },
          { name: 'Lateral Raise', sets: 3, repsRange: '12-15', muscleGroup: 'Shoulders', equipment: 'Dumbbell' },
          { name: 'Tricep Pushdown', sets: 3, repsRange: '10-12', muscleGroup: 'Arms', equipment: 'Cable' }
        ]
      },
      {
        id: 'pull',
        name: 'Pull Day',
        focus: 'Back, Biceps',
        duration: 55,
        calories: 460,
        scheduledDays: ['Tuesday'],
        exercises: [
          { name: 'Deadlift', sets: 4, repsRange: '4-6', muscleGroup: 'Back', equipment: 'Barbell' },
          { name: 'Pull Up', sets: 3, repsRange: '6-10', muscleGroup: 'Back', equipment: 'Bodyweight' },
          { name: 'Barbell Row', sets: 3, repsRange: '8-10', muscleGroup: 'Back', equipment: 'Barbell' },
          { name: 'Barbell Curl', sets: 3, repsRange: '10-12', muscleGroup: 'Arms', equipment: 'Barbell' },
          { name: 'Hammer Curl', sets: 3, repsRange: '10-12', muscleGroup: 'Arms', equipment: 'Dumbbell' }
        ]
      },
      {
        id: 'legs',
        name: 'Leg Day',
        focus: 'Quads, Hamstrings, Glutes',
        duration: 60,
        calories: 520,
        scheduledDays: ['Wednesday'],
        exercises: [
          { name: 'Barbell Squat', sets: 4, repsRange: '6-8', muscleGroup: 'Legs', equipment: 'Barbell' },
          { name: 'Romanian Deadlift', sets: 3, repsRange: '8-10', muscleGroup: 'Legs', equipment: 'Barbell' },
          { name: 'Leg Press', sets: 3, repsRange: '10-12', muscleGroup: 'Legs', equipment: 'Machine' },
          { name: 'Leg Curl', sets: 3, repsRange: '12-15', muscleGroup: 'Legs', equipment: 'Machine' },
          { name: 'Calf Raise', sets: 4, repsRange: '15-20', muscleGroup: 'Legs', equipment: 'Machine' }
        ]
      },
      {
        id: 'upper',
        name: 'Upper Day',
        focus: 'Chest, Back, Shoulders',
        duration: 60,
        calories: 500,
        scheduledDays: ['Thursday'],
        exercises: [
          { name: 'Bench Press', sets: 4, repsRange: '6-8', muscleGroup: 'Chest', equipment: 'Barbell' },
          { name: 'Barbell Row', sets: 4, repsRange: '6-8', muscleGroup: 'Back', equipment: 'Barbell' },
          { name: 'Overhead Press', sets: 3, repsRange: '8-10', muscleGroup: 'Shoulders', equipment: 'Barbell' },
          { name: 'Pull Up', sets: 3, repsRange: '6-10', muscleGroup: 'Back', equipment: 'Bodyweight' },
          { name: 'Lateral Raise', sets: 3, repsRange: '12-15', muscleGroup: 'Shoulders', equipment: 'Dumbbell' }
        ]
      },
      {
        id: 'conditioning',
        name: 'Conditioning',
        focus: 'Cardio, Core',
        duration: 40,
        calories: 380,
        scheduledDays: ['Friday'],
        exercises: [
          { name: 'Assault Bike', sets: 5, repsRange: '60s on/30s off', muscleGroup: 'Cardio', equipment: 'Machine' },
          { name: 'Plank', sets: 3, repsRange: '45-60s', muscleGroup: 'Core', equipment: 'Bodyweight' },
          { name: 'Mountain Climbers', sets: 3, repsRange: '30s', muscleGroup: 'Core', equipment: 'Bodyweight' },
          { name: 'Burpees', sets: 3, repsRange: '10-15', muscleGroup: 'Cardio', equipment: 'Bodyweight' }
        ]
      }
    ]
  }
];
const EXERCISE_LIBRARY = [
  { name: 'Barbell Bench Press', muscleGroup: 'Chest', equipment: 'Barbell', instructions: 'Lie on bench, grip bar shoulder-width, lower to chest, press up.' },
  { name: 'Incline Dumbbell Press', muscleGroup: 'Chest', equipment: 'Dumbbell', instructions: 'Set bench to 30-45°, press dumbbells up from chest level.' },
  { name: 'Cable Fly', muscleGroup: 'Chest', equipment: 'Cable', instructions: 'Set cables high, bring hands together in arc motion.' },
  { name: 'Push Up', muscleGroup: 'Chest', equipment: 'Bodyweight', instructions: 'Hands shoulder-width, lower chest to floor, push up.' },
  { name: 'Deadlift', muscleGroup: 'Back', equipment: 'Barbell', instructions: 'Hip-width stance, hinge at hips, drive through heels to stand.' },
  { name: 'Pull Up', muscleGroup: 'Back', equipment: 'Bodyweight', instructions: 'Hang from bar, pull chest to bar, lower with control.' },
  { name: 'Barbell Row', muscleGroup: 'Back', equipment: 'Barbell', instructions: 'Hinge forward, row bar to lower chest, squeeze shoulder blades.' },
  { name: 'Cable Row', muscleGroup: 'Back', equipment: 'Cable', instructions: 'Sit at cable row, pull handle to abdomen, hold briefly.' },
  { name: 'Lat Pulldown', muscleGroup: 'Back', equipment: 'Machine', instructions: 'Pull bar to upper chest, control the return.' },
  { name: 'Barbell Squat', muscleGroup: 'Legs', equipment: 'Barbell', instructions: 'Bar on upper back, squat until thighs parallel, drive up.' },
  { name: 'Romanian Deadlift', muscleGroup: 'Legs', equipment: 'Barbell', instructions: 'Hinge at hips keeping back flat, feel hamstring stretch, return.' },
  { name: 'Leg Press', muscleGroup: 'Legs', equipment: 'Machine', instructions: 'Press platform away, lower until 90° knee angle.' },
  { name: 'Leg Curl', muscleGroup: 'Legs', equipment: 'Machine', instructions: 'Curl weight toward glutes, lower with control.' },
  { name: 'Calf Raise', muscleGroup: 'Legs', equipment: 'Machine', instructions: 'Rise onto toes, hold at top, lower slowly.' },
  { name: 'Overhead Press', muscleGroup: 'Shoulders', equipment: 'Barbell', instructions: 'Press bar overhead from shoulder height, lock out at top.' },
  { name: 'Lateral Raise', muscleGroup: 'Shoulders', equipment: 'Dumbbell', instructions: 'Raise arms to sides until parallel to floor.' },
  { name: 'Machine Shoulder Press', muscleGroup: 'Shoulders', equipment: 'Machine', instructions: 'Press handles overhead, return with control.' },
  { name: 'Face Pull', muscleGroup: 'Shoulders', equipment: 'Cable', instructions: 'Pull rope to face, elbows high, squeeze rear delts.' },
  { name: 'Barbell Curl', muscleGroup: 'Arms', equipment: 'Barbell', instructions: 'Curl bar to shoulder height, squeeze bicep, lower slowly.' },
  { name: 'Hammer Curl', muscleGroup: 'Arms', equipment: 'Dumbbell', instructions: 'Neutral grip curl, targets brachialis and forearms.' },
  { name: 'Tricep Pushdown', muscleGroup: 'Arms', equipment: 'Cable', instructions: 'Push bar down to full extension, control the return.' },
  { name: 'Overhead Tricep Extension', muscleGroup: 'Arms', equipment: 'Dumbbell', instructions: 'Lower weight behind head, extend arms fully overhead.' },
  { name: 'Plank', muscleGroup: 'Core', equipment: 'Bodyweight', instructions: 'Hold straight body position on forearms, brace core throughout.' },
  { name: 'Mountain Climbers', muscleGroup: 'Core', equipment: 'Bodyweight', instructions: 'Drive knees to chest alternately in plank position.' },
  { name: 'Cable Crunch', muscleGroup: 'Core', equipment: 'Cable', instructions: 'Kneel, crunch down against cable resistance.' },
  { name: 'Assault Bike', muscleGroup: 'Cardio', equipment: 'Machine', instructions: 'Push/pull handles while pedalling for full body cardio.' },
  { name: 'Treadmill Run', muscleGroup: 'Cardio', equipment: 'Machine', instructions: 'Set pace and incline, maintain consistent cadence.' },
  { name: 'Burpees', muscleGroup: 'Cardio', equipment: 'Bodyweight', instructions: 'Drop to floor, push up, jump up with arms overhead.' }
];
document.addEventListener('click',(e)=>{
    const el=e.target.closest('button,.nav-item,.routine-item,.category-btn,.meal-action-btn,.filter-btn,.tag,.btn-oauth,.supplement-picker-add,.supplement-picker-close,.lang-btn,.path-btn,.unit-btn,.food-entry-delete,.exercise-block .remove-set');
    if(el)hapticTap();
},true);
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
        home:'Home', train:'Train', nutrition:'Nutrition', progress:'Progress', profile:'Profile',
        greetingMorning:'Good morning', greetingAfternoon:'Good afternoon', greetingEvening:'Good evening',
        homeHeroSub:"Let's crush your goals today.",
        coach:'COACH', todayScore:'DAILY PROGRESS', outOf:'OUT OF 100', weeklyStreak:'Weekly summary',
        todayProgress:"TODAY'S PROGRESS", myPhase:'MY PHASE', daysTraining:'Days Training',
        weight:'WEIGHT', current:'Current', target:'Target', toGo:'To Go', badges:'BADGES',
        homeStatWorkout:'Workout', workoutDoneShort:'Done', workoutRestShort:'Rest', workoutPendingShort:'—',
        todaysWorkout:"TODAY'S WORKOUT", workoutPrimaryBadge:'Primary', startWorkout:'START WORKOUT',
        logRestDay:'LOG A REST DAY', homeWorkoutMeta:'45–60 min · Train tab', workoutReadyTitle:'Ready to train?',
        workoutDaySuffix:'Day', homeWorkoutHint:'Open Train to log your session.',
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
        steps:'Steps', water:'Water', sleep:'Sleep',
        addMeal:'+ Add Meal', nutNavToday:'Today', mealName:'Meal name:',
        stepsWater:'STEPS & WATER', stepsToday:'Steps Today', waterLitres:'Water (litres)',
        save:'Save', supplements:'SUPPLEMENTS',
        clearAllSupplements:'Clear all supplements', removeFromList:'Remove',
        removeCustomSupplement:'Remove',
        addSupplement:'Add Supplement',
        addSupplementModalTitle:'Add supplement',
        supplementAlreadyAdded:'Already in your list',
        supplementAddedToast:'Supplement added',
        supplementsListEmpty:'No supplements in your list yet. Tap “Add Supplement” to choose from the list, or add a custom name below.',
        confirmClearSupplements:'Remove every supplement from your list and clear today’s supplement log? You can add them again anytime.',
        addFood:'Add Food', portion:'Portion (g or ml)', addToMeal:'Add to Meal',
        saveAsTemplate:'Save as Template', removeMeal:'Remove Meal',
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
        home:'Início', train:'Treino', nutrition:'Nutrição', progress:'Progresso', profile:'Perfil',
        greetingMorning:'Bom dia', greetingAfternoon:'Boa tarde', greetingEvening:'Boa noite',
        homeHeroSub:'Vamos arrasar nas metas hoje.',
        coach:'COACH', todayScore:'PROGRESSO DIÁRIO', outOf:'DE 100', weeklyStreak:'Sequência Semanal',
        todayProgress:'PROGRESSO DE HOJE', myPhase:'MINHA FASE', daysTraining:'Dias Treinando',
        weight:'PESO', current:'Atual', target:'Meta', toGo:'Faltam', badges:'CONQUISTAS',
        homeStatWorkout:'Treino', workoutDoneShort:'Feito', workoutRestShort:'Descanso', workoutPendingShort:'—',
        todaysWorkout:'TREINO DE HOJE', workoutPrimaryBadge:'Principal', startWorkout:'COMEÇAR TREINO',
        logRestDay:'REGISTRAR DIA DE DESCANSO', homeWorkoutMeta:'45–60 min · Aba Treino', workoutReadyTitle:'Pronto para treinar?',
        workoutDaySuffix:'Dia', homeWorkoutHint:'Abra Treino para registrar.',
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
        steps:'Passos', water:'Água', sleep:'Sono',
        addMeal:'+ Adicionar Refeição', nutNavToday:'Hoje', mealName:'Nome da refeição:',
        stepsWater:'PASSOS E ÁGUA', stepsToday:'Passos Hoje', waterLitres:'Água (litros)',
        save:'Salvar', supplements:'SUPLEMENTOS',
        clearAllSupplements:'Limpar todos os suplementos', removeFromList:'Remover',
        addSupplement:'Adicionar suplemento',
        addSupplementModalTitle:'Adicionar suplemento',
        supplementAlreadyAdded:'Já está na sua lista',
        supplementAddedToast:'Suplemento adicionado',
        supplementsListEmpty:'Nenhum suplemento na lista. Toque em “Adicionar suplemento” ou adicione um nome abaixo.',
        confirmClearSupplements:'Remover todos os suplementos da lista e limpar o registo de hoje? Pode adicionar novamente quando quiser.',
        addFood:'Adicionar alimento', portion:'Porção (g ou ml)', addToMeal:'Adicionar à Refeição',
        saveAsTemplate:'Guardar como modelo', removeMeal:'Remover refeição',
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
        home:'Inicio', train:'Entrenar', nutrition:'Nutrición', progress:'Progreso', profile:'Perfil',
        greetingMorning:'Buenos días', greetingAfternoon:'Buenas tardes', greetingEvening:'Buenas noches',
        homeHeroSub:'A por los objetivos hoy.',
        coach:'COACH', todayScore:'PROGRESO DIARIO', outOf:'DE 100', weeklyStreak:'Racha Semanal',
        todayProgress:'PROGRESO DE HOY', myPhase:'MI FASE', daysTraining:'Días Entrenando',
        weight:'PESO', current:'Actual', target:'Meta', toGo:'Faltan', badges:'LOGROS',
        homeStatWorkout:'Entreno', workoutDoneShort:'Hecho', workoutRestShort:'Descanso', workoutPendingShort:'—',
        todaysWorkout:'ENTRENO DE HOY', workoutPrimaryBadge:'Principal', startWorkout:'EMPEZAR ENTRENO',
        logRestDay:'REGISTRAR DÍA DE DESCANSO', homeWorkoutMeta:'45–60 min · Pestaña Entrenar', workoutReadyTitle:'¿Listo para entrenar?',
        workoutDaySuffix:'Día', homeWorkoutHint:'Abre Entrenar para registrar.',
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
        steps:'Pasos', water:'Agua', sleep:'Sueño',
        addMeal:'+ Añadir Comida', nutNavToday:'Hoy', mealName:'Nombre de la comida:',
        stepsWater:'PASOS Y AGUA', stepsToday:'Pasos Hoy', waterLitres:'Agua (litros)',
        save:'Guardar', supplements:'SUPLEMENTOS',
        clearAllSupplements:'Borrar todos los suplementos', removeFromList:'Quitar',
        addSupplement:'Añadir suplemento',
        addSupplementModalTitle:'Añadir suplemento',
        supplementAlreadyAdded:'Ya está en tu lista',
        supplementAddedToast:'Suplemento añadido',
        supplementsListEmpty:'No hay suplementos. Pulsa “Añadir suplemento” o escribe un nombre abajo.',
        confirmClearSupplements:'¿Quitar todos los suplementos de tu lista y borrar el registro de hoy? Puedes volver a añadirlos cuando quieras.',
        addFood:'Añadir alimento', portion:'Porción (g o ml)', addToMeal:'Añadir a Comida',
        saveAsTemplate:'Guardar como plantilla', removeMeal:'Eliminar comida',
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
        home:'Accueil', train:'Entraîner', nutrition:'Nutrition', progress:'Progrès', profile:'Profil',
        greetingMorning:'Bonjour', greetingAfternoon:'Bon après-midi', greetingEvening:'Bonsoir',
        homeHeroSub:'On vise les objectifs aujourd’hui.',
        coach:'COACH', todayScore:'PROGRÈS QUOTIDIEN', outOf:'SUR 100', weeklyStreak:'Série Hebdomadaire',
        todayProgress:"PROGRÈS D'AUJOURD'HUI", myPhase:'MA PHASE', daysTraining:"Jours d'Entraînement",
        weight:'POIDS', current:'Actuel', target:'Objectif', toGo:'Restant', badges:'BADGES',
        homeStatWorkout:'Séance', workoutDoneShort:'Fait', workoutRestShort:'Repos', workoutPendingShort:'—',
        todaysWorkout:"SÉANCE DU JOUR", workoutPrimaryBadge:'Principal', startWorkout:"DÉMARRER L'ENTRAÎNEMENT",
        logRestDay:'ENREGISTRER UN JOUR DE REPOS', homeWorkoutMeta:'45–60 min · Onglet Entraîner', workoutReadyTitle:'Prêt à vous entraîner ?',
        workoutDaySuffix:'Jour', homeWorkoutHint:'Ouvrez Entraîner pour enregistrer.',
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
        steps:'Pas', water:'Eau', sleep:'Sommeil',
        addMeal:'+ Ajouter Repas', nutNavToday:"Aujourd'hui", mealName:'Nom du repas:',
        stepsWater:'PAS ET EAU', stepsToday:"Pas Aujourd'hui", waterLitres:'Eau (litres)',
        save:'Sauvegarder', supplements:'SUPPLÉMENTS',
        clearAllSupplements:'Effacer tous les suppléments', removeFromList:'Retirer',
        addSupplement:'Ajouter un supplément',
        addSupplementModalTitle:'Ajouter un supplément',
        supplementAlreadyAdded:'Déjà dans votre liste',
        supplementAddedToast:'Supplément ajouté',
        supplementsListEmpty:'Aucun supplément. Appuyez sur « Ajouter un supplément » ou saisissez un nom ci-dessous.',
        confirmClearSupplements:'Retirer tous les suppléments de votre liste et effacer le suivi du jour ? Vous pourrez les rajouter quand vous voulez.',
        addFood:'Ajouter un aliment', portion:'Portion (g ou ml)', addToMeal:'Ajouter au Repas',
        saveAsTemplate:'Enregistrer comme modèle', removeMeal:'Supprimer le repas',
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
        home:'Start', train:'Training', nutrition:'Ernährung', progress:'Fortschritt', profile:'Profil',
        greetingMorning:'Guten Morgen', greetingAfternoon:'Guten Tag', greetingEvening:'Guten Abend',
        homeHeroSub:'Heute Vollgas auf deine Ziele.',
        coach:'COACH', todayScore:'TÄGLICHER FORTSCHRITT', outOf:'VON 100', weeklyStreak:'Wöchentliche Serie',
        todayProgress:'HEUTIGER FORTSCHRITT', myPhase:'MEINE PHASE', daysTraining:'Trainingstage',
        weight:'GEWICHT', current:'Aktuell', target:'Ziel', toGo:'Noch', badges:'ABZEICHEN',
        homeStatWorkout:'Training', workoutDoneShort:'Fertig', workoutRestShort:'Ruhe', workoutPendingShort:'—',
        todaysWorkout:'TRAINING HEUTE', workoutPrimaryBadge:'Fokus', startWorkout:'TRAINING STARTEN',
        logRestDay:'RUHETAG EINTRAGEN', homeWorkoutMeta:'45–60 Min · Training-Tab', workoutReadyTitle:'Bereit fürs Training?',
        workoutDaySuffix:'Tag', homeWorkoutHint:'Öffne Training zum Eintragen.',
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
        steps:'Schritte', water:'Wasser', sleep:'Schlaf',
        addMeal:'+ Mahlzeit Hinzufügen', nutNavToday:'Heute', mealName:'Mahlzeit Name:',
        stepsWater:'SCHRITTE & WASSER', stepsToday:'Schritte Heute', waterLitres:'Wasser (Liter)',
        save:'Speichern', supplements:'NAHRUNGSERGÄNZUNG',
        clearAllSupplements:'Alle Supplements löschen', removeFromList:'Entfernen',
        addSupplement:'Supplement hinzufügen',
        addSupplementModalTitle:'Supplement hinzufügen',
        supplementAlreadyAdded:'Bereits in der Liste',
        supplementAddedToast:'Supplement hinzugefügt',
        supplementsListEmpty:'Noch keine Supplements. Tippe auf „Supplement hinzufügen“ oder gib unten einen Namen ein.',
        confirmClearSupplements:'Alle Supplements aus der Liste entfernen und den heutigen Eintrag leeren? Sie können sie jederzeit neu anlegen.',
        addFood:'Lebensmittel hinzufügen', portion:'Portion (g oder ml)', addToMeal:'Zur Mahlzeit Hinzufügen',
        saveAsTemplate:'Als Vorlage speichern', removeMeal:'Mahlzeit entfernen',
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

const defaultSupplements = ['Whey Protein','Creatine','Multivitamin','Vitamin D','Omega 3','Magnesium','Pre-workout','Caffeine','BCAAs','Zinc'];
const supplementDefaultUnits = {
    'Whey Protein':'g','Creatine':'g','Magnesium':'mg','Pre-workout':'g','BCAAs':'g','Caffeine':'mg',
    'Multivitamin':'tablets','Vitamin D':'tablets','Omega 3':'tablets','Zinc':'tablets'
};
const supplementUnitValues = ['g','mg','ml','tablets','scoops'];
function getDefaultSupplementUnit(name){
    if(name&&Object.prototype.hasOwnProperty.call(supplementDefaultUnits,name)) return supplementDefaultUnits[name];
    return 'g';
}
function supplementUnitSelectHtml(selectedUnit){
    const sel=supplementUnitValues.includes(selectedUnit)?selectedUnit:'g';
    return supplementUnitValues.map(u=>`<option value="${u}"${u===sel?' selected':''}>${u}</option>`).join('');
}
function escapeHtmlText(str){
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escapeJsSingleQuoteString(str){
    return String(str).replace(/\\/g,'\\\\').replace(/'/g,"\\'");
}
function dedupeSupplementNamesOrdered(arr){
    const seen=new Set();
    const out=[];
    (arr||[]).forEach(x=>{
        const s=typeof x==='string'?x.trim():'';
        if(!s||seen.has(s)) return;
        seen.add(s);
        out.push(s);
    });
    return out;
}
function legacyMergedSupplementNames(savedSupplements){
    const savedNames=(Array.isArray(savedSupplements)?savedSupplements:[]).map(s=>s&&s.name).filter(Boolean);
    return dedupeSupplementNamesOrdered([...(settings.custom_supplements||[]),...defaultSupplements,...savedNames]);
}
function getDisplayedSupplementNames(savedSupplements){
    if(Array.isArray(settings.supplements_catalog)) return dedupeSupplementNamesOrdered(settings.supplements_catalog);
    return legacyMergedSupplementNames(savedSupplements||[]);
}
let renderedSupplements = [];
function isListedCustomSupplement(name){
    return (settings.custom_supplements||[]).some(c=>String(c).toLowerCase()===String(name).toLowerCase());
}
const mealPresets = ['Breakfast','Lunch','Dinner','Snack','Pre-Workout','Post-Workout'];

// ===================== STATE =====================
let selectedMuscle='', exercises=[], workoutHistory=[], cardioHistory=[], checkinHistory=[];
let personalBests={}, settings={}, savedRoutines=[], customExercises={}, meals=[], phaseHistory=[], measurements={};
let nutritionDateOffset=0;
let selectedNutritionDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
let todayNutrition = { calories: 0, protein: 0, carbs: 0, fats: 0, water_litres: 0, meals: [], supplements: [] };
let progressChartRange='1M';
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
    set('nav-txt-progress','progress');set('nav-txt-profile','profile');
    // Home
    set('txt-today-score','todayScore');set('txt-out-of','outOf');set('txt-weekly-streak','weeklyStreak');
    set('txt-home-stat-workout','homeStatWorkout');set('txt-protein','protein');set('txt-steps','steps');set('txt-sleep','sleep');
    set('txt-protein-detail','protein');set('txt-steps-detail','steps');set('txt-water-detail','water');
    set('txt-coach','coach');set('txt-today-progress','todayProgress');set('txt-my-phase','myPhase');
    set('txt-days-training','daysTraining');set('txt-weight','weight');
    set('txt-current','current');set('txt-target','target');set('txt-to-go','toGo');
    set('txt-badges','badges');set('txt-start-workout','startWorkout');set('txt-todays-workout','todaysWorkout');
    set('txt-workout-primary-badge','workoutPrimaryBadge');set('txt-log-rest-day','logRestDay');
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
    set('nut-lbl-protein','protein');set('nut-lbl-carbs','carbs');set('nut-lbl-fats','fat');
    set('home-txt-cal-label','calories');set('nut-txt-cal-label','calories');set('txt-prot-label','protein');
    set('txt-carbs-label','carbs');set('txt-fat-label','fat');
    set('txt-steps-label','steps');set('txt-water-label','water');
    set('txt-add-meal','addMeal');set('txt-steps-water','stepsWater');
    set('lbl-steps-today','stepsToday');set('lbl-water','waterLitres');
    set('txt-save-sw','save');set('txt-supplements','supplements');set('txt-clear-all-supplements','clearAllSupplements');
    set('txt-add-supplement','addSupplement');set('txt-add-supplement-modal-title','addSupplementModalTitle');
    set('filter-all','allFoods');set('txt-add-to-meal','addToMeal');set('lbl-portion','portion');
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
    document.querySelectorAll('.screen, .header, .nav').forEach(el => el.style.display = 'none');
    if(onboarding)onboarding.style.display='flex';
    document.getElementById('auth-modal').style.display='none';
    obNext(0);
}

async function fastTrack() {
    const onboarding=document.getElementById('onboarding');if(onboarding)onboarding.style.display='none';
    settings={name:'',goal:'fitness',environment:'gym',diet:'standard',weight:0,targetWeight:0,
        calTarget:2000,proteinTarget:150,stepsTarget:8000,language:selectedLang,
        phaseName:'Phase 1',phaseStartDate:new Date().toLocaleDateString('en-GB'),
        phaseDuration:56,trainingDays:4,units:'kg',onboarded:true};
    await PG.profile.save(settings);
    document.getElementById('auth-modal').style.display='none';
    document.querySelectorAll('.screen, .header, .nav').forEach(el => el.style.display = '');
    await loadFromStorage();
    populateSettingsFields(settings);
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
    document.getElementById('auth-modal').style.display='none';
    document.querySelectorAll('.screen, .header, .nav').forEach(el => el.style.display = '');
    await loadFromStorage();
    populateSettingsFields(settings);
}

// ===================== THEME =====================
async function toggleTheme() {
    document.body.classList.toggle('dark');
    const toggle=document.getElementById('dark-toggle');if(toggle)toggle.classList.toggle('on');
    renderWeightChart();
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
    if(type==='error')hapticError();
    else if(type==='success'&&typeof hapticSuccess==='function')hapticSuccess();
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
        await updateProfileHeroCard();
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
    const navMap={'screen-home':'nav-home','screen-train':'nav-train','screen-calories':'nav-calories','screen-progress':'nav-progress','screen-profile':'nav-profile'};
    if(navMap[id])document.getElementById(navMap[id]).classList.add('active');
    if(id==='screen-home')updateHome();
    if (id === 'screen-calories') {
      selectedNutritionDate = new Date().toISOString().split('T')[0];
      renderNutritionTab();
    }
    if(id==='screen-progress')renderProgressTab();
    if(id==='screen-profile'){
        void loadSettings();
        globalThis.renderProfileTab?.();
        if (isDevMode) renderDevPanel();
    }
    if (id === 'screen-train') {
      const activeTab = window._activeTrainTab || 'program';
      if (activeTab === 'program') renderProgramTab();
      else if (activeTab === 'exercises') renderExercisesTab();
      else if (activeTab === 'workouts') renderWorkoutsTab();
    }
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
            <div style="color:var(--label-secondary);font-size:13px;margin-bottom:16px;">Create your first routine or unlock a programme with a code</div>
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
                <div style="color:var(--label-secondary);font-size:12px;margin-top:4px;">${r.exercises.length} exercises • ${r.created}${r.duration?' • '+r.duration+' mins':''}</div>
                ${r.programme?`<div style="color:var(--gold);font-size:11px;font-weight:700;margin-top:2px;">⭐ ${r.programme}</div>`:''}
            </div>
            <div style="display:flex;gap:8px;">
                <button class="btn" onclick="startRoutine(${i})" style="flex:1;margin-bottom:0;padding:10px;">▶ Start</button>
                <button type="button" class="btn btn-destructive" onclick="deleteRoutine(${i})" style="padding:10px 14px;width:auto;flex:0;">Delete</button>
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
    list.innerHTML=`<div style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:10px;"><div style="color:var(--text);font-size:11px;font-weight:700;margin-bottom:6px;">SELECTED (${routineSelection.length})</div>${routineSelection.map((ex,i)=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid var(--border);"><span style="color:var(--text);font-size:13px;">${ex}</span><span onclick="removeFromSelection(${i})" style="color:var(--danger);cursor:pointer;font-size:16px;">✕</span></div>`).join('')}</div>`;
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
        const lastPerf=lastEx?`<div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:8px;padding:8px;margin-bottom:10px;"><div style="color:#EA580C;font-size:11px;font-weight:700;margin-bottom:4px;">${t('lastSession')}</div>${lastEx.sets.map((s,i)=>`<div style="color:#9A3412;font-size:12px;">Set ${i+1}: ${s.reps} reps @ ${s.weight}kg</div>`).join('')}</div>`:`<div style="color:var(--label-secondary);font-size:12px;margin-bottom:10px;">${t('noPrevData')}</div>`;
        const pbBadge=pb?`<span class="pr-badge">PB: ${pb.weight}kg×${pb.reps}</span>`:'';
        const targetInfo=ex.targetReps?`<div style="background:#F0FDF4;border-radius:6px;padding:4px 8px;margin-bottom:8px;color:#16A34A;font-size:12px;font-weight:600;">Target: ${ex.targetSets} sets × ${ex.targetReps} reps</div>`:'';
        let setsHTML=`<div class="set-headers"><div class="set-header">SET</div><div class="set-header">REPS</div><div class="set-header">KG</div><div class="set-header"></div></div>`;
        ex.sets.forEach((set,si)=>{
            const isWarmup=set.warmup||false;
            setsHTML+=`<div class="set-row" style="${isWarmup?'opacity:0.6;':''}">
                <div class="set-num" style="cursor:pointer;" onclick="toggleWarmup(${ei},${si})" title="Toggle warm up">${isWarmup?'🔥':''+( si+1)}</div>
                <input class="set-input" type="number" placeholder="Reps" value="${set.reps}" onchange="updateSet(${ei},${si},'reps',this.value)" style="${isWarmup?'border-color:#C2410C;':''}">
                <input class="set-input" type="number" placeholder="KG" value="${set.weight}" onchange="updateSet(${ei},${si},'weight',this.value)" style="${isWarmup?'border-color:#C2410C;':''}">
                <div class="remove-set" onclick="removeSet(${ei},${si})">✕</div>
            </div>
            ${isWarmup?'<div style="color:#C2410C;font-size:10px;font-weight:700;margin-bottom:4px;margin-left:44px;">WARM UP — not counted</div>':''}`;
        });
        block.innerHTML=`<div class="exercise-name" style="justify-content:space-between;">
<span onclick="showExerciseHistory(${JSON.stringify(ex.name)})">${ex.name} ${pbBadge}</span>
<div style="display:flex;gap:6px;align-items:center;">
    ${ei>0?`<button type="button" onclick="moveExercise(${ei},-1)" style="background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer;">↑</button>`:''}
    ${ei<exercises.length-1?`<button type="button" onclick="moveExercise(${ei},1)" style="background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer;">↓</button>`:''}
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
    modal.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:#111111;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;text-align:center;';
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
                <div style="color:#ffffff;font-size:24px;font-weight:800;">${pbs}</div>
                <div style="color:rgba(255,255,255,0.7);font-size:11px;margin-top:4px;">PBs HIT</div>
            </div>
        </div>
        <button type="button" class="completion-btn-progress" style="background:#fff;color:#111111;border:none;border-radius:14px;padding:16px 32px;font-size:16px;font-weight:800;cursor:pointer;width:100%;max-width:400px;">View Progress</button>
        <button type="button" class="completion-btn-home" style="background:transparent;color:rgba(255,255,255,0.8);border:2px solid rgba(255,255,255,0.3);border-radius:14px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer;width:100%;max-width:400px;margin-top:10px;">Back to Home</button>
    `;
    modal.querySelector('.completion-btn-progress').onclick=()=>{modal.remove();showScreen('screen-progress');};
    modal.querySelector('.completion-btn-home').onclick=()=>{modal.remove();showScreen('screen-home');};
    document.body.appendChild(modal);
}

async function saveWorkout() {
    const saveBtnWrap = document.getElementById('save-btn-wrap');
    if (saveBtnWrap) saveBtnWrap.style.display = 'none';
    const now=new Date();
    const date=now.toLocaleDateString('en-GB');
    const isoDate=now.toISOString().split('T')[0];
    const duration=workoutStartTime?Math.floor((Date.now()-workoutStartTime)/60000):0;
    const durationSeconds=workoutStartTime?Math.floor((Date.now()-workoutStartTime)/1000):0;
    clearInterval(workoutTimerInterval);
    const muscle=selectedMuscle;
    const exSnapshot=JSON.parse(JSON.stringify(exercises));
    try{
        const workoutData={
            category:muscle,
            logged_at:isoDate,
            duration_seconds:durationSeconds,
            notes:'',
            exercises:JSON.parse(JSON.stringify(exSnapshot)),
            is_rest_day:false,
            routine_name:''
        };
        console.log('[Workout Save] payload:',JSON.stringify(workoutData,null,2));
        console.log('[Workout Save] exercises type check:', {
            isArray:Array.isArray(workoutData.exercises),
            firstExercise:workoutData.exercises?.[0]||null
        });
        const workoutSaveResult=await PG.workouts.save(workoutData);
        console.log('[Workout Save] result:',workoutSaveResult);
        if(workoutSaveResult?.ok===false||workoutSaveResult?.error){
            console.error('[Workout Save] failed payload:',JSON.stringify(workoutData,null,2));
            console.error('[Workout Save] returned error:',workoutSaveResult?.error||workoutSaveResult);
            showToast('Workout save failed','error',4000);
            return;
        }
        exSnapshot.forEach(ex=>{
            ex.sets.filter(s=>!s.warmup).forEach(set=>{
                const w=parseFloat(set.weight)||0;const r=parseInt(set.reps)||0;
                if(w>0&&r>0&&(!personalBests[ex.name]||w>personalBests[ex.name].weight))
                    personalBests[ex.name]={weight:w,reps:r,date};
            });
        });
        workoutHistory.unshift({
            muscle:selectedMuscle,
            exercises:JSON.parse(JSON.stringify(exSnapshot)),
            date,
            duration,
            durationDisplay:duration>0?duration+'min':'—'
        });
        exercises=[];selectedMuscle='';firstSetLogged=false;
        document.getElementById('exercise-log').innerHTML='';
        document.getElementById('save-btn').style.display='none';
        const timerBar=document.getElementById('workout-timer-bar');if(timerBar)timerBar.style.display='none';
        await saveToStorage({skipWorkouts:true});
        checkBadges();
        showCompletionScreen(muscle,duration,exSnapshot);
        showToast('Workout saved!','success',2200);
    }catch(err){
        console.error('[Workout Save] exception:',err);
        showToast('Workout save failed','error',4000);
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
    const now=new Date();
    const date=now.toLocaleDateString('en-GB');
    const payload={
        type:currentCardioType||'Cardio',
        duration_minutes:parseFloat(document.getElementById('cardio-duration').value)||0,
        distance_km:parseFloat(document.getElementById('cardio-distance').value)||0,
        intensity:document.getElementById('cardio-intensity').value||'moderate',
        notes:document.getElementById('cardio-notes').value||'',
        logged_at:now.toISOString().split('T')[0]
    };
    cardioHistory.unshift({type:payload.type,duration:payload.duration_minutes,distance:payload.distance_km,intensity:payload.intensity,notes:payload.notes,date});
    try{
        const saveResult=await PG.cardio.save(payload);
        if(saveResult?.ok===false||saveResult?.error){
            throw saveResult.error||new Error('Cardio save failed');
        }
        await saveToStorage({skipWorkouts:true,skipNutrition:true});
        showScreen('screen-progress');
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('saveCardio:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

// ===================== NUTRITION =====================
async function persistNutritionState(reason, overrides={}) {
    const today=new Date().toLocaleDateString('en-GB');
    const todayMeals=meals.filter(m=>m.date===today);
    let totalCal=0,totalProtein=0,totalCarbs=0,totalFat=0;
    todayMeals.forEach(meal=>meal.foods.forEach(f=>{
        totalCal+=Number(f.cal)||0;
        totalProtein+=Number(f.protein)||0;
        totalCarbs+=Number(f.carbs)||0;
        totalFat+=Number(f.fat)||0;
    }));
    const currentNutrition=await PG.nutrition.getToday()||{};
    const hydrationLitres=Math.round((parseFloat(overrides.water_litres??overrides.water??currentNutrition.water_litres??currentNutrition.water??0)||0)*100)/100;
    const payload={
        ...currentNutrition,
        ...overrides,
        date:today,
        meals,
        totals:{
            calories:Math.round(totalCal),
            protein:Math.round(totalProtein*10)/10,
            carbs:Math.round(totalCarbs*10)/10,
            fat:Math.round(totalFat*10)/10
        },
        steps:parseInt(overrides.steps??currentNutrition.steps??0,10)||0,
        water:hydrationLitres,
        water_litres:hydrationLitres
    };
    console.log(`[Nutrition Save] ${reason} payload:`,payload);
    const saveResult=await PG.nutrition.save(payload);
    if (typeof updateHome === 'function') updateHome();
    console.log(`[Nutrition Save] ${reason} result:`,saveResult);
    return saveResult;
}

function getWaterLitres(nutritionRow={}) {
    return Math.round((parseFloat(nutritionRow?.water_litres ?? nutritionRow?.water ?? 0) || 0) * 100) / 100;
}

function calculateNutritionTargets() {
  const w = parseFloat(settings.weight) || 75;
  const h = parseFloat(settings.height) || 175;
  const age = parseInt(settings.age) || 25;
  const gender = settings.gender || 'male';
  const goal = settings.goal || 'fitness';
  const activityLevel = settings.trainingDays >= 5 ? 1.725 : settings.trainingDays >= 3 ? 1.55 : 1.375;

  let bmr = gender === 'male'
    ? (10 * w) + (6.25 * h) - (5 * age) + 5
    : (10 * w) + (6.25 * h) - (5 * age) - 161;

  const tdee = Math.round(bmr * activityLevel);
  const goalMap = { fatloss: tdee - 500, muscle: tdee + 300, hybrid: tdee - 200, fitness: tdee };
  const calTarget = goalMap[goal] || tdee || 2000;
  const proteinTarget = Math.round(w * 2);
  const fatsTarget = Math.round((calTarget * 0.25) / 9);
  const carbsTarget = Math.round((calTarget - (proteinTarget * 4) - (fatsTarget * 9)) / 4);

  return {
    calTarget: calTarget || 2000,
    proteinTarget: proteinTarget || 150,
    carbsTarget: carbsTarget || 250,
    fatsTarget: fatsTarget || 70,
    waterTarget: 3000
  };
}

async function loadNutritionForDate(dateISO) {
  try {
    const { data, error } = await PG.db
      .from('nutrition_logs')
      .select('*')
      .eq('user_id', (await PG.db.auth.getUser()).data.user.id)
      .eq('logged_at', dateISO)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      todayNutrition = {
        calories: data.total_calories || 0,
        protein: parseFloat(data.total_protein_g) || 0,
        carbs: parseFloat(data.total_carbs_g) || 0,
        fats: parseFloat(data.total_fat_g) || 0,
        water_litres: parseFloat(data.water_litres) || 0,
        meals: data.meals || [],
        supplements: data.supplements || [],
        sleep_hours: parseFloat(data.sleep_hours) || 0
      };
    } else {
      todayNutrition = { calories: 0, protein: 0, carbs: 0, fats: 0, water_litres: 0, meals: [], supplements: [], sleep_hours: 0 };
    }
  } catch(e) {
    console.error('loadNutritionForDate error:', e);
    todayNutrition = { calories: 0, protein: 0, carbs: 0, fats: 0, water_litres: 0, meals: [], supplements: [], sleep_hours: 0 };
  }
}

async function saveNutritionForDate(dateISO) {
  try {
    const userId = (await PG.db.auth.getUser()).data.user.id;
    const totals = todayNutrition.meals.reduce((acc, meal) => {
      (meal.foods || []).forEach(f => {
        acc.calories += f.calories || 0;
        acc.protein += f.protein || 0;
        acc.carbs += f.carbs || 0;
        acc.fats += f.fats || 0;
      });
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

    todayNutrition.calories = totals.calories;
    todayNutrition.protein = totals.protein;
    todayNutrition.carbs = totals.carbs;
    todayNutrition.fats = totals.fats;

    const { error } = await PG.db
      .from('nutrition_logs')
      .upsert({
        user_id: userId,
        logged_at: dateISO,
        total_calories: Math.round(totals.calories),
        total_protein_g: totals.protein,
        total_carbs_g: totals.carbs,
        total_fat_g: totals.fats,
        water_litres: todayNutrition.water_litres,
        meals: todayNutrition.meals,
        supplements: todayNutrition.supplements,
        sleep_hours: todayNutrition.sleep_hours || 0
      }, { onConflict: 'user_id,logged_at' });

    if (error) throw error;
    if (typeof updateHome === 'function') updateHome();
  } catch(e) {
    console.error('saveNutritionForDate error:', e);
    showToast('Save failed', 'error', 2000);
  }
}

function formatDateUK(isoDate) {
  const [y, m, d] = isoDate.split('-');
  const today = new Date().toISOString().split('T')[0];
  if (isoDate === today) return 'Today';
  return `${d}/${m}/${y}`;
}

async function renderNutritionTab() {
  const container = document.getElementById('nutrition-tab-content');
  if (!container) return;

  await loadNutritionForDate(selectedNutritionDate);
  const targets = calculateNutritionTargets();
  const nd = todayNutrition;

  const calPct = Math.min(100, Math.round((nd.calories / targets.calTarget) * 100));
  const protPct = Math.min(100, Math.round((nd.protein / targets.proteinTarget) * 100));
  const carbPct = Math.min(100, Math.round((nd.carbs / targets.carbsTarget) * 100));
  const fatPct = Math.min(100, Math.round((nd.fats / targets.fatsTarget) * 100));
  const calRemaining = Math.max(0, targets.calTarget - nd.calories);
  const waterLitres = nd.water_litres || 0;
  const waterTargetL = (targets.waterTarget / 1000);

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  container.innerHTML = `
    <div style="padding:16px;display:flex;flex-direction:column;gap:14px;">

      <!-- DATE SELECTOR -->
      <div style="display:flex;align-items:center;justify-content:space-between;background:var(--card);border-radius:14px;padding:12px 16px;">
        <button onclick="changeNutritionDate(-1)" style="background:none;border:none;font-size:20px;cursor:pointer;color:var(--text);">‹</button>
        <p style="font-size:14px;font-weight:700;color:var(--text);">${formatDateUK(selectedNutritionDate)}</p>
        <button onclick="changeNutritionDate(1)" style="background:none;border:none;font-size:20px;cursor:pointer;color:var(--text);">›</button>
      </div>

      <!-- CALORIES CARD -->
      <div style="background:var(--card);border-radius:20px;padding:20px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
          <div>
            <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:4px;">CALORIES</p>
            <p style="font-size:32px;font-weight:800;color:var(--text);">${Math.round(nd.calories)}<span style="font-size:16px;color:var(--label-secondary);font-weight:500;"> / ${targets.calTarget}</span></p>
            <p style="font-size:13px;color:var(--label-secondary);">${calRemaining > 0 ? calRemaining + ' kcal remaining' : 'Goal reached! 🎉'}</p>
          </div>
          <div style="position:relative;width:64px;height:64px;">
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="var(--border)" stroke-width="6"/>
              <circle cx="32" cy="32" r="28" fill="none" stroke="#FFD60A" stroke-width="6"
                stroke-dasharray="${Math.round(calPct * 1.759)} 175.9"
                stroke-dashoffset="44" stroke-linecap="round" transform="rotate(-90 32 32)"/>
            </svg>
            <p style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:var(--text);">${calPct}%</p>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
              <span style="font-size:11px;font-weight:700;color:#6366F1;">PROTEIN</span>
              <span style="font-size:11px;color:var(--label-secondary);">${Math.round(nd.protein)}g</span>
            </div>
            <div style="background:var(--border);border-radius:4px;height:4px;">
              <div style="background:#6366F1;height:4px;border-radius:4px;width:${protPct}%;"></div>
            </div>
            <p style="font-size:10px;color:var(--label-secondary);margin-top:2px;">/ ${targets.proteinTarget}g</p>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
              <span style="font-size:11px;font-weight:700;color:#22C55E;">CARBS</span>
              <span style="font-size:11px;color:var(--label-secondary);">${Math.round(nd.carbs)}g</span>
            </div>
            <div style="background:var(--border);border-radius:4px;height:4px;">
              <div style="background:#22C55E;height:4px;border-radius:4px;width:${carbPct}%;"></div>
            </div>
            <p style="font-size:10px;color:var(--label-secondary);margin-top:2px;">/ ${targets.carbsTarget}g</p>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
              <span style="font-size:11px;font-weight:700;color:#FF9F0A;">FATS</span>
              <span style="font-size:11px;color:var(--label-secondary);">${Math.round(nd.fats)}g</span>
            </div>
            <div style="background:var(--border);border-radius:4px;height:4px;">
              <div style="background:#FF9F0A;height:4px;border-radius:4px;width:${fatPct}%;"></div>
            </div>
            <p style="font-size:10px;color:var(--label-secondary);margin-top:2px;">/ ${targets.fatsTarget}g</p>
          </div>
        </div>
      </div>

      <!-- MEALS -->
      <div style="background:var(--card);border-radius:20px;padding:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);">MEALS</p>
          <button onclick="openAddMealModal()" style="background:#FFD60A;border:none;border-radius:10px;padding:6px 14px;font-size:12px;font-weight:800;color:#111;cursor:pointer;">+ Add Food</button>
        </div>
        ${mealTypes.map(mealType => {
          const meal = nd.meals.find(m => m.name === mealType);
          const foods = meal?.foods || [];
          const mealCals = foods.reduce((a, f) => a + (f.calories || 0), 0);
          return `
            <div style="margin-bottom:16px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <p style="font-size:14px;font-weight:700;color:var(--text);">${mealType}</p>
                <p style="font-size:12px;color:var(--label-secondary);">${foods.length > 0 ? Math.round(mealCals) + ' kcal' : ''}</p>
              </div>
              ${foods.length === 0
                ? `<p style="font-size:12px;color:var(--label-secondary);padding:8px 0;">No foods logged</p>`
                : foods.map((f, fi) => `
                  <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);">
                    <div>
                      <p style="font-size:13px;font-weight:600;color:var(--text);">${f.name}</p>
                      <p style="font-size:11px;color:var(--label-secondary);">${Math.round(f.calories)} kcal · P:${Math.round(f.protein)}g C:${Math.round(f.carbs)}g F:${Math.round(f.fats)}g</p>
                    </div>
                    <button onclick="deleteFoodItem('${mealType}', ${fi})" style="background:none;border:none;font-size:16px;cursor:pointer;color:var(--label-secondary);">×</button>
                  </div>
                `).join('')
              }
            </div>
          `;
        }).join('')}
        ${nd.meals.length === 0 && !nd.meals.some(m => m.foods?.length > 0)
          ? '' : ''}
      </div>

      <!-- WATER -->
      <div style="background:var(--card);border-radius:20px;padding:20px;">
        <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:12px;">WATER</p>
        <p style="font-size:28px;font-weight:800;color:var(--text);margin-bottom:4px;">${waterLitres.toFixed(1)}L <span style="font-size:14px;color:var(--label-secondary);font-weight:500;">/ ${waterTargetL}L</span></p>
        <div style="background:var(--border);border-radius:8px;height:8px;margin-bottom:16px;">
          <div style="background:#38BDF8;height:8px;border-radius:8px;width:${Math.min(100, Math.round((waterLitres / waterTargetL) * 100))}%;transition:width 0.3s;"></div>
        </div>
        <div style="display:flex;gap:8px;">
          <button onclick="addWaterNutrition(250)" style="flex:1;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;">+250ml</button>
          <button onclick="addWaterNutrition(500)" style="flex:1;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;">+500ml</button>
          <button onclick="addWaterNutrition(1000)" style="flex:1;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;">+1L</button>
        </div>
      </div>

      <!-- SUPPLEMENTS -->
      <div style="background:var(--card);border-radius:20px;padding:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);">SUPPLEMENTS</p>
          <button onclick="openAddSupplementModal()" style="background:var(--bg);border:1.5px solid var(--border);border-radius:10px;padding:6px 14px;font-size:12px;font-weight:700;color:var(--text);cursor:pointer;">+ Add</button>
        </div>
        <div id="supplements-list">
          ${renderSupplementsList()}
        </div>
      </div>

      <!-- MEAL IDEAS -->
      <div style="background:var(--card);border-radius:20px;padding:20px;">
        <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:12px;">MEAL IDEAS</p>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${MEAL_IDEAS.map(idea => `
            <div onclick="prefillMealIdea('${idea.name}')" style="display:flex;justify-content:space-between;align-items:center;background:var(--bg);border-radius:14px;padding:14px;cursor:pointer;">
              <div>
                <p style="font-size:14px;font-weight:700;color:var(--text);">${idea.name}</p>
                <p style="font-size:12px;color:var(--label-secondary);">${idea.calories} kcal · P:${idea.protein}g C:${idea.carbs}g F:${idea.fats}g</p>
              </div>
              <span style="color:var(--label-secondary);">›</span>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

const MEAL_IDEAS = [
  { name: 'High Protein Chicken Bowl', calories: 520, protein: 48, carbs: 45, fats: 12 },
  { name: 'Salmon & Rice Bowl', calories: 580, protein: 42, carbs: 52, fats: 16 },
  { name: 'Protein Smoothie', calories: 380, protein: 35, carbs: 38, fats: 8 },
  { name: 'Greek Omelette', calories: 340, protein: 28, carbs: 8, fats: 22 },
  { name: 'Tuna Pasta', calories: 490, protein: 38, carbs: 58, fats: 9 }
];

window.changeNutritionDate = async function(direction) {
  const date = new Date(selectedNutritionDate);
  date.setDate(date.getDate() + direction);
  const today = new Date();
  today.setHours(23,59,59,999);
  if (date > today) return;
  selectedNutritionDate = date.toISOString().split('T')[0];
  await renderNutritionTab();
};

window.openAddMealModal = function(prefill) {
  const existing = document.getElementById('add-meal-modal');
  if (existing) existing.remove();
  
  const modal = document.createElement('div');
  modal.id = 'add-meal-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:60000;display:flex;align-items:flex-end;justify-content:center;';
  modal.innerHTML = `
    <div style="background:var(--card);border-radius:24px 24px 0 0;padding:28px 24px 40px;width:100%;max-width:480px;max-height:90vh;overflow-y:auto;">
      <h3 style="font-size:18px;font-weight:800;margin-bottom:20px;">Add Food</h3>
      
      <p style="font-size:12px;font-weight:700;color:var(--label-secondary);margin-bottom:8px;">MEAL</p>
      <select id="meal-type-select" style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);margin-bottom:14px;box-sizing:border-box;">
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Snacks</option>
      </select>

      <input id="food-name" type="text" placeholder="Food name" value="${prefill?.name || ''}"
        style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);margin-bottom:14px;box-sizing:border-box;">

      <p style="font-size:12px;font-weight:700;color:var(--label-secondary);margin-bottom:8px;">ENTRY TYPE</p>
      <div style="display:flex;gap:8px;margin-bottom:14px;">
        <button onclick="setEntryType('serving', this)" id="type-serving" style="flex:1;background:#FFD60A;color:#111;border:none;border-radius:10px;padding:10px;font-size:13px;font-weight:700;cursor:pointer;">Per Serving</button>
        <button onclick="setEntryType('100g', this)" id="type-100g" style="flex:1;background:var(--bg);color:var(--text);border:1.5px solid var(--border);border-radius:10px;padding:10px;font-size:13px;font-weight:700;cursor:pointer;">Per 100g</button>
      </div>

      <div id="grams-row" style="display:none;margin-bottom:14px;">
        <p style="font-size:12px;font-weight:700;color:var(--label-secondary);margin-bottom:8px;">GRAMS EATEN</p>
        <input id="food-grams" type="number" placeholder="e.g. 150" oninput="recalcPer100g()"
          style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);box-sizing:border-box;">
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;">
        <div>
          <p style="font-size:11px;font-weight:700;color:var(--label-secondary);margin-bottom:6px;">CALORIES</p>
          <input id="food-calories" type="number" placeholder="0" value="${prefill?.calories || ''}"
            style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);box-sizing:border-box;">
        </div>
        <div>
          <p style="font-size:11px;font-weight:700;color:#6366F1;margin-bottom:6px;">PROTEIN (g)</p>
          <input id="food-protein" type="number" placeholder="0" value="${prefill?.protein || ''}"
            style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);box-sizing:border-box;">
        </div>
        <div>
          <p style="font-size:11px;font-weight:700;color:#22C55E;margin-bottom:6px;">CARBS (g)</p>
          <input id="food-carbs" type="number" placeholder="0" value="${prefill?.carbs || ''}"
            style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);box-sizing:border-box;">
        </div>
        <div>
          <p style="font-size:11px;font-weight:700;color:#FF9F0A;margin-bottom:6px;">FATS (g)</p>
          <input id="food-fats" type="number" placeholder="0" value="${prefill?.fats || ''}"
            style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);box-sizing:border-box;">
        </div>
      </div>

      <button onclick="saveFoodItem()" style="width:100%;background:#FFD60A;border:none;border-radius:14px;padding:16px;font-size:15px;font-weight:800;color:#111;cursor:pointer;margin-bottom:8px;">Save Food</button>
      <button onclick="document.getElementById('add-meal-modal').remove()" style="width:100%;background:none;border:none;padding:12px;font-size:14px;color:var(--label-secondary);cursor:pointer;">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);
  window._entryType = 'serving';
};

window.setEntryType = function(type, el) {
  window._entryType = type;
  document.getElementById('type-serving').style.background = type === 'serving' ? '#FFD60A' : 'var(--bg)';
  document.getElementById('type-serving').style.color = type === 'serving' ? '#111' : 'var(--text)';
  document.getElementById('type-100g').style.background = type === '100g' ? '#FFD60A' : 'var(--bg)';
  document.getElementById('type-100g').style.color = type === '100g' ? '#111' : 'var(--text)';
  document.getElementById('grams-row').style.display = type === '100g' ? 'block' : 'none';
};

window.recalcPer100g = function() {
  const grams = parseFloat(document.getElementById('food-grams')?.value) || 0;
  const factor = grams / 100;
  const cals = parseFloat(document.getElementById('food-calories')?.value) || 0;
  const prot = parseFloat(document.getElementById('food-protein')?.value) || 0;
  const carbs = parseFloat(document.getElementById('food-carbs')?.value) || 0;
  const fats = parseFloat(document.getElementById('food-fats')?.value) || 0;
  if (factor > 0) {
    document.getElementById('food-calories').value = Math.round(cals * factor);
    document.getElementById('food-protein').value = Math.round(prot * factor * 10) / 10;
    document.getElementById('food-carbs').value = Math.round(carbs * factor * 10) / 10;
    document.getElementById('food-fats').value = Math.round(fats * factor * 10) / 10;
  }
};

window.saveFoodItem = async function() {
  const name = document.getElementById('food-name')?.value?.trim();
  const calories = parseFloat(document.getElementById('food-calories')?.value) || 0;
  const protein = parseFloat(document.getElementById('food-protein')?.value) || 0;
  const carbs = parseFloat(document.getElementById('food-carbs')?.value) || 0;
  const fats = parseFloat(document.getElementById('food-fats')?.value) || 0;
  const mealType = document.getElementById('meal-type-select')?.value || 'Breakfast';

  if (!name) { showToast('Enter food name', 'error', 2000); return; }

  const food = { name, calories, protein, carbs, fats };
  let meal = todayNutrition.meals.find(m => m.name === mealType);
  if (!meal) {
    meal = { id: Date.now(), name: mealType, foods: [] };
    todayNutrition.meals.push(meal);
  }
  meal.foods.push(food);

  await saveNutritionForDate(selectedNutritionDate);
  document.getElementById('add-meal-modal').remove();
  showToast('Food logged!', 'success', 1500);
  await renderNutritionTab();
};

window.deleteFoodItem = async function(mealType, foodIndex) {
  const meal = todayNutrition.meals.find(m => m.name === mealType);
  if (!meal) return;
  meal.foods.splice(foodIndex, 1);
  if (meal.foods.length === 0) {
    todayNutrition.meals = todayNutrition.meals.filter(m => m.name !== mealType);
  }
  await saveNutritionForDate(selectedNutritionDate);
  await renderNutritionTab();
};

window.addWaterNutrition = async function(ml) {
  const addLitres = ml / 1000;
  todayNutrition.water_litres = Math.round(((todayNutrition.water_litres || 0) + addLitres) * 100) / 100;
  await saveNutritionForDate(selectedNutritionDate);
  await renderNutritionTab();
  showToast(`+${ml}ml added`, 'success', 1200);
};

window.prefillMealIdea = function(name) {
  const idea = MEAL_IDEAS.find(m => m.name === name);
  if (!idea) return;
  openAddMealModal(idea);
};

const DEFAULT_SUPPLEMENTS = [
  { id: 's1', name: 'Creatine', dose: '5g' },
  { id: 's2', name: 'Whey Protein', dose: '1 scoop' },
  { id: 's3', name: 'Omega 3', dose: '1 capsule' },
  { id: 's4', name: 'Vitamin D', dose: '1 capsule' }
];

function getUserSupplements() {
  return settings.userSupplements || DEFAULT_SUPPLEMENTS;
}

function getTodaySupplementLog() {
  return todayNutrition.supplements || [];
}

function renderSupplementsList() {
  const supplements = getUserSupplements();
  const log = getTodaySupplementLog();
  if (supplements.length === 0) {
    return `<p style="font-size:13px;color:var(--label-secondary);">No supplements added yet.</p>`;
  }
  return supplements.map(s => {
    const taken = log.find(l => l.supplementId === s.id)?.taken || false;
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border);">
        <div>
          <p style="font-size:14px;font-weight:${taken ? '700' : '600'};color:${taken ? 'var(--text)' : 'var(--label-secondary)'};">${s.name}</p>
          <p style="font-size:12px;color:var(--label-secondary);">${s.dose}</p>
        </div>
        <button onclick="toggleSupplement('${s.id}')" style="
          background:${taken ? '#30D158' : 'var(--bg)'};
          border:1.5px solid ${taken ? '#30D158' : 'var(--border)'};
          border-radius:20px;
          padding:6px 16px;
          font-size:12px;
          font-weight:700;
          color:${taken ? '#fff' : 'var(--label-secondary)'};
          cursor:pointer;
          transition:all 0.2s;
        ">${taken ? '✓ Taken' : 'Take'}</button>
      </div>
    `;
  }).join('');
}

window.toggleSupplement = async function(supplementId) {
  let log = todayNutrition.supplements || [];
  const existing = log.find(l => l.supplementId === supplementId);
  if (existing) {
    existing.taken = !existing.taken;
    existing.timeTaken = existing.taken ? new Date().toISOString() : null;
  } else {
    log.push({ supplementId, taken: true, timeTaken: new Date().toISOString() });
  }
  todayNutrition.supplements = log;
  await saveNutritionForDate(selectedNutritionDate);
  const container = document.getElementById('supplements-list');
  if (container) container.innerHTML = renderSupplementsList();
};

window.openAddSupplementModal = function() {
  const existing = document.getElementById('add-supplement-modal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'add-supplement-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:60000;display:flex;align-items:flex-end;justify-content:center;';
  modal.innerHTML = `
    <div style="background:var(--card);border-radius:24px 24px 0 0;padding:28px 24px 40px;width:100%;max-width:480px;">
      <h3 style="font-size:18px;font-weight:800;margin-bottom:20px;">Add Supplement</h3>
      <input id="supp-name" type="text" placeholder="Supplement name"
        style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);margin-bottom:12px;box-sizing:border-box;">
      <div style="display:flex;gap:10px;margin-bottom:20px;">
        <input id="supp-dose" type="text" placeholder="Dose (e.g. 5)"
          style="flex:1;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);box-sizing:border-box;">
        <select id="supp-unit" style="flex:1;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);">
          <option>g</option>
          <option>mg</option>
          <option>capsule</option>
          <option>scoop</option>
          <option>tablet</option>
        </select>
      </div>
      <button onclick="saveNewSupplement()" style="width:100%;background:#FFD60A;border:none;border-radius:14px;padding:16px;font-size:15px;font-weight:800;color:#111;cursor:pointer;margin-bottom:8px;">Add Supplement</button>
      <button onclick="document.getElementById('add-supplement-modal').remove()" style="width:100%;background:none;border:none;padding:12px;font-size:14px;color:var(--label-secondary);cursor:pointer;">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);
};

window.saveNewSupplement = async function() {
  const name = document.getElementById('supp-name')?.value?.trim();
  const dose = document.getElementById('supp-dose')?.value?.trim();
  const unit = document.getElementById('supp-unit')?.value || 'g';
  if (!name || !dose) { showToast('Fill in all fields', 'error', 2000); return; }
  const newSupp = { id: 'supp_' + Date.now(), name, dose: dose + ' ' + unit };
  if (!settings.userSupplements) settings.userSupplements = [...DEFAULT_SUPPLEMENTS];
  settings.userSupplements.push(newSupp);
  await PG.profile.save(settings);
  document.getElementById('add-supplement-modal').remove();
  showToast('Supplement added', 'success', 1500);
  const container = document.getElementById('supplements-list');
  if (container) container.innerHTML = renderSupplementsList();
};

function getNutritionViewDateStr(){
    const d=new Date();
    d.setDate(d.getDate()+nutritionDateOffset);
    return d.toLocaleDateString('en-GB');
}
function nutritionDayShift(delta){
    nutritionDateOffset+=delta;
    loadNutrition();
    renderMeals();
}
function nutritionJumpToday(){
    nutritionDateOffset=0;
    loadNutrition();
    renderMeals();
}

async function addMeal() {
    const today=getNutritionViewDateStr();
    const mealCount=meals.filter(m=>m.date===today).length;
    const presetName=mealPresets[mealCount]||'Meal '+(mealCount+1);
    const name=prompt(t('mealName'),presetName)||presetName;
    meals.push({name,date:today,foods:[]});
    try{
        await persistNutritionState('addMeal');
        console.log('[Nutrition Save] addMeal workouts/progress sync');
        await saveToStorage({skipWorkouts:true,skipNutrition:true});
        renderMeals();
        await loadNutrition();
        await updateHome();
    }catch(err){
        console.error('addMeal:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

function renderMeals() {
    const today=getNutritionViewDateStr();
    const todayMeals=meals.filter(m=>m.date===today);
    const container=document.getElementById('meals-container');if(!container)return;
    if(todayMeals.length===0){
        container.innerHTML=`<div style="text-align:center;padding:32px 16px;">
            <div style="font-size:48px;margin-bottom:12px;">🥗</div>
            <div style="color:var(--text);font-size:16px;font-weight:700;margin-bottom:8px;">No meals logged today</div>
            <div style="color:var(--label-secondary);font-size:13px;margin-bottom:16px;">Start tracking your nutrition to hit your targets</div>
            <button class="btn" onclick="addMeal()">+ Add First Meal</button>
        </div>`;
        return;
    }
    container.innerHTML=todayMeals.map(meal=>{
        const mealIndex=meals.indexOf(meal);
        const foods=Array.isArray(meal.foods)?meal.foods:[];
        const totalCal=foods.reduce((s,f)=>s+(Number(f.cal)||0),0);
        const totalProt=foods.reduce((s,f)=>s+(Number(f.protein)||0),0).toFixed(1);
        const totalCarbs=foods.reduce((s,f)=>s+(Number(f.carbs)||0),0).toFixed(1);
        const totalFat=foods.reduce((s,f)=>s+(Number(f.fat)||0),0).toFixed(1);
        const foodRows=foods.map((f,fi)=>`<div class="food-entry"><div class="food-entry-info"><div class="food-entry-name">${f.name} (${f.portion}${f.isLiquid?'ml':'g'})</div><div class="food-entry-macros">P: ${f.protein}g • C: ${f.carbs}g • F: ${f.fat}g</div></div><div class="food-entry-cals">${f.cal} kcal</div><div class="food-entry-delete" onclick="deleteFoodFromMeal(${mealIndex},${fi})">✕</div></div>`).join('');
        return `<div class="meal-block"><div class="meal-header"><div class="meal-thumb" aria-hidden="true"></div><div class="meal-name">${meal.name}</div></div><div class="meal-actions" role="group" aria-label="Meal actions">
    <button type="button" class="meal-action-btn meal-action-btn--primary" onclick="openFoodModal(${mealIndex})">${t('addFood')}</button>
    <button type="button" class="meal-action-btn meal-action-btn--template" onclick="currentMealIndex=${mealIndex};saveMealTemplate()">${t('saveAsTemplate')}</button>
    <button type="button" class="meal-action-btn meal-action-btn--remove" onclick="deleteMeal(${mealIndex})">${t('removeMeal')}</button>
</div><div class="meal-food-list">${foodRows}</div><div class="meal-totals-row">Total: ${totalCal} kcal • P:${totalProt}g • C:${totalCarbs}g • F:${totalFat}g</div></div>`;
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
    const today=getNutritionViewDateStr();
    const todayMeals=meals.filter(m=>m.date===today);
    let totalCal=0,totalProtein=0,totalCarbs=0,totalFat=0;
    todayMeals.forEach(meal=>meal.foods.forEach(f=>{totalCal+=f.cal;totalProtein+=f.protein;totalCarbs+=f.carbs;totalFat+=f.fat;}));
    const el=document.getElementById('food-modal-totals');
    if(el)el.innerHTML=`Today so far: <strong>${totalCal} kcal</strong> • P: ${totalProtein.toFixed(0)}g • C: ${totalCarbs.toFixed(0)}g • F: ${totalFat.toFixed(0)}g`;
}

function closeFoodModal(){document.getElementById('food-modal').style.display='none';selectedFood=null;document.getElementById('food-portion').style.display='none';}

function setFoodFilter(filter,btn){
    const allowedFilters=['all','protein','carbs','fats','veg','dairy','snacks','drinks'];
    foodFilter=allowedFilters.includes(filter)?filter:'all';
    const filterBar=document.getElementById('food-filter-bar');
    if(filterBar){
        filterBar.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
        if(btn) btn.classList.add('active');
        else {
            const fallbackBtn=filterBar.querySelector(`[onclick*="setFoodFilter('${foodFilter}'"]`);
            if(fallbackBtn) fallbackBtn.classList.add('active');
        }
    }
    filterFoods();
}

async function filterFoods() {
    const search=(document.getElementById('food-search').value||'').toLowerCase();
    const diet=settings.diet||'standard';
    const list=document.getElementById('food-list');if(!list)return;
    let foods=[];
    const categoryMap={all:'all',protein:'protein',carbs:'carbs',fats:'fats',veg:'veg',dairy:'dairy',snacks:'snacks',drinks:'drinks'};
    const selectedCategory=categoryMap[foodFilter]||'all';
    const categories=selectedCategory==='all'?Object.keys(foodDB):[selectedCategory];
    categories.forEach(cat=>{
        if(foodDB[cat]){
            foodDB[cat].forEach(food=>{
                const matchesDiet=(diet==='standard'||food.tags.includes(diet));
                const matchesSearch=food.name.toLowerCase().includes(search);
                if(matchesDiet&&matchesSearch)foods.push({...food,category:cat});
            });
        }
    });

    // Recent foods at top when no search
    let recentHTML='';
    if(!search&&selectedCategory==='all'){
        const todayNutrition=await PG.nutrition.getToday();
        const recent=todayNutrition?.recentFoods||[];
        if(recent.length>0){
            recentHTML=`<div style="margin-bottom:12px;">
                <div style="color:var(--label-secondary);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Recent & Common</div>
                ${recent.slice(0,5).map(f=>`<div style="padding:10px 0;border-bottom:1px solid var(--border);cursor:pointer;" onclick='selectFood(${JSON.stringify(f).replace(/'/g,"&#39;")})'>
                    <div style="font-weight:600;color:var(--text);font-size:13px;">${f.name}</div>
                    <div style="margin-top:4px;"><span class="macro-pill">${f.cal} kcal</span><span class="macro-pill protein">P: ${f.protein}g</span><span class="macro-pill carbs">C: ${f.carbs}g</span><span class="macro-pill fat">F: ${f.fat}g</span></div>
                </div>`).join('')}
                <div style="color:var(--label-secondary);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin:12px 0 8px;">All Foods</div>
            </div>`;
        }
    }

    list.innerHTML=recentHTML+( foods.map(f=>`<div style="padding:10px 0;border-bottom:1px solid var(--border);cursor:pointer;" onclick='selectFood(${JSON.stringify(f).replace(/'/g,"&#39;")})'>
        <div style="font-weight:600;color:var(--text);font-size:13px;">${f.name}</div>
        <div style="margin-top:4px;"><span class="macro-pill">${f.cal} kcal</span><span class="macro-pill protein">P: ${f.protein}g</span><span class="macro-pill carbs">C: ${f.carbs}g</span><span class="macro-pill fat">F: ${f.fat}g</span>${f.water?`<span class="macro-pill" style="background:#ecfeff;color:#0e7490;border-color:#a5f3fc;">💧 +${f.water}L</span>`:''}</div>
    </div>`).join('')||`<p style="color:var(--label-secondary);padding:12px 0;">${t('noFoodsFound')}</p>`);
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
        await persistNutritionState('addFoodEntry recentFoods', {recentFoods:recent.slice(0,10)});
        if(selectedFood.water){
            const nd=await PG.nutrition.getToday()||{steps:0,water:0,restDay:false};
            const servingMl=Math.max(1,Math.round(selectedFood.water*1000));
            const addWater=selectedFood.water*(portion/servingMl);
            nd.water=Math.round(((parseFloat(nd.water)||0)+addWater)*100)/100;
            await persistNutritionState('addFoodEntry hydration', {water:nd.water});
        }
        meals[currentMealIndex].foods.push(entry);
        await persistNutritionState('addFoodEntry meals update');
        console.log('[Nutrition Save] addFoodEntry workouts/progress sync');
        await saveToStorage({skipWorkouts:true,skipNutrition:true});
        updateFoodModalTotals();closeFoodModal();renderMeals();loadNutrition();updateHome();
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('addFoodEntry:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

async function deleteFoodFromMeal(mealIndex,foodIndex){
    if(!meals[mealIndex]||!Array.isArray(meals[mealIndex].foods))return;
    meals[mealIndex].foods.splice(foodIndex,1);
    try{
        await persistNutritionState('deleteFoodFromMeal');
        console.log('[Nutrition Save] deleteFoodFromMeal workouts/progress sync');
        await saveToStorage({skipWorkouts:true,skipNutrition:true});
        renderMeals();
        await loadNutrition();
        await updateHome();
        if(document.getElementById('food-modal')?.style.display==='block')updateFoodModalTotals();
        showToast('Food removed','success',1800);
    }catch(err){
        console.error('deleteFoodFromMeal:',err);
        showToast('Delete failed — please try again','error',3000);
    }
}

async function deleteMeal(mealIndex){
    if(!meals[mealIndex])return;
    if(!confirm('Remove this meal?'))return;
    meals.splice(mealIndex,1);
    try{
        await persistNutritionState('deleteMeal');
        console.log('[Nutrition Save] deleteMeal workouts/progress sync');
        await saveToStorage({skipWorkouts:true,skipNutrition:true});
        renderMeals();
        await loadNutrition();
        await updateHome();
        if(document.getElementById('food-modal')?.style.display==='block')updateFoodModalTotals();
        showToast('Meal removed','success',1800);
    }catch(err){
        console.error('deleteMeal:',err);
        showToast('Delete failed — please try again','error',3000);
    }
}

async function saveStepsWater() {
    const today=new Date().toLocaleDateString('en-GB');
    let data=await PG.nutrition.getToday()||{steps:0,water:0};
    const steps=document.getElementById('input-steps-train').value;
    const water=document.getElementById('input-water').value;
    if(steps)data.steps=parseInt(steps);if(water)data.water=parseFloat(water);
    try{
        await persistNutritionState('saveStepsWater', {steps:data.steps,water:data.water});
        loadNutrition();updateHome();
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('saveStepsWater:',err);
        showToast('Save failed — please try again','error',4000);
    }
}
async function addWaterQuick(){
    if(nutritionDateOffset!==0){
        showToast('Switch to today to log water','info',2200);
        return;
    }
    try{
        const nutritionToday=await PG.nutrition.getToday()||{};
        const currentWater=getWaterLitres(nutritionToday);
        const nextWater=Math.round((currentWater+0.25)*100)/100;
        const saveResult=await PG.nutrition.save({water_litres:nextWater});
        if (typeof updateHome === 'function') updateHome();
        if(saveResult?.ok===false||saveResult?.error){
            throw saveResult.error||new Error('Water save failed');
        }
        await loadNutrition();
        await updateHome();
        showToast('Water updated','success',1400);
    }catch(err){
        console.error('addWaterQuick:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

async function saveWater() {
    const waterInput=document.getElementById('input-water');
    const waterValue=parseFloat(waterInput?.value);
    if(!Number.isFinite(waterValue)||waterValue<=0){
        showToast('Enter water in litres','error',2500);
        return;
    }
    try{
        const nutritionToday=await PG.nutrition.getToday()||{};
        const currentWater=getWaterLitres(nutritionToday);
        const nextWater=Math.round((currentWater+waterValue)*100)/100;
        const savePayload={water_litres:nextWater};
        console.log('[Water Save] payload:',savePayload);
        const saveResult=await PG.nutrition.save(savePayload);
        if (typeof updateHome === 'function') updateHome();
        console.log('[Water Save] result:',saveResult);
        if(saveResult?.ok===false||saveResult?.error){
            throw saveResult.error||new Error('Water save failed');
        }
        if(waterInput)waterInput.value='';
        await loadNutrition();
        await updateHome();
        showToast('Saved!','success',2000);
    }catch(err){
        console.error('saveWater:',err);
        showToast('Save failed — please try again','error',4000);
    }
}
async function loadNutrition() {
    const viewDate=getNutritionViewDateStr();
    const calTarget=settings.calTarget||2000;const proteinTarget=settings.proteinTarget||150;const stepsTarget=settings.stepsTarget||8000;
    const remainingCaloriesForMacros=Math.max(calTarget-(proteinTarget*4),0);
    const carbsTarget=settings.carbsTarget||Math.max(Math.round((remainingCaloriesForMacros*0.5)/4),0);
    const fatTarget=settings.fatTarget||Math.max(Math.round((remainingCaloriesForMacros*0.5)/9),0);
    const calDateEl=document.getElementById('cal-date');if(calDateEl)calDateEl.textContent=viewDate;
    const navLabel=document.getElementById('nut-date-nav-label');
    if(navLabel){
        if(nutritionDateOffset===0)navLabel.textContent=t('nutNavToday');
        else{
            const parts=viewDate.split('/');
            navLabel.textContent=parts.length===3?`${parts[0]}/${parts[1]}`:viewDate;
        }
    }
    const todayMeals=meals.filter(m=>m.date===viewDate);
    let totalCal=0,totalProtein=0,totalCarbs=0,totalFat=0;
    todayMeals.forEach(meal=>meal.foods.forEach(f=>{totalCal+=f.cal;totalProtein+=f.protein;totalCarbs+=f.carbs;totalFat+=f.fat;}));
    const nd=nutritionDateOffset===0?(await PG.nutrition.getToday()||{steps:0,water:0,water_litres:0,restDay:false}):{steps:0,water:0,water_litres:0,restDay:false};
    const steps=parseInt(nd.steps)||0;
    const water=getWaterLitres(nd);
    const setEl=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
    const setWidth=(id,pct)=>{const el=document.getElementById(id);if(el)el.style.width=pct+'%';};
    setEl('nut-show-calories',`${totalCal} / ${calTarget} kcal`);
    const heroCal=document.getElementById('nut-hero-calories');
    if(heroCal)heroCal.textContent=`${totalCal.toLocaleString('en-GB')} / ${calTarget.toLocaleString('en-GB')} kcal`;
    const remaining=calTarget-totalCal;
    const remainingEl=document.getElementById('nut-cal-remaining');
    if(remainingEl){
        if(remaining>0){
            remainingEl.textContent=remaining.toLocaleString('en-GB')+' kcal left';
            remainingEl.style.color='#10B981';
        } else {
            remainingEl.textContent=Math.abs(remaining).toLocaleString('en-GB')+' kcal over target';
            remainingEl.style.color='#EF4444';
        }
    }
    setEl('nut-pill-protein',`${totalProtein.toFixed(0)} / ${proteinTarget}g`);
    setEl('nut-pill-carbs',`${totalCarbs.toFixed(0)} / ${carbsTarget}g`);
    setEl('nut-pill-fats',`${totalFat.toFixed(0)} / ${fatTarget}g`);
    const pp=document.getElementById('nut-pill-bar-protein');
    const pc=document.getElementById('nut-pill-bar-carbs');
    const pf=document.getElementById('nut-pill-bar-fats');
    if(pp)pp.style.width=Math.min((totalProtein/proteinTarget)*100,100)+'%';
    if(pc)pc.style.width=Math.min((totalCarbs/Math.max(carbsTarget,1))*100,100)+'%';
    if(pf)pf.style.width=Math.min((totalFat/Math.max(fatTarget,1))*100,100)+'%';
    setEl('show-protein',`${totalProtein.toFixed(1)} / ${proteinTarget}g`);
    setEl('show-carbs',`${totalCarbs.toFixed(1)} / ${carbsTarget}g`);setEl('show-fat',`${totalFat.toFixed(1)} / ${fatTarget}g`);
    setEl('show-steps',`${steps} / ${stepsTarget}`);setEl('show-water',`${water.toFixed(1)} / 3L`);
    setWidth('nut-bar-calories',Math.min((totalCal/calTarget)*100,100));
    setWidth('bar-protein',Math.min((totalProtein/proteinTarget)*100,100));
    setWidth('bar-carbs',Math.min((totalCarbs/Math.max(carbsTarget,1))*100,100));
    setWidth('bar-fat',Math.min((totalFat/Math.max(fatTarget,1))*100,100));
    setWidth('bar-steps',Math.min((steps/stepsTarget)*100,100));
    setWidth('bar-water',Math.min((water/3)*100,100));
    const dotsWrap=document.getElementById('nut-water-dots');
    if(dotsWrap){
        const targetL=3;
        const n=12;
        const filled=Math.min(n,Math.max(0,Math.floor((water/targetL)*n)));
        dotsWrap.innerHTML=Array.from({length:n},(_,i)=>`<span class="nut-water-dot${i<filled?' filled':''}" aria-hidden="true"></span>`).join('');
    }
    const hour=new Date().getHours();const expectedCals=Math.round((hour/24)*calTarget);
    const calStatus=document.getElementById('cal-status');
    if(calStatus){if(totalCal>=expectedCals){calStatus.textContent=t('onTrack');calStatus.style.color='#10B981';}else{calStatus.textContent=t('behindEat');calStatus.style.color='#C2410C';}}
    await renderSupplements();
}

async function renderSupplements() {
    const nutritionData=await PG.nutrition.getToday();
    const savedSupplements=Array.isArray(nutritionData?.supplements)?nutritionData.supplements:[];
    const supplementMap=new Map(savedSupplements.filter(s=>s&&s.name).map(s=>[s.name, s]));
    const list=document.getElementById('supplement-list');if(!list)return;
    const allSupplements=getDisplayedSupplementNames(savedSupplements);
    console.log('rendered supplements:', allSupplements);
    renderedSupplements=allSupplements;
    if(allSupplements.length===0){
        list.innerHTML=`<p class="supplement-empty-msg">${t('supplementsListEmpty')}</p>`;
        return;
    }
    list.innerHTML=allSupplements.map((s,i)=>{
        const saved=supplementMap.get(s)||{};
        const checked=saved.taken===true;
        const hasQty=saved.quantity!==undefined&&saved.quantity!==null&&saved.quantity!=='';
        const qn=Number(saved.quantity);
        const quantityVal=hasQty&&Number.isFinite(qn)?String(qn):'';
        const savedUnit=saved.unit&&supplementUnitValues.includes(saved.unit)?saved.unit:null;
        const unitVal=savedUnit||getDefaultSupplementUnit(s);
        const nameSafe=escapeHtmlText(s);
        const nameJsSafe=escapeJsSingleQuoteString(s);
        return `<div class="supplement-item"><div class="supplement-item-top"><div class="supplement-item-name">${nameSafe}</div><button type="button" class="supplement-row-remove" onclick="removeSupplementFromList('${nameJsSafe}')">${t('removeFromList')}</button></div><div class="supplement-item-controls"><input type="number" class="supplement-qty" id="supp-qty-${i}" placeholder="Qty" inputmode="decimal" value="${quantityVal}"><select class="supplement-unit" id="supp-unit-${i}">${supplementUnitSelectHtml(unitVal)}</select><span class="supplement-taken-wrap"><input type="checkbox" class="supplement-checkbox" id="supp-taken-${i}" title="Taken" ${checked?'checked':''} onclick="saveSupplementByIndex(${i})"></span><button type="button" class="supplement-save" onclick="saveSupplementByIndex(${i})">${t('save')}</button></div></div>`;
    }).join('');
}

async function saveSupplementByIndex(index){
    if(!Array.isArray(renderedSupplements)||!renderedSupplements[index]) return;
    const takenInput=document.getElementById(`supp-taken-${index}`);
    if(!takenInput) return;

    const nutritionData=await PG.nutrition.getToday();
    const existing=Array.isArray(nutritionData?.supplements)?nutritionData.supplements:[];
    const next=existing.filter(s=>s&&s.name&&!renderedSupplements.includes(s.name));
    renderedSupplements.forEach((name, i)=>{
        const qtyEl=document.getElementById(`supp-qty-${i}`);
        const unitEl=document.getElementById(`supp-unit-${i}`);
        const takenEl=document.getElementById(`supp-taken-${i}`);
        if(!qtyEl||!unitEl||!takenEl||!takenEl.checked) return;
        const qtyRaw=(qtyEl.value||'').trim();
        const qtyParsed=parseFloat(qtyRaw);
        const qty=Number.isFinite(qtyParsed)?qtyParsed:null;
        const u=(unitEl.value||'').trim();
        const unit=supplementUnitValues.includes(u)?u:getDefaultSupplementUnit(name);
        next.push({name,taken:true,quantity:qty,unit});
    });
    const saveResult=await PG.nutrition.save({supplements:next});
    if (typeof updateHome === 'function') updateHome();
    if(saveResult?.ok===false||saveResult?.error){
        showToast('Save failed — please try again','error',3500);
        return;
    }
    await renderSupplements();
    showToast('Supplements updated','success',1400);
}

async function addCustomSupplement() {
    const input=document.getElementById('custom-supplement-input');
    const name=(input?.value||'').trim();
    if(!name){
        showToast('Enter a supplement name','error',2000);
        return;
    }
    const nutritionData=await PG.nutrition.getToday();
    const displayed=getDisplayedSupplementNames(nutritionData?.supplements||[]);
    if(displayed.some(s=>String(s).toLowerCase()===name.toLowerCase())){
        showToast('Supplement already exists','error',2000);
        return;
    }
    const existing=Array.isArray(settings.custom_supplements)?[...settings.custom_supplements]:[];
    const updated=[...existing,name];
    const payload={custom_supplements:updated};
    if(Array.isArray(settings.supplements_catalog)){
        settings.supplements_catalog=dedupeSupplementNamesOrdered([...settings.supplements_catalog,name]);
        payload.supplements_catalog=settings.supplements_catalog;
    }
    const saveResult=await PG.profile.save(payload);
    if(saveResult?.ok===false||saveResult?.error){
        showToast('Save failed — please try again','error',3000);
        return;
    }
    settings.custom_supplements=updated;
    if(input)input.value='';
    await renderSupplements();
    showToast('Custom supplement added','success',1600);
}

async function removeSupplementFromList(supplementName){
    const name=String(supplementName||'').trim();
    console.log('removing:', name);
    if(!name) return;
    const nameLower=name.toLowerCase();

    const catalog=Array.isArray(settings.supplements_catalog)?settings.supplements_catalog:[];
    const nextCatalog=catalog.filter(s=>String(s).toLowerCase()!==nameLower);
    const customSupplements=Array.isArray(settings.custom_supplements)?settings.custom_supplements:[];
    const nextCustom=customSupplements.filter(s=>String(s).toLowerCase()!==nameLower);

    const prof=await PG.profile.save({
        supplements_catalog:nextCatalog,
        custom_supplements:nextCustom
    });
    if(prof?.ok===false||prof?.error){
        showToast('Failed to remove supplement','error');
        return;
    }

    settings.supplements_catalog=nextCatalog;
    settings.custom_supplements=nextCustom;

    const nutritionData=await PG.nutrition.getToday();
    const savedSupplements=Array.isArray(nutritionData?.supplements)?nutritionData.supplements:[];
    const nextTodaySupplements=savedSupplements.filter(s=>s&&String(s.name).toLowerCase()!==nameLower);
    const nut=await PG.nutrition.save({supplements:nextTodaySupplements});
    if (typeof updateHome === 'function') updateHome();
    if(nut?.ok===false||nut?.error){
        showToast('Failed to remove supplement','error');
        return;
    }

    await renderSupplements();
    showToast('Supplement removed','success');
}

async function clearAllSupplements(){
    if(!confirm(t('confirmClearSupplements'))) return;
    settings.supplements_catalog=[];
    settings.custom_supplements=[];
    const prof=await PG.profile.save({supplements_catalog:[],custom_supplements:[]});
    if(prof?.ok===false||prof?.error){
        showToast('Save failed — please try again','error',3500);
        return;
    }
    const nut=await PG.nutrition.save({supplements:[]});
    if (typeof updateHome === 'function') updateHome();
    if(nut?.ok===false||nut?.error){
        showToast('Save failed — please try again','error',3500);
        return;
    }
    await renderSupplements();
    showToast('Supplements cleared','success',1600);
}

async function openSupplementPickerModal(){
    const modal=document.getElementById('supplement-picker-modal');
    if(!modal)return;
    await refreshSupplementPickerList();
    modal.classList.add('is-open');
    modal.style.display='flex';
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
}

function closeSupplementPickerModal(){
    const modal=document.getElementById('supplement-picker-modal');
    if(!modal)return;
    modal.classList.remove('is-open');
    modal.style.display='none';
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
}

async function refreshSupplementPickerList(){
    const listEl=document.getElementById('supplement-picker-list');
    if(!listEl)return;
    const nutritionData=await PG.nutrition.getToday();
    const displayed=getDisplayedSupplementNames(nutritionData?.supplements||[]);
    const displayedLower=new Set(displayed.map(s=>String(s).toLowerCase()));
    listEl.innerHTML=defaultSupplements.map((name,idx)=>{
        const safe=escapeHtmlText(name);
        const on=displayedLower.has(String(name).toLowerCase());
        if(on){
            return `<div class="supplement-picker-row"><span class="supplement-picker-name">${safe}</span><span class="supplement-picker-added" title="${t('supplementAlreadyAdded')}">✓</span></div>`;
        }
        return `<div class="supplement-picker-row"><span class="supplement-picker-name">${safe}</span><button type="button" class="supplement-picker-add" onclick="addCatalogSupplementToListByIndex(${idx})" aria-label="+">+</button></div>`;
    }).join('');
}

async function addCatalogSupplementToListByIndex(idx){
    const name=defaultSupplements[idx];
    if(!name)return;
    const nutritionData=await PG.nutrition.getToday();
    const displayed=getDisplayedSupplementNames(nutritionData?.supplements||[]);
    if(displayed.some(s=>String(s).toLowerCase()===String(name).toLowerCase())){
        showToast(t('supplementAlreadyAdded'),'info',1800);
        await refreshSupplementPickerList();
        return;
    }
    const catalog=Array.isArray(settings.supplements_catalog)?[...settings.supplements_catalog]:[];
    const next=dedupeSupplementNamesOrdered([...catalog,name]);
    settings.supplements_catalog=next;
    const prof=await PG.profile.save({supplements_catalog:next});
    if(prof?.ok===false||prof?.error){
        showToast('Save failed — please try again','error',3500);
        return;
    }
    await renderSupplements();
    closeSupplementPickerModal();
    showToast(t('supplementAddedToast'),'success',1400);
}

function getGreeting(name) {
  const hour = new Date().getHours();
  let timeOfDay;
  if (hour >= 5 && hour < 12) timeOfDay = 'morning';
  else if (hour < 17) timeOfDay = 'afternoon';
  else if (hour < 21) timeOfDay = 'evening';
  else timeOfDay = 'night';
  return {
    title: `Good ${timeOfDay}, ${name} 👋`,
    subtitle: "Let's crush your goals today."
  };
}

// New home tab UI
async function updateHome() {
    const calTarget=settings.calTarget||2000;
    const proteinTarget=settings.proteinTarget||150;
    const today=new Date().toLocaleDateString('en-GB');
    const todayMeals=(Array.isArray(meals)?meals:[]).filter(m=>m&&m.date===today);
    let cals=0,protein=0,carbs=0,fats=0;
    todayMeals.forEach(meal=>{
        (meal?.foods||[]).forEach(f=>{
            cals+=Number(f?.cal)||0;
            protein+=Number(f?.protein)||0;
            carbs+=Number(f?.carbs)||0;
            fats+=Number(f?.fat)||0;
        });
    });

    const nd=await PG.nutrition.getToday()||{steps:0,water:0,water_litres:0};
    if(!PG.state)PG.state={};
    PG.state.todayNutrition=nd;

    const steps=parseInt(nd.steps,10)||0;
    const water=getWaterLitres(nd);

    updateOverviewTiles(cals, steps, calTarget);
    updateHabitRings(water, cals, calTarget, steps, nd);
    updateNutritionSummary(cals, protein, carbs, fats, calTarget, proteinTarget);
    updateStreakSection();
    updateUpcoming();
    updateNutritionTab(cals, protein, carbs, fats, calTarget, proteinTarget);

    const { title: greetTitle, subtitle: greetSub } = getGreeting(settings.name || 'Athlete');
    const greetingEl = document.getElementById('home-hero-title');
    if (greetingEl) greetingEl.textContent = greetTitle;
    const subEl = document.getElementById('home-hero-sub');
    if (subEl) subEl.textContent = greetSub;

    // Daily Score (Workout 25 + Cals 25 + Steps 25 + Protein 25)
    const todayStr = new Date().toLocaleDateString('en-GB');
    const todayWorkoutDone = workoutHistory.some(w => w.date === todayStr && w.type !== 'rest');
    const todayCardio = (Array.isArray(cardioHistory) ? cardioHistory : []).some(c => c.date === todayStr);
    const workoutScore = todayWorkoutDone ? 25 : todayCardio ? 15 : 0;
    const calsScore = cals >= calTarget * 0.8 ? 25 : Math.round((cals / calTarget) * 25);
    const stepsScore = steps >= (settings.stepsTarget || 8000) ? 25 : Math.round((steps / (settings.stepsTarget || 8000)) * 25);
    const proteinScore = protein >= proteinTarget * 0.8 ? 25 : Math.round((protein / proteinTarget) * 25);
    const dailyScore = Math.min(100, workoutScore + calsScore + stepsScore + proteinScore);
    setText('home-daily-score', dailyScore);
    const scoreMessages = ['Start tracking to build your score!', 'Good start — keep going!', 'Almost halfway there!', 'Strong progress today!', 'Nearly perfect day!', "You're absolutely smashing it! 🔥"];
    const msgIdx = Math.floor(dailyScore / 20);
    setText('home-score-msg', scoreMessages[Math.min(msgIdx, scoreMessages.length - 1)]);
    const scoreRing = document.getElementById('home-score-ring');
    if (scoreRing) scoreRing.setAttribute('stroke-dashoffset', 201.06 - (dailyScore / 100) * 201.06);

    // Chips
    setText('home-chip-workout', todayWorkoutDone ? '✓ Done' : '—');
    setText('home-chip-steps', steps.toLocaleString());
    setText('home-chip-steps-goal', `/${(settings.stepsTarget || 8000).toLocaleString()}`);
    setText('home-chip-protein', Math.round(protein) + 'g');
    setText('home-chip-protein-goal', `/${proteinTarget}g`);
    const nd2 = PG.state?.todayNutrition || {};
    const sleepH = nd2.sleep_hours ? parseFloat(nd2.sleep_hours) : NaN;
    setText('home-chip-sleep', Number.isFinite(sleepH) && sleepH > 0 ? `${sleepH}h` : '—');

    // Home macros donut
    const macroTotal = (protein * 4) + (carbs * 4) + (fats * 9);
    const pPct = macroTotal > 0 ? (protein * 4) / macroTotal : 0;
    const cPct = macroTotal > 0 ? (carbs * 4) / macroTotal : 0;
    const fPct = macroTotal > 0 ? (fats * 9) / macroTotal : 0;
    const mCirc = 188.5;
    const pArc = pPct * mCirc; const cArc = cPct * mCirc; const fArc = fPct * mCirc;
    const mpRing = document.getElementById('home-macro-protein');
    const mcRing = document.getElementById('home-macro-carbs');
    const mfRing = document.getElementById('home-macro-fats');
    if (mpRing) { mpRing.setAttribute('stroke-dasharray', `${pArc} ${mCirc - pArc}`); mpRing.setAttribute('stroke-dashoffset', '0'); }
    if (mcRing) { mcRing.setAttribute('stroke-dasharray', `${cArc} ${mCirc - cArc}`); mcRing.setAttribute('stroke-dashoffset', -pArc); }
    if (mfRing) { mfRing.setAttribute('stroke-dasharray', `${fArc} ${mCirc - fArc}`); mfRing.setAttribute('stroke-dashoffset', -(pArc + cArc)); }
    setText('home-macro-p-val', Math.round(protein) + 'g');
    setText('home-macro-c-val', Math.round(carbs) + 'g');
    setText('home-macro-f-val', Math.round(fats) + 'g');
    const kcalLeft = Math.max(0, calTarget - cals);
    setText('home-kcal-left', kcalLeft > 0 ? `${Math.round(kcalLeft)} kcal left` : 'Goal reached! 🎉');
    setText('home-kcal-left-label', kcalLeft > 0 ? `${Math.round(kcalLeft)}` : '🎉');
    // Macros empty state
    if (cals === 0 && protein === 0 && carbs === 0 && fats === 0) {
      setText('home-kcal-left', `${calTarget} kcal remaining`);
      setText('home-macro-p-val', '0g');
      setText('home-macro-c-val', '0g');
      setText('home-macro-f-val', '0g');
    }

    // Steps ring
    const stepsTarget2 = settings.stepsTarget || 8000;
    const stepsPct = Math.min(1, steps / stepsTarget2);
    const stepsRing = document.getElementById('home-steps-ring');
    if (stepsRing) stepsRing.setAttribute('stroke-dashoffset', 163.36 - stepsPct * 163.36);
    setText('home-steps-big', steps.toLocaleString());
    setText('home-steps-big-goal', `/${stepsTarget2.toLocaleString()} steps`);
    setBar('home-steps-bar', stepsPct * 100);
    setText('home-steps-left', steps >= stepsTarget2 ? '✓ Goal reached!' : `${(stepsTarget2 - steps).toLocaleString()} steps to go`);
    // Steps empty state
    if (steps === 0) {
      setText('home-steps-left', 'Log your steps');
    }

    // Recovery ring (simulated from sleep)
    const sleepRaw2 = nd2.sleep_hours ? parseFloat(nd2.sleep_hours) : 0;
    const recoveryPct = sleepRaw2 > 0 ? Math.min(1, sleepRaw2 / 8) : 0.75;
    const recoveryRing = document.getElementById('home-recovery-ring');
    if (recoveryRing) recoveryRing.setAttribute('stroke-dashoffset', 163.36 - recoveryPct * 163.36);
    const recoveryScore = Math.round(recoveryPct * 100);
    setText('home-recovery-pct', recoveryScore + '%');
    setText('home-recovery-label', recoveryScore >= 80 ? 'Great recovery' : recoveryScore >= 60 ? 'Good recovery' : 'Rest up tonight');
    setText('home-recovery-sub', recoveryScore >= 80 ? 'Your body is ready to perform.' : 'Prioritise sleep and hydration.');
    setText('home-recovery-sleep', sleepRaw2 > 0 ? `${sleepRaw2}h` : '—');
    // Sleep empty state
    const sleepEl = document.getElementById('home-chip-sleep');
    if (sleepEl && (!sleepRaw2 || sleepRaw2 === 0)) {
      sleepEl.textContent = 'Log sleep';
      sleepEl.style.color = '#FFD60A';
      sleepEl.style.cursor = 'pointer';
      sleepEl.onclick = openSleepModal;
    }

    // Weekly summary bars
    const homeWeeklyBars = document.getElementById('home-weekly-bars');
    if (homeWeeklyBars) {
      const now2 = new Date();
      const dow2 = now2.getDay();
      const mondayOffset2 = dow2 === 0 ? -6 : 1 - dow2;
      let weekDone = 0;
      const bars = [];
      for (let i = 0; i < 7; i++) {
        const d2 = new Date(now2);
        d2.setDate(now2.getDate() + mondayOffset2 + i);
        const ds2 = d2.toLocaleDateString('en-GB');
        const isToday2 = i === (dow2 === 0 ? 6 : dow2 - 1);
        const isPast = d2 < new Date(now2.setHours(0,0,0,0));

        const isWorkoutDone = workoutHistory.some(w => w.date === ds2 && w.type !== 'rest');
        const isRestDay = workoutHistory.some(w => w.date === ds2 && w.type === 'rest');
        const isScheduled = (Array.isArray(savedRoutines) ? savedRoutines : [])
          .some(r => r.scheduled_days && r.scheduled_days.includes(
            ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d2.getDay()]
          ));
        const isMissed = isPast && isScheduled && !isWorkoutDone && !isRestDay && !isToday2;

        if (isWorkoutDone) weekDone++;

        const h = isWorkoutDone ? 40 : isRestDay ? 32 : isToday2 ? 28 : isMissed ? 20 : 16;
        const color = isWorkoutDone
          ? '#30D158'
          : isRestDay
            ? '#A855F7'
            : isToday2
              ? '#FFD60A'
              : isMissed
                ? 'rgba(239,68,68,0.35)'
                : 'var(--border)';

        const label = isRestDay ? '🌙' : '';
        bars.push(`
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:3px;">
        <span style="font-size:9px;">${label}</span>
        <div style="width:100%;height:${h}px;background:${color};border-radius:4px;"></div>
      </div>
    `);
      }
      homeWeeklyBars.innerHTML = bars.join('');

      const totalPlanned = (Array.isArray(savedRoutines) ? savedRoutines : [])
        .reduce((a, r) => a + (r.scheduled_days ? r.scheduled_days.length : 0), 0);
      const denominator = totalPlanned > 0 ? Math.min(totalPlanned, 7) : 7;
      const consistency2 = Math.round((weekDone / denominator) * 100);
      setText('home-weekly-consistency', consistency2 + '%');
      setText('home-weekly-text', totalPlanned > 0
        ? `${weekDone} of ${denominator} workouts completed`
        : 'Set up your plan in the Train tab');
    }

    // Home today's plan card
    const days3 = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const today3 = days3[new Date().getDay()];
    const scheduledToday = (Array.isArray(savedRoutines) ? savedRoutines : []).find(r => r.scheduled_days && r.scheduled_days.includes(today3));
    if (scheduledToday) {
      setText('home-workout-title', scheduledToday.name);
      setText('home-workout-muscles', getWorkoutMuscles(scheduledToday.name));
      const focusTag = document.getElementById('home-workout-focus-tag');
      if (focusTag) { focusTag.style.display = 'inline-block'; focusTag.textContent = scheduledToday.focus || 'Primary'; }
    } else {
      setText('home-workout-title', 'No workout scheduled');
      setText('home-workout-muscles', 'Set up your plan in the Train tab');
      const focusTag = document.getElementById('home-workout-focus-tag');
      if (focusTag) focusTag.style.display = 'none';
    }

    // Home Up Next
    updateUpcoming();
    updateTodayPlanButtons();
}

function updateTodayPlanButtons() {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const today = days[new Date().getDay()];
  const todayStr = new Date().toLocaleDateString('en-GB');
  
  const workoutDone = workoutHistory.some(w => w.date === todayStr && w.type !== 'rest');
  const restDone = workoutHistory.some(w => w.date === todayStr && w.type === 'rest');
  
  const startBtn = document.getElementById('home-start-workout-btn');
  const restBtn = document.getElementById('home-log-rest-btn');
  const viewBtn = document.getElementById('home-view-plan-btn');

  if (workoutDone) {
    // Workout completed — disable rest, show completed state
    if (startBtn) {
      startBtn.textContent = '✓ Workout Completed';
      startBtn.style.opacity = '0.6';
      startBtn.style.cursor = 'default';
      startBtn.onclick = null;
    }
    if (restBtn) restBtn.style.display = 'none';
  } else if (restDone) {
    // Rest logged — replace rest button, disable start
    if (startBtn) {
      startBtn.textContent = 'Start Workout';
      startBtn.style.opacity = '0.4';
      startBtn.style.cursor = 'default';
      startBtn.onclick = null;
    }
    if (restBtn) {
      restBtn.textContent = '✓ Rest Day Logged';
      restBtn.style.opacity = '0.6';
      restBtn.style.cursor = 'default';
      restBtn.onclick = null;
    }
  } else {
    // Nothing logged yet — normal state
    const scheduledToday = (Array.isArray(savedRoutines) ? savedRoutines : [])
      .find(r => r.scheduled_days && r.scheduled_days.includes(today));
    
    if (startBtn) {
      startBtn.textContent = 'Start Workout';
      startBtn.style.opacity = '1';
      startBtn.style.cursor = 'pointer';
      startBtn.onclick = scheduledToday 
        ? () => startWorkoutSession(scheduledToday)
        : () => showScreen('screen-train');
    }
    if (restBtn) {
      restBtn.style.display = '';
      restBtn.textContent = '🌙 Log Rest Day';
      restBtn.style.opacity = '1';
      restBtn.style.cursor = 'pointer';
      restBtn.onclick = logRestDay;
    }
    if (viewBtn) {
      viewBtn.onclick = scheduledToday
        ? () => showScreen('screen-train')
        : () => showScreen('screen-train');
    }
  }
}
// ===================== PROGRESS =====================
async function renderProgressTab() {
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
        if(histList)histList.innerHTML=phaseHistory.map(p=>`<div class="phase-history-item"><div style="font-weight:700;color:var(--text);">${p.name}</div><div style="color:var(--label-secondary);font-size:12px;margin-top:4px;">${p.startDate} → ${p.days} days</div><div style="color:var(--text);font-size:13px;font-weight:600;margin-top:4px;">${p.result}</div></div>`).join('');
    }
    const setEl=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
    setEl('workouts-count',workoutHistory.length);setEl('cardio-count',cardioHistory.length);
    let daysHit=0;
    const todayNutrition=await PG.nutrition.getToday();
    for(let i=0;i<30;i++){const d=new Date();d.setDate(d.getDate()-i);if(todayNutrition||meals.some(m=>m.date===d.toLocaleDateString('en-GB')&&m.foods.length>0))daysHit++;}
    setEl('consistency-score',daysHit+'/30 days');
    const pbs=Object.entries(personalBests);
    const pbList=document.getElementById('pb-list');
    if(pbList)pbList.innerHTML=pbs.length===0?`<p style="color:var(--label-secondary);">${t('noPBs')}</p>`:pbs.map(([name,pb])=>`<div class="pb-item"><div><div class="pb-exercise">${name}</div><div style="color:var(--label-secondary);font-size:11px;">${pb.date}</div></div><div class="pb-value">${pb.weight}kg × ${pb.reps}</div></div>`).join('');
    const wc=document.getElementById('progress-weight-current');
    const wdel=document.getElementById('progress-weight-delta');
    if(wc){
        const latest=checkinHistory[0];
        const w=latest?parseFloat(latest.weight):NaN;
        wc.textContent=Number.isFinite(w)?w.toFixed(1)+' kg':'—';
        if(wdel){
            if(checkinHistory.length>=2&&Number.isFinite(w)){
                const prev=parseFloat(checkinHistory[1].weight);
                const diff=w-prev;
                if(Number.isFinite(diff)&&Math.abs(diff)>0.01){
                    wdel.textContent=(diff<0?'↓ ':'↑ ')+Math.abs(diff).toFixed(1)+' kg';
                    wdel.style.color=diff<0?'#10B981':'#EF4444';
                }else{wdel.textContent='';wdel.style.color='';}
            }else{wdel.textContent='';wdel.style.color='';}
        }
    }
    const sn=document.getElementById('progress-strength-ex-name');
    const sv=document.getElementById('progress-strength-ex-val');
    if(pbs.length>0){
        const top=pbs[0];
        if(sn)sn.textContent=top[0];
        if(sv&&top[1])sv.textContent=`${top[1].weight} kg × ${top[1].reps}`;
    }else{
        if(sn)sn.textContent='Bench press';
        if(sv)sv.textContent='—';
    }
    const chkHistory=document.getElementById('checkin-history');
    if(chkHistory&&checkinHistory.length>0)chkHistory.innerHTML='<div style="margin-top:16px;">'+checkinHistory.map(c=>`<div class="checkin-item"><div class="checkin-date">${c.date}</div><div class="checkin-detail">Weight: ${c.weight}kg • Energy: ${c.energy}/10</div><div class="checkin-detail">${c.notes}</div></div>`).join('')+'</div>';
    if(measurements.chest){
        const setVal=(id,val)=>{const el=document.getElementById(id);if(el&&val)el.value=val;};
        setVal('meas-chest',measurements.chest);setVal('meas-waist',measurements.waist);
        setVal('meas-hips',measurements.hips);setVal('meas-arms',measurements.arms);setVal('meas-legs',measurements.legs);
    }
    renderHistory();
    setProgressFilter(progressChartRange,null);
    renderWeightChart();
    await renderSupplementHistory();
}

async function updateProgress() {
    return renderProgressTab();
}

async function renderSupplementHistory() {
    const container=document.getElementById('supplement-log-grid');
    if(!container) return;
    const rows=await PG.nutrition.getAll(14);
    const dayKeys=[];
    for(let i=6;i>=0;i--){
        const d=new Date();
        d.setDate(d.getDate()-i);
        dayKeys.push(d.toISOString().split('T')[0]);
    }
    const byDate=new Map((Array.isArray(rows)?rows:[]).map(r=>[r.logged_at,r]));
    const namesSet=new Set(getDisplayedSupplementNames([]));
    dayKeys.forEach(day=>{
        const daySupps=byDate.get(day)?.supplements;
        if(Array.isArray(daySupps)){
            daySupps.forEach(s=>{ if(s?.name) namesSet.add(s.name); });
        }
    });
    const names=[...namesSet];
    if(names.length===0){
        container.innerHTML='<p style="color:var(--label-secondary);font-size:12px;">No supplement logs yet.</p>';
        return;
    }
    const headers=dayKeys.map(day=>{
        const d=new Date(day);
        return `<th>${d.toLocaleDateString('en-GB',{day:'2-digit',month:'2-digit'})}</th>`;
    }).join('');
    const body=names.map(name=>{
        const cells=dayKeys.map(day=>{
            const daySupps=byDate.get(day)?.supplements;
            const entry=Array.isArray(daySupps)?daySupps.find(s=>s&&s.name===name&&s.taken===true):null;
            if(!entry) return '<td></td>';
            if(entry.quantity!==undefined&&entry.quantity!==null&&entry.quantity!==''){
                return `<td>${entry.quantity}${entry.unit||''}</td>`;
            }
            return '<td>✓</td>';
        }).join('');
        return `<tr><td>${name}</td>${cells}</tr>`;
    }).join('');
    container.innerHTML=`<div class="supplement-log-grid"><table class="supplement-log-table"><thead><tr><th>Supplement</th>${headers}</tr></thead><tbody>${body}</tbody></table></div>`;
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
        const now=new Date();
        const entry={
            date:now.toLocaleDateString('en-GB'),
            weight:document.getElementById('checkin-weight').value,
            energy:document.getElementById('checkin-energy').value,
            notes:document.getElementById('checkin-notes').value
        };
        const progressPayload={
            logged_at:now.toISOString().split('T')[0],
            weight_kg:entry.weight?parseFloat(entry.weight):undefined,
            energy_level:entry.energy?parseInt(entry.energy,10):undefined,
            notes:entry.notes||''
        };
        const saveResult=await PG.progress.save(progressPayload);
        if(saveResult?.ok===false||saveResult?.error){
            throw saveResult.error||new Error('Check-in save failed');
        }
        if(entry.weight){
            settings.weight=parseFloat(entry.weight);
            await PG.profile.save({weight:settings.weight});
        }
        checkinHistory.unshift(entry);
        await saveToStorage({skipWorkouts:true,skipNutrition:true});
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
        const now=new Date();
        measurements={date:now.toLocaleDateString('en-GB'),chest:document.getElementById('meas-chest').value,waist:document.getElementById('meas-waist').value,hips:document.getElementById('meas-hips').value,arms:document.getElementById('meas-arms').value,legs:document.getElementById('meas-legs').value};
        const payload={
            logged_at:now.toISOString().split('T')[0],
            chest_cm:measurements.chest?parseFloat(measurements.chest):undefined,
            waist_cm:measurements.waist?parseFloat(measurements.waist):undefined,
            hips_cm:measurements.hips?parseFloat(measurements.hips):undefined,
            arms_cm:measurements.arms?parseFloat(measurements.arms):undefined,
            legs_cm:measurements.legs?parseFloat(measurements.legs):undefined
        };
        const saveResult=await PG.progress.save(payload);
        if(saveResult?.ok===false||saveResult?.error){
            throw saveResult.error||new Error('Measurement save failed');
        }
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
            <div style="color:var(--label-secondary);font-size:13px;margin-bottom:16px;">Log your first workout to start tracking your progress</div>
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
                <div style="color:var(--label-secondary);font-size:12px;margin-top:2px;">${daySteps>0?daySteps.toLocaleString()+' steps':'No steps logged'}</div>
            </div>`;
        }
        if(w.type==='cardio'){
            return `<div style="border-bottom:1px solid var(--border);padding:12px 0;">
                <div style="color:#10B981;font-weight:700;font-size:13px;">🏃 ${w.type} — ${w.date}${w.duration?' • '+w.duration+' mins':''}</div>
                <div style="color:var(--label-secondary);font-size:12px;margin-top:2px;">${w.distance?w.distance+'km • ':''}${w.intensity||''}${daySteps>0?' • '+daySteps.toLocaleString()+' steps':''}</div>
            </div>`;
        }
        return `<div style="border-bottom:1px solid var(--border);padding:12px 0;">
            <div style="color:var(--text);font-weight:700;font-size:13px;">💪 ${w.muscle} — ${w.date}${w.duration&&w.duration>0?' • '+w.duration+' mins':''}</div>
            ${w.exercises?w.exercises.map(e=>`<div style="color:var(--label-secondary);font-size:12px;margin-top:2px;">${e.name} — ${e.sets.length} sets</div>`).join(''):''}
            ${daySteps>0?`<div style="color:var(--label-secondary);font-size:12px;margin-top:2px;">${daySteps.toLocaleString()} steps</div>`:''}
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

async function loadSettings() {
    if(!settings.name&&!settings.calTarget)return;
    populateSettingsFields(settings);
    if(settings.tdee){
        const tdeeEl=document.getElementById('tdee-result');if(tdeeEl)tdeeEl.style.display='block';
        const setEl=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
        setEl('tdee-value',settings.tdee+' kcal');setEl('cal-target-value',settings.calTarget+' kcal');setEl('protein-target-value',settings.proteinTarget+'g');
    }
    await updateProfileHeroCard();
}

async function updateProfileHeroCard(){
    const name=settings.name||'Athlete';
    const goal=settings.phaseName||settings.goal||'Hybrid Athlete';
    const wo=workoutHistory.filter(w=>w&&w.type!=='rest').length;
    const n=document.getElementById('profile-hero-name');
    if(n)n.textContent=name;
    const g=document.getElementById('profile-hero-goal');
    if(g)g.textContent=goal;
    const initials=name.split(/\s+/).map(p=>p[0]).join('').slice(0,2).toUpperCase()||'PG';
    const av=document.getElementById('profile-hero-avatar');
    if(av)av.textContent=initials;
    const xpCur=Math.min(4000,Math.round(wo*72+250));
    const xpMax=4000;
    const xpPct=Math.min(100,Math.round((xpCur/xpMax)*100));
    const fill=document.getElementById('profile-xp-fill');
    if(fill)fill.style.width=xpPct+'%';
    const lab=document.getElementById('profile-xp-label');
    if(lab)lab.textContent=`${xpCur.toLocaleString('en-GB')} / ${xpMax.toLocaleString('en-GB')} XP`;
    const stW=document.getElementById('profile-stat-workouts');
    if(stW)stW.textContent=String(wo);
    let earned=[];
    let streakRec='0';
    try{
        const profile=await PG.profile.get();
        earned=Array.isArray(profile?.badges)?profile.badges:[];
        const progressEntries=await PG.progress.getAll();
        streakRec=String(progressEntries?.[0]?.streakRecord??'0');
    }catch(_){}
    const streakEl=document.getElementById('profile-stat-streak');
    if(streakEl)streakEl.textContent=streakRec;
    const ach=document.getElementById('profile-stat-achievements');
    if(ach)ach.textContent=String(earned.length);
    const hx=document.getElementById('profile-hex-badges');
    if(hx)hx.innerHTML='<div class="profile-hex" title="Streak">🔥</div><div class="profile-hex" title="Early bird">☀️</div><div class="profile-hex" title="PRs">🏆</div>';
}

function populateSettingsFields(profile) {
    if(!profile)return;
    const setVal=(id,val)=>{const el=document.getElementById(id);if(el&&val!==undefined)el.value=val;};
    setVal('set-name',profile.name);setVal('set-age',profile.age);setVal('set-gender',profile.gender);
    setVal('set-height',profile.height);setVal('set-weight',profile.weight);setVal('set-target-weight',profile.targetWeight);
    setVal('set-activity',profile.activity);setVal('set-goal',profile.goal);setVal('set-environment',profile.environment);
    setVal('set-diet',profile.diet);setVal('set-units',profile.units);setVal('set-language',profile.language);
    setVal('set-phase-name',profile.phaseName);setVal('set-phase-duration',profile.phaseDuration||56);
    setVal('set-training-days',profile.trainingDays);
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

async function checkBadges(){
    const profile=await PG.profile.get();
    const earned=[...(profile?.badges||[])];
    const before=earned.length;
    for(const b of badgeDefinitions){
        const unlocked=await b.check();
        if(!earned.includes(b.id)&&unlocked)earned.push(b.id);
    }
    if(earned.length>before)hapticAchievement();
    await PG.profile.save({badges:earned});
}
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
        ${topLift?`<div style="color:var(--label-secondary);font-size:12px;margin-top:4px;">${topLift.name} — ${topLift.sets.length} sets</div>`:''}
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
    return rows.map(r=>{
        const baseDate=r.logged_at?new Date(r.logged_at).toLocaleDateString('en-GB'):(r.date||'');
        if(Array.isArray(r.exercises)||r.category!==undefined||r.is_rest_day!==undefined){
            return {
                type:r.is_rest_day?'rest':'workout',
                muscle:r.category||'Workout',
                date:baseDate,
                duration:r.duration_seconds?Math.round((parseFloat(r.duration_seconds)||0)/60):0,
                exercises:Array.isArray(r.exercises)?r.exercises:[]
            };
        }
        if(r.type!==undefined||r.duration_minutes!==undefined||r.distance_km!==undefined){
            return {
                type:'cardio',
                cardioType:r.type||'Cardio',
                date:baseDate,
                duration:r.duration_minutes||0,
                distance:r.distance_km||0,
                intensity:r.intensity||'',
                notes:r.notes||''
            };
        }
        const {id,user_id,created_at,updated_at,...rest}=r||{};
        return rest;
    });
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

    const rowBasedCheckins=sorted
        .filter(r=>r&&typeof r==='object'&&(r.weight_kg!==undefined||r.energy_level!==undefined||r.notes))
        .map(r=>({
            date:r.logged_at?new Date(r.logged_at).toLocaleDateString('en-GB'):'',
            weight:r.weight_kg??'',
            energy:r.energy_level??'',
            notes:r.notes??''
        }));
    if(rowBasedCheckins.length>0) normalized.checkinHistory=rowBasedCheckins;

    const measurementSnapshot=sorted.find(r=>r&&typeof r==='object'&&(r.chest_cm!==undefined||r.waist_cm!==undefined||r.hips_cm!==undefined||r.arms_cm!==undefined||r.legs_cm!==undefined));
    if(measurementSnapshot){
        normalized.measurements={
            date:measurementSnapshot.logged_at?new Date(measurementSnapshot.logged_at).toLocaleDateString('en-GB'):'',
            chest:measurementSnapshot.chest_cm??'',
            waist:measurementSnapshot.waist_cm??'',
            hips:measurementSnapshot.hips_cm??'',
            arms:measurementSnapshot.arms_cm??'',
            legs:measurementSnapshot.legs_cm??''
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
            .filter(r=>r&&typeof r==='object'&&typeof r.name==='string'&&Array.isArray(r.exercises)&&r.category!=='MEAL_TEMPLATE')
            .map(r=>({name:r.name,exercises:r.exercises,created:r.created,programmeData:r.programmeData,locked:r.locked}));
    }
    const latestTemplates=pickLatestRow(sorted.filter(r=>Array.isArray(r?.mealTemplates)));
    if(Array.isArray(latestTemplates.mealTemplates)) normalized.mealTemplates=latestTemplates.mealTemplates;
    const latestUnlocked=pickLatestRow(sorted.filter(r=>Array.isArray(r?.unlockedCodes)));
    if(Array.isArray(latestUnlocked.unlockedCodes)) normalized.unlockedCodes=latestUnlocked.unlockedCodes;
    return normalized;
}

async function saveToStorage(opts={}) {
    const options={skipWorkouts:false,skipNutrition:false,...opts};
    if(!options.skipWorkouts){
        console.log('[Storage Save] skipping legacy workouts snapshot save');
    }
    console.log('[Storage Save] skipping legacy cardio/progress/routines snapshot saves');
    if(!options.skipNutrition){
        const nutritionResult=await persistNutritionState('saveToStorage sync');
        console.log('[Storage Save] nutrition sync result:',nutritionResult);
    }
}

async function loadFromStorage() {
    try {
        const profile = await PG.profile.get() || {};
        const isDark=profile.dark_mode===true||profile.darkMode==='dark'||profile.darkMode===true||profile.theme==='dark';
        if(isDark){document.body.classList.add('dark');const t=document.getElementById('dark-toggle');if(t)t.classList.add('on');}
        const workouts=await PG.workouts.getAll();
        const cardio=await PG.cardio.getAll();
        const routinesData=await PG.routines.getAll();
        const progressData=await PG.progress.getAll();
        const todayNutrition=await PG.nutrition.getToday();
        console.log('[Storage Load] workouts rows:',workouts);
        console.log('[Storage Load] cardio rows:',cardio);
        console.log('[Storage Load] routines rows:',routinesData);
        console.log('[Storage Load] progress rows:',progressData);
        console.log('[Storage Load] today nutrition row:',todayNutrition);
        workoutHistory=normalizeHistoryRows(workouts,'history');
        cardioHistory=normalizeHistoryRows(cardio,'history');
        const normalizedProgress=normalizeProgressRows(progressData);
        checkinHistory=normalizedProgress.checkinHistory;
        personalBests=normalizedProgress.personalBests;
        meals=Array.isArray(todayNutrition?.meals)&&todayNutrition.meals.length>0
            ? todayNutrition.meals
            : normalizedProgress.meals;
        console.log('[Storage Load] hydrated workoutHistory:',workoutHistory);
        console.log('[Storage Load] hydrated meals:',meals);
        phaseHistory=normalizedProgress.phaseHistory;
        measurements=normalizedProgress.measurements;
        const normalizedRoutines=normalizeRoutinesRows(routinesData);
        savedRoutines=normalizedRoutines.savedRoutines;
        customExercises=normalizedRoutines.customExercises;
        settings={
            ...profile,
            weight:profile.weight_kg??profile.weight??0,
            targetWeight:profile.target_weight_kg??profile.targetWeight??0,
            height:profile.height_cm??profile.height??0,
            environment:profile.training_env??profile.environment??'gym',
            diet:profile.dietary_pref??profile.diet??'standard',
            darkMode:isDark?'dark':'light',
            activity:profile.activity_level??profile.activity??1.55,
            calTarget:profile.calorie_target??profile.calTarget??2000,
            proteinTarget:profile.protein_target??profile.proteinTarget??150,
            stepsTarget:profile.steps_target??profile.stepsTarget??8000,
            custom_supplements:Array.isArray(profile.custom_supplements)?profile.custom_supplements:[],
            supplements_catalog:Array.isArray(profile.supplements_catalog)?profile.supplements_catalog:undefined
        };
        if (settings.activeProgram && settings.activeProgram.workouts) {
          savedRoutines = settings.activeProgram.workouts.map(w => ({
            ...w,
            scheduled_days: w.scheduledDays || w.scheduled_days || []
          }));
        }
        selectedLang=settings.language||'en';
        populateSettingsFields(settings);
        applyTranslations();checkBadges();updateHome();
        await renderSupplements();
    } catch (err) {
        console.error('[Storage Load] failed:', err);
    }
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
function handleResetConfirmInput() {
    const input=document.getElementById('reset-confirm-input');
    const btn=document.getElementById('reset-all-data-btn');
    if(!input||!btn)return;
    const enabled=(input.value||'').trim()==='RESET';
    btn.disabled=!enabled;
    btn.style.cursor=enabled?'pointer':'not-allowed';
    btn.style.opacity=enabled?'1':'0.6';
}

async function resetAllData() {
    const input=document.getElementById('reset-confirm-input');
    const confirmValue=(input?.value||'').trim();
    if(confirmValue!=='RESET'){
        showToast('Type RESET to confirm','error',2500);
        return;
    }
    if(!confirm('This will permanently delete all data. Continue?')) return;
    try{
        const { data }=await PG.db.auth.getUser();
        const userId=data?.user?.id;
        if(!userId){
            showToast('No user session found','error',3000);
            return;
        }
        const tables=['workouts','nutrition_logs','progress_logs','cardio_sessions','routines'];
        for(const table of tables){
            const { error }=await PG.db.from(table).delete().eq('user_id',userId);
            if(error) throw error;
        }
        showToast('All data deleted','success',1800);
        setTimeout(()=>window.location.reload(),900);
    }catch(err){
        console.error('resetAllData:',err);
        showToast('Reset failed — please try again','error',4000);
    }
}

async function unlockProgramme() {
    const code = document.getElementById('programme-code').value.trim().toUpperCase();
    const programme = programmeTemplates[code];
    if (!programme) {
        alert('Invalid code. Please check your code and try again.');
        return;
    }
    const unlockedCodes=Array.isArray(settings.programme_codes)?[...settings.programme_codes]:[];
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
    settings.programme_codes=unlockedCodes;
    await PG.profile.save({programme_codes:unlockedCodes});
    await saveToStorage();
    document.getElementById('programme-code').value = '';
    alert('🎉 ' + programme.name + ' unlocked! Check My Routines.');
    renderRoutinesList();
}
async function logRestDay() {
  const todayStr = new Date().toLocaleDateString('en-GB');
  const alreadyDone = workoutHistory.some(w => w.date === todayStr);
  if (alreadyDone) {
    showToast('Already logged today', 'error', 2000);
    return;
  }
  const restEntry = {
    date: todayStr,
    type: 'rest',
    name: 'Rest Day',
    duration: 0,
    calories: 0
  };
  try {
    await PG.workouts.save(restEntry);
    workoutHistory.unshift(restEntry);
    showToast('Rest day logged', 'success', 2000);
    await updateHome();
    updateTodayPlanButtons();
    renderProgramTab();
    if (typeof updateHome === 'function') updateHome();
  } catch(e) {
    showToast('Failed to save', 'error', 3000);
  }
}


async function saveStepsTrain() {
    try{
        const stepsInputEl=document.getElementById('input-steps-train');
        const stepsInput=stepsInputEl?.value;
        if(stepsInput===''){
            showToast('Enter your steps first','error',2500);
            return;
        }
        const stepsValue=parseInt(stepsInput,10)||0;
        if(stepsValue<=0){
            showToast('Enter a valid step amount','error',2500);
            return;
        }
        const currentNutrition=await PG.nutrition.getToday()||{};
        const currentSteps=parseInt(currentNutrition.steps,10)||0;
        const totalSteps=currentSteps+stepsValue;
        const savePayload={steps:totalSteps};
        console.log('[Steps Save] payload:',savePayload);
        const saveResult=await PG.nutrition.save(savePayload);
        if (typeof updateHome === 'function') updateHome();
        console.log('[Steps Save] result:',saveResult);
        if(saveResult?.ok===false||saveResult?.error){
            throw saveResult.error||new Error('Steps save failed');
        }
        if(stepsInputEl)stepsInputEl.value='';
        await updateStepsDisplay();
        await loadNutrition();
        await updateHome();
        showToast(`Added ${stepsValue.toLocaleString('en-GB')} steps — Total: ${totalSteps.toLocaleString('en-GB')} steps today`,'success',2600);
    }catch(err){
        console.error('saveStepsTrain:',err);
        showToast('Save failed — please try again','error',4000);
    }
}

async function updateStepsDisplay() {
    const today=new Date().toLocaleDateString('en-GB');
    const data=await PG.nutrition.getToday()||{steps:0,water:0,water_litres:0};
    const steps=parseInt(data.steps)||0;
    const stepsTarget=settings.stepsTarget||8000;
    const el=document.getElementById('steps-display-train');
    const bar=document.getElementById('steps-bar-train');
    if(el)el.textContent=`${steps.toLocaleString('en-GB')} / ${stepsTarget.toLocaleString('en-GB')}`;
    if(bar)bar.style.width=Math.min((steps/stepsTarget)*100,100)+'%';
    renderTrainWeek();
}

function renderTrainWeek(){
    const host=document.getElementById('train-week-list');
    if(!host)return;
    const labels=['MON','TUE','WED','THU','FRI','SAT'];
    const now=new Date();
    const dow=now.getDay();
    const mondayOffset=dow===0?-6:1-dow;
    const phaseName=settings.phaseName||'Hybrid Athlete';
    const titleEl=document.getElementById('train-program-title');
    if(titleEl)titleEl.textContent=`Program: ${phaseName}`;
    const totalDays=settings.phaseDuration||56;
    let daysIn=0;
    if(settings.phaseStartDate){
        const parts=settings.phaseStartDate.split('/');
        const start=new Date(parts[2],parts[1]-1,parts[0]);
        daysIn=Math.max(0,Math.floor((Date.now()-start)/86400000));
    }
    const weekTotal=Math.max(1,Math.ceil(totalDays/7));
    const curWeek=Math.min(weekTotal,Math.max(1,Math.floor(daysIn/7)+1));
    const progEl=document.getElementById('train-week-progress-fill');
    const progLab=document.getElementById('train-week-progress-label');
    const pct=Math.min(100,Math.round((daysIn/Math.max(totalDays,1))*100));
    if(progEl)progEl.style.width=pct+'%';
    if(progLab)progLab.textContent=`${pct}% · Week ${curWeek} of ${weekTotal}`;
    const seg=Math.max(1,Math.ceil(totalDays/3));
    const activeIdx=Math.min(3,Math.max(1,Math.floor(daysIn/seg)+1));
    for(let p=1;p<=3;p++){
        const tab=document.getElementById('train-phase-tab-'+p);
        if(tab)tab.classList.toggle('train-phase-tab--active',p===activeIdx);
    }
    const lines=[];
    for(let i=0;i<6;i++){
        const d=new Date(now);
        d.setDate(now.getDate()+mondayOffset+i);
        const ds=d.toLocaleDateString('en-GB');
        const rest=workoutHistory.find(w=>w.date===ds&&w.type==='rest');
        const has=workoutHistory.find(w=>w.date===ds&&w.type!=='rest')||cardioHistory.find(c=>c.date===ds);
        const wn=labels[i];
        let title='Rest or upcoming';
        let meta='—';
        if(rest){title='Rest day';meta='Recovery';}
        else if(has){
            title=has.muscle||has.type||'Session';
            meta=has.muscle?`${has.muscle} focus`:'Logged';
        }
        const done=!!has||!!rest;
        lines.push(`<div class="train-week-row${done?' train-week-row--done':''}"><span class="train-week-day">${wn}</span><div class="train-week-info"><div class="train-week-name">${title}</div><div class="train-week-meta">${meta}</div></div><span class="train-week-ico" aria-hidden="true">${done?'✓':''}</span></div>`);
    }
    host.innerHTML=lines.join('');
}

function toggleWarmup(ei,si) {
    exercises[ei].sets[si].warmup=!exercises[ei].sets[si].warmup;
    renderExercises();
}

function getWorkingSets(ex) {
    return ex.sets.filter(s=>!s.warmup);
}

async function saveMealTemplate() {
    try{
        if(!currentMealIndex&&currentMealIndex!==0)return;
        const meal=meals[currentMealIndex];
        if(!meal||meal.foods.length===0){
            showToast('Add some foods to this meal first','error',3000);
            return;
        }
        const templateName=(prompt('Save this meal as a template:',meal.name)||meal.name||'Meal Template').trim();
        if(!templateName){
            showToast('Template name is required','error',2500);
            return;
        }
        const foodsData=Array.isArray(meal.foods)?meal.foods.map(f=>({...f})):[];
        const templatePayload={name:templateName,category:'MEAL_TEMPLATE',exercises:foodsData};
        console.log('[Meal Template Save] payload:',templatePayload);
        const templateSaveResult=await PG.routines.save(templatePayload);
        console.log('[Meal Template Save] result:',templateSaveResult);
        if(templateSaveResult?.ok===false||templateSaveResult?.error){
            throw templateSaveResult.error||new Error('Template save failed');
        }
        showToast('Meal template saved!','success',2200);
    }catch(err){
        console.error('saveMealTemplate:',err);
        showToast('Template save failed — please try again','error',4000);
    }
}

async function loadMealTemplate() {
    const routinesData=await PG.routines.getAll();
    console.log('[Meal Template Load] routines rows:',routinesData);
    const templates=(Array.isArray(routinesData)?routinesData:[])
        .filter(r=>r&&r.category==='MEAL_TEMPLATE'&&Array.isArray(r.exercises))
        .map(r=>({id:r.id,name:r.name||'Meal Template',foods:r.exercises}));
    console.log('[Meal Template Load] templates:',templates);
    if(templates.length===0){alert('No saved meal templates yet. Add foods to a meal and save it as a template first.');return;}
    const list=templates.map((t,i)=>`${i+1}. ${t.name} (${Array.isArray(t.foods)?t.foods.length:0} foods)`).join('\n');
    const choice=prompt(`Load a meal template:\n\n${list}\n\nEnter number:`);
    if(!choice)return;
    const index=parseInt(choice)-1;
    if(index>=0&&index<templates.length){
        const template=templates[index];
        const today=getNutritionViewDateStr();
        const foods=Array.isArray(template.foods)?template.foods.map(f=>({...f})):[];
        const mealName=(template.name||'Meal').trim();
        meals.push({name:mealName,date:today,foods});
        await persistNutritionState('loadMealTemplate apply');
        await saveToStorage({skipWorkouts:true,skipNutrition:true});
        renderMeals();loadNutrition();updateHome();
        closeMealTemplateModal();
    }
}
function checkinEntryToTime(entry){
    const p=(entry&&entry.date||'').split('/');
    if(p.length!==3)return 0;
    return new Date(parseInt(p[2],10),parseInt(p[1],10)-1,parseInt(p[0],10)).getTime();
}
function setProgressFilter(range,btn){
    progressChartRange=range;
    document.querySelectorAll('.progress-filter-btn').forEach(b=>b.classList.remove('active'));
    if(btn)btn.classList.add('active');
    else{
        const el=document.querySelector(`.progress-filter-btn[data-range="${range}"]`);
        if(el)el.classList.add('active');
    }
    renderWeightChart();
}

function renderWeightChart() {
    const canvas=document.getElementById('weight-chart');if(!canvas)return;
    const ctx=canvas.getContext('2d');
    const isDark=document.body.classList.contains('dark');
    const lineColor='#FFD60A';
    const labelColor=isDark?'#ffffff':'#111111';
    const gridColor=isDark?'#38383A':'#E5E5EA';
    const rangesMs={'1W':7,'1M':30,'3M':90,'6M':183,'1Y':366,'All':5000};
    const days=rangesMs[progressChartRange]||30;
    const cutoff=Date.now()-days*86400000;
    const pool=checkinHistory.filter(c=>checkinEntryToTime(c)>=cutoff).sort((a,b)=>checkinEntryToTime(a)-checkinEntryToTime(b));
    const data=pool.slice(-24);
    if(data.length<2){
        ctx.fillStyle=labelColor;
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
    ctx.strokeStyle=gridColor;ctx.lineWidth=1;
    for(let i=0;i<=4;i++){
        const y=pad+(h-pad*2)*(i/4);
        ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(w-pad,y);ctx.stroke();
    }
    // Line
    ctx.strokeStyle=lineColor;ctx.lineWidth=2.5;ctx.beginPath();
    data.forEach((d,i)=>{
        const x=pad+(w-pad*2)*(i/(data.length-1));
        const y=pad+(h-pad*2)*(1-(parseFloat(d.weight)-min)/(max-min));
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    });
    ctx.stroke();
    // Dots
    ctx.fillStyle=lineColor;
    data.forEach((d,i)=>{
        const x=pad+(w-pad*2)*(i/(data.length-1));
        const y=pad+(h-pad*2)*(1-(parseFloat(d.weight)-min)/(max-min));
        ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();
    });
    // Labels
    ctx.fillStyle=labelColor;ctx.font='11px sans-serif';ctx.textAlign='center';
    data.forEach((d,i)=>{
        const x=pad+(w-pad*2)*(i/(data.length-1));
        ctx.fillText(d.weight+'kg',x,h-8);
    });
}

// ── NEW HOME TAB UI HELPERS ───────────────────────────────────

function updateOverviewTiles(cals, steps, calTarget) {
    const nd = PG.state?.todayNutrition || {};
    const sleepRaw = nd.sleep_hours != null ? parseFloat(nd.sleep_hours) : NaN;
    const sleepStr = Number.isFinite(sleepRaw) && sleepRaw > 0
      ? `${Math.floor(sleepRaw)}h${Math.round((sleepRaw % 1) * 60) > 0 ? Math.round((sleepRaw % 1) * 60) + 'm' : ''}`
      : '—';
    const activeMins = parseInt(nd.active_minutes) || 0;
  
    setText('ov-calories', Math.round(cals).toLocaleString());
    setText('ov-steps', steps.toLocaleString());
    setText('ov-active-min', activeMins);
    setText('ov-sleep', sleepStr);
    setText('ov-cal-goal', `goal ${Math.round(calTarget).toLocaleString()}`);
    setBar('ov-bar-cal', (cals / calTarget) * 100);
    setBar('ov-bar-steps', (steps / 10000) * 100);
    setBar('ov-bar-active', (activeMins / 60) * 100);
    setBar('ov-bar-sleep', Number.isFinite(sleepRaw) ? (sleepRaw / 8) * 100 : 0);
  }
  
  function updateHabitRings(water, cals, calTarget, steps, nd) {
    const sleepRaw = nd?.sleep_hours != null ? parseFloat(nd.sleep_hours) : 0;
    const nutPct = Math.min(cals / calTarget, 1);
  
    setRing('hab-ring-water', water / 3);
    setText('hab-val-water', `${water.toFixed(1)} / 3L`);
    setText('hab-nudge-water', water >= 3 ? '✓ Done!' : `${(3 - water).toFixed(1)}L to go`);
  
    setRing('hab-ring-nutrition', nutPct);
    setText('hab-val-nutrition', nutPct >= 0.9 ? 'On Track' : `${Math.round(cals)} kcal`);
    setText('hab-nudge-nutrition', nutPct >= 1 ? '✓ Done!' : 'Log food');
  
    setRing('hab-ring-move', steps / 10000);
    setText('hab-val-move', `${steps.toLocaleString()} / 10k`);
    setText('hab-nudge-move', steps >= 10000 ? '✓ Done!' : `${(10000 - steps).toLocaleString()} left`);
  
    setRing('hab-ring-sleep', sleepRaw / 8);
    setText('hab-val-sleep', sleepRaw > 0 ? `${sleepRaw}h / 8h` : '— / 8h');
    setText('hab-nudge-sleep', sleepRaw >= 8 ? '✓ Done!' : sleepRaw > 0 ? `${(8 - sleepRaw).toFixed(1)}h short` : 'Log sleep');
  }
  
  function updateNutritionSummary(cals, protein, carbs, fats, calGoal, protGoal) {
    const remaining = Math.max(0, calGoal - cals);
    setRing('nut-ring', cals / calGoal, 201.06);
    setText('nut-ring-val', Math.round(cals).toLocaleString());
    setText('nut-ring-goal', `/ ${Math.round(calGoal).toLocaleString()} kcal`);
    setText('nut-sum-protein', `${Math.round(protein)} / ${Math.round(protGoal)}g`);
    setText('nut-sum-carbs', `${Math.round(carbs)} / 250g`);
    setText('nut-sum-fats', `${Math.round(fats)} / 70g`);
    setBar('nut-bar-protein', (protein / protGoal) * 100);
    setBar('nut-bar-carbs', (carbs / 250) * 100);
    setBar('nut-bar-fats', (fats / 70) * 100);
    setText('nut-remaining-label', remaining > 0 ? `${Math.round(remaining)} kcal remaining` : 'Goal reached! 🎉');
  }
  
  function updateStreakSection() {
    const streakCount = parseInt(document.getElementById('streak-count')?.textContent) || 0;
    setText('streak-title', `${streakCount} Day Streak`);
    const subs = ['Start your streak today!','Good start!','Keep going!','On a roll!','Strong week!','Unstoppable!','You\'re on fire! Keep it up.','Legendary! 🏆'];
    setText('streak-subtitle', subs[Math.min(streakCount, subs.length - 1)]);
    const dotsRow = document.getElementById('streak-dots-row');
    const sourceBar = document.getElementById('streak-bar');
    if (!dotsRow || !sourceBar) return;
    const sourceDays = sourceBar.querySelectorAll('.streak-day');
    const labels = ['M','T','W','T','F','S','S'];
    dotsRow.innerHTML = labels.map((lbl, i) => {
      const src = sourceDays[i];
      const done = src?.classList.contains('done');
      const isToday = src?.classList.contains('today');
      const dotStyle = done
        ? 'background:#f5c842;'
        : isToday
          ? 'border:2px solid #f5c842;background:transparent;'
          : 'background:#222;';
      const check = done
        ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#111" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        : '';
      return `<div style="text-align:center;">
        <div style="font-size:9px;color:#666;margin-bottom:4px;">${lbl}</div>
        <div style="width:28px;height:28px;border-radius:50%;margin:0 auto;display:flex;align-items:center;justify-content:center;${dotStyle}">${check}</div>
      </div>`;
    }).join('');
  }
  
function updateUpcoming() {
  const upNextCard = document.getElementById('home-up-next-card');
  if (!upNextCard) return;

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const todayStr = new Date().toLocaleDateString('en-GB');
  const todayName = days[new Date().getDay()];

  const routines = Array.isArray(savedRoutines) ? savedRoutines : [];
  const workoutDoneToday = workoutHistory.some(w => w.date === todayStr && w.type !== 'rest');

  // No program set up
  if (routines.length === 0) {
    upNextCard.innerHTML = `
      <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:8px;">UP NEXT</p>
      <p style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:12px;">No plan set up yet</p>
      <p style="font-size:13px;color:var(--label-secondary);margin-bottom:12px;">Set up your plan to see upcoming sessions.</p>
      <button onclick="showScreen('screen-train')" style="background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:10px 16px;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;">
        Go to Train →
      </button>`;
    return;
  }

  // Find today's workout
  const todayRoutine = routines.find(r => r.scheduled_days && r.scheduled_days.includes(todayName));

  // If today not done, show today
  if (todayRoutine && !workoutDoneToday) {
    upNextCard.innerHTML = `
      <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:8px;">UP NEXT</p>
      <p style="font-size:11px;color:#FFD60A;font-weight:700;margin-bottom:4px;">TODAY</p>
      <p style="font-size:16px;font-weight:700;color:var(--text);margin-bottom:4px;">${todayRoutine.name}</p>
      <p style="font-size:13px;color:var(--label-secondary);margin-bottom:12px;">${getWorkoutMuscles(todayRoutine.name)}</p>
      <button onclick="showScreen('screen-train')" style="background:#FFD60A;border:none;border-radius:12px;padding:10px 16px;font-size:13px;font-weight:800;color:#111;cursor:pointer;">
        Start Now →
      </button>`;
    return;
  }

  // Find next scheduled workout after today
  const todayIndex = new Date().getDay(); // 0=Sun
  let nextRoutine = null;
  let nextDayLabel = '';

  for (let i = 1; i <= 7; i++) {
    const nextDay = days[(todayIndex + i) % 7];
    const found = routines.find(r => r.scheduled_days && r.scheduled_days.includes(nextDay));
    if (found) {
      nextRoutine = found;
      nextDayLabel = i === 1 ? 'Tomorrow' : nextDay;
      break;
    }
  }

  if (nextRoutine) {
    upNextCard.innerHTML = `
      <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:8px;">UP NEXT</p>
      <p style="font-size:11px;color:var(--label-secondary);font-weight:700;margin-bottom:4px;">${nextDayLabel.toUpperCase()}</p>
      <p style="font-size:16px;font-weight:700;color:var(--text);margin-bottom:4px;">${nextRoutine.name}</p>
      <p style="font-size:13px;color:var(--label-secondary);margin-bottom:12px;">${getWorkoutMuscles(nextRoutine.name)}</p>
      <button onclick="showScreen('screen-train')" style="background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:10px 16px;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;">
        View Plan →
      </button>`;
  } else {
    upNextCard.innerHTML = `
      <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:8px;">UP NEXT</p>
      <p style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:8px;">No upcoming sessions</p>
      <button onclick="showScreen('screen-train')" style="background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:10px 16px;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;">
        Go to Train →
      </button>`;
  }
}

function renderProgramTab() {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const todayName = days[new Date().getDay()];
  const todayStr = new Date().toLocaleDateString('en-GB');
  const routines = Array.isArray(savedRoutines) ? savedRoutines : [];

  const programCard = document.getElementById('train-program-card');
  const todayCard = document.getElementById('train-today-card');
  const weeklyCard = document.getElementById('train-weekly-card');

  // NO PROGRAM STATE
  if (routines.length === 0) {
    if (programCard) programCard.innerHTML = `
      <p style="font-size:16px;font-weight:700;margin-bottom:4px;">No program selected</p>
      <p style="font-size:13px;color:var(--label-secondary);margin-bottom:16px;">Choose a program or start a quick workout.</p>
      <button onclick="showChooseProgram()" style="width:100%;background:#FFD60A;border:none;border-radius:12px;padding:14px;font-size:14px;font-weight:800;color:#111;cursor:pointer;margin-bottom:8px;">Choose Program</button>
      <button onclick="showQuickWorkout()" style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:14px;font-size:14px;font-weight:700;color:var(--text);cursor:pointer;">Start Quick Workout</button>
    `;
    if (todayCard) todayCard.innerHTML = `
      <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:8px;">TODAY</p>
      <p style="font-size:16px;font-weight:700;margin-bottom:4px;">No workout scheduled</p>
      <p style="font-size:13px;color:var(--label-secondary);margin-bottom:16px;">Set up a plan to see your daily workouts.</p>
      <button onclick="showQuickWorkout()" style="width:100%;background:#FFD60A;border:none;border-radius:12px;padding:14px;font-size:14px;font-weight:800;color:#111;cursor:pointer;margin-bottom:8px;">Start Quick Workout</button>
      <button onclick="showChooseProgram()" style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:14px;font-size:14px;font-weight:700;color:var(--text);cursor:pointer;">Set Up Plan</button>
    `;
    if (weeklyCard) weeklyCard.innerHTML = `
      <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:8px;">WEEKLY SUMMARY</p>
      <p style="font-size:13px;color:var(--label-secondary);">Set up a plan to track weekly training.</p>
    `;
    return;
  }

  // PROGRAM EXISTS
  const todayRoutine = routines.find(r => r.scheduled_days && r.scheduled_days.includes(todayName));
  const workoutDoneToday = workoutHistory.some(w => w.date === todayStr && w.type !== 'rest');
  const restDoneToday = workoutHistory.some(w => w.date === todayStr && w.type === 'rest');

  // Program card
  if (programCard) {
    const totalDays = routines.reduce((a, r) => a + (r.scheduled_days?.length || 0), 0);
    programCard.innerHTML = `
      <p style="font-size:16px;font-weight:700;margin-bottom:4px;">${settings.phaseName || 'My Program'}</p>
      <p style="font-size:13px;color:var(--label-secondary);">${totalDays} days/week · ${routines.length} workouts</p>
    `;
  }

  // Today card
  if (todayCard) {
    if (workoutDoneToday) {
      todayCard.innerHTML = `
        <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:8px;">TODAY</p>
        <p style="font-size:16px;font-weight:700;color:#22c55e;margin-bottom:4px;">✓ Workout Completed</p>
        <p style="font-size:13px;color:var(--label-secondary);">Great work — rest up and recover.</p>
      `;
    } else if (restDoneToday) {
      todayCard.innerHTML = `
        <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:8px;">TODAY</p>
        <p style="font-size:16px;font-weight:700;color:#6E6E73;margin-bottom:4px;">🌙 Rest Day</p>
        <p style="font-size:13px;color:var(--label-secondary);">Recovery is part of the programme.</p>
      `;
    } else if (todayRoutine) {
      todayCard.innerHTML = `
        <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:8px;">TODAY</p>
        <p style="font-size:16px;font-weight:700;margin-bottom:4px;">${todayRoutine.name}</p>
        <p style="font-size:13px;color:var(--label-secondary);margin-bottom:16px;">${getWorkoutMuscles(todayRoutine.name)}</p>
        <button onclick="startWorkoutSession && startWorkoutSession(savedRoutines.find(r=>r.name==='${todayRoutine.name}'))" style="width:100%;background:#FFD60A;border:none;border-radius:12px;padding:14px;font-size:14px;font-weight:800;color:#111;cursor:pointer;margin-bottom:8px;">Start Workout</button>
        <div style="display:flex;gap:8px;">
          <button onclick="showScreen('screen-train')" style="flex:1;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;">View Workout</button>
          <button onclick="logRestDay()" style="flex:1;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;">🌙 Rest Day</button>
        </div>
      `;
    } else {
      todayCard.innerHTML = `
        <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:8px;">TODAY</p>
        <p style="font-size:16px;font-weight:700;margin-bottom:4px;">No workout scheduled</p>
        <p style="font-size:13px;color:var(--label-secondary);margin-bottom:16px;">Rest day or start a quick workout.</p>
        <button onclick="showQuickWorkout()" style="width:100%;background:#FFD60A;border:none;border-radius:12px;padding:14px;font-size:14px;font-weight:800;color:#111;cursor:pointer;">Start Quick Workout</button>
      `;
    }
  }

  // Weekly card
  if (weeklyCard) {
    const now = new Date();
    const dow = now.getDay();
    const mondayOffset = dow === 0 ? -6 : 1 - dow;
    let weekDone = 0;
    const planned = routines.reduce((a, r) => a + (r.scheduled_days?.length || 0), 0);
    const denominator = planned > 0 ? Math.min(planned, 7) : 7;
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + mondayOffset + i);
      const ds = d.toLocaleDateString('en-GB');
      const done = workoutHistory.some(w => w.date === ds && w.type !== 'rest');
      if (done) weekDone++;
    }
    const pct = Math.round((weekDone / denominator) * 100);
    weeklyCard.innerHTML = `
      <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:8px;">WEEKLY SUMMARY</p>
      <p style="font-size:24px;font-weight:800;margin-bottom:2px;">${pct}%</p>
      <p style="font-size:13px;color:var(--label-secondary);">${weekDone} of ${denominator} workouts completed</p>
    `;
  }
}

function showQuickWorkout() {
  const existing = document.getElementById('quick-workout-modal');
  if (existing) { existing.style.display = 'flex'; return; }
  const modal = document.createElement('div');
  modal.id = 'quick-workout-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:50000;display:flex;align-items:flex-end;justify-content:center;';
  modal.innerHTML = `
    <div style="background:var(--card);border-radius:24px 24px 0 0;padding:28px 24px 40px;width:100%;max-width:480px;">
      <h3 style="font-size:18px;font-weight:800;margin-bottom:20px;">Quick Workout</h3>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <button onclick="startQuickStrength();document.getElementById('quick-workout-modal').style.display='none'" style="background:var(--bg);border:1.5px solid var(--border);border-radius:14px;padding:16px;font-size:15px;font-weight:700;color:var(--text);cursor:pointer;text-align:left;">💪 Strength</button>
        <button onclick="showCardioLog();document.getElementById('quick-workout-modal').style.display='none'" style="background:var(--bg);border:1.5px solid var(--border);border-radius:14px;padding:16px;font-size:15px;font-weight:700;color:var(--text);cursor:pointer;text-align:left;">🏃 Cardio</button>
        <button onclick="startQuickMobility();document.getElementById('quick-workout-modal').style.display='none'" style="background:var(--bg);border:1.5px solid var(--border);border-radius:14px;padding:16px;font-size:15px;font-weight:700;color:var(--text);cursor:pointer;text-align:left;">🧘 Mobility</button>
      </div>
      <button onclick="document.getElementById('quick-workout-modal').style.display='none'" style="width:100%;background:none;border:none;padding:16px;font-size:14px;color:var(--label-secondary);cursor:pointer;margin-top:8px;">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function showCardioLog() {
  const existing = document.getElementById('cardio-log-modal');
  if (existing) { existing.style.display = 'flex'; return; }
  const modal = document.createElement('div');
  modal.id = 'cardio-log-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:50000;display:flex;align-items:flex-end;justify-content:center;';
  modal.innerHTML = `
    <div style="background:var(--card);border-radius:24px 24px 0 0;padding:28px 24px 40px;width:100%;max-width:480px;">
      <h3 style="font-size:18px;font-weight:800;margin-bottom:20px;">Log Cardio</h3>
      <select id="cardio-type" style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);margin-bottom:12px;">
        <option value="treadmill">Treadmill</option>
        <option value="bike">Bike</option>
        <option value="rower">Rower</option>
        <option value="assault_bike">Assault Bike</option>
        <option value="other">Other</option>
      </select>
      <input id="cardio-duration" type="number" placeholder="Duration (mins)" style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);margin-bottom:12px;box-sizing:border-box;">
      <input id="cardio-distance" type="number" placeholder="Distance (km) optional" style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);margin-bottom:12px;box-sizing:border-box;">
      <input id="cardio-calories" type="number" placeholder="Calories burned (optional)" style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:12px;font-size:14px;color:var(--text);margin-bottom:16px;box-sizing:border-box;">
      <button onclick="saveCardioLog()" style="width:100%;background:#FFD60A;border:none;border-radius:12px;padding:16px;font-size:15px;font-weight:800;color:#111;cursor:pointer;margin-bottom:8px;">Save Cardio</button>
      <button onclick="document.getElementById('cardio-log-modal').style.display='none'" style="width:100%;background:none;border:none;padding:12px;font-size:14px;color:var(--label-secondary);cursor:pointer;">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);
}

async function saveCardioLog() {
  const type = document.getElementById('cardio-type')?.value || 'other';
  const duration = parseInt(document.getElementById('cardio-duration')?.value) || 0;
  const distance = parseFloat(document.getElementById('cardio-distance')?.value) || 0;
  const calories = parseInt(document.getElementById('cardio-calories')?.value) || 0;
  if (!duration) { showToast('Enter duration', 'error', 2000); return; }
  const entry = {
    date: new Date().toLocaleDateString('en-GB'),
    type: 'cardio',
    name: type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' '),
    duration,
    distance,
    calories,
    cardio_type: type
  };
  try {
    await PG.workouts.save(entry);
    cardioHistory.unshift(entry);
    document.getElementById('cardio-log-modal').style.display = 'none';
    showToast('Cardio logged!', 'success', 2000);
    if (typeof updateHome === 'function') updateHome();
    renderProgramTab();
  } catch(e) {
    showToast('Failed to save', 'error', 3000);
  }
}

function showChooseProgram() {
  const existing = document.getElementById('program-select-modal');
  if (existing) { existing.remove(); }
  
  let selectedGoal = '';
  let selectedProgram = null;
  
  const modal = document.createElement('div');
  modal.id = 'program-select-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:var(--bg);z-index:60000;overflow-y:auto;padding:24px;box-sizing:border-box;';
  
  modal.innerHTML = `
    <div style="max-width:480px;margin:0 auto;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px;">
        <button onclick="document.getElementById('program-select-modal').remove()" style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--text);">←</button>
        <h2 style="font-size:22px;font-weight:800;margin:0;">Choose Program</h2>
      </div>

      <p style="font-size:13px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:12px;">YOUR GOAL</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px;" id="goal-grid">
        ${[
          { id: 'fatloss', label: 'Fat Loss', icon: '🔥' },
          { id: 'muscle', label: 'Build Muscle', icon: '💪' },
          { id: 'hybrid', label: 'Hybrid', icon: '⚡' },
          { id: 'fitness', label: 'Beginner', icon: '🌱' }
        ].map(g => `
          <div onclick="selectProgramGoal('${g.id}', this)" style="background:var(--card);border:2px solid var(--border);border-radius:14px;padding:16px;cursor:pointer;text-align:center;">
            <div style="font-size:24px;margin-bottom:6px;">${g.icon}</div>
            <div style="font-size:13px;font-weight:700;color:var(--text);">${g.label}</div>
          </div>
        `).join('')}
      </div>

      <p style="font-size:13px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:12px;">PROGRAMS</p>
      <div id="program-list" style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">
        ${PROGRAM_TEMPLATES.map(p => `
          <div onclick="selectProgram('${p.id}', this)" id="prog-card-${p.id}" style="background:var(--card);border:2px solid var(--border);border-radius:16px;padding:16px;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <p style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:4px;">${p.name}</p>
                <p style="font-size:12px;color:var(--label-secondary);margin-bottom:8px;">${p.description}</p>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  <span style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:3px 8px;font-size:11px;font-weight:600;color:var(--label-secondary);">${p.durationWeeks} weeks</span>
                  <span style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:3px 8px;font-size:11px;font-weight:600;color:var(--label-secondary);">${p.workoutsPerWeek}x/week</span>
                  <span style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:3px 8px;font-size:11px;font-weight:600;color:var(--label-secondary);">${p.difficulty}</span>
                </div>
              </div>
              <span id="prog-check-${p.id}" style="font-size:18px;color:#FFD60A;opacity:0;">✓</span>
            </div>
          </div>
        `).join('')}
      </div>

      <button onclick="confirmProgramSelection()" id="start-program-btn" style="width:100%;background:#FFD60A;border:none;border-radius:16px;padding:18px;font-size:16px;font-weight:800;color:#111;cursor:pointer;opacity:0.4;pointer-events:none;">
        Start Program
      </button>
    </div>
  `;
  document.body.appendChild(modal);
}

window.selectProgramGoal = function(goalId, el) {
  document.querySelectorAll('#goal-grid > div').forEach(d => {
    d.style.borderColor = 'var(--border)';
    d.style.background = 'var(--card)';
  });
  el.style.borderColor = '#FFD60A';
  el.style.background = 'rgba(255,214,10,0.08)';
  
  // Filter programs
  const list = document.getElementById('program-list');
  PROGRAM_TEMPLATES.forEach(p => {
    const card = document.getElementById('prog-card-' + p.id);
    if (card) {
      card.style.display = (goalId === 'fitness' && p.goal === 'fitness') ||
        (goalId !== 'fitness' && p.goal === goalId) ||
        goalId === '' ? 'block' : 'none';
    }
  });
};

window.selectProgram = function(programId, el) {
  document.querySelectorAll('#program-list > div').forEach(d => {
    d.style.borderColor = 'var(--border)';
  });
  el.style.borderColor = '#FFD60A';
  document.querySelectorAll('[id^="prog-check-"]').forEach(c => c.style.opacity = '0');
  const check = document.getElementById('prog-check-' + programId);
  if (check) check.style.opacity = '1';
  
  window._selectedProgramId = programId;
  const btn = document.getElementById('start-program-btn');
  if (btn) { btn.style.opacity = '1'; btn.style.pointerEvents = 'auto'; }
};

async function confirmProgramSelection() {
  const programId = window._selectedProgramId;
  if (!programId) return;
  const template = PROGRAM_TEMPLATES.find(p => p.id === programId);
  if (!template) return;

  settings.activeProgram = {
    ...template,
    currentWeek: 1,
    startDate: new Date().toLocaleDateString('en-GB'),
    completedWorkouts: []
  };

  // Also update savedRoutines for Home compatibility
  savedRoutines = template.workouts.map(w => ({
    ...w,
    scheduled_days: w.scheduledDays
  }));

  await PG.profile.save(settings);
  document.getElementById('program-select-modal').remove();
  showToast(`${template.name} started!`, 'success', 2500);
  renderProgramTab();
  if (typeof updateHome === 'function') updateHome();
}

function renderExercisesTab() {
  const container = document.getElementById('exercises-tab-content');
  if (!container) return;

  const muscles = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio'];
  
  container.innerHTML = `
    <div style="padding:16px;">
      <input 
        id="exercise-search" 
        type="text" 
        placeholder="Search exercises..." 
        oninput="filterExercises()"
        style="width:100%;background:var(--card);border:1.5px solid var(--border);border-radius:12px;padding:12px 16px;font-size:14px;color:var(--text);box-sizing:border-box;margin-bottom:16px;"
      >
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin-bottom:16px;scrollbar-width:none;" id="muscle-filter-row">
        ${muscles.map(m => `
          <button 
            onclick="setMuscleFilter('${m}', this)" 
            class="muscle-filter-btn"
            style="flex-shrink:0;background:${m === 'All' ? '#FFD60A' : 'var(--card)'};color:${m === 'All' ? '#111' : 'var(--text)'};border:1.5px solid ${m === 'All' ? '#FFD60A' : 'var(--border)'};border-radius:20px;padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;">
            ${m}
          </button>
        `).join('')}
      </div>
      <div id="exercise-list-container" style="display:flex;flex-direction:column;gap:8px;"></div>
    </div>
  `;
  
  window._muscleFilter = 'All';
  renderExerciseList();
}

window.setMuscleFilter = function(muscle, el) {
  document.querySelectorAll('.muscle-filter-btn').forEach(b => {
    b.style.background = 'var(--card)';
    b.style.color = 'var(--text)';
    b.style.borderColor = 'var(--border)';
  });
  el.style.background = '#FFD60A';
  el.style.color = '#111';
  el.style.borderColor = '#FFD60A';
  window._muscleFilter = muscle;
  renderExerciseList();
};

window.filterExercises = function() {
  renderExerciseList();
};

function renderExerciseList() {
  const container = document.getElementById('exercise-list-container');
  if (!container) return;
  const search = (document.getElementById('exercise-search')?.value || '').toLowerCase();
  const muscle = window._muscleFilter || 'All';
  
  const filtered = EXERCISE_LIBRARY.filter(e => {
    const matchMuscle = muscle === 'All' || e.muscleGroup === muscle;
    const matchSearch = !search || e.name.toLowerCase().includes(search) || e.muscleGroup.toLowerCase().includes(search);
    return matchMuscle && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:var(--label-secondary);padding:32px 0;">No exercises found</p>`;
    return;
  }

  container.innerHTML = filtered.map(e => `
    <div onclick="openExerciseDetail('${e.name}')" style="background:var(--card);border-radius:14px;padding:14px 16px;cursor:pointer;display:flex;align-items:center;gap:14px;">
      <div style="width:44px;height:44px;background:var(--bg);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px;">
        ${getExerciseIcon(e.muscleGroup)}
      </div>
      <div style="flex:1;min-width:0;">
        <p style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:2px;">${e.name}</p>
        <p style="font-size:12px;color:var(--label-secondary);">${e.muscleGroup} · ${e.equipment}</p>
      </div>
      <span style="color:var(--label-secondary);font-size:16px;">›</span>
    </div>
  `).join('');
}

function getExerciseIcon(muscleGroup) {
  const icons = {
    'Chest': '🫁', 'Back': '🔙', 'Legs': '🦵',
    'Shoulders': '💪', 'Arms': '💪', 'Core': '⬡',
    'Cardio': '❤️'
  };
  return icons[muscleGroup] || '💪';
}

window.openExerciseDetail = function(name) {
  const exercise = EXERCISE_LIBRARY.find(e => e.name === name);
  if (!exercise) return;
  
  const modal = document.createElement('div');
  modal.id = 'exercise-detail-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:var(--bg);z-index:70000;overflow-y:auto;padding:24px;box-sizing:border-box;';
  modal.innerHTML = `
    <div style="max-width:480px;margin:0 auto;">
      <button onclick="document.getElementById('exercise-detail-modal').remove()" style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--text);margin-bottom:20px;display:block;">←</button>
      <div style="background:var(--card);border-radius:20px;padding:24px;margin-bottom:16px;text-align:center;">
        <div style="font-size:48px;margin-bottom:12px;">${getExerciseIcon(exercise.muscleGroup)}</div>
        <h2 style="font-size:22px;font-weight:800;margin-bottom:8px;">${exercise.name}</h2>
        <div style="display:flex;justify-content:center;gap:8px;">
          <span style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:4px 10px;font-size:12px;font-weight:600;color:var(--label-secondary);">${exercise.muscleGroup}</span>
          <span style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:4px 10px;font-size:12px;font-weight:600;color:var(--label-secondary);">${exercise.equipment}</span>
        </div>
      </div>
      <div style="background:var(--card);border-radius:20px;padding:24px;margin-bottom:16px;">
        <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:10px;">HOW TO DO IT</p>
        <p style="font-size:15px;line-height:1.6;color:var(--text);">${exercise.instructions}</p>
      </div>
      <button onclick="document.getElementById('exercise-detail-modal').remove()" style="width:100%;background:#FFD60A;border:none;border-radius:16px;padding:16px;font-size:15px;font-weight:800;color:#111;cursor:pointer;">
        Got it
      </button>
    </div>
  `;
  document.body.appendChild(modal);
};

function renderWorkoutsTab() {
  const container = document.getElementById('workouts-tab-content');
  if (!container) return;

  const routines = Array.isArray(savedRoutines) ? savedRoutines : [];
  const program = settings.activeProgram;
  const strengthHistory = (Array.isArray(workoutHistory) ? workoutHistory : []).filter(w => w.type !== 'rest' && w.type !== 'cardio');
  const cardioHist = Array.isArray(cardioHistory) ? cardioHistory : [];
  const units = settings.units || 'kg';

  container.innerHTML = `
    <div style="padding:16px;display:flex;flex-direction:column;gap:16px;">

      ${program ? `
      <div>
        <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:10px;">PROGRAM WORKOUTS</p>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${program.workouts.map(w => `
            <div style="background:var(--card);border-radius:16px;padding:16px;cursor:pointer;" onclick="openWorkoutDetail('${w.id}')">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <div>
                  <p style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:2px;">${w.name}</p>
                  <p style="font-size:12px;color:var(--label-secondary);">${w.exercises.length} exercises · ${w.duration} min · ~${w.calories} kcal</p>
                </div>
                <button onclick="event.stopPropagation();startWorkoutSession(settings.activeProgram.workouts.find(x=>x.id==='${w.id}'))" style="background:#FFD60A;border:none;border-radius:10px;padding:8px 14px;font-size:12px;font-weight:800;color:#111;cursor:pointer;">Start</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <div>
        <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:10px;">QUICK WORKOUTS</p>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div onclick="showQuickWorkout()" style="background:var(--card);border-radius:16px;padding:16px;cursor:pointer;display:flex;align-items:center;gap:12px;">
            <span style="font-size:24px;">💪</span>
            <div><p style="font-size:14px;font-weight:700;color:var(--text);">Strength</p><p style="font-size:12px;color:var(--label-secondary);">Custom workout</p></div>
          </div>
          <div onclick="showCardioLog()" style="background:var(--card);border-radius:16px;padding:16px;cursor:pointer;display:flex;align-items:center;gap:12px;">
            <span style="font-size:24px;">🏃</span>
            <div><p style="font-size:14px;font-weight:700;color:var(--text);">Cardio</p><p style="font-size:12px;color:var(--label-secondary);">Log cardio session</p></div>
          </div>
          <div onclick="startQuickMobility()" style="background:var(--card);border-radius:16px;padding:16px;cursor:pointer;display:flex;align-items:center;gap:12px;">
            <span style="font-size:24px;">🧘</span>
            <div><p style="font-size:14px;font-weight:700;color:var(--text);">Mobility</p><p style="font-size:12px;color:var(--label-secondary);">Stretch and recover</p></div>
          </div>
        </div>
      </div>

      <div>
        <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:10px;">STRENGTH HISTORY</p>
        ${strengthHistory.length === 0 
          ? `<p style="color:var(--label-secondary);font-size:13px;text-align:center;padding:20px 0;">Complete your first workout to see history</p>`
          : strengthHistory.slice(0, 10).map(w => `
            <div style="background:var(--card);border-radius:14px;padding:14px 16px;margin-bottom:8px;">
              <div style="display:flex;justify-content:space-between;">
                <p style="font-size:14px;font-weight:700;color:var(--text);">${w.name || 'Workout'}</p>
                <p style="font-size:12px;color:var(--label-secondary);">${w.date}</p>
              </div>
              <p style="font-size:12px;color:var(--label-secondary);">${w.duration ? w.duration + ' min' : ''} ${w.totalSets ? '· ' + w.totalSets + ' sets' : ''}</p>
            </div>
          `).join('')
        }
      </div>

      <div>
        <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:10px;">CARDIO HISTORY</p>
        ${cardioHist.length === 0
          ? `<p style="color:var(--label-secondary);font-size:13px;text-align:center;padding:20px 0;">No cardio sessions logged yet</p>`
          : cardioHist.slice(0, 10).map(c => `
            <div style="background:var(--card);border-radius:14px;padding:14px 16px;margin-bottom:8px;">
              <div style="display:flex;justify-content:space-between;">
                <p style="font-size:14px;font-weight:700;color:var(--text);">${c.name || c.cardio_type || 'Cardio'}</p>
                <p style="font-size:12px;color:var(--label-secondary);">${c.date}</p>
              </div>
              <p style="font-size:12px;color:var(--label-secondary);">
                ${c.duration ? c.duration + ' min' : ''}
                ${c.distance ? '· ' + c.distance + ' km' : ''}
                ${c.calories ? '· ' + c.calories + ' kcal' : ''}
              </p>
            </div>
          `).join('')
        }
      </div>
    </div>
  `;
}

window.openWorkoutDetail = function(workoutId) {
  const program = settings.activeProgram;
  if (!program) return;
  const workout = program.workouts.find(w => w.id === workoutId);
  if (!workout) return;

  const modal = document.createElement('div');
  modal.id = 'workout-detail-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:var(--bg);z-index:70000;overflow-y:auto;box-sizing:border-box;';
  modal.innerHTML = `
    <div style="max-width:480px;margin:0 auto;padding:24px;">
      <button onclick="document.getElementById('workout-detail-modal').remove()" style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--text);margin-bottom:20px;display:block;">←</button>
      <div style="background:var(--card);border-radius:20px;padding:20px;margin-bottom:16px;">
        <h2 style="font-size:22px;font-weight:800;margin-bottom:4px;">${workout.name}</h2>
        <p style="font-size:13px;color:var(--label-secondary);margin-bottom:12px;">${workout.focus}</p>
        <div style="display:flex;gap:12px;">
          <span style="font-size:13px;color:var(--label-secondary);">⏱ ${workout.duration} min</span>
          <span style="font-size:13px;color:var(--label-secondary);">🔥 ~${workout.calories} kcal</span>
        </div>
      </div>
      <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:10px;">EXERCISES</p>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px;">
        ${workout.exercises.map((e, i) => {
          const lastPerf = getLastPerformance(e.name);
          return `
            <div style="background:var(--card);border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:14px;">
              <span style="font-size:16px;font-weight:800;color:var(--label-secondary);width:20px;">${i+1}</span>
              <div style="flex:1;">
                <p style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:2px;">${e.name}</p>
                <p style="font-size:12px;color:var(--label-secondary);">${e.sets} sets × ${e.repsRange}</p>
                <p style="font-size:11px;color:${lastPerf ? '#FFD60A' : 'var(--label-secondary)'};">${lastPerf ? 'Last: ' + lastPerf : 'First time'}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <button onclick="document.getElementById('workout-detail-modal').remove();startWorkoutSession(settings.activeProgram.workouts.find(w=>w.id==='${workout.id}'))" style="width:100%;background:#FFD60A;border:none;border-radius:16px;padding:18px;font-size:16px;font-weight:800;color:#111;cursor:pointer;">
        Start Workout
      </button>
    </div>
  `;
  document.body.appendChild(modal);
};

function getLastPerformance(exerciseName) {
  const logs = JSON.parse(localStorage.getItem('exerciseLogs') || '[]');
  const last = logs.filter(l => l.name === exerciseName).sort((a,b) => new Date(b.date) - new Date(a.date))[0];
  if (!last) return null;
  const units = settings.units || 'kg';
  return `${last.weight}${units} × ${last.reps}`;
}

window.startWorkoutSession = function(workout) {
  if (!workout) { showQuickWorkout(); return; }
  
  const units = settings.units || 'kg';
  let currentExerciseIndex = 0;
  let currentSetIndex = 0;
  let completedSets = [];
  let sessionStart = Date.now();
  let restTimerInterval = null;

  const modal = document.createElement('div');
  modal.id = 'workout-session-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:var(--bg);z-index:80000;overflow-y:auto;box-sizing:border-box;';
  document.body.appendChild(modal);

  // Hide nav
  document.querySelector('.nav').style.display = 'none';

  function renderSession() {
    const exercise = workout.exercises[currentExerciseIndex];
    const totalSets = exercise.sets;
    const setsLeft = totalSets - currentSetIndex;
    const progress = Math.round(((currentExerciseIndex) / workout.exercises.length) * 100);
    const lastPerf = getLastPerformance(exercise.name);

    modal.innerHTML = `
      <div style="max-width:480px;margin:0 auto;padding:24px;min-height:100vh;display:flex;flex-direction:column;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <button onclick="confirmEndSession()" style="background:none;border:none;font-size:14px;font-weight:700;color:var(--label-secondary);cursor:pointer;">End</button>
          <p style="font-size:13px;font-weight:700;color:var(--label-secondary);">${currentExerciseIndex + 1} of ${workout.exercises.length}</p>
          <p style="font-size:13px;font-weight:700;color:var(--label-secondary);">Set ${currentSetIndex + 1} of ${totalSets}</p>
        </div>

        <div style="background:var(--card);border-radius:4px;height:4px;margin-bottom:28px;">
          <div style="background:#FFD60A;height:4px;border-radius:4px;width:${progress}%;transition:width 0.3s;"></div>
        </div>

        <h2 style="font-size:26px;font-weight:800;margin-bottom:6px;">${exercise.name}</h2>
        <p style="font-size:14px;color:var(--label-secondary);margin-bottom:6px;">${exercise.muscleGroup} · ${exercise.equipment}</p>
        <p style="font-size:13px;color:#FFD60A;font-weight:700;margin-bottom:28px;">${lastPerf ? 'Last: ' + lastPerf : 'First time'}</p>

        <div style="background:var(--card);border-radius:20px;padding:24px;margin-bottom:20px;">
          <p style="font-size:13px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:16px;">TARGET: ${exercise.sets} × ${exercise.repsRange}</p>
          
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
            <div>
              <p style="font-size:12px;color:var(--label-secondary);margin-bottom:6px;">WEIGHT (${units})</p>
              <input id="set-weight" type="number" placeholder="0" style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:14px;font-size:20px;font-weight:700;color:var(--text);text-align:center;box-sizing:border-box;">
            </div>
            <div>
              <p style="font-size:12px;color:var(--label-secondary);margin-bottom:6px;">REPS</p>
              <input id="set-reps" type="number" placeholder="0" style="width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;padding:14px;font-size:20px;font-weight:700;color:var(--text);text-align:center;box-sizing:border-box;">
            </div>
          </div>

          <button onclick="completeSet()" style="width:100%;background:#FFD60A;border:none;border-radius:14px;padding:16px;font-size:16px;font-weight:800;color:#111;cursor:pointer;">
            ✓ Complete Set ${currentSetIndex + 1}
          </button>
        </div>

        ${completedSets.filter(s => s.exerciseIndex === currentExerciseIndex).length > 0 ? `
        <div style="background:var(--card);border-radius:16px;padding:16px;">
          <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:10px;">COMPLETED SETS</p>
          ${completedSets.filter(s => s.exerciseIndex === currentExerciseIndex).map((s, i) => `
            <p style="font-size:13px;color:var(--text);margin-bottom:4px;">Set ${i+1}: ${s.weight}${units} × ${s.reps} reps ✓</p>
          `).join('')}
        </div>
        ` : ''}
      </div>
    `;
  }

  window.completeSet = function() {
    const weight = parseFloat(document.getElementById('set-weight')?.value) || 0;
    const reps = parseInt(document.getElementById('set-reps')?.value) || 0;
    if (!reps) { showToast('Enter reps', 'error', 1500); return; }
    
    const exercise = workout.exercises[currentExerciseIndex];
    
    // Save to exercise logs
    const logs = JSON.parse(localStorage.getItem('exerciseLogs') || '[]');
    logs.push({ name: exercise.name, weight, reps, date: new Date().toISOString() });
    localStorage.setItem('exerciseLogs', JSON.stringify(logs));
    
    completedSets.push({ exerciseIndex: currentExerciseIndex, weight, reps });
    currentSetIndex++;

    if (currentSetIndex >= exercise.sets) {
      // Exercise complete
      currentExerciseIndex++;
      currentSetIndex = 0;
      if (currentExerciseIndex >= workout.exercises.length) {
        finishWorkout();
        return;
      }
    }
    
    // Show rest timer
    showRestTimer();
  };

  function showRestTimer() {
    let seconds = 90;
    modal.innerHTML = `
      <div style="max-width:480px;margin:0 auto;padding:24px;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <p style="font-size:14px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:20px;">REST</p>
        <div style="font-size:72px;font-weight:800;color:var(--text);margin-bottom:32px;" id="rest-countdown">${seconds}s</div>
        <div style="display:flex;gap:12px;margin-bottom:32px;">
          <button onclick="addRestTime(30)" style="background:var(--card);border:1.5px solid var(--border);border-radius:12px;padding:12px 20px;font-size:14px;font-weight:700;color:var(--text);cursor:pointer;">+30s</button>
          <button onclick="skipRest()" style="background:#FFD60A;border:none;border-radius:12px;padding:12px 20px;font-size:14px;font-weight:800;color:#111;cursor:pointer;">Skip Rest</button>
        </div>
        <p style="font-size:13px;color:var(--label-secondary);">
          ${currentExerciseIndex < workout.exercises.length 
            ? 'Next: ' + workout.exercises[currentExerciseIndex].name
            : 'Workout Complete!'}
        </p>
      </div>
    `;

    restTimerInterval = setInterval(() => {
      seconds--;
      const el = document.getElementById('rest-countdown');
      if (el) el.textContent = seconds + 's';
      if (seconds <= 0) {
        clearInterval(restTimerInterval);
        renderSession();
      }
    }, 1000);

    window.addRestTime = function(s) { seconds += s; };
    window.skipRest = function() {
      clearInterval(restTimerInterval);
      renderSession();
    };
  }

  async function finishWorkout() {
    const duration = Math.round((Date.now() - sessionStart) / 60000);
    const totalSets = completedSets.length;
    const calories = Math.round(duration * 8);

    modal.innerHTML = `
      <div style="max-width:480px;margin:0 auto;padding:24px;min-height:100vh;display:flex;flex-direction:column;">
        <h2 style="font-size:28px;font-weight:800;margin-bottom:8px;">Workout Complete! 🎉</h2>
        <p style="font-size:14px;color:var(--label-secondary);margin-bottom:32px;">Great session, ${settings.name || 'Athlete'}.</p>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:24px;">
          <div style="background:var(--card);border-radius:16px;padding:16px;text-align:center;">
            <p style="font-size:24px;font-weight:800;color:var(--text);">${duration}</p>
            <p style="font-size:11px;color:var(--label-secondary);">minutes</p>
          </div>
          <div style="background:var(--card);border-radius:16px;padding:16px;text-align:center;">
            <p style="font-size:24px;font-weight:800;color:var(--text);">${totalSets}</p>
            <p style="font-size:11px;color:var(--label-secondary);">sets</p>
          </div>
          <div style="background:var(--card);border-radius:16px;padding:16px;text-align:center;">
            <p style="font-size:24px;font-weight:800;color:var(--text);">${calories}</p>
            <p style="font-size:11px;color:var(--label-secondary);">kcal</p>
          </div>
        </div>

        <div style="background:var(--card);border-radius:16px;padding:16px;margin-bottom:24px;">
          <p style="font-size:12px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);margin-bottom:10px;">EXERCISES</p>
          ${workout.exercises.map(e => `
            <p style="font-size:13px;color:var(--text);margin-bottom:6px;">✓ ${e.name} — ${e.sets} sets</p>
          `).join('')}
        </div>

        <button onclick="saveCompletedWorkout(${duration}, ${totalSets}, ${calories})" style="width:100%;background:#FFD60A;border:none;border-radius:16px;padding:18px;font-size:16px;font-weight:800;color:#111;cursor:pointer;">
          Save Workout
        </button>
      </div>
    `;
  }

  window.saveCompletedWorkout = async function(duration, totalSets, calories) {
    const todayStr = new Date().toLocaleDateString('en-GB');
    const entry = {
      date: todayStr,
      type: 'strength',
      name: workout.name,
      duration,
      totalSets,
      calories,
      exercisesCompleted: workout.exercises.length
    };
    try {
      await PG.workouts.save(entry);
      workoutHistory.unshift(entry);
    } catch(e) { console.error(e); }
    
    document.getElementById('workout-session-modal').remove();
    document.querySelector('.nav').style.display = '';
    showToast('Workout saved! 💪', 'success', 2500);
    if (typeof updateHome === 'function') updateHome();
    renderProgramTab();
    renderWorkoutsTab();
  };

  window.confirmEndSession = function() {
    if (confirm('End workout? Progress will not be saved.')) {
      clearInterval(restTimerInterval);
      document.getElementById('workout-session-modal').remove();
      document.querySelector('.nav').style.display = '';
    }
  };

  renderSession();
};
function startQuickStrength() { showToast('Coming soon', 'success', 2000); }
function startQuickMobility() { showToast('Coming soon', 'success', 2000); }
  
  // ── SHARED UTILITIES ─────────────────────────────────────────
  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }
  
  function setBar(id, pct) {
    const el = document.getElementById(id);
    if (el) el.style.width = Math.min(100, Math.max(0, pct || 0)) + '%';
  }
  
  function setRing(id, pct, circumference) {
    const circ = circumference || 138.23;
    const el = document.getElementById(id);
    if (el) el.setAttribute('stroke-dashoffset', circ - Math.min(1, Math.max(0, pct || 0)) * circ);
  }
// ══ TRAIN TAB ══════════════════════════════════════════════

let createFocus = '';
let createScheduledDays = [];
let activeTrainTab = 'program';

window.switchTrainTab = function(tab, el) {
  window._activeTrainTab = tab;
  document.querySelectorAll('.train-tab-btn').forEach(b => {
    b.style.background = 'transparent';
    b.style.color = 'var(--label-secondary)';
  });
  if (!el) {
    el = document.querySelector(`.train-tab-btn[onclick*="'${tab}'"]`);
  }
  if (el) {
    el.style.background = '#FFD60A';
    el.style.color = '#111';
  }

  document.getElementById('train-program-card').style.display = tab === 'program' ? '' : 'none';
  document.getElementById('train-today-card').style.display = tab === 'program' ? '' : 'none';
  document.getElementById('train-weekly-card').style.display = tab === 'program' ? '' : 'none';
  document.getElementById('exercises-tab-content').style.display = tab === 'exercises' ? '' : 'none';
  document.getElementById('workouts-tab-content').style.display = tab === 'workouts' ? '' : 'none';

  if (tab === 'program') renderProgramTab();
  else if (tab === 'exercises') renderExercisesTab();
  else if (tab === 'workouts') renderWorkoutsTab();
};

function switchTrainTab(tab, el) {
  return window.switchTrainTab(tab, el);
}

function switchWorkoutsTab(tab) {
  document.getElementById('train-panel-my-workouts').style.display = tab === 'my' ? 'block' : 'none';
  document.getElementById('train-panel-templates').style.display = tab === 'templates' ? 'block' : 'none';
  const myBtn = document.getElementById('wt-tab-my');
  const tplBtn = document.getElementById('wt-tab-templates');
  if (myBtn) { myBtn.style.background = tab === 'my' ? '#f5c842' : 'transparent'; myBtn.style.color = tab === 'my' ? '#111' : 'var(--label-secondary)'; myBtn.style.border = tab === 'my' ? 'none' : '1.5px solid var(--border)'; }
  if (tplBtn) { tplBtn.style.background = tab === 'templates' ? '#f5c842' : 'transparent'; tplBtn.style.color = tab === 'templates' ? '#111' : 'var(--label-secondary)'; tplBtn.style.border = tab === 'templates' ? 'none' : '1.5px solid var(--border)'; }
  if (tab === 'templates') renderWorkoutTemplates();
}

function showTrainSection(section) {
  const allSections = ['menu','routines','quick','create','cardio','active','cardio-active'];
  allSections.forEach(s => {
    const el = document.getElementById('train-' + s);
    if (el) el.style.display = 'none';
  });
  // Also hide tab panels when going into a flow
  const isFlow = ['create','active','cardio','cardio-active','quick'].includes(section);
  ['train-panel-program','train-panel-exercises','train-panel-workouts'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = isFlow ? 'none' : 'none';
  });
  // Show main tab panels when going to menu
  if (section === 'menu') {
    switchTrainTab('program');
    return;
  }
  const target = document.getElementById('train-' + section);
  if (target) target.style.display = 'block';
  if (section === 'create') {
    buildCreateExercisePicker();
    createFocus = '';
    createScheduledDays = [];
  }
  if (section === 'active') buildActiveExercisePicker();
}

function renderTrainProgram() {
  renderTrainWeek();
  renderTodayWorkoutCard();
  renderUpNext();
}

function renderTodayWorkoutCard() {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const today = days[new Date().getDay()];
  const routines = Array.isArray(savedRoutines) ? savedRoutines : [];
  const scheduled = routines.find(r => r.scheduled_days && r.scheduled_days.includes(today));

  const titleEl = document.getElementById('train-today-title');
  const musclesEl = document.getElementById('train-today-muscles');
  const focusTag = document.getElementById('train-today-focus-tag');

  if (scheduled) {
    if (titleEl) titleEl.textContent = scheduled.name;
    const muscles = getWorkoutMuscles(scheduled.name || '');
    if (musclesEl) musclesEl.textContent = muscles;
    if (focusTag) focusTag.style.display = 'inline-block';
    renderExercisePreview(scheduled);
  } else {
    if (titleEl) titleEl.textContent = 'No workout scheduled';
    if (musclesEl) musclesEl.textContent = 'Set up your plan or start a quick workout';
    if (focusTag) focusTag.style.display = 'none';
  }
}

function renderExercisePreview(routine) {
  const container = document.getElementById('train-exercise-preview');
  if (!container || !routine) return;
  const exercises = routine.exercises || [];
  if (exercises.length === 0) { container.innerHTML = ''; return; }
  const shown = exercises.slice(0, 4);
  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <p style="font-size:10px;font-weight:700;letter-spacing:1px;color:var(--label-secondary);">EXERCISES</p>
      <span style="font-size:12px;color:var(--label-secondary);">${exercises.length} Exercises ›</span>
    </div>
    ${shown.map((ex, i) => {
      const name = typeof ex === 'string' ? ex : ex.name;
      const sets = ex.sets || 3;
      const reps = ex.reps || '8–12';
      return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">
        <span style="width:18px;height:18px;background:var(--bg);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--label-secondary);flex-shrink:0;">${i+1}</span>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:700;color:var(--text);">${name}</div>
          <div style="font-size:11px;color:var(--label-secondary);">${sets} sets × ${reps} reps</div>
        </div>
        <div style="width:22px;height:22px;border-radius:50%;border:1.5px solid var(--border);"></div>
      </div>`;
    }).join('')}
    ${exercises.length > 4 ? `<p style="font-size:12px;color:var(--label-secondary);text-align:center;padding:8px 0;">+ ${exercises.length - 4} more exercises</p>` : ''}
  `;
}

function renderUpNext() {
  const container = document.getElementById('train-up-next');
  if (!container) return;
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const today = new Date();
  const todayIdx = today.getDay();
  const routines = Array.isArray(savedRoutines) ? savedRoutines : [];
  const upcoming = [];

  for (let i = 1; i <= 6; i++) {
    const dayIdx = (todayIdx + i) % 7;
    const dayName = days[dayIdx];
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const scheduled = routines.filter(r => r.scheduled_days && r.scheduled_days.includes(dayName));
    if (scheduled.length > 0) {
      scheduled.forEach(r => upcoming.push({ name: r.name, date, dayName, daysAhead: i }));
    }
  }

  if (upcoming.length === 0) {
    container.innerHTML = '<p style="font-size:13px;color:var(--label-secondary);padding:8px 0;">Schedule workouts to see upcoming sessions.</p>';
    return;
  }

  container.innerHTML = upcoming.slice(0, 3).map((item, idx) => {
    const label = item.daysAhead === 1 ? 'Tomorrow' : item.date.toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' });
    const isLast = idx === Math.min(upcoming.length, 3) - 1;
    return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;${isLast ? '' : 'border-bottom:1px solid var(--border);'}cursor:pointer;" onclick="switchTrainTab('workouts')">
      <div style="width:36px;height:36px;border-radius:10px;background:var(--bg);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 14h.5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-.5M9.5 14H9a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h.5M4 12h16M14.5 10v4M9.5 10v4"/></svg>
      </div>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:700;color:var(--text);">${item.name}</div>
        <div style="font-size:11px;color:var(--label-secondary);margin-top:1px;">${label}</div>
      </div>
      <div style="color:var(--label-secondary);font-size:18px;">›</div>
    </div>`;
  }).join('');
}

function renderTrainWeek() {
  const container = document.getElementById('train-week-dots');
  if (!container) return;
  const labels = ['M','T','W','T','F','S','S'];
  const now = new Date();
  const dow = now.getDay();
  const mondayOffset = dow === 0 ? -6 : 1 - dow;
  let doneCount = 0;
  const dots = labels.map((lbl, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() + mondayOffset + i);
    const ds = d.toLocaleDateString('en-GB');
    const isToday = i === (dow === 0 ? 6 : dow - 1);
    const done = !!(workoutHistory.find(w => w.date === ds) || cardioHistory.find(c => c.date === ds));
    if (done) doneCount++;
    const dotStyle = done
      ? 'background:#22c55e;'
      : isToday
        ? 'background:#f5c842;'
        : 'background:var(--border);';
    return `<div style="text-align:center;">
      <div style="font-size:10px;color:var(--label-secondary);margin-bottom:4px;font-weight:600;">${lbl}</div>
      <div style="width:32px;height:32px;border-radius:50%;margin:0 auto;display:flex;align-items:center;justify-content:center;${dotStyle}">
        ${done ? '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}
      </div>
    </div>`;
  });
  container.innerHTML = dots.join('');
  const totalScheduled = (Array.isArray(savedRoutines) ? savedRoutines : [])
    .reduce((acc, r) => acc + (r.scheduled_days ? r.scheduled_days.length : 0), 0);
  const weekCount = document.getElementById('train-week-count');
  if (weekCount) weekCount.textContent = `${doneCount} of ${Math.min(totalScheduled, 7)} Workouts`;

  // Program ring
  const totalDays = settings.phaseDuration || 56;
  let daysIn = 0;
  if (settings.phaseStartDate) {
    const parts = settings.phaseStartDate.split('/');
    const start = new Date(parts[2], parts[1]-1, parts[0]);
    daysIn = Math.max(0, Math.floor((Date.now() - start) / 86400000));
  }
  const pct = Math.min(100, Math.round((daysIn / totalDays) * 100));
  const ring = document.getElementById('train-prog-ring');
  if (ring) ring.setAttribute('stroke-dashoffset', 163.36 - (pct / 100) * 163.36);
  setText('train-prog-pct', pct + '%');
  const weekTotal = Math.max(1, Math.ceil(totalDays / 7));
  const curWeek = Math.min(weekTotal, Math.max(1, Math.floor(daysIn / 7) + 1));
  setText('train-program-phase-label', `Phase 1 · Week ${curWeek} of ${weekTotal}`);
  setText('train-program-name', settings.phaseName || 'Hybrid Athlete');
}

function startTodayWorkout() {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const today = days[new Date().getDay()];
  const routines = Array.isArray(savedRoutines) ? savedRoutines : [];
  const scheduled = routines.find(r => r.scheduled_days && r.scheduled_days.includes(today));
  if (scheduled) {
    startRoutineWorkout(scheduled);
  } else {
    showTrainSection('quick');
  }
}

function startRoutineWorkout(routine) {
  selectedMuscle = routine.name || 'Workout';
  exercises = (routine.exercises || []).map(ex => {
    const name = typeof ex === 'string' ? ex : ex.name;
    return { name, sets: [{reps: ex.reps || '', weight: ex.weight || ''}] };
  });
  firstSetLogged = false;
  showTrainSection('active');
  document.getElementById('active-workout-title').textContent = (routine.name || 'WORKOUT').toUpperCase();
  const saveBtnWrap = document.getElementById('save-btn-wrap');
  if (saveBtnWrap) saveBtnWrap.style.display = exercises.length > 0 ? 'block' : 'none';
  document.getElementById('save-btn').style.display = 'none';
  workoutStartTime = Date.now();
  const timerBar = document.getElementById('workout-timer-bar');
  if (timerBar) timerBar.style.display = 'flex';
  if (workoutTimerInterval) clearInterval(workoutTimerInterval);
  workoutTimerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - workoutStartTime) / 1000);
    const m = Math.floor(elapsed / 60).toString().padStart(2,'0');
    const s = (elapsed % 60).toString().padStart(2,'0');
    setText('workout-timer', m + ':' + s);
  }, 1000);
  buildActiveExercisePicker();
  renderExercises();
}

function confirmEndWorkout() {
  if (exercises.length > 0) {
    if (confirm('End workout without saving?')) {
      exercises = []; selectedMuscle = '';
      clearInterval(workoutTimerInterval);
      showTrainSection('menu');
    }
  } else {
    showTrainSection('menu');
  }
}

function selectPhase(n) {
  [1,2,3].forEach(p => {
    const btn = document.getElementById('train-phase-' + p);
    if (!btn) return;
    btn.style.background = p === n ? '#f5c842' : 'transparent';
    btn.style.color = p === n ? '#111' : '#888';
    btn.style.border = p === n ? 'none' : '1.5px solid #333';
  });
}

function selectCreateFocus(focus, el) {
  createFocus = focus;
  document.querySelectorAll('#create-focus-grid > div').forEach(d => {
    d.style.border = '1.5px solid var(--border)';
    d.style.background = 'transparent';
  });
  el.style.border = '1.5px solid #f5c842';
  el.style.background = 'rgba(245,200,66,0.1)';
  buildCreateExercisePicker();
}

function toggleScheduleDay(btn, day) {
  const idx = createScheduledDays.indexOf(day);
  if (idx > -1) {
    createScheduledDays.splice(idx, 1);
    btn.style.background = 'transparent';
    btn.style.color = 'var(--label-secondary)';
    btn.style.border = '1.5px solid var(--border)';
  } else {
    createScheduledDays.push(day);
    btn.style.background = '#f5c842';
    btn.style.color = '#111';
    btn.style.border = 'none';
  }
}

function saveRoutine() {
  const name = document.getElementById('routine-name').value.trim();
  if (!name) { alert('Please name your workout'); return; }
  if (routineSelection.length === 0) { alert('Please add at least one exercise'); return; }
  const routine = {
    name,
    focus: createFocus,
    exercises: routineSelection,
    scheduled_days: [...createScheduledDays],
    created: new Date().toLocaleDateString('en-GB')
  };
  savedRoutines.push(routine);
  routineSelection = [];
  createScheduledDays = [];
  saveToStorage();
  document.getElementById('routine-name').value = '';
  document.getElementById('create-custom-ex').value = '';
  renderRoutineSelectionList();
  showTrainSection('menu');
  showToast('Workout saved!', 'success', 2000);
}

function renderRoutinesList() {
  const container = document.getElementById('routines-list');
  const empty = document.getElementById('no-routines-msg');
  if (!container) return;
  const routines = Array.isArray(savedRoutines) ? savedRoutines : [];
  if (routines.length === 0) {
    container.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  container.innerHTML = routines.map((r, i) => {
    const muscles = getWorkoutMuscles(r.name || '');
    const lastDone = workoutHistory.find(w => w.muscle === r.name);
    const lastStr = lastDone ? `Last done: ${lastDone.date}` : 'Not done yet';
    return `<div style="background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px 16px;margin-bottom:10px;cursor:pointer;" onclick="startRoutineWorkout(${JSON.stringify(r).replace(/"/g,'&quot;')})">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div style="flex:1;">
          <div style="font-size:15px;font-weight:800;color:var(--text);margin-bottom:3px;">${r.name}</div>
          <div style="font-size:12px;color:var(--label-secondary);margin-bottom:4px;">${muscles}</div>
          <div style="font-size:11px;color:var(--label-secondary);">${r.exercises ? r.exercises.length : 0} exercises · ${lastStr}</div>
          ${r.scheduled_days && r.scheduled_days.length > 0 ? `<div style="font-size:11px;color:#f5c842;font-weight:600;margin-top:4px;">${r.scheduled_days.join(', ')}</div>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end;">
          <button onclick="event.stopPropagation();deleteRoutine(${i})" style="background:none;border:none;color:var(--label-secondary);font-size:16px;cursor:pointer;padding:2px;">🗑</button>
          <div style="color:var(--label-secondary);font-size:18px;">›</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function deleteRoutine(idx) {
  if (confirm('Delete this workout?')) {
    savedRoutines.splice(idx, 1);
    saveToStorage();
    renderRoutinesList();
  }
}

function renderExerciseLibrary() {
  const container = document.getElementById('exercise-library-list');
  const filterContainer = document.getElementById('exercise-lib-filters');
  if (!container) return;
  const cats = ['All','Chest','Back','Shoulders','Biceps','Triceps','Legs','Core','Cardio'];
  if (filterContainer && !filterContainer.hasChildNodes()) {
    filterContainer.innerHTML = cats.map((c, i) =>
      `<button onclick="filterExerciseLib('${c}',this)" style="padding:6px 14px;border-radius:20px;border:1.5px solid var(--border);font-size:12px;font-weight:700;cursor:pointer;background:${i===0?'#f5c842':'transparent'};color:${i===0?'#111':'var(--label-secondary)'};">${c}</button>`
    ).join('');
  }
  renderExerciseLibraryItems('All');
}

function filterExerciseLib(cat, btn) {
  document.querySelectorAll('#exercise-lib-filters button').forEach(b => {
    b.style.background = 'transparent'; b.style.color = 'var(--label-secondary)';
  });
  btn.style.background = '#f5c842'; btn.style.color = '#111';
  renderExerciseLibraryItems(cat);
}

function filterExerciseLibrary() {
  const q = (document.getElementById('exercise-search')?.value || '').toLowerCase();
  const container = document.getElementById('exercise-library-list');
  if (!container) return;
  const allEx = getAllExercises();
  const filtered = allEx.filter(ex => ex.name.toLowerCase().includes(q));
  container.innerHTML = filtered.map(ex => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);">
      <div style="width:40px;height:40px;background:var(--bg);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;">💪</div>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:700;color:var(--text);">${ex.name}</div>
        <div style="font-size:11px;color:var(--label-secondary);">${ex.cat}</div>
      </div>
    </div>
  `).join('');
}

function renderExerciseLibraryItems(cat) {
  const container = document.getElementById('exercise-library-list');
  if (!container) return;
  const allEx = getAllExercises();
  const filtered = cat === 'All' ? allEx : allEx.filter(ex => ex.cat === cat);
  container.innerHTML = filtered.map(ex => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);">
      <div style="width:40px;height:40px;background:var(--bg);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;">💪</div>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:700;color:var(--text);">${ex.name}</div>
        <div style="font-size:11px;color:var(--label-secondary);">${ex.cat}</div>
      </div>
    </div>
  `).join('');
}

function getAllExercises() {
  const lib = {
    'Chest': ['Barbell Bench Press','Incline Dumbbell Press','Cable Fly','Machine Chest Press','Push Up','Dips'],
    'Back': ['Barbell Row','Pull Up','Lat Pulldown','Cable Row','Dumbbell Row','Face Pull'],
    'Shoulders': ['Overhead Press','Lateral Raises','Front Raises','Machine Shoulder Press','Arnold Press'],
    'Biceps': ['Barbell Curl','Dumbbell Curl','Hammer Curl','Cable Curl','Preacher Curl'],
    'Triceps': ['Tricep Pushdown','Skull Crushers','Overhead Tricep Extension','Cable Tricep Extension','Dips'],
    'Legs': ['Barbell Squat','Romanian Deadlift','Leg Press','Walking Lunges','Leg Curl','Leg Extension','Hip Hinge','Glute Bridge'],
    'Core': ['Plank','Crunch','Russian Twist','Dead Bug','Cable Crunch','Hanging Leg Raise'],
    'Cardio': ['Running','Cycling','Rowing','HIIT','Swimming','Walking']
  };
  const result = [];
  Object.entries(lib).forEach(([cat, exs]) => exs.forEach(name => result.push({ name, cat })));
  // Add custom exercises
  if (typeof customExercises === 'object') {
    Object.entries(customExercises).forEach(([cat, exs]) => (exs||[]).forEach(name => {
      if (!result.find(e => e.name === name)) result.push({ name, cat });
    }));
  }
  return result;
}

function renderWorkoutTemplates() {
  const container = document.getElementById('workout-templates-list');
  if (!container) return;
  const templates = [
    { name: 'Push Day', focus: 'Push', exercises: ['Barbell Bench Press','Incline Dumbbell Press','Cable Fly','Machine Shoulder Press','Lateral Raises','Tricep Pushdown','Overhead Tricep Extension'] },
    { name: 'Pull Day', focus: 'Pull', exercises: ['Barbell Row','Pull Up','Lat Pulldown','Cable Row','Face Pull','Barbell Curl','Hammer Curl'] },
    { name: 'Leg Day', focus: 'Legs', exercises: ['Barbell Squat','Romanian Deadlift','Leg Press','Walking Lunges','Leg Curl','Leg Extension'] },
    { name: 'Upper Body', focus: 'Upper Body', exercises: ['Barbell Bench Press','Barbell Row','Overhead Press','Pull Up','Lateral Raises','Barbell Curl','Tricep Pushdown'] },
    { name: 'Full Body', focus: 'Full Body', exercises: ['Barbell Squat','Barbell Bench Press','Barbell Row','Overhead Press','Romanian Deadlift'] },
  ];
  container.innerHTML = templates.map(t => `
    <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px 16px;margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <div style="font-size:15px;font-weight:800;color:var(--text);">${t.name}</div>
        <button onclick="useTemplate(${JSON.stringify(t).replace(/"/g,'&quot;')})" style="background:#f5c842;border:none;border-radius:8px;padding:6px 14px;font-size:12px;font-weight:700;color:#111;cursor:pointer;">Use</button>
      </div>
      <div style="font-size:12px;color:var(--label-secondary);">${t.exercises.length} exercises</div>
      <div style="font-size:12px;color:var(--label-secondary);margin-top:2px;">${t.exercises.slice(0,3).join(', ')}${t.exercises.length > 3 ? '...' : ''}</div>
    </div>
  `).join('');
}

function useTemplate(template) {
  showTrainSection('create');
  setTimeout(() => {
    const nameEl = document.getElementById('routine-name');
    if (nameEl) nameEl.value = template.name;
    createFocus = template.focus;
    routineSelection = template.exercises.map(name => ({ name, sets: 3, reps: '8–12', rest: 90 }));
    renderRoutineSelectionList();
    updateCreateExCount();
  }, 100);
}

function filterCreateExercises() {
  buildCreateExercisePicker();
}

function buildCreateExercisePicker() {
  const catFilter = document.getElementById('create-category-filter');
  const tagsContainer = document.getElementById('create-exercise-tags');
  if (!catFilter || !tagsContainer) return;
  const cats = ['Chest','Back','Shoulders','Biceps','Triceps','Legs','Core'];
  if (!catFilter.hasChildNodes()) {
    catFilter.innerHTML = cats.map((c, i) =>
      `<button class="filter-btn${i===0?' active':''}" onclick="selectCreateCat('${c}',this)">${c}</button>`
    ).join('');
  }
  const activeCat = catFilter.querySelector('.filter-btn.active')?.textContent || cats[0];
  const allEx = getAllExercises().filter(e => e.cat === activeCat);
  const q = (document.getElementById('create-ex-search')?.value || '').toLowerCase();
  const filtered = q ? allEx.filter(e => e.name.toLowerCase().includes(q)) : allEx;
  tagsContainer.innerHTML = filtered.map(ex =>
    `<span class="tag" onclick="this.classList.toggle('selected');addTaggedExToSelection('${ex.name}')" style="margin:3px;display:inline-block;padding:6px 12px;border-radius:20px;border:1.5px solid var(--border);font-size:12px;font-weight:600;cursor:pointer;color:var(--text);">${ex.name}</span>`
  ).join('');
}

function selectCreateCat(cat, btn) {
  document.querySelectorAll('#create-category-filter .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  buildCreateExercisePicker();
}

function addTaggedExToSelection(name) {
  if (!routineSelection.find(e => (typeof e === 'string' ? e : e.name) === name)) {
    routineSelection.push({ name, sets: 3, reps: '8–12', rest: 90 });
    renderRoutineSelectionList();
    updateCreateExCount();
  }
}

function addCustomToSelection() {
  const input = document.getElementById('create-custom-ex');
  const name = input?.value.trim();
  if (!name) return;
  if (!routineSelection.find(e => (typeof e === 'string' ? e : e.name) === name)) {
    routineSelection.push({ name, sets: 3, reps: '8–12', rest: 90 });
    if (!customExercises) window.customExercises = {};
    const cat = createFocus || 'Custom';
    if (!customExercises[cat]) customExercises[cat] = [];
    if (!customExercises[cat].includes(name)) customExercises[cat].push(name);
    saveToStorage();
  }
  if (input) input.value = '';
  renderRoutineSelectionList();
  updateCreateExCount();
}

function renderRoutineSelectionList() {
  const container = document.getElementById('routine-selection-list');
  if (!container) return;
  container.innerHTML = (routineSelection || []).map((ex, i) => {
    const name = typeof ex === 'string' ? ex : ex.name;
    const sets = ex.sets || 3;
    const reps = ex.reps || '8–12';
    return `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);">
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:700;color:var(--text);">${name}</div>
        <div style="display:flex;gap:8px;margin-top:6px;">
          <select onchange="updateExDetail(${i},'sets',this.value)" style="flex:1;font-size:12px;padding:4px 6px;">
            ${[1,2,3,4,5].map(n=>`<option value="${n}" ${sets==n?'selected':''}>${n} sets</option>`).join('')}
          </select>
          <select onchange="updateExDetail(${i},'reps',this.value)" style="flex:1;font-size:12px;padding:4px 6px;">
            ${['6–8','8–10','8–12','10–12','12–15','15–20'].map(r=>`<option value="${r}" ${reps==r?'selected':''}>${r} reps</option>`).join('')}
          </select>
        </div>
      </div>
      <button onclick="removeFromSelection(${i})" style="background:none;border:none;color:var(--label-secondary);font-size:18px;cursor:pointer;">✕</button>
    </div>`;
  }).join('');
  updateCreateExCount();
}

function updateExDetail(idx, field, val) {
  if (routineSelection[idx]) routineSelection[idx][field] = field === 'sets' ? parseInt(val) : val;
}

function removeFromSelection(idx) {
  routineSelection.splice(idx, 1);
  renderRoutineSelectionList();
}

function updateCreateExCount() {
  const el = document.getElementById('create-ex-count');
  if (el) el.textContent = (routineSelection || []).length;
}

function adjustRestTimer(seconds) {
  // adds seconds to current rest timer
  const el = document.getElementById('rest-count');
  if (el) {
    const current = parseInt(el.textContent) || 0;
    el.textContent = current + seconds;
  }
}// ══ NUTRITION TAB HELPERS ════════════════════════════════════

function updateNutritionTab(cals, protein, carbs, fats, calGoal, protGoal) {
    // Calorie ring
    const ring = document.getElementById('nut-cal-ring');
    if (ring) ring.setAttribute('stroke-dashoffset', 276.46 - Math.min(1, cals / calGoal) * 276.46);
    setText('nut-hero-calories', Math.round(cals).toLocaleString());
    setText('nut-ring-goal', `/ ${Math.round(calGoal).toLocaleString()} kcal`);
    const rem = Math.max(0, calGoal - cals);
    const remEl = document.getElementById('nut-cal-remaining');
    if (remEl) {
      remEl.textContent = rem > 0 ? `${Math.round(rem)} kcal left` : 'Goal reached! 🎉';
      remEl.style.color = rem > 0 ? '#f5c842' : '#22c55e';
    }
  
    // Macro bars
    const carbGoal = 250; const fatGoal = 70;
    setText('nut-pill-protein', `${Math.round(protein)} / ${Math.round(protGoal)}g`);
    setText('nut-pill-carbs', `${Math.round(carbs)} / ${carbGoal}g`);
    setText('nut-pill-fats', `${Math.round(fats)} / ${fatGoal}g`);
    setBar('nut-pill-bar-protein', (protein / protGoal) * 100);
    setBar('nut-pill-bar-carbs', (carbs / carbGoal) * 100);
    setBar('nut-pill-bar-fats', (fats / fatGoal) * 100);
  
    // Macro donut
    const total = (protein * 4) + (carbs * 4) + (fats * 9);
    const protPct = total > 0 ? Math.round((protein * 4) / total * 100) : 0;
    const carbPct = total > 0 ? Math.round((carbs * 4) / total * 100) : 0;
    const fatPct = total > 0 ? Math.round((fats * 9) / total * 100) : 0;
    const circ = 188.5;
    const protArc = (protPct / 100) * circ;
    const carbArc = (carbPct / 100) * circ;
    const fatArc = (fatPct / 100) * circ;
    const protRing = document.getElementById('macro-ring-protein');
    const carbRing = document.getElementById('macro-ring-carbs');
    const fatRing = document.getElementById('macro-ring-fats');
    if (protRing) { protRing.setAttribute('stroke-dasharray', `${protArc} ${circ - protArc}`); protRing.setAttribute('stroke-dashoffset', '0'); }
    if (carbRing) { carbRing.setAttribute('stroke-dasharray', `${carbArc} ${circ - carbArc}`); carbRing.setAttribute('stroke-dashoffset', -protArc); }
    if (fatRing) { fatRing.setAttribute('stroke-dasharray', `${fatArc} ${circ - fatArc}`); fatRing.setAttribute('stroke-dashoffset', -(protArc + carbArc)); }
    setText('macro-legend-protein', `${Math.round(protein)}g (${protPct}%)`);
    setText('macro-legend-carbs', `${Math.round(carbs)}g (${carbPct}%)`);
    setText('macro-legend-fats', `${Math.round(fats)}g (${fatPct}%)`);
  
    // Insights
    renderNutritionInsights(cals, protein, carbs, fats, calGoal, protGoal);
  
    // Meal ideas
    renderMealIdeas(protGoal);
  }
  
  function renderNutritionInsights(cals, protein, carbs, fats, calGoal, protGoal) {
    const container = document.getElementById('nut-insights-list');
    if (!container) return;
    const insights = [];
    if (protein >= protGoal * 0.9) insights.push({ icon: '⚡', color: '#f5c842', title: 'Great protein intake!', sub: "You're hitting your target consistently." });
    else insights.push({ icon: '💪', color: '#6366f1', title: `Need ${Math.round(protGoal - protein)}g more protein`, sub: 'Add a protein source to your next meal.' });
    const rem = calGoal - cals;
    if (rem > 0) insights.push({ icon: '🔥', color: '#f5c842', title: 'Calories balance', sub: `You're ${Math.round(rem)} kcal under your target.` });
    else insights.push({ icon: '⚠️', color: '#ef4444', title: 'Over calorie target', sub: `${Math.round(Math.abs(rem))} kcal over today.` });
    insights.push({ icon: '🌿', color: '#22c55e', title: 'Keep it up!', sub: 'Consistency is the key to results.' });
    container.innerHTML = insights.map(ins => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);">
        <div style="width:36px;height:36px;border-radius:50%;background:${ins.color}22;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">${ins.icon}</div>
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--text);">${ins.title}</div>
          <div style="font-size:11px;color:var(--label-secondary);margin-top:2px;">${ins.sub}</div>
        </div>
      </div>
    `).join('').replace(/border-bottom[^;]+;(?=[^<]*<\/div>\s*$)/, '');
  }
  
  function renderMealIdeas(protGoal) {
    const container = document.getElementById('meal-ideas-row');
    if (!container || container.hasChildNodes()) return;
    const ideas = [
      { name: 'High Protein Chicken Bowl', kcal: 542, emoji: '🍗' },
      { name: 'Salmon & Rice Bowl', kcal: 632, emoji: '🍣' },
      { name: 'Protein Smoothie', kcal: 328, emoji: '🥤' },
      { name: 'Greek Omelette', kcal: 380, emoji: '🍳' },
      { name: 'Tuna Pasta', kcal: 490, emoji: '🍝' },
    ];
    container.innerHTML = ideas.map(idea => `
      <div style="flex-shrink:0;width:130px;cursor:pointer;">
        <div style="width:130px;height:100px;border-radius:12px;background:var(--bg);display:flex;align-items:center;justify-content:center;font-size:40px;margin-bottom:6px;border:1px solid var(--border);">${idea.emoji}</div>
        <div style="font-size:12px;font-weight:700;color:var(--text);line-height:1.3;">${idea.name}</div>
        <div style="font-size:11px;color:var(--label-secondary);margin-top:2px;">${idea.kcal} kcal</div>
      </div>
    `).join('');
  }
  // ══ PROGRESS TAB HELPERS ═════════════════════════════════════

function setProgressInsightsFilter(range, btn) {
    document.querySelectorAll('.prog-filter-btn').forEach(b => {
      b.style.background = 'transparent';
      b.style.color = 'var(--label-secondary)';
    });
    if (btn) {
      btn.style.background = '#f5c842';
      btn.style.color = '#111';
    }
    renderProgressOverviewTab(range);
  }
  
  function renderProgressOverviewTab(range) {
    range = range || '1M';
    renderOverviewStats();
    renderStrengthProgress();
    renderMuscleGroups();
    renderConsistencyCalendar();
  }
  
  function renderOverviewStats() {
    const logs = Array.isArray(progressLogs) ? progressLogs : [];
    const units = (settings || {}).units || 'kg';
    if (logs.length > 0) {
      const latest = logs[logs.length - 1];
      const prev = logs.length > 1 ? logs[0] : null;
      setText('progress-weight-current', `${latest.weight}${units}`);
      if (prev) {
        const diff = (latest.weight - prev.weight).toFixed(1);
        const el = document.getElementById('progress-weight-delta');
        if (el) {
          el.textContent = `${diff > 0 ? '↑' : '↓'} ${Math.abs(diff)}${units}`;
          el.style.color = diff > 0 ? '#ef4444' : '#22c55e';
        }
        const changeLabel = document.getElementById('prog-weight-change-label');
        if (changeLabel) {
          changeLabel.textContent = `${diff > 0 ? '↑' : '↓'} ${Math.abs(diff)}${units}`;
          changeLabel.style.color = diff > 0 ? '#ef4444' : '#22c55e';
        }
      }
    }
  
    // Consistency
    const last30 = (workoutHistory || []).filter(w => {
      const d = new Date(w.date?.split('/').reverse().join('-') || w.created_at);
      return (Date.now() - d) < 30 * 86400000;
    });
    const pct = Math.round(last30.length / 30 * 100);
    setText('prog-consistency-pct', `${pct}%`);
    setText('consistency-score', `${pct}%`);
    const ring = document.getElementById('consistency-ring');
    if (ring) ring.setAttribute('stroke-dashoffset', 201.06 - (pct / 100) * 201.06);
  
    // Strength
    const pbs = personalBests || {};
    const pbKeys = Object.keys(pbs);
    if (pbKeys.length > 0) {
      const top = pbs[pbKeys[0]];
      setText('prog-strength-val', `${top.weight}${(settings||{}).units||'kg'}`);
    }
  
    // Avg calories
    const today = new Date();
    const recentMeals = (meals || []).filter(m => {
      const parts = (m.date || '').split('/');
      if (parts.length < 3) return false;
      const d = new Date(parts[2], parts[1]-1, parts[0]);
      return (Date.now() - d) < 30 * 86400000;
    });
    if (recentMeals.length > 0) {
      let totalCal = 0;
      recentMeals.forEach(m => m.foods?.forEach(f => totalCal += (f.cal || 0)));
      setText('prog-cal-avg', Math.round(totalCal / 30).toLocaleString());
    }
  }
  
  function renderStrengthProgress() {
    const container = document.getElementById('prog-strength-list');
    if (!container) return;
    const pbs = personalBests || {};
    const keys = Object.keys(pbs).slice(0, 5);
    if (keys.length === 0) {
      container.innerHTML = '<p style="font-size:13px;color:var(--label-secondary);text-align:center;padding:12px 0;">Log workouts to track strength.</p>';
      return;
    }
    const units = (settings || {}).units || 'kg';
    container.innerHTML = keys.map((name, idx) => {
      const pb = pbs[name];
      const isLast = idx === keys.length - 1;
      return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;${isLast ? '' : 'border-bottom:1px solid var(--border);'}">
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:700;color:var(--text);">${name}</div>
        </div>
        <div style="font-size:18px;font-weight:800;color:var(--text);">${pb.weight}<span style="font-size:12px;font-weight:500;color:var(--label-secondary);">${units}</span></div>
        <div style="font-size:11px;font-weight:700;color:#22c55e;min-width:40px;text-align:right;">↑ PB</div>
        <svg width="50" height="24" viewBox="0 0 50 24"><polyline points="0,20 12,16 25,10 38,6 50,2" fill="none" stroke="#f5c842" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>`;
    }).join('');
  }
  
  function renderMuscleGroups() {
    const history = workoutHistory || [];
    const last30 = history.filter(w => {
      const parts = (w.date || '').split('/');
      if (parts.length < 3) return false;
      const d = new Date(parts[2], parts[1]-1, parts[0]);
      return (Date.now() - d) < 30 * 86400000;
    });
    const groups = { chest: 0, back: 0, legs: 0, shoulders: 0, arms: 0, core: 0 };
    last30.forEach(w => {
      const m = (w.muscle || '').toLowerCase();
      if (/push|chest|tricep/.test(m)) groups.chest++;
      if (/pull|back|bicep|row/.test(m)) groups.back++;
      if (/leg|squat|hinge|glute|hamstring/.test(m)) groups.legs++;
      if (/shoulder/.test(m)) groups.shoulders++;
      if (/arm|bicep|tricep/.test(m)) groups.arms++;
      if (/core|abs/.test(m)) groups.core++;
    });
    const max = Math.max(...Object.values(groups), 1);
    Object.entries(groups).forEach(([key, val]) => {
      const pct = max > 0 ? Math.round((val / max) * 100) : 0;
      setText(`mg-pct-${key}`, pct > 0 ? `${pct}%` : '—');
    });
  }
  
  function renderConsistencyCalendar() {
    const container = document.getElementById('consistency-calendar');
    if (!container) return;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const cells = [];
    for (let i = 0; i < offset; i++) cells.push('<div></div>');
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const dateStr = date.toLocaleDateString('en-GB');
      const hasWorkout = !!(workoutHistory || []).find(w => w.date === dateStr);
      const hasCardio = !!(cardioHistory || []).find(c => c.date === dateStr);
      const done = hasWorkout || hasCardio;
      const isToday = d === now.getDate();
      cells.push(
        `<div title="${dateStr}" style="width:24px;height:24px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;` +
          `${done ? 'background:#f5c842;color:#111;' : 'background:var(--bg);color:var(--label-secondary);border:1px solid var(--border);'}` +
          `${isToday ? 'box-shadow:0 0 0 2px rgba(245,200,66,0.35);' : ''}">` +
          `${d}</div>`
      );
    }
    container.innerHTML = cells.join('');
  }// ══ PROFILE TAB HELPERS ══════════════════════════════════════

function renderProfileTab() {
    const s = settings || {};
    const name = s.name || 'Athlete';
    const goal = s.goal || 'fitness';
    const goalLabels = { beginner:'Beginner', fatloss:'Fat Loss Athlete', muscle:'Muscle Builder', fitness:'Hybrid Athlete' };
  
    // Avatar initials
    const avatarEl = document.getElementById('profile-hero-avatar');
    if (avatarEl && name) {
      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
      avatarEl.textContent = initials || 'PG';
    }
    setText('profile-hero-name', name);
    setText('profile-hero-goal', goalLabels[goal] || 'Hybrid Athlete');
  
    // XP & Level
    const workouts = (workoutHistory || []).length;
    const cardios = (cardioHistory || []).length;
    const pbs = Object.keys(personalBests || {}).length;
    const xp = (workouts * 50) + (cardios * 30) + (pbs * 100);
    const level = Math.floor(xp / 1000) + 1;
    const xpInLevel = xp % 1000;
    setText('profile-level-badge', `Level ${level}`);
    setText('profile-level-num', level);
    setText('profile-xp-label', `${xp.toLocaleString()} / ${(level * 1000).toLocaleString()} XP`);
    const xpFill = document.getElementById('profile-xp-fill');
    if (xpFill) xpFill.style.width = Math.min(100, (xpInLevel / 1000) * 100) + '%';
  
    // Status rank (simulated)
    const consistency = Math.min(100, Math.round(workouts / 30 * 100));
    const rank = consistency > 80 ? 'Top 5%' : consistency > 60 ? 'Top 14%' : consistency > 40 ? 'Top 30%' : 'Top 50%';
    setText('profile-status-rank', rank);
  
    // Key stats
    setText('profile-stat-workouts', workouts);
    const totalCal = (workoutHistory || []).reduce((a, w) => a + (w.duration || 0) * 8, 0);
    setText('profile-stat-calories', totalCal.toLocaleString());
    const totalMins = (workoutHistory || []).reduce((a, w) => a + (w.duration || 0), 0);
    setText('profile-stat-time', `${Math.round(totalMins / 60)}h`);
    setText('profile-stat-achievements', pbs);
  
    // Account email
    const emailEl = document.getElementById('account-email');
    if (emailEl && PG?.state?.user?.email) emailEl.textContent = PG.state.user.email;
  
    renderProfileAchievements();
    renderProfilePRs();
  }
  
  function renderProfileAchievements() {
    const container = document.getElementById('profile-hex-badges');
    if (!container) return;
    const workouts = (workoutHistory || []).length;
    const cardios = (cardioHistory || []).length;
    const achievements = [
      { icon: '🔥', label: '7 Day\nStreak', unlocked: true },
      { icon: '💪', label: '50\nWorkouts', unlocked: workouts >= 50 },
      { icon: '🥗', label: 'Nutrition\nMaster', unlocked: false },
      { icon: '⭐', label: 'Early\nRiser', unlocked: false },
      { icon: '🏆', label: '100\nWorkouts', unlocked: workouts >= 100 },
      { icon: '🏃', label: 'Cardio\nKing', unlocked: cardios >= 10 },
    ];
    container.innerHTML = achievements.map(a => `
      <div style="flex-shrink:0;text-align:center;width:64px;">
        <div style="width:52px;height:52px;border-radius:14px;background:${a.unlocked ? '#111' : 'var(--bg)'};border:2px solid ${a.unlocked ? '#f5c842' : 'var(--border)'};display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 6px;${a.unlocked ? '' : 'opacity:0.4;'}">
          ${a.unlocked ? a.icon : '🔒'}
        </div>
        <div style="font-size:10px;color:${a.unlocked ? 'var(--text)' : 'var(--label-secondary)'};font-weight:${a.unlocked ? '700' : '500'};line-height:1.3;">${a.label.replace('\n','<br>')}</div>
      </div>
    `).join('');
  }
  
  function renderProfilePRs() {
    const container = document.getElementById('profile-prs-list');
    if (!container) return;
    const pbs = personalBests || {};
    const keys = Object.keys(pbs).slice(0, 4);
    if (keys.length === 0) {
      container.innerHTML = '<p style="font-size:13px;color:var(--label-secondary);text-align:center;padding:12px 0;">Log workouts to track PRs.</p>';
      return;
    }
    const units = (settings || {}).units || 'kg';
    container.innerHTML = keys.map((name, idx) => {
      const pb = pbs[name];
      const isLast = idx === keys.length - 1;
      return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;${isLast ? '' : 'border-bottom:1px solid var(--border);'}">
        <div style="width:38px;height:38px;background:var(--bg);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">💪</div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:700;color:var(--text);">${name}</div>
          <div style="font-size:12px;color:var(--label-secondary);">${pb.weight} ${units}</div>
        </div>
        <div style="text-align:right;">
          <div style="display:inline-block;background:rgba(245,200,66,0.15);color:#f5c842;font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;border:1px solid rgba(245,200,66,0.3);margin-bottom:2px;">PR</div>
          <div style="font-size:11px;color:var(--label-secondary);">${pb.date || ''}</div>
        </div>
      </div>`;
    }).join('');
  }

function renderDevPanel() {
  const existing = document.getElementById('dev-panel-section');
  if (existing) return;
  const profileScreen = document.getElementById('screen-profile');
  if (!profileScreen) return;
  const panel = document.createElement('div');
  panel.id = 'dev-panel-section';
  panel.className = 'card';
  panel.style.marginBottom = '12px';
  panel.style.border = '1.5px dashed #FFD60A';
  panel.innerHTML = `
    <p style="font-size:10px;font-weight:700;letter-spacing:1px;color:#FFD60A;margin-bottom:12px;">⚡ DEVELOPER MODE</p>
    <button onclick="devOpenOnboarding()" style="width:100%;background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:12px;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;margin-bottom:8px;text-align:left;">
      👁 Preview Onboarding
    </button>
    <button onclick="devResetOnboarding()" style="width:100%;background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:12px;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;margin-bottom:8px;text-align:left;">
      🔄 Reset Onboarding Flag
    </button>
    <button onclick="devResetAllData()" style="width:100%;background:var(--bg);border:1px solid #ef4444;border-radius:12px;padding:12px;font-size:13px;font-weight:700;color:#ef4444;cursor:pointer;margin-bottom:8px;text-align:left;">
      🗑 Reset All Data
    </button>
    <button onclick="devToggleMode()" style="width:100%;background:transparent;border:none;font-size:12px;color:var(--label-secondary);cursor:pointer;padding:4px;">
      Disable dev mode
    </button>
  `;
  // Insert before the About card (last card in profile)
  const aboutCard = profileScreen.querySelector('.card:last-of-type');
  if (aboutCard) {
    profileScreen.insertBefore(panel, aboutCard);
  } else {
    profileScreen.appendChild(panel);
  }
}

function openSleepModal() {
  const modal = document.getElementById('sleep-modal');
  if (modal) { modal.style.display = 'flex'; }
}

function closeSleepModal() {
  const modal = document.getElementById('sleep-modal');
  if (modal) { modal.style.display = 'none'; }
}

function setSleepQuick(hours) {
  const input = document.getElementById('sleep-input');
  if (input) input.value = hours;
}

async function saveSleep() {
  const input = document.getElementById('sleep-input');
  const hours = parseFloat(input?.value);
  if (!Number.isFinite(hours) || hours <= 0) {
    showToast('Enter sleep hours', 'error', 2000);
    return;
  }
  try {
    const result = await PG.nutrition.save({ sleep_hours: hours });
    if (result?.ok === false) throw new Error('Save failed');
    closeSleepModal();
    await updateHome();
    showToast('Sleep logged!', 'success', 2000);
  } catch(e) {
    showToast('Save failed', 'error', 3000);
  }
}

async function addWaterAmount(litres) {
  try {
    const nd = await PG.nutrition.getToday() || {};
    const current = getWaterLitres(nd);
    const next = Math.round((current + litres) * 100) / 100;
    const result = await PG.nutrition.save({ water_litres: next });
    if (result?.ok === false) throw new Error('Save failed');
    await loadNutrition();
    await updateHome();
    showToast(`+${litres * 1000}ml logged`, 'success', 1400);
  } catch(e) {
    showToast('Save failed', 'error', 3000);
  }
}

function showNotifications() {
  showToast('No new notifications', 'success', 1800);
}

function getWorkoutMuscles(name) {
  const n = (name || '').toLowerCase();
  if (/push/.test(n)) return 'Chest, Shoulders, Triceps';
  if (/pull/.test(n)) return 'Back, Biceps, Rear Delts';
  if (/leg|squat/.test(n)) return 'Quads, Hamstrings, Glutes, Calves';
  if (/upper/.test(n)) return 'Chest, Back, Shoulders, Arms';
  if (/lower/.test(n)) return 'Quads, Hamstrings, Glutes, Calves';
  if (/full/.test(n)) return 'Full Body';
  if (/core|abs/.test(n)) return 'Core, Abs';
  if (/chest/.test(n)) return 'Chest, Triceps';
  if (/back/.test(n)) return 'Back, Biceps';
  if (/shoulder/.test(n)) return 'Shoulders, Traps';
  return 'Multiple Muscle Groups';
}

function devResetOnboarding() {
  if (!confirm('Reset onboarding? This will show the setup flow again on next load.')) return;
  settings.onboarded = false;
  PG.profile.save({ onboarded: false }).then(() => {
    showToast('Onboarding reset — reload to see it', 'success', 2500);
  });
}

function devOpenOnboarding() {
  const onboarding = document.getElementById('onboarding');
  if (onboarding) {
    onboarding.style.display = 'flex';
    ob2Next(1);
  }
}

function devResetAllData() {
  if (!confirm('Delete all workout, nutrition and progress data? Account stays intact.')) return;
  resetAllData();
}

function devToggleMode() {
  localStorage.removeItem('devMode');
  showToast('Dev mode disabled — reload', 'success', 2000);
}

// ── ONBOARDING V2 ─────────────────────────────────────────

let ob2GoalSelected = '';
let ob2ExperienceSelected = '';
let ob2DaysSelected = '';

function ob2Next(screen) {
  document.querySelectorAll('.ob2-screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('ob2-s' + screen);
  if (target) target.classList.add('active');
  // Update progress bar
  const fill = document.getElementById('ob2-progress-fill');
  if (fill) fill.style.width = (screen / 5 * 100) + '%';
}

function ob2Back(screen) {
  ob2Next(screen);
}

function ob2Select(type, value, el) {
  // Deselect all in same group
  const group = document.getElementById('ob2-' + type + '-options');
  if (group) {
    group.querySelectorAll('.ob2-option').forEach(o => o.classList.remove('selected'));
  }
  el.classList.add('selected');
  if (type === 'goal') ob2GoalSelected = value;
  if (type === 'experience') ob2ExperienceSelected = value;
}

function ob2SelectDays(days, el) {
  ob2DaysSelected = days;
  document.querySelectorAll('#ob2-days-options .ob2-days-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  const tips = {
    '2-3': '2–3 days is a great start. Consistency beats intensity.',
    '3-4': '3–4 days is the sweet spot for most people.',
    '5+': '5+ days — you\'re serious. We\'ll build you a full programme.'
  };
  const tip = document.getElementById('ob2-days-tip');
  if (tip) tip.textContent = tips[days] || '';
}

async function ob2Complete() {
  const weight = parseFloat(document.getElementById('ob2-weight')?.value) || 0;
  const height = parseFloat(document.getElementById('ob2-height')?.value) || 0;
  const age = parseInt(document.getElementById('ob2-age')?.value) || 25;
  const gender = document.getElementById('ob2-gender')?.value || 'male';
  const name = document.getElementById('ob2-name')?.value || 'Athlete';

  // TDEE calculation
  let calTarget = 2000;
  let proteinTarget = 150;
  let trainingDays = 4;

  if (weight > 0 && height > 0) {
    let bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    const activityMap = { '2-3': 1.4, '3-4': 1.55, '5+': 1.7 };
    const multiplier = activityMap[ob2DaysSelected] || 1.55;
    const tdee = Math.round(bmr * multiplier);
    const goalMap = { fatloss: tdee - 400, muscle: tdee + 250, hybrid: tdee - 200, fitness: tdee };
    calTarget = goalMap[ob2GoalSelected] || tdee;
    proteinTarget = Math.round(weight * 2.0);
    trainingDays = ob2DaysSelected === '2-3' ? 3 : ob2DaysSelected === '5+' ? 5 : 4;
  }

  settings = {
    ...settings,
    name,
    goal: ob2GoalSelected || 'fitness',
    experience_level: ob2ExperienceSelected || 'beginner',
    weight,
    height,
    age,
    gender,
    calTarget,
    proteinTarget,
    stepsTarget: 8000,
    trainingDays,
    phaseName: 'Phase 1',
    phaseStartDate: new Date().toLocaleDateString('en-GB'),
    phaseDuration: 56,
    onboarded: true,
    language: selectedLang || 'en',
    environment: 'gym',
    diet: 'standard',
    units: 'kg'
  };

  try {
    const { data } = await PG.db.auth.getUser();
    if (data?.user?.id) {
      await PG.profile.save(settings);
    }
  } catch(e) {
    console.log('No auth session — skipping save');
  }

  // Update summary screen
  const goalLabels = { fatloss: 'Lose Fat', muscle: 'Build Muscle', hybrid: 'Hybrid / Recomposition', fitness: 'Improve Fitness' };
  const planLabels = { '2-3': '3 Day Programme', '3-4': '4 Day Programme', '5+': '5 Day Programme' };
  setText('ob2-sum-goal', goalLabels[ob2GoalSelected] || 'General Fitness');
  setText('ob2-sum-plan', planLabels[ob2DaysSelected] || '4 Day Programme');

  ob2Next(5);
}

async function ob2Skip() {
  settings = {
    ...settings,
    name: settings.name || 'Athlete',
    goal: settings.goal || 'fitness',
    calTarget: settings.calTarget || 2000,
    proteinTarget: settings.proteinTarget || 150,
    stepsTarget: 8000,
    trainingDays: 4,
    phaseName: 'Phase 1',
    phaseStartDate: new Date().toLocaleDateString('en-GB'),
    phaseDuration: 56,
    onboarded: true,
    language: selectedLang || 'en',
    environment: 'gym',
    diet: 'standard',
    units: 'kg'
  };
  try {
    const { data } = await PG.db.auth.getUser();
    if (data?.user?.id) {
      await PG.profile.save({ onboarded: true });
    }
  } catch(e) {
    console.log('Save failed:', e);
  }
  await ob2GoToDashboard();
}

async function ob2GoToDashboard() {
  const onboarding = document.getElementById('onboarding');
  if (onboarding) onboarding.style.display = 'none';
  document.querySelectorAll('.screen, .header, .nav').forEach(el => el.style.display = '');
  // Temporarily suppress dev mode onboarding re-trigger
  const wasDevMode = isDevMode;
  window._suppressOnboardingOnce = true;
  try {
    const { data } = await PG.db.auth.getUser();
    if (data?.user?.id) {
      await loadFromStorage();
      populateSettingsFields(settings);
    }
  } catch(e) {
    console.log('No auth session — loading with current settings');
  }
  showScreen('screen-home');
  window.scrollTo(0, 0);
}
