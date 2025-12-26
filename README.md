# PaperCA - AI-Powered Learning Platform for CA Students

A sleek, modern single-page website for beta registration with a coding-inspired design aesthetic.

## Features

- 🎨 **Unique Design**: Coding/terminal-inspired UI with monospace fonts and modern aesthetics
- ✨ **Smooth Animations**: Multiple CSS animations including typing effects, floating elements, and fade-ins
- 🔐 **Firebase Authentication**: Google Sign-In integration for beta registration
- 📱 **Responsive**: Fully responsive design that works on all devices
- 🎯 **Modern Stack**: Vanilla JavaScript, modern CSS, and Firebase SDK

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable Google Authentication:
   - Navigate to **Authentication** > **Sign-in method**
   - Enable **Google** provider
   - Add your domain to authorized domains if deploying
4. Get your Firebase configuration:
   - Go to **Project Settings** > **General**
   - Scroll to **Your apps** section
   - Copy your Firebase config object

### 2. Configure Firebase

1. Open `firebase-config.js`
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
export const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### 3. Run Locally

Simply open `index.html` in a modern web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## File Structure

```
paperca/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # JavaScript for animations and interactions
├── firebase-config.js  # Firebase configuration (update with your credentials)
└── README.md           # This file
```

## Design Highlights

- **Color Scheme**: Dark theme with vibrant purple (#7c3aed) and cyan (#00f5ff) accents
- **Typography**: JetBrains Mono for code-like aesthetic, Inter for body text
- **Animations**: Terminal typing effects, floating elements, gradient shifts, and smooth transitions
- **UI Elements**: Terminal window design, animated counters, feature cards with hover effects

## Customization

Feel free to customize:
- Colors in `:root` CSS variables
- Font sizes and spacing
- Animation timings
- Content and copy

## Browser Support

Works best on modern browsers (Chrome, Firefox, Safari, Edge) with CSS Grid and Flexbox support.

## License

MIT License - feel free to use for your project!

---

Built with ❤️ for CA Students
