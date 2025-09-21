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
// --- FIREBASE INITIALIZATION ---

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- GET HTML ELEMENTS ---
const authForm = document.querySelector('#auth-form');
const formTitle = document.querySelector('#form-title');
const submitButton = document.querySelector('#submit-button');
const confirmPasswordGroup = document.querySelector('#confirm-password-group');
const toggleModeLink = document.querySelector('#toggle-mode-link');
const googleSignInButton = document.getElementById('google-signin-btn');

// --- LOGIN & SIGN-UP TOGGLE LOGIC ---
let isLoginMode = true;
const toggleMode = () => { /* ... your existing toggle code is perfect, no changes here ... */ 
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


// --- ⭐️ UPDATED FUNCTION TO SAVE USER DATA (returns a promise) ⭐️ ---
function createUserProfile(user) {
    const userDocRef = db.collection('users').doc(user.uid);

    return userDocRef.get().then((docSnapshot) => {
        if (!docSnapshot.exists) {
            console.log(`Creating new user profile for ${user.email}`);
            // Return the set promise
            return userDocRef.set({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || 'No Name',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                caste: null,
                college: null,
                gpa: null
            });
        }
    }).catch(error => {
        console.error("Error creating or checking user profile:", error);
    });
}


// --- ⭐️ UPDATED AUTHENTICATION LOGIC (uses async/await) ⭐️ ---
authForm.addEventListener('submit', async (e) => { // Added 'async'
    e.preventDefault();
    const email = authForm.email.value;
    const password = authForm.password.value;

    try {
        if (isLoginMode) {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            await createUserProfile(userCredential.user); // Wait for profile creation
            alert('Welcome back!');
            window.location.href = 'index.html';
        } else {
            const confirmPassword = authForm['confirm-password'].value;
            if (password !== confirmPassword) {
                return alert("Passwords do not match!");
            }
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfile(userCredential.user); // Wait for profile creation
            alert('Account created!');
            window.location.href = 'index.html';
        }
    } catch (error) {
        alert(error.message);
    }
});

const googleProvider = new firebase.auth.GoogleAuthProvider();

googleSignInButton.addEventListener('click', async () => { // Added 'async'
    try {
        const result = await auth.signInWithPopup(googleProvider);
        await createUserProfile(result.user); // Wait for profile creation
        alert(`Welcome, ${result.user.displayName}!`);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Google Sign-In Error:", error.message);
        alert(`Error during sign-in: ${error.message}`);
    }
});