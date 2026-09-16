/**
 * Dairy Classics - Master 3D Luxury Interactive Engine with Live Product Switcher & Revolving Ingredients
 */

document.addEventListener('DOMContentLoaded', () => {
  // Use global dataset injected from PHP or fallback
  const products = window.PRODUCTS_DATA || [
    {
      id: 'vanilla-royale',
      number: '01',
      name: 'French Vanilla Royale',
      category: 'Signature Splash Tub',
      tagline: 'Bourbon Vanilla Scoop • Floating Lid • Vanilla Blossoms',
      price: 9.50,
      image: 'assets/products/french-vanilla-royale-tub.png',
      color_hex: '#D4AF37',
      bg_gradient: 'radial-gradient(circle at 60% 40%, #FFF9EE 0%, #F8E8CD 55%, #F7F2EA 100%)',
      notes: ['Madagascar Vanilla', 'Bourbon Orchid', 'Velvet Sweet Cream'],
      revolving_ingredients: [
        'assets/ingredients/mint-leaf.png',
        'assets/ingredients/roasted-almond.png',
        'assets/ingredients/chocolate-curl.png',
        'assets/ingredients/roasted-almond.png',
      ],
      format: '500ml Splash Tub',
      origin: 'Madagascar & France',
      temperature: '-14°C',
    },
    {
      id: 'belgian-chocolate',
      number: '02',
      name: 'Belgian Chocolate',
      category: 'Master Splash Tub',
      tagline: 'Dark Cocoa Scoop • Molten Cacao Drizzle • Fresh Mint',
      price: 9.50,
      image: 'assets/products/belgian-chocolate-splash-tub.png',
      color_hex: '#3B1F14',
      bg_gradient: 'radial-gradient(circle at 60% 40%, #F5ECE5 0%, #E2D2C3 55%, #F7F3EE 100%)',
      notes: ['85% Dark Cacao', 'Molten Cacao Drizzle', 'Wild Mint'],
      revolving_ingredients: [
        'assets/ingredients/chocolate-chunk.png',
        'assets/ingredients/mint-leaf.png',
        'assets/ingredients/chocolate-curl.png',
        'assets/ingredients/chocolate-chunk.png',
      ],
      format: '500ml Splash Tub',
      origin: 'Brussels, Belgium',
      temperature: '-14°C',
    },
    {
      id: 'mint-pistachio',
      number: '03',
      name: 'Mint Pistachio Crunch',
      category: 'Artisanal Splash Tub',
      tagline: 'Roasted Pistachios • Peppermint Splash • Cocoa Bits',
      price: 9.50,
      image: 'assets/products/mint-pistachio-crunch-tub.png',
      color_hex: '#476342',
      bg_gradient: 'radial-gradient(circle at 60% 40%, #EBF6ED 0%, #D4EED8 55%, #F6FAF7 100%)',
      notes: ['Bronte Pistachios', 'Fresh Mint Splash', 'Dark Cocoa Crunch'],
      revolving_ingredients: [
        'assets/ingredients/mint-leaf.png',
        'assets/ingredients/roasted-almond.png',
        'assets/ingredients/chocolate-chunk.png',
        'assets/ingredients/mint-leaf.png',
      ],
      format: '500ml Splash Tub',
      origin: 'Bronte, Sicily',
      temperature: '-14°C',
    },
    {
      id: 'mango-cone',
      number: '04',
      name: 'Alphonso Mango',
      category: 'Waffle Cone',
      tagline: 'Double Scoop • Fresh Mango Slice • Wild Mint',
      price: 8.50,
      image: 'assets/products/alphonso-mango-cone.png',
      color_hex: '#F5A623',
      bg_gradient: 'radial-gradient(circle at 60% 40%, #FFF5E3 0%, #FDE4B8 55%, #FAF6EE 100%)',
      notes: ['Ratnagiri Mango', 'Crisp Waffle', 'Wild Mint'],
      revolving_ingredients: [
        'assets/ingredients/mango-cube.png',
        'assets/ingredients/mint-leaf.png',
        'assets/ingredients/chocolate-curl.png',
        'assets/ingredients/mango-cube.png',
      ],
      format: 'Double Scoop Cone',
      origin: 'Ratnagiri, India',
      temperature: '-12°C',
    },
    {
      id: 'strawberry-velvet',
      number: '05',
      name: 'Strawberry Velvet',
      category: 'Ice Cream Bar',
      tagline: 'Velvety & Fruity • Pure Indulgence',
      price: 7.50,
      image: 'assets/products/strawberry-velvet-bar.png',
      color_hex: '#D6335C',
      bg_gradient: 'radial-gradient(circle at 60% 40%, #FDF0F3 0%, #F8CAD4 55%, #FAF6F7 100%)',
      notes: ['Wild Strawberries', 'Ruby Coating', 'Velvet Cream'],
      revolving_ingredients: [
        'assets/ingredients/strawberry-slice.png',
        'assets/ingredients/mint-leaf.png',
        'assets/ingredients/chocolate-curl.png',
        'assets/ingredients/strawberry-slice.png',
      ],
      format: 'Ruby Crunch Bar',
      origin: 'Kyoto, Japan',
      temperature: '-18°C',
    },
  ];

  let currentHeroProduct = products[0];
  let currentCarouselIndex = 0;
  let cart = [
    { product: products[0], quantity: 2 },
    { product: products[1], quantity: 1 },
  ];

  // 1. Initialize Background Ambient 3D Particle Field
  init3DParticleBackground();

  // 2. Custom Cursor Follower
  initCustomCursor();

  // 3. Navigation Header Scroll Effect
  initNavScroll();

  // 4. Hero Stage 3D Inertia Tilt & Live Switcher
  initHeroStage();

  // 5. Product Studio 3D Carousel / Slider
  initCarouselSlider();

  // 6. Interactive 3D Pop-Out Tilt Cards (Fresh Churned Lineup)
  init3DProductCards();

  // 7. Interactive 3D Gallery Cards
  init3DGalleryCards();

  // 8. Tasting Notes Modal
  initNotesModal();

  // 9. Cart / Tasting Box Drawer
  initCartDrawer();

  // 10. Mobile Menu
  initMobileMenu();

  // 11. GSAP ScrollTrigger 3D Reveals
  initScrollTrigger3D();

  // 12. 6 Category Pillars Tab Switcher
  initCategoryPillars();

  // 13. Official FAQs Accordion
  initFaqAccordion();

  /* ==========================================================================
     1. THREE.JS GLOBAL 3D AMBIENT BACKGROUND
     ========================================================================== */
  function init3DParticleBackground() {
    const canvas = document.getElementById('bg-particle-canvas');
    if (!canvas || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const count = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const gold = new THREE.Color('#D4AF37');
    const cream = new THREE.Color('#FFF8EE');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;

      const c = Math.random() > 0.5 ? gold : cream;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const particleMesh = new THREE.Points(geometry, material);
    scene.add(particleMesh);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouseY = (e.clientY / window.innerHeight - 0.5) * -0.8;
    });

    function animate() {
      requestAnimationFrame(animate);
      particleMesh.rotation.y += 0.0005;
      particleMesh.rotation.x += 0.0002;
      camera.position.x += (mouseX - camera.position.x) * 0.04;
      camera.position.y += (mouseY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* ==========================================================================
     2. CUSTOM ARTISANAL ICE CREAM SCOOP CURSOR
     ========================================================================== */
  function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');
    const scoopBall = document.getElementById('scoop-ice-cream-ball');
    const reactionPill = document.getElementById('scoop-reaction-pill');
    if (!cursor || !follower || window.matchMedia('(pointer: coarse)').matches) return;

    let posX = -100, posY = -100;
    let folX = -100, folY = -100;
    let isEating = false;
    let crumbThrottle = 0;

    const reactions = ['YUM! 🍦', 'SCOOP! 🥄', 'CRUNCH! ✨', 'TASTY! 😋', 'DELICIOUS! 🌟'];

    window.addEventListener('mousemove', (e) => {
      posX = e.clientX;
      posY = e.clientY;
      // Scoop spoon bowl hotspot is at top-left
      cursor.style.transform = `translate3d(${posX - 10}px, ${posY - 10}px, 0)`;

      // Spawn tasty micro-crumbs when scooping over ice cream
      if (isEating && Date.now() - crumbThrottle > 140) {
        crumbThrottle = Date.now();
        spawnScoopCrumbs(posX, posY);
      }
    });

    function loop() {
      folX += (posX - folX) * 0.18;
      folY += (posY - folY) * 0.18;
      follower.style.transform = `translate3d(${folX}px, ${folY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    function spawnScoopCrumbs(x, y, color = '#D4AF37') {
      for (let i = 0; i < 3; i++) {
        const crumb = document.createElement('div');
        crumb.className = 'scoop-crumb';
        const size = Math.random() * 5 + 3;
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 32 + 12;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;

        crumb.style.width = `${size}px`;
        crumb.style.height = `${size}px`;
        crumb.style.left = `${x}px`;
        crumb.style.top = `${y}px`;
        crumb.style.backgroundColor = color;
        crumb.style.setProperty('--tx', `${tx}px`);
        crumb.style.setProperty('--ty', `${ty}px`);

        document.body.appendChild(crumb);
        setTimeout(() => crumb.remove(), 700);
      }
    }

    // Ice Cream Targets (Scooping & Extraction Animation)
    const iceCreamSelectors = [
      '.product-card-3d',
      '.gallery-item-card',
      '#hero-3d-stage',
      '.coverflow-card',
      '.product-card-img',
      '.carousel-hero-product-img',
      'img[src*="products"]'
    ];

    document.querySelectorAll(iceCreamSelectors.join(', ')).forEach((el) => {
      el.addEventListener('mouseenter', (e) => {
        isEating = true;
        cursor.classList.add('scoop-eating');
        follower.classList.add('scoop-eating-follower');

        // Random reaction pill text
        if (reactionPill) {
          reactionPill.textContent = reactions[Math.floor(Math.random() * reactions.length)];
        }

        // Set scoop ice cream color based on nearest product or element data
        const prodId = el.getAttribute('data-product-id') || el.closest('[data-product-id]')?.getAttribute('data-product-id');
        let scoopColor = '#FFF4D6';
        if (prodId && window.PRODUCTS_DATA) {
          const pData = window.PRODUCTS_DATA.find(p => p.id === prodId);
          if (pData) scoopColor = pData.color_hex || pData.secondary_color || '#FFF4D6';
        }
        if (scoopBall) {
          scoopBall.setAttribute('fill', scoopColor);
        }

        // Scoop Extraction Splash
        spawnScoopCrumbs(e.clientX, e.clientY, scoopColor);

        // Subtle realistic scoop dip bounce on the hovered ice cream product
        const img = el.querySelector('img') || (el.tagName === 'IMG' ? el : null);
        if (img && window.gsap) {
          gsap.fromTo(img, 
            { scale: 0.96, rotate: -2 }, 
            { scale: 1, rotate: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.4)' }
          );
        }
      });

      el.addEventListener('mouseleave', () => {
        isEating = false;
        cursor.classList.remove('scoop-eating');
        follower.classList.remove('scoop-eating-follower');
      });

      // Quick bite chomp on click
      el.addEventListener('click', (e) => {
        spawnScoopCrumbs(e.clientX, e.clientY, '#D4AF37');
        if (window.confetti && Math.random() > 0.4) {
          confetti({
            particleCount: 20,
            spread: 55,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
            colors: ['#D4AF37', '#FFF4D6', '#8C5A2B', '#E5C058'],
            ticks: 55,
            gravity: 1.1,
            scalar: 0.75
          });
        }
      });
    });

    // Standard clickable links / buttons hover tilt
    document.querySelectorAll('button, a, input, select, textarea').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (!isEating) {
          cursor.classList.add('scoop-hover-link');
          follower.style.transform += ' scale(1.35)';
          follower.style.borderColor = '#D4AF37';
        }
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('scoop-hover-link');
        follower.style.borderColor = 'oklch(25% 0.075 40 / 0.35)';
      });
    });
  }

  /* ==========================================================================
     3. NAVIGATION SCROLL
     ========================================================================== */
  function initNavScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('bg-[#FAF8F5]/90', 'backdrop-blur-md', 'shadow-sm', 'py-3.5');
        header.classList.remove('py-6', 'bg-transparent');
      } else {
        header.classList.remove('bg-[#FAF8F5]/90', 'backdrop-blur-md', 'shadow-sm', 'py-3.5');
        header.classList.add('py-6', 'bg-transparent');
      }
    });
  }

  /* ==========================================================================
     4. HERO STAGE 3D INERTIA TILT & LIVE PRODUCT SWITCHER ENGINE
     ========================================================================== */
  function initHeroStage() {
    const heroSection = document.getElementById('hero');
    const heroTitle = document.getElementById('hero-title');
    const heroTagline = document.getElementById('hero-tagline');
    const heroCategory = document.getElementById('hero-category-label');
    const heroPrice = document.getElementById('hero-price-text');
    const heroNotes = document.getElementById('hero-notes-pills');
    const heroImg = document.getElementById('hero-main-img');
    const heroWatermark = document.getElementById('hero-watermark');
    const heroMetaTemp = document.getElementById('hero-meta-temp');
    const heroMetaOrigin = document.getElementById('hero-meta-origin');
    const heroBottomCount = document.getElementById('hero-bottom-count');
    const heroAddBtn = document.getElementById('hero-add-btn');
    const tiltWrapper = document.getElementById('hero-tilt-wrapper');
    const tiltStage = document.getElementById('hero-3d-stage');
    const revolvingStage = document.getElementById('hero-revolving-stage');

    // Revolving ingredient image elements
    const revImg1 = document.getElementById('revolve-img-1');
    const revImg2 = document.getElementById('revolve-img-2');
    const revImg3 = document.getElementById('revolve-img-3');
    const revImg4 = document.getElementById('revolve-img-4');

    const revWrap1 = document.getElementById('revolve-wrap-1');
    const revWrap2 = document.getElementById('revolve-wrap-2');
    const revWrap3 = document.getElementById('revolve-wrap-3');
    const revWrap4 = document.getElementById('revolve-wrap-4');

    function updateHero(product) {
      if (!product) return;
      currentHeroProduct = product;

      if (heroSection) heroSection.style.background = product.bg_gradient || product.bgGradient;
      if (heroTitle) heroTitle.textContent = product.name;
      if (heroTagline) heroTagline.textContent = product.tagline;
      if (heroCategory) heroCategory.textContent = `Dairy Classics // ${product.category}`;
      if (heroPrice) heroPrice.textContent = `Add to Box • $${parseFloat(product.price).toFixed(2)}`;
      if (heroWatermark) heroWatermark.textContent = product.name.toUpperCase();
      if (heroMetaTemp) heroMetaTemp.textContent = product.temperature;
      if (heroMetaOrigin) heroMetaOrigin.textContent = product.origin;
      if (heroBottomCount) heroBottomCount.textContent = `${product.number} / 05 CREATIONS`;

      // Update 3D Revolving Ingredient Images
      const ingList = product.revolving_ingredients || product.revolvingIngredients;
      if (ingList && ingList.length >= 4) {
        if (window.gsap) {
          gsap.to([revWrap1, revWrap2, revWrap3, revWrap4], {
            scale: 0.5,
            opacity: 0.3,
            duration: 0.2,
            onComplete: () => {
              if (revImg1) revImg1.src = ingList[0];
              if (revImg2) revImg2.src = ingList[1];
              if (revImg3) revImg3.src = ingList[2];
              if (revImg4) revImg4.src = ingList[3];

              gsap.to([revWrap1, revWrap2, revWrap3, revWrap4], {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(1.6)',
                stagger: 0.05,
              });
            },
          });
        } else {
          if (revImg1) revImg1.src = ingList[0];
          if (revImg2) revImg2.src = ingList[1];
          if (revImg3) revImg3.src = ingList[2];
          if (revImg4) revImg4.src = ingList[3];
        }
      }

      // Update Main Product Image
      if (heroImg) {
        heroImg.src = product.image;
        heroImg.alt = product.name;

        if (window.gsap) {
          gsap.fromTo(
            heroImg,
            { opacity: 0, scale: 0.8, rotateY: 25, z: -50 },
            { opacity: 1, scale: 1, rotateY: 0, z: 40, duration: 0.6, ease: 'power3.out' }
          );
        }
      }

      if (heroNotes && product.notes) {
        heroNotes.innerHTML = product.notes
          .map(
            (n) =>
              `<span class="text-[11px] px-3.5 py-1.5 rounded-full bg-white/80 border border-black/5 text-noir-800 font-medium shadow-sm">${n}</span>`
          )
          .join('');
      }

      document.querySelectorAll('.hero-tab-btn').forEach((btn) => {
        if (btn.dataset.productId === product.id) {
          btn.className =
            'hero-tab-btn flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 bg-noir-900 text-cream-50 shadow-md scale-105';
        } else {
          btn.className =
            'hero-tab-btn flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 bg-white/70 text-noir-700 hover:bg-white border border-black/10';
        }
      });
    }

    // Attach click listeners to all switcher tabs
    document.querySelectorAll('.hero-tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.dataset.productId;
        const p = products.find((x) => x.id === targetId);
        if (p) {
          updateHero(p);
        }
      });
    });

    if (heroAddBtn) {
      heroAddBtn.addEventListener('click', () => {
        addToCart(currentHeroProduct);
      });
    }

    // High Precision 3D Parallax Tilt on Product & Revolving System
    if (tiltStage && tiltWrapper) {
      let targetRotX = 0, targetRotY = 0;
      let currentRotX = 0, currentRotY = 0;

      tiltStage.addEventListener('mousemove', (e) => {
        const rect = tiltStage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        targetRotY = x * 26;
        targetRotX = -y * 26;

        if (heroWatermark) {
          heroWatermark.style.transform = `translate(calc(-50% + ${-x * 35}px), calc(-50% + ${-y * 35}px))`;
        }

        if (revolvingStage) {
          revolvingStage.style.transform = `rotateX(${-y * 18}deg) rotateY(${x * 18}deg) translateZ(10px)`;
        }
      });

      tiltStage.addEventListener('mouseleave', () => {
        targetRotX = 0;
        targetRotY = 0;
        if (heroWatermark) {
          heroWatermark.style.transform = 'translate(-50%, -50%)';
        }
        if (revolvingStage) {
          revolvingStage.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        }
      });

      function renderTilt() {
        currentRotX += (targetRotX - currentRotX) * 0.12;
        currentRotY += (targetRotY - currentRotY) * 0.12;
        tiltWrapper.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
        requestAnimationFrame(renderTilt);
      }
      renderTilt();
    }
  }

  /* ==========================================================================
     5. PRODUCT STUDIO 3D COVERFLOW & REVOLVING PARTICLES ENGINE
     ========================================================================== */
  function initCarouselSlider() {
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    const addBtn = document.getElementById('carousel-add-btn');
    const cardLeft = document.getElementById('carousel-card-left');
    const cardRight = document.getElementById('carousel-card-right');
    const leftImg = document.getElementById('carousel-left-img');
    const leftName = document.getElementById('carousel-left-name');
    const rightImg = document.getElementById('carousel-right-img');
    const rightName = document.getElementById('carousel-right-name');

    const mainImg = document.getElementById('carousel-main-img');
    const title = document.getElementById('carousel-title');
    const category = document.getElementById('carousel-category');
    const tagline = document.getElementById('carousel-tagline');
    const badge = document.getElementById('carousel-badge');
    const notesPills = document.getElementById('carousel-notes-pills');
    const price = document.getElementById('carousel-price');
    const countIndex = document.getElementById('carousel-current-index');
    const glow = document.getElementById('carousel-glow');
    const pedestal = document.getElementById('carousel-pedestal-ring');
    const viewport = document.getElementById('carousel-3d-viewport');
    const tiltWrapper = document.getElementById('carousel-tilt-wrapper');
    const orbitSystem = document.getElementById('carousel-orbit-system');

    // Revolving ingredient items
    const revImg1 = document.getElementById('carousel-rev-img-1');
    const revImg2 = document.getElementById('carousel-rev-img-2');
    const revImg3 = document.getElementById('carousel-rev-img-3');
    const revImg4 = document.getElementById('carousel-rev-img-4');

    const revWrap1 = document.getElementById('carousel-rev-wrap-1');
    const revWrap2 = document.getElementById('carousel-rev-wrap-2');
    const revWrap3 = document.getElementById('carousel-rev-wrap-3');
    const revWrap4 = document.getElementById('carousel-rev-wrap-4');

    function updateCarousel(idx, direction = 1) {
      currentCarouselIndex = (idx + products.length) % products.length;
      const prevIdx = (currentCarouselIndex - 1 + products.length) % products.length;
      const nextIdx = (currentCarouselIndex + 1) % products.length;

      const currProduct = products[currentCarouselIndex];
      const prevProduct = products[prevIdx];
      const nextProduct = products[nextIdx];

      // Update Center Meta
      if (title) title.textContent = currProduct.name;
      if (category) category.textContent = `${currProduct.number} // ${currProduct.category}`;
      if (tagline) tagline.textContent = currProduct.tagline;
      if (badge) badge.textContent = currProduct.badge || 'SIGNATURE BLEND';
      if (price) price.textContent = `$${parseFloat(currProduct.price).toFixed(2)}`;
      if (countIndex) countIndex.textContent = `0${currentCarouselIndex + 1}`;

      // Update Background Glow & 3D Pedestal
      const color = currProduct.color_hex || currProduct.colorHex || '#F5A623';
      if (glow) glow.style.backgroundColor = color;
      if (pedestal) {
        pedestal.style.borderColor = `${color}88`;
        pedestal.style.background = `radial-gradient(ellipse at center, ${color}55 0%, ${color}15 50%, transparent 75%)`;
        pedestal.style.boxShadow = `0 0 60px 20px ${color}44`;
      }

      // Update Tasting Notes
      if (notesPills && currProduct.notes) {
        notesPills.innerHTML = currProduct.notes
          .map(
            (n) =>
              `<span class="text-xs sm:text-sm px-4 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold border border-white/30 backdrop-blur-md shadow-md transition-colors">${n}</span>`
          )
          .join('');
      }

      // Update 3D Revolving Ingredient Icons for Center Stage
      const ingList = currProduct.revolving_ingredients || currProduct.revolvingIngredients;
      if (ingList && ingList.length >= 4) {
        if (window.gsap) {
          gsap.to([revWrap1, revWrap2, revWrap3, revWrap4], {
            scale: 0.4,
            opacity: 0.2,
            duration: 0.2,
            onComplete: () => {
              if (revImg1) revImg1.src = ingList[0];
              if (revImg2) revImg2.src = ingList[1];
              if (revImg3) revImg3.src = ingList[2];
              if (revImg4) revImg4.src = ingList[3];

              gsap.to([revWrap1, revWrap2, revWrap3, revWrap4], {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(1.6)',
                stagger: 0.04,
              });
            },
          });
        } else {
          if (revImg1) revImg1.src = ingList[0];
          if (revImg2) revImg2.src = ingList[1];
          if (revImg3) revImg3.src = ingList[2];
          if (revImg4) revImg4.src = ingList[3];
        }
      }

      // Update Left Preview Card
      if (leftImg) {
        leftImg.src = prevProduct.image;
        leftImg.alt = prevProduct.name;
      }
      if (leftName) leftName.textContent = prevProduct.name;

      // Update Right Preview Card
      if (rightImg) {
        rightImg.src = nextProduct.image;
        rightImg.alt = nextProduct.name;
      }
      if (rightName) rightName.textContent = nextProduct.name;

      // Center Product Image 3D Morph Animation
      if (mainImg) {
        mainImg.src = currProduct.image;
        mainImg.alt = currProduct.name;
        mainImg.style.filter = `drop-shadow(0 36px 48px ${color}66)`;

        if (window.gsap) {
          gsap.fromTo(
            mainImg,
            {
              opacity: 0,
              scale: 0.85,
              rotateY: direction * 40,
              z: -80,
              x: direction * 60,
            },
            {
              opacity: 1,
              scale: 1.18,
              rotateY: 0,
              z: 55,
              x: 0,
              duration: 0.7,
              ease: 'power3.out',
            }
          );
        }
      }

      // Update Thumbnails Active States with High Clarity
      document.querySelectorAll('.carousel-thumb-btn').forEach((btn) => {
        const btnIdx = parseInt(btn.dataset.index);
        if (btnIdx === currentCarouselIndex) {
          btn.className =
            'carousel-thumb-btn group flex items-center gap-3 p-2 px-4 rounded-2xl border transition-all duration-300 bg-white/25 border-[#E5C378] ring-1 ring-[#E5C378] scale-105 shadow-xl';
        } else {
          btn.className =
            'carousel-thumb-btn group flex items-center gap-3 p-2 px-4 rounded-2xl border transition-all duration-300 bg-white/10 border-white/15 hover:bg-white/20 hover:border-white/30';
        }
      });
    }

    // Auto-Slide Engine (Slides automatically every 3.5 seconds)
    let autoSlideTimer = null;
    const AUTO_SLIDE_DELAY = 3500;

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(() => {
        updateCarousel(currentCarouselIndex + 1, 1);
      }, AUTO_SLIDE_DELAY);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    // Navigation Buttons with Auto-Slide Reset
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        updateCarousel(currentCarouselIndex - 1, -1);
        resetAutoSlide();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        updateCarousel(currentCarouselIndex + 1, 1);
        resetAutoSlide();
      });
    }

    // Coverflow Left & Right Card Clicks with Auto-Slide Reset
    if (cardLeft) {
      cardLeft.addEventListener('click', () => {
        updateCarousel(currentCarouselIndex - 1, -1);
        resetAutoSlide();
      });
    }
    if (cardRight) {
      cardRight.addEventListener('click', () => {
        updateCarousel(currentCarouselIndex + 1, 1);
        resetAutoSlide();
      });
    }

    // Thumbnail Clicks with Auto-Slide Reset
    document.querySelectorAll('.carousel-thumb-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        const dir = idx > currentCarouselIndex ? 1 : -1;
        updateCarousel(idx, dir);
        resetAutoSlide();
      });
    });

    // Add to Cart from Carousel
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        addToCart(products[currentCarouselIndex]);
        resetAutoSlide();
      });
    }

    // Pause only when user switches browser tab
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    });

    // 3D Gyroscope Mouse Parallax on Stage
    if (viewport && tiltWrapper) {
      let targetRotX = 0, targetRotY = 0;
      let curRotX = 0, curRotY = 0;

      viewport.addEventListener('mousemove', (e) => {
        const rect = viewport.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        targetRotY = x * 24;
        targetRotX = -y * 24;

        if (orbitSystem) {
          orbitSystem.style.transform = `rotateX(${-y * 16}deg) rotateY(${x * 16}deg) translateZ(15px)`;
        }
      });

      viewport.addEventListener('mouseleave', () => {
        targetRotX = 0;
        targetRotY = 0;
        if (orbitSystem) {
          orbitSystem.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        }
      });

      function renderCarouselTilt() {
        curRotX += (targetRotX - curRotX) * 0.12;
        curRotY += (targetRotY - curRotY) * 0.12;
        tiltWrapper.style.transform = `rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg)`;
        requestAnimationFrame(renderCarouselTilt);
      }
      renderCarouselTilt();
    }

    // Touch Swipe Support with Auto-Slide Reset
    if (viewport) {
      let touchStartX = 0;
      let touchEndX = 0;

      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 45) {
          if (diff > 0) {
            updateCarousel(currentCarouselIndex + 1, 1);
          } else {
            updateCarousel(currentCarouselIndex - 1, -1);
          }
        }
        startAutoSlide();
      }, { passive: true });
    }

    // Initialize 3D Coverflow first state & Start Auto-Slide
    updateCarousel(0, 1);
    startAutoSlide();
  }

  /* ==========================================================================
     6. INTERACTIVE 3D POP-OUT CARDS (FRESH CHURNED LINEUP)
     ========================================================================== */
  function init3DProductCards() {
    const cards = document.querySelectorAll('.product-card-3d');

    cards.forEach((card) => {
      const img = card.querySelector('.product-card-img');
      const shadow = card.querySelector('.product-card-shadow');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        card.style.setProperty('--mouse-x', `${percentX}%`);
        card.style.setProperty('--mouse-y', `${percentY}%`);

        const rotateX = ((y - centerY) / centerY) * -14;
        const rotateY = ((x - centerX) / centerX) * 14;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;

        if (img) {
          const shiftX = ((x - centerX) / centerX) * 10;
          img.style.transform = `translateY(-18px) translateX(${shiftX.toFixed(1)}px) scale(1.12)`;
          img.style.filter = 'drop-shadow(0 24px 32px rgba(0, 0, 0, 0.24))';
        }

        if (shadow) {
          shadow.style.transform = `scale(1.35) translateY(8px) translateX(${((x - centerX) / centerX) * -8}px)`;
          shadow.style.opacity = '0.35';
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        if (img) {
          img.style.transform = 'translateY(0px) translateX(0px) scale(1)';
          img.style.filter = 'drop-shadow(0 18px 24px rgba(0, 0, 0, 0.18))';
        }
        if (shadow) {
          shadow.style.transform = 'scale(1) translateY(0px) translateX(0px)';
          shadow.style.opacity = '0.20';
        }
      });
    });
  }

  /* ==========================================================================
     7. INTERACTIVE 3D GALLERY CARDS
     ========================================================================== */
  function init3DGalleryCards() {
    const galleryCards = document.querySelectorAll('.gallery-item-card');

    galleryCards.forEach((card) => {
      const img = card.querySelector('.gallery-card-img');
      const shadow = card.querySelector('.gallery-card-shadow');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const shiftX = x * 8;

        const rotateX = -y * 14;
        const rotateY = x * 14;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
        
        if (img) {
          img.style.transform = `translateY(-14px) translateX(${shiftX.toFixed(1)}px) scale(1.1)`;
          img.style.filter = 'drop-shadow(0 20px 26px rgba(0, 0, 0, 0.22))';
        }

        if (shadow) {
          shadow.style.transform = `scale(1.3) translateY(6px) translateX(${(-x * 6).toFixed(1)}px)`;
          shadow.style.opacity = '0.35';
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        
        if (img) {
          img.style.transform = 'translateY(0px) translateX(0px) scale(1)';
          img.style.filter = 'drop-shadow(0 8px 12px rgba(0, 0, 0, 0.12))';
        }

        if (shadow) {
          shadow.style.transform = 'scale(1) translateY(0px) translateX(0px)';
          shadow.style.opacity = '0.15';
        }
      });

      // Clicking card triggers Tasting Notes Modal
      card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          const p = products.find((x) => x.id === card.dataset.productId);
          if (p) {
            const btn = card.querySelector('.notes-trigger-btn');
            if (btn) btn.click();
          }
        }
      });
    });
  }

  /* ==========================================================================
     8. TASTING NOTES MODAL
     ========================================================================== */
  function initNotesModal() {
    const modal = document.getElementById('notes-modal');
    const closeBtn = document.getElementById('notes-modal-close');
    const modalImg = document.getElementById('notes-modal-img');
    const modalTitle = document.getElementById('notes-modal-title');
    const modalCat = document.getElementById('notes-modal-category');
    const modalTag = document.getElementById('notes-modal-tagline');
    const modalPills = document.getElementById('notes-modal-pills');
    const modalPrice = document.getElementById('notes-modal-price');
    const modalAddBtn = document.getElementById('notes-modal-add-btn');

    let currentNotesProduct = null;

    document.querySelectorAll('.notes-trigger-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const p = products.find((x) => x.id === btn.dataset.productId);
        if (!p) return;

        currentNotesProduct = p;
        modalImg.src = p.image;
        modalTitle.textContent = p.name;
        modalCat.textContent = p.category;
        modalTag.textContent = p.tagline;
        modalPrice.textContent = `$${parseFloat(p.price).toFixed(2)}`;

        modalPills.innerHTML = p.notes
          .map(
            (n) =>
              `<span class="text-[10px] px-3 py-1.5 rounded-full bg-white border border-black/5 text-noir-800 font-semibold shadow-sm">${n}</span>`
          )
          .join('');

        modal.classList.remove('hidden');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    }

    if (modalAddBtn) {
      modalAddBtn.addEventListener('click', () => {
        if (currentNotesProduct) {
          addToCart(currentNotesProduct);
          modal.classList.add('hidden');
        }
      });
    }

    // Card Quick Add Buttons
    document.querySelectorAll('.card-add-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const p = products.find((x) => x.id === btn.dataset.productId);
        if (p) addToCart(p);
      });
    });
  }

  /* ==========================================================================
     9. CART & TASTING BOX BUILDER
     ========================================================================== */
  function initCartDrawer() {
    const drawerContainer = document.getElementById('cart-drawer-container');
    const drawerBackdrop = document.getElementById('cart-drawer-backdrop');
    const drawerClose = document.getElementById('cart-drawer-close');
    const openCartBtn = document.getElementById('open-cart-btn');
    const cartBadge = document.getElementById('cart-badge-count');
    const itemsWrapper = document.getElementById('cart-items-wrapper');
    const totalAmount = document.getElementById('cart-total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');

    function openDrawer() {
      renderCart();
      drawerContainer.classList.remove('hidden');
      drawerContainer.classList.add('flex');
    }

    function closeDrawer() {
      drawerContainer.classList.add('hidden');
      drawerContainer.classList.remove('flex');
    }

    if (openCartBtn) openCartBtn.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    window.addToCart = function (product) {
      const existing = cart.find((item) => item.product.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ product, quantity: 1 });
      }
      updateCartBadge();
      openDrawer();
    };

    function updateCartBadge() {
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      if (cartBadge) cartBadge.textContent = count;
    }

    function renderCart() {
      updateCartBadge();
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      const total = cart.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0);
      if (totalAmount) totalAmount.textContent = `$${total.toFixed(2)}`;

      if (!itemsWrapper) return;

      if (cart.length === 0) {
        itemsWrapper.innerHTML = `
          <div class="flex flex-col items-center justify-center text-center py-12">
            <div class="w-16 h-16 rounded-full bg-noir-900/5 flex items-center justify-center mb-4 text-noir-400">
              <i data-lucide="snowflake" class="w-6 h-6"></i>
            </div>
            <h3 class="font-serif text-xl font-medium">Your Box is Empty</h3>
            <p class="text-xs text-noir-600 mt-1 max-w-xs mb-8">Select your favorite creations to curate a box.</p>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      itemsWrapper.innerHTML = `
        <div class="space-y-6">
          <!-- 4-Slot Progress Bar -->
          <div class="p-4 rounded-2xl bg-white border border-black/5 shadow-sm">
            <div class="flex justify-between items-center text-[10px] uppercase tracking-wider text-noir-600 mb-2">
              <span>Tasting Box Capacity</span>
              <span class="font-bold text-noir-900">${count} / 4 Items</span>
            </div>
            <div class="grid grid-cols-4 gap-2">
              ${[0, 1, 2, 3]
                .map(
                  (slot) =>
                    `<div class="h-2 rounded-full transition-all duration-500 ${
                      slot < count ? 'bg-[#D4AF37] shadow-sm' : 'bg-black/10'
                    }"></div>`
                )
                .join('')}
            </div>
            ${
              count >= 4
                ? `<p class="text-[10px] text-[#476342] font-semibold mt-2.5 flex items-center gap-1">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Complimentary Sub-Zero Cold Vault Packaging Unlocked!
                  </p>`
                : ''
            }
          </div>

          <!-- Items List -->
          <div class="space-y-3">
            ${cart
              .map(
                (item) => `
              <div class="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-center gap-3">
                  <img src="${item.product.image}" alt="${item.product.name}" class="w-11 h-11 object-contain">
                  <div>
                    <h4 class="text-xs font-bold text-noir-900">${item.product.name}</h4>
                    <p class="text-[10px] text-noir-500">${item.product.category}</p>
                    <p class="text-xs font-semibold text-noir-800 mt-0.5">$${(
                      parseFloat(item.product.price) * item.quantity
                    ).toFixed(2)}</p>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <div class="flex items-center border border-black/15 rounded-full px-2 py-0.5 bg-[#FAF8F5]">
                    <button class="cart-qty-btn text-xs font-bold px-1.5 text-noir-600 hover:text-noir-900" data-id="${
                      item.product.id
                    }" data-delta="-1">-</button>
                    <span class="text-xs font-semibold px-2">${item.quantity}</span>
                    <button class="cart-qty-btn text-xs font-bold px-1.5 text-noir-600 hover:text-noir-900" data-id="${
                      item.product.id
                    }" data-delta="1">+</button>
                  </div>
                  <button class="cart-del-btn text-noir-400 hover:text-red-500 p-1.5 transition-colors" data-id="${
                    item.product.id
                  }">
                    <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `;

      if (window.lucide) window.lucide.createIcons();

      // Qty Listeners
      document.querySelectorAll('.cart-qty-btn').forEach((b) => {
        b.addEventListener('click', () => {
          const id = b.dataset.id;
          const delta = parseInt(b.dataset.delta);
          const item = cart.find((x) => x.product.id === id);
          if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
              cart = cart.filter((x) => x.product.id !== id);
            }
            renderCart();
          }
        });
      });

      // Del Listeners
      document.querySelectorAll('.cart-del-btn').forEach((b) => {
        b.addEventListener('click', () => {
          cart = cart.filter((x) => x.product.id !== b.dataset.id);
          renderCart();
        });
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        checkoutBtn.disabled = true;
        checkoutBtn.innerHTML = '<span>Packing Cold Vault...</span>';

        setTimeout(() => {
          checkoutBtn.disabled = false;
          checkoutBtn.innerHTML =
            '<span>Order Tasting Box</span><i data-lucide="sparkles" class="w-4 h-4 text-[#D4AF37]"></i>';
          if (window.lucide) window.lucide.createIcons();

          if (window.confetti) {
            window.confetti({
              particleCount: 140,
              spread: 90,
              origin: { y: 0.6 },
              colors: ['#D4AF37', '#F5A623', '#D6335C', '#4A2E1F', '#221611'],
            });
          }

          itemsWrapper.innerHTML = `
            <div class="flex flex-col items-center justify-center text-center py-12 px-4 animate-fadeIn">
              <div class="w-16 h-16 rounded-full bg-[#476342]/15 flex items-center justify-center text-[#476342] mb-4 shadow-sm">
                <i data-lucide="check-circle-2" class="w-8 h-8"></i>
              </div>
              <span class="text-[10px] uppercase tracking-mega-wide text-[#8A7F73]">Confirmed</span>
              <h3 class="font-serif text-3xl mt-1 mb-2 font-bold">Sub-Zero Vault Dispatched</h3>
              <p class="text-xs text-noir-600 max-w-xs leading-relaxed mb-6">
                Your Dairy Classics ice creams are packed in dry-ice insulated containers at -24°C.
              </p>
              <button id="cart-back-btn" class="bg-noir-900 text-cream-50 px-8 py-3 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-noir-800 transition-all shadow-lg hover:scale-105 active:scale-95">
                Back to Store
              </button>
            </div>
          `;
          if (window.lucide) window.lucide.createIcons();
          cart = [];
          updateCartBadge();

          const backBtn = document.getElementById('cart-back-btn');
          if (backBtn) backBtn.addEventListener('click', closeDrawer);
        }, 1200);
      });
    }
  }

  /* ==========================================================================
     10. MOBILE MENU
     ========================================================================== */
  function initMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const openBtn = document.getElementById('mobile-menu-open-btn');
    const closeBtn = document.getElementById('mobile-menu-close-btn');

    if (openBtn && menu) {
      openBtn.addEventListener('click', () => {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
      });
    }

    if (closeBtn && menu) {
      closeBtn.addEventListener('click', () => {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
      });
    }

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (menu) {
          menu.classList.add('hidden');
          menu.classList.remove('flex');
        }
      });
    });
  }

  /* ==========================================================================
     11. GSAP SCROLLTRIGGER 3D REVEALS
     ========================================================================== */
  function initScrollTrigger3D() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.product-card-3d-wrap').forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }

  /* ==========================================================================
     12. 6 CATEGORY PILLARS TAB SWITCHER
     ========================================================================== */
  function initCategoryPillars() {
    const tabBtns = document.querySelectorAll('.pillar-tab-btn');
    const panels = document.querySelectorAll('.pillar-panel');
    if (!tabBtns.length) return;

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const catKey = btn.dataset.category;

        // Update Buttons
        tabBtns.forEach((b) => {
          if (b.dataset.category === catKey) {
            b.className =
              'pillar-tab-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 bg-noir-900 text-cream-50 shadow-md scale-105';
          } else {
            b.className =
              'pillar-tab-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 text-noir-700 hover:text-noir-900 hover:bg-white/80';
          }
        });

        // Update Panels
        panels.forEach((panel) => {
          if (panel.id === `pillar-panel-${catKey}`) {
            panel.classList.remove('hidden');
            panel.classList.add('block');
            if (window.gsap) {
              gsap.fromTo(panel, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
            }
          } else {
            panel.classList.add('hidden');
            panel.classList.remove('block');
          }
        });
      });
    });
  }

  /* ==========================================================================
     13. OFFICIAL FAQS ACCORDION
     ========================================================================== */
  function initFaqAccordion() {
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    if (!faqTriggers.length) return;

    faqTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const iconWrap = item.querySelector('.faq-icon-wrap');
        const isOpen = answer.classList.contains('faq-open');

        // Close all other items
        document.querySelectorAll('.faq-item').forEach((otherItem) => {
          const otherAns = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon-wrap');
          if (otherAns) {
            otherAns.style.maxHeight = null;
            otherAns.classList.remove('opacity-100', 'faq-open');
            otherAns.classList.add('max-h-0', 'opacity-0');
          }
          if (otherIcon) {
            otherIcon.classList.remove('rotate-180', 'bg-noir-900', 'text-white');
            otherIcon.classList.add('bg-[#FAF8F5]', 'text-noir-700');
          }
        });

        if (!isOpen) {
          answer.classList.remove('max-h-0', 'opacity-0');
          answer.classList.add('opacity-100', 'faq-open');
          answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
          iconWrap.classList.add('rotate-180', 'bg-noir-900', 'text-white');
          iconWrap.classList.remove('bg-[#FAF8F5]', 'text-noir-700');
        }
      });
    });
  }
});
