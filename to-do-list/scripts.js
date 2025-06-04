// HTML Elements
const contactForm = document.getElementById('contactForm');
const formError = document.getElementById('formError');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const loadingSpinner = submitBtn.querySelector('.loading-spinner');

const unlockMessage = document.getElementById('unlockMessage');
const todoInterface = document.getElementById('todoInterface');
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');

// To-Do stats elements
const totalTasksSpan = document.getElementById('totalTasks');
const pendingTasksSpan = document.getElementById('pendingTasks');
const completedTasksSpan = document.getElementById('completedTasks');
const pendingCountSpan = document.getElementById('pendingCount');
const completedCountSpan = document.getElementById('completedCount');
const noPendingMsg = document.getElementById('noPendingMsg');
const noCompletedMsg = document.getElementById('noCompletedMsg');

// Planner elements
const plannerUnlockMessage = document.getElementById('plannerUnlockMessage');
const plannerInterface = document.getElementById('plannerInterface');
const dailyTargetInput = document.getElementById('dailyTargetInput');
const setTargetBtn = document.getElementById('setTargetBtn');
const dailyCompletedCountSpan = document.getElementById('dailyCompletedCount');
const dailyTargetCountSpan = document.getElementById('dailyTargetCount');
const dailyProgressPercentageSpan = document.getElementById('dailyProgressPercentage');
const plannerMessage = document.getElementById('plannerMessage');

// Modal elements
const customModal = document.getElementById('customModal');
const modalMessage = document.getElementById('modalMessage');
const modalCloseButton = document.getElementById('modalCloseButton');

// Local storage keys
const LOCAL_STORAGE_TASKS_KEY = 'enhanced_todo_tasks';
const LOCAL_STORAGE_PLANNER_KEY = 'enhanced_todo_planner';

// In-memory data stores
let tasks = [];
let currentDailyTargetData = { targetCount: 0, completedCount: 0 };
let isTodoListUnlocked = false;

/**
 * Displays a custom modal with the given message.
 * @param {string} message - The message to display in the modal.
 * @param {function} [onCloseCallback] - Optional callback function to execute when the modal closes.
 */
function showModal(message, onCloseCallback = null) {
    modalMessage.textContent = message;
    customModal.style.display = 'flex';
    // Remove previous event listener to prevent multiple calls
    modalCloseButton.onclick = null;
    modalCloseButton.onclick = () => {
        customModal.style.display = 'none';
        if (onCloseCallback) {
            onCloseCallback();
        }
    };
}

/**
 * Initializes the application by loading data from local storage.
 */
function initializeAppData() {
    // Load tasks from local storage
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_TASKS_KEY);
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            if (typeof task.createdAt === 'string') {
                task.createdAt = new Date(task.createdAt);
            }
        });
    }
    renderTasks();

    // Load planner data from local storage
    const storedPlannerData = localStorage.getItem(LOCAL_STORAGE_PLANNER_KEY);
    if (storedPlannerData) {
        const parsedPlannerData = JSON.parse(storedPlannerData);
        const todayDate = getTodayDateString();
        if (parsedPlannerData[todayDate]) {
            currentDailyTargetData = parsedPlannerData[todayDate];
        } else {
            currentDailyTargetData = { targetCount: 0, completedCount: 0 };
        }
    }
    updatePlannerDisplay();
}

/**
 * Saves tasks to local storage.
 */
function saveTasks() {
    localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasks));
}

/**
 * Saves planner data to local storage.
 */
function savePlannerData() {
    const allPlannerData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PLANNER_KEY) || '{}');
    const todayDate = getTodayDateString();
    allPlannerData[todayDate] = currentDailyTargetData;
    localStorage.setItem(LOCAL_STORAGE_PLANNER_KEY, JSON.stringify(allPlannerData));
}

/**
 * Generates a motivational text using the Gemini API.
 * @param {string} name - The name to personalize the message.
 * @returns {Promise<string>} A promise that resolves with the motivational text.
 */
async function generateMotivationalText(name) {
    try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: `Generate a short, positive, and encouraging motivational message for ${name} to help them stay focused and achieve their goals. Keep it concise, under 20 words.` }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; // Canvas will automatically provide this if empty
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API error: ${response.status} - ${errorData.error.message || response.statusText}`);
        }

        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            return result.candidates[0].content.parts[0].text;
        } else {
            throw new Error("Invalid API response structure.");
        }
    } catch (error) {
        console.error("Error generating motivational text:", error);
        return "Keep going! Your efforts will pay off!"; // Fallback message
    }
}

/**
 * Handles the contact form submission.
 */
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideMessage(formError);
    hideMessage(formSuccess);

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Basic validation
    if (!nameInput.value.trim() || !emailInput.value.trim()) {
        showMessage(formError, 'Please fill in all required fields.');
        return;
    }

    // Simple email format validation
    if (!isValidEmail(emailInput.value)) {
        showMessage(formError, 'Please enter a valid email address.');
        return;
    }

    setLoadingState(true);

    try {
        // Simulate form submission success
        await new Promise(resolve => setTimeout(resolve, 1000));

        const userName = nameInput.value.trim();
        const motivationalText = await generateMotivationalText(userName);
        showMessage(formSuccess, `Hey ${userName}, welcome! ${motivationalText}`);
        
        unlockTodoList();
        unlockPlanner();
        contactForm.reset();
        messageInput.value = 'What are you looking to complete today?';

    } catch (error) {
        console.error("Error submitting form:", error);
        showMessage(formError, `Failed to submit form: ${error.message}`);
    } finally {
        setLoadingState(false);
    }
});

/**
 * Handles adding a new To-Do item.
 */
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === "") {
        showModal("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(task);
    todoInput.value = "";
    saveTasks();
    renderTasks();
    
    // Add celebration effect
    todoInput.classList.add('celebrating');
    setTimeout(() => todoInput.classList.remove('celebrating'), 600);
}

/**
 * Toggles the completion status of a To-Do item.
 * @param {number} id - The ID of the task.
 */
function toggleTask(id) {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex > -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        renderTasks();
        if (tasks[taskIndex].completed) {
            showCelebration();
        }
    }
}

/**
 * Deletes a To-Do item.
 * @param {number} id - The ID of the task to delete.
 */
function deleteTask(id) {
    showModal('Are you sure you want to delete this task?', () => {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    });
}

/**
 * Renders the To-Do items into the pending and completed lists.
 */
function renderTasks() {
    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    // Sort tasks by creation date (ascending)
    const sortedTasks = [...tasks].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA.getTime() - dateB.getTime();
    });

    const pendingTasks = sortedTasks.filter(t => !t.completed);
    const completedTasks = sortedTasks.filter(t => t.completed);

    pendingTasks.forEach(task => {
        pendingList.appendChild(createTaskElement(task));
    });

    completedTasks.forEach(task => {
        completedList.appendChild(createTaskElement(task));
    });

    updateStats(tasks);
    updateDailyCompletedCount();
    updatePlannerDisplay();

    // Show/hide empty messages
    noPendingMsg.style.display = pendingTasks.length === 0 ? 'block' : 'none';
    noCompletedMsg.style.display = completedTasks.length === 0 ? 'block' : 'none';
}

/**
 * Creates an HTML list item element for a given To-Do task.
 * @param {Object} task - The To-Do task object.
 * @returns {HTMLLIElement} The created list item element.
 */
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text">${escapeHtml(task.text)}</span>
        <div class="task-actions">
            <button class="delete-btn" title="Delete task">×</button>
        </div>
    `;

    // Add event listeners
    const checkbox = li.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const deleteButton = li.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    return li;
}

/**
 * Updates the statistics displayed in the To-Do list section.
 * @param {Array<Object>} todos - The current array of To-Do objects.
 */
function updateStats(todos) {
    const total = todos.length;
    const pending = todos.filter(t => !t.completed).length;
    const completed = todos.filter(t => t.completed).length;

    totalTasksSpan.textContent = total;
    pendingTasksSpan.textContent = pending;
    completedTasksSpan.textContent = completed;
    pendingCountSpan.textContent = pending;
    completedCountSpan.textContent = completed;
}

/**
 * Unlocks the To-Do list interface.
 */
