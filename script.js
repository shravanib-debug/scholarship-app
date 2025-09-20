// This is the correct code for your frontend file

// --- FIREBASE INITIALIZATION ---
console.log("script.js loaded successfully!");

// Your other code (firebaseConfig, etc.) goes below...
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

// --- LOGIN & SIGN-UP PAGE LOGIC ---
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
        toggleModeLink.textContent = 'Don\'t have an account? Sign Up';
        confirmPasswordGroup.style.display = 'none';
    } else {
        formTitle.textContent = 'Create an Account';
        submitButton.textContent = 'Sign Up';
        toggleModeLink.textContent = 'Already have an account? Log In';
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
            .then(userCredential => alert('Welcome back!'))
            .catch(error => alert(error.message));
    } else {
        const confirmPassword = authForm['confirm-password'].value;
        if (password !== confirmPassword) {
            return alert("Passwords do not match!");
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => alert('Account created!'))
            .catch(error => alert(error.message));
    }
});
// Add this to the end of your script.js file
// Add this to the end of your script.js file

