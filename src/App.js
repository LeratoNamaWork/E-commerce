import React, { useState, useEffect } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// ─── Product Database ──────────────────────────────────────────────────────
const bulkProducts = [
  {
    id: 1002,
    name: "Sir Juice Premium Fruit Juice (6 x 1.5L)",
    brand: "Sir Juice",
    category: "bulk",
    price: 499,
    flavors: ["Cocktail", "Cranberry", "Mango", "Mix"],
    colorHex: { "Cocktail": "#e67e22", "Cranberry": "#c0392b", "Mango": "#f39c12", "Mix": "#27ae60" },
    colorImages: {
      "Cocktail": "/SirFruitCocktail.webp",
      "Cranberry": "/SirFruitCranberry.webp",
      "Mango": "/SirFruitMango.webp",
      "Mix": "/SirFruitMix.jpg"
    },
    specs: "Premium fruit juice, pack of 6 x 1.5L bottles, 100% natural, no preservatives, available in 4 delicious flavors",
    reviews: [
      { name: "Linda N.", stars: 5, text: "Perfect for corporate events. The variety pack is a hit!" },
      { name: "James K.", stars: 4, text: "Great quality juice, our staff love the mango flavor." }
    ],
    icon: "fa-wine-bottle",
    image: "/SirFruitMango.webp",
    defaultColor: "Mango",
    bulkPack: "6 x 1.5L",
    isFlavor: true,
    colors: ["Cocktail", "Cranberry", "Mango", "Mix"]
  },
  {
    id: 101, name: "HP LaserJet Pro M404n", brand: "HP", category: "bulk", price: 499,
    colors: ["White", "Gray"], colorHex: { "White": "#f0f0f0", "Gray": "#7a7a7a" },
    specs: "Monochrome laser printer, 40ppm, 2.7\" touchscreen, Ethernet, 256MB, 1200x1200 dpi, duty cycle 80k pages",
    reviews: [{ name: "Bulk Buyer", stars: 5, text: "Great for office fleet, volume pricing was excellent." }],
    icon: "fa-print",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=300&h=200&fit=crop"
  },
  {
    id: 102, name: "Dell OptiPlex 7010 SFF", brand: "Dell", category: "bulk", price: 899,
    colors: ["Black"], colorHex: { "Black": "#1a1a1a" },
    specs: "Intel Core i7-13700, 16GB DDR5, 512GB SSD, Windows 11 Pro, 3yr warranty, small form factor",
    reviews: [{ name: "IT Director", stars: 5, text: "Deployed 50 units, solid performance and quiet." }],
    icon: "fa-desktop",
    image: "https://intelligentcomputing.co.za/wp-content/uploads/2024/07/Webp.net-resizeimage-7.png"
  },
  {
    id: 103, name: "Dell Premier Keyboard & Mouse KM900", brand: "Dell", category: "bulk", price: 249,
    colors: ["Black"], colorHex: { "Black": "#1a1a1a" },
    specs: "Wireless keyboard & mouse, UK (QWERTY) layout, rechargeable, 3 device pairing, multi-device flow, silent keys",
    reviews: [{ name: "Procurement Lead", stars: 5, text: "Staff love the comfort, bulk discount made it affordable." }],
    icon: "fa-keyboard",
    image: "https://m.media-amazon.com/images/I/71M1woUGbNL._AC_SX569_.jpg"
  },
  {
    id: 104, name: "Samsung 870 EVO 1TB SSD", brand: "Samsung", category: "bulk", price: 159,
    colors: ["Silver"], colorHex: { "Silver": "#c0c0c0" },
    specs: "SATA III, 1TB, 560/530 MB/s read/write, 2.5\", 5 year warranty, 600 TBW",
    reviews: [{ name: "SysAdmin", stars: 5, text: "Reliable bulk storage upgrade for our workstations." }],
    icon: "fa-hdd",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=200&fit=crop"
  }
];

const iphoneColors = [
  { name: "Black", hex: "#2c2c2c", img: "/iphone17Black.webp" },
  { name: "Orange", hex: "#ff8c42", img: "/iphone17Orange.jpg" },
  { name: "Silver", hex: "#e0e4e8", img: "/iphone17Silver.webp" },
  { name: "White", hex: "#f5f5f5", img: "/iphone17White.jfif" }
];
const iphoneGB = [64, 128, 256, 512];

const appleProduct = {
  id: 999, name: "iPhone 17 Pro", brand: "Apple", category: "electronics", price: 1299,
  colors: iphoneColors.map(c => c.name),
  colorHex: Object.fromEntries(iphoneColors.map(c => [c.name, c.hex])),
  colorImages: Object.fromEntries(iphoneColors.map(c => [c.name, c.img])),
  specs: "A19 Bionic chip, 48MP main camera, 12MP Ultra Wide, Dynamic Island, Always-On display, USB-C, 5G, Face ID",
  reviews: [
    { name: "Tim C.", stars: 5, text: "The ultimate corporate device. Our executive team loves the performance." },
    { name: "Sarah K.", stars: 5, text: "Deployed 20 units across sales team. Camera quality is outstanding." }
  ],
  icon: "fa-mobile-alt",
  image: "/iphone17White.jfif",
  defaultColor: "White",
  gbOptions: iphoneGB
};