function unlockTodoList() {
    if (isTodoListUnlocked) return;
    
    isTodoListUnlocked = true;
    unlockMessage.style.display = 'none';
    todoInterface.style.display = 'block';
    todoInput.focus();
    
    todoInput.disabled = false;
    addBtn.disabled = false;
}

/**
 * Unlocks the Planner interface.
 */
function unlockPlanner() {
    plannerUnlockMessage.style.display = 'none';
    plannerInterface.style.display = 'block';
    dailyTargetInput.disabled = false;
    setTargetBtn.disabled = false;
}

/**
 * Gets today's date in YYYY-MM-DD format.
 * @returns {string} Today's date string.
 */
function getTodayDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Updates the planner display with current target and progress.
 */
function updatePlannerDisplay() {
    const target = currentDailyTargetData.targetCount || 0;
    const completed = currentDailyTargetData.completedCount || 0;
    const percentage = target > 0 ? Math.round((completed / target) * 100) : 0;

    dailyTargetCountSpan.textContent = target;
    dailyCompletedCountSpan.textContent = completed;
    dailyProgressPercentageSpan.textContent = `${percentage}%`;

    if (completed >= target && target > 0) {
        showMessage(plannerMessage, "Daily target achieved! Great job! 🎉", 'success');
    } else if (target > 0) {
        hideMessage(plannerMessage);
    } else {
        showMessage(plannerMessage, "Set a daily task target to get started! 🎯", 'info');
    }
}

/**
 * Updates the completed count for today's target.
 */
function updateDailyCompletedCount() {
    const todayDate = getTodayDateString();
    
    const completedToday = tasks.filter(task => {
        if (!task.completed || !task.createdAt) return false;
        const taskDate = new Date(task.createdAt);
        return getTodayDateString(taskDate) === todayDate;
    }).length;

    currentDailyTargetData.completedCount = completedToday;
    savePlannerData();
    updatePlannerDisplay();
}

/**
 * Handles setting the daily task target.
 */
setTargetBtn.addEventListener('click', () => {
    const targetValue = parseInt(dailyTargetInput.value, 10);

    if (isNaN(targetValue) || targetValue < 0) {
        showModal("Please enter a valid positive number for your daily target.");
        return;
    }

    currentDailyTargetData.targetCount = targetValue;
    savePlannerData();
    showMessage(plannerMessage, `Daily target set to ${targetValue}!`, 'success');
    updatePlannerDisplay();
});

// Event listeners for To-Do input and button
addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

/**
 * Validates an email address format.
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Displays a message element with given text.
 * @param {HTMLElement} element - The message element.
 * @param {string} text - The text content for the message.
 * @param {string} [type] - Optional type ('success', 'error', 'info') for styling.
 */
function showMessage(element, text, type = '') {
    element.textContent = text;
    element.classList.remove('error-msg', 'success-msg');
    if (type === 'error') {
        element.classList.add('error-msg');
    } else if (type === 'success') {
        element.classList.add('success-msg');
    }
    element.classList.add('show');
}

/**
 * Hides a message element.
 * @param {HTMLElement} element - The message element to hide.
 */
function hideMessage(element) {
    element.classList.remove('show');
    setTimeout(() => {
        element.textContent = '';
        element.classList.remove('error-msg', 'success-msg');
    }, 300);
}

/**
 * Sets the loading state for the submit button.
 * @param {boolean} loading - True to show loading state, false to hide.
 */
function setLoadingState(loading) {
    if (loading) {
        submitBtn.disabled = true;
        loadingSpinner.style.display = 'inline-block';
        btnText.textContent = 'Sending...';
    } else {
        submitBtn.disabled = false;
        loadingSpinner.style.display = 'none';
        btnText.textContent = 'Send Message';
    }
}

/**
 * Adds a celebration animation to the completed tasks section.
 */
function showCelebration() {
    const completedSection = document.querySelector('.list-section:last-child');
    completedSection.classList.add('celebrating');
    setTimeout(() => {
        completedSection.classList.remove('celebrating');
    }, 600);
}

/**
 * Escapes HTML characters in a string to prevent XSS.
 * @param {string} text - The string to escape.
 * @returns {string} The escaped string.
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize the application when the window loads
window.onload = initializeAppData;