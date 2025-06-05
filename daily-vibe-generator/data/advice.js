// Daily Vibe Generator - Advice Database (Extended)
const adviceData = [
    // ✨ Motivational Vibes
    {
        type: "motivational",
        mood: "sad",
        vibe: "motivation",
        text: "You're not behind. You're on your own timeline, and that's exactly where you need to be.",
        author: "Universe"
    },
    {
        type: "motivational",
        mood: "tired",
        vibe: "motivation",
        text: "Rest when you're tired, but don't give up. Your dreams are still waiting for you.",
        author: "Your Future Self"
    },
    {
        type: "motivational",
        mood: "stressed",
        vibe: "motivation",
        text: "You've survived 100% of your worst days. That's a pretty good track record.",
        author: "Reality Check"
    },
    {
        type: "motivational",
        mood: "confused",
        vibe: "motivation",
        text: "Not knowing what's next isn't failure - it's potential. Embrace the unknown.",
        author: "Adventure"
    },
    {
        type: "motivational",
        mood: "neutral",
        vibe: "motivation",
        text: "Small progress is still progress. You're closer than you think.",
        author: "Persistence"
    },

    // 💡 Smart Sass
    {
        type: "smart-sass",
        mood: "annoyed",
        vibe: "focus",
        text: "If it costs your peace, it's too expensive. Time to return that energy to sender.",
        author: "Boundary Queen"
    },
    {
        type: "smart-sass",
        mood: "stressed",
        vibe: "peace",
        text: "You can't control everything, but you can control your Wi-Fi password. Start there.",
        author: "Tech Zen"
    },
    {
        type: "smart-sass",
        mood: "neutral",
        vibe: "surprise",
        text: "Plot twist: you're the main character of your story. Start acting like it.",
        author: "Reality TV"
    },
    {
        type: "smart-sass",
        mood: "excited",
        vibe: "fun",
        text: "Your energy is contagious - make sure you're spreading the good stuff!",
        author: "Vibe Distributor"
    },
    {
        type: "smart-sass",
        mood: "tired",
        vibe: "peace",
        text: "Saying no is a complete sentence. No explanation needed, bestie.",
        author: "Boundary Expert"
    },

    // 🧘 Mindful Vibes
    {
        type: "mindful",
        mood: "stressed",
        vibe: "peace",
        text: "Breathe in calm, breathe out chaos. Your nervous system will thank you.",
        author: "Inner Peace"
    },
    {
        type: "mindful",
        mood: "overwhelmed",
        vibe: "focus",
        text: "One thing at a time isn't slow - it's sustainable. Your future self is cheering you on.",
        author: "Mindful Productivity"
    },
    {
        type: "mindful",
        mood: "sad",
        vibe: "peace",
        text: "Feelings are visitors, not residents. Let them come, acknowledge them, then show them the door.",
        author: "Emotional Intelligence"
    },
    {
        type: "mindful",
        mood: "happy",
        vibe: "peace",
        text: "This moment of joy deserves your full attention. Soak it in like sunshine.",
        author: "Present Moment"
    },
    {
        type: "mindful",
        mood: "anxious",
        vibe: "peace",
        text: "Ground yourself: 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.",
        author: "Mindfulness Practice"
    },

    // 🧃 Wholesome Gen-Z
    {
        type: "wholesome",
        mood: "tired",
        vibe: "fun",
        text: "Self-care isn't selfish bestie. Put your oxygen mask on first - flight attendant's orders! ✈",
        author: "Your Caring Friend"
    },
    {
        type: "wholesome",
        mood: "happy",
        vibe: "fun",
        text: "You're absolutely glowing today! Keep that energy, it's giving main character vibes! ✨",
        author: "Hype Squad"
    },
    {
        type: "wholesome",
        mood: "confused",
        vibe: "surprise",
        text: "Not all who wander are lost - some are just taking the scenic route to greatness! 🗺",
        author: "Adventure Guide"
    },
    {
        type: "wholesome",
        mood: "excited",
        vibe: "motivation",
        text: "Your enthusiasm is literally medicine for other people's souls. Keep being that light! 💡",
        author: "Positive Energy"
    },
    {
        type: "wholesome",
        mood: "sad",
        vibe: "peace",
        text: "It's okay to not be okay sometimes. You're human, not a robot. Give yourself grace. 💜",
        author: "Gentle Reminder"
    },

    // 💡 Focus & Productivity
    {
        type: "focus",
        mood: "distracted",
        vibe: "focus",
        text: "Your attention is your superpower. Use it wisely, protect it fiercely.",
        author: "Focus Master"
    },
    {
        type: "focus",
        mood: "overwhelmed",
        vibe: "focus",
        text: "Break it down until it breaks down. Small steps still get you to big places.",
        author: "Strategy"
    },
    {
        type: "focus",
        mood: "procrastinating",
        vibe: "motivation",
        text: "The hardest part is starting. Once you begin, momentum becomes your best friend.",
        author: "Action"
    },
    {
        type: "focus",
        mood: "stressed",
        vibe: "focus",
        text: "Priority one: breathe. Priority two: pick one thing. Priority three: do that thing.",
        author: "Simplicity"
    },
    {
        type: "focus",
        mood: "tired",
        vibe: "focus",
        text: "Work smarter, not harder. Your brain needs breaks to make breakthroughs.",
        author: "Efficiency Expert"
    },

    // 🌟 Random Wisdom
    {
        type: "wisdom",
        mood: "any",
        vibe: "surprise",
        text: "You're exactly where you need to be to get to where you're going. Trust the process.",
        author: "Journey"
    },
    {
        type: "wisdom",
        mood: "any",
        vibe: "surprise",
        text: "Your mistakes are just plot twists in your success story. Keep writing.",
        author: "Author of Your Life"
    },
    {
        type: "wisdom",
        mood: "any",
        vibe: "surprise",
        text: "Growth happens in the uncomfortable spaces between who you were and who you're becoming.",
        author: "Evolution"
    },
    {
        type: "wisdom",
        mood: "any",
        vibe: "surprise",
        text: "The universe has perfect timing. What's meant for you will never pass you by.",
        author: "Divine Timing"
    },
    {
        type: "wisdom",
        mood: "any",
        vibe: "surprise",
        text: "You're not stuck. You're just taking a different route to your destination.",
        author: "GPS of Life"
    },

    // 🎉 Fun & Playful
    {
        type: "fun",
        mood: "happy",
        vibe: "fun",
        text: "Life's too short for boring socks and bad vibes. Choose joy, choose fun!",
        author: "Fun Police (Retired)"
    },
    {
        type: "fun",
        mood: "excited",
        vibe: "fun",
        text: "Your excitement is infectious! Keep spreading those good vibes like confetti! 🎊",
        author: "Party Planner"
    },
    {
        type: "fun",
        mood: "neutral",
        vibe: "fun",
        text: "Adulting is hard, but have you tried turning it into a game? Everything's more fun with points!",
        author: "Gamification Guru"
    },
    {
        type: "fun",
        mood: "tired",
        vibe: "fun",
        text: "Even superheroes need rest days. Recharge those superpowers, hero!",
        author: "Superhero Support"
    },

    // 💪 Resilience & Strength (Continued)
    {
        type: "resilience",
        mood: "sad",
        vibe: "motivation",
        text: "You've weathered storms before and you're still here. That's not luck, that's strength.",
        author: "Inner Warrior"
    },
    {
        type: "resilience",
        mood: "stressed",
        vibe: "motivation",
        text: "Diamonds are formed under pressure. You're being polished into something brilliant.",
        author: "Transformation"
    },
    {
        type: "resilience",
        mood: "overwhelmed",
        vibe: "motivation",
        text: "You're not drowning, you're learning to swim in deeper waters. Keep kicking.",
        author: "Survival Instinct"
    },
    {
        type: "resilience",
        mood: "defeated",
        vibe: "motivation",
        text: "Rock bottom became the solid foundation on which you rebuilt your life.",
        author: "Phoenix Rising"
    },
    {
        type: "resilience",
        mood: "anxious",
        vibe: "motivation",
        text: "Courage isn't the absence of fear - it's feeling the fear and showing up anyway.",
        author: "Brave Heart"
    },

    // 🌸 Self-Love & Acceptance
    {
        type: "self-love",
        mood: "insecure",
        vibe: "peace",
        text: "You are enough, exactly as you are right now. Growth is bonus points, not requirements.",
        author: "Self-Acceptance"
    },
    {
        type: "self-love",
        mood: "comparing",
        vibe: "peace",
        text: "Comparison is the thief of joy. Your only competition is who you were yesterday.",
        author: "Authentic Self"
    },
    {
        type: "self-love",
        mood: "critical",
        vibe: "peace",
        text: "Talk to yourself like you would your best friend. You deserve that kindness too.",
        author: "Inner Friend"
    },
    {
        type: "self-love",
        mood: "tired",
        vibe: "peace",
        text: "Rest is not earned through exhaustion. You deserve rest simply because you exist.",
        author: "Self-Compassion"
    },
    {
        type: "self-love",
        mood: "disappointed",
        vibe: "peace",
        text: "You're allowed to be proud of small wins. Progress isn't always loud and obvious.",
        author: "Gentle Victory"
    },

    // 🚀 Adventure & Growth
    {
        type: "adventure",
        mood: "scared",
        vibe: "motivation",
        text: "The magic happens outside your comfort zone. Take that first scary step.",
        author: "Adventure Awaits"
    },
    {
        type: "adventure",
        mood: "stuck",
        vibe: "motivation",
        text: "Sometimes you need to get lost to find yourself. Embrace the detour.",
        author: "Wanderer"
    },
    {
        type: "adventure",
        mood: "curious",
        vibe: "fun",
        text: "Curiosity is your compass. Follow it and see where it leads you today.",
        author: "Explorer"
    },
    {
        type: "adventure",
        mood: "restless",
        vibe: "motivation",
        text: "That restless feeling? It's your soul asking for expansion. Listen to it.",
        author: "Soul Whisper"
    },
    {
        type: "adventure",
        mood: "bored",
        vibe: "surprise",
        text: "Boredom is creativity in disguise. What wild idea is trying to break through?",
        author: "Hidden Creativity"
    },

    // 🤝 Connection & Relationships
    {
        type: "connection",
        mood: "lonely",
        vibe: "peace",
        text: "Being alone doesn't mean being lonely. You're never alone when you enjoy your own company.",
        author: "Solitude Friend"
    },
    {
        type: "connection",
        mood: "misunderstood",
        vibe: "peace",
        text: "Your tribe will find you. Until then, be the person you needed when you were younger.",
        author: "Soul Family"
    },
    {
        type: "connection",
        mood: "grateful",
        vibe: "peace",
        text: "Gratitude turns what we have into enough. Count those blessings, big and small.",
        author: "Thankful Heart"
    },
    {
        type: "connection",
        mood: "hurt",
        vibe: "peace",
        text: "Hurt people hurt people, but healed people heal people. Choose healing.",
        author: "Healing Circle"
    },
    {
        type: "connection",
        mood: "loving",
        vibe: "fun",
        text: "Love multiplies when shared. Spread it around like you're made of it!",
        author: "Love Generator"
    },

    // 🎯 Purpose & Meaning
    {
        type: "purpose",
        mood: "lost",
        vibe: "motivation",
        text: "Purpose isn't found, it's created. Start with what makes you come alive.",
        author: "Life Architect"
    },
    {
        type: "purpose",
        mood: "questioning",
        vibe: "motivation",
        text: "The questions you're asking are signs you're ready for the next level.",
        author: "Deep Thinker"
    },
    {
        type: "purpose",
        mood: "passionate",
        vibe: "motivation",
        text: "Follow your passion, but bring a ladder. Dreams need practical steps too.",
        author: "Dream Builder"
    },
    {
        type: "purpose",
        mood: "doubtful",
        vibe: "motivation",
        text: "Your voice matters. The world needs exactly what you have to offer.",
        author: "Unique Contribution"
    },
    {
        type: "purpose",
        mood: "inspired",
        vibe: "motivation",
        text: "Inspiration is action waiting to happen. Don't let this moment pass you by.",
        author: "Momentum"
    },

    // 🌙 Evening & Reflection
    {
        type: "reflection",
        mood: "tired",
        vibe: "peace",
        text: "Today was practice for tomorrow. Rest now, you've earned it.",
        author: "Evening Wisdom"
    },
    {
        type: "reflection",
        mood: "proud",
        vibe: "peace",
        text: "Look how far you've come. Past you would be so proud of present you.",
        author: "Progress Mirror"
    },
    {
        type: "reflection",
        mood: "regretful",
        vibe: "peace",
        text: "Mistakes are proof you were trying. Tomorrow is your fresh start.",
        author: "New Dawn"
    },
    {
        type: "reflection",
        mood: "peaceful",
        vibe: "peace",
        text: "This quiet moment is yours. Let peace fill all the spaces stress left behind.",
        author: "Serenity"
    },
    {
        type: "reflection",
        mood: "thoughtful",
        vibe: "peace",
        text: "In the stillness, you'll find answers you didn't know you were seeking.",
        author: "Inner Knowing"
    },

    // 🌅 Morning & Fresh Starts
    {
        type: "fresh-start",
        mood: "sluggish",
        vibe: "motivation",
        text: "Every sunrise is a invitation to begin again. Today is yours to create.",
        author: "New Day Energy"
    },
    {
        type: "fresh-start",
        mood: "hopeful",
        vibe: "motivation",
        text: "Hope is tomorrow's possibility living in today's heart. Keep hoping.",
        author: "Hope Keeper"
    },
    {
        type: "fresh-start",
        mood: "determined",
        vibe: "motivation",
        text: "Your determination is your superpower. Today, you choose to keep going.",
        author: "Unstoppable Force"
    },
    {
        type: "fresh-start",
        mood: "nervous",
        vibe: "motivation",
        text: "New beginnings feel scary because they're important. You've got this.",
        author: "Fresh Chapter"
    },
    {
        type: "fresh-start",
        mood: "excited",
        vibe: "fun",
        text: "Today has never happened before and will never happen again. Make it count!",
        author: "Once-in-a-Lifetime"
    },

    // 🎨 Creativity & Expression
    {
        type: "creative",
        mood: "blocked",
        vibe: "motivation",
        text: "Creative blocks are just creativity reorganizing itself. The breakthrough is coming.",
        author: "Artistic Flow"
    },
    {
        type: "creative",
        mood: "inspired",
        vibe: "fun",
        text: "Inspiration struck? Drop everything and chase it! Creativity waits for no one.",
        author: "Muse Whisperer"
    },
    {
        type: "creative",
        mood: "doubtful",
        vibe: "motivation",
        text: "Art is not about perfection, it's about expression. Your voice deserves to be heard.",
        author: "Creative Courage"
    },
    {
        type: "creative",
        mood: "playful",
        vibe: "fun",
        text: "Play is creativity's playground. Go mess around and make something beautiful!",
        author: "Inner Child"
    },
    {
        type: "creative",
        mood: "frustrated",
        vibe: "peace",
        text: "Creativity has its own timeline. Trust the process, even when it feels slow.",
        author: "Patient Artist"
    }
];