const airpodsColors = [
  { name: "Dark Grey", hex: "#4a4a4a", img: "https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907_big.jpg.large.jpg" },
  { name: "White", hex: "#f5f5f5", img: "https://www.dateks.lv/images/pic/1200/1200/163/1498.jpg" }
];
const airpodsProduct = {
  id: 3, name: "Apple AirPods Pro", brand: "Apple", category: "electronics", price: 349,
  colors: airpodsColors.map(c => c.name),
  colorHex: Object.fromEntries(airpodsColors.map(c => [c.name, c.hex])),
  colorImages: Object.fromEntries(airpodsColors.map(c => [c.name, c.img])),
  specs: "Active Noise Cancellation, Transparency mode, Adaptive Audio, Personalized Spatial Audio, MagSafe charging case, USB-C",
  reviews: [{ name: "Priya S.", stars: 5, text: "Amazing sound quality, our sales team loves these for calls." }],
  icon: "fa-headphones",
  image: "https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907_big.jpg.large.jpg",
  defaultColor: "Dark Grey"
};

const fieldBarColors = [
  { name: "Cream White", hex: "#f5f0e8", img: "/FieldBarCreamWhite.jfif" },
  { name: "Light Blue", hex: "#a8d8ea", img: "/FieldBarLightBlue.jfif" },
  { name: "Orchad Orange", hex: "#ff8c42", img: "/FieldBarOrchadOrange.webp" },
  { name: "Parisian Green", hex: "#4a8c5c", img: "/FieldBarParisianGreen.webp" }
];
const fieldBarProduct = {
  id: 1000, name: "Field Bar Drinks Cooler Box", brand: "Field Bar", category: "gifts", price: 349,
  colors: fieldBarColors.map(c => c.name),
  colorHex: Object.fromEntries(fieldBarColors.map(c => [c.name, c.hex])),
  colorImages: Object.fromEntries(fieldBarColors.map(c => [c.name, c.img])),
  specs: "Premium insulated cooler box, holds up to 24 cans, durable construction, ideal for corporate events and outdoor functions, 24hr ice retention",
  reviews: [
    { name: "David M.", stars: 5, text: "Perfect for our company picnics. The Parisian Green looks premium." },
    { name: "Lisa R.", stars: 4, text: "Great quality cooler, keeps drinks cold all day." }
  ],
  icon: "fa-box", image: "/FieldBarParisianGreen.webp", defaultColor: "Parisian Green"
};

const carrolBoyesDinnerware = {
  id: 1001, name: "Carrol Boyes 16-Piece Dinnerware Set", brand: "Carrol Boyes", category: "gifts", price: 799,
  colors: ["White"], colorHex: { "White": "#f5f5f5" },
  specs: "Premium 16-piece stoneware dinnerware set, microwave and dishwasher safe, elegant design, includes 4 dinner plates, 4 side plates, 4 bowls, 4 mugs",
  reviews: [
    { name: "Patricia K.", stars: 5, text: "Exquisite dinnerware, perfect for corporate entertaining." },
    { name: "Michael S.", stars: 5, text: "Bought 5 sets for the executive dining room. Staff love them." }
  ],
  icon: "fa-utensils",
  image: "https://carrolboyes.com/media/catalog/product/c/b/cb23_breakfast_12pc_set_-_eye_for_detail_1_1.jpg",
  defaultColor: "White"
};

const penColors = [
  { name: "Black", hex: "#1a1a1a", img: "https://carrolboyes.com/media/catalog/product/cache/028797f040f8816c3dea910d277fa848/p/e/penb-wn-sil-bl_-_1.jpg" },
  { name: "Gold", hex: "#d4af37", img: "https://carrolboyes.com/media/catalog/product/cache/028797f040f8816c3dea910d277fa848/p/e/pens-secondaries5.jpg" },
  { name: "Maroon", hex: "#800000", img: "https://carrolboyes.com/media/catalog/product/cache/028797f040f8816c3dea910d277fa848/p/e/penf-wn-gld-bur_-_1.jpg" }
];
const penProduct = {
  id: 5, name: "Carrol Boyes Executive Pen Set", brand: "Carrol Boyes", category: "gifts", price: 189,
  colors: penColors.map(c => c.name),
  colorHex: Object.fromEntries(penColors.map(c => [c.name, c.hex])),
  colorImages: Object.fromEntries(penColors.map(c => [c.name, c.img])),
  specs: "Luxury gift box, engraved finish, corporate branding available, includes 2 pens",
  reviews: [{ name: "Thabo M.", stars: 5, text: "Elegant client gifts, they loved the packaging." }],
  icon: "fa-pen-fancy",
  image: "https://carrolboyes.com/media/catalog/product/cache/028797f040f8816c3dea910d277fa848/p/e/penb-wn-sil-bl_-_1.jpg",
  defaultColor: "Black"
};

