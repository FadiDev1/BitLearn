// Game Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 860;
canvas.height = 500;

// Game State
const gameState = {
    score: 0,
    concepts: 0,
    gameRunning: true,
    currentConcept: null,
    progressBar: 0,
    progressBarMax: 100,
    collectedConcepts: new Set(), // Track which concepts have been collected
    totalConcepts: 21 // Total number of concepts to collect
};

// Player
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 35,
    height: 50,
    speed: 5,
    velocityX: 0,
    velocityY: 0,
    gravity: 0.5,
    jumpPower: -12,
    onGround: false,
    jetpackFlame: 0
};

// Bitcoin Concepts Data
const bitcoinConcepts = [
    {
        id: "what-is-bitcoin",
        title: "What is Bitcoin?",
        text: "Bitcoin is a decentralized digital currency that enables peer-to-peer transactions without a central authority. It was created in 2009 by Satoshi Nakamoto."
    },
    {
        id: "blockchain",
        title: "Blockchain",
        text: "A blockchain is a distributed ledger that records all Bitcoin transactions. Each block contains a list of transactions and is linked to the previous block, creating an immutable chain."
    },
    {
        id: "decentralization",
        title: "Decentralization",
        text: "Bitcoin is decentralized, meaning no single entity controls it. It's maintained by a network of computers worldwide, making it resistant to censorship and control."
    },
    {
        id: "private-public-keys",
        title: "Private Keys & Public Keys",
        text: "A private key is a secret number that allows you to spend your Bitcoin. A public key is derived from your private key and is used to receive Bitcoin. You can share your public key, but never reveal your private key!"
    },
    {
        id: "seed-phrase",
        title: "Seed Phrase (Backup Words)",
        text: "A seed phrase is a series of 12-24 words that can recover your entire Bitcoin wallet. Write it down and store it safely - if you lose it, you lose access to your Bitcoin forever."
    },
    {
        id: "bitcoin-wallets",
        title: "Bitcoin Wallets (Hot vs Cold)",
        text: "Hot wallets are connected to the internet (convenient but less secure). Cold wallets are offline (hardware or paper wallets - more secure for long-term storage)."
    },
    {
        id: "not-your-keys",
        title: "\"Not Your Keys, Not Your Coins\"",
        text: "If you don't control your private keys, you don't truly own your Bitcoin. Exchanges and custodial services can freeze or lose your funds. Self-custody is true ownership."
    },
    {
        id: "transactions",
        title: "Transactions & Confirmations",
        text: "A Bitcoin transaction transfers value from one address to another. Confirmations occur when miners add your transaction to a block. More confirmations = more security."
    },
    {
        id: "transaction-fees",
        title: "Transaction Fees",
        text: "Transaction fees are paid to miners to prioritize your transaction. Higher fees = faster confirmation. Fees vary based on network congestion."
    },
    {
        id: "bitcoin-addresses",
        title: "Bitcoin Addresses",
        text: "A Bitcoin address is like a bank account number - you share it to receive Bitcoin. Addresses are derived from public keys and can be reused, though using new addresses improves privacy."
    },
    {
        id: "mining-proof-of-work",
        title: "Mining & Proof-of-Work",
        text: "Bitcoin mining is the process of validating transactions and adding them to the blockchain. Miners use powerful computers to solve complex mathematical problems (Proof-of-Work) and are rewarded with new bitcoins."
    },
    {
        id: "21-million",
        title: "21 Million Supply Cap",
        text: "Bitcoin has a hard cap of 21 million coins that will ever exist. This fixed supply creates scarcity and makes Bitcoin deflationary, unlike fiat currencies that can be printed infinitely."
    },
    {
        id: "halving",
        title: "Halving Events",
        text: "Bitcoin halving occurs approximately every 4 years, reducing the mining reward by half. This controls Bitcoin's supply and creates scarcity, similar to precious metals. The next halving will continue until all 21 million are mined."
    },
    {
        id: "satoshi-nakamoto",
        title: "Satoshi Nakamoto",
        text: "Satoshi Nakamoto is the pseudonymous creator of Bitcoin who published the Bitcoin whitepaper in 2008 and launched the network in 2009. Their true identity remains unknown."
    },
    {
        id: "double-spending",
        title: "Double-Spending Problem",
        text: "The double-spending problem was a major challenge in digital currency: how to prevent someone from spending the same coin twice. Bitcoin solved this through the blockchain and Proof-of-Work consensus mechanism."
    },
    {
        id: "nodes",
        title: "Nodes (Full Nodes)",
        text: "Full nodes are computers that maintain a complete copy of the Bitcoin blockchain and validate all transactions. They ensure the network's security and decentralization by enforcing Bitcoin's rules."
    },
    {
        id: "self-custody",
        title: "Self-Custody",
        text: "Self-custody means you control your private keys and Bitcoin directly, without relying on third parties like exchanges. This gives you true ownership but requires you to secure your keys properly."
    },
    {
        id: "phishing-scams",
        title: "Phishing & Scams",
        text: "Phishing attacks try to steal your private keys or seed phrase through fake websites or emails. Always verify URLs, never share your keys, and be skeptical of 'too good to be true' offers."
    },
    {
        id: "saifedean-ammous",
        title: "Saifedean Ammous",
        text: "Saifedean Ammous is a Bitcoin Legend and author of 'The Bitcoin Standard' - one of the most influential books explaining Bitcoin's economic and monetary properties. His work has educated millions about Bitcoin's value proposition.",
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81w5J1lyZ-L.jpg"
    },
    {
        id: "volatility",
        title: "Volatility",
        text: "Bitcoin's price can fluctuate significantly in short periods. This volatility is normal for a new asset class. Long-term holders (HODLers) focus on Bitcoin's long-term value rather than daily price movements."
    },
    {
        id: "hodl",
        title: "HODL & Long-Term Mindset",
        text: "HODL (originally a typo for 'hold') means holding Bitcoin long-term regardless of price volatility. The long-term mindset recognizes Bitcoin as a store of value and focuses on its potential over years, not days."
    }
];

