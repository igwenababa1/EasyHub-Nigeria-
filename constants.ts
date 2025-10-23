import type { Product } from './types';

export const BRANCHES = [
  {
    name: 'Ikeja Branch',
    address: 'Shop B1, M-Square Plaza, Pepple Street, Computer Village, Ikeja, Lagos.',
    coords: [6.5960, 3.3421] as [number, number],
  },
  {
    name: 'Ikotun Branch',
    address: 'Shop 20/21, Ferach Plaza, Behind BRT Ikotun Market, Ikotun, Lagos.',
    coords: [6.5501, 3.2647] as [number, number],
  },
  {
    name: 'Victoria Island Branch',
    address: 'Shop C4, Tele Plaza, Saka Tinubu Street, Victoria Island, Lagos.',
    coords: [6.4297, 3.4215] as [number, number],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    category: 'iPhone',
    tagline: 'Titanium. So strong. So light. So Pro.',
    price: 1550000,
    imageUrl: 'https://media.croma.com/image/upload/v1694674253/Croma%20Assets/Communication/Mobiles/Images/300822_0_p1p9uq.png',
    description: 'Experience the A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    condition: 'Brand New',
    specs: {
      'Display': '6.7-inch Super Retina XDR',
      'Chip': 'A17 Pro with 6-core GPU',
      'Camera': 'Pro camera system (48MP Main)',
      'Material': 'Aerospace-grade titanium design',
    },
    warranty: '1-Year Apple Limited Warranty',
    salesCount: 150,
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Samsung',
    tagline: 'Welcome to the era of mobile AI.',
    price: 1400000,
    imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/za/sm-s928bztqafw/gallery/za-galaxy-s24-ultra-sm-s928-sm-s928bztqafw-539455322?$650_519_PNG$',
    description: 'Unleash new levels of creativity and productivity with Galaxy AI. Features the S Pen and a stunning flat display.',
    condition: 'Brand New',
    specs: {
        'Display': '6.8-inch Dynamic AMOLED 2X',
        'Chip': 'Snapdragon® 8 Gen 3 for Galaxy',
        'Camera': '200MP Wide-angle Camera',
        'Feature': 'Built-in S Pen & Galaxy AI',
    },
    warranty: '2-Year Manufacturer Warranty',
    salesCount: 145,
  },
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    category: 'iPhone',
    tagline: 'Pro. Beyond.',
    price: 980000,
    imageUrl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703840578',
    description: 'Featuring the Dynamic Island, a 48MP Main camera for up to 4x greater resolution, and Cinematic mode now in 4K Dolby Vision.',
    condition: 'Foreign Used',
    specs: {
        'Display': '6.1-inch Super Retina XDR',
        'Chip': 'A16 Bionic chip',
        'Camera': 'Pro camera system (48MP Main)',
        'Feature': 'Dynamic Island',
    },
    warranty: '6-Month EasyHub Warranty',
    salesCount: 180,
  },
  {
    id: 'samsung-z-fold5',
    name: 'Samsung Galaxy Z Fold5',
    category: 'Samsung',
    tagline: 'The ultimate multitasking powerhouse.',
    price: 1250000,
    imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/za/sm-f946blgaafa/gallery/za-galaxy-z-fold5-sm-f946-sm-f946blgaafa-537332309?$650_519_PNG$',
    description: 'A massive screen that fits in your pocket. The immersive, tablet-sized screen lets you game, view, and work like never before.',
    condition: 'Brand New',
    specs: {
        'Main Display': '7.6-inch Dynamic AMOLED 2X',
        'Cover Display': '6.2-inch Dynamic AMOLED 2X',
        'Performance': 'Massive 12GB RAM',
        'Feature': 'Multi-window for PC-like multitasking',
    },
    warranty: '2-Year Manufacturer Warranty',
    salesCount: 95,
  },
  {
    id: 'jbl-charge-5',
    name: 'JBL Charge 5',
    category: 'Audio',
    tagline: 'Bold sound for any adventure.',
    price: 85000,
    imageUrl: 'https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-master-catalog_jbl/default/dw772b8349/JBL_Charge_5_Product_Image_Hero_Black.png?sw=1600&sh=1600',
    description: 'Take the party with you with the powerful JBL Pro Sound. This portable speaker is IP67 waterproof and dustproof and offers up to 20 hours of playtime.',
    condition: 'Brand New',
    specs: {
        'Playtime': 'Up to 20 hours',
        'Feature': 'IP67 waterproof and dustproof',
        'Connectivity': 'Bluetooth 5.1',
        'Power': 'Built-in powerbank to charge your devices',
    },
    warranty: '1-Year Manufacturer Warranty',
    salesCount: 250,
  },
    {
    id: 'iphone-13',
    name: 'iPhone 13',
    category: 'iPhone',
    tagline: 'Your new superpower.',
    price: 650000,
    imageUrl: 'https://www.apple.com/v/iphone-13/l/images/overview/hero/hero_green__rz0u5fdewmqq_large.png',
    description: 'Our most advanced dual‑camera system ever. A huge leap in battery life. And a brighter Super Retina XDR display.',
    condition: 'Foreign Used',
    specs: {
        'Display': '6.1-inch Super Retina XDR',
        'Chip': 'A15 Bionic chip',
        'Camera': 'Advanced 12MP dual-camera system',
        'Feature': 'Ceramic Shield, tougher than any smartphone glass',
    },
    warranty: '6-Month EasyHub Warranty',
    salesCount: 210,
  }
];

