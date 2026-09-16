<!-- Navigation Header -->
<header id="main-header" class="fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 bg-transparent">
  <div class="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
    <!-- Brand Identity with Official Extracted Logo -->
    <a href="#hero" class="group flex items-center gap-3 text-left focus:outline-none" data-cursor="HOME">
      <img
        src="assets/brand/dairy-classics-logo.png"
        alt="Dairy Classics Official Logo"
        class="w-auto h-10 object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
      >
      <div class="flex flex-col">
        <span class="font-serif text-xl sm:text-2xl font-bold tracking-tight text-noir-900 group-hover:opacity-85 transition-opacity leading-none">
          Dairy Classics
        </span>
        <span class="text-[8px] uppercase tracking-widest text-[#8A7F73] font-medium mt-0.5">
          Artisanal Ice Cream • Est. 1996
        </span>
      </div>
    </a>

    <!-- Minimal Navigation Links -->
    <nav class="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-mega-wide font-medium text-noir-700">
      <a href="#about" class="hover:text-noir-900 transition-colors hover-underline-lux py-1" data-cursor="ABOUT">
        About
      </a>
      <a href="#vision" class="hover:text-noir-900 transition-colors hover-underline-lux py-1" data-cursor="VISION">
        Vision
      </a>
      <a href="#categories" class="hover:text-noir-900 transition-colors hover-underline-lux py-1" data-cursor="CATEGORIES">
        Categories
      </a>
      <a href="#showcase" class="hover:text-noir-900 transition-colors hover-underline-lux py-1" data-cursor="3D STUDIO">
        3D Studio
      </a>
      <a href="#collection" class="hover:text-noir-900 transition-colors hover-underline-lux py-1" data-cursor="COLLECTION">
        Creations
      </a>
      <a href="#recipes" class="hover:text-noir-900 transition-colors hover-underline-lux py-1" data-cursor="RECIPES">
        Recipes
      </a>
      <a href="#contact" class="hover:text-noir-900 transition-colors hover-underline-lux py-1" data-cursor="CONTACT">
        Contact
      </a>
      <a href="#faqs" class="hover:text-noir-900 transition-colors hover-underline-lux py-1" data-cursor="FAQS">
        FAQs
      </a>
    </nav>

    <!-- Right Actions -->
    <div class="flex items-center gap-4">
      <button
        id="open-cart-btn"
        class="flex items-center gap-2.5 bg-noir-900 text-cream-50 px-5 py-2.5 rounded-full hover:bg-noir-800 transition-all active:scale-95 shadow-sm"
        data-cursor="TASTING"
      >
        <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
        <span class="text-xs uppercase tracking-wider font-semibold">Tasting Box</span>
        <span id="cart-badge-count" class="w-5 h-5 rounded-full bg-[#D4AF37] text-noir-900 text-[10px] font-bold flex items-center justify-center -mr-1">
          3
        </span>
      </button>

      <!-- Mobile Menu Trigger -->
      <button
        id="mobile-menu-open-btn"
        aria-label="Open Mobile Menu"
        class="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-black/15 text-noir-900 hover:bg-noir-900 hover:text-white transition-colors"
      >
        <i data-lucide="menu" class="w-4 h-4"></i>
      </button>
    </div>
  </div>
</header>

<!-- Mobile Menu Overlay -->
<div id="mobile-menu" class="fixed inset-0 z-[999] text-[#FAF8F5] flex-col justify-between p-6 sm:p-10 hidden animate-fadeIn overflow-y-auto" style="background: linear-gradient(180deg, oklch(25% 0.075 40) 0%, oklch(20% 0.06 40) 50%, oklch(14% 0.04 40) 100%);">
  <div class="flex items-center justify-between border-b border-white/10 pb-4">
    <div class="flex items-center gap-3">
      <img
        src="assets/brand/dairy-classics-logo.png"
        alt="Dairy Classics Official Logo"
        class="w-auto h-9 object-contain filter brightness-110"
      >
      <span class="font-serif text-2xl font-bold tracking-tight text-white">Dairy Classics</span>
    </div>
    <button id="mobile-menu-close-btn" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#D4AF37] hover:text-noir-900 transition-colors">
      <i data-lucide="x" class="w-5 h-5"></i>
    </button>
  </div>

  <div class="flex flex-col gap-4 my-auto py-6">
    <a href="#about" class="mobile-nav-link group flex items-center justify-between text-left font-serif text-2xl sm:text-3xl text-neutral-300 hover:text-white transition-colors">
      <span>01 / About Story</span>
      <i data-lucide="arrow-right" class="w-5 h-5 text-[#D4AF37]"></i>
    </a>
    <a href="#vision" class="mobile-nav-link group flex items-center justify-between text-left font-serif text-2xl sm:text-3xl text-neutral-300 hover:text-white transition-colors">
      <span>02 / Founder's Vision & 80K L</span>
      <i data-lucide="arrow-right" class="w-5 h-5 text-[#D4AF37]"></i>
    </a>
    <a href="#categories" class="mobile-nav-link group flex items-center justify-between text-left font-serif text-2xl sm:text-3xl text-neutral-300 hover:text-white transition-colors">
      <span>03 / 6 Category Pillars</span>
      <i data-lucide="arrow-right" class="w-5 h-5 text-[#D4AF37]"></i>
    </a>
    <a href="#showcase" class="mobile-nav-link group flex items-center justify-between text-left font-serif text-2xl sm:text-3xl text-neutral-300 hover:text-white transition-colors">
      <span>04 / 3D Sensory Studio</span>
      <i data-lucide="arrow-right" class="w-5 h-5 text-[#D4AF37]"></i>
    </a>
    <a href="#collection" class="mobile-nav-link group flex items-center justify-between text-left font-serif text-2xl sm:text-3xl text-neutral-300 hover:text-white transition-colors">
      <span>05 / Churned Creations</span>
      <i data-lucide="arrow-right" class="w-5 h-5 text-[#D4AF37]"></i>
    </a>
    <a href="#contact" class="mobile-nav-link group flex items-center justify-between text-left font-serif text-2xl sm:text-3xl text-neutral-300 hover:text-white transition-colors">
      <span>06 / Contact & Factory</span>
      <i data-lucide="arrow-right" class="w-5 h-5 text-[#D4AF37]"></i>
    </a>
    <a href="#faqs" class="mobile-nav-link group flex items-center justify-between text-left font-serif text-2xl sm:text-3xl text-neutral-300 hover:text-white transition-colors">
      <span>07 / FAQs</span>
      <i data-lucide="arrow-right" class="w-5 h-5 text-[#D4AF37]"></i>
    </a>
  </div>

  <div class="border-t border-white/10 pt-4 flex justify-between items-center text-[10px] uppercase tracking-widest text-[#B5A898]">
    <span>Edition 2026</span>
    <span>© Dairy Classics Uzbekistan</span>
  </div>
</div>
