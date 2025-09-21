// --- FIREBASE INITIALIZATION ---
console.log("script.js loaded successfully!");

const firebaseConfig = {
    apiKey: "AIzaSyDoRHiwN9GjKxk8FCpeu7k3KUOggHzhGBw",
    authDomain: "scholarship-app-8ad28.firebaseapp.com",
    projectId: "scholarship-app-8ad28",
    storageBucket: "scholarship-app-8ad28.appspot.com",
    messagingSenderId: "297508787243",
    appId: "1:297508787243:web:5a8da903ea9225f172c66e",
    measurementId: "G-BN8MF09R1Q"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- LOGIN & SIGN-UP PAGE LOGIC (Your Original Code) ---
const authForm = document.querySelector('#auth-form');
const formTitle = document.querySelector('#form-title');
const submitButton = document.querySelector('#submit-button');
const confirmPasswordGroup = document.querySelector('#confirm-password-group');
const toggleModeLink = document.querySelector('#toggle-mode-link');

let isLoginMode = true;

const toggleMode = () => {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        formTitle.textContent = 'Welcome Back';
        submitButton.textContent = 'Log In';
        toggleModeLink.innerHTML = 'Don\'t have an account? <strong>Sign Up</strong>';
        confirmPasswordGroup.style.display = 'none';
    } else {
        formTitle.textContent = 'Create an Account';
        submitButton.textContent = 'Sign Up';
        toggleModeLink.innerHTML = 'Already have an account? <strong>Log In</strong>';
        confirmPasswordGroup.style.display = 'block';
    }
};

toggleModeLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMode();
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = authForm.email.value;
    const password = authForm.password.value;

    if (isLoginMode) {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                alert('Welcome back!');
                window.location.href = 'dashboard.html'; // Redirect on success
            })
            .catch(error => alert(error.message));
    } else {
        const confirmPassword = authForm['confirm-password'].value;
        if (password !== confirmPassword) {
            return alert("Passwords do not match!");
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                alert('Account created!');
                window.location.href = 'dashboard.html'; // Redirect on success
            })
            .catch(error => alert(error.message));
    }
});


// --- ⭐️ ADDED THIS SECTION FOR GOOGLE SIGN-IN ⭐️ ---

// 1. Get a reference to the Google button from your HTML
const googleSignInButton = document.getElementById('google-signin-btn');

// 2. Create an instance of the Google provider object
const googleProvider = new firebase.auth.GoogleAuthProvider();

// 3. Add the click event listener to the button
googleSignInButton.addEventListener('click', () => {
  
  // 4. Tell Firebase to open the sign-in pop-up
  auth.signInWithPopup(googleProvider)
    .then((result) => {
      const user = result.user;
      console.log("Google Sign-In Successful!", user);
      alert(`Welcome, ${user.displayName}!`);
      
      // IMPORTANT: Change 'dashboard.html' to your main page
      window.location.href = 'dashboard.html'; 

    }).catch((error) => {
      const errorMessage = error.message;
      console.error("Google Sign-In Error:", errorMessage);
      alert(`Error during sign-in: ${errorMessage}`);
    });
});

