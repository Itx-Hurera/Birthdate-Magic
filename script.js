/**
 * Birthdate Magic - The Mind Reading Ritual
 * Mathematical Illusion Logic
 */

const state = {
    currentStep: 0,
    finalNumber: 0,
    userData: {
        name: '',
        email: ''
    },
    steps: [
        "Think about your birth day.",
        "Multiply it by 2.",
        "Add 5 to the result.",
        "Multiply the current result by 50.",
        "Add your birth month number (1-12).",
        "Finally, add 1765."
    ],
    loadingMessages: [
        "Scanning your aura...",
        "Decoding your energy...",
        "Consulting the celestial alignment...",
        "Unlocking the secret code...",
        "Materializing the truth..."
    ],
    traits: [
        "You possess a rare depth of character that many find mysterious yet captivating.",
        "A natural born leader with an intuitive understanding of those around you.",
        "Your creative spirit knows no bounds, often seeing beauty where others see chaos.",
        "You have a resilient soul that turns challenges into stepping stones for growth.",
        "A seeker of truth, you value authenticity above all else.",
        "Your empathy is your greatest strength, allowing you to connect with the world on a deeper level.",
        "You carry the wisdom of an old soul combined with the curiosity of a child.",
        "A visionary who isn't afraid to walk the path less traveled."
    ],
    advice: [
        "Trust the timing of your life.",
        "Your intuition is your compass; follow it.",
        "Great things take time; be patient with your journey.",
        "The universe conspired to bring you here today.",
        "Embrace your uniqueness; it is your superpower."
    ]
};

// DOM Elements
const screens = {
    landing: document.getElementById('landing'),
    steps: document.getElementById('steps'),
    input: document.getElementById('input-section'),
    userInfo: document.getElementById('user-info'),
    loading: document.getElementById('loading'),
    reveal: document.getElementById('reveal')
};

const elements = {
    startBtn: document.getElementById('start-btn'),
    nextStepBtn: document.getElementById('next-step-btn'),
    submitBtn: document.getElementById('submit-btn'),
    infoSubmitBtn: document.getElementById('info-submit-btn'),
    shareBtn: document.getElementById('share-btn'),
    restartBtn: document.getElementById('restart-btn'),
    stepTitle: document.querySelector('.step-title'),
    stepInstruction: document.getElementById('step-instruction'),
    dots: document.querySelectorAll('.dot'),
    finalResultInput: document.getElementById('final-result'),
    userNameInput: document.getElementById('user-name'),
    userEmailInput: document.getElementById('user-email'),
    loadingMsg: document.getElementById('loading-msg'),
    progressBar: document.querySelector('.progress-bar-fill'),
    revealedDate: document.getElementById('revealed-date'),
    personalityCard: document.getElementById('personality-section'),
    personalityTraits: document.getElementById('personality-traits'),
    luckyNumber: document.getElementById('lucky-number'),
    adviceText: document.getElementById('advice'),
    soundToggle: document.getElementById('sound-control'),
    soundIcon: document.getElementById('sound-icon')
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    setupEventListeners();
    checkPreviousResult();
});

function setupEventListeners() {
    elements.startBtn.addEventListener('click', () => switchScreen('steps'));

    elements.nextStepBtn.addEventListener('click', handleNextStep);

    elements.submitBtn.addEventListener('click', handleSumit);

    elements.infoSubmitBtn.addEventListener('click', handleInfoSubmit);

    elements.restartBtn.addEventListener('click', () => {
        state.currentStep = 0;
        elements.finalResultInput.value = '';
        switchScreen('landing');
    });

    elements.shareBtn.addEventListener('click', handleShare);

    elements.soundToggle.addEventListener('click', toggleSound);

    // Enter key support for input
    elements.finalResultInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSumit();
    });
}

function switchScreen(screenKey) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenKey].classList.add('active');

    if (screenKey === 'steps') {
        updateStep();
    }
}

function handleNextStep() {
    if (state.currentStep < state.steps.length - 1) {
        state.currentStep++;
        updateStep();
    } else {
        switchScreen('input');
    }
}

function updateStep() {
    elements.stepTitle.innerText = `Step ${state.currentStep + 1}`;

    // Add a small fade animation for text change
    elements.stepInstruction.style.opacity = 0;
    setTimeout(() => {
        elements.stepInstruction.innerText = state.steps[state.currentStep];
        elements.stepInstruction.style.opacity = 1;
    }, 300);

    elements.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === state.currentStep);
    });
}

async function handleSumit() {
    const resultValue = parseInt(elements.finalResultInput.value);

    if (isNaN(resultValue) || resultValue < 2016) {
        alert("The ritual requires a valid number from your calculations.");
        return;
    }

    state.finalNumber = resultValue;
    switchScreen('userInfo');
}

async function handleInfoSubmit() {
    const name = elements.userNameInput.value.trim();
    if (!name) {
        alert("The ritual requires your name to channel your energy.");
        return;
    }

    state.userData.name = name;
    state.userData.email = elements.userEmailInput.value.trim();

    // Save to localStorage
    localStorage.setItem('ritualSeekerName', name);

    switchScreen('loading');
    await runRitualAnimation();
    revealDate(state.finalNumber);
}

