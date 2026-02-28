document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------------------------------
    // Star Field Generation
    // -----------------------------------------------------------------
    const galaxy = document.querySelector('.galaxy-bg');
    const numberOfStars = screen.width < 768 ? 80 : 150; // Performance tuning
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Randomize size, position and animation
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDuration = `${Math.random() * 4 + 2}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        galaxy.appendChild(star);
    }

    // -----------------------------------------------------------------
    // Dynamic Countdown Setup
    // -----------------------------------------------------------------
    
    // Target Date: March 1st, 2026, 00:00:00 Local Time
    const targetDate = new Date();
    targetDate.setFullYear(2026, 2, 1); // Month is 0-indexed, so 2 = March
    targetDate.setHours(0, 0, 0, 0); // Midnight
    
    const targetTime = targetDate.getTime();
    
    // State management
    const countdownState = document.getElementById('countdownState');
    const birthdayState = document.getElementById('birthdayState');
    
    let countdownInterval;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetTime - now;

        // If time is up, switch UI
        if (distance <= 0) {
            clearInterval(countdownInterval);
            triggerBirthdaySequence();
            return; 
        }

        // Calculations
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }

    // Initialize
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    // -----------------------------------------------------------------
    // Interaction & Animation Triggers
    // -----------------------------------------------------------------

    function triggerBirthdaySequence() {
        // Switch Views
        if(countdownState && birthdayState) {
            countdownState.classList.add('hidden');
            birthdayState.classList.remove('hidden');
        }
        
        // Initial grand confetti
        fireGrandConfetti();
    }

    document.getElementById('surpriseBtn').addEventListener('click', () => {
        fireGrandConfetti();
    });

    function fireGrandConfetti() {
        if (typeof confetti === 'undefined') return;
        
        var duration = 4 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#3b82f6', '#facc15', '#ec4899', '#ffffff'] // Theme colors
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#3b82f6', '#facc15', '#ec4899', '#ffffff']
            }));
        }, 250);
    }
    
    // Check if it's ALREADY past midnight when the page simply loads
    if (new Date().getTime() >= targetTime) {
        triggerBirthdaySequence();
    }
});
