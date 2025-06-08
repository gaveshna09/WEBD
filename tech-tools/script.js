document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selections ---
    const body = document.body;
    const welcomeSection = document.getElementById('welcome-section');
    const formSection = document.getElementById('form-section');
    const profileSection = document.getElementById('profile-section');
    const productSection = document.getElementById('product-section');
    const learningResourcesSection = document.getElementById('learning-resources-section'); // New
    const techNewsSection = document.getElementById('tech-news-section'); // New

    const getStartedButton = document.getElementById('get-started-button');
    const userForm = document.getElementById('user-form');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profilePhone = document.getElementById('profile-phone');
    const profileGithub = document.getElementById('profile-github');
    const profilePortfolio = document.getElementById('profile-portfolio');
    const profileLinkedin = document.getElementById('profile-linkedin');
    const favoriteList = document.getElementById('favorite-list');
    const viewToolsButton = document.getElementById('view-tools-button');
    const allProductsList = document.getElementById('all-products-list');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');

    // Action Buttons (New & Existing, now controlled by container)
    const actionButtonsContainer = document.getElementById('action-buttons-container');
    const controlHubButton = document.getElementById('control-hub-button'); // New
    const themeToggle = document.getElementById('theme-toggle');
    const profileButton = document.getElementById('profile-button');
    const learnToolsButton = document.getElementById('learn-tools-button'); // New
    const techNewsButton = document.getElementById('tech-news-button'); // New

    // New Sections' Content Areas
    const learningResourcesList = document.getElementById('learning-resources-list');
    const newsArticlesList = document.getElementById('news-articles-list');
    const newsLoadingMessage = document.getElementById('news-loading-message');


    // --- Global Data & State ---
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    let favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
    let currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark

    // --- News API Setup ---
    // Your NewsAPI key has been inserted here!
    const NEWS_API_KEY = '3e4a074c2b5849738cd47c895a359e2e'; 
    const NEWS_API_URL = `https://newsapi.org/v2/everything?q=AI%20OR%20Tech%20OR%20Innovation&sortBy=publishedAt&language=en&pageSize=9&apiKey=${NEWS_API_KEY}`;
    let newsCache = null; // Simple cache for news articles
    const NEWS_CACHE_DURATION = 3600000; // 1 hour in milliseconds

    // --- Product Data ---
    const products = [
        {
            id: 'ai-code-buddy',
            name: 'AI Code Buddy',
            category: 'developer-tools',
            price: '₹1500', // String with rupee symbol
            rating: 4.8, // Number
            description: 'Your personal AI coding assistant. Helps you write, debug, and optimize code faster.',
            image: 'https://cdn-icons-png.flaticon.com/512/10499/10499119.png',
            learnMoreLink: 'https://github.com/features/copilot/' // Example link, replace with actual
        },
        {
            id: 'design-synth',
            name: 'Design Synth',
            category: 'ui-ux-design',
            price: '₹2500',
            rating: 4.9,
            description: 'Generate stunning UI/UX designs from simple text prompts. Perfect for rapid prototyping.',
            image: 'https://cdn-icons-png.flaticon.com/512/6292/6292211.png',
            learnMoreLink: 'https://www.adobe.com/products/photoshop.html' // Example link
        },
        {
            id: 'data-nexus-pro',
            name: 'Data Nexus Pro',
            category: 'ai-tools',
            price: '₹8000',
            rating: 4.7,
            description: 'Advanced AI platform for data analysis, predictive modeling, and intelligent insights.',
            image: 'https://cdn-icons-png.flaticon.com/512/9161/9161274.png',
            learnMoreLink: 'https://www.tableau.com/' // Example link
        },
        {
            id: 'api-flow-master',
            name: 'API Flow Master',
            category: 'api-tools',
            price: '₹1200',
            rating: 4.6,
            description: 'Streamline API integrations and workflows with AI-powered automation. No more manual coding!',
            image: 'https://cdn-icons-png.flaticon.com/512/10399/10399084.png',
            learnMoreLink: 'https://zapier.com/' // Example link
        },
        {
            id: 'virtual-brainstorm',
            name: 'Virtual Brainstorm',
            category: 'ui-ux-design',
            price: 'Free',
            rating: 4.5,
            description: 'Collaborative AI whiteboard for creative teams. Ideate, draw, and get AI suggestions.',
            image: 'https://cdn-icons-png.flaticon.com/512/9906/9906915.png',
            learnMoreLink: 'https://www.mural.co/' // Example link
        },
        {
            id: 'quantum-compiler',
            name: 'Quantum Compiler',
            category: 'developer-tools',
            price: '₹10000',
            rating: 5.0,
            description: 'Cutting-edge compiler leveraging quantum principles for ultra-fast code execution.',
            image: 'https://cdn-icons-png.flaticon.com/512/9963/9963777.png',
            learnMoreLink: 'https://quantum-computing.ibm.com/compilers' // Example link
        },
        {
            id: 'sentient-chatbot-sdk',
            name: 'Sentient Chatbot SDK',
            category: 'ai-tools',
            price: '₹5000',
            rating: 4.8,
            description: 'Develop highly intelligent chatbots with emotional intelligence. Integrates with any platform.',
            image: 'https://cdn-icons-png.flaticon.com/512/10500/10500305.png',
            learnMoreLink: 'https://dialogflow.cloud.google.com/' // Example link
        },
        {
            id: 'cyber-security-guardian',
            name: 'Cyber Security Guardian',
            category: 'ai-tools',
            price: '₹7500',
            rating: 4.9,
            description: 'AI-powered threat detection and prevention for your digital assets. Stay secure!',
            image: 'https://cdn-icons-png.flaticon.com/512/9907/9907005.png',
            learnMoreLink: 'https://www.crowdstrike.com/' // Example link
        },
        {
            id: 'holographic-interface',
            name: 'Holographic Interface',
            category: 'ui-ux-design',
            price: 'Limited Edition',
            rating: 4.7,
            description: 'Design and preview interfaces in true 3D holographic projection. Exclusive!',
            image: 'https://cdn-icons-png.flaticon.com/512/9906/9906969.png',
            learnMoreLink: 'https://www.microsoft.com/en-us/hololens' // Example link
        },
        {
            id: 'neural-network-studio',
            name: 'Neural Network Studio',
            category: 'developer-tools',
            price: '₹3000',
            rating: 4.6,
            description: 'Build, train, and deploy neural networks with an intuitive visual interface.',
            image: 'https://cdn-icons-png.flaticon.com/512/9161/9161304.png',
            learnMoreLink: 'https://www.tensorflow.org/lite/models' // Example link
        },
        {
            id: 'realtime-data-stream',
            name: 'Real-time Data Stream API',
            category: 'api-tools',
            price: '₹800',
            rating: 4.5,
            description: 'Access and process real-time data feeds with low latency via our robust API.',
            image: 'https://cdn-icons-png.flaticon.com/512/10399/10399120.png',
            learnMoreLink: 'https://aws.amazon.com/kinesis/data-streams/' // Example link
        },
        {
            id: 'ai-voice-cloner',
            name: 'AI Voice Cloner',
            category: 'ai-tools',
            price: '₹4000',
            rating: 4.7,
            description: 'Replicate any voice with advanced AI synthesis. Perfect for content creation.',
            image: 'https://cdn-icons-png.flaticon.com/512/9906/9906941.png',
            learnMoreLink: 'https://elevenlabs.io/' // Example link
        },
        // Replaced 'diamond-chronograph' with 'black-box-ai'
        {
            id: 'black-box-ai',
            image: 'https://dummyimage.com/120x120/333333/ffffff&text=BlackBoxAI', // New dummy image
            name: 'Black Box AI',
            category: 'ai-tools', // Changed category
            price: '₹1999', // New price
            rating: 4.9, // New rating
            learnMoreLink: 'https://www.blackbox.ai/', // New link
            description: 'Your personal AI coding assistant for instant code solutions and explanations.' // New description
        },
        {
            id: 'vscode',
            image: 'https://dummyimage.com/120x120/007acc/ffffff&text=VSCode',
            name: 'Visual Studio Code',
            category: 'developer-tools',
            price: 'Free',
            rating: 4.9, // Extracted number
            learnMoreLink: 'https://code.visualstudio.com/', // Renamed from 'link'
            description: 'A powerful, free, and open-source code editor for modern web and cloud applications.' // Added description
        },
        {
            id: 'github-copilot',
            image: 'https://dummyimage.com/120x120/000000/ffffff&text=Copilot',
            name: 'GitHub Copilot',
            category: 'developer-tools',
            price: '₹900', // Converted to string
            rating: 4.7, // Extracted number
            learnMoreLink: 'https://github.com/features/copilot', // Renamed from 'link'
            description: 'AI pair programmer that suggests code and entire functions in real-time.' // Added description
        },
        {
            id: 'sublime-text',
            image: 'https://dummyimage.com/120x120/ff7f50/ffffff&text=Sublime',
            name: 'Sublime Text',
            category: 'developer-tools',
            price: '₹7000', // Converted to string
            rating: 4.5, // Extracted number
            learnMoreLink: 'https://www.sublimetext.com/', // Renamed from 'link'
            description: 'A sophisticated text editor for code, markup and prose with a sleek UI.' // Added description
        },
        {
            id: 'intellij-idea',
            image: 'https://dummyimage.com/120x120/ff4500/ffffff&text=IntelliJ',
            name: 'JetBrains IntelliJ IDEA',
            category: 'developer-tools',
            price: '₹5999', // Converted to string
            rating: 4.6, // Extracted number
            learnMoreLink: 'https://www.jetbrains.com/idea/', // Renamed from 'link'
            description: 'A powerful and ergonomic IDE for Java, Kotlin, and other JVM languages.' // Added description
        },
        {
            id: 'figma',
            image: 'https://dummyimage.com/120x120/f24e1e/ffffff&text=Figma',
            name: 'Figma',
            category: 'ui-ux-design',
            price: '₹1200', // Converted to string
            rating: 4.8, // Extracted number
            learnMoreLink: 'https://www.figma.com/', // Renamed from 'link'
            description: 'The collaborative interface design tool for designing and prototyping UI/UX.' // Added description
        },
        {
            id: 'adobe-xd',
            image: 'https://dummyimage.com/120x120/ff61f6/ffffff&text=Adobe+XD',
            name: 'Adobe XD',
            category: 'ui-ux-design',
            price: '₹999', // Converted to string
            rating: 4.5, // Extracted number
            learnMoreLink: 'https://www.adobe.com/products/xd.html', // Renamed from 'link'
            description: 'Design, prototype, and share user experiences with Adobe XD.' // Added description
        },
        {
            id: 'sketch',
            image: 'https://dummyimage.com/120x120/007aff/ffffff&text=Sketch',
            name: 'Sketch',
            category: 'ui-ux-design',
            price: '₹1000', // Converted to string
            rating: 4.4, // Extracted number
            learnMoreLink: 'https://www.sketch.com/', // Renamed from 'link'
            description: 'A design toolkit for macOS, built to create, prototype, collaborate, and bring your ideas to life.' // Added description
        },
        {
            id: 'chatgpt-plus',
            image: 'https://dummyimage.com/120x120/00b300/ffffff&text=ChatGPT',
            name: 'ChatGPT Plus',
            category: 'ai-tools',
            price: '₹1650', // Converted to string
            rating: 4.9, // Extracted number
            learnMoreLink: 'https://chat.openai.com/', // Renamed from 'link'
            description: 'Access to OpenAI\'s most capable model, GPT-4, with faster response times and priority access.' // Added description
        },
        {
            id: 'dall-e',
            image: 'https://dummyimage.com/120x120/ff6347/ffffff&text=DALL·E',
            name: 'DALL·E',
            category: 'ai-tools',
            price: '₹1200', // Converted to string
            rating: 4.6, // Extracted number
            learnMoreLink: 'https://openai.com/dall-e', // Renamed from 'link'
            description: 'An AI system that can create realistic images and art from a description in natural language.' // Added description
        },
        {
            id: 'jasper-ai',
            image: 'https://dummyimage.com/120x120/1e90ff/ffffff&text=Jasper',
            name: 'Jasper AI',
            category: 'ai-tools',
            price: '₹2900', // Converted to string
            rating: 4.5, // Extracted number
            learnMoreLink: 'https://www.jasper.ai/', // Renamed from 'link'
            description: 'The leading AI writing tool that helps you create content 10x faster.' // Added description
        },
        {
            id: 'postman-premium',
            image: 'https://dummyimage.com/120x120/ff8c00/ffffff&text=Postman',
            name: 'Postman Premium',
            category: 'api-tools',
            price: '₹1100', // Converted to string
            rating: 4.5, // Extracted number
            learnMoreLink: 'https://www.postman.com/', // Renamed from 'link'
            description: 'The collaboration platform for API development. Simplify each step of the API lifecycle.' // Added description
        },
        {
            id: 'swaggerhub',
            image: 'https://dummyimage.com/120x120/ff4500/ffffff&text=SwaggerHub',
            name: 'SwaggerHub',
            category: 'api-tools',
            price: '₹999', // Converted to string
            rating: 4.4, // Extracted number
            learnMoreLink: 'https://swagger.io/tools/swaggerhub/', // Renamed from 'link'
            description: 'Standardize API design and documentation with SwaggerHub.' // Added description
        },
        {
            id: 'hoppscotch',
            image: 'https://dummyimage.com/120x120/008080/ffffff&text=Hoppscotch',
            name: 'Hoppscotch',
            category: 'api-tools',
            price: 'Free',
            rating: 4.6, // Extracted number
            learnMoreLink: 'https://hoppscotch.io/', // Renamed from 'link'
            description: 'A lightweight, web-based API development ecosystem for sending API requests.' // Added description
        }
    ];

    // --- NEW: Learning Resources Data ---
    const learningResources = [
        {
            id: 'learn-ai-basics',
            name: 'AI Basics for Beginners',
            category: 'AI Fundamentals',
            description: 'Start your journey into Artificial Intelligence with this comprehensive guide.',
            link: 'https://www.ibm.com/topics/artificial-intelligence',
            image: 'https://cdn-icons-png.flaticon.com/512/9161/9161274.png' // Reusing a relevant icon
        },
        {
            id: 'webdev-roadmap',
            name: 'Modern Web Dev Roadmap',
            category: 'Web Development',
            description: 'A structured roadmap to becoming a full-stack web developer in 2024.',
            link: 'https://roadmap.sh/frontend',
            image: 'https://cdn-icons-png.flaticon.com/512/10499/10499119.png'
        },
        {
            id: 'figma-masterclass',
            name: 'Figma UI/UX Masterclass',
            category: 'UI/UX Design',
            description: 'Learn to design stunning user interfaces and experiences using Figma.',
            link: 'https://www.figma.com/resources/',
            image: 'https://cdn-icons-png.flaticon.com/512/6292/6292211.png'
        },
        {
            id: 'python-for-ml',
            name: 'Python for Machine Learning',
            category: 'AI Programming',
            description: 'Essential Python skills for Machine Learning and Data Science projects.',
            link: 'https://www.datacamp.com/courses/introduction-to-python-for-data-science',
            image: 'https://cdn-icons-png.flaticon.com/512/9963/9963777.png'
        },
        {
            id: 'api-integration-guide',
            name: 'API Integration Best Practices',
            category: 'API Development',
            description: 'Understand how to securely and efficiently integrate various APIs into your applications.',
            link: 'https://www.freecodecamp.org/news/how-to-use-an-api-a-beginners-guide/',
            image: 'https://cdn-icons-png.flaticon.com/512/10399/10399120.png'
        }
    ];

    // --- Matrix Background Animation ---
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    let matrixInterval;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function initializeMatrixRain() {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const columns = Math.floor(canvas.width / 20);
        const drops = Array(columns).fill(canvas.height); // Initial y position for each column

        const fontSize = 20;
        ctx.font = `${fontSize}px monospace`;

        function draw() {
            // Semi-transparent background for fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Matrix character color
            const textColor = currentTheme === 'dark' ? '#0F0' : '#00A86B'; // Brighter green for dark, slightly muted for light
            ctx.fillStyle = textColor;

            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(48 + Math.random() * 75); // ASCII chars 0-9, A-Z, etc.
                ctx.fillText(text, i * fontSize, drops[i]);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0; // Reset drop to top
                }
                drops[i]++; // Move drop down
            }
        }

        // Clear any existing interval before setting a new one
        if (matrixInterval) {
            clearInterval(matrixInterval);
        }
        matrixInterval = setInterval(draw, 33); // Adjust speed
    }

    // --- Section Management ---
    const allSections = [welcomeSection, formSection, profileSection, productSection, learningResourcesSection, techNewsSection];

    function showSection(sectionToShow) {
        allSections.forEach(section => {
            section.classList.add('hidden'); // Hide all sections
            section.classList.remove('active'); // Remove active class
        });
        sectionToShow.classList.remove('hidden'); // Show the target section
        sectionToShow.classList.add('active'); // Add active class for animations
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }

    // --- Theme Toggle Logic ---
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeToggle.textContent = '☀️'; // Sun emoji for light mode
        } else {
            body.classList.remove('light-mode');
            themeToggle.textContent = '🌙'; // Moon emoji for dark mode
        }
        currentTheme = theme;
        localStorage.setItem('theme', theme);
        updateMatrixColors(); // Update Matrix color immediately
    }

    // Function to update matrix colors based on current theme (called by applyTheme)
    function updateMatrixColors() {
        if (matrixInterval) {
            clearInterval(matrixInterval);
            initializeMatrixRain(); // Re-initialize to apply new color
        }
    }

    function toggleTheme() {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }

    // --- User Profile Form & Display ---
    function loadUserProfile() {
        if (currentUser.name) {
            profileName.textContent = currentUser.name;
            profileEmail.textContent = currentUser.email;
            profilePhone.textContent = currentUser.phone || 'N/A';
            profileGithub.textContent = currentUser.github ? currentUser.github.split('/').pop() : 'N/A'; // Show only username
            profileGithub.href = currentUser.github || '#';
            profilePortfolio.textContent = currentUser.portfolio ? new URL(currentUser.portfolio).hostname : 'N/A'; // Show hostname
            profilePortfolio.href = currentUser.portfolio || '#';
            profileLinkedin.textContent = currentUser.linkedin ? currentUser.linkedin.split('/').pop() : 'N/A'; // Show username
            profileLinkedin.href = currentUser.linkedin || '#';
            if (!currentUser.github || currentUser.github === '#') profileGithub.style.display = 'none'; else profileGithub.style.display = 'inline';
            if (!currentUser.portfolio || currentUser.portfolio === '#') profilePortfolio.style.display = 'none'; else profilePortfolio.style.display = 'inline';
            if (!currentUser.linkedin || currentUser.linkedin === '#') profileLinkedin.style.display = 'none'; else profileLinkedin.style.display = 'inline';
            renderFavorites();
        } else {
            // If no user, show form or welcome
            showSection(welcomeSection);
        }
    }

    function saveUserProfile(event) {
        event.preventDefault();
        const formData = new FormData(userForm);
        currentUser = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            github: formData.get('github'),
            portfolio: formData.get('portfolio'),
            linkedin: formData.get('linkedin')
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        loadUserProfile(); // Update displayed profile
        showSection(profileSection); // Show profile section
    }

    // --- Product Rendering & Filtering ---
    function renderProducts(filteredProducts = products) {
        allProductsList.innerHTML = '';
        if (filteredProducts.length === 0) {
            allProductsList.innerHTML = `<div class="empty-favorites-message">No tools found matching your criteria.</div>`;
            return;
        }
        filteredProducts.forEach(product => {
            const isFavorited = favoriteProducts.some(fav => fav.id === product.id);
            const productCard = document.createElement('div');
            productCard.classList.add('product-card', 'glass-container');
            productCard.innerHTML = `
                <button class="favorite-button" data-product-id="${product.id}">
                    ${isFavorited ? '❤️' : '🤍'}
                </button>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="category">${product.category.replace(/-/g, ' ')}</p>
                <p class="price">${product.price === 'Limited Edition' ? product.price : (product.price === 'Free' ? 'Free' : 'Price: ' + product.price)}</p>
                <p class="rating">Rating: ${product.rating} ⭐</p>
                <p class="description">${product.description || 'No description available.'}</p>
                <a href="${product.learnMoreLink}" target="_blank" rel="noopener noreferrer" class="know-more">Know More</a>
            `;
            allProductsList.appendChild(productCard);
        });

        // Add event listeners to new favorite buttons
        document.querySelectorAll('.favorite-button').forEach(button => {
            button.addEventListener('click', toggleFavorite);
        });
        // No need to add event listeners for 'know-more' here, as they are direct links.
    }

    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedPriceRange = priceFilter.value;

        let filtered = products;

        if (selectedCategory) {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        if (selectedPriceRange) {
            filtered = filtered.filter(product => {
                const price = product.price.replace('₹', '');
                if (selectedPriceRange === 'free') {
                    return product.price === 'Free';
                } else if (product.price === 'Limited Edition' && selectedPriceRange === 'limited-edition') { // Handle 'Limited Edition' for filter
                    return true;
                } else if (selectedPriceRange.includes('-')) {
                    const [min, max] = selectedPriceRange.split('-').map(Number);
                    const numPrice = parseFloat(price);
                    return numPrice >= min && numPrice <= max;
                } else if (selectedPriceRange === '10001-999999') {
                    const numPrice = parseFloat(price);
                    return numPrice >= 10001;
                }
                return true;
            });
        }
        renderProducts(filtered);
    }

    // --- Favorite/Unfavorite Logic ---
    function toggleFavorite(event) {
        const productId = event.currentTarget.dataset.productId;
        // Find the product in the main 'products' array, not just the currently rendered ones
        const product = products.find(p => p.id === productId); 

        if (product) {
            const index = favoriteProducts.findIndex(fav => fav.id === productId);
            if (index > -1) {
                // Already favorited, remove it
                favoriteProducts.splice(index, 1);
                event.currentTarget.textContent = '🤍';
                event.currentTarget.classList.remove('favorited');
            } else {
                // Not favorited, add it
                favoriteProducts.push(product);
                event.currentTarget.textContent = '❤️';
                event.currentTarget.classList.add('favorited');
            }
            localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
            renderFavorites(); // Update favorites list in profile
            // Also re-render all products to update heart icons if the user is on that page
            if (!productSection.classList.contains('hidden')) {
                applyFilters(); 
            }
        }
    }

    function renderFavorites() {
        favoriteList.innerHTML = ''; // Clear current favorites
        if (favoriteProducts.length === 0) {
            favoriteList.innerHTML = `<div class="empty-favorites-message">No favorite tools added yet. Click the heart icon on a tool to add it here!</div>`;
            return;
        }
        favoriteProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card', 'glass-container'); // Reuse product card styling
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="category">${product.category.replace(/-/g, ' ')}</p>
                <p class="price">${product.price === 'Limited Edition' ? product.price : (product.price === 'Free' ? 'Free' : 'Price: ' + product.price)}</p>
                <p class="rating">Rating: ${product.rating} ⭐</p>
                <p class="description">${product.description || 'No description available.'}</p>
                <a href="${product.learnMoreLink}" target="_blank" rel="noopener noreferrer" class="know-more">Know More</a>
                <button class="favorite-button favorited" data-product-id="${product.id}">❤️</button>
            `;
            favoriteList.appendChild(productCard);
        });

        // Add event listeners to new favorite buttons in the profile section
        document.querySelectorAll('#favorite-list .favorite-button').forEach(button => {
            button.addEventListener('click', toggleFavorite);
        });
    }

    // --- NEW: Render Learning Resources ---
    function renderLearningResources() {
        learningResourcesList.innerHTML = '';
        if (learningResources.length === 0) {
            learningResourcesList.innerHTML = `<div class="empty-favorites-message">No learning resources available yet.</div>`;
            return;
        }
        learningResources.forEach(resource => {
            const resourceCard = document.createElement('div');
            // Reuse product-card and glass-container styling for consistency
            resourceCard.classList.add('product-card', 'glass-container');
            resourceCard.innerHTML = `
                <img src="${resource.image}" alt="${resource.name}">
                <h3>${resource.name}</h3>
                <p class="category">Category: ${resource.category}</p>
                <p class="description">${resource.description}</p>
                <a href="${resource.link}" target="_blank" rel="noopener noreferrer" class="know-more">Learn More</a>
            `;
            learningResourcesList.appendChild(resourceCard);
        });
    }

    // --- NEW: Fetch & Render Tech News ---
    async function fetchTechNews() {
        newsArticlesList.innerHTML = ''; // Clear previous news
        newsLoadingMessage.classList.remove('hidden'); // Show loading message

        // Check cache first
        if (newsCache && (Date.now() - newsCache.timestamp < NEWS_CACHE_DURATION)) {
            renderNewsArticles(newsCache.articles);
            newsLoadingMessage.classList.add('hidden'); // Hide loading message
            return;
        }

        try {
            const response = await fetch(NEWS_API_URL);
            if (!response.ok) {
                // Attempt to read error message from response
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
                throw new Error(errorMessage);
            }
            const data = await response.json();
            
            if (data.status === 'ok' && data.articles.length > 0) {
                newsCache = {
                    articles: data.articles,
                    timestamp: Date.now()
                };
                renderNewsArticles(data.articles);
            } else {
                newsArticlesList.innerHTML = `<div class="empty-favorites-message">No tech news found. Please try again later.</div>`;
            }
        } catch (error) {
            console.error('Failed to fetch tech news:', error);
            newsArticlesList.innerHTML = `<div class="empty-favorites-message">Error fetching news: ${error.message}. Please check your API key and try again.</div>`;
        } finally {
            newsLoadingMessage.classList.add('hidden'); // Always hide loading message
        }
    }

    function renderNewsArticles(articles) {
        newsArticlesList.innerHTML = ''; // Clear any loading messages or old content
        if (articles.length === 0) {
            newsArticlesList.innerHTML = `<div class="empty-favorites-message">No tech news found.</div>`;
            return;
        }
        articles.forEach(article => {
            const newsCard = document.createElement('div');
            // Reuse product-card and glass-container styling for consistency
            newsCard.classList.add('product-card', 'glass-container');
            newsCard.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/120x120?text=No+Image'}" alt="${article.title}">
                <h3>${article.title}</h3>
                <p class="category">Source: ${article.source.name}</p>
                <p class="description">${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="know-more">Read More</a>
            `;
            newsArticlesList.appendChild(newsCard);
        });
    }

    // --- NEW: Control Hub Button & Pop-out Menu Logic ---
    function toggleActionMenu() {
        actionButtonsContainer.classList.toggle('menu-open');
    }

    // Close menu when clicking outside the button container
    document.addEventListener('click', (event) => {
        const isClickInsideContainer = actionButtonsContainer.contains(event.target);
        const isControlHubButton = controlHubButton.contains(event.target);

        // If the menu is open AND the click is NOT inside the container AND NOT the control hub button itself
        if (actionButtonsContainer.classList.contains('menu-open') && !isClickInsideContainer && !isControlHubButton) {
            actionButtonsContainer.classList.remove('menu-open');
        }
    });


    // --- Event Listeners ---
    getStartedButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(formSection);
    });

    userForm.addEventListener('submit', saveUserProfile);

    // Main action button click handlers
    controlHubButton.addEventListener('click', toggleActionMenu);

    themeToggle.addEventListener('click', toggleTheme);
    profileButton.addEventListener('click', () => {
        showSection(profileSection);
        loadUserProfile(); // Ensure latest profile is loaded
    });
    learnToolsButton.addEventListener('click', () => {
        showSection(learningResourcesSection);
        renderLearningResources(); // Render resources when section is shown
    });
    techNewsButton.addEventListener('click', () => {
        showSection(techNewsSection);
        fetchTechNews(); // Fetch news when section is shown
    });

    viewToolsButton.addEventListener('click', () => {
        showSection(productSection);
        applyFilters(); // Render all products by default
    });

    categoryFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);

    // Initial setup on page load
    applyTheme(currentTheme); // Apply theme based on localStorage
    initializeMatrixRain(); // Start matrix background
    loadUserProfile(); // Load user or show welcome/form
    renderProducts(); // Render initial product list
});