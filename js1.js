/* ===== СНЕГ (GSAP) ===== */
function initSnow() {
    const snowContainer = document.getElementById("snow-container");
    
    const randomInRange = (max, min) => Math.floor(Math.random() * (max - min)) + min;
    
    const createSnowflake = () => {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";
        
        const pos = randomInRange(100.5, 0);
        snowflake.style.left = `${pos}%`;
        
        const size = randomInRange(12, 4);
        snowflake.style.height = snowflake.style.width = `${size}px`;
        
        const opacity = randomInRange(10, 8) / 10;
        gsap.set(snowflake, { opacity });
        
        const delay = randomInRange(10, 0);
        const speed = randomInRange(17, 12);
        const blurVal = randomInRange(4, 1);
        
        const path = () => [
            { x: randomInRange(150, -150), y: randomInRange(150, -150) },
            { x: randomInRange(150, -150), y: randomInRange(150, -150) },
            { x: randomInRange(150, -150), y: randomInRange(150, -150) },
            { x: randomInRange(150, -150), y: randomInRange(150, -150) }
        ];
        
        gsap.to(snowflake, {
            y: 1520,
            delay,
            duration: speed,
            filter: `blur(${blurVal}px)`,
            repeat: -1,
            bezier: {
                type: "soft",
                values: path(),
                autoRotate: true
            },
            ease: "power1.inOut"
        });
        
        return snowflake;
    };
    
    for (let i = 0; i < 200; i++) {
        const snowflake = createSnowflake();
        snowContainer.appendChild(snowflake);
    }
}

/* ===== ЗАПРЕТ МАСШТАБИРОВАНИЯ ===== */
function disableZoom() {
    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey) {
            e.preventDefault();
            return false;
        }
    }, { passive: false });
    
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
            return false;
        }
    }, { passive: false });
    
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=')) || 
            (e.ctrlKey && e.key === '0')) {
            e.preventDefault();
            return false;
        }
    });
}

/* ===== ОСНОВНОЙ ТАЙМЕР ===== */
function initTimer() {
    const targetDate = new Date('December 31, 2025 21:00:00').getTime();
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const timerContainer = document.querySelector('.timer-container');
    const newYearMessage = document.getElementById('newYearMessage');
    const videoContainer = document.getElementById('videoContainer');
    const imageContainer = document.querySelector('.image-container');
    
    let timerInterval;
    
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            
            timerContainer.style.display = 'none';
            
            newYearMessage.style.display = 'block';
            
            videoContainer.classList.add('show');
            videoContainer.style.display = 'block';
            
            if (imageContainer) {
                imageContainer.style.marginTop = '40px';
                imageContainer.style.marginBottom = '60px';
            }
            
            playVideoIfLoaded();
            
            increaseSnowflakes();
            
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
    
    return timerInterval;
}

/* ===== ДОПОЛНИТЕЛЬНЫЕ СНЕЖИНКИ ===== */
function increaseSnowflakes() {
    const snowContainer = document.getElementById("snow-container");
    
    const randomInRange = (max, min) => Math.floor(Math.random() * (max - min)) + min;
    
    for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";
        
        const pos = randomInRange(100.5, 0);
        snowflake.style.left = `${pos}%`;
        
        const size = randomInRange(16, 6);
        snowflake.style.height = snowflake.style.width = `${size}px`;
        
        const opacity = randomInRange(10, 7) / 10;
        gsap.set(snowflake, { opacity });
        
        const delay = randomInRange(15, 0);
        const speed = randomInRange(25, 15);
        const blurVal = randomInRange(5, 2);
        
        const path = () => [
            { x: randomInRange(200, -200), y: randomInRange(200, -200) },
            { x: randomInRange(200, -200), y: randomInRange(200, -200) },
            { x: randomInRange(200, -200), y: randomInRange(200, -200) },
            { x: randomInRange(200, -200), y: randomInRange(200, -200) }
        ];
        
        gsap.to(snowflake, {
            y: 1520,
            delay,
            duration: speed,
            filter: `blur(${blurVal}px)`,
            repeat: -1,
            bezier: {
                type: "soft",
                values: path(),
                autoRotate: true
            },
            ease: "power1.inOut"
        });
        
        snowContainer.appendChild(snowflake);
    }
}

/* ===== ВИДЕО ===== */
function initVideo() {
    const videoName = "video1.mp4";
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    const videoElement = document.createElement('video');
    videoElement.controls = true;
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.muted = false;
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.style.objectFit = 'cover';
    videoElement.style.borderRadius = '15px';
    
    const sourceElement = document.createElement('source');
    sourceElement.src = videoName;
    sourceElement.type = 'video/mp4';
    
    videoElement.appendChild(sourceElement);
    
    videoPlaceholder.innerHTML = '';
    videoPlaceholder.appendChild(videoElement);
    
    window.playVideoIfLoaded = function() {
        if (videoElement.paused) {
            videoElement.play().catch(e => {
                videoElement.controls = true;
            });
        }
    };
}

/* ===== ИЗОБРАЖЕНИЕ ===== */
function initImage() {
    const imgElement = document.getElementById('bottomImage');
    
    imgElement.onerror = function() {
        this.src = "image2.png";
    };
    
    imgElement.src = "image1.png";
}

/* ===== ИНИЦИАЛИЗАЦИЯ ===== */
document.addEventListener('DOMContentLoaded', function() {
    disableZoom();
    initSnow();
    initVideo();
    initImage();
    initTimer();
});

window.addEventListener('error', function(e) {
    console.error("Ошибка:", e.message);
});