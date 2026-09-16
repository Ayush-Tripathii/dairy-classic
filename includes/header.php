<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍦</text></svg>">
  <title>Dairy Classics — Premium Artisanal Ice Cream</title>
  
  <!-- Primary Meta Tags -->
  <meta name="title" content="Dairy Classics — Premium Artisanal Ice Cream">
  <meta name="description" content="Experience pure artisanal indulgence with Dairy Classics. Freshly churned waffle cones, chocolate crunch bars, ruby velvet sticks, and gourmet gelato cakes.">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            serif: ['"Playfair Display"', 'Georgia', 'serif'],
            display: ['"Syne"', 'sans-serif'],
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          },
          colors: {
            cream: {
              50: '#FCFBF9',
              100: '#FAF8F5',
              200: '#F4EEE8',
            },
            noir: {
              950: 'oklch(15% 0.045 40)',
              900: 'oklch(25% 0.075 40)',
              800: 'oklch(30% 0.080 40)',
              700: 'oklch(40% 0.088 40)',
              600: 'oklch(50% 0.092 40)',
              500: 'oklch(62% 0.085 40)',
            },
            chocolate: {
              950: 'oklch(15% 0.045 40)',
              900: 'oklch(25% 0.075 40)',
              800: 'oklch(30% 0.080 40)',
              700: 'oklch(40% 0.088 40)',
              600: 'oklch(50% 0.092 40)',
              500: 'oklch(62% 0.085 40)',
              400: 'oklch(72% 0.075 40)',
              100: '#F5EBE6',
            },
            gold: {
              400: '#E5C058',
              500: '#D4AF37',
            }
          },
          letterSpacing: {
            'mega-wide': '0.3em',
          }
        }
      }
    }
  </script>

  <!-- External CDN Libraries (Three.js, GSAP, Lucide Icons, Canvas Confetti) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>

  <!-- Global Products Dataset Injection -->
  <script>
    window.PRODUCTS_DATA = <?= json_encode($products) ?>;
  </script>

  <!-- Custom Stylesheet -->
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="bg-[#FAF8F5] text-noir-900 selection:bg-noir-900 selection:text-cream-50 overflow-x-hidden antialiased font-sans">
  <!-- 3D Global Ambient Particle Background Canvas -->
  <canvas id="bg-particle-canvas" class="fixed inset-0 pointer-events-none z-0 opacity-60"></canvas>

  <!-- Luxury Grain Texture -->
  <div class="fixed inset-0 luxury-noise z-40 pointer-events-none"></div>

  <!-- Artisanal Ice Cream Scoop Pointer -->
  <div id="custom-cursor" class="custom-cursor hidden md:block">
    <div id="scoop-icon-wrapper" class="relative">
      <!-- Luxury Gold & Steel Ice Cream Scoop Spoon SVG -->
      <svg width="46" height="46" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="filter drop-shadow-xl overflow-visible">
        <!-- Metallic Scoop Bowl -->
        <path d="M12 6C7 6 4 11 4 16C4 22 9 26 15 26C21 26 25 21 25 15C25 9 20 6 15 6C14 6 13 6 12 6Z" fill="url(#scoopMetalGrad)" stroke="#B8860B" stroke-width="1.8" />
        <!-- Scoop Inner Cavity Depth -->
        <ellipse cx="14" cy="15" rx="7.5" ry="6.5" fill="url(#scoopCavityGrad)" opacity="0.9" />
        
        <!-- Extracted Fresh Ice Cream Scoop Ball (Animated Growth on Scoop) -->
        <g id="scoop-ice-cream-group" class="opacity-0 transition-opacity duration-300">
          <!-- Main Creamy Dollop -->
          <circle id="scoop-ice-cream-ball" cx="13.5" cy="14" r="7.5" fill="#FFF4D6" stroke="#D4AF37" stroke-width="1.2" class="filter drop-shadow-sm" />
          <!-- Cream Swirl Highlights -->
          <path d="M9 12C11 10.5 15 11 17 13.5" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round" opacity="0.8" />
          <path d="M10 16C12 17.5 15 17 16.5 15.5" stroke="#E5C058" stroke-width="1.2" stroke-linecap="round" opacity="0.7" />
          <!-- Mini Topping Sprinkle -->
          <circle cx="12" cy="12" r="0.9" fill="#8C5A2B" />
          <circle cx="15.5" cy="15" r="0.8" fill="#476342" />
          <circle cx="14" cy="17.5" r="0.7" fill="#D6335C" />
        </g>
        
        <!-- Scoop Spring Lever Mechanism -->
        <path d="M22 17L28 23" stroke="#D4AF37" stroke-width="2.2" stroke-linecap="round" />
        <circle cx="28" cy="23" r="2.5" fill="#5C2412" />
        <!-- Metallic Stem -->
        <path d="M23 21L30 28" stroke="url(#scoopMetalGrad)" stroke-width="4.8" stroke-linecap="round" />
        <!-- Rich Chocolate Grip Handle -->
        <path d="M29 27L43 41" stroke="#231006" stroke-width="7" stroke-linecap="round" />
        <path d="M30 28L42 40" stroke="#5C2814" stroke-width="3.5" stroke-linecap="round" />
        <circle cx="43" cy="41" r="3.8" fill="#D4AF37" />
        
        <defs>
          <linearGradient id="scoopMetalGrad" x1="4" y1="6" x2="25" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FFFDF7" />
            <stop offset="30%" stop-color="#F2E3BC" />
            <stop offset="70%" stop-color="#C5A059" />
            <stop offset="100%" stop-color="#8A6424" />
          </linearGradient>
          <radialGradient id="scoopCavityGrad" cx="14" cy="15" r="7.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#4E310C" stop-opacity="0.85" />
            <stop offset="100%" stop-color="#C5A059" stop-opacity="0.1" />
          </radialGradient>
        </defs>
      </svg>

      <!-- Floating Mini Reaction Badge (e.g. FRESH SCOOP!) -->
      <div id="scoop-reaction-pill" class="absolute -top-7 -right-8 px-2.5 py-0.5 rounded-full bg-noir-900 text-[#E5C378] text-[9px] font-mono font-bold tracking-wider opacity-0 scale-75 transition-all duration-300 shadow-xl border border-[#E5C378]/50 whitespace-nowrap pointer-events-none">
        FRESH SCOOP! 🍨
      </div>
    </div>
  </div>
  
  <!-- Aura Follower Ring -->
  <div id="custom-cursor-follower" class="custom-cursor-follower hidden md:block"></div>