export const ACCESSORIES: Product[] = [
    {
        id: 'apple-20w-adapter',
        name: 'Apple 20W USB-C Power Adapter',
        category: 'Accessory',
        price: 25000,
        imageUrl: 'https://www.apple.com/v/power-and-cables/l/images/overview/adapter_usbc_20w__ckxxw07j39e6_large.jpg',
        description: 'Offers fast, efficient charging at home, in the office, or on the go. Compatible with any USB-C enabled device.',
        salesCount: 300,
    },
    {
        id: 'samsung-45w-adapter',
        name: 'Samsung 45W Power Adapter',
        category: 'Accessory',
        price: 30000,
        imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/za/ep-t4510xbegeu/gallery/za-45w-power-adapter-ep-t4510xbegeu-530932462?$650_519_PNG$',
        description: 'Give your devices the powerful charging support they deserve. Enjoy Super Fast Charging for a wide range of tech essentials.',
        salesCount: 180,
    },
    {
        id: 'anker-powerbank-737',
        name: 'Anker 737 Power Bank',
        category: 'Accessory',
        price: 75000,
        imageUrl: 'https://cdn.shopify.com/s/files/1/0551/8157/7739/products/A1289111-3-1_1024x1024.webp?v=1661763784',
        description: 'A massive 24,000mAh capacity and 140W of power, perfect for charging laptops, phones, and all your tech on the go.',
        salesCount: 190,
    },
    {
        id: 'iphone-silicone-case',
        name: 'iPhone Silicone Case with MagSafe',
        category: 'Accessory',
        price: 35000,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MPRY3_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1693522774983',
        description: 'A delightful way to protect your iPhone. The silky, soft-touch finish of the silicone exterior feels great in your hand.',
        salesCount: 220,
    }
];

// FIX: Add missing CURRENCY_RATES and TRANSLATIONS exports to resolve import errors in contexts/LocalizationContext.tsx.
export const CURRENCY_RATES: { [key: string]: number } = {
  'USD': 0.00067, // Dummy exchange rate from NGN
  'EUR': 0.00062,
  'JPY': 0.10,
};

export const TRANSLATIONS: { [key: string]: { [key: string]: string } } = {
  'en-US': {
    'Build Your Ecosystem': 'Build Your Ecosystem',
    'Step 1: Choose Your Foundation': 'Step 1: Choose Your Foundation',
    'Step 2: Accessorize Your Life': 'Step 2: Accessorize Your Life',
    'Your Bundle': 'Your Bundle',
    'Subtotal': 'Subtotal',
    'Bundle Discount': 'Bundle Discount',
    'Total': 'Total',
    'Add Bundle to Cart': 'Add Bundle to Cart',
    'Select a phone to start': 'Select a phone to start',
  },
  'de-DE': {
    'Build Your Ecosystem': 'Bauen Sie Ihr Ökosystem',
    'Step 1: Choose Your Foundation': 'Schritt 1: Wählen Sie Ihre Grundlage',
    'Step 2: Accessorize Your Life': 'Schritt 2: Ergänzen Sie Ihr Leben',
    'Your Bundle': 'Ihr Bündel',
    'Subtotal': 'Zwischensumme',
    'Bundle Discount': 'Bündelrabatt',
    'Total': 'Gesamt',
    'Add Bundle to Cart': 'Bündel in den Warenkorb legen',
    'Select a phone to start': 'Wählen Sie ein Telefon, um zu beginnen',
  },
};