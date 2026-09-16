<!-- Contact & Inquiry Section -->
<section id="contact" class="relative py-24 md:py-32 px-6 sm:px-10 md:px-16 bg-[#FAF8F5] text-noir-900 border-t border-black/5 select-none overflow-hidden">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto mb-16">
      <span class="inline-block px-4 py-1.5 rounded-full bg-[#FFF3D1] text-[#8C6D12] font-bold text-xs uppercase tracking-widest mb-3">
        CONNECT WITH US
      </span>
      <h2 class="font-serif text-3xl sm:text-5xl font-extrabold text-noir-900 tracking-tight mb-4">
        Got a Craving or a Question?
      </h2>
      <p class="font-sans text-base sm:text-lg text-noir-700 leading-relaxed font-normal">
        Have a question or looking for something special? We’d love to hear from you! Reach out and let’s make every moment delicious.
      </p>
    </div>

    <!-- 2-Column Contact Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
      <!-- Left: Contact Information Card -->
      <div class="lg:col-span-5 text-cream-50 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-white/10" style="background: linear-gradient(135deg, oklch(28% 0.08 40) 0%, oklch(25% 0.075 40) 50%, oklch(18% 0.05 40) 100%);">
        <!-- Ambient Gold Glow -->
        <div class="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none"></div>

        <div>
          <span class="text-[11px] uppercase tracking-widest text-[#D4AF37] font-mono font-bold block mb-2">
            FACTORY HEADQUARTERS
          </span>
          <h3 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
            Dairy Classic Uzbekistan
          </h3>

          <!-- Details List with Exact Live Site Data -->
          <div class="space-y-5 text-sm text-[#E0D7CE]">
            <!-- Address -->
            <div class="flex items-start gap-3.5">
              <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i data-lucide="map-pin" class="w-4 h-4 text-[#D4AF37]"></i>
              </div>
              <div>
                <span class="font-semibold text-white block text-xs uppercase tracking-wider mb-0.5">Factory Location</span>
                <span>БУТ 5, 65M6+H9 Tashkent, Uzbekistan. Factory location. Tashkent</span>
              </div>
            </div>

            <!-- Phones -->
            <div class="flex items-start gap-3.5">
              <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i data-lucide="phone-call" class="w-4 h-4 text-[#D4AF37]"></i>
              </div>
              <div class="space-y-1">
                <span class="font-semibold text-white block text-xs uppercase tracking-wider mb-0.5">Direct Lines</span>
                <div><a href="tel:+998781203377" class="hover:text-white transition-colors">+99878 120 33 77 / 78</a></div>
                <div><a href="tel:+998909922999" class="hover:text-white transition-colors">+998909922999</a></div>
                <div><a href="tel:+998909982019" class="hover:text-white transition-colors">Tashkent: +998 90 998 2019</a></div>
                <div><a href="tel:+998905029292" class="hover:text-white transition-colors">Samarkand: +998 90 502 9292</a></div>
              </div>
            </div>

            <!-- Email -->
            <div class="flex items-start gap-3.5">
              <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i data-lucide="mail" class="w-4 h-4 text-[#D4AF37]"></i>
              </div>
              <div>
                <span class="font-semibold text-white block text-xs uppercase tracking-wider mb-0.5">Email Inquiries</span>
                <a href="mailto:jkapoor@me.com" class="hover:text-white transition-colors">jkapoor@me.com</a>
              </div>
            </div>

            <!-- Opening Hours -->
            <div class="flex items-start gap-3.5">
              <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i data-lucide="clock" class="w-4 h-4 text-[#D4AF37]"></i>
              </div>
              <div>
                <span class="font-semibold text-white block text-xs uppercase tracking-wider mb-0.5">Opening Hours</span>
                <span>Mon - Sat: 09:00 am - 08:00 pm<br>Sun: Closed</span>
              </div>
            </div>
          </div>
        </div>

        <!-- WhatsApp Quick Chat Button -->
        <div class="mt-8 pt-6 border-t border-white/10">
          <a
            href="https://api.whatsapp.com/send?phone=971504748836"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lg active:scale-95"
          >
            <i data-lucide="message-circle" class="w-4 h-4"></i>
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      <!-- Right: Interactive Inquiry Form -->
      <div class="lg:col-span-7 bg-white rounded-[32px] p-8 sm:p-10 border border-black/8 shadow-xl flex flex-col justify-between">
        <div>
          <h3 class="font-serif text-2xl font-bold text-noir-900 mb-2">
            Send Us an Inquiry
          </h3>
          <p class="text-xs text-[#8A7F73] font-medium mb-8">
            Fill in the details below and our team will get back to you promptly.
          </p>

          <form id="contact-form" onsubmit="event.preventDefault(); alert('Thank you for contacting Dairy Classic! We will get back to you shortly.');" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-noir-800 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexander Smirnov"
                  class="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-black/10 focus:border-noir-900 focus:bg-white text-sm outline-none transition-colors"
                >
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-noir-800 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="alexander@example.com"
                  class="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-black/10 focus:border-noir-900 focus:bg-white text-sm outline-none transition-colors"
                >
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-noir-800 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 4567"
                  class="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-black/10 focus:border-noir-900 focus:bg-white text-sm outline-none transition-colors"
                >
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-noir-800 mb-1.5">Interested In</label>
                <select class="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-black/10 focus:border-noir-900 focus:bg-white text-sm outline-none transition-colors">
                  <option>Cones</option>
                  <option>Sticks & Bars</option>
                  <option>Cups</option>
                  <option>Biscuit & Sandwich</option>
                  <option>Cassatta</option>
                  <option>1 Litre Family Tubs</option>
                  <option>Retail / Wholesale Distribution</option>
                  <option>General Feedback</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-noir-800 mb-1.5">City / Region</label>
              <select class="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-black/10 focus:border-noir-900 focus:bg-white text-sm outline-none transition-colors">
                <option>Tashkent</option>
                <option>Samarkand</option>
                <option>Bukhara</option>
                <option>Andijan</option>
                <option>Fergana</option>
                <option>Namangan</option>
                <option>Other / International</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-noir-800 mb-1.5">Your Message *</label>
              <textarea
                rows="4"
                required
                placeholder="Tell us about your catering, distribution, or personal inquiry..."
                class="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-black/10 focus:border-noir-900 focus:bg-white text-sm outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full py-4 rounded-xl bg-noir-900 hover:bg-noir-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Submit Message</span>
              <i data-lucide="send" class="w-4 h-4 text-[#D4AF37]"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
