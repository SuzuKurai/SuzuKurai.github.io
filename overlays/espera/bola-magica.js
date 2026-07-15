function createStars() {
    const starsContainer = document.getElementById('stars');
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.animationDelay = Math.random() * 5 + 's';
        starsContainer.appendChild(star);
    }
}

function createRings() {
    const ringsContainer = document.getElementById('rings');
    const numRings = 4;

    const sizes = [218, 351, 484, 156];
    const durations = [24, 30, 36, 18];

    for (let i = 0; i < numRings; i++) {
        const ring = document.createElement('div');
        ring.className = 'ring';
        const fontSize = Math.max(12, sizes[i] / 8);

        if (sizes[i] > 300) {
            createRingNumbers(ringsContainer, sizes[i], fontSize);
        }

        ring.style.width = sizes[i] + 'px';
        ring.style.height = sizes[i] + 'px';
        ring.style.setProperty('--duration', durations[i] + 's');
        ring.style.setProperty('--direction', i % 2 === 1 ? 'reverse' : 'normal');
        ringsContainer.appendChild(ring);
    }
}

function createClockNumbers() {
    const clockFace = document.querySelector('.clock-face');
    const symbols = ['⊕', '☉', '☽', '☿', '♃', '♀', '♂', '♄', '♅', '♆', '♇', '⚷'];
    const radius = 120;

    symbols.forEach((symbol, index) => {
        const number = document.createElement('div');
        number.className = 'clock-number';
        number.textContent = symbol;
        const angle = index * 30;
        number.style.transform = `rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`;
        clockFace.appendChild(number);
    });
}

function createRingNumbers(ringContainer, ringSize, fontSize) {
    const symbols = ['⊕', '☉', '☽', '☿', '♃', '♀', '♂', '♄', '♅', '♆', '♇', '⚷'];
    const radius = ringSize / 2;

    symbols.forEach((symbol, index) => {
        const number = document.createElement('div');
        number.className = 'ring-number';
        number.textContent = symbol;

        const angle = (index * 30 - 90) * Math.PI / 180;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        number.style.left = `calc(50% + ${x}px)`;
        number.style.top = `calc(50% + ${y}px)`;
        number.style.fontSize = fontSize + 'px';

        ringContainer.appendChild(number);
    });
}

function createRunes() {
    const runes = ['☽', '✧', '★', '◈', '✦', '☾', '⚝', '✶'];
    const numRunes = runes.length;
    const placedRunes = [];
    const minDistance = 12;
    const minEdgeDistance = 8;
    
    for (let i = 0; i < numRunes; i++) {
        const rune = document.createElement('div');
        rune.className = 'rune';
        rune.textContent = runes[i];
        
        let x, y, valid;
        let attempts = 0;
        
        do {
            valid = true;
            const angle = Math.random() * Math.PI * 2;
            const distance = 18 + Math.random() * 32;
            x = 50 + Math.cos(angle) * distance;
            y = 50 + Math.sin(angle) * distance;
            
            x = Math.max(minEdgeDistance, Math.min(100 - minEdgeDistance, x));
            y = Math.max(minEdgeDistance, Math.min(100 - minEdgeDistance, y));
            
            for (const existing of placedRunes) {
                const dx = x - existing.x;
                const dy = y - existing.y;
                if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
                    valid = false;
                    break;
                }
            }
            attempts++;
        } while (!valid && attempts < 50);
        
        placedRunes.push({ x, y });
        
        rune.style.left = x + '%';
        rune.style.top = y + '%';
        rune.style.setProperty('--duration', (Math.random() * 4 + 7).toFixed(1) + 's');
        rune.style.animationDelay = (Math.random() * 5).toFixed(1) + 's';
        
        document.body.appendChild(rune);
    }
}

function createSparkles() {
    const raysContainer = document.getElementById('rays');
    const numSparkles = 20;

    for (let i = 0; i < numSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        const angle = (360 / numSparkles) * i + (Math.random() * 30 - 15);
        const distance = 150 + Math.random() * 250;
        const size = Math.random() * 3 + 2;
        const duration = (Math.random() * 4 + 3).toFixed(1);
        const delay = (Math.random() * 5).toFixed(1);
        
        sparkle.style.setProperty('--angle', angle + 'deg');
        sparkle.style.setProperty('--distance', distance + 'px');
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        sparkle.style.setProperty('--duration', duration + 's');
        sparkle.style.setProperty('--delay', delay + 's');
        
        raysContainer.appendChild(sparkle);
    }
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');

    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = (Math.random() * 90 + 5) + '%';
        particle.style.bottom = '0%';
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.setProperty('--duration', (Math.random() * 6 + 4) + 's');
        particle.style.animationDelay = '0s';

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 10000);
    }, 300);
}

const mouseGlow = document.getElementById('mouseGlow');

document.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
    mouseGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    mouseGlow.style.opacity = '1';
});

createStars();
createRings();
createClockNumbers();
createRunes();
createSparkles();
createParticles();

const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');

function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const hourDeg = (hours * 30) + (minutes * 0.5);
    const minuteDeg = (minutes * 6) + (seconds * 0.1);
    const secondDeg = (seconds * 6) + (milliseconds * 0.006);

    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;

    requestAnimationFrame(updateClock);
}

updateClock();