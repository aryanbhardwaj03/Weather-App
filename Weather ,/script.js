const apiKey = "4ce70cd08f4d7333b0764216210ba3cb";
async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const errorMessage = document.getElementById("error-message");
    const weatherCard = document.getElementById("weather-result");
    const appBody = document.getElementById("app-body");
    const animationLayer = document.getElementById("weather-animation");

    errorMessage.classList.add("hidden");
    weatherCard.classList.add("hidden");
    animationLayer.innerHTML = ""; // clear old animations

    if (!city) {
        errorMessage.textContent = "Please enter a city name!";
        errorMessage.classList.remove("hidden");
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        const localTime = new Date((data.dt + data.timezone) * 1000);
        document.getElementById("local-time").textContent = `Local Time: ${localTime.toUTCString().slice(17, 22)}`;

        const weatherMain = data.weather[0].main.toLowerCase();
        appBody.className = "";
        
        if (weatherMain.includes("cloud")) {
            appBody.classList.add("cloudy");
            generateClouds(animationLayer, 6);
        } else if (weatherMain.includes("rain") || weatherMain.includes("drizzle")) {
            appBody.classList.add("rainy");
            generateRain(animationLayer, 50);
        } else if (weatherMain.includes("snow")) {
            appBody.classList.add("snowy");
            generateSnow(animationLayer, 30);
        } else if (weatherMain.includes("clear")) {
            if (data.weather[0].icon.includes("n")) {
                appBody.classList.add("clear-night");
            } else {
                appBody.classList.add("sunny");
            }
        } else {
            appBody.classList.add("sunny");
        }

        weatherCard.classList.remove("hidden");
        weatherCard.classList.add("fade-in");

    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }
}

function generateClouds(container, count) {
    for (let i = 0; i < count; i++) {
        const cloud = document.createElement("div");
        cloud.classList.add("cloud");
        const size = Math.random() * 60 + 40;
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size}px`;
        cloud.style.top = `${Math.random() * 50}vh`;
        cloud.style.left = `-${size}px`;
        cloud.style.animationDuration = `${20 + Math.random() * 20}s`;
        container.appendChild(cloud);
    }
}

function generateRain(container, count) {
    for (let i = 0; i < count; i++) {
        const drop = document.createElement("div");
        drop.classList.add("rain");
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${0.5 + Math.random()}s`;
        drop.style.opacity = Math.random();
        container.appendChild(drop);
    }
}

function generateSnow(container, count) {
    for (let i = 0; i < count; i++) {
        const flake = document.createElement("div");
        flake.classList.add("snow");
        flake.style.left = `${Math.random() * 100}vw`;
        flake.style.animationDuration = `${3 + Math.random() * 3}s`;
        flake.style.opacity = Math.random();
        container.appendChild(flake);
    }
}
// Track animated elements for parallax
let parallaxElements = [];

function generateClouds(container, count) {
    for (let i = 0; i < count; i++) {
        const cloud = document.createElement("div");
        cloud.classList.add("cloud");
        const size = Math.random() * 60 + 40;
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size}px`;
        cloud.style.top = `${Math.random() * 50}vh`;
        cloud.style.left = `-${size}px`;
        cloud.style.animationDuration = `${20 + Math.random() * 20}s`;
        container.appendChild(cloud);
        parallaxElements.push(cloud);
    }
}

function generateSnow(container, count) {
    for (let i = 0; i < count; i++) {
        const flake = document.createElement("div");
        flake.classList.add("snow");
        flake.style.left = `${Math.random() * 100}vw`;
        flake.style.animationDuration = `${3 + Math.random() * 3}s`;
        flake.style.opacity = Math.random();
        container.appendChild(flake);
        parallaxElements.push(flake);
    }
}

// Parallax effect for mouse movement
document.addEventListener("mousemove", (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (e.clientX - centerX) / centerX;
    const moveY = (e.clientY - centerY) / centerY;

    parallaxElements.forEach(el => {
        const depth = el.classList.contains("cloud") ? 15 : 8; // bigger depth for clouds
        el.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
    });
});

// Optional: Parallax for mobile gyroscope
window.addEventListener("deviceorientation", (e) => {
    if (!e.gamma && !e.beta) return; // no support
    const moveX = e.gamma / 45; // tilt left/right
    const moveY = e.beta / 90;  // tilt forward/back

    parallaxElements.forEach(el => {
        const depth = el.classList.contains("cloud") ? 15 : 8;
        el.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
    });
});

const appBody = document.getElementById("app-body");
const animationLayer = document.getElementById("weather-animation");

// On load: apply default background + particles
window.addEventListener("load", () => {
    appBody.classList.add("default-bg");
    generateParticles(animationLayer, 20);
});

// Generate floating particles
function generateParticles(container, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        const size = Math.random() * 6 + 4; // 4-10px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${3 + Math.random() * 4}s`;
        container.appendChild(particle);
    }
}

// Inside getWeather(), before setting backgrounds:
appBody.className = ""; // reset
animationLayer.innerHTML = ""; // clear particles/animations

