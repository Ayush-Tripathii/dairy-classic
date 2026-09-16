<!-- Hero Section with 3D Luxury Stage & Real Revolving Ingredients -->
<?php $heroProduct = $products[0]; ?>
<section
  id="hero"
  class="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-8 px-6 sm:px-10 md:px-14 overflow-hidden select-none transition-colors duration-1000 perspective-stage"
  style="background: <?= $heroProduct['bg_gradient'] ?>;"
>
  <!-- Background Ambient 3D Watermark -->
  <div id="hero-watermark" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[11vw] font-bold text-black/[0.035] pointer-events-none whitespace-nowrap transition-transform duration-700 ease-out will-change-transform select-none">
    <?= strtoupper($heroProduct['name']) ?>
  </div>

  <!-- Top Product Switcher Tabs -->
  <div class="relative z-20 max-w-6xl mx-auto w-full flex items-center justify-center">
    <div class="flex items-center gap-1.5 overflow-x-auto p-1.5 no-scrollbar max-w-full">
      <?php foreach ($products as $idx => $p): ?>
        <button
          class="hero-tab-btn flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 <?= $idx === 0 ? 'bg-noir-900 text-cream-50 shadow-md scale-105' : 'bg-white/70 text-noir-700 hover:bg-white border border-black/10' ?>"
          data-product-id="<?= $p['id'] ?>"
          data-cursor="SWITCH"
        >
          <span class="w-2 h-2 rounded-full flex-shrink-0" style="background-color: <?= $p['color_hex'] ?>;"></span>
          <span class="whitespace-nowrap"><?= $p['number'] ?> <?= $p['name'] ?></span>
        </button>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- Hero Content Stage -->
  <div class="relative z-20 max-w-6xl mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
    <!-- Left: Minimal Editorial Typography -->
    <div class="lg:col-span-6 flex flex-col justify-center text-left" id="hero-text-container">
      <div class="inline-flex items-center gap-2 mb-3 text-[11px] uppercase tracking-mega-wide text-[#8A7F73]">
        <i data-lucide="sparkles" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
        <span id="hero-category-label">Dairy Classics // <?= $heroProduct['category'] ?></span>
      </div>

      <h1 id="hero-title" class="hero-title text-noir-900 font-bold tracking-tight mb-3">
        <?= $heroProduct['name'] ?>
      </h1>

      <p id="hero-tagline" class="text-xs sm:text-sm text-noir-700 font-medium tracking-wide mb-6">
        <?= $heroProduct['tagline'] ?>
      </p>

      <!-- Key Specs Pills -->
      <div id="hero-notes-pills" class="flex flex-wrap gap-2 mb-8">
        <?php foreach ($heroProduct['notes'] as $n): ?>
          <span class="text-[11px] px-3.5 py-1.5 rounded-full bg-white/80 border border-black/5 text-noir-800 font-medium shadow-sm"><?= $n ?></span>
        <?php endforeach; ?>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center gap-3">
        <button
          id="hero-add-btn"
          class="bg-noir-900 hover:bg-noir-800 text-cream-50 px-7 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all shadow-lg hover:shadow-2xl active:scale-95 flex items-center gap-2"
          data-cursor="ADD"
        >
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span id="hero-price-text">Add to Box • $<?= number_format($heroProduct['price'], 2) ?></span>
        </button>

        <a
          href="#showcase"
          class="border border-black/15 hover:border-black/60 bg-white/70 backdrop-blur-sm text-noir-900 px-6 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all active:scale-95 flex items-center gap-2 shadow-sm"
          data-cursor="3D STUDIO"
        >
          <i data-lucide="eye" class="w-4 h-4"></i>
          <span>3D Studio Showcase</span>
        </a>
      </div>
    </div>

    <!-- Right: High-End 3D Product Interactive Stage with Real Revolving Ingredients -->
    <div
      id="hero-3d-stage"
      class="lg:col-span-6 h-[460px] sm:h-[520px] md:h-[560px] w-full relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style="perspective: 1200px;"
    >
      <!-- Real 3D Revolving Ingredient Orbits Around Product -->
      <div class="hero-revolving-orbit-stage" id="hero-revolving-stage">
        <!-- 3D Orbit Track 1 (Tilted Clockwise Orbit) -->
        <div class="orbit-revolving-track-1" id="orbit-revolving-track-1">
          <!-- Revolving Item 1 -->
          <div class="revolving-node" style="top: -35px; left: 50%; transform: translateX(-50%);" data-cursor="EXPLORE">
            <div class="revolving-img-wrap-1" id="revolve-wrap-1">
              <img id="revolve-img-1" src="<?= $heroProduct['revolving_ingredients'][0] ?>" alt="Ingredient" class="w-16 h-16 sm:w-20 sm:h-20 object-contain pointer-events-none filter drop-shadow-xl">
            </div>
          </div>

          <!-- Revolving Item 2 -->
          <div class="revolving-node" style="bottom: -35px; left: 50%; transform: translateX(-50%);" data-cursor="EXPLORE">
            <div class="revolving-img-wrap-1" id="revolve-wrap-2">
              <img id="revolve-img-2" src="<?= $heroProduct['revolving_ingredients'][1] ?>" alt="Ingredient" class="w-14 h-14 sm:w-18 sm:h-18 object-contain pointer-events-none filter drop-shadow-xl">
            </div>
          </div>
        </div>

        <!-- 3D Orbit Track 2 (Counter-Tilted Orbit) -->
        <div class="orbit-revolving-track-2" id="orbit-revolving-track-2">
          <!-- Revolving Item 3 -->
          <div class="revolving-node" style="left: -35px; top: 50%; transform: translateY(-50%);" data-cursor="EXPLORE">
            <div class="revolving-img-wrap-2" id="revolve-wrap-3">
              <img id="revolve-img-3" src="<?= $heroProduct['revolving_ingredients'][2] ?>" alt="Ingredient" class="w-14 h-14 sm:w-18 sm:h-18 object-contain pointer-events-none filter drop-shadow-xl">
            </div>
          </div>

          <!-- Revolving Item 4 -->
          <div class="revolving-node" style="right: -35px; top: 50%; transform: translateY(-50%);" data-cursor="EXPLORE">
            <div class="revolving-img-wrap-2" id="revolve-wrap-4">
              <img id="revolve-img-4" src="<?= $heroProduct['revolving_ingredients'][3] ?>" alt="Ingredient" class="w-16 h-16 sm:w-20 sm:h-20 object-contain pointer-events-none filter drop-shadow-xl">
            </div>
          </div>
        </div>
      </div>

      <!-- Centerpiece 3D Product Wrapper with Physics Inertia Tilt -->
      <div
        id="hero-tilt-wrapper"
        class="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out z-20"
        style="transform-style: preserve-3d;"
      >
        <!-- Real Product Image (3D Floating & Tilt) -->
        <div id="hero-img-box" class="relative z-20 w-full h-full flex items-center justify-center p-2 animate-float-3d" style="transform-style: preserve-3d;">
          <img
            id="hero-main-img"
            src="<?= $heroProduct['image'] ?>"
            alt="<?= $heroProduct['name'] ?>"
            class="max-h-[480px] sm:max-h-[520px] max-w-full object-contain filter drop-shadow-2xl transition-all duration-700 select-none pointer-events-none"
            style="filter: drop-shadow(0 28px 40px rgba(0,0,0,0.24)); transform: translateZ(40px);"
          >
        </div>
      </div>

      <!-- Mode Pill -->
      <div class="absolute bottom-2 right-2 glass-luxury px-3.5 py-1.5 rounded-full flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-noir-800 shadow-sm border border-black/10 pointer-events-none z-30">
        <span class="w-2 h-2 rounded-full bg-[#476342] animate-pulse"></span>
        <span>3D Splash Presentation</span>
      </div>
    </div>
  </div>

  <!-- Bottom Minimal Bar -->
  <div class="relative z-20 max-w-6xl mx-auto w-full flex items-center justify-between pt-4 border-t border-black/10 text-[11px] text-[#8A7F73]">
    <div class="flex items-center gap-2">
      <i data-lucide="shield-check" class="w-3.5 h-3.5 text-[#476342]"></i>
      <span>Single-Origin Artisanal Dairy</span>
    </div>

    <a
      href="#collection"
      class="flex items-center gap-1.5 uppercase tracking-widest text-noir-900 hover:opacity-75 transition-opacity font-medium"
      data-cursor="SCROLL"
    >
      <span>Explore 3D Lineup</span>
      <i data-lucide="arrow-down" class="w-3.5 h-3.5 text-[#D4AF37] animate-bounce"></i>
    </a>

    <span id="hero-bottom-count" class="font-mono text-noir-900 font-semibold">
      01 / 05 CREATIONS
    </span>
  </div>
</section>
