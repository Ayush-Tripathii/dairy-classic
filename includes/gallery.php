<!-- Artisanal Gallery Section with Rich 3D Interactive Showcase -->
<section id="gallery" class="py-24 md:py-32 px-6 sm:px-10 md:px-16 bg-[#FAF8F5] select-none border-t border-black/5">
  <div class="max-w-6xl mx-auto">
    <!-- Top Section Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between pb-8 border-b border-black/10 gap-4">
      <div>
        <span class="text-xs uppercase tracking-mega-wide text-[#8A7F73] flex items-center gap-2 mb-2 font-bold">
          <i data-lucide="sparkles" class="w-4 h-4 text-[#D4AF37]"></i>
          <span>03 // VISUAL SHOWCASE</span>
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-noir-900 tracking-tight">
          Artisanal 3D Gallery
        </h2>
      </div>
      <div class="flex items-center gap-2 font-mono text-xs text-noir-600 bg-white px-4 py-2 rounded-full border border-black/10 shadow-sm">
        <span class="w-2 h-2 rounded-full bg-[#476342] animate-pulse"></span>
        <span>5 Handcrafted Creations</span>
      </div>
    </div>

    <!-- 3D Interactive Gallery Grid with Identical Uniform Sized Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-12 items-stretch">
      <?php foreach ($products as $idx => $p): ?>
        <div class="product-card-3d-wrap h-full flex flex-col">
          <div
            class="gallery-item-card group relative bg-white rounded-3xl p-5 border border-black/10 hover:border-black/25 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-visible cursor-pointer h-full min-h-[380px]"
            data-product-id="<?= $p['id'] ?>"
            data-index="<?= $idx ?>"
            data-cursor="VIEW"
          >
            <!-- Flavor Ambient Glow Aura (Background) -->
            <div
              class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style="background: radial-gradient(circle at 50% 35%, <?= $p['color_hex'] ?>22 0%, transparent 70%);"
            ></div>

            <!-- Top Number & Tag -->
            <div class="flex items-center justify-between z-20 pointer-events-none mb-2">
              <span class="font-mono text-[11px] font-bold text-[#D4AF37]">
                0<?= $idx + 1 ?>
              </span>
              <span class="text-[9px] uppercase font-extrabold px-2.5 py-0.5 rounded-full shadow-xs" style="background-color: <?= $p['badge_bg'] ?>; color: <?= $p['badge_color'] ?>;">
                <?= $p['badge'] ?>
              </span>
            </div>

            <!-- 3D Product Image Floating & Pop-Out Stage (Uniform fixed height) -->
            <div class="relative w-full h-48 flex items-center justify-center my-auto overflow-visible pointer-events-none">
              <img
                src="<?= $p['image'] ?>"
                alt="<?= $p['name'] ?>"
                class="gallery-card-img w-auto h-44 max-w-full object-contain filter drop-shadow-md transition-transform duration-500 z-20 pointer-events-none"
                style="animation: float3D 6s ease-in-out infinite; animation-delay: <?= $idx * 0.75 ?>s;"
              >

              <!-- Dynamic 3D Floor Shadow -->
              <div
                class="gallery-card-shadow absolute bottom-1 w-24 h-4 rounded-full bg-black/15 blur-sm transition-all duration-500 pointer-events-none"
              ></div>
            </div>

            <!-- Product Info (Fixed min-height for uniform bottom alignment) -->
            <div class="mt-auto pt-3 border-t border-black/5 flex flex-col items-center justify-end text-center z-20 pointer-events-none min-h-[72px]">
              <span class="text-[10px] text-[#8A7F73] uppercase font-bold tracking-wider mb-1 line-clamp-1">
                <?= $p['category'] ?>
              </span>
              <h3 class="font-serif text-base sm:text-lg font-bold text-noir-900 group-hover:text-[#476342] transition-colors leading-snug">
                <?= $p['name'] ?>
              </h3>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

