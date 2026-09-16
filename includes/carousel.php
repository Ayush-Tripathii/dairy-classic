<!-- 3D Studio Coverflow Carousel Section -->
<section
  id="showcase"
  class="relative min-h-screen py-16 sm:py-24 px-4 sm:px-8 md:px-12 carousel-chocolate-bg text-[#FAF8F5] flex flex-col justify-between overflow-hidden select-none transition-colors duration-700"
>
  <!-- Dynamic Ambient Background 3D Flavor Glow -->
  <div
    id="carousel-glow"
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full blur-[180px] opacity-20 pointer-events-none transition-all duration-700 animate-pulse-glow"
    style="background-color: #B86B28;"
  ></div>

  <!-- Warm Cocoa Studio Ambient Spotlight (Right Side) -->
  <div
    class="absolute top-1/3 right-0 w-[480px] h-[480px] rounded-full blur-[180px] bg-[#6E351A]/20 pointer-events-none"
  ></div>

  <!-- Warm Ruby-Chocolate Accent Spotlight (Left Side) -->
  <div
    class="absolute bottom-1/4 left-0 w-[450px] h-[450px] rounded-full blur-[170px] bg-[#6B1E22]/15 pointer-events-none"
  ></div>

  <!-- Ambient Luxury Studio Rings (3D Depth) -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-10">
    <div class="w-[620px] h-[620px] rounded-full border border-[#D4AF37]/35 animate-spin" style="animation-duration: 40s;"></div>
    <div class="absolute w-[820px] h-[820px] rounded-full border border-dashed border-[#D4AF37]/25 animate-spin" style="animation-duration: 60s; animation-direction: reverse;"></div>
  </div>

  <!-- Top Header Bar -->
  <div class="max-w-6xl mx-auto w-full relative z-20 flex items-center justify-between pb-4 border-b border-white/15">
    <div>
      <span class="text-xs uppercase tracking-mega-wide text-[#E5C378] flex items-center gap-1.5 mb-1.5 font-bold">
        <i data-lucide="sparkles" class="w-4 h-4"></i>
        <span>02 // 3D Interactive Studio</span>
      </span>
      <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
        Product Studio 3D
      </h2>
    </div>

    <!-- Slide Counter & Badge -->
    <div class="flex items-center gap-3">
      <span id="carousel-badge" class="hidden sm:inline-block text-[11px] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-white/10 text-[#E5C378] border border-white/15 font-bold backdrop-blur-md shadow-sm">
        SIGNATURE BLEND
      </span>
      <div class="font-mono text-xs text-neutral-200 bg-white/10 px-4 py-1.5 rounded-full border border-white/15 flex items-center gap-1.5 backdrop-blur-md shadow-sm">
        <span id="carousel-current-index" class="text-[#E5C378] font-bold text-sm">01</span>
        <span class="text-white/70">/ 0<?= count($products) ?></span>
      </div>
    </div>
  </div>

  <!-- 3D COVERFLOW & REVOLVING ORBITAL STAGE -->
  <div id="carousel-3d-viewport" class="max-w-6xl mx-auto w-full my-auto py-2 relative z-20 carousel-3d-stage">
    
    <!-- Prev Navigation Button -->
    <button
      id="carousel-prev-btn"
      aria-label="Previous Creation"
      class="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md active:scale-90 shadow-2xl hover:scale-105"
      data-cursor="PREV"
    >
      <i data-lucide="chevron-left" class="w-6 h-6 sm:w-7 sm:h-7"></i>
    </button>

    <!-- Next Navigation Button -->
    <button
      id="carousel-next-btn"
      aria-label="Next Creation"
      class="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md active:scale-90 shadow-2xl hover:scale-105"
      data-cursor="NEXT"
    >
      <i data-lucide="chevron-right" class="w-6 h-6 sm:w-7 sm:h-7"></i>
    </button>

    <!-- 3D Coverflow Container with 3 Active Perspective Slots -->
    <div class="relative w-full min-h-[480px] sm:min-h-[530px] flex items-center justify-center coverflow-3d-wrapper mb-2">
      
      <!-- LEFT 3D PREVIEW CARD (Angled in 3D space) -->
      <div
        id="carousel-card-left"
        class="coverflow-card coverflow-card-left absolute cursor-pointer hidden md:flex flex-col items-center justify-center"
        data-cursor="PREV"
      >
        <div class="w-52 h-68 sm:w-60 sm:h-80 relative flex items-center justify-center">
          <img
            id="carousel-left-img"
            src="assets/products/trio-icecream-cake.png"
            alt="Previous Product"
            class="max-h-full max-w-full object-contain filter drop-shadow-xl select-none transition-transform duration-500 hover:scale-105"
          >
        </div>
        <span id="carousel-left-name" class="text-sm font-serif text-white font-semibold mt-2 tracking-wide drop-shadow-md">
          Trio Indulgence
        </span>
      </div>

      <!-- CENTER 3D HERO CARD (Active Spotlight) -->
      <div
        id="carousel-center-stage"
        class="coverflow-card coverflow-card-center relative z-30 w-full max-w-2xl flex flex-col items-center text-center px-4"
      >
        <!-- Interactive 3D Orbit & Big Image Stage -->
        <div id="carousel-cone-stage" class="w-full h-72 sm:h-[350px] md:h-[380px] relative flex items-center justify-center mb-3 perspective-stage">
          
          <!-- 3D Orbiting Ingredients Ring (Dynamic per Flavor) -->
          <div id="carousel-orbit-system" class="carousel-revolving-orbit-stage">
            <!-- Orbit Ring 1 (Tilted 3D Clockwise) -->
            <div class="carousel-orbit-track-1">
              <div class="revolving-node" style="top: -26px; left: 50%; transform: translateX(-50%);">
                <div id="carousel-rev-wrap-1" class="carousel-rev-wrap-1">
                  <img id="carousel-rev-img-1" src="assets/ingredients/mango-cube.png" alt="Ingredient" class="w-11 h-11 sm:w-14 sm:h-14 object-contain filter drop-shadow-md">
                </div>
              </div>
              <div class="revolving-node" style="bottom: -26px; left: 50%; transform: translateX(-50%);">
                <div id="carousel-rev-wrap-2" class="carousel-rev-wrap-1">
                  <img id="carousel-rev-img-2" src="assets/ingredients/mint-leaf.png" alt="Ingredient" class="w-11 h-11 sm:w-14 sm:h-14 object-contain filter drop-shadow-md">
                </div>
              </div>
            </div>

            <!-- Orbit Ring 2 (Counter-Tilted 3D Orbit) -->
            <div class="carousel-orbit-track-2">
              <div class="revolving-node" style="left: -24px; top: 50%; transform: translateY(-50%);">
                <div id="carousel-rev-wrap-3" class="carousel-rev-wrap-2">
                  <img id="carousel-rev-img-3" src="assets/ingredients/chocolate-curl.png" alt="Ingredient" class="w-11 h-11 sm:w-14 sm:h-14 object-contain filter drop-shadow-md">
                </div>
              </div>
              <div class="revolving-node" style="right: -24px; top: 50%; transform: translateY(-50%);">
                <div id="carousel-rev-wrap-4" class="carousel-rev-wrap-2">
                  <img id="carousel-rev-img-4" src="assets/ingredients/mango-cube.png" alt="Ingredient" class="w-11 h-11 sm:w-14 sm:h-14 object-contain filter drop-shadow-md">
                </div>
              </div>
            </div>
          </div>

          <!-- 3D Pedestal Glow Ring Beneath Product -->
          <div
            id="carousel-pedestal-ring"
            class="carousel-pedestal-glow"
            style="box-shadow: 0 0 70px 25px rgba(245, 166, 35, 0.45);"
          ></div>

          <!-- Center Active 3D Big Product Image -->
          <div id="carousel-tilt-wrapper" class="relative z-20 flex items-center justify-center w-full h-full" style="transform-style: preserve-3d;">
            <img
              id="carousel-main-img"
              src="assets/products/alphonso-mango-cone.png"
              alt="Alphonso Mango"
              class="carousel-hero-product-img select-none animate-float-3d"
              style="filter: drop-shadow(0 36px 48px rgba(245, 166, 35, 0.55));"
            >
          </div>
        </div>

        <!-- Product Meta Details with High Contrast & Crystal Clear Readability -->
        <div class="relative z-30 flex flex-col items-center">
          <span id="carousel-category" class="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#E5C378] font-bold mb-1 drop-shadow-sm">
            01 // WAFFLE CONE
          </span>

          <h3 id="carousel-title" class="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-1.5 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            Alphonso Mango
          </h3>

          <p id="carousel-tagline" class="font-sans text-sm sm:text-base text-[#FAF6F2] font-medium max-w-lg mb-3.5 drop-shadow-md leading-relaxed">
            Double Scoop • Fresh Mango Slice • Mint
          </p>

          <!-- Tasting Notes Chips with Bright Frosted Glass Clarity -->
          <div id="carousel-notes-pills" class="flex flex-wrap items-center justify-center gap-2.5 mb-4">
            <span class="text-xs sm:text-sm px-4 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold border border-white/30 backdrop-blur-md shadow-md transition-colors">Ratnagiri Mango</span>
            <span class="text-xs sm:text-sm px-4 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold border border-white/30 backdrop-blur-md shadow-md transition-colors">Crisp Waffle</span>
            <span class="text-xs sm:text-sm px-4 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold border border-white/30 backdrop-blur-md shadow-md transition-colors">Wild Mint</span>
          </div>

          <!-- Actions Bar with Ample Clearance -->
          <div class="flex items-center gap-5">
            <span id="carousel-price" class="font-sans text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md">
              $8.50
            </span>

            <button
              id="carousel-add-btn"
              class="px-8 sm:px-10 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider font-extrabold transition-all flex items-center gap-2 shadow-2xl active:scale-95 bg-[#E5C378] hover:bg-[#d6b15e] text-noir-900 hover:scale-105"
              data-cursor="ADD"
            >
              <i data-lucide="shopping-bag" class="w-4 h-4"></i>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT 3D PREVIEW CARD (Angled in 3D space) -->
      <div
        id="carousel-card-right"
        class="coverflow-card coverflow-card-right absolute cursor-pointer hidden md:flex flex-col items-center justify-center"
        data-cursor="NEXT"
      >
        <div class="w-52 h-68 sm:w-60 sm:h-80 relative flex items-center justify-center">
          <img
            id="carousel-right-img"
            src="assets/products/almond-crunch-bar.png"
            alt="Next Product"
            class="max-h-full max-w-full object-contain filter drop-shadow-xl select-none transition-transform duration-500 hover:scale-105"
          >
        </div>
        <span id="carousel-right-name" class="text-sm font-serif text-white font-semibold mt-2 tracking-wide drop-shadow-md">
          Almond Crunch
        </span>
      </div>

    </div>
  </div>
</section>

