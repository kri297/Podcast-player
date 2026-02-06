// ==========================================
// EDCATALYST TECHPOD - PODCAST PLAYER
// ==========================================

// Configuration
const SPOTIFY_SHOW_ID = '2SBB7iZaCa0wekK0dSvHDT';
const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json';

// Episodes Data (will be populated dynamically)
let episodes = [];

// Fallback episodes (in case API fails)
const fallbackEpisodes = [
    {
        id: 4,
        title: 'Shadow Paging, NoSQL Databases & Log-Based Recovery',
        description: 'Exploring key concepts including shadow paging, log-based recovery, and the significance of NoSQL databases in modern data management.',
        category: 'technology',
        duration: '8 min',
        durationSeconds: 480,
        plays: 1567,
        rating: 4.9,
        image: 'https://i.scdn.co/image/ab67656300005f1f1cb38025eeaf1ff52f20f3f1',
        spotifyUrl: 'https://open.spotify.com/episode/3dTQ2Hx2T88pj16EM0BqTp',
        embedUrl: 'https://open.spotify.com/embed/episode/3dTQ2Hx2T88pj16EM0BqTp'
    },
    {
        id: 5,
        title: 'Preemptive Scheduling: Benefits & Algorithms',
        description: 'This episode explains preemptive scheduling in operating systems, highlighting how it improves system responsiveness.',
        category: 'technology',
        duration: '5 min',
        durationSeconds: 290,
        plays: 2103,
        rating: 4.7,
        image: 'https://i.scdn.co/image/ab67656300005f1f1cb38025eeaf1ff52f20f3f1',
        spotifyUrl: 'https://open.spotify.com/episode/7lbboqYwSvHOhXSTx7ubLE',
        embedUrl: 'https://open.spotify.com/embed/episode/7lbboqYwSvHOhXSTx7ubLE'
    },
    {
        id: 6,
        title: 'Multi-Level Feedback Queue: Balancing Responsiveness',
        description: 'Explore how the Multi-Level Feedback Queue scheduling algorithm dynamically adjusts process priorities.',
        category: 'technology',
        duration: '3 min',
        durationSeconds: 170,
        plays: 945,
        rating: 4.5,
        image: 'https://i.scdn.co/image/ab67656300005f1f1cb38025eeaf1ff52f20f3f1',
        spotifyUrl: 'https://open.spotify.com/episode/0cGRV1vyvpYyd5DwkH6DQJ',
        embedUrl: 'https://open.spotify.com/embed/episode/0cGRV1vyvpYyd5DwkH6DQJ'
    },
    {
        id: 7,
        title: 'Understanding Non-Preemptive Scheduling',
        description: 'Learn how non-preemptive scheduling in operating systems simplifies scheduling while impacting system responsiveness.',
        category: 'technology',
        duration: '4 min',
        durationSeconds: 250,
        plays: 1289,
        rating: 4.6,
        image: 'https://i.scdn.co/image/ab67656300005f1f1cb38025eeaf1ff52f20f3f1',
        spotifyUrl: 'https://open.spotify.com/episode/5BQgfs6Pvf03KIVQBdSWBZ',
        embedUrl: 'https://open.spotify.com/embed/episode/5BQgfs6Pvf03KIVQBdSWBZ'
    },
    {
        id: 8,
        title: 'Multi-Level Feedback Queue Explained',
        description: 'Breaking down the MLFQ scheduling algorithm used in modern operating systems with multiple priority queues.',
        category: 'technology',
        duration: '6 min',
        durationSeconds: 350,
        plays: 1876,
        rating: 4.8,
        image: 'https://i.scdn.co/image/ab67656300005f1f1cb38025eeaf1ff52f20f3f1',
        spotifyUrl: 'https://open.spotify.com/episode/7JNkgyV691drqjMsrnX3lr',
        embedUrl: 'https://open.spotify.com/embed/episode/7JNkgyV691drqjMsrnX3lr'
    },
    {
        id: 9,
        title: 'Essential Role of Schedulers in OS',
        description: 'Exploring the critical role of schedulers in operating systems, including long-term, short-term, and medium-term schedulers.',
        category: 'education',
        duration: '26 min',
        durationSeconds: 1560,
        plays: 3452,
        rating: 4.9,
        image: 'https://i.scdn.co/image/ab67656300005f1f1cb38025eeaf1ff52f20f3f1',
        spotifyUrl: 'https://open.spotify.com/episode/7LK4UdiQ7hQPlrQNPSlZLf',
        embedUrl: 'https://open.spotify.com/embed/episode/7LK4UdiQ7hQPlrQNPSlZLf'
    },
    {
        id: 10,
        title: 'Preemption Solves Real-Time Input Delays',
        description: 'Understanding how preemption enables timely handling of real-time user inputs in interactive and real-time environments.',
        category: 'technology',
        duration: '7 min',
        durationSeconds: 420,
        plays: 1634,
        rating: 4.7,
        image: 'https://i.scdn.co/image/ab67656300005f1f1cb38025eeaf1ff52f20f3f1',
        spotifyUrl: 'https://open.spotify.com/episode/2SjqolPZz91xZsCVEMY9ol',
        embedUrl: 'https://open.spotify.com/embed/episode/2SjqolPZz91xZsCVEMY9ol'
    }
];