// BTC Concepts (collectibles)
const btcConcepts = [];
let conceptSpawnTimer = 0;
const conceptSpawnRate = 180; // frames

// Load book image for Saifedean Ammous
const bookImage = new Image();
let bookImageLoaded = false;

// Try to load local image first, then fallback to external URL
bookImage.onload = function() {
    bookImageLoaded = true;
    console.log("Book image loaded successfully");
};

bookImage.onerror = function() {
    if (!bookImageLoaded) {
        // Try external URL as fallback
        console.log("Local book image not found, trying external URL...");
        bookImage.crossOrigin = "anonymous";
        bookImage.src = "https://images-na.ssl-images-amazon.com/images/I/81w5J1lyZ-L.jpg";
        bookImage.onerror = function() {
            console.log("Book image failed to load from all sources, will use default Bitcoin symbol");
        };
    }
};

// Try local file first (user should place image file in project directory)
// Common image file names to try
const possibleImageNames = [
    "bitcoin-standard-book.jpg",
    "bitcoin-standard-book.png",
    "book.jpg",
    "book.png",
    "the-bitcoin-standard.jpg",
    "the-bitcoin-standard.png"
];

// Try first local file name
bookImage.src = possibleImageNames[0];

// Platforms
const platforms = [
    { x: 100, y: 400, width: 150, height: 20 },
    { x: 300, y: 350, width: 120, height: 20 },
    { x: 500, y: 300, width: 150, height: 20 },
    { x: 700, y: 400, width: 120, height: 20 },
    { x: 200, y: 200, width: 100, height: 20 },
    { x: 600, y: 150, width: 150, height: 20 },
    { x: 50, y: 100, width: 120, height: 20 },
    { x: 750, y: 250, width: 100, height: 20 }
];

// Enemies (Fiat Cash)
const enemies = [];
let enemySpawnTimer = 0;
const enemySpawnRate = 240; // frames

// Particles
const particles = [];

// Input handling
const keys = {};
let mouseX = 0;
let mouseY = 0;
let mouseDown = false;

document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Mouse handling
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

canvas.addEventListener('mousedown', () => {
    mouseDown = true;
});

canvas.addEventListener('mouseup', () => {
    mouseDown = false;
});

