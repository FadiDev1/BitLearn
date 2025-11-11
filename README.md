# ₿ BitLearn - Learn Bitcoin While You Play!

An interactive platformer game that teaches Bitcoin fundamentals through gameplay. Jump on platforms, collect Bitcoin concepts (₿), avoid fiat cash enemies ($), and master 21 essential Bitcoin concepts!

![BitLearn Game]

## How to Play

- **Move**: Use `Arrow Keys` or `WASD` to move left/right
- **Jump**: Press `Space` or `Up Arrow` to jump
- **Collect**: Touch Bitcoin concept coins (₿) to learn about them
- **Avoid**: Watch out for fiat cash enemies ($) - they'll try to block you!
- **Goal**: Collect all 21 Bitcoin concepts to become a Bitcoin expert!

## Play the Game

[**Play BitLearn on GitHub Pages**](https://yourusername.github.io/bitlearn)

*(Replace `yourusername` with your GitHub username and `bitlearn` with your repository name)*

## What You'll Learn

The game teaches 21 essential Bitcoin concepts including:

- What is Bitcoin?
- Blockchain technology
- Decentralization
- Private & Public Keys
- Seed Phrases
- Hot vs Cold Wallets
- "Not Your Keys, Not Your Coins"
- Transactions & Confirmations
- Transaction Fees
- Bitcoin Addresses
- Mining & Proof-of-Work
- 21 Million Supply Cap
- Halving Events
- Satoshi Nakamoto
- Double-Spending Problem
- Nodes (Full Nodes)
- Self-Custody
- Phishing & Scams
- Saifedean Ammous & The Bitcoin Standard
- Volatility
- HODL & Long-Term Mindset

## Technical Stack

- **HTML5 Canvas** - 2D game rendering
- **Vanilla JavaScript** - Game logic and mechanics
- **CSS3** - Styling, animations, and responsive design

## Technical Concepts Implemented

- **Game Loop** - `requestAnimationFrame()` for smooth 60fps rendering
- **Physics Engine** - Gravity, velocity, acceleration, collision detection
- **Collision Detection** - AABB (Axis-Aligned Bounding Box) system
- **Particle Systems** - Visual effects for coin collection
- **AI Pathfinding** - Enemies intelligently block player from coins
- **State Management** - Game state, player state, concept tracking
- **Progress Tracking** - Set data structure to track collected concepts
- **Responsive Design** - Works on desktop and mobile devices

## Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bitlearn.git
   cd bitlearn
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

3. **Play locally**
   - Navigate to `http://localhost:8000` (or the port shown)

## Deploy to GitHub Pages

### Step-by-Step Guide:

1. **Create a GitHub repository**
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `bitlearn` (or any name you prefer)
   - Make it public (required for free GitHub Pages)

2. **Upload your files**
   ```bash
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit: BitLearn game"
   
   # Add your GitHub repository as remote
   git remote add origin https://github.com/yourusername/bitlearn.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```
   
   **Or use GitHub Desktop:**
   - Download [GitHub Desktop](https://desktop.github.com/)
   - File → Add Local Repository
   - Select your project folder
   - Publish repository to GitHub

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** (top menu)
   - Scroll down to **Pages** (left sidebar)
   - Under **Source**, select:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click **Save**

4. **Your site is live!**
   - GitHub will provide a URL like: `https://yourusername.github.io/bitlearn`
   - It may take a few minutes to deploy
   - You can check the deployment status in the **Actions** tab

5. **Update the README**
   - Replace `yourusername` and `bitlearn` in this README with your actual values
   - Update the "Play the Game" link above


## 📝 File Structure

```
bitlearn/
├── index.html          # Main HTML file
├── game.js             # Game logic and mechanics
├── style.css           # Styling and animations
├── bitcoin-standard-book.jpg  # Book cover image
└── README.md           # This file
```

## Contributing

Feel free to fork this project and add your own improvements! Some ideas:
- Add more Bitcoin concepts
- Improve mobile controls
- Add sound effects
- Create different difficulty levels
- Add multiplayer support

## 📄 License

This project is open source and available for educational purposes.

## Acknowledgments

- Inspired by classic platformer games
- Bitcoin concepts based on "The Bitcoin Standard" by Saifedean Ammous
- Built with vanilla JavaScript - no frameworks required!

## Contact

Have questions or suggestions? Open an issue on GitHub! Or DM me on X (Twitter):

https://x.com/RealFadi_

---

