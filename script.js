document.addEventListener('DOMContentLoaded', () => {
  const garden = document.getElementById('garden');
  const grassContainer = document.getElementById('grass-container');
  
  let flowerCount = 0;
  const MAX_FLOWERS = 100; 
  
  const colorPalettes = [
    ['#ff0080', '#ff8c00'], ['#00f2fe', '#4facfe'], ['#f83600', '#f9d423'], 
    ['#b224ef', '#7579ff'], ['#0ba360', '#3cba92'], ['#ff0844', '#ffb199'], ['#fdfbfb', '#ebedee']  
  ];

  const shapeConfigs = [
    { name: 'daisy', petals: 8, spread: 360 }, { name: 'lotus', petals: 12, spread: 360 },
    { name: 'star', petals: 6, spread: 360 }, { name: 'clover', petals: 4, spread: 360 },
    { name: 'tulip', petals: 3, spread: 60, offset: -30 }, { name: 'sunflower', petals: 20, spread: 360 },
    { name: 'dahlia', petals: 16, spread: 360 }
  ];

  // 1. Fetch Weather & Handle Interactions
  async function fetchWeather() {
    try {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=50.83&longitude=4.39&current=temperature_2m,apparent_temperature,weather_code&timezone=Europe%2FBrussels');
      const data = await response.json();
      
      const temp = Math.round(data.current.temperature_2m);
      const feelsLike = Math.round(data.current.apparent_temperature);
      const code = data.current.weather_code;
      
      let condition = ""; let recommendation = ""; let icon = "";

      if (code === 0) { condition = "Sunny"; icon = "☀️"; recommendation = "Apply sunscreen and stay hydrated Madame!"; } 
      else if (code >= 1 && code <= 3) { condition = "Partly Cloudy"; icon = "⛅"; recommendation = "Great weather for Organ Trafficking!"; } 
      else if (code === 45 || code === 48) { condition = "Foggy"; icon = "🌫️"; recommendation = "I dunno what to do in Foggy weather Lol"; } 
      else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) { condition = "Raining"; icon = "🌧️"; recommendation = "Don't forget your umbrella Madame Ji!"; } 
      else if ((code >= 71 && code <= 77) || code === 85 || code === 86) { condition = "Snowing"; icon = "❄️"; recommendation = "Drink a cup of Belgian Hot Chocolate!"; } 
      else if (code >= 95 && code <= 99) { condition = "Thunderstorm"; icon = "⛈️"; recommendation = "Go outside and catch thunder, I dare you!"; } 
      else { condition = "Unknown"; icon = "🌡️"; recommendation = "Weather pinik e ase.. Chill mere ghumao!"; }

      const weatherBubble = document.getElementById('weather-bubble');
      const weatherBlob = document.getElementById('weather-blob');
      const weatherContent = document.getElementById('weather-content');
      
      weatherContent.innerHTML = `
        <div class="weather-header">${icon} ${temp}°C <br><span>in Etterbeek</span></div>
        <div class="weather-desc">Feels like ${feelsLike}°C • ${condition}</div>
        <div class="weather-rec">${recommendation}</div>
      `;
      
      weatherBubble.classList.add('pop-in');

      // NEW: Randomize Cloud Shape on Click
      weatherBlob.addEventListener('click', () => {
        // Generates a random percentage between 35% and 75% for organic curvature
        const r = () => Math.floor(Math.random() * 41) + 35;
        // Applies a complex border-radius to morph the shape
        weatherBlob.style.borderRadius = `${r()}% ${r()}% ${r()}% ${r()}% / ${r()}% ${r()}% ${r()}% ${r()}%`;
      });

    } catch (error) {
      console.error("Weather fetch failed:", error);
      document.getElementById('weather-bubble').style.display = 'none';
    }
  }

  // 2. Plant Grass
  function plantGrass() {
    const numGrass = 45; 
    for (let i = 0; i < numGrass; i++) {
      const blade = document.createElement('div');
      blade.classList.add('grass-blade');
      blade.style.left = (Math.random() * 100) + '%';
      blade.style.setProperty('--grass-height', (Math.random() * 50 + 40) + 'px');
      blade.style.setProperty('--sway-time', (Math.random() * 2 + 2) + 's');
      blade.style.animationDelay = (Math.random() * -5) + 's';
      if (Math.random() > 0.5) {
        blade.style.borderTopLeftRadius = '10%';
        blade.style.borderTopRightRadius = '100%';
      }
      grassContainer.appendChild(blade);
    }
  }

  // 3. Create Flowers
  function createFlower(x, yOffset) {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.style.left = x + 'px';
    flower.style.bottom = yOffset + 'px';
    flower.style.zIndex = 100 - Math.floor(yOffset); 

    const randomScale = (Math.random() * 0.65) + 0.45;
    flower.style.transform = `translateX(-50%) scale(${randomScale})`;

    const config = shapeConfigs[Math.floor(Math.random() * shapeConfigs.length)];
    const colors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    
    flower.classList.add(`shape-${config.name}`);

    const swayWrapper = document.createElement('div');
    swayWrapper.classList.add('sway');
    
    const baseTilt = (Math.random() * 24) - 12;
    swayWrapper.style.setProperty('--base-rot', `${baseTilt}deg`);
    swayWrapper.style.setProperty('--sway-duration', (Math.random() * 2 + 3) + 's');
    swayWrapper.style.animationDelay = (Math.random() * -2) + 's';

    const petalsWrapper = document.createElement('div');
    petalsWrapper.classList.add('petals-wrapper');

    const spread = config.spread || 360;
    const offset = config.offset || 0;

    for (let i = 0; i < config.petals; i++) {
      const petal = document.createElement('div');
      petal.classList.add('petal');
      petal.style.setProperty('--color1', colors[0]);
      petal.style.setProperty('--color2', colors[1]);
      
      let rotation = 0;
      if (config.petals > 1) {
         if (spread === 360) {
             rotation = (360 / config.petals) * i;
         } else {
             rotation = offset + (spread / (config.petals - 1)) * i;
         }
      }
      petal.style.transform = `rotate(${rotation}deg)`;
      petalsWrapper.appendChild(petal);
    }

    const center = document.createElement('div');
    center.classList.add('center');
    if(config.name !== 'tulip') petalsWrapper.appendChild(center);

    const stem = document.createElement('div');
    stem.classList.add('stem');
    const stemHeight = Math.floor(Math.random() * 250) + 125;
    stem.style.setProperty('--stem-height', stemHeight + 'px');

    swayWrapper.appendChild(petalsWrapper);
    swayWrapper.appendChild(stem);
    flower.appendChild(swayWrapper);
    garden.appendChild(flower);
  }

  // 4. Automated Planting
  function autoPlant() {
    if (flowerCount >= MAX_FLOWERS) return;

    const spawnCount = Math.floor(Math.random() * 3) + 2; 

    for (let i = 0; i < spawnCount; i++) {
        if (flowerCount >= MAX_FLOWERS) break;

        const randomX = Math.random() * (window.innerWidth - 80) + 40;
        const groundYOffset = Math.random() * 30; 
        
        createFlower(randomX, groundYOffset);
        flowerCount++;
    }

    if (flowerCount < MAX_FLOWERS) {
      setTimeout(autoPlant, 1000);
    }
  }

  fetchWeather();
  plantGrass();
  setTimeout(autoPlant, 500);
});