const notebookProduct = {
  id: 6, name: "Notebook Set — Gathering", brand: "Carrol Boyes", category: "gifts", price: 299,
  colors: ["Assorted"], colorHex: { "Assorted": "#8B7355" },
  specs: "Premium notebook set, ideal for corporate gifting, executive meetings, and personal journaling",
  reviews: [{ name: "Emma W.", stars: 5, text: "Beautiful notebooks, perfect for our executive team." }],
  icon: "fa-book",
  image: "https://carrolboyes.com/media/catalog/product/cache/12bca1f7e51c1fab5012cc9623d35794/n/o/notebooks_v23.jpg",
  defaultColor: "Assorted"
};

const canisterColors = [
  { name: "Black", hex: "#1a1a1a", img: "https://media.takealot.com/covers_images/426239fd2fd4419aad203eafcba09a91/s-zoom.file" },
  { name: "White", hex: "#f5f5f5", img: "https://media.takealot.com/covers_images/f685810e6f9d42bfb2be243cef6673a0/s-zoom.file" }
];
const canisterProduct = {
  id: 10, name: "Carrol Boyes Canister Set of 3", brand: "Carrol Boyes", category: "appliances", price: 299,
  colors: canisterColors.map(c => c.name),
  colorHex: Object.fromEntries(canisterColors.map(c => [c.name, c.hex])),
  colorImages: Object.fromEntries(canisterColors.map(c => [c.name, c.img])),
  specs: "Elegant set of 3 canisters, perfect for kitchen organization, premium ceramic material, airtight seals",
  reviews: [{ name: "Grace K.", stars: 5, text: "Beautiful canisters, great for our staff kitchen." }],
  icon: "fa-boxes",
  image: "https://media.takealot.com/covers_images/426239fd2fd4419aad203eafcba09a91/s-zoom.file",
  defaultColor: "Black"
};