async function runRitualAnimation() {
    let progress = 0;
    const duration = 4000; // 4 seconds
    const interval = 50;
    const increment = (interval / duration) * 100;

    return new Promise((resolve) => {
        const timer = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 100;
                clearInterval(timer);
                resolve();
            }

            elements.progressBar.style.width = `${progress}%`;

            // Change message periodically
            const msgIndex = Math.floor((progress / 100) * state.loadingMessages.length);
            if (msgIndex < state.loadingMessages.length) {
                elements.loadingMsg.innerText = state.loadingMessages[msgIndex];
            }
        }, interval);
    });
}

function revealDate(result) {
    // Math Logic: (100D + M + 2015)
    const magicNum = result - 2015;
    const day = Math.floor(magicNum / 100);
    const month = magicNum % 100;

    // Validation
    if (day < 1 || day > 31 || month < 1 || month > 12) {
        elements.revealedDate.innerText = "The numbers are clouded...";
        elements.personalityTraits.innerText = "It seems the calculation was disrupted. Realign your thoughts and try again.";
    } else {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        elements.revealedDate.innerText = `${day.toString().padStart(2, '0')} / ${monthNames[month - 1]}`;

        // Generate Personality
        const traitSeed = (day + month) % state.traits.length;
        elements.personalityTraits.innerText = state.traits[traitSeed];
        elements.luckyNumber.innerText = (day * month) % 9 + 1;
        elements.adviceText.innerText = state.advice[(day + month) % state.advice.length];

        // Store in localStorage
        localStorage.setItem('lastBirthResult', JSON.stringify({ day, month, date: new Date().toLocaleDateString() }));

        // Submit to Netlify
        submitToNetlify(day, month);
    }

    switchScreen('reveal');

    // Trigger visual confetti effect
    createExplosion();
    document.body.classList.add('ritual-complete');
    setTimeout(() => document.body.classList.remove('ritual-complete'), 2000);

    // Animate personality card entry
    setTimeout(() => {
        elements.personalityCard.classList.remove('hidden');
        elements.personalityCard.classList.add('visible');
    }, 500);
}

function handleShare() {
    const text = "A mysterious force just read my mind and guessed my birthday! Try the Ritual yourself at: " + window.location.href;
    if (navigator.share) {
        navigator.share({
            title: 'Birthdate Magic',
            text: text,
            url: window.location.href,
        });
    } else {
        navigator.clipboard.writeText(text);
        alert("Ritual link copied to clipboard!");
    }
}

function toggleSound() {
    const isMuted = elements.soundIcon.innerText === '🔇';
    elements.soundIcon.innerText = isMuted ? '🔊' : '🔇';
}

function checkPreviousResult() {
    const saved = localStorage.getItem('lastBirthResult');
    const savedName = localStorage.getItem('ritualSeekerName');

    if (savedName) {
        elements.userNameInput.value = savedName;
        state.userData.name = savedName;
    }

    if (saved) {
        console.log("Welcome back, seeker. Your last ritual was successful.");
    }
}

async function submitToNetlify(day, month) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dobString = `${day} ${monthNames[month - 1]}`;

    const formData = new FormData();
    formData.append('form-name', 'magic-form');
    formData.append('name', state.userData.name);
    formData.append('email', state.userData.email || 'Not provided');
    formData.append('final-number', state.finalNumber);
    formData.append('predicted-dob', dobString);

    try {
        const response = await fetch('/', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log("Your energy has been recorded in the universe.");
            // Optional: update UI with success if needed
            if (state.userData.email) {
                elements.personalityTraits.innerText += "\n\n✨ Get your full personality report in your email.";
            }
        } else {
            console.error("The universe was unable to record your energy.");
        }
    } catch (error) {
        console.error("The ritual connection was interrupted.");
    }
}

// Simple Particle System
function initParticles() {
    const container = document.getElementById('particles-js');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }

    // Add CSS for particles dynamically
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.innerHTML = `
            @keyframes float {
                0% { transform: translateY(0) translateX(0); opacity: 0; }
                50% { opacity: 0.8; }
                100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
            }
            @keyframes explode {
                0% { transform: translate(0, 0); opacity: 1; }
                100% { transform: translate(var(--tx), var(--ty)); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function createParticle(container, isExplosion = false) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 3 + 1;
    const posX = isExplosion ? 50 : Math.random() * 100;
    const posY = isExplosion ? 50 : Math.random() * 100;

    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${posX}%`;
    p.style.top = `${posY}%`;
    p.style.opacity = Math.random();
    p.style.background = Math.random() > 0.5 ? 'var(--primary-glow)' : 'var(--secondary-glow)';
    p.style.boxShadow = `0 0 ${size * 2}px ${p.style.background}`;
    p.style.position = 'absolute';
    p.style.borderRadius = '50%';

    if (isExplosion) {
        const tx = (Math.random() - 0.5) * 400;
        const ty = (Math.random() - 0.5) * 400;
        p.style.setProperty('--tx', `${tx}px`);
        p.style.setProperty('--ty', `${ty}px`);
        p.style.animation = `explode 1.5s ease-out forwards`;
        setTimeout(() => p.remove(), 1500);
    } else {
        const delay = Math.random() * 20;
        const duration = Math.random() * 10 + 10;
        p.style.animation = `float ${duration}s linear infinite`;
        p.style.animationDelay = `-${delay}s`;
    }

    container.appendChild(p);
}

function createExplosion() {
    const container = document.getElementById('particles-js');
    for (let i = 0; i < 40; i++) {
        createParticle(container, true);
    }
}
