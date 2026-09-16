<!-- Tasting Box Drawer -->
<div id="cart-drawer-container" class="fixed inset-0 z-[9999] justify-end hidden">
  <!-- Backdrop -->
  <div id="cart-drawer-backdrop" class="fixed inset-0 bg-noir-900/60 backdrop-blur-sm transition-opacity"></div>

  <!-- Drawer Body -->
  <div class="relative z-10 w-full max-w-lg bg-[#FAF8F5] text-noir-900 h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
    <!-- Header -->
    <div class="p-6 border-b border-black/10 flex items-center justify-between">
      <div>
        <span class="text-[10px] uppercase tracking-mega-wide text-[#8A7F73]">Dairy Classics</span>
        <h2 class="font-serif text-2xl font-bold">Your Tasting Box</h2>
      </div>
      <button
        id="cart-drawer-close"
        aria-label="Close cart"
        class="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-noir-900 hover:text-white transition-colors"
      >
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    </div>

    <!-- Content -->
    <div id="cart-items-wrapper" class="flex-1 p-6 overflow-y-auto">
      <!-- Injected by JavaScript -->
    </div>

    <!-- Footer -->
    <div id="cart-drawer-footer" class="p-6 border-t border-black/10 bg-white">
      <div class="flex justify-between items-center mb-4 font-serif text-lg font-bold">
        <span>Total</span>
        <span id="cart-total-amount" class="font-mono">$24.50</span>
      </div>

      <button
        id="checkout-btn"
        class="w-full py-4 rounded-full bg-noir-900 hover:bg-noir-800 text-cream-50 text-xs uppercase tracking-widest font-bold transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
        data-cursor="ORDER"
      >
        <span>Order Tasting Box</span>
        <i data-lucide="sparkles" class="w-4 h-4 text-[#D4AF37]"></i>
      </button>
    </div>
  </div>
</div>
