document.addEventListener('DOMContentLoaded', () => {
  const garden = document.getElementById('garden');
  const grassContainer = document.getElementById('grass-container');
  
  let flowerCount = 0;
  // Tweaked: Increased total limit
  const MAX_FLOWERS = 70; 
  
  // Neon Color Palettes
  const colorPalettes = [
    ['#ff0080', '#ff8c00'], 
    ['#00f2fe', '#4facfe'], 
    ['#f83600', '#f9d423'], 
    ['#b224ef', '#7579ff'], 
    ['#0ba360', '#3cba92'], 
    ['#ff0844', '#ffb199'], 
    ['#fdfbfb', '#ebedee']  
  ];

  const shapeConfigs = [
    { name: 'daisy', petals: 8, spread: 360 },
    { name: 'lotus', petals: 12, spread: 360 },
    { name: 'star', petals: 6, spread: 360 },
    { name: 'clover', petals: 4, spread: 360 },
    { name: 'tulip', petals: 3, spread: 60, offset: -30 }, 
    { name: 'sunflower', petals: 20, spread: 360 },
    { name: 'dahlia', petals: 16, spread: 360 }
  ];

  // 1. Plant the gentle grass background
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

  // 2. Flower generation logic
  function createFlower(x, yOffset) {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.style.left = x + 'px';
    flower.style.bottom = yOffset + 'px';
    flower.style.zIndex = 100 - Math.floor(yOffset); 

    // Tweaked: Randomize Scale (between 0.45x and 1.1x) to ensure smaller mix
    const randomScale = (Math.random() * 0.65) + 0.45;
    flower.style.transform = `translateX(-50%) scale(${randomScale})`;

    const config = shapeConfigs[Math.floor(Math.random() * shapeConfigs.length)];
    const colors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    
    flower.classList.add(`shape-${config.name}`);

    const swayWrapper = document.createElement('div');
    swayWrapper.classList.add('sway');
    
    // Tweaked: Assign a random resting tilt (-12 to +12 degrees) for organic bending
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

  // 3. Automated planting interval
  function autoPlant() {
    if (flowerCount >= MAX_FLOWERS) return;

    // Tweaked: Generate 2 to 4 flowers per interval instead of just 1
    const spawnCount = Math.floor(Math.random() * 3) + 2; 

    for (let i = 0; i < spawnCount; i++) {
        if (flowerCount >= MAX_FLOWERS) break; // Final check so it doesn't overshoot 200

        const randomX = Math.random() * (window.innerWidth - 80) + 40;
        const groundYOffset = Math.random() * 30; 
        
        createFlower(randomX, groundYOffset);
        flowerCount++;
    }

    if (flowerCount < MAX_FLOWERS) {
      setTimeout(autoPlant, 1000);
    }
  }

  // Initialize
  plantGrass();
  setTimeout(autoPlant, 500);
});
