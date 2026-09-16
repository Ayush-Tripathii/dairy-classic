<!-- Collection Section: Fresh Churned Lineup with 3D Pop-Out Cards -->
<section
  id="collection"
  class="relative py-24 md:py-32 px-6 sm:px-10 md:px-16 bg-[#FAF8F5] text-noir-900 border-t border-black/5 select-none"
>
  <div class="max-w-6xl mx-auto">
    <!-- Top Tag & Main Heading -->
    <div class="mb-24 text-left">
      <span class="inline-block px-3.5 py-1 rounded-full bg-[#FCEAEA] text-[#D8315B] font-bold text-[10px] uppercase tracking-wider mb-3">
        SMALL-BATCH LINEUP
      </span>
      <h2 class="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-noir-900">
        Fresh Churned Creations
      </h2>
    </div>

    <!-- 3D Pop-Out Overlapping Product Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pt-4 items-stretch">
      <?php foreach ($products as $idx => $p): ?>
        <div class="product-card-3d-wrap h-full flex flex-col">
          <div
            class="product-card-3d group relative bg-white rounded-[28px] border border-black/5 p-7 shadow-sm hover:shadow-2xl flex flex-col justify-between overflow-visible cursor-pointer h-full min-h-[440px]"
            data-product-id="<?= $p['id'] ?>"
          >
            <!-- Top Accent Pill Badge & Number -->
            <div class="flex items-center justify-between pb-3 pointer-events-none z-20">
              <span class="inline-block text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs" style="background-color: <?= $p['badge_bg'] ?>; color: <?= $p['badge_color'] ?>;">
                <?= $p['badge'] ?>
              </span>
              <span class="font-mono text-[11px] font-bold text-[#D4AF37]">
                0<?= $idx + 1 ?>
              </span>
            </div>

            <!-- Product Image Centered with Full Tag Clearance -->
            <div class="relative w-full h-48 my-3 flex items-center justify-center overflow-visible pointer-events-none">
              <img
                src="<?= $p['image'] ?>"
                alt="<?= $p['name'] ?>"
                class="product-card-img w-auto h-48 max-h-52 max-w-full object-contain z-30 pointer-events-none"
                style="filter: drop-shadow(0 18px 24px rgba(0, 0, 0, 0.18));"
              >

              <!-- Soft Dynamic Floor Contact Shadow -->
              <div class="product-card-shadow absolute bottom-0 w-24 h-4 rounded-full bg-black/15 blur-sm pointer-events-none opacity-20"></div>
            </div>

            <!-- Product Info -->
            <div class="mt-auto pointer-events-none">
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#8A7F73] block mb-1">
                <?= strtoupper($p['format']) ?> • <?= strtoupper($p['origin']) ?>
              </span>

              <h3 class="font-serif text-2xl font-bold text-noir-900 tracking-tight mb-4">
                <?= $p['name'] ?>
              </h3>
            </div>

            <!-- Bottom Row: Price + Notes Pill + (+) Add Button -->
            <div class="pt-4 border-t border-black/5 flex items-center justify-between z-30">
              <span class="font-serif text-2xl font-extrabold text-noir-900">
                $<?= number_format($p['price'], 2) ?>
              </span>

              <div class="flex items-center gap-2">
                <button
                  class="notes-trigger-btn px-3.5 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-black/5 border border-black/10 text-xs font-semibold text-noir-800 transition-colors shadow-sm"
                  data-product-id="<?= $p['id'] ?>"
                  data-cursor="NOTES"
                >
                  Notes
                </button>

                <button
                  class="card-add-btn w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md active:scale-90 bg-noir-900 hover:bg-noir-800 text-cream-50 hover:scale-110"
                  data-product-id="<?= $p['id'] ?>"
                  aria-label="Add to Tasting Box"
                  data-cursor="ADD"
                >
                  <i data-lucide="plus" class="w-4 h-4 font-bold"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Tasting Notes Modal Popup -->
<div id="notes-modal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm hidden animate-fadeIn">
  <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-black/10">
    <button id="notes-modal-close" class="absolute top-6 right-6 w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>

    <div class="flex items-center gap-3 mb-4">
      <img id="notes-modal-img" src="assets/products/alphonso-mango-cone.png" alt="Product" class="w-16 h-16 object-contain">
      <div>
        <span id="notes-modal-category" class="text-[10px] uppercase font-bold text-[#8A7F73]">Category</span>
        <h4 id="notes-modal-title" class="font-serif text-2xl font-bold text-noir-900">Product Name</h4>
      </div>
    </div>

    <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-black/5 mb-6">
      <p id="notes-modal-tagline" class="text-xs text-noir-700 font-medium mb-3">Tagline</p>
      <div id="notes-modal-pills" class="flex flex-wrap gap-2"></div>
    </div>

    <div class="flex items-center justify-between pt-2">
      <span id="notes-modal-price" class="font-serif text-2xl font-bold">$8.50</span>
      <button id="notes-modal-add-btn" class="bg-noir-900 hover:bg-noir-800 text-white px-6 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all">
        Add to Tasting Box
      </button>
    </div>
  </div>
</div>
