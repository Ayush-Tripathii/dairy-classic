<!-- 6 Canonical Category Pillars Section from Live Website -->
<section id="categories" class="relative py-24 md:py-32 px-6 sm:px-10 md:px-16 bg-white text-noir-900 border-t border-black/5 select-none overflow-hidden">
  <!-- Subtle Background Decor -->
  <div class="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-[#FAF0DE] blur-3xl opacity-50 pointer-events-none"></div>
  <div class="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-[#F5EAD4] blur-3xl opacity-40 pointer-events-none"></div>

  <div class="max-w-6xl mx-auto relative z-10">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
      <div>
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF3D1] text-[#8C6D12] text-xs font-bold uppercase tracking-wider mb-3">
          <i data-lucide="layers" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
          <span>EXPLORE COMPLETE COLLECTION</span>
        </div>
        <h2 class="font-serif text-3xl sm:text-5xl font-extrabold text-noir-900 tracking-tight leading-tight">
          6 Pillars of Indulgence
        </h2>
        <p class="font-sans text-base sm:text-lg text-noir-700 mt-2 max-w-xl">
          From crispy golden cones to 1-litre grand family tubs, discover our signature creations crafted for every celebration.
        </p>
      </div>

      <!-- Live Category Nav Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto p-1.5 bg-[#FAF8F5] rounded-full border border-black/5 no-scrollbar max-w-full">
        <?php $catKeys = array_keys($canonicalCategories); ?>
        <?php foreach ($canonicalCategories as $key => $cat): ?>
          <button
            class="pillar-tab-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 <?= $key === 'cones' ? 'bg-noir-900 text-cream-50 shadow-md scale-105' : 'text-noir-700 hover:text-noir-900 hover:bg-white/80' ?>"
            data-category="<?= $key ?>"
            data-cursor="VIEW"
          >
            <?= $cat['name'] ?>
          </button>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Category Content Panels -->
    <?php foreach ($canonicalCategories as $key => $cat): ?>
      <div
        id="pillar-panel-<?= $key ?>"
        class="pillar-panel <?= $key === 'cones' ? 'block' : 'hidden' ?> transition-all duration-500"
      >
        <!-- Category Banner Card -->
        <div class="bg-gradient-to-r from-[#FAF8F5] via-[#FFF9EE] to-[#FAF8F5] rounded-3xl p-8 md:p-12 border border-black/8 shadow-lg mb-10 relative overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-8">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/10 text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C6D12] mb-4">
                <i data-lucide="sparkles" class="w-3 h-3 text-[#D4AF37]"></i>
                <span><?= $cat['badge'] ?></span>
              </div>
              <h3 class="font-serif text-3xl sm:text-4xl font-extrabold text-noir-900 mb-3">
                <?= $cat['name'] ?> — <?= $cat['tagline'] ?>
              </h3>
              <p class="text-base sm:text-lg text-noir-700 leading-relaxed font-normal mb-6">
                <?= $cat['description'] ?>
              </p>
              <div class="flex items-center gap-4 text-xs font-semibold text-noir-800">
                <span class="flex items-center gap-1.5"><i data-lucide="check" class="w-4 h-4 text-[#476342]"></i> 100% Pure Fresh Dairy</span>
                <span class="flex items-center gap-1.5"><i data-lucide="check" class="w-4 h-4 text-[#476342]"></i> Zero Preservatives</span>
                <span class="flex items-center gap-1.5"><i data-lucide="check" class="w-4 h-4 text-[#476342]"></i> Uzbekistan Heritage</span>
              </div>
            </div>

            <div class="lg:col-span-4 flex justify-center">
              <div class="w-44 h-44 sm:w-52 sm:h-52 relative flex items-center justify-center">
                <div class="absolute inset-0 bg-[#D4AF37]/15 rounded-full blur-2xl"></div>
                <img
                  src="<?= $cat['image'] ?>"
                  alt="<?= $cat['name'] ?>"
                  class="relative z-10 w-full h-full object-contain filter drop-shadow-xl -translate-y-2 animate-float-3d"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Flavor Items Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <?php foreach ($cat['items'] as $item): ?>
            <div class="bg-[#FAF8F5] rounded-2xl p-6 border border-black/6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-[10px] font-mono uppercase tracking-widest text-[#8A7F73] font-bold"><?= $cat['name'] ?></span>
                  <span class="px-2.5 py-0.5 rounded-full bg-white border border-black/10 text-[11px] font-mono font-bold text-noir-800"><?= $item['size'] ?></span>
                </div>
                <h4 class="font-serif text-lg font-bold text-noir-900 mb-2 group-hover:text-[#8C6D12] transition-colors">
                  <?= $item['name'] ?>
                </h4>
                <p class="text-xs sm:text-sm text-noir-600 leading-relaxed font-normal">
                  <?= $item['desc'] ?>
                </p>
              </div>

              <div class="pt-4 mt-4 border-t border-black/5 flex items-center justify-between">
                <span class="text-xs font-semibold text-[#476342] flex items-center gap-1">
                  <i data-lucide="award" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
                  <span>Artisanal Quality</span>
                </span>
                <span class="text-xs font-bold text-noir-900 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Explore</span>
                  <i data-lucide="arrow-right" class="w-3 h-3 text-[#D4AF37]"></i>
                </span>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</section>
