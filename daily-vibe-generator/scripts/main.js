import { adviceData, moodCategories, vibeCategories, typeCategories } from '../data/advice.js';

document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const form = document.getElementById('vibeForm');
    const adviceText = document.getElementById('adviceText');
    const adviceCategory = document.getElementById('adviceCategory');
    const adviceCard = document.getElementById('adviceCard');
    const reactionsSection = document.getElementById('reactionsSection');
    const favoritesList = document.getElementById('favoritesList');
    const favoritesToggle = document.getElementById('favoritesToggle');
    const saveBtn = document.getElementById('saveBtn');

    // Load favorites from localStorage or empty array
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Save current advice to favorites
    saveBtn.addEventListener('click', () => {
        const currentAdviceText = adviceText.textContent;
        const currentAdviceAuthor = adviceCategory.textContent;

        if (!currentAdviceText) {
            alert('No advice to save!');
            return;
        }

        const adviceToSave = {
            text: currentAdviceText,
            author: currentAdviceAuthor,
        };

        const alreadySaved = favorites.some(advice => advice.text === adviceToSave.text);

        if (!alreadySaved) {
            favorites.push(adviceToSave);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoritesList();
            alert('❤️ Saved to your favorites!');
        } else {
            alert('You already saved this advice!');
        }
    });

    // Mood button selection
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Mood button clicked:', btn.dataset.mood); //
            document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Vibe button selection
    document.querySelectorAll('.vibe-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Vibe button clicked:', btn.dataset.vibe); //
            document.querySelectorAll('.vibe-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Handle form submission to generate advice
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const mood = document.querySelector('.mood-btn.active')?.dataset.mood;
        const vibe = document.querySelector('.vibe-btn.active')?.dataset.vibe;

        if (mood && vibe) {
            generateAdvice(mood, vibe);
        } else {
            alert('Please select your mood and vibe!');
        }
    });

    // Generate advice matching mood and vibe
    function generateAdvice(mood, vibe) {
        console.log("Searching for Mood:", mood, "Vibe:", vibe); // Debugging log
        const filteredAdvice = adviceData.filter(advice => advice.mood === mood && advice.vibe === vibe);
        console.log("Found advice entries:", filteredAdvice.length); // Debugging log

        if (filteredAdvice.length === 0) {
            adviceText.textContent = "Sorry, no advice found for that combination.";
            adviceCategory.textContent = "";
            adviceCard.classList.remove('hidden');
            adviceCard.classList.add('show'); // <-- ADD THIS LINE
            reactionsSection.classList.remove('hidden');
            console.log("No advice found path taken. Card should be visible."); // Debugging log
            return;
        }

        const randomAdvice = filteredAdvice[Math.floor(Math.random() * filteredAdvice.length)];
        console.log("Displaying advice:", randomAdvice.text); // Debugging log
        adviceText.textContent = randomAdvice.text;
        adviceCategory.textContent = randomAdvice.author;
        adviceCard.classList.remove('hidden');
        adviceCard.classList.add('show'); // <-- AND ADD THIS LINE
        reactionsSection.classList.remove('hidden');
        console.log("Advice found and displayed. Card should be visible."); // Debugging log
    }

    // Update favorites list display
    function updateFavoritesList() {
        favoritesList.innerHTML = '';
        favorites.forEach(advice => {
            const item = document.createElement('div');
            item.classList.add('favorite-item');
            item.textContent = `"${advice.text}" — ${advice.author}`;
            favoritesList.appendChild(item);
        });
    }

    // Toggle favorites list visibility
    favoritesToggle.addEventListener('click', () => {
        favoritesList.classList.toggle('show');
    });

    // Initialize favorites list on page load
    updateFavoritesList();
});