// Mock data for CorporateMoments - Photographer Booking App

export const locationData = {
  country: "India",
  city: "Delhi, India"
};

export const searchPlaceholders = [
  "Wedding Photographer",
  "Pre-Wedding Shoot",
  "Maternity Shoot",
  "Product Photography",
  "Birthday Event"
];

export const heroBanners = [
  { id: 1, title: "Capture Forever", subtitle: "Moments?", cta: "Book Now", image: "https://images.unsplash.com/photo-1643102808766-6811669ab324?w=1200&q=80", bg: "from-rose-100 to-amber-50" },
  { id: 2, title: "Weekend Shoot", subtitle: "Flat 25% Off", cta: "Grab Deal", image: "https://images.unsplash.com/photo-1728022615324-78dbe04cac43?w=1200&q=80", bg: "from-pink-100 to-orange-50" },
  { id: 3, title: "Pre-Wedding", subtitle: "Magic Packages", cta: "Explore", image: "https://images.pexels.com/photos/31107091/pexels-photo-31107091.jpeg?w=1200&q=80", bg: "from-fuchsia-100 to-pink-50" }
];

export const userTypes = [
  { id: "personal", label: "Personal", icon: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" },
  { id: "business", label: "Business", icon: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" }
];

export const categories = [
  { id: "wedding",     title: "Wedding\nPhotography", image: "https://images.unsplash.com/flagged/photo-1552981941-424aac2b4311?w=400&q=80", badge: null,        wide: false },
  { id: "prewedding",  title: "Pre-Wedding\nShoot",   image: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=400&q=80",       badge: null,        wide: false },
  { id: "cinematic",   title: "Cinematic Films",      image: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&q=80",       badge: "Trending",  wide: false },
  { id: "maternity",   title: "Maternity\nShoot",     image: "https://images.pexels.com/photos/3888214/pexels-photo-3888214.jpeg?w=400&q=80", badge: "Trending",  wide: false },
  { id: "baby",        title: "Baby &\nNewborn",      image: "https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=400&q=80",       badge: "New",       wide: false },
  { id: "fashion",     title: "Fashion &\nPortfolio", image: "https://images.unsplash.com/photo-1536293283170-b4604bbe272f?w=400&q=80",       badge: "New",       wide: false },
  { id: "product",     title: "Product\nShoots",      image: "https://images.unsplash.com/photo-1513031300226-c8fb12de9ade?w=400&q=80",       badge: null,        wide: false },
  { id: "events",      title: "Events &\nBirthdays",  image: "https://images.pexels.com/photos/33425292/pexels-photo-33425292.jpeg?w=400&q=80",badge: null,        wide: false },
  { id: "corporate",   title: "Corporate\nHeadshots", image: "https://images.pexels.com/photos/9856374/pexels-photo-9856374.jpeg?w=400&q=80", badge: null,        wide: false },
  { id: "realestate",  title: "Real Estate\n& Interior", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",     badge: "New",       wide: false }
];

// Helper: given a category id, returns its display title (single line)
export const categoryTitle = (id) => {
  const c = categories.find((x) => x.id === id);
  if (!c) return "Photographers";
  return c.title.replace(/\n/g, " ");
};

// ─────────────────────────────────────────────────────────────
// Photographers — full directory used by category & profile pages
// ─────────────────────────────────────────────────────────────
export const photographers = [
  {
    id: "pg1",
    name: "Studio Moments by Raj",
    tagline: "Wedding & cinematic storyteller",
    cover: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=1400&q=85",
    avatar: "https://i.pravatar.cc/200?img=12",
    city: "Delhi NCR",
    rating: 4.9,
    reviews: 1820,
    yearsExperience: 9,
    deliveriesCompleted: 340,
    verified: true,
    award: "Top Rated 2025",
    categories: ["wedding", "prewedding", "cinematic"],
    specialties: ["Candid", "Cinematic Films", "Drone"],
    languages: ["English", "Hindi", "Punjabi"],
    startingPrice: 35000,
    about: "A decade of weddings across India. We don't shoot — we document a love story like a feature film. Recognised by Vogue Wedding & Conde Nast Traveller.",
    portfolio: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=85",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1000&q=85",
      "https://images.unsplash.com/flagged/photo-1552981941-424aac2b4311?w=1000&q=85",
      "https://images.pexels.com/photos/33425292/pexels-photo-33425292.jpeg?w=1000&q=85",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1000&q=85",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1000&q=85"
    ],
    packages: [
      { id: "pg1-p1", name: "Classic Wedding Coverage", subtitle: "Full Day · 2 Photographers · 500+ Edited",  duration: "8 hrs",  price: 45000,  originalPrice: 60000  },
      { id: "pg1-p2", name: "Candid & Traditional Combo", subtitle: "Full Day · Cinematic Highlight · Album", duration: "10 hrs", price: 65000,  originalPrice: 85000  },
      { id: "pg1-p3", name: "Destination Wedding Pro",   subtitle: "3 Day Coverage · Drone · Team of 4",      duration: "3 days", price: 125000, originalPrice: 160000 }
    ],
    reviewsList: [
      { id: "r1", name: "Ananya Mehta", city: "Mumbai",    rating: 5, text: "Felt like a movie. Every emotion captured beautifully.",                avatar: "https://i.pravatar.cc/100?img=47", date: "Feb 2026" },
      { id: "r2", name: "Karan Bedi",   city: "Delhi",     rating: 5, text: "Drone footage was unreal. Album arrived in 3 weeks, perfect quality.",  avatar: "https://i.pravatar.cc/100?img=22", date: "Jan 2026" }
    ]
  },
  {
    id: "pg2",
    name: "The Candid Collective",
    tagline: "Pre-wedding · Couple stories",
    cover: "https://images.unsplash.com/photo-1643102808766-6811669ab324?w=1400&q=85",
    avatar: "https://i.pravatar.cc/200?img=32",
    city: "Mumbai",
    rating: 4.8,
    reviews: 1240,
    yearsExperience: 7,
    deliveriesCompleted: 220,
    verified: true,
    award: "Editor's Pick",
    categories: ["prewedding", "wedding", "fashion"],
    specialties: ["Couple", "Editorial", "Beach"],
    languages: ["English", "Hindi", "Marathi"],
    startingPrice: 18000,
    about: "We chase soft light and softer moments. Pre-wedding films that feel cinematic without trying too hard. Goa & Mumbai based.",
    portfolio: [
      "https://images.unsplash.com/photo-1728022615324-78dbe04cac43?w=1000&q=85",
      "https://images.pexels.com/photos/31107091/pexels-photo-31107091.jpeg?w=1000&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1000&q=85",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&q=85",
      "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?w=1000&q=85",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1000&q=85"
    ],
    packages: [
      { id: "pg2-p1", name: "Candid Pre-Wedding Story", subtitle: "2 Locations · 4 Hrs · 150+ Edited", duration: "4 hrs",  price: 18000, originalPrice: 25000 },
      { id: "pg2-p2", name: "Cinematic Love Film",      subtitle: "Story Reel · 3 Outfits · Drone",   duration: "6 hrs",  price: 32000, originalPrice: 42000 },
      { id: "pg2-p3", name: "Beach Romance Package",    subtitle: "Goa/Pondy · 2 Day · Full Crew",    duration: "2 days", price: 55000, originalPrice: 70000 }
    ],
    reviewsList: [
      { id: "r1", name: "Priya Iyer",   city: "Bangalore", rating: 5, text: "Stunning light, calm vibe. Goa shoot was unforgettable.", avatar: "https://i.pravatar.cc/100?img=32", date: "Dec 2025" }
    ]
  },
  {
    id: "pg3",
    name: "Lumière by Anaya",
    tagline: "Maternity, baby & lifestyle",
    cover: "https://images.pexels.com/photos/3888214/pexels-photo-3888214.jpeg?w=1400&q=85",
    avatar: "https://i.pravatar.cc/200?img=44",
    city: "Bangalore",
    rating: 4.9,
    reviews: 890,
    yearsExperience: 6,
    deliveriesCompleted: 410,
    verified: true,
    award: "Mother's Choice",
    categories: ["maternity", "baby", "fashion"],
    specialties: ["Maternity", "Newborn", "Soft Studio"],
    languages: ["English", "Hindi", "Kannada"],
    startingPrice: 8999,
    about: "A women-led studio specialising in soft-light maternity & newborn portraits. In-studio HMUA, wardrobe and props included.",
    portfolio: [
      "https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=1000&q=85",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000&q=85",
      "https://images.pexels.com/photos/3888214/pexels-photo-3888214.jpeg?w=1000&q=85",
      "https://images.unsplash.com/photo-1438962136829-452260720431?w=1000&q=85",
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=1000&q=85",
      "https://images.unsplash.com/photo-1518183214770-9cffbec72538?w=1000&q=85"
    ],
    packages: [
      { id: "pg3-p1", name: "Glow Maternity Studio", subtitle: "Indoor · 2 Outfits · 60+ Edited", duration: "2 hrs", price: 8999,  originalPrice: 12500 },
      { id: "pg3-p2", name: "Outdoor Golden Hour",   subtitle: "3 Outfits · Hair & Makeup",       duration: "3 hrs", price: 14999, originalPrice: 19000 }
    ],
    reviewsList: [
      { id: "r1", name: "Naina G.", city: "Bangalore", rating: 5, text: "Felt like a princess. Anaya is patient and kind.", avatar: "https://i.pravatar.cc/100?img=10", date: "Jan 2026" }
    ]
  },
  {
    id: "pg4",
    name: "Frame & Co.",
    tagline: "Fashion · Editorial · Portfolio",
    cover: "https://images.unsplash.com/photo-1536293283170-b4604bbe272f?w=1400&q=85",
    avatar: "https://i.pravatar.cc/200?img=68",
    city: "Mumbai",
    rating: 4.7,
    reviews: 420,
    yearsExperience: 5,
    deliveriesCompleted: 180,
    verified: true,
    award: null,
    categories: ["fashion", "corporate"],
    specialties: ["Editorial", "Studio", "Lookbook"],
    languages: ["English", "Hindi"],
    startingPrice: 6999,
    about: "Editorial fashion & portfolio specialists. Bandra studio with two shooting bays and an in-house stylist.",
    portfolio: [
      "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=1000&q=85",
      "https://images.unsplash.com/photo-1536293283170-b4604bbe272f?w=1000&q=85",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=85",
      "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=1000&q=85",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1000&q=85",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=85"
    ],
    packages: [
      { id: "pg4-p1", name: "Model Portfolio Basic",     subtitle: "Studio · 50+ Edited · 1 Look",     duration: "2 hrs", price: 6999,  originalPrice: 9000  },
      { id: "pg4-p2", name: "Premium Portfolio Suite",   subtitle: "4 Looks · Hair & Makeup · Retouch", duration: "5 hrs", price: 18999, originalPrice: 24000 }
    ],
    reviewsList: [
      { id: "r1", name: "Riya Khanna", city: "Mumbai", rating: 5, text: "Got signed by an agency 3 weeks after this shoot.", avatar: "https://i.pravatar.cc/100?img=49", date: "Nov 2025" }
    ]
  },
  {
    id: "pg5",
    name: "PixelHouse Studios",
    tagline: "Product · E-com · Catalogue",
    cover: "https://images.unsplash.com/photo-1513031300226-c8fb12de9ade?w=1400&q=85",
    avatar: "https://i.pravatar.cc/200?img=15",
    city: "Pune",
    rating: 4.8,
    reviews: 670,
    yearsExperience: 8,
    deliveriesCompleted: 1240,
    verified: true,
    award: null,
    categories: ["product", "corporate"],
    specialties: ["E-commerce", "360°", "Tabletop"],
    languages: ["English", "Hindi", "Marathi"],
    startingPrice: 4999,
    about: "We shoot for D2C brands across food, beauty and apparel. Same-day delivery on bulk catalogue shoots.",
    portfolio: [
      "https://images.unsplash.com/photo-1513031300226-c8fb12de9ade?w=1000&q=85",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1000&q=85",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&q=85",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=85",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1000&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=85"
    ],
    packages: [
      { id: "pg5-p1", name: "E-com Catalogue Day", subtitle: "Up to 30 SKUs · White BG · Edited", duration: "8 hrs", price: 14999, originalPrice: 22000 },
      { id: "pg5-p2", name: "Lifestyle Product",   subtitle: "Mood-led · 15 Hero Shots",          duration: "5 hrs", price: 24999, originalPrice: 32000 }
    ],
    reviewsList: [
      { id: "r1", name: "Aarav D.", city: "Pune", rating: 5, text: "Saved us 2 weeks of marketplace approvals. Pro team.", avatar: "https://i.pravatar.cc/100?img=33", date: "Jan 2026" }
    ]
  },
  {
    id: "pg6",
    name: "Kalpa Films",
    tagline: "Cinematic films & event reels",
    cover: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1400&q=85",
    avatar: "https://i.pravatar.cc/200?img=58",
    city: "Delhi NCR",
    rating: 4.9,
    reviews: 540,
    yearsExperience: 10,
    deliveriesCompleted: 190,
    verified: true,
    award: "FilmFreeway 2024",
    categories: ["cinematic", "wedding", "events"],
    specialties: ["Cinematic", "Story Reels", "Drone"],
    languages: ["English", "Hindi"],
    startingPrice: 55000,
    about: "Three Sundance shorts in our showreel. We translate weddings & launches into watchable feature films.",
    portfolio: [
      "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1000&q=85",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1000&q=85",
      "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=1000&q=85",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1000&q=85",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1000&q=85",
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=1000&q=85"
    ],
    packages: [
      { id: "pg6-p1", name: "Highlight Film",   subtitle: "5 Min Cinematic · 4K · Music Licensed", duration: "Full day", price: 55000,  originalPrice: 75000  },
      { id: "pg6-p2", name: "Feature Wedding",  subtitle: "20 Min Film · 2 Day · Drone",           duration: "2 days",   price: 145000, originalPrice: 180000 }
    ],
    reviewsList: [
      { id: "r1", name: "Tanvi Rao", city: "Delhi", rating: 5, text: "Wept watching it. Pure cinema.", avatar: "https://i.pravatar.cc/100?img=20", date: "Dec 2025" }
    ]
  },
  {
    id: "pg7",
    name: "Headshot HQ",
    tagline: "Corporate headshots · LinkedIn",
    cover: "https://images.pexels.com/photos/9856374/pexels-photo-9856374.jpeg?w=1400&q=85",
    avatar: "https://i.pravatar.cc/200?img=51",
    city: "Bangalore",
    rating: 4.8,
    reviews: 1180,
    yearsExperience: 6,
    deliveriesCompleted: 2400,
    verified: true,
    award: null,
    categories: ["corporate", "fashion"],
    specialties: ["LinkedIn", "Team Day", "On-site"],
    languages: ["English", "Hindi", "Kannada", "Tamil"],
    startingPrice: 1499,
    about: "Crisp, modern headshots for founders, professionals and full teams. Studio + on-site at your office.",
    portfolio: [
      "https://images.pexels.com/photos/9856374/pexels-photo-9856374.jpeg?w=1000&q=85",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1000&q=85",
      "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=1000&q=85",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1000&q=85",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=85",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1000&q=85"
    ],
    packages: [
      { id: "pg7-p1", name: "Solo LinkedIn",   subtitle: "30 Min · 5 Edited · Studio",           duration: "30 min", price: 1499,  originalPrice: 2499  },
      { id: "pg7-p2", name: "Team Day On-site", subtitle: "Up to 20 ppl · 4 Hrs · Group + Solo",  duration: "4 hrs",  price: 24999, originalPrice: 32000 }
    ],
    reviewsList: [
      { id: "r1", name: "Vikram B.", city: "Bangalore", rating: 5, text: "Did 18 of our team in a single morning. Efficient.", avatar: "https://i.pravatar.cc/100?img=66", date: "Feb 2026" }
    ]
  },
  {
    id: "pg8",
    name: "Festa Events Lens",
    tagline: "Birthdays · Parties · Anniversaries",
    cover: "https://images.pexels.com/photos/33425292/pexels-photo-33425292.jpeg?w=1400&q=85",
    avatar: "https://i.pravatar.cc/200?img=27",
    city: "Hyderabad",
    rating: 4.7,
    reviews: 380,
    yearsExperience: 4,
    deliveriesCompleted: 140,
    verified: false,
    award: null,
    categories: ["events", "wedding"],
    specialties: ["Parties", "Cake-cutting", "Décor"],
    languages: ["English", "Hindi", "Telugu"],
    startingPrice: 7999,
    about: "Energetic event coverage. Same-day teaser reel for socials, full edit in 7 days.",
    portfolio: [
      "https://images.pexels.com/photos/33425292/pexels-photo-33425292.jpeg?w=1000&q=85",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&q=85",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000&q=85",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1000&q=85",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1000&q=85",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1000&q=85"
    ],
    packages: [
      { id: "pg8-p1", name: "Birthday Essentials",  subtitle: "3 Hrs · 100+ Edited · Reel",       duration: "3 hrs", price: 7999,  originalPrice: 10500 },
      { id: "pg8-p2", name: "Anniversary Premium",  subtitle: "5 Hrs · Decor + Couple shoot",     duration: "5 hrs", price: 14999, originalPrice: 19000 }
    ],
    reviewsList: [
      { id: "r1", name: "Ishita P.", city: "Hyderabad", rating: 5, text: "Got teaser by midnight. Insta-perfect.", avatar: "https://i.pravatar.cc/100?img=5", date: "Dec 2025" }
    ]
  },
  {
    id: "pg9",
    name: "Casa Lens",
    tagline: "Real estate · Architecture · Interior",
    cover: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85",
    avatar: "https://i.pravatar.cc/200?img=18",
    city: "Mumbai",
    rating: 4.9,
    reviews: 290,
    yearsExperience: 7,
    deliveriesCompleted: 420,
    verified: true,
    award: "ArchDigest Listed",
    categories: ["realestate", "product"],
    specialties: ["Tilt-shift", "HDR", "Twilight"],
    languages: ["English", "Hindi", "Marathi"],
    startingPrice: 12999,
    about: "Architectural photography for builders, designers and luxury rentals. HDR + twilight magic at every property.",
    portfolio: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=85",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=85",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1000&q=85"
    ],
    packages: [
      { id: "pg9-p1", name: "Listing Essentials",  subtitle: "20 Edited Stills · 1 BHK – 3 BHK",  duration: "3 hrs", price: 12999, originalPrice: 16500 },
      { id: "pg9-p2", name: "Luxury Twilight",     subtitle: "Day + Twilight · Drone · Reel",     duration: "5 hrs", price: 28999, originalPrice: 36000 }
    ],
    reviewsList: [
      { id: "r1", name: "Manav S.", city: "Mumbai", rating: 5, text: "Listing got 3× more enquiries.", avatar: "https://i.pravatar.cc/100?img=8", date: "Jan 2026" }
    ]
  }
];

export const getPhotographer = (id) => photographers.find((p) => p.id === id);
export const getPhotographersByCategory = (catId) =>
  photographers.filter((p) => p.categories.includes(catId));

export const mostBookedTabs = ["Wedding Photography", "Pre-Wedding Shoot", "Maternity Shoot", "Fashion Portfolio"];

// Tab → category id used to navigate from MostBooked
export const tabToCategory = {
  "Wedding Photography": "wedding",
  "Pre-Wedding Shoot": "prewedding",
  "Maternity Shoot": "maternity",
  "Fashion Portfolio": "fashion"
};

// Each "service" entry now references a photographer + their package id so
// MostBooked cards can navigate directly to a photographer profile.
export const mostBookedServices = {
  "Wedding Photography": [
    { id: "w1", photographerId: "pg1", packageId: "pg1-p1", title: "Classic Wedding Coverage",  subtitle: "Full Day · 2 Photographers · 500+ Edited",     price: 45000,  originalPrice: 60000,  rating: 4.8, reviews: 2340, image: "https://images.unsplash.com/flagged/photo-1552981941-424aac2b4311?w=600&q=80", duration: "8 hrs"  },
    { id: "w2", photographerId: "pg1", packageId: "pg1-p2", title: "Candid & Traditional Combo", subtitle: "Full Day · Cinematic Highlight · Album",       price: 65000,  originalPrice: 85000,  rating: 4.9, reviews: 1820, image: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=600&q=80", duration: "10 hrs" },
    { id: "w3", photographerId: "pg6", packageId: "pg6-p2", title: "Destination Wedding Pro",   subtitle: "3 Day Coverage · Drone · Team of 4",            price: 145000, originalPrice: 180000, rating: 4.9, reviews: 760,  image: "https://images.pexels.com/photos/33425292/pexels-photo-33425292.jpeg?w=600&q=80", duration: "3 days" }
  ],
  "Pre-Wedding Shoot": [
    { id: "p1", photographerId: "pg2", packageId: "pg2-p1", title: "Candid Pre-Wedding Story", subtitle: "2 Locations · 4 Hrs · 150+ Edited", price: 18000, originalPrice: 25000, rating: 4.8, reviews: 1240, image: "https://images.unsplash.com/photo-1643102808766-6811669ab324?w=600&q=80", duration: "4 hrs"  },
    { id: "p2", photographerId: "pg2", packageId: "pg2-p2", title: "Cinematic Love Film",      subtitle: "Story Reel · 3 Outfits · Drone",   price: 32000, originalPrice: 42000, rating: 4.9, reviews: 980,  image: "https://images.pexels.com/photos/31107091/pexels-photo-31107091.jpeg?w=600&q=80", duration: "6 hrs"  },
    { id: "p3", photographerId: "pg2", packageId: "pg2-p3", title: "Beach Romance Package",    subtitle: "Goa/Pondy · 2 Day · Full Crew",    price: 55000, originalPrice: 70000, rating: 4.7, reviews: 540,  image: "https://images.unsplash.com/photo-1728022615324-78dbe04cac43?w=600&q=80",      duration: "2 days" }
  ],
  "Maternity Shoot": [
    { id: "m1", photographerId: "pg3", packageId: "pg3-p1", title: "Glow Maternity Studio", subtitle: "Indoor · 2 Outfits · 60+ Edited", price: 8999,  originalPrice: 12500, rating: 4.8, reviews: 890, image: "https://images.pexels.com/photos/3888214/pexels-photo-3888214.jpeg?w=600&q=80", duration: "2 hrs" },
    { id: "m2", photographerId: "pg3", packageId: "pg3-p2", title: "Outdoor Golden Hour",   subtitle: "3 Outfits · Hair & Makeup",       price: 14999, originalPrice: 19000, rating: 4.9, reviews: 520, image: "https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=600&q=80",       duration: "3 hrs" }
  ],
  "Fashion Portfolio": [
    { id: "f1", photographerId: "pg4", packageId: "pg4-p1", title: "Model Portfolio Basic",   subtitle: "Studio · 50+ Edited · 1 Look",      price: 6999,  originalPrice: 9000,  rating: 4.7, reviews: 420, image: "https://images.unsplash.com/photo-1536293283170-b4604bbe272f?w=600&q=80", duration: "2 hrs" },
    { id: "f2", photographerId: "pg4", packageId: "pg4-p2", title: "Premium Portfolio Suite", subtitle: "4 Looks · Hair & Makeup · Retouch", price: 18999, originalPrice: 24000, rating: 4.9, reviews: 310, image: "https://images.pexels.com/photos/9856374/pexels-photo-9856374.jpeg?w=600&q=80", duration: "5 hrs" }
  ]
};

export const offers = [
  { id: "o1", title: "First Booking",    code: "CLICK20",   desc: "Flat 20% off on your very first photoshoot",   bg: "from-rose-100 to-rose-50",       accent: "text-rose-700"     },
  { id: "o2", title: "Weekend Bonanza",  code: "WEEKEND15", desc: "Save 15% on Saturday & Sunday bookings",       bg: "from-amber-100 to-amber-50",     accent: "text-amber-700"    },
  { id: "o3", title: "Refer & Earn",     code: "FRIENDS",   desc: "Get ₹500 for each friend who books",           bg: "from-fuchsia-100 to-fuchsia-50", accent: "text-fuchsia-700"  }
];

export const testimonials = [
  { id: "t1", name: "Ananya Mehta",  city: "Mumbai",    rating: 5, text: "Our pre-wedding shoot was magical. The photographer captured every emotion beautifully — felt like a movie!", avatar: "https://i.pravatar.cc/100?img=47" },
  { id: "t2", name: "Rohit Sharma",  city: "Delhi",     rating: 5, text: "Booking was smooth and the team arrived right on time. Got my product catalog shot in under 4 hours.",        avatar: "https://i.pravatar.cc/100?img=12" },
  { id: "t3", name: "Priya Iyer",    city: "Bangalore", rating: 5, text: "My maternity photos turned out stunning. The photographer was patient and made me feel so comfortable.",       avatar: "https://i.pravatar.cc/100?img=32" }
];

export const statsStrip = [
  { value: "50K+",  label: "Happy Clients" },
  { value: "1200+", label: "Verified Pros" },
  { value: "4.9",   label: "Avg Rating"    },
  { value: "30+",   label: "Cities"        }
];