// Fetch episodes from Spotify RSS feed
async function fetchEpisodesFromSpotify() {
    try {
        // Spotify podcasts have RSS feeds - trying to fetch via RSS2JSON
        const rssUrl = `https://anchor.fm/s/${SPOTIFY_SHOW_ID}/podcast/rss`;
        const response = await fetch(`${RSS_TO_JSON_API}?rss_url=${encodeURIComponent(rssUrl)}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch RSS feed');
        }
        
        const data = await response.json();
        
        if (data.status !== 'ok' || !data.items) {
            throw new Error('Invalid RSS feed response');
        }
        
        // Transform RSS items to our episode format
        episodes = data.items.map((item, index) => {
            // Extract Spotify episode ID from GUID or link
            const episodeId = extractSpotifyEpisodeId(item.guid || item.link);
            const imageUrl = item.thumbnail || item.enclosure?.thumbnail || data.feed?.image || 'https://i.scdn.co/image/ab67656300005f1f1cb38025eeaf1ff52f20f3f1';
            
            // Parse duration
            const durationSeconds = parseDuration(item.enclosure?.duration || item.itunes?.duration || '0');
            
            return {
                id: index + 1,
                title: item.title,
                description: stripHtml(item.description || item.content || ''),
                category: categorizeEpisode(item.title, item.description),
                duration: formatDuration(durationSeconds),
                durationSeconds: durationSeconds,
                plays: Math.floor(Math.random() * 3000) + 500, // Random plays for demo
                rating: (Math.random() * 0.5 + 4.5).toFixed(1), // Random rating 4.5-5.0
                image: imageUrl,
                spotifyUrl: episodeId ? `https://open.spotify.com/episode/${episodeId}` : item.link,
                embedUrl: episodeId ? `https://open.spotify.com/embed/episode/${episodeId}` : '',
                pubDate: item.pubDate
            };
        });
        
        console.log(`✅ Successfully loaded ${episodes.length} episodes from Spotify`);
        return true;
    } catch (error) {
        console.warn('⚠️ Failed to fetch episodes from Spotify:', error.message);
        console.log('📦 Using fallback episodes');
        episodes = fallbackEpisodes;
        return false;
    }
}

// Extract Spotify episode ID from URL or GUID
function extractSpotifyEpisodeId(urlOrGuid) {
    if (!urlOrGuid) return null;
    const match = urlOrGuid.match(/episode\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
}

// Parse duration string to seconds
function parseDuration(duration) {
    if (typeof duration === 'number') return duration;
    
    // Format: "HH:MM:SS" or "MM:SS" or seconds
    if (typeof duration === 'string') {
        const parts = duration.split(':').map(Number);
        if (parts.length === 3) {
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        } else if (parts.length === 2) {
            return parts[0] * 60 + parts[1];
        } else if (parts.length === 1) {
            return parts[0];
        }
    }
    
    return 0;
}

// Strip HTML tags from description
function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

// Categorize episode based on content
function categorizeEpisode(title, description) {
    const content = (title + ' ' + description).toLowerCase();
    
    if (content.includes('education') || content.includes('learn') || content.includes('tutorial')) {
        return 'education';
    } else if (content.includes('interview') || content.includes('conversation')) {
        return 'interview';
    } else {
        return 'technology';
    }
}

// State
let currentEpisodeIndex = -1;
let isPlaying = false;
let currentFilter = 'all';

// DOM Elements
const episodesGrid = document.getElementById('episodesGrid');
const playerBar = document.getElementById('playerBar');
const playerTitle = document.getElementById('playerTitle');
const playerImage = document.getElementById('playerImage');
const mainPlayBtn = document.getElementById('mainPlayBtn');
const spotifyIframe = document.getElementById('spotifyIframe');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Show loading state
    episodesGrid.innerHTML = '<div class="loading">🎧 Loading episodes from Spotify...</div>';
    
    // Fetch episodes from Spotify
    await fetchEpisodesFromSpotify();
    
    // Render episodes
    renderEpisodes();
    setupSmoothScroll();
});

// Render Episodes
function renderEpisodes(filter = 'all') {
    const filteredEpisodes = filter === 'all' 
        ? episodes 
        : episodes.filter(ep => ep.category === filter);
    
    episodesGrid.innerHTML = filteredEpisodes.map((episode, index) => `
        <div class="episode-card" data-index="${episodes.indexOf(episode)}" onclick="playEpisode(${episodes.indexOf(episode)})">
            <div class="episode-cover">
                <img src="${episode.image}" alt="${episode.title}">
                <span class="episode-duration">${formatDuration(episode.durationSeconds)}</span>
                <button class="play-button" onclick="event.stopPropagation(); playEpisode(${episodes.indexOf(episode)})">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div class="episode-info">
                <span class="episode-category">${episode.category}</span>
                <h3 class="episode-title">${episode.title}</h3>
                <p class="episode-description">${episode.description}</p>
                <div class="episode-meta">
                    <div class="episode-stats">
                        <span><i class="fas fa-headphones"></i> ${formatPlays(episode.plays)}</span>
                        <span><i class="fas fa-star"></i> ${episode.rating}</span>
                    </div>
                    <button class="episode-listen-btn" onclick="event.stopPropagation(); playEpisode(${episodes.indexOf(episode)})">
                        Listen
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Format Duration (seconds to "X min" format)
function formatDuration(seconds) {
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} min`;
}

// Format Play Count
function formatPlays(plays) {
    if (plays >= 1000) {
        return (plays / 1000).toFixed(1) + 'K';
    }
    return plays.toString();
}

// Play Episode
function playEpisode(index) {
    currentEpisodeIndex = index;
    const episode = episodes[index];
    
    // Update player bar
    playerTitle.textContent = episode.title;
    playerImage.src = episode.image;
    
    // Load Spotify embed with autoplay
    spotifyIframe.innerHTML = `
        <iframe 
            src="${episode.embedUrl}?utm_source=generator" 
            width="100%" 
            height="152" 
            frameborder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
        </iframe>
    `;
    spotifyIframe.classList.add('active');
    
    // Update play button
    isPlaying = true;
    mainPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
    
    // Highlight current card
    document.querySelectorAll('.episode-card').forEach(card => {
        card.classList.remove('playing');
    });
    document.querySelector(`[data-index="${index}"]`)?.classList.add('playing');
    
    // Make player bar visible
    playerBar.style.display = 'block';
    
    // Scroll to player if on mobile
    if (window.innerWidth < 768) {
        playerBar.scrollIntoView({ behavior: 'smooth' });
    }
}

// Toggle Play/Pause
function togglePlay() {
    if (currentEpisodeIndex === -1) {
        playEpisode(0);
        return;
    }
    
    isPlaying = !isPlaying;
    mainPlayBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

// Previous Episode
function prevEpisode() {
    if (currentEpisodeIndex > 0) {
        playEpisode(currentEpisodeIndex - 1);
    } else {
        playEpisode(episodes.length - 1);
    }
}

// Next Episode
function nextEpisode() {
    if (currentEpisodeIndex < episodes.length - 1) {
        playEpisode(currentEpisodeIndex + 1);
    } else {
        playEpisode(0);
    }
}

// Open in Spotify
function openSpotify() {
    if (currentEpisodeIndex >= 0) {
        window.open(episodes[currentEpisodeIndex].spotifyUrl, '_blank');
    } else {
        window.open('https://open.spotify.com/show/2SBB7iZaCa0wekK0dSvHDT', '_blank');
    }
}

// Close Player
function closePlayer() {
    spotifyIframe.innerHTML = '';
    spotifyIframe.classList.remove('active');
    currentEpisodeIndex = -1;
    isPlaying = false;
    mainPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    playerTitle.textContent = 'Select an episode to play';
    
    // Remove playing highlight from all cards
    document.querySelectorAll('.episode-card').forEach(card => {
        card.classList.remove('playing');
    });
}

// Setup Filters
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter episodes
            currentFilter = btn.dataset.filter;
            renderEpisodes(currentFilter);
        });
    });
}

// Smooth scroll for navigation
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(18, 18, 18, 0.98)';
    } else {
        navbar.style.background = 'rgba(18, 18, 18, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        togglePlay();
    }
    if (e.code === 'ArrowRight') {
        nextEpisode();
    }
    if (e.code === 'ArrowLeft') {
        prevEpisode();
    }
});