// Mood categories for easy filtering
const moodCategories = {
    positive: ["happy", "excited", "grateful", "proud", "hopeful", "loving", "peaceful", "inspired", "playful", "determined"],
    challenging: ["sad", "stressed", "overwhelmed", "anxious", "tired", "confused", "annoyed", "scared", "lonely", "frustrated"],
    neutral: ["neutral", "thoughtful", "curious", "bored", "sluggish", "distracted"],
    growth: ["questioning", "stuck", "restless", "blocked", "doubtful", "comparing", "critical", "regretful"]
};

// Vibe categories
const vibeCategories = {
    motivation: "Get energized and inspired",
    peace: "Find calm and balance", 
    focus: "Sharpen your concentration",
    fun: "Lighten up and enjoy",
    surprise: "Discover something unexpected"
};

// Type categories with descriptions
const typeCategories = {
    "motivational": "Uplifting and inspiring messages",
    "smart-sass": "Witty wisdom with attitude",
    "mindful": "Mindfulness and inner peace",
    "wholesome": "Sweet and supportive Gen-Z vibes",
    "focus": "Productivity and concentration tips",
    "wisdom": "Deep insights and life lessons",
    "fun": "Playful and lighthearted advice",
    "resilience": "Strength through tough times",
    "self-love": "Self-acceptance and kindness",
    "adventure": "Growth and new experiences",
    "connection": "Relationships and community",
    "purpose": "Meaning and direction in life",
    "reflection": "Evening thoughts and contemplation",
    "fresh-start": "New beginnings and hope",
    "creative": "Artistic expression and inspiration"
};

export { adviceData, moodCategories, vibeCategories, typeCategories };