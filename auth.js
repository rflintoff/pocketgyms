let isSignUp = false;
let appBooted = false;

document.addEventListener('DOMContentLoaded', async () => {
  document.body.style.visibility = 'hidden';
  try {
    const hashParams = new URLSearchParams(window.location.hash.replace('#', '?'));
    if (hashParams.get('access_token')) {
      await PG.db.auth.setSession({
        access_token: hashParams.get('access_token'),
        refresh_token: hashParams.get('refresh_token')
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  } catch(e) {}
  const { data: { session } } = await PG.db.auth.getSession();
  document.body.style.visibility = 'visible';
  if (session?.user) {
    appBooted = true;
    document.getElementById('auth-modal').style.display = 'none';
    await loadUserEmail();
    await initApp(session.user);
  } else {
    document.getElementById('auth-modal').style.display = 'flex';
    document.querySelectorAll('.screen, .header, .nav').forEach(el => el.style.display = 'none');
    document.getElementById('onboarding').style.display = 'none';
  }
});

function recoverFromBootError(err, source) {
  console.error(`[Boot Error:${source}]`, err);
  document.body.style.visibility = 'visible';
  const authModal = document.getElementById('auth-modal');
  if (authModal) authModal.style.display = 'flex';
  document.querySelectorAll('.screen, .header, .nav').forEach(el => el.style.display = 'none');
}

PG.db.auth.onAuthStateChange(async (event, session) => {
  try {
    if (event === 'SIGNED_IN' && !appBooted) {
      appBooted = true;
      document.getElementById('auth-modal').style.display = 'none';
      await loadUserEmail();
      await initApp(session.user);
    } else if (event === 'SIGNED_OUT') {
      appBooted = false;
      document.getElementById('auth-modal').style.display = 'flex';
      document.querySelectorAll('.screen, .header, .nav').forEach(el => el.style.display = 'none');
      document.getElementById('onboarding').style.display = 'none';
      document.body.style.visibility = 'visible';
    }
  } catch (err) {
    recoverFromBootError(err, 'AuthStateChange');
  }
});

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

async function initApp(user) {
  try {
    const profile = await PG.profile.get();
    const isOnboarded = profile && profile.onboarded === true;
    document.getElementById('onboarding').style.display = 'none';
    document.getElementById('auth-modal').style.display = 'none';
    if (isOnboarded) {
      document.querySelectorAll('.screen, .header, .nav').forEach(el => el.style.display = '');
      await loadFromStorage();
      document.body.style.visibility = 'visible';
    } else {
      showOnboarding();
      document.body.style.visibility = 'visible';
    }
  } catch (err) {
    recoverFromBootError(err, 'initApp');
  }
}

async function loadUserEmail() {
  try {
    const { data } = await PG.db.auth.getUser();
    const email = data?.user?.email || '';
    const el = document.getElementById('account-email');
    if (el) el.textContent = email;
  } catch (err) {
    console.error('loadUserEmail:', err);
  }
}

window.signOut = async function() {
  appBooted = false;
  await PG.auth.signOut();
  document.getElementById('auth-modal').style.display = 'flex';
  document.querySelectorAll('.screen, .header, .nav').forEach(el => el.style.display = 'none');
  document.getElementById('onboarding').style.display = 'none';
};
