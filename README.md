# 🎙️ Edcatalyst TechPod

A modern, Spotify-themed podcast streaming platform for technology education. Built with HTML, CSS, and JavaScript.

![Edcatalyst TechPod](https://img.shields.io/badge/Version-1.0-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue)

## � Live Demo

**[View Live Site →](https://my-podcast-player.vercel.app)**

## �🌟 Features

- **🎨 Spotify-Inspired Design**: Modern dark theme with Spotify's iconic green accents
- **🎵 Embedded Player**: Integrated Spotify player for seamless episode playback
- **📱 Responsive Layout**: Fully responsive design that works on all devices
- **🎯 Episode Management**: Browse and play multiple tech podcast episodes
- **⚡ Smooth Interactions**: Beautiful animations and transitions throughout
- **🔍 Category Filtering**: Organize episodes by technology and education categories
- **📊 Episode Stats**: View play counts, ratings, and duration for each episode
- **🎮 Player Controls**: Play, pause, next, and previous episode controls
- **🔗 Spotify Integration**: Direct links to open episodes in Spotify

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open** `index.html` in your web browser
3. **Start listening** to tech podcast episodes!

No build process or dependencies required - just pure HTML, CSS, and JavaScript.

## 📁 Project Structure

```
Podcast/
├── index.html      # Main HTML structure
├── styles.css      # Spotify-themed styles
├── script.js       # Player functionality and episode data
└── README.md       # Project documentation
```

## 🎧 Episodes Currently Featured

- **Shadow Paging, NoSQL Databases & Log-Based Recovery**
- **Preemptive Scheduling: Benefits & Algorithms**
- **Multi-Level Feedback Queue: Balancing Responsiveness**
- **Understanding Non-Preemptive Scheduling**
- **Multi-Level Feedback Queue Explained**
- **Essential Role of Schedulers in OS**
- **Preemption Solves Real-Time Input Delays**

## 🛠️ Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome 6**: Icons
- **Google Fonts**: Inter and Poppins typefaces
- **Spotify Embed API**: Audio player integration

## 🎨 Design Highlights

### Color Palette
- **Primary**: Spotify Green (#1DB954)
- **Background**: Dark theme (#121212)
- **Accents**: Pink, Purple, and Blue gradients
- **Text**: White with various opacity levels for hierarchy

### Key Components
- Sticky navigation bar with smooth scrolling
- Hero section with animated statistics
- Grid-based episode cards with hover effects
- Fixed bottom player bar
- Animated podcast visualization in About section

## 🌐 External Links

- **Main Website**: [edcatalyst.in](https://www.edcatalyst.in)
- **Spotify Podcast**: [Listen on Spotify](https://open.spotify.com/show/2SBB7iZaCa0wekK0dSvHDT)

## 👨‍💻 Creator

**Krish Mishra**
- LinkedIn: [krish-mishra297](https://www.linkedin.com/in/krish-mishra297/)
- GitHub: [kri297](https://github.com/kri297)

## 📝 How to Customize

### Adding New Episodes

Edit the `episodes` array in [script.js](script.js):

```javascript
const episodes = [
    {
        id: 1,
        title: 'Your Episode Title',
        description: 'Episode description',
        category: 'technology', // or 'education'
        duration: '5 min',
        durationSeconds: 300,
        plays: 1000,
        rating: 4.5,
        image: 'episode-cover-url',
        spotifyUrl: 'spotify-episode-url',
        embedUrl: 'spotify-embed-url'
    }
];
```

### Customizing Colors

Modify CSS variables in [styles.css](styles.css):

```css
:root {
    --spotify-green: #1DB954;
    --bg-base: #121212;
    --text-base: #ffffff;
    /* ... other variables */
}
```

### Updating Content

- **Hero Section**: Edit the hero content in [index.html](index.html)
- **About Section**: Modify the about section text
- **Footer Links**: Update social media and external links

## 🔧 Features in Detail

### Player Functionality
- Click any episode card to start playback
- Use player controls to navigate between episodes
- Player bar stays fixed at bottom while browsing
- Close player without losing current episode
- Open directly in Spotify app

### Smooth Scrolling
- Navigation links scroll smoothly to sections
- "Start Listening" button jumps to episodes
- Scroll padding accounts for fixed navbar

### Episode Cards
- Hover effects with smooth transitions
- Play button overlay on episode covers
- Duration badge on thumbnails
- Stats showing plays and ratings
- Direct "Listen" button for quick access

## 📱 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Modern mobile browsers

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own podcast or learning platform!

## 📧 Support

For questions or support, reach out to Krish Mishra via LinkedIn or GitHub.

---

<div align="center">
Made with ❤️ by Krish Mishra | © 2026 Edcatalyst TechPod
</div>
