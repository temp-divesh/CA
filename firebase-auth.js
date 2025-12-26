// Firebase Authentication Setup
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Add custom parameters to Google provider
provider.setCustomParameters({
    prompt: 'select_account'
});

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Function to update button state
function updateButtonState(signInButton, isSignedIn, userName = '') {
    if (isSignedIn) {
        signInButton.disabled = true;
        signInButton.innerHTML = '<span>You\'re on the waitlist!</span><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10L8 13L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    } else {
        signInButton.disabled = false;
        signInButton.innerHTML = '<span>Join waitlist</span><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
}

// Handle sign in button click
document.addEventListener('DOMContentLoaded', () => {
    const signInButton = document.getElementById('signInButton');
    
    if (signInButton) {
        // Check authentication state on page load
        onAuthStateChanged(auth, (user) => {
            if (user) {
                updateButtonState(signInButton, true, user.displayName);
            } else {
                updateButtonState(signInButton, false);
            }
        });
        
        signInButton.addEventListener('click', async () => {
            try {
                // Disable button during sign-in
                signInButton.disabled = true;
                signInButton.innerHTML = '<span>Signing in...</span><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                
                // Show success message
                showNotification(`Welcome ${user.displayName}! You've successfully joined the beta.`, 'success');
                
                // Update button to show success state
                updateButtonState(signInButton, true, user.displayName);
                
                // Here you can add code to save user data to your backend
                // Example: Send user data to your API
                console.log('User signed in:', {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                });
                
                // Optionally redirect or update UI
                // window.location.href = '/dashboard';
                
            } catch (error) {
                console.error('Error signing in:', error);
                
                let errorMessage = 'Failed to sign in. Please try again.';
                if (error.code === 'auth/popup-closed-by-user') {
                    errorMessage = 'Sign-in was cancelled.';
                } else if (error.code === 'auth/popup-blocked') {
                    errorMessage = 'Popup was blocked. Please allow popups and try again.';
                }
                
                showNotification(errorMessage, 'error');
                
                // Re-enable button
                updateButtonState(signInButton, false);
            }
        });
    }
});

// Export auth for use in other scripts if needed
window.firebaseAuth = auth;
