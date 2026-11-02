/* ==========================================================================
   Dairy Classic — site configuration
   Every editable value lives here. main.js reads window.DC_CONFIG and never
   hard-codes copy, colours, contacts or media paths.

   All product names, descriptions, facts and contacts come from the live site
   dairyclassics.com (pages: home, cones, stick, cups, biscuit, cassatta, tubs,
   about, contact-us). All images and the film are taken from dairyclassics.com (the brand's own site).

   Bilingual values are objects: { en: "...", ru: "..." }.
   Plain strings are used as-is in both languages.
   ========================================================================== */

window.DC_CONFIG = {
  defaultLang: 'en',

  brand: {
    name: 'Dairy Classic',
    nameRu: 'Дэйри Классик',
    site: 'dairyclassics.com',
    accent: '#E3A84E',            // accent outside the hero (Golden Fantasy gold)
    founded: 1996,
    logo: 'brand/logo.png',       // real DC pennant logo (cut out from the site's JPG)
  },

  /* ---------- Office hours (site footer: Mon–Sat 09:00–20:00, Sun closed) ---------- */
  office: {
    timeZone: 'Asia/Tashkent',
    open: '09:00',
    close: '20:00',
    days: [1, 2, 3, 4, 5, 6],     // 0 = Sunday … 6 = Saturday
  },
  clocks: [
    { tz: 'Asia/Tashkent', label: { en: 'TASHKENT · FACTORY', ru: 'ТАШКЕНТ · ЗАВОД' }, primary: true },
    { tz: 'Asia/Bishkek',  label: { en: 'BISHKEK · NEW MARKET', ru: 'БИШКЕК · НОВЫЙ РЫНОК' } },
  ],

  /* ---------- Contacts (as published on dairyclassics.com) ---------- */
  contact: {
    phone: '+998 78 120 33 77',
    phoneHref: '+998781203377',
    phone2: '+998 78 120 33 78',
    phone2Href: '+998781203378',
    tashkent: { label: { en: 'Tashkent', ru: 'Ташкент' }, phone: '+998 90 998 20 19', whatsapp: '998909982019' },
    samarkand: { label: { en: 'Samarkand', ru: 'Самарканд' }, phone: '+998 90 502 92 92', whatsapp: '998905029292' },
    telegram: 'DC_Dairy',                    // telegram.me/DC_Dairy (site chat widget)
    email: 'support@dairyclassic.uz',        // About page "EMAIL US"
    address: { en: 'БУТ 5, 65M6+H9, Tashkent, Uzbekistan · Factory', ru: 'БУТ 5, 65M6+H9, Ташкент, Узбекистан · Завод' },
    socials: [
      { name: 'Instagram', url: 'https://www.instagram.com/dairyclassic.uz/', handle: '@dairyclassic.uz' },
      { name: 'Facebook', url: 'https://www.facebook.com/DairyClassicsIceCream/' },
      { name: 'TikTok', url: 'https://www.tiktok.com/@dairyclassic.uz' },
      { name: 'YouTube', url: 'https://www.youtube.com/@dairyclassic.uz.official' },
      { name: 'X', url: 'https://x.com/dairyclassicUz' },
      { name: 'Pinterest', url: 'https://www.pinterest.com/dairyclassic_1990' },
    ],
  },

  /* ---------- Enquiry form ---------- */
  form: {
    endpoint: '',                 // POST JSON here. Empty = local stub (logs payload, shows success)
    countries: [
      { value: 'UZ', label: { en: 'Uzbekistan', ru: 'Узбекистан' } },
      { value: 'KG', label: { en: 'Kyrgyzstan', ru: 'Кыргызстан' } },
      { value: 'AF', label: { en: 'Afghanistan', ru: 'Афганистан' } },
      { value: 'KZ', label: { en: 'Kazakhstan', ru: 'Казахстан' } },
      { value: 'TJ', label: { en: 'Tajikistan', ru: 'Таджикистан' } },
      { value: 'XX', label: { en: 'Other', ru: 'Другая страна' } },
    ],
    businessTypes: [
      { value: 'distributor', label: { en: 'Distributor', ru: 'Дистрибьютор' } },
      { value: 'retailer',    label: { en: 'Store / retailer', ru: 'Магазин' } },
      { value: 'horeca',      label: { en: 'Parlour / café (HoReCa)', ru: 'Кафе-мороженое / кафе (HoReCa)' } },
      { value: 'chain',       label: { en: 'Supermarket chain', ru: 'Сеть супермаркетов' } },
    ],
    volumes: [
      { value: '<50',     label: { en: 'Under 50 cartons / month', ru: 'До 50 коробок в месяц' } },
      { value: '50-200',  label: { en: '50–200 cartons / month', ru: '50–200 коробок в месяц' } },
      { value: '200-1000',label: { en: '200–1,000 cartons / month', ru: '200–1000 коробок в месяц' } },
      { value: '1000+',   label: { en: 'Over 1,000 cartons / month', ru: 'Более 1000 коробок в месяц' } },
    ],
  },

  /* ---------- Media ---------- */
  media: {
    base: 'media',
    mobileBreakpoint: 800,
    heroDesktop: 'hero/{id}-1280.mp4',       // only used when hero.video is true
    heroMobile:  'hero/{id}-720.mp4',
  },

  /* ---------- Hero scrub engine ---------- */
  hero: {
    video: false,           // true = try media/hero/<id>-1280.mp4 clips first; false = shatter the real photos
    vhPerProduct: 120,      // scroll length of each product segment
    lerp: 0.12,             // playhead easing per frame
    holdEnd: 0.18,          // last fraction of each segment holds the burst frame
    productScale: 0.84,     // product photo height as a fraction of the stage
    fetchTimeout: 20000,
  },

  /* ---------- The eight hero products (the site's home-page line-up + Super Bricket) ----------
     name: [upright line, italic line] — second lines are taken from the packs */
  products: [
    {
      id: 'golden-fantasy', word: 'FANTASY', accent: '#E3A84E', icon: 'cone',
      image: 'products/hero-golden-fantasy.webp', imageSm: 'products/hero-golden-fantasy-sm.webp',
      ruName: 'Голден Фэнтези',
      name: { en: ['Golden', 'Fantasy'], ru: ['Голден', 'Фэнтези'] },
      category: { en: 'CONES · MUZQAYMOQ', ru: 'РОЖКИ · MUZQAYMOQ' },
      desc: {
        en: 'Two flavours, vanilla and chocolate, in a crunchy wafer coated with chocolate and roasted peanuts. A surprisingly divine taste.',
        ru: 'Два вкуса, ваниль и шоколад, в хрустящей вафле под шоколадной глазурью с жареным арахисом. Удивительный, просто божественный вкус.',
      },
      notes: { en: 'Vanilla · Chocolate · Roasted peanuts', ru: 'Ваниль · Шоколад · Жареный арахис' },
    },
    {
      id: 'choco-boom', word: 'BOOM', accent: '#C99772', icon: 'cone',
      image: 'products/hero-choco-boom.webp', imageSm: 'products/hero-choco-boom-sm.webp',
      ruName: 'Чоко Бум',
      name: { en: ['Choco', 'Boom'], ru: ['Чоко', 'Бум'] },
      category: { en: 'CONES · MUZQAYMOQ', ru: 'РОЖКИ · MUZQAYMOQ' },
      desc: {
        en: 'Chocolate ice cream in a crunchy wafer, coated with chocolate and crispy roasted peanuts. A distinctive taste for your mood.',
        ru: 'Шоколадное мороженое в хрустящей вафле под шоколадной глазурью с жареным арахисом. Яркий вкус для хорошего настроения.',
      },
      notes: { en: 'Chocolate · Wafer · Roasted peanuts', ru: 'Шоколад · Вафля · Жареный арахис' },
    },
    {
      id: 'super-twist', word: 'TWIST', accent: '#E97FAE', icon: 'cone',
      image: 'products/hero-super-twist.webp', imageSm: 'products/hero-super-twist-sm.webp',
      ruName: 'Супер Твист',
      name: { en: ['Super', 'Twist'], ru: ['Супер', 'Твист'] },
      category: { en: 'CONES · MUZQAYMOQ', ru: 'РОЖКИ · MUZQAYMOQ' },
      desc: {
        en: 'Vanilla ice cream with a raspberry sauce centre in a crunchy chocolate-coated wafer. It has won the hearts of ice cream lovers.',
        ru: 'Ванильное мороженое с малиновым соусом внутри, в хрустящей вафле с шоколадной глазурью. Покорило сердца любителей мороженого.',
      },
      notes: { en: 'Vanilla · Raspberry sauce · Chocolate', ru: 'Ваниль · Малиновый соус · Шоколад' },
    },
    {
      id: 'vega', word: 'VEGA', accent: '#F2D43A', icon: 'stick', scale: 0.82,   // source cut-out is a soft upscale: keep it smaller
      image: 'products/hero-vega.webp', imageSm: 'products/hero-vega-sm.webp',
      ruName: 'Вега',
      name: { en: ['Vega', 'Premium'], ru: ['Вега', 'Премиум'] },
      category: { en: 'STICKS', ru: 'ЭСКИМО' },
      desc: {
        en: 'Vanilla-flavoured premium ice cream coated with luscious crunchy chocolate and crispy roasted peanuts.',
        ru: 'Ванильное мороженое премиум-класса в хрустящей шоколадной глазури с жареным арахисом.',
      },
      notes: { en: 'Vanilla · Chocolate · Roasted peanuts', ru: 'Ваниль · Шоколад · Жареный арахис' },
    },
    {
      id: 'round-pie', word: 'ROUND PIE', accent: '#5DB4F0', icon: 'biscuit',
      image: 'products/hero-round-pie.webp', imageSm: 'products/hero-round-pie-sm.webp',
      ruName: 'Раунд Пай',
      name: { en: ['Round', 'Pie'], ru: ['Раунд', 'Пай'] },
      category: { en: 'BISCUIT', ru: 'С ПЕЧЕНЬЕМ' },
      desc: {
        en: 'An imaginative creation: perfectly round vanilla ice cream with premium cookies, coated with chocolate.',
        ru: 'Оригинальная задумка: идеально круглое ванильное мороженое с печеньем премиум-класса в шоколадной глазури.',
      },
      notes: { en: 'Vanilla · Cookies · Chocolate', ru: 'Ваниль · Печенье · Шоколад' },
    },
    {
      id: 'olino', word: 'OLINO', accent: '#D9B47C', icon: 'biscuit',
      image: 'products/hero-olino.webp', imageSm: 'products/hero-olino-sm.webp',
      ruName: 'Олино',
      name: { en: ['Olino', 'Biscuit'], ru: ['Олино', 'Печенье'] },
      category: { en: 'BISCUIT', ru: 'С ПЕЧЕНЬЕМ' },
      desc: {
        en: 'Biscuit-flavoured ice cream in a perfectly round shape with premium cookies, coated with chocolate.',
        ru: 'Идеально круглое мороженое со вкусом печенья, с печеньем премиум-класса в шоколадной глазури.',
      },
      notes: { en: 'Biscuit flavour · Cookies · Chocolate', ru: 'Вкус печенья · Печенье · Шоколад' },
    },
    {
      id: 'sandwich', word: 'SANDWICH', accent: '#E060C8', icon: 'biscuit',
      image: 'products/hero-sandwich.webp', imageSm: 'products/hero-sandwich-sm.webp',
      ruName: 'Сэндвич',
      name: { en: ['Classic', 'Sandwich'], ru: ['Классик', 'Сэндвич'] },
      category: { en: 'BISCUIT · PLOMBIR', ru: 'С ПЕЧЕНЬЕМ · ПЛОМБИР' },
      desc: {
        en: 'Vanilla and chocolate ice cream, half between crunchy biscuits and half dipped in chocolate with roasted peanuts. A treat on the go.',
        ru: 'Ванильно-шоколадное мороженое: наполовину между хрустящим печеньем, наполовину в шоколаде с жареным арахисом. Лакомство на ходу.',
      },
      notes: { en: 'Vanilla · Biscuit · Roasted peanuts', ru: 'Ваниль · Печенье · Жареный арахис' },
    },
    {
      id: 'bricket', word: 'BRICKET', accent: '#8FD8C8', icon: 'biscuit',
      image: 'products/hero-bricket.webp', imageSm: 'products/hero-bricket-sm.webp',
      ruName: 'Брикет',
      name: { en: ['Super', 'Bricket'], ru: ['Супер', 'Брикет'] },
      category: { en: 'BISCUIT · PLOMBIR', ru: 'С ПЕЧЕНЬЕМ · ПЛОМБИР' },
      desc: {
        en: 'The perfect treat on the go: vanilla and chocolate ice cream sandwiched between crunchy premium biscuits.',
        ru: 'Идеальное лакомство на ходу: ванильное и шоколадное мороженое между хрустящим печеньем премиум-класса.',
      },
      notes: { en: 'Vanilla · Chocolate · Biscuits', ru: 'Ваниль · Шоколад · Печенье' },
    },
  ],

  /* ---------- Marquee — phrases from the site and the packs ---------- */
  marquee: [
    [['Pure Indulgence', 'solid'], ['Since 1996', 'outline'], ['Muzqaymoq', 'accent'], ['Healthy Living', 'solid'], ['80,000 Litres a Day', 'outline'], ['Super Twist', 'accent']],
    [['Мороженое-пломбир', 'accent'], ['Golden Fantasy', 'solid'], ['Made in Uzbekistan', 'outline'], ['Пломбир', 'accent'], ['Choco Boom', 'solid'], ['Uzbekistan’s Favourite', 'outline']],
  ],

  /* ---------- Manifesto pills: token → photo ---------- */
  manifestoPills: { choc: 'photos/chocolate-macro.webp', street: 'photos/icy-pop-madrasa.webp', line: 'photos/production-line.webp' },

  /* ---------- Five steps (About page: ingredients → plant → capacity → wholesale → shelves) ---------- */
  steps: [
    { image: 'photos/chocolate-cones.webp', name: { en: 'Finest ingredients', ru: 'Лучшие ингредиенты' }, ruName: 'Ингредиенты',
      desc: { en: 'Every ice cream starts with the finest ingredients, for a rich, creamy result in every bite.', ru: 'Каждое наше мороженое начинается с лучших ингредиентов — отсюда насыщенный сливочный вкус в каждом кусочке.' } },
    { image: 'photos/plant.webp', name: { en: 'Modern plant', ru: 'Современный завод' }, ruName: 'Завод',
      desc: { en: 'A modernised ice cream plant with advanced technology and cutting-edge machinery for world-class production.', ru: 'Модернизированный завод, передовые технологии и современное оборудование для производства мирового уровня.' } },
    { image: 'photos/bricket-splash.webp', name: { en: '80,000 litres a day', ru: '80 000 литров в сутки' }, ruName: 'Мощность',
      desc: { en: 'Daily production capacity of 80,000 litres, so customers get the finest, most flavourful ice cream.', ru: 'Мощность производства — 80 000 литров в сутки, чтобы покупатели получали самое лучшее и вкусное мороженое.' } },
    { image: 'photos/range-tubs.webp', position: '82% 50%', name: { en: 'Retail & wholesale', ru: 'Розница и опт' }, ruName: 'Опт',
      desc: { en: 'Available retail and wholesale, in partnership with top food chains. Bulk orders welcome.', ru: 'Поставляем в розницу и оптом, работаем с ведущими продуктовыми сетями и принимаем оптовые заказы.' } },
    { image: 'photos/kofe-mokko-khiva.webp', name: { en: 'Across Uzbekistan', ru: 'По всему Узбекистану' }, ruName: 'Узбекистан',
      desc: { en: 'In leading supermarkets, stores, parlours and cafés across Uzbekistan and beyond.', ru: 'В ведущих супермаркетах, магазинах, кафе-мороженых и кафе по всему Узбекистану и за его пределами.' } },
  ],

  /* ---------- Fly-through mask: the range seen through "1996" ---------- */
  flythrough: { word: '1996', image: 'photos/range-wrappers.webp' },

  /* ---------- Ingredients — only those named in the site's own product descriptions.
     match: regex tested against every product's EN description; the list of
     products shown next to each ingredient is computed from the catalogue. ---------- */
  ingredientsImage: 'photos/range-burst.webp',
  ingredients: [
    { name: { en: 'Vanilla', ru: 'Ваниль' }, translit: 'vanil’', match: 'vanilla' },
    { name: { en: 'Chocolate', ru: 'Шоколад' }, translit: 'shokolad', match: 'chocolate|choco|cocoa' },
    { name: { en: 'Roasted peanuts', ru: 'Жареный арахис' }, translit: 'zharenyy arakhis', match: 'peanut' },
    { name: { en: 'Crunchy wafer', ru: 'Хрустящая вафля' }, translit: 'khrustyashchaya vaflya', match: 'wafer|waffle' },
    { name: { en: 'Biscuits & cookies', ru: 'Печенье' }, translit: 'pechen’ye', match: 'biscuit|cookie' },
    { name: { en: 'Fruit', ru: 'Фрукты' }, translit: 'frukty', match: 'raspberry|orange|mango|papaya|berry|fruit' },
    { name: { en: 'Nuts', ru: 'Орехи' }, translit: 'orekhi', match: 'hazelnut|pecan|pistachio' },
    { name: { en: 'Coffee', ru: 'Кофе' }, translit: 'kofe', match: 'coffee|cappuccino|mokko' },
  ],

  /* ---------- Reach: 80,000 litres a day ---------- */
  reach: {
    from: 0, to: 80000, unit: { en: 'L', ru: 'Л' },
    cards: [
      { image: 'photos/olino-round-pie.webp', caption: { en: '01 · OLINO & ROUND PIE', ru: '01 · ОЛИНО И РАУНД ПАЙ' } },
      { image: 'photos/family-swirls.webp',   caption: { en: '02 · SWIRLS · FAMILY TUBS', ru: '02 · SWIRLS · СЕМЕЙНЫЕ КОНТЕЙНЕРЫ' } },
      { image: 'photos/sandwich-splash.webp', caption: { en: '03 · CLASSIC SANDWICH', ru: '03 · КЛАССИК СЭНДВИЧ' } },
    ],
  },

  /* ---------- The film: Dairy Classic's own 3D billboard spot (Super Bricket), scrubbed ---------- */
  film: {
    desktop: 'film/billboard-1280.mp4',
    mobile: 'film/billboard-720.mp4',
    poster: 'film/billboard.jpg',
    polaroids: [
      { image: 'photos/olino-splash.webp', caption: { en: 'OLINO · CHOCOLATE COATED BISCUIT', ru: 'ОЛИНО · В ШОКОЛАДНОЙ ГЛАЗУРИ' } },
      { image: 'photos/creamica-moon.webp', caption: { en: 'CREAMICA VANILLA · CUPS', ru: 'КРЕМИКА ВАНИЛЬ · СТАКАНЧИКИ' } },
    ],
  },

  /* ---------- Promises (site statements) ---------- */
  promises: [
    { en: 'Great taste isn’t just a promise. It’s a tradition.', ru: 'Отличный вкус для нас не просто обещание, а традиция.' },
    { en: 'Made with the finest ingredients, rich and creamy in every bite.', ru: 'Только лучшие ингредиенты, насыщенный сливочный вкус в каждом кусочке.' },
    { en: 'Premium products you can trust, since 1996.', ru: 'Продукция премиум-класса, которой можно доверять. С 1996 года.' },
    { en: 'Bringing joy with every scoop.', ru: 'Радость с каждой ложкой.' },
  ],

  /* ---------- Partner stats (About page) ---------- */
  partnerImage: 'photos/range-tubs.webp',
  stats: [
    { value: 1996, from: 1960, prefix: '', suffix: '', unit: { en: 'founded', ru: 'год основания' }, caption: { en: 'CRAFTING ICE CREAM', ru: 'ДЕЛАЕМ МОРОЖЕНОЕ' } },
    { value: 30, prefix: '', suffix: '+', unit: { en: 'years', ru: 'лет' }, caption: { en: 'DELIGHTING TASTE BUDS', ru: 'РАДУЕМ ЛЮБИТЕЛЕЙ МОРОЖЕНОГО' } },
    { value: 80000, prefix: '', suffix: '', unit: { en: 'L / day', ru: 'л / сутки' }, caption: { en: 'PRODUCTION CAPACITY', ru: 'МОЩНОСТЬ ПРОИЗВОДСТВА' } },
    { value: 1, prefix: '#', suffix: '', unit: { en: 'choice', ru: 'выбор' }, caption: { en: 'AWARDED BY OUR CONSUMERS', ru: 'ПО МНЕНИЮ ПОКУПАТЕЛЕЙ' } },
  ],

  /* ---------- Full range: all 44 products from the six category pages (verbatim meaning, typos fixed) ---------- */
  catalogue: [
    { id: "cones", label: { en: "CONES", ru: "РОЖКИ" }, icon: "cone", items: [
      { name: "Super Twist", ru: "Супер Твист", thumb: "products/thumb/super-twist.webp", image: "products/super-twist.webp", tag: null, featured: true,
        desc: { en: "Vanilla ice cream with a raspberry sauce centre, filled in a crunchy wafer and coated with chocolate. It has won the soul and taste buds of ice cream lovers.", ru: "Ванильное мороженое с малиновым соусом внутри, в хрустящем вафельном рожке с шоколадной глазурью. Оно покорило сердца и вкусы любителей мороженого." } },
      { name: "Choco Boom", ru: "Чоко Бум", thumb: "products/thumb/choco-boom.webp", image: "products/choco-boom.webp", tag: null, featured: true,
        desc: { en: "Chocolate ice cream filled in a crunchy wafer, coated with chocolate and crispy roasted peanuts that give a distinctive taste for your mood and pleasure.", ru: "Шоколадное мороженое в хрустящем вафельном рожке под шоколадной глазурью с жареным арахисом. Яркий, насыщенный вкус для отличного настроения." } },
      { name: "Golden Fantasy", ru: "Голден Фэнтези", thumb: "products/thumb/golden-fantasy.webp", image: "products/golden-fantasy.webp", tag: null, featured: true,
        desc: { en: "A split of two flavours, vanilla and chocolate, in a crunchy wafer coated with chocolate and roasted peanuts. A surprisingly divine taste.", ru: "Два вкуса в одном рожке: ваниль и шоколад в хрустящей вафле, шоколадная глазурь и жареный арахис. Удивительный, просто божественный вкус." } },
      { name: "Dice N Slice", ru: "Дайс-н-Слайс", thumb: "products/thumb/dice-n-slice.webp", image: "products/dice-n-slice.webp", tag: null, featured: false,
        desc: { en: "A seriously premium hazelnut and rose combination. It is super gourmet, filled in a waffle cone.", ru: "По-настоящему премиальное сочетание лесного ореха и розы в вафельном рожке. Изысканный вкус для истинных гурманов." } },
      { name: "Twin Cone", ru: "Твин Кон", thumb: "products/thumb/twin-cone.webp", image: "products/twin-cone.webp", tag: null, featured: false,
        desc: { en: "A premium ice cream twist with honey and vanilla pecan, a double flavour in a waffle cone.", ru: "Премиальное мороженое с двойным вкусом: мёд и ваниль с пеканом, закрученные в вафельном рожке." } },
      { name: "Top Fun", ru: "Топ Фан", thumb: "products/thumb/top-fun.webp", image: "products/top-fun.webp", tag: { en: "BIG", ru: "БОЛЬШОЙ" }, featured: false,
        desc: { en: "Premium ice cream in a big wafer cone, filled with an incredibly fruity and tangy orange sauce.", ru: "Премиальное мороженое в большом вафельном рожке с невероятно фруктовым, освежающе-кисловатым апельсиновым соусом." } },
      { name: "Capicon", ru: "Капикон", thumb: "products/thumb/capicon.webp", image: "products/capicon.webp", tag: { en: "BIG", ru: "БОЛЬШОЙ" }, featured: false,
        desc: { en: "Choose a real cappuccino ice cream in a big cone for big fun.", ru: "Настоящее мороженое со вкусом капучино в большом рожке. Большой рожок — большое удовольствие!" } },
    ] },
    { id: "stick", label: { en: "STICKS", ru: "ЭСКИМО" }, icon: "stick", items: [
      { name: "Super Choc", ru: "Супер Чок", thumb: "products/thumb/super-choc.webp", image: "products/super-choc.webp", tag: null, featured: false,
        desc: { en: "Delightful premium chocolate ice cream with a smooth, creamy texture that will pleasantly surprise you, coated with crunchy rich chocolate and pieces of crispy peanuts.", ru: "Премиальное шоколадное мороженое с нежной сливочной текстурой, которое приятно удивит. В хрустящей глазури из насыщенного шоколада с кусочками жареного арахиса." } },
      { name: "Vega", ru: "Вега", thumb: "products/thumb/vega.webp", image: "products/vega.webp", tag: null, featured: true,
        desc: { en: "Delicious vanilla-flavoured premium ice cream coated with luscious crunchy chocolate and crispy roasted peanuts.", ru: "Премиальное мороженое со вкусом ванили в аппетитной хрустящей шоколадной глазури с жареным арахисом." } },
      { name: "Classic Vega", ru: "Классик Вега", thumb: "products/thumb/classic-vega.webp", image: "products/classic-vega.webp", tag: null, featured: false,
        desc: { en: "Smooth and truly delightful, sensational premium milky vanilla ice cream for your taste buds, coated with tempting silky chocolate.", ru: "Нежное премиальное молочное мороженое с ванилью в соблазнительной шелковистой шоколадной глазури — настоящее удовольствие для ценителей вкуса." } },
      { name: "New Classic", ru: "Нью Классик", thumb: "products/thumb/new-classic.webp", image: "products/new-classic.webp", tag: null, featured: false,
        desc: { en: "Double satisfaction with a half-and-half portion of smooth, creamy vanilla and chocolate ice cream coated with luscious rich chocolate.", ru: "Двойное удовольствие: нежное сливочное ванильное и шоколадное мороженое пополам в насыщенной шоколадной глазури." } },
      { name: "Koffee Mokko", ru: "Кофе Мокко", thumb: "products/thumb/koffee-mokko.webp", image: "products/koffee-mokko.webp", tag: null, featured: false,
        desc: { en: "Discover the delectable, enjoyable combination of coffee and cocoa.", ru: "Откройте для себя изысканное сочетание кофе и какао — вкус, которым хочется наслаждаться." } },
      { name: "Delizia", ru: "Делиция", thumb: "products/thumb/delizia.webp", image: "products/delizia.webp", tag: { en: "NEW", ru: "НОВИНКА" }, featured: false,
        desc: { en: "Triple-layer coated ice cream stick with inner and outer crispy chocolatey layers and luscious mixed-berry goodness in between.", ru: "Мороженое на палочке в тройной глазури: два хрустящих шоколадных слоя, а между ними — сочная ягодная начинка." } },
      { name: "Royal Fun", ru: "Роял Фан", thumb: "products/thumb/royal-fun.webp", image: "products/royal-fun.webp", tag: { en: "NEW", ru: "НОВИНКА" }, featured: false,
        desc: { en: "Triple-layer coated ice cream stick: enjoy the perfect balance of a tangy orange layer between crispy chocolatey layers.", ru: "Мороженое на палочке в тройной глазури с идеальным балансом: яркий апельсиновый слой с приятной кислинкой между хрустящими шоколадными слоями." } },
      { name: "Pango", ru: "Панго", thumb: "products/thumb/pango.webp", image: "products/pango.webp", tag: { en: "NEW", ru: "НОВИНКА" }, featured: false,
        desc: { en: "The ultimate indulgence that promises the contentment and pleasure of mixed-berry refreshment.", ru: "Настоящее наслаждение: освежающий ягодный микс, который дарит удовольствие с каждым кусочком." } },
      { name: "Frutonia", ru: "Фрутония", thumb: "products/thumb/frutonia.webp", image: "products/frutonia.webp", tag: { en: "NEW", ru: "НОВИНКА" }, featured: false,
        desc: { en: "A tropical fruity delight: a journey of creamy adventure and enjoyment.", ru: "Тропическое фруктовое удовольствие — сливочное путешествие, полное ярких впечатлений." } },
      { name: "Tapo", ru: "Тапо", thumb: "products/thumb/tapo.webp", image: "products/tapo.webp", tag: { en: "NEW", ru: "НОВИНКА" }, featured: false,
        desc: { en: "", ru: "" } },
    ] },
    { id: "cups", label: { en: "CUPS", ru: "СТАКАНЧИКИ" }, icon: "cup", items: [
      { name: "Creamica Cheese Cake", ru: "Кремика Чизкейк", thumb: "products/thumb/creamica-cheese-cake.webp", image: "products/creamica-cheese-cake.webp", tag: null, featured: false,
        desc: { en: "Premium blueberry cheesecake ice cream with luscious blueberry sauce.", ru: "Премиальное мороженое со вкусом черничного чизкейка и щедрым черничным соусом." } },
      { name: "Creamica Vanilla", ru: "Кремика Ваниль", thumb: "products/thumb/creamica-vanilla.webp", image: "products/creamica-vanilla.webp", tag: null, featured: false,
        desc: { en: "Creamica is a creamy selection filled in cups, topped with chocolate along with roasted peanuts. Pick up this delectable frozen treat.", ru: "Нежное сливочное мороженое в стаканчике под шоколадом с жареным арахисом. Тот самый холодный десерт, от которого невозможно отказаться." } },
      { name: "Creamica Biscuiti", ru: "Кремика Бисквити", thumb: "products/thumb/creamica-biscuiti.webp", image: "products/creamica-biscuiti.webp", tag: null, featured: false,
        desc: { en: "Creamy, Biscuiti-flavoured, delicious and eminent treat.", ru: "Сливочное мороженое со вкусом печенья — изысканное и по-настоящему вкусное лакомство." } },
      { name: "Ambroziya Mini Cup", ru: "Амброзия мини-стаканчик", thumb: "products/thumb/ambroziya-mini-cup.webp", image: "products/ambroziya-mini-cup.webp", tag: null, featured: false,
        desc: { en: "Premium ice cream with chunks of papaya cubes, which bring additional value to it.", ru: "Премиальное мороженое с кусочками папайи — именно они придают ему особый, яркий вкус." } },
      { name: "Orange Mini Cup", ru: "Оранж мини-стаканчик", thumb: "products/thumb/orange-mini-cup.webp", image: "products/orange-mini-cup.webp", tag: null, featured: false,
        desc: { en: "Premium orange ice cream with tangy orange sauce. It is just simply rewarding.", ru: "Премиальное апельсиновое мороженое с ярким, чуть терпким апельсиновым соусом. Просто — и так приятно." } },
      { name: "Choco Chips Mini Cup", ru: "Чоко Чипс мини-стаканчик", thumb: "products/thumb/choco-chips-mini-cup.webp", image: "products/choco-chips-mini-cup.webp", tag: null, featured: false,
        desc: { en: "Velvety vanilla ice cream with a creamy texture and chocolatey chips.", ru: "Бархатистое ванильное мороженое с нежной сливочной текстурой и шоколадной крошкой." } },
      { name: "Cappuccino Mini Cup", ru: "Капучино мини-стаканчик", thumb: "products/thumb/cappuccino-mini-cup.webp", image: "products/cappuccino-mini-cup.webp", tag: null, featured: false,
        desc: { en: "A perfectly created extra moment with the richness of cappuccino.", ru: "Насыщенный вкус капучино — идеально для особенного момента." } },
    ] },
    { id: "biscuit", label: { en: "BISCUIT", ru: "С ПЕЧЕНЬЕМ" }, icon: "biscuit", items: [
      { name: "Sandwich", ru: "Сэндвич", thumb: "products/thumb/sandwich.webp", image: "products/sandwich.webp", tag: null, featured: true,
        desc: { en: "Vanilla and chocolate ice cream, half sandwiched between crunchy biscuit and half dipped in chocolate with roasted peanuts. An irresistible taste and a delicious treat on the go.", ru: "Ванильное и шоколадное мороженое: одна половинка — между хрустящим печеньем, другая — в шоколаде с жареным арахисом. Неотразимый вкус и лакомство, которое удобно взять с собой." } },
      { name: "Bricket", ru: "Брикет", thumb: "products/thumb/bricket.webp", image: "products/bricket.webp", tag: null, featured: false,
        desc: { en: "The perfect treat on the go: a delicious blend of vanilla and chocolate ice cream sandwiched between crunchy premium biscuits.", ru: "Идеальное лакомство в дорогу: восхитительное сочетание ванильного и шоколадного мороженого между хрустящим печеньем премиум-класса." } },
      { name: "Olino", ru: "Олино", thumb: "products/thumb/olino.webp", image: "products/olino.webp", tag: null, featured: true,
        desc: { en: "Biscuit-flavoured ice cream in a perfectly round shape with premium cookies, coated with chocolate.", ru: "Идеально круглое мороженое со вкусом печенья, с печеньем премиум-класса, в шоколадной глазури." } },
      { name: "Round Pie", ru: "Раунд Пай", thumb: "products/thumb/round-pie.webp", image: "products/round-pie.webp", tag: null, featured: true,
        desc: { en: "An imaginative creation: perfectly round vanilla ice cream with premium cookies, coated with chocolate.", ru: "Оригинальная задумка: идеально круглое ванильное мороженое с печеньем премиум-класса в шоколадной глазури." } },
    ] },
    { id: "cassatta", label: { en: "CASSATTA", ru: "КАССАТА" }, icon: "cassatta", items: [
      { name: "Classic Cassatta", ru: "Классик Кассата", thumb: "products/thumb/classic-cassatta.webp", image: "products/classic-cassatta.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "Premium layered ice cream with a different flavour combination, topped with roasted peanuts. A slice of great fascination.", ru: "Премиальное многослойное мороженое с сочетанием разных вкусов и хрустящим жареным арахисом сверху. Кусочек, от которого невозможно оторваться." } },
      { name: "Galaxy Cassatta", ru: "Гэлакси Кассата", thumb: "products/thumb/galaxy-cassatta.webp", image: "products/galaxy-cassatta.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "Premium layered ice cream to celebrate anytime, anywhere, topped with roasted peanuts. A slice of creamy satisfaction.", ru: "Премиальное многослойное мороженое для праздника в любой момент и в любом месте, с жареным арахисом сверху. Кусочек настоящего сливочного удовольствия." } },
    ] },
    { id: "tubs", label: { en: "TUBS", ru: "КОНТЕЙНЕРЫ" }, icon: "tub", items: [
      { name: "French Vanilla", ru: "Френч Ванилла", thumb: "products/thumb/french-vanilla.webp", image: "products/french-vanilla.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "The ultimate class of premium ice cream is French vanilla, which gives a perfectly creamy and tasty combination.", ru: "Французская ваниль — высший класс премиального мороженого. Нежное, сливочное и по-настоящему вкусное сочетание." } },
      { name: "Ambroziya", ru: "Амброзия", thumb: null, image: null, tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "Chunks of papaya cubes with different flavours and colours mixed together to give a mesmerising taste: the most loved delicacy.", ru: "Кусочки папайи разных вкусов и цветов в одном мороженом — завораживающий вкус и самое любимое лакомство." } },
      { name: "Choco Chips", ru: "Чоко Чипс", thumb: null, image: null, tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "The simplicity of rich, creamy vanilla and rich choco chips mixed together to satisfy your craving for ice cream.", ru: "Простота насыщенной сливочной ванили и шоколадной крошки — именно то, что нужно, когда хочется мороженого." } },
      { name: "Coffee Frency", ru: "Кофе Френси", thumb: "products/thumb/coffee-frency.webp", image: "products/coffee-frency.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "Extraordinarily rich and creamy ice cream to invigorate you and bring you happiness.", ru: "Необыкновенно насыщенное и сливочное мороженое, которое бодрит и дарит радость." } },
      { name: "Super Vanilla", ru: "Супер Ванилла", thumb: "products/thumb/super-vanilla.webp", image: "products/super-vanilla.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "A refreshing super vanilla flavoured ice cream with a silky and creamy combination of sweet cream.", ru: "Освежающее мороженое со вкусом ванили — шелковистое, нежное, с мягким вкусом сладких сливок." } },
      { name: "Chocolate Dream", ru: "Шоколад Дрим", thumb: "products/thumb/chocolate-dream.webp", image: "products/chocolate-dream.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "Scrumptious chocolate ice cream, ready for you to dive into a chocolate dream.", ru: "Восхитительное шоколадное мороженое — окунитесь в настоящую шоколадную мечту." } },
      { name: "Pistachio", ru: "Фисташка", thumb: "products/thumb/pistachio.webp", image: "products/pistachio.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "Your favourite pistachio ice cream, made so you enjoy every last scoop and satisfy your appetite.", ru: "Любимое фисташковое мороженое, которым хочется наслаждаться до последней ложки." } },
      { name: "Premium Chocolate", ru: "Премиум Шоколад", thumb: "products/thumb/premium-chocolate.webp", image: "products/premium-chocolate.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "A truly luxurious ice cream experience with the right blend of chocolate, cocoa powder and chocolate flavour that enhances the taste.", ru: "Настоящая роскошь: точное сочетание шоколада, какао-порошка и шоколадного вкуса, которое делает мороженое ещё ярче." } },
      { name: "Mango", ru: "Манго", thumb: "products/thumb/mango.webp", image: "products/mango.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "Experience the captivating symphony of taste and texture of premium mango ice cream: the king of fruits.", ru: "Пленительная симфония вкуса и текстуры: премиальное мороженое из манго — короля фруктов." } },
      { name: "Heart Delight", ru: "Харт Делайт", thumb: "products/thumb/heart-delight.webp", image: "products/heart-delight.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "Nothing tastes like our classic delight, filled with a great combination of three flavours together.", ru: "Ни с чем не сравнимый вкус классики: удачное сочетание трёх вкусов в одном мороженом." } },
      { name: "Classic Delight", ru: "Классик Делайт", thumb: "products/thumb/classic-delight.webp", image: "products/classic-delight.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "Nothing tastes like our classic delight, filled with a great combination of three flavours together.", ru: "Три вкуса в одном контейнере — классический десерт, который не спутаешь ни с чем." } },
      { name: "Raspberry Swirl", ru: "Свирлс Малина", thumb: "products/thumb/raspberry-swirl.webp", image: "products/raspberry-swirl.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "Premium vanilla ice cream swirl and ribbon for perfectly succulent, creamy bliss.", ru: "Премиальное ванильное мороженое с ягодными прожилками — сочное и сливочное блаженство." } },
      { name: "Orange", ru: "Свирлс Апельсин", thumb: "products/thumb/orange.webp", image: "products/orange.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "A replenishing delight: premium ice cream swirled with luscious sweet orange sauce to add zest to life.", ru: "Освежающее удовольствие: премиальное мороженое с сочным сладким апельсиновым соусом — больше яркости в каждом дне." } },
      { name: "Chocolate Curls", ru: "Свирлс Шоколадные завитки", thumb: "products/thumb/chocolate-curls.webp", image: "products/chocolate-curls.webp", tag: { en: "1 L", ru: "1 Л" }, featured: false,
        desc: { en: "Premium vanilla ice cream swirled with a chocolate sauce ribbon: a truly mouth-watering taste of chocolate curls to brighten your day.", ru: "Премиальное ванильное мороженое с лентами шоколадного соуса — аппетитный вкус шоколадных завитков, который сделает ваш день ярче." } },
    ] },
  ],

  /* ======================================================================
     Copy. "*word*" renders as italic accent. {t} etc. are filled at runtime.
     ====================================================================== */
  copy: {
    en: {
      meta: { title: 'Dairy Classic — Uzbekistan’s Best Ice Cream Brand, since 1996' },
      loader: 'Since 1996 · Chilling the first scoop…',
      nav: { churn: 'OUR STORY', ingredients: 'INGREDIENTS', range: 'THE RANGE', cold: 'REACH', partner: 'WHOLESALE', menu: 'MENU', close: 'CLOSE' },
      cta: 'BECOME A DISTRIBUTOR',
      status: { open: 'OFFICE OPEN · CLOSES {t}', closed: 'CLOSED · OPENS {d}{t}' },
      days: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      hero: {
        eyebrow: 'UZBEKISTAN’S BEST ICE CREAM BRAND',
        range: 'THE LINE-UP',
        request: 'REQUEST PRICE LIST',
        scroll: 'SCROLL FOR THE NEXT ONE',
        badge: 'SINCE 1996 · MADE IN UZBEKISTAN · ',
      },
      manifesto: {
        label: 'WE ARE DAIRY CLASSIC',
        text: 'Since 1996, Dairy Classic has been crafting ice cream with the finest ingredients {pill:choc} rich, creamy and satisfying. Our motto has been *“Healthy Living”* from the very beginning, and our drive is quality, passion and the joy of ice cream {pill:street}. Our modernised plant has a daily production capacity of 80,000 litres {pill:line}. For us, great taste isn’t just a promise. *It’s a tradition.*',
      },
      steps: { label: 'A LEGACY OF EXCELLENCE', title: 'From the finest ingredients to your *shelves.*', hint: 'DRAG OR SCROLL' },
      fly: { line: 'A legacy of excellence, *since 1996.*' },
      ingredients: {
        label: 'PURE INDULGENCE',
        title: 'Made with the finest *ingredients.*',
        note: 'Crafted with passion, our ice creams bring pure delight in every bite. Every ingredient below is named in our own product descriptions.',
        in: 'IN',
        more: '+{n} MORE',
      },
      range: {
        label: 'THE RANGE',
        title: 'Uzbekistan’s favourite *ice cream.*',
        note: 'From nostalgic classics to exciting new treats. Hover a row to see it, or open the full range below.',
        noteTouch: 'From nostalgic classics to exciting new treats. Tap a row, or open the full range below.',
        catalogue: 'THE FULL RANGE',
        footnote: 'WHOLESALE PRICING ON REQUEST · BULK ORDERS WELCOME',
        featured: 'ON OUR HOME PAGE',
      },
      cold: {
        label: 'REACH',
        title: 'Bringing sweet moments *closer.*',
        text: 'Find us across Uzbekistan and beyond, in leading supermarkets, stores, parlours and cafés. Dairy Classic is available retail and wholesale, in partnership with top food chains.',
        counter: 'LITRES OF ICE CREAM A DAY · OUR PRODUCTION CAPACITY',
      },
      pour: { words: ['Quality.', 'Passion.', 'Joy.'], caption: 'SUPER BRICKET · OUR 3D BILLBOARD FILM' },
      promises: { label: 'OUR PROMISE', counter: 'PROMISE NO.' },
      partner: {
        label: 'RETAIL & WHOLESALE',
        title: 'We’d love to hear *from you.*',
        text: 'Want to collaborate, place a bulk order or simply say hello? Dairy Classic partners with top food chains, is found in leading stores, parlours and cafés, and is now opening routes into Kyrgyzstan and the Uzbekistan–Afghanistan border markets.',
        live: 'LIVE FROM THE OFFICE',
        info: { office: 'FACTORY', phone: 'CALL US', tashkent: 'TASHKENT', samarkand: 'SAMARKAND', telegram: 'TELEGRAM', email: 'EMAIL US', instagram: 'INSTAGRAM', hours: 'OPENING HOURS' },
        hoursValue: 'Mon – Sat · 09:00 – 20:00',
        form: {
          title: 'Distributor enquiry',
          name: 'Your name', company: 'Company', city: 'City', country: 'Country', type: 'Business type',
          volume: 'Estimated monthly volume', contact: 'Phone or Telegram', message: 'Anything we should know?',
          submit: 'SEND ENQUIRY →', sending: 'SENDING…',
          success: 'Thank you. Our sales team will be in touch.',
          error: 'Something went wrong. Please call us or message us on Telegram.',
          required: 'Please fill in the highlighted fields.',
        },
        call: 'CALL SALES', telegramBtn: 'MESSAGE ON TELEGRAM ↗', instagramBtn: 'FOLLOW ON INSTAGRAM ↗',
      },
      footer: {
        tagline: 'Crafting world-class ice creams with passion, quality and innovation since 1996.',
        find: 'FIND US', hours: 'OPENING HOURS', contact: 'CONTACT', elsewhere: 'FOLLOW US',
        hoursLine: 'MON – SAT · 09:00 – 20:00', hoursTz: 'SUNDAY · CLOSED',
        rights: 'ALL RIGHTS RESERVED', top: 'BACK TO TOP',
      },
    },

    ru: {
      meta: { title: 'Dairy Classic — лучшее мороженое Узбекистана с 1996 года' },
      loader: 'С 1996 года · Охлаждаем первый шарик…',
      nav: { churn: 'О НАС', ingredients: 'СОСТАВ', range: 'АССОРТИМЕНТ', cold: 'ГЕОГРАФИЯ', partner: 'ОПТ', menu: 'МЕНЮ', close: 'ЗАКРЫТЬ' },
      cta: 'СТАТЬ ДИСТРИБЬЮТОРОМ',
      status: { open: 'ОФИС ОТКРЫТ · ДО {t}', closed: 'ОФИС ЗАКРЫТ · ОТКРОЕМСЯ {d}{t}' },
      days: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
      hero: {
        eyebrow: 'ЛУЧШЕЕ МОРОЖЕНОЕ УЗБЕКИСТАНА',
        range: 'НАШИ ХИТЫ',
        request: 'ЗАПРОСИТЬ ПРАЙС-ЛИСТ',
        scroll: 'ЛИСТАЙТЕ ДАЛЬШЕ',
        badge: 'С 1996 ГОДА · СДЕЛАНО В УЗБЕКИСТАНЕ · ',
      },
      manifesto: {
        label: 'МЫ — DAIRY CLASSIC',
        text: 'С 1996 года Dairy Classic делает мороженое из лучших ингредиентов {pill:choc} насыщенное, сливочное и дарящее удовольствие. С самого начала наш девиз — *«Здоровый образ жизни»*, а движут нами качество, любовь к делу и радость, которую дарит мороженое {pill:street}. Модернизированный завод выпускает 80 000 литров в сутки {pill:line}. Отличный вкус для нас не просто обещание. *Это традиция.*',
      },
      steps: { label: 'ТРАДИЦИИ КАЧЕСТВА', title: 'От лучших ингредиентов до ваших *полок.*', hint: 'ЛИСТАЙТЕ' },
      fly: { line: 'Традиции качества *с 1996 года.*' },
      ingredients: {
        label: 'ЧИСТОЕ УДОВОЛЬСТВИЕ',
        title: 'Только лучшие *ингредиенты.*',
        note: 'Мы делаем мороженое с любовью, чтобы каждый кусочек приносил удовольствие. Все ингредиенты ниже названы в описаниях наших продуктов.',
        in: 'В',
        more: 'И ЕЩЁ {n}',
      },
      range: {
        label: 'АССОРТИМЕНТ',
        title: 'Любимое мороженое *Узбекистана.*',
        note: 'От любимой классики до смелых новинок. Наведите курсор на строку или откройте полный ассортимент ниже.',
        noteTouch: 'От любимой классики до смелых новинок. Нажмите на строку или откройте полный ассортимент ниже.',
        catalogue: 'ВЕСЬ АССОРТИМЕНТ',
        footnote: 'ОПТОВЫЕ ЦЕНЫ ПО ЗАПРОСУ · ПРИНИМАЕМ ОПТОВЫЕ ЗАКАЗЫ',
        featured: 'НА ГЛАВНОЙ СТРАНИЦЕ',
      },
      cold: {
        label: 'ГЕОГРАФИЯ',
        title: 'Сладкие моменты — *ещё ближе.*',
        text: 'Ищите нас по всему Узбекистану и за его пределами: в ведущих супермаркетах, магазинах, кафе-мороженых и кафе. Dairy Classic продаётся в розницу и оптом и сотрудничает с ведущими продуктовыми сетями.',
        counter: 'ЛИТРОВ МОРОЖЕНОГО В СУТКИ · МОЩНОСТЬ ПРОИЗВОДСТВА',
      },
      pour: { words: ['Качество.', 'Страсть.', 'Радость.'], caption: 'SUPER BRICKET · НАШ 3D-РОЛИК ДЛЯ БИЛБОРДА' },
      promises: { label: 'НАШЕ ОБЕЩАНИЕ', counter: 'ОБЕЩАНИЕ №' },
      partner: {
        label: 'РОЗНИЦА И ОПТ',
        title: 'Будем рады *вашему сообщению.*',
        text: 'Хотите сотрудничать, сделать оптовый заказ или просто поздороваться? Dairy Classic работает с ведущими продуктовыми сетями, магазинами, кафе-морожеными и кафе, а теперь открывает направления в Кыргызстан и на приграничные рынки Узбекистана и Афганистана.',
        live: 'ПРЯМО СЕЙЧАС В ОФИСЕ',
        info: { office: 'ЗАВОД', phone: 'ПОЗВОНИТЕ НАМ', tashkent: 'ТАШКЕНТ', samarkand: 'САМАРКАНД', telegram: 'TELEGRAM', email: 'ПОЧТА', instagram: 'INSTAGRAM', hours: 'ЧАСЫ РАБОТЫ' },
        hoursValue: 'Пн – Сб · 09:00 – 20:00',
        form: {
          title: 'Заявка для дистрибьютора',
          name: 'Ваше имя', company: 'Компания', city: 'Город', country: 'Страна', type: 'Тип бизнеса',
          volume: 'Примерный объём в месяц', contact: 'Телефон или Telegram', message: 'Что нам стоит знать?',
          submit: 'ОТПРАВИТЬ ЗАЯВКУ →', sending: 'ОТПРАВЛЯЕМ…',
          success: 'Спасибо! Отдел продаж свяжется с вами.',
          error: 'Что-то пошло не так. Позвоните нам или напишите в Telegram.',
          required: 'Пожалуйста, заполните отмеченные поля.',
        },
        call: 'ПОЗВОНИТЬ В ОТДЕЛ ПРОДАЖ', telegramBtn: 'НАПИСАТЬ В TELEGRAM ↗', instagramBtn: 'МЫ В INSTAGRAM ↗',
      },
      footer: {
        tagline: 'С 1996 года создаём мороженое мирового уровня — с любовью, заботой о качестве и новаторским подходом.',
        find: 'АДРЕС', hours: 'ЧАСЫ РАБОТЫ', contact: 'КОНТАКТЫ', elsewhere: 'МЫ В СЕТИ',
        hoursLine: 'ПН – СБ · 09:00 – 20:00', hoursTz: 'ВОСКРЕСЕНЬЕ · ВЫХОДНОЙ',
        rights: 'ВСЕ ПРАВА ЗАЩИЩЕНЫ', top: 'НАВЕРХ',
      },
    },
  },
};