// Create BTC Concept - spawn on platforms
function createBTCConcept() {
    // Get concepts that haven't been collected yet
    const availableConcepts = bitcoinConcepts.filter(c => !gameState.collectedConcepts.has(c.id));
    
    // If all concepts collected, don't spawn
    if (availableConcepts.length === 0) {
        return;
    }
    
    const concept = availableConcepts[Math.floor(Math.random() * availableConcepts.length)];
    
    // Try to spawn on a platform
    let spawnX, spawnY;
    if (platforms.length > 0 && Math.random() > 0.3) {
        const platform = platforms[Math.floor(Math.random() * platforms.length)];
        spawnX = platform.x + Math.random() * (platform.width - 50);
        spawnY = platform.y - 60; // Above the platform
    } else {
        spawnX = Math.random() * (canvas.width - 50) + 25;
        spawnY = Math.random() * (canvas.height - 50) + 25;
    }
    
    btcConcepts.push({
        x: spawnX,
        y: spawnY,
        width: 50,
        height: 50,
        concept: concept,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        pulse: 0,
        pulseSpeed: 0.08
    });
}

// Create Enemy (Fiat Cash)
function createEnemy() {
    // Spawn from edges
    const side = Math.floor(Math.random() * 4);
    let x, y;
    
    switch(side) {
        case 0: // top
            x = Math.random() * canvas.width;
            y = -30;
            break;
        case 1: // right
            x = canvas.width + 30;
            y = Math.random() * canvas.height;
            break;
        case 2: // bottom
            x = Math.random() * canvas.width;
            y = canvas.height + 30;
            break;
        case 3: // left
            x = -30;
            y = Math.random() * canvas.height;
            break;
    }
    
    enemies.push({
        x: x,
        y: y,
        width: 40,
        height: 40,
        speed: 1.5 + Math.random() * 1,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.1
    });
}

// Check collision
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Check platform collision
function checkPlatformCollision(player, platform) {
    return player.x < platform.x + platform.width &&
           player.x + player.width > platform.x &&
           player.y + player.height > platform.y &&
           player.y + player.height < platform.y + platform.height + 10 &&
           player.velocityY >= 0;
}

// Check distance
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Create particles
function createParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 30,
            maxLife: 30,
            color: color,
            size: Math.random() * 5 + 2
        });
    }
}

// Show concept info
function showConcept(concept) {
    document.getElementById('conceptTitle').textContent = concept.title;
    document.getElementById('conceptText').textContent = concept.text;
    
    // Handle image for Saifedean Ammous
    const conceptImage = document.getElementById('conceptImage');
    if (concept.imageUrl) {
        conceptImage.src = concept.imageUrl;
        conceptImage.style.display = 'block';
    } else {
        conceptImage.style.display = 'none';
    }
    
    document.getElementById('infoPanel').classList.add('show');
    gameState.gameRunning = false;
    gameState.currentConcept = null;
    gameState.progressBar = 0;
}

// Update progress tracker
function updateProgressTracker() {
    const progress = gameState.collectedConcepts.size;
    const total = gameState.totalConcepts;
    const percentage = Math.round((progress / total) * 100);
    
    document.getElementById('progressText').textContent = `${progress}/${total} Concepts Collected`;
    document.getElementById('progressBar').style.width = `${percentage}%`;
}

// End game function
function endGame() {
    gameState.gameRunning = false;
    document.getElementById('conceptTitle').textContent = "🎉 Congratulations! 🎉";
    document.getElementById('conceptText').textContent = `You've collected all ${gameState.totalConcepts} Bitcoin concepts! You're now a Bitcoin expert! HODL strong! 🚀`;
    document.getElementById('conceptImage').style.display = 'none';
    document.getElementById('infoPanel').classList.add('show');
    document.getElementById('closeInfo').textContent = 'Play Again';
    
    // Remove all remaining concepts and enemies
    btcConcepts.length = 0;
    enemies.length = 0;
}

// Function to close info panel (reusable for both click and keyboard)
function closeInfoPanel() {
    const infoPanel = document.getElementById('infoPanel');
    
    // Only close if panel is visible
    if (!infoPanel.classList.contains('show')) {
        return;
    }
    
    infoPanel.classList.remove('show');
    
    // If game ended, reset it
    if (gameState.collectedConcepts.size >= gameState.totalConcepts) {
        // Reset game
        gameState.collectedConcepts.clear();
        gameState.concepts = 0;
        gameState.score = 0;
        gameState.gameRunning = true;
        document.getElementById('concepts').textContent = '0';
        document.getElementById('score').textContent = '0';
        document.getElementById('closeInfo').textContent = 'Continue';
        updateProgressTracker();
        
        // Spawn initial concepts
        createBTCConcept();
        createBTCConcept();
    } else {
        gameState.gameRunning = true;
    }
}

// Close info panel on button click
document.getElementById('closeInfo').addEventListener('click', closeInfoPanel);

