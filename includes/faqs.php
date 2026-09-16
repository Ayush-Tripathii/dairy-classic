<!-- Official Live FAQs Accordion Section -->
<section id="faqs" class="relative py-24 md:py-32 px-6 sm:px-10 md:px-16 bg-[#FAF8F5] text-noir-900 border-t border-black/5 select-none overflow-hidden">
  <!-- Subtle Ambient Decor -->
  <div class="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#FAF0DE] blur-3xl opacity-60 pointer-events-none"></div>
  <div class="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-[#F5EAD4] blur-3xl opacity-50 pointer-events-none"></div>

  <div class="max-w-4xl mx-auto relative z-10">
    <!-- Header -->
    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF3D1] text-[#8C6D12] text-xs font-bold uppercase tracking-wider mb-3">
        <i data-lucide="help-circle" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
        <span>QUESTIONS & ANSWERS</span>
      </div>
      <h2 class="font-serif text-3xl sm:text-5xl font-extrabold text-noir-900 tracking-tight leading-tight mb-4">
        Frequently Asked Questions
      </h2>
      <p class="font-sans text-base sm:text-lg text-noir-700 max-w-xl mx-auto">
        Everything you need to know about Dairy Classic’s ingredients, production capacity, storage guidelines, and retail availability.
      </p>
    </div>

    <!-- Accordion Items -->
    <div class="space-y-4">
      <?php foreach ($faqList as $fIdx => $faq): ?>
        <div class="faq-item bg-white rounded-2xl border border-black/8 shadow-sm transition-all duration-300 overflow-hidden">
          <button
            class="faq-trigger w-full flex items-center justify-between p-6 text-left focus:outline-none"
            data-index="<?= $fIdx ?>"
            data-cursor="EXPAND"
          >
            <span class="font-serif text-lg font-bold text-noir-900 pr-4 flex items-center gap-3">
              <span class="w-6 h-6 rounded-full bg-[#FAF8F5] border border-black/10 flex items-center justify-center text-xs font-mono text-[#8C6D12] flex-shrink-0">
                <?= sprintf('%02d', $fIdx + 1) ?>
              </span>
              <span><?= htmlspecialchars($faq['q']) ?></span>
            </span>
            <div class="faq-icon-wrap w-8 h-8 rounded-full bg-[#FAF8F5] border border-black/8 flex items-center justify-center text-noir-700 flex-shrink-0 transition-transform duration-300">
              <i data-lucide="chevron-down" class="w-4 h-4"></i>
            </div>
          </button>
          
          <div class="faq-answer max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out px-6">
            <p class="pb-6 text-sm sm:text-base text-noir-700 leading-relaxed font-normal border-t border-black/5 pt-4">
              <?= htmlspecialchars($faq['a']) ?>
            </p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <!-- Need More Help Banner -->
    <div class="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#FFF9EE] via-white to-[#FFF9EE] border border-[#E8D8B0]/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
      <div>
        <h4 class="font-serif text-xl font-bold text-noir-900 mb-1">Have a specific question or custom order?</h4>
        <p class="text-sm text-noir-600 font-normal">Our team in Tashkent and Samarkand is ready to help you.</p>
      </div>
      <a
        href="#contact"
        class="px-6 py-3 rounded-full bg-noir-900 hover:bg-noir-800 text-cream-50 text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 whitespace-nowrap"
        data-cursor="CONTACT"
      >
        <span>Get in Touch</span>
        <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
      </a>
    </div>
  </div>
</section>