const kettleColors = [
  { name: "White", hex: "#f5f5f5", img: "https://www.hirschs.co.za/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/5/6/5636_2.jpg" },
  { name: "Green Matte", hex: "#4a8c5c", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfKBB0NcEWriNPi-FW9MIPshLAqKJCIC2hzA&s" },
  { name: "Black", hex: "#1a1a1a", img: "https://microless.com/cdn/products/18f76ceeb0ce2d338b1740d1acf5b90f-md.jpg" },
  { name: "Red", hex: "#c41e3a", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR20X5O_XhRhRPdVSsWlkueEyqWIMH2S5o7WQ&s" }
];
const kettleProduct = {
  id: 9, name: "Smeg Retro Kettle", brand: "Smeg", category: "appliances", price: 179,
  colors: kettleColors.map(c => c.name),
  colorHex: Object.fromEntries(kettleColors.map(c => [c.name, c.hex])),
  colorImages: Object.fromEntries(kettleColors.map(c => [c.name, c.img])),
  specs: "1.7L capacity, stainless steel, 360° base, auto shut-off, 1500W, retro design",
  reviews: [{ name: "Zoe R.", stars: 5, text: "Stylish and functional for office pantries." }],
  icon: "fa-kitchen-set",
  image: "https://www.hirschs.co.za/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/5/6/5636_2.jpg",
  defaultColor: "White"
};

const toasterColors = [
  { name: "Black", hex: "#1a1a1a", img: "https://www.hirschs.co.za/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/t/s/tsf02blsa-ezgif.com-crop_1_.jpg" },
  { name: "White", hex: "#f5f5f5", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnM8c-NsOlLvXV-DivmKfZ6Q1LeNZoWRJXDg&s" },
  { name: "Blue", hex: "#a3c9e0", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfyNkBd7diOatELfInpfuyOYlGlukay8Txog&s" },
  { name: "Red", hex: "#c41e3a", img: "https://masons.co.za/wp-content/uploads/2025/07/smeg-TSF02RD-1.webp" }
];
const toasterProduct = {
  id: 12, name: "Smeg 2-Slice Toaster", brand: "Smeg", category: "appliances", price: 149,
  colors: toasterColors.map(c => c.name),
  colorHex: Object.fromEntries(toasterColors.map(c => [c.name, c.hex])),
  colorImages: Object.fromEntries(toasterColors.map(c => [c.name, c.img])),
  specs: "Retro design, 6 browning levels, reheat/defrost, removable crumb tray, 2-slice",
  reviews: [{ name: "Natalie P.", stars: 5, text: "Perfect for staff kitchen." }],
  icon: "fa-bread-slice",
  image: "https://www.hirschs.co.za/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/t/s/tsf02blsa-ezgif.com-crop_1_.jpg",
  defaultColor: "Black"
};

const wineProduct = {
  id: 11, name: "Carrol Boyes Wine Set", brand: "Carrol Boyes", category: "appliances", price: 159,
  colors: ["Silver"], colorHex: { "Silver": "#c0c0c0" },
  specs: "Artisan wine accessories, includes corkscrew, stopper, pourer, premium gift box",
  reviews: [{ name: "Grace K.", stars: 5, text: "Beautiful executive gift." }],
  icon: "fa-wine-glass-alt",
  image: "https://carrolboyes.com/media/catalog/product/cache/12bca1f7e51c1fab5012cc9623d35794/0/g/0g-ww-bao-4_5.jpg",
  defaultColor: "Silver"
};

const electronicsProducts = [
  appleProduct,
  { id: 1, name: "MacBook Pro 14", brand: "Apple", category: "electronics", price: 1999, colors: ["Space Gray", "Silver"], colorHex: { "Space Gray": "#4a4a4a", "Silver": "#e0e4e8" }, specs: "M3 Pro chip (12-core), 16GB unified memory, 512GB SSD, Liquid Retina XDR display, 18hr battery", reviews: [{ name: "John D.", stars: 5, text: "Perfect for our executive team. Fast and reliable." }], icon: "fa-laptop", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop" },
  { id: 2, name: "Dell XPS 15", brand: "Dell", category: "electronics", price: 1849, colors: ["Platinum Silver", "Carbon Black"], colorHex: { "Platinum Silver": "#c0cbd6", "Carbon Black": "#2d2f31" }, specs: "Intel Core i7-13700H, 32GB DDR5, 1TB NVMe SSD, NVIDIA RTX 4060, OLED 3.5K", reviews: [{ name: "Mike T.", stars: 4, text: "Great for developers. Bulk order process was smooth." }], icon: "fa-laptop", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300&h=200&fit=crop" },
  airpodsProduct,
  { id: 4, name: "iPad Pro 12.9", brand: "Apple", category: "electronics", price: 1099, colors: ["Space Gray", "Silver"], colorHex: { "Space Gray": "#4a4a4a", "Silver": "#e0e4e8" }, specs: "M2 chip, Liquid Retina XDR, 128GB, LiDAR scanner, Stage Manager", reviews: [{ name: "David L.", stars: 5, text: "Perfect for presentations and remote work." }], icon: "fa-tablet-alt", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop" }
];

const giftsProducts = [
  carrolBoyesDinnerware,
  fieldBarProduct,
  penProduct,
  notebookProduct,
  { id: 7, name: "Le Creuset Gift Set", brand: "Le Creuset", category: "gifts", price: 249, colors: ["Cerise", "Marseille", "Oyster"], colorHex: { "Cerise": "#e34234", "Marseille": "#0050a0", "Oyster": "#bcaea0" }, specs: "5-piece stoneware set, dishwasher safe, premium gift box", reviews: [{ name: "James C.", stars: 5, text: "High-end, clients appreciate the quality." }], icon: "fa-utensils", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop" }
];

const appliancesProducts = [kettleProduct, canisterProduct, wineProduct, toasterProduct];
const allProducts = [...bulkProducts, ...electronicsProducts, ...giftsProducts, ...appliancesProducts];

// ─── App ───────────────────────────────────────────────────────────────────
function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedGB, setSelectedGB] = useState(128);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [expandedSections, setExpandedSections] = useState({ bulk: false, electronics: false, gifts: false, appliances: false });
  const [showProducts, setShowProducts] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=500&fit=crop", title: "Premium Corporate Procurement", description: "Your one-stop B2B hub for premium electronics, corporate gifting, and bulk office solutions" },
    { image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=1200&h=500&fit=crop", title: "Corporate Gifting, Redefined", description: "Luxury gifts from Carrol Boyes, Field Bar, and more — perfect for impressing clients and rewarding staff" },
    { image: "https://media.istockphoto.com/id/585594066/photo/industrial-megastore.jpg?s=612x612&w=0&k=20&c=zRCx1tc_46bgbSIE8uuWLVX0Z80jST50QNUb1NAiN-c=", title: "Bulk Orders Made Easy", description: "Volume pricing on 10+ units. From electronics to office supplies, we've got your business covered" }
  ];

  const partners = [
    { name: "Apple", image: "https://www.apple.com/ac/globalnav/7/en_US/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__b5er5ngrzxqq_large.svg" },
    { name: "Smeg", image: "https://www.smeg.com/binaries/content/gallery/smeg/history/smeg_history_1977_logo_franco_maria_ricci.jpg" },
    { name: "Carrol Boyes", image: "https://www.waterfront.co.za/wp-content/uploads/2018/05/carrol-boyes.jpg" },
    { name: "Field Bar", image: "https://gooddesign.co.za/wp-content/uploads/2020/12/GoodDesign_Fieldbar_icon-1.jpg" },
    { name: "Sir Juice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStaiLPzAHr69-lPGd5DUQT9f35wLqv6u1Y3g&s" },
    { name: "Dell", image: "https://images.seeklogo.com/logo-png/3/1/dell-logo-png_seeklogo-39672.png" },
    { name: "HP", image: "https://www.logo.wine/a/logo/HP_Inc./HP_Inc.-Logo.wine.svg" }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const scrollToProducts = () => {
    setShowProducts(true);
    setTimeout(() => document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const addToCart = (product, color, gb) => {
    const gbVal = gb || 0;
    const existing = cart.find(i => i.id === product.id && i.selectedColor === color && i.selectedGB === gbVal);
    if (existing) {
      setCart(cart.map(i => i.id === product.id && i.selectedColor === color && i.selectedGB === gbVal ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, {
        id: product.id, name: product.name, brand: product.brand, price: product.price,
        icon: product.icon,
        image: product.colorImages ? product.colorImages[color] : product.image,
        selectedColor: color, selectedGB: gbVal, qty: 1
      }]);
    }
    showToast(`${product.name} added to cart`);
    setShowCart(true);
  };

  const updateQty = (index, delta) => {
    const newCart = [...cart];
    newCart[index].qty += delta;
    if (newCart[index].qty <= 0) newCart.splice(index, 1);
    setCart(newCart);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    showToast('Item removed from cart');
  };

  const getTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const vat = subtotal * 0.15;
    return { subtotal, vat, total: subtotal + vat };
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.defaultColor || product.colors[0]);
    if (product.gbOptions) setSelectedGB(product.gbOptions[1] || product.gbOptions[0]);
  };

  const closeModal = () => setSelectedProduct(null);
  const toggleSection = (s) => setExpandedSections(p => ({ ...p, [s]: !p[s] }));

  // ─── Product Card ────────────────────────────────────────────────────────
  const ProductCard = ({ product, isBulk = false }) => {
    const bulkPrice = (product.price * 0.85).toFixed(2);
    return (
      <div className="product-card" onClick={() => openModal(product)}>
        <div className="product-img">
          {isBulk && <div className="bulk-ribbon">BULK</div>}
          {product.image
            ? <img src={product.image} alt={product.name} />
            : <i className={`fas ${product.icon}`} style={{ color: product.colorHex[product.colors[0]] }}></i>
          }
        </div>
        <div className="product-info">
          <div className="product-brand">{product.brand}</div>
          <div className="product-title">{product.name}</div>
          <div className="product-colors">
            <span className="color-label">
              <i className={`fas ${product.isFlavor ? 'fa-flask' : 'fa-palette'}`} style={{ marginRight: 5 }}></i>
              {product.isFlavor ? 'Flavours' : 'Colours'}
            </span>
            <div className="color-swatches-list">
              {product.colors.map(c => (
                <div key={c} className="color-swatch" style={{ background: product.colorHex[c] }} title={c} />
              ))}
            </div>
          </div>
          <div className="price">
            R{product.price}
            <span className="bulk-price-tag">10+ from R{bulkPrice}</span>
          </div>
          <button className="add-to-cart-card" onClick={(e) => {
            e.stopPropagation();
            addToCart(product, product.defaultColor || product.colors[0], product.gbOptions ? product.gbOptions[1] : 0);
          }}>
            <i className="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    );
  };

  // ─── Product Section ─────────────────────────────────────────────────────
  const ProductSection = ({ title, icon, products, sectionKey, isBulk = false }) => {
    const isExpanded = expandedSections[sectionKey];
    const visible = isExpanded ? products : products.slice(0, 4);
    const hasMore = products.length > 4;

    const inner = (
      <>
        <div className="section-header">
          <h2>
            <span className="section-icon"><i className={`fas ${icon}`}></i></span>
            {title}
            <span className="section-count">{products.length} products</span>
          </h2>
          {hasMore && (
            <span className="see-more" onClick={() => toggleSection(sectionKey)}>
              {isExpanded ? 'Show less ↑' : 'View all →'}
            </span>
          )}
        </div>
        <div className="product-row">
          {visible.map(p => <ProductCard key={p.id} product={p} isBulk={isBulk} />)}
        </div>
      </>
    );

    if (isBulk) return <div className="bulk-section-wrapper">{inner}</div>;
    return <div className="product-section">{inner}</div>;
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="App">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span><i className="fas fa-gift"></i> Corporate gifting available</span>
        <span><i className="fas fa-file-invoice"></i> Request a bulk quotation</span>
        <span><i className="fas fa-globe"></i> SADC & international enquiries welcome</span>
        <span><i className="fas fa-building"></i> Premium brand procurement for businesses</span>
      </div>

      {/* Header */}
      <div className="main-header">
        <div className="header-row">
          <div className="logo">
            <h1>BATTLEFIELD <span>ONLINE</span></h1>
            <p>Premium Procurement · Corporate Gifting · B2B Hub</p>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search brand, product, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="nav-icons">
            <a href="#productsSection" onClick={(e) => { e.preventDefault(); scrollToProducts(); }}>
              <i className="fas fa-chart-line"></i> Bulk Orders
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); showToast("Request a quote — our team responds within 2 hours."); }}>
              <i className="fas fa-file-signature"></i> Get a Quote
            </a>
            <a href="#" className="cart-icon" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-badge">{cart.reduce((s, i) => s + i.qty, 0)}</span>
            </a>
            <a href="#" className="whatsapp" onClick={(e) => { e.preventDefault(); showToast("WhatsApp: +27 87 138 6656 · Corporate team online 8am–5pm SAST"); }}>
              <i className="fab fa-whatsapp"></i> Contact
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="hero-section">
        <div className="hero-slider">
          {slides.map((slide, i) => (
            <div key={i} className={`hero-slide ${i === currentSlide ? 'active' : ''}`} style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <button className="hero-btn" onClick={scrollToProducts}>
                  <i className="fas fa-shopping-bag"></i> Shop Now
                </button>
              </div>
            </div>
          ))}
          <div className="hero-dots">
            {slides.map((_, i) => (
              <span key={i} className={`dot ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)} />
            ))}
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-description">
            <h2>Premium Procurement Solutions for Your Business</h2>
            <p>
              Battlefield Online is your premier B2B hub for premium electronics, corporate gifting,
              and bulk office solutions. We partner with leading brands like Apple, Smeg, Carrol Boyes,
              Field Bar, and Sir Juice — delivering the finest products at competitive volume pricing.
              Whether outfitting your office, rewarding employees, or impressing clients, we deliver.
            </p>
            <button className="hero-btn-secondary" onClick={scrollToProducts}>
              <i className="fas fa-arrow-right"></i> Explore Products
            </button>
          </div>
          <div className="partners-section">
            <h3>Trusted Brand Partners</h3>
            <div className="partners-grid">
              {partners.map((p, i) => (
                <div key={i} className="partner-item">
                  <img src={p.image} alt={p.name} />
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      {showProducts && (
        <div id="productsSection" className="products-container">
          <div className="container">
            <div className="dropdown-group">
              <div className="dropdown">
                <button className="dropbtn"><i className="fas fa-trademark"></i> Shop by Brand ▾</button>
                <div className="dropdown-content">
                  {[...new Set(allProducts.map(p => p.brand))].map(b => (
                    <a key={b} onClick={() => showToast(`Filtering by ${b}`)}>{b}</a>
                  ))}
                </div>
              </div>
              <div className="dropdown">
                <button className="dropbtn"><i className="fas fa-th-large"></i> Shop by Category ▾</button>
                <div className="dropdown-content">
                  <a onClick={() => showToast("Showing all categories")}>All Categories</a>
                  <a onClick={() => showToast("Showing Bulk Orders")}>Bulk Orders</a>
                  <a onClick={() => showToast("Showing Electronics & ICT")}>Electronics & ICT</a>
                  <a onClick={() => showToast("Showing Corporate Gifts")}>Corporate Gifts</a>
                  <a onClick={() => showToast("Showing Home Appliances")}>Home Appliances</a>
                </div>
              </div>
            </div>

            <ProductSection title="Bulk Orders — 10+ Units" icon="fa-warehouse" products={bulkProducts} sectionKey="bulk" isBulk={true} />
            <ProductSection title="Electronics & ICT" icon="fa-microchip" products={electronicsProducts} sectionKey="electronics" />
            <ProductSection title="Corporate Gifts & Executive Collection" icon="fa-gift" products={giftsProducts} sectionKey="gifts" />
            <ProductSection title="Home Appliances" icon="fa-blender" products={appliancesProducts} sectionKey="appliances" />

            {/* Bulk Panel */}
            <div id="bulkOrderPanel" className="bulk-panel">
              <h2>Request a Bulk Quote</h2>
              <p>Quantity-based pricing for 10+ units across all categories. Our corporate team responds within 2 business hours.</p>
              <div className="bulk-form">
                <input type="text" placeholder="Company name *" />
                <input type="email" placeholder="Work email *" />
                <input type="text" placeholder="Product interest (brand or product)" />
                <input type="number" placeholder="Quantity required (min 10)" />
                <input type="text" placeholder="Delivery province / country" />
                <select>
                  <option>Branding required: No</option>
                  <option>Branding required: Yes</option>
                </select>
                <input type="date" />
                <textarea rows="3" placeholder="Specifications or additional notes..."></textarea>
                <div className="full-width">
                  <button className="submit-bulk-btn" onClick={() => showToast("✓ Bulk request received — our team will respond within 2 hours.")}>
                    Submit Bulk Request →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                {selectedProduct.name}
                <span>by {selectedProduct.brand}</span>
              </h2>
              <span className="close-modal" onClick={closeModal}>&times;</span>
            </div>

            <div className="modal-product-image">
              {selectedProduct.colorImages?.[selectedColor]
                ? <img src={selectedProduct.colorImages[selectedColor]} alt={`${selectedProduct.name} in ${selectedColor}`} />
                : selectedProduct.image
                  ? <img src={selectedProduct.image} alt={selectedProduct.name} />
                  : <i className={`fas ${selectedProduct.icon}`} style={{ color: selectedProduct.colorHex[selectedColor] }} />
              }
            </div>

            {selectedProduct.colors.length > 1 && (
              <>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--obsidian)', marginBottom: 8 }}>
                  <i className={`fas ${selectedProduct.isFlavor ? 'fa-flask' : 'fa-palette'}`} style={{ marginRight: 8 }}></i>
                  {selectedProduct.isFlavor ? 'Available Flavours' : 'Available Colours'}: <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{selectedColor}</span>
                </div>
                <div className="modal-colors-row">
                  {selectedProduct.colors.map(c => (
                    <div
                      key={c}
                      className="modal-color-swatch"
                      style={{
                        background: selectedProduct.colorHex[c],
                        border: selectedColor === c ? '3px solid var(--battle-green)' : '3px solid #e0e0e0',
                        outline: selectedColor === c ? '2px solid var(--battle-green)' : 'none',
                        outlineOffset: '3px'
                      }}
                      onClick={() => setSelectedColor(c)}
                      title={c}
                    />
                  ))}
                </div>
              </>
            )}

            {selectedProduct.gbOptions && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--obsidian)', marginBottom: 10 }}>
                  <i className="fas fa-memory" style={{ marginRight: 8 }}></i> Storage Capacity
                </div>
                <div className="modal-gb-row">
                  {selectedProduct.gbOptions.map(gb => (
                    <span key={gb} className={`gb-option ${selectedGB === gb ? 'active' : ''}`} onClick={() => setSelectedGB(gb)}>
                      {gb} GB
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedProduct.bulkPack && (
              <div className="pack-badge">
                <i className="fas fa-box" style={{ color: 'var(--battle-green)' }}></i>
                <strong>Pack size:</strong> {selectedProduct.bulkPack}
              </div>
            )}

            <div className="specs-section">
              <strong><i className="fas fa-list-ul"></i> Specifications</strong>
              <ul className="specs-list">
                <li><strong>Brand:</strong> {selectedProduct.brand}</li>
                <li><strong>Specs:</strong> {selectedProduct.specs}</li>
                <li><strong>Bulk Discount:</strong> 15% off on 10+ units</li>
                <li><strong>Warranty:</strong> 3 years on bulk corporate orders</li>
              </ul>
            </div>

            <div className="reviews-section">
              <strong><i className="fas fa-star"></i> Customer Reviews</strong>
              {selectedProduct.reviews.map((r, i) => (
                <div key={i} className="review-item">
                  <div className="review-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
                  <strong>{r.name}</strong>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>

            <div className="modal-price-row">
              R{selectedProduct.price}
              <span>excl. VAT &nbsp;·&nbsp; Bulk 10+ units: R{(selectedProduct.price * 0.85).toFixed(2)} each</span>
            </div>

            <button className="modal-add-to-cart" onClick={() => {
              addToCart(selectedProduct, selectedColor, selectedProduct.gbOptions ? selectedGB : 0);
              closeModal();
            }}>
              <i className="fas fa-cart-plus"></i> Add to Cart
            </button>
            <button className="bulk-quote-btn" onClick={() => {
              closeModal();
              setTimeout(() => document.getElementById('bulkOrderPanel')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }}>
              <i className="fas fa-chart-line"></i> Request Bulk Quote
            </button>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) setShowCart(false); }}>
          <div className="cart-sidebar">
            <div className="cart-header">
              <h2><i className="fas fa-shopping-cart"></i> Your Cart</h2>
              <span className="cart-close" onClick={() => setShowCart(false)}>&times;</span>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <i className="fas fa-shopping-bag"></i>
                <p style={{ fontWeight: 600, color: 'var(--obsidian)' }}>Your cart is empty</p>
                <p>Browse our premium products and add items for corporate pricing.</p>
              </div>
            ) : (
              <>
                {cart.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <div className="cart-item-icon">
                      {item.image ? <img src={item.image} alt={item.name} /> : <i className={`fas ${item.icon}`}></i>}
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-color">{item.selectedColor}{item.selectedGB ? ` · ${item.selectedGB}GB` : ''} · {item.brand}</div>
                    </div>
                    <div className="cart-item-qty">
                      <button className="qty-btn" onClick={() => updateQty(idx, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(idx, 1)}>+</button>
                    </div>
                    <div className="cart-item-price">R{(item.price * item.qty).toFixed(2)}</div>
                    <span className="remove-item" onClick={() => removeItem(idx)}><i className="fas fa-trash"></i></span>
                  </div>
                ))}
                <div className="cart-total">
                  <div className="cart-total-row"><span>Subtotal</span><span>R{getTotal().subtotal.toFixed(2)}</span></div>
                  <div className="cart-total-row" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}><span>VAT (15%)</span><span>R{getTotal().vat.toFixed(2)}</span></div>
                  <div className="cart-total-row"><span>Total</span><span>R{getTotal().total.toFixed(2)}</span></div>
                  <button className="checkout-btn" onClick={() => { setShowCart(false); setShowCheckout(true); }}>
                    <i className="fas fa-lock"></i> Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout */}
      {showCheckout && (
        <div className="checkout-modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) setShowCheckout(false); }}>
          <div className="checkout-content">
            <div className="modal-header">
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: 'var(--obsidian)' }}>
                <i className="fas fa-credit-card" style={{ marginRight: 10, color: 'var(--battle-green)', fontSize: '1.2rem' }}></i>
                Checkout
              </h2>
              <span className="close-modal" onClick={() => setShowCheckout(false)}>&times;</span>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              showToast('✓ Order placed! Our team will contact you within 2 hours.');
              setShowCheckout(false);
              setCart([]);
            }}>
              <input type="text" placeholder="Full name *" required />
              <input type="email" placeholder="Work email *" required />
              <input type="tel" placeholder="Phone number *" required />
              <input type="text" placeholder="Delivery address *" required />
              <select required>
                <option value="">Select province</option>
                {['Gauteng','Western Cape','KwaZulu-Natal','Eastern Cape','Free State','Limpopo','Mpumalanga','North West','Northern Cape'].map(p => <option key={p}>{p}</option>)}
              </select>

              <div style={{ margin: '16px 0 8px', fontWeight: 700, fontSize: '0.875rem', color: 'var(--obsidian)' }}>Payment Method</div>
              <div className="payment-options">
                <div className="payment-option selected"><i className="fas fa-credit-card"></i> Credit Card</div>
                <div className="payment-option"><i className="fas fa-university"></i> EFT</div>
                <div className="payment-option"><i className="fas fa-file-invoice"></i> Invoice</div>
              </div>

              <input type="text" placeholder="Card number" />
              <div style={{ display: 'flex', gap: 12 }}>
                <input type="text" placeholder="MM/YY" style={{ flex: 1 }} />
                <input type="text" placeholder="CVC" style={{ flex: 1 }} />
              </div>

              <div className="checkout-summary">
                <div className="checkout-summary-row"><span>Subtotal</span><span>R{getTotal().subtotal.toFixed(2)}</span></div>
                <div className="checkout-summary-row"><span>VAT (15%)</span><span>R{getTotal().vat.toFixed(2)}</span></div>
                <div className="checkout-summary-row total"><span>Total</span><span>R{getTotal().total.toFixed(2)}</span></div>
              </div>

              <button type="submit" className="place-order-btn">
                <i className="fas fa-check-circle"></i> Place Order
              </button>
              <div className="secure-note">
                <i className="fas fa-lock"></i> Secure payment · All transactions are encrypted
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="toast" style={{ display: 'flex' }}>
          <i className="fas fa-check-circle"></i> {toastMessage}
        </div>
      )}

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <h4>Battlefield Online</h4>
              <a href="#">About Us</a>
              <a href="#">Partner With Us</a>
              <a href="#">Supplier Registration</a>
              <a href="#">SADC & International</a>
            </div>
            <div>
              <h4>Shop</h4>
              <a href="#" onClick={(e) => e.preventDefault()}>Shop by Brand</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Shop by Category</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Corporate Gifting</a>
              <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('bulkOrderPanel')?.scrollIntoView({ behavior: 'smooth' }); }}>Bulk Orders</a>
            </div>
            <div>
              <h4>Contact</h4>
              <p><i className="fas fa-phone-alt"></i> +27 10 026 7866</p>
              <p><i className="fab fa-whatsapp"></i> +27 87 138 6656</p>
              <p><i className="fas fa-envelope"></i> admin@thebattlefieldholdings.com</p>
            </div>
          </div>
          <div className="corporate-details">
            The Battlefield (Pty) Ltd. · An Integrated Marketing & ICT Company · A Division of The Battlefield Holdings<br />
            Head Office: Nelson Mandela Square, 2nd Floor, West Towers, Corner Maude and 5th Street, Sandton, 2196, Gauteng, South Africa<br />
            Reg: 2019/377556/07 · D. A Kgonyane (Director) · N.Dip. (Marketing)
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;