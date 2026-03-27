/**
 * Default/fallback content displayed when Payload CMS has no data.
 * Once content is added via /admin, CMS data takes priority.
 */

export const defaultHero = {
  heading: 'Meble na wymiar z pasją do detalu',
  subheading:
    'Projektujemy i tworzymy meble idealnie dopasowane do Twojej przestrzeni. Kuchnie, szafy, garderoby i meble łazienkowe - wszystko szyte na miarę.',
  ctaText: 'Zobacz realizacje',
  ctaLink: '/realizacje',
  secondaryCtaText: 'Bezpłatna wycena',
  secondaryCtaLink: '/kontakt',
}

export const defaultAboutPreview = {
  label: 'O nas',
  heading: 'Tworzymy meble, które opowiadają historię',
  description:
    'Od ponad 15 lat łączymy tradycyjne rzemiosło z nowoczesnym designem. Każdy mebel powstaje w naszej pracowni z najwyższej jakości materiałów, z dbałością o każdy detal. Współpracujemy z klientami na każdym etapie - od projektu po montaż.',
  stats: [
    { number: '15+', label: 'Lat doświadczenia' },
    { number: '500+', label: 'Zrealizowanych projektów' },
    { number: '100%', label: 'Zadowolonych klientów' },
    { number: '50+', label: 'Materiałów w ofercie' },
  ],
  ctaText: 'Poznaj nas bliżej',
  ctaLink: '/o-nas',
}

export const defaultServicesSection = {
  label: 'Usługi',
  heading: 'Kompleksowa obsługa od projektu do montażu',
  description:
    'Oferujemy pełen zakres usług meblarskich - od bezpłatnego pomiaru i wizualizacji 3D, przez produkcję, po profesjonalny montaż.',
}

export const defaultServices = [
  {
    id: 'svc-1',
    title: 'Kuchnie na wymiar',
    slug: 'kuchnie',
    shortDescription:
      'Funkcjonalne i piękne kuchnie dopasowane do każdej przestrzeni. Nowoczesne lub klasyczne - zawsze z najwyższą dbałością o ergonomię.',
    icon: 'Kuchnia',
    image: null,
    features: [
      { feature: 'Projekt 3D w cenie' },
      { feature: 'Blaty kompozytowe i kamienne' },
      { feature: 'Ciche systemy zamykania' },
    ],
    order: 1,
    _placeholder: '/images/placeholder-kitchen.svg',
  },
  {
    id: 'svc-2',
    title: 'Szafy i garderoby',
    slug: 'szafy',
    shortDescription:
      'Szafy wnękowe, garderoby walk-in i zabudowy pod skos. Maksymalne wykorzystanie każdego centymetra przestrzeni.',
    icon: 'Szafa',
    image: null,
    features: [
      { feature: 'Systemy organizacji wnętrza' },
      { feature: 'Drzwi przesuwne i uchylne' },
      { feature: 'Oświetlenie LED' },
    ],
    order: 2,
    _placeholder: '/images/placeholder-wardrobe.svg',
  },
  {
    id: 'svc-3',
    title: 'Meble łazienkowe',
    slug: 'lazienki',
    shortDescription:
      'Szafki pod umywalkę, słupki, lustra z oświetleniem. Materiały odporne na wilgoć, idealne do wymagających warunków łazienki.',
    icon: 'Łazienka',
    image: null,
    features: [
      { feature: 'Materiały wodoodporne' },
      { feature: 'Podświetlane lustra' },
      { feature: 'Ukryte szuflady' },
    ],
    order: 3,
    _placeholder: '/images/placeholder-bathroom.svg',
  },
  {
    id: 'svc-4',
    title: 'Meble do salonu',
    slug: 'salon',
    shortDescription:
      'Regały, komody, szafki RTV i biblioteczki. Meble, które nadają charakter Twojemu wnętrzu i zapewniają funkcjonalność na co dzień.',
    icon: 'Salon',
    image: null,
    features: [
      { feature: 'Fornir naturalny i laminat' },
      { feature: 'Systemy cable management' },
      { feature: 'Modułowa budowa' },
    ],
    order: 4,
    _placeholder: '/images/placeholder-living.svg',
  },
  {
    id: 'svc-5',
    title: 'Meble biurowe',
    slug: 'biuro',
    shortDescription:
      'Biurka, zabudowy biurowe i recepcje. Profesjonalne meble, które wspierają produktywność i budują wizerunek firmy.',
    icon: 'Biuro',
    image: null,
    features: [
      { feature: 'Ergonomiczne stanowiska' },
      { feature: 'Zabudowy na wymiar' },
      { feature: 'Systemy przechowywania' },
    ],
    order: 5,
    _placeholder: '/images/placeholder-office.svg',
  },
  {
    id: 'svc-6',
    title: 'Pomiar i projekt 3D',
    slug: 'projekt',
    shortDescription:
      'Bezpłatny pomiar w domu klienta i fotorealistyczna wizualizacja 3D. Zobaczysz swoje meble zanim powstaną.',
    icon: 'Projekt',
    image: null,
    features: [
      { feature: 'Bezpłatny pomiar' },
      { feature: 'Wizualizacja 3D' },
      { feature: 'Dobór materiałów' },
    ],
    order: 6,
    _placeholder: '/images/placeholder-about.svg',
  },
]

export const defaultProjectsSection = {
  label: 'Realizacje',
  heading: 'Nasze najnowsze projekty',
  description: 'Każda realizacja to unikalna historia. Zobacz, jak tworzymy meble dopasowane do potrzeb naszych klientów.',
  ctaText: 'Zobacz wszystkie',
  ctaLink: '/realizacje',
}

export const defaultProjects = [
  {
    id: 'proj-1',
    title: 'Nowoczesna kuchnia w bieli',
    slug: 'nowoczesna-kuchnia-biel',
    description: 'Minimalistyczna kuchnia z białymi frontami mat i blatem z kwarcu. Funkcjonalny układ w kształcie litery L z wyspą.',
    category: { id: 'cat-1', name: 'Kuchnie', slug: 'kuchnie' },
    featured: true,
    mainImage: null,
    _placeholder: '/images/placeholder-kitchen.svg',
    details: { client: 'Prywatny', location: 'Warszawa', year: '2024', scope: 'Projekt + wykonanie + montaż', materials: 'MDF lakierowany, kwarcyt' },
    order: 1,
  },
  {
    id: 'proj-2',
    title: 'Garderoba walk-in',
    slug: 'garderoba-walk-in',
    description: 'Przestronna garderoba z systemem organizacji i oświetleniem LED. Drzwi przesuwne z lustrem na całej wysokości.',
    category: { id: 'cat-2', name: 'Garderoby', slug: 'garderoby' },
    featured: true,
    mainImage: null,
    _placeholder: '/images/placeholder-wardrobe.svg',
    details: { client: 'Prywatny', location: 'Kraków', year: '2024', scope: 'Projekt + wykonanie + montaż', materials: 'Płyta meblowa, aluminium' },
    order: 2,
  },
  {
    id: 'proj-3',
    title: 'Łazienka w drewnie i kamieniu',
    slug: 'lazienka-drewno-kamien',
    description: 'Zabudowa łazienkowa łącząca ciepło drewna z elegancją kamienia. Podświetlane lustro i szuflady z cichym domykiem.',
    category: { id: 'cat-3', name: 'Łazienki', slug: 'lazienki' },
    featured: true,
    mainImage: null,
    _placeholder: '/images/placeholder-bathroom.svg',
    details: { client: 'Prywatny', location: 'Wrocław', year: '2024', scope: 'Wykonanie + montaż', materials: 'Fornir dębowy, granit' },
    order: 3,
  },
  {
    id: 'proj-4',
    title: 'Salon z zabudową RTV',
    slug: 'salon-zabudowa-rtv',
    description: 'Meblościanka z zabudową na TV, z ukrytym systemem cable management. Połączenie otwartych półek z zamkniętymi szafkami.',
    category: { id: 'cat-4', name: 'Salony', slug: 'salony' },
    featured: true,
    mainImage: null,
    _placeholder: '/images/placeholder-living.svg',
    details: { client: 'Prywatny', location: 'Poznań', year: '2023', scope: 'Projekt + wykonanie + montaż', materials: 'Dąb naturalny, metal' },
    order: 4,
  },
  {
    id: 'proj-5',
    title: 'Biuro domowe na poddaszu',
    slug: 'biuro-domowe-poddasze',
    description: 'Funkcjonalne biuro domowe wbudowane pod skosem dachu. Biurko, regały i szafki - wszystko idealnie dopasowane.',
    category: { id: 'cat-5', name: 'Biura', slug: 'biura' },
    featured: true,
    mainImage: null,
    _placeholder: '/images/placeholder-office.svg',
    details: { client: 'Prywatny', location: 'Gdańsk', year: '2023', scope: 'Pomiar + projekt + wykonanie + montaż', materials: 'Płyta laminowana, stal' },
    order: 5,
  },
  {
    id: 'proj-6',
    title: 'Kuchnia z wyspą w drewnie',
    slug: 'kuchnia-wyspa-drewno',
    description: 'Kuchnia w stylu skandynawskim z dużą wyspą. Fronty z naturalnego forniru dębowego, blat z kwarcu Silestone.',
    category: { id: 'cat-1', name: 'Kuchnie', slug: 'kuchnie' },
    featured: true,
    mainImage: null,
    _placeholder: '/images/placeholder-kitchen.svg',
    details: { client: 'Prywatny', location: 'Łódź', year: '2024', scope: 'Projekt + wykonanie + montaż', materials: 'Fornir dębowy, kwarcyt Silestone' },
    order: 6,
  },
]

export const defaultCtaBanner = {
  heading: 'Masz pomysł na meble? Porozmawiajmy!',
  description:
    'Bezpłatny pomiar i wycena. Zadzwoń lub wypełnij formularz - odezwiemy się w ciągu 24 godzin.',
  ctaText: 'Umów się na pomiar',
  ctaLink: '/kontakt',
}

export const defaultTestimonialsSection = {
  label: 'Opinie',
  heading: 'Co mówią nasi klienci',
  description: 'Zaufanie klientów to nasz największy sukces. Przeczytaj opinie osób, dla których tworzyliśmy meble.',
}

export const defaultTestimonials = [
  {
    id: 'test-1',
    author: 'Anna Kowalska',
    role: 'Klientka',
    content:
      'Kuchnia marzeń! Od pierwszego spotkania przez projekt 3D aż po montaż - wszystko na najwyższym poziomie. Meble są piękne i super funkcjonalne. Polecam z czystym sumieniem.',
    rating: 5,
    featured: true,
    order: 1,
  },
  {
    id: 'test-2',
    author: 'Marek Wiśniewski',
    role: 'Klient',
    content:
      'Zabudowa garderoby pod skosem - myślałem, że to niemożliwe. Ekipa z Kalabi znalazła idealne rozwiązanie. Jakość wykonania perfekcyjna, materiały premium. Na pewno wrócę po meble do salonu.',
    rating: 5,
    featured: true,
    order: 2,
  },
  {
    id: 'test-3',
    author: 'Katarzyna Nowak',
    role: 'Klientka',
    content:
      'Trzecie zlecenie w Kalabi i jak zawsze jestem zachwycona. Tym razem meble łazienkowe - idealnie dopasowane, materiały wodoodporne, a design na miarę salonu łazienek.',
    rating: 5,
    featured: true,
    order: 3,
  },
  {
    id: 'test-4',
    author: 'Tomasz Zieliński',
    role: 'Architekt wnętrz',
    content:
      'Współpracuję z Kalabi od 3 lat. Jako architekt cenię sobie ich precyzję wykonania i terminowość. Zawsze realizują projekt dokładnie wg specyfikacji. Polecam wszystkim moim klientom.',
    rating: 5,
    featured: true,
    order: 4,
  },
]

export const defaultNavItems = [
  { label: 'Strona główna', link: '/' },
  { label: 'O nas', link: '/o-nas' },
  { label: 'Realizacje', link: '/realizacje' },
  { label: 'Usługi', link: '/uslugi' },
  { label: 'Kontakt', link: '/kontakt' },
]

export const defaultFooter = {
  description:
    'Kalabi - producent mebli na wymiar. Kuchnie, szafy, garderoby, meble łazienkowe i biurowe. Łączymy tradycyjne rzemiosło z nowoczesnym designem.',
  columns: [
    {
      title: 'Menu',
      links: [
        { label: 'Strona główna', link: '/' },
        { label: 'O nas', link: '/o-nas' },
        { label: 'Realizacje', link: '/realizacje' },
        { label: 'Usługi', link: '/uslugi' },
        { label: 'Kontakt', link: '/kontakt' },
      ],
    },
    {
      title: 'Usługi',
      links: [
        { label: 'Kuchnie na wymiar', link: '/uslugi#kuchnie' },
        { label: 'Szafy i garderoby', link: '/uslugi#szafy' },
        { label: 'Meble łazienkowe', link: '/uslugi#lazienki' },
        { label: 'Meble do salonu', link: '/uslugi#salon' },
        { label: 'Meble biurowe', link: '/uslugi#biuro' },
      ],
    },
  ],
  contactInfo: {
    address: 'Pajęczno',
    phone: '+48 661 244 385',
    email: 'kalabimeblenawymiar@gmail.com',
  },
  socialLinks: [
    { platform: 'facebook', url: 'https://www.facebook.com/profile.php?id=61572478532744' },
    { platform: 'instagram', url: 'https://www.instagram.com/kalabi_meble' },
  ],
  copyrightText: `© ${new Date().getFullYear()} Kalabi. Wszelkie prawa zastrzeżone.`,
}

export const defaultCompanyInfo = {
  name: 'Kalabi Producent Mebli na Wymiar',
  nip: '000-000-00-00',
  address: 'Pajęczno',
  phone: '+48 661 244 385',
  email: 'kalabimeblenawymiar@gmail.com',
  googleMapsUrl: '',
}