// Close info panel on Enter key press
document.addEventListener('keydown', (e) => {
    // Check if Enter key is pressed and info panel is visible
    if (e.key === 'Enter' && document.getElementById('infoPanel').classList.contains('show')) {
        e.preventDefault(); // Prevent any default behavior
        closeInfoPanel();
    }
});

// Draw player (person with jetpack)
function drawPlayer() {
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
    
    // Jetpack flame
    player.jetpackFlame += 0.3;
    const flameSize = 8 + Math.sin(player.jetpackFlame) * 3;
    
    // Draw jetpack flames
    ctx.fillStyle = '#ff6b00';
    ctx.beginPath();
    ctx.ellipse(0, player.height / 2 + 5, 6, flameSize, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.ellipse(0, player.height / 2 + 5, 4, flameSize * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw jetpack
    ctx.fillStyle = '#333';
    ctx.fillRect(-8, player.height / 2 - 10, 16, 15);
    ctx.fillStyle = '#555';
    ctx.fillRect(-6, player.height / 2 - 8, 12, 12);
    
    // Draw body
    ctx.fillStyle = '#4a90e2';
    ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height * 0.6);
    
    // Draw head
    ctx.fillStyle = '#ffdbac';
    ctx.beginPath();
    ctx.arc(0, -player.height / 2 - 8, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw arms
    ctx.fillStyle = '#4a90e2';
    ctx.fillRect(-player.width / 2 - 8, -player.height / 2 + 5, 6, 20);
    ctx.fillRect(player.width / 2 + 2, -player.height / 2 + 5, 6, 20);
    
    // Draw legs
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(-player.width / 2 + 3, player.height / 2 - 10, 6, 15);
    ctx.fillRect(player.width / 2 - 9, player.height / 2 - 10, 6, 15);
    
    ctx.restore();
}

// Draw BTC Concept
function drawBTCConcept(concept) {
    ctx.save();
    ctx.translate(concept.x + concept.width / 2, concept.y + concept.height / 2);
    ctx.rotate(concept.rotation);
    
    const scale = 1 + Math.sin(concept.pulse) * 0.2;
    ctx.scale(scale, scale);
    
    // Check if this is Saifedean Ammous concept - draw book image instead
    if (concept.concept.id === 'saifedean-ammous' && bookImageLoaded && bookImage.complete && bookImage.naturalWidth > 0) {
        // Draw book cover image
        try {
            ctx.drawImage(bookImage, -concept.width / 2, -concept.height / 2, concept.width, concept.height);
            
            // Add a subtle border to make it stand out
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.strokeRect(-concept.width / 2, -concept.height / 2, concept.width, concept.height);
        } catch (e) {
            // If image draw fails, fall through to default Bitcoin symbol
            console.log("Failed to draw book image, using default symbol");
            drawBitcoinSymbol(ctx, concept);
        }
    } else {
        drawBitcoinSymbol(ctx, concept);
    }
    
    ctx.restore();
}

// Helper function to draw Bitcoin symbol
function drawBitcoinSymbol(ctx, concept) {
    // Draw Bitcoin symbol (default)
    ctx.fillStyle = '#f7931a';
    ctx.beginPath();
    ctx.arc(0, 0, concept.width / 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw B symbol
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('₿', 0, 0);
}

// Draw Platform
function drawPlatform(platform) {
    // Draw platform block
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    
    // Draw top surface
    ctx.fillStyle = '#A0522D';
    ctx.fillRect(platform.x, platform.y, platform.width, 5);
    
    // Draw side shadow
    ctx.fillStyle = '#654321';
    ctx.fillRect(platform.x, platform.y + 5, 3, platform.height - 5);
    
    // Draw grid pattern
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 1;
    for (let i = 0; i < platform.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(platform.x + i, platform.y);
        ctx.lineTo(platform.x + i, platform.y + platform.height);
        ctx.stroke();
    }
}

// Draw Enemy (Fiat Cash)
function drawEnemy(enemy) {
    ctx.save();
    ctx.translate(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
    ctx.rotate(enemy.rotation);
    
    // Draw dollar bill
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(-enemy.width / 2, -enemy.height / 2, enemy.width, enemy.height);
    
    ctx.strokeStyle = '#228B22';
    ctx.lineWidth = 2;
    ctx.strokeRect(-enemy.width / 2, -enemy.height / 2, enemy.width, enemy.height);
    
    // Draw dollar sign
    ctx.fillStyle = '#000';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', 0, 0);
    
    // Draw "FIAT" text
    ctx.fillStyle = '#000';
    ctx.font = 'bold 8px Arial';
    ctx.fillText('FIAT', 0, -enemy.height / 2 - 8);
    
    ctx.restore();
}

// Draw progress bar (not needed anymore but keeping for compatibility)
function drawProgressBar() {
    // Progress bar removed - concepts show immediately on collision
}

// Draw particles
function drawParticles() {
    particles.forEach((particle, index) => {
        ctx.save();
        ctx.globalAlpha = particle.life / particle.maxLife;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });
}

// Update game
function update() {
    if (!gameState.gameRunning) return;
    
    // Player horizontal movement
    player.velocityX = 0;
    if (keys['arrowleft'] || keys['a']) {
        player.velocityX = -player.speed;
    }
    if (keys['arrowright'] || keys['d']) {
        player.velocityX = player.speed;
    }
    
    // Jumping
    if ((keys['arrowup'] || keys['w'] || keys[' ']) && player.onGround) {
        player.velocityY = player.jumpPower;
        player.onGround = false;
    }
    
    // Apply gravity
    player.velocityY += player.gravity;
    
    // Update player position
    player.x += player.velocityX;
    player.y += player.velocityY;
    
    // Check platform collisions
    player.onGround = false;
    platforms.forEach(platform => {
        if (checkPlatformCollision(player, platform)) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.onGround = true;
        }
    });
    
    // Ground collision
    if (player.y + player.height >= canvas.height - 20) {
        player.y = canvas.height - 20 - player.height;
        player.velocityY = 0;
        player.onGround = true;
    }
    
    // Boundary checks - ensure player is always within canvas bounds
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height - 20, player.y));
    
    // Validate player position - prevent NaN, Infinity, or invalid values
    if (!isFinite(player.x) || !isFinite(player.y)) {
        console.warn("Player position invalid, resetting to center");
        player.x = canvas.width / 2;
        player.y = canvas.height - 20 - player.height;
        player.velocityX = 0;
        player.velocityY = 0;
    }
    
    // Ensure player position is within reasonable bounds
    if (player.x < -player.width || player.x > canvas.width + player.width ||
        player.y < -player.height || player.y > canvas.height + player.height) {
        console.warn("Player out of bounds, resetting to center");
        player.x = canvas.width / 2;
        player.y = canvas.height - 20 - player.height;
        player.velocityX = 0;
        player.velocityY = 0;
    }
    
    // Spawn BTC concepts
    conceptSpawnTimer++;
    if (conceptSpawnTimer >= conceptSpawnRate && btcConcepts.length < 3) {
        createBTCConcept();
        conceptSpawnTimer = 0;
    }
    
    // Spawn enemies
    enemySpawnTimer++;
    if (enemySpawnTimer >= enemySpawnRate && enemies.length < 4) {
        createEnemy();
        enemySpawnTimer = 0;
    }
    
    // Update BTC concepts - check collision with player
    btcConcepts.forEach((concept, index) => {
        concept.rotation += concept.rotationSpeed;
        concept.pulse += concept.pulseSpeed;
        
        // Check collision with player
        if (checkCollision(player, concept)) {
            // Check if this concept hasn't been collected yet
            if (!gameState.collectedConcepts.has(concept.concept.id)) {
            // Player touched the BTC coin - show concept immediately
            const conceptCenterX = concept.x + concept.width / 2;
            const conceptCenterY = concept.y + concept.height / 2;
            createParticles(conceptCenterX, conceptCenterY, '#f7931a');
            showConcept(concept.concept);
            btcConcepts.splice(index, 1);
            gameState.score += 50;
            gameState.concepts++;
                gameState.collectedConcepts.add(concept.concept.id);
                
                // Update UI
            document.getElementById('score').textContent = gameState.score;
            document.getElementById('concepts').textContent = gameState.concepts;
                updateProgressTracker();
                
                // Check if all concepts collected
                if (gameState.collectedConcepts.size >= gameState.totalConcepts) {
                    endGame();
                }
            } else {
                // Already collected, just remove it
                btcConcepts.splice(index, 1);
            }
        }
    });
    
    // Update enemies - try to block player from BTC coins
    enemies.forEach((enemy) => {
        // Find nearest BTC coin
        let nearestBTC = null;
        let nearestDistance = Infinity;
        
        btcConcepts.forEach(concept => {
            const dist = getDistance(
                player.x + player.width / 2, player.y + player.height / 2,
                concept.x + concept.width / 2, concept.y + concept.height / 2
            );
            if (dist < nearestDistance) {
                nearestDistance = dist;
                nearestBTC = concept;
            }
        });
        
        // If there's a BTC coin, try to position between player and coin
        if (nearestBTC) {
            const playerX = player.x + player.width / 2;
            const playerY = player.y + player.height / 2;
            const btcX = nearestBTC.x + nearestBTC.width / 2;
            const btcY = nearestBTC.y + nearestBTC.height / 2;
            
            // Calculate point between player and BTC
            const blockX = (playerX + btcX) / 2;
            const blockY = (playerY + btcY) / 2;
            
            // Move towards blocking position
            const dx = blockX - (enemy.x + enemy.width / 2);
            const dy = blockY - (enemy.y + enemy.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
                enemy.x += (dx / distance) * enemy.speed;
                enemy.y += (dy / distance) * enemy.speed;
            }
        } else {
            // No BTC coins, just chase player
            const dx = player.x + player.width / 2 - (enemy.x + enemy.width / 2);
            const dy = player.y + player.height / 2 - (enemy.y + enemy.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
                enemy.x += (dx / distance) * enemy.speed;
                enemy.y += (dy / distance) * enemy.speed;
            }
        }
        
        enemy.rotation += enemy.rotationSpeed;
        
        // Check collision with player - just push player back, don't remove enemy
        if (checkCollision(player, enemy)) {
            // Push player away from enemy
            const dx = player.x + player.width / 2 - (enemy.x + enemy.width / 2);
            const dy = player.y + player.height / 2 - (enemy.y + enemy.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0 && isFinite(distance)) {
                const pushX = (dx / distance) * 3;
                const pushY = (dy / distance) * 3;
                
                // Validate push values before applying
                if (isFinite(pushX) && isFinite(pushY)) {
                    player.x += pushX;
                    player.y += pushY;
                    player.velocityX = (dx / distance) * 2;
                    player.velocityY = (dy / distance) * 2;
                }
            }
            
            createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, '#ff0000');
        }
        
        // Keep enemies on screen (bounce back if they go too far)
        if (enemy.x < -50) enemy.x = -50;
        if (enemy.x > canvas.width - enemy.width + 50) enemy.x = canvas.width - enemy.width + 50;
        if (enemy.y < -50) enemy.y = -50;
        if (enemy.y > canvas.height - enemy.height + 50) enemy.y = canvas.height - enemy.height + 50;
    });
    
    // Update particles
    drawParticles();
    
    // Final safety check - ensure player is always visible and valid
    if (!isFinite(player.x) || !isFinite(player.y) || 
        player.x < -player.width || player.x > canvas.width + player.width ||
        player.y < -player.height || player.y > canvas.height + player.height) {
        // Emergency reset
        player.x = canvas.width / 2;
        player.y = canvas.height - 20 - player.height;
        player.velocityX = 0;
        player.velocityY = 0;
        player.onGround = true;
    }
}

// Draw game
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < canvas.width; i += 50) {
        for (let j = 0; j < canvas.height; j += 50) {
            ctx.fillRect(i, j, 1, 1);
        }
    }
    
    // Draw platforms
    platforms.forEach(platform => {
        drawPlatform(platform);
    });
    
    // Draw BTC concepts
    btcConcepts.forEach(concept => {
        drawBTCConcept(concept);
    });
    
    // Draw enemies
    enemies.forEach(enemy => {
        drawEnemy(enemy);
    });
    
    // Draw player - only if position is valid
    if (isFinite(player.x) && isFinite(player.y) && 
        player.x >= -player.width && player.x <= canvas.width + player.width &&
        player.y >= -player.height && player.y <= canvas.height + player.height) {
        drawPlayer();
    } else {
        // If player position is invalid, reset and draw
        player.x = canvas.width / 2;
        player.y = canvas.height - 20 - player.height;
        drawPlayer();
    }
    
    // Draw particles
    drawParticles();
    
    // Draw progress bar
    drawProgressBar();
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Initialize game
// Set player starting position on ground
player.y = canvas.height - 20 - player.height;
player.onGround = true;

// Initialize progress tracker
updateProgressTracker();

createBTCConcept();
createBTCConcept();
gameLoop();
