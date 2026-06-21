import React, { useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Product Database
const bulkProducts = [
  { 
    id: 101, 
    name: "HP LaserJet Pro M404n", 
    brand: "HP", 
    category: "bulk", 
    price: 499, 
    colors: ["White", "Gray"], 
    colorHex: { "White": "#f0f0f0", "Gray": "#7a7a7a" }, 
    specs: "Monochrome laser printer, 40ppm, 2.7\" touchscreen, Ethernet, 256MB, 1200x1200 dpi, duty cycle 80k pages", 
    reviews: [{ name: "Bulk Buyer", stars: 5, text: "Great for office fleet, volume pricing was excellent." }], 
    icon: "fa-print", 
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=300&h=200&fit=crop" 
  },
  { 
    id: 102, 
    name: "Dell OptiPlex 7010 SFF", 
    brand: "Dell", 
    category: "bulk", 
    price: 899, 
    colors: ["Black"], 
    colorHex: { "Black": "#1a1a1a" }, 
    specs: "Intel Core i7-13700, 16GB DDR5, 512GB SSD, Windows 11 Pro, 3yr warranty, small form factor", 
    reviews: [{ name: "IT Director", stars: 5, text: "Deployed 50 units, solid performance and quiet." }], 
    icon: "fa-desktop", 
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300&h=200&fit=crop" 
  },
  { 
    id: 103, 
    name: "Logitech MK850 Performance", 
    brand: "Logitech", 
    category: "bulk", 
    price: 129, 
    colors: ["Black", "Graphite"], 
    colorHex: { "Black": "#1a1a1a", "Graphite": "#4a4a4a" }, 
    specs: "Wireless keyboard & mouse, rechargeable, 3 device pairing, multi-device flow, silent keys", 
    reviews: [{ name: "Procurement Lead", stars: 4, text: "Staff love the comfort, bulk discount made it affordable." }], 
    icon: "fa-keyboard", 
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop" 
  },
  { 
    id: 104, 
    name: "Samsung 870 EVO 1TB SSD", 
    brand: "Samsung", 
    category: "bulk", 
    price: 159, 
    colors: ["Silver"], 
    colorHex: { "Silver": "#c0c0c0" }, 
    specs: "SATA III, 1TB, 560/530 MB/s read/write, 2.5\", 5 year warranty, 600 TBW", 
    reviews: [{ name: "SysAdmin", stars: 5, text: "Reliable bulk storage upgrade for our workstations." }], 
    icon: "fa-hdd", 
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=200&fit=crop" 
  }
];

const productsData = {
  electronics: [
    { id: 1, name: "MacBook Pro 14", brand: "Apple", category: "electronics", price: 1999, colors: ["Space Gray", "Silver"], colorHex: { "Space Gray": "#4a4a4a", "Silver": "#e0e4e8" }, specs: "M3 Pro chip (12-core), 16GB unified memory, 512GB SSD, Liquid Retina XDR display, 18hr battery", reviews: [{ name: "John D.", stars: 5, text: "Perfect for our executive team. Fast and reliable." }], icon: "fa-laptop" },
    { id: 2, name: "Dell XPS 15", brand: "Dell", category: "electronics", price: 1849, colors: ["Platinum Silver", "Carbon Black"], colorHex: { "Platinum Silver": "#c0cbd6", "Carbon Black": "#2d2f31" }, specs: "Intel Core i7-13700H, 32GB DDR5, 1TB NVMe SSD, NVIDIA RTX 4060, OLED 3.5K", reviews: [{ name: "Mike T.", stars: 4, text: "Great for developers. Bulk order process was smooth." }], icon: "fa-laptop" },
    { id: 3, name: "Samsung Galaxy S24 Ultra", brand: "Samsung", category: "electronics", price: 1299, colors: ["Titanium Gray", "Violet", "Yellow"], colorHex: { "Titanium Gray": "#6d7278", "Violet": "#9b4b6e", "Yellow": "#f5d742" }, specs: "200MP camera, Snapdragon 8 Gen 3, 5000mAh, S Pen, 6.8\" Dynamic AMOLED", reviews: [{ name: "Priya S.", stars: 5, text: "Amazing camera, our sales team loves these." }], icon: "fa-mobile-alt" },
    { id: 4, name: "iPad Pro 12.9", brand: "Apple", category: "electronics", price: 1099, colors: ["Space Gray", "Silver"], colorHex: { "Space Gray": "#4a4a4a", "Silver": "#e0e4e8" }, specs: "M2 chip, Liquid Retina XDR, 128GB, LiDAR scanner, Stage Manager", reviews: [{ name: "David L.", stars: 5, text: "Perfect for presentations and remote work." }], icon: "fa-tablet-alt" }
  ],
  gifts: [
    { id: 5, name: "Carrol Boyes Executive Pen Set", brand: "Carrol Boyes", category: "gifts", price: 189, colors: ["Gold", "Silver", "Rose Gold"], colorHex: { "Gold": "#d4af37", "Silver": "#c0c0c0", "Rose Gold": "#b76e79" }, specs: "Luxury gift box, engraved finish, corporate branding available, includes 2 pens", reviews: [{ name: "Thabo M.", stars: 5, text: "Elegant client gifts, they loved the packaging." }], icon: "fa-pen-fancy" },
    { id: 6, name: "Smeg Espresso Machine", brand: "Smeg", category: "gifts", price: 699, colors: ["Black", "Pastel Blue", "Cream"], colorHex: { "Black": "#2c2c2c", "Pastel Blue": "#a3c9e0", "Cream": "#f5e6d3" }, specs: "Retro design, 15 bar pressure, thermoblock heating, removable water tank", reviews: [{ name: "Emma W.", stars: 5, text: "A hit in our office breakroom. Great bulk pricing." }], icon: "fa-mug-hot" },
    { id: 7, name: "Sir Juice Premium Hamper", brand: "Sir Juice", category: "gifts", price: 129, colors: ["Classic", "Deluxe"], colorHex: { "Classic": "#8B4513", "Deluxe": "#DAA520" }, specs: "Gourmet juice selection, custom gift wrap, corporate messaging, 6 bottles", reviews: [{ name: "Linda N.", stars: 4, text: "Wonderful for year-end gifts." }], icon: "fa-wine-bottle" },
    { id: 8, name: "Le Creuset Gift Set", brand: "Le Creuset", category: "gifts", price: 249, colors: ["Cerise", "Marseille", "Oyster"], colorHex: { "Cerise": "#e34234", "Marseille": "#0050a0", "Oyster": "#bcaea0" }, specs: "5-piece stoneware set, dishwasher safe, premium gift box", reviews: [{ name: "James C.", stars: 5, text: "High-end, clients appreciate the quality." }], icon: "fa-utensils" }
  ],
  appliances: [
    { id: 9, name: "Smeg Retro Kettle", brand: "Smeg", category: "appliances", price: 179, colors: ["Red", "Black", "White", "Pastel Green"], colorHex: { "Red": "#c41e3a", "Black": "#2c2c2c", "White": "#f9f9f9", "Pastel Green": "#b2d8a8" }, specs: "1.7L capacity, stainless steel, 360° base, auto shut-off, 1500W", reviews: [{ name: "Zoe R.", stars: 5, text: "Stylish and functional for office pantries." }], icon: "fa-kitchen-set" },
    { id: 10, name: "Haus Coffee Machine", brand: "Haus", category: "appliances", price: 499, colors: ["Stainless", "Matte Black"], colorHex: { "Stainless": "#c0c0c0", "Matte Black": "#1a1a1a" }, specs: "Bean-to-cup, programmable, 19 bar pump, milk frother, 2L tank", reviews: [{ name: "Carlos M.", stars: 4, text: "Great office coffee solution." }], icon: "fa-coffee" },
    { id: 11, name: "Carrol Boyes Wine Set", brand: "Carrol Boyes", category: "appliances", price: 159, colors: ["Silver", "Gold"], colorHex: { "Silver": "#c0c0c0", "Gold": "#d4af37" }, specs: "Artisan wine accessories, includes corkscrew, stopper, pourer", reviews: [{ name: "Grace K.", stars: 5, text: "Beautiful executive gift." }], icon: "fa-wine-glass-alt" },
    { id: 12, name: "Smeg Toaster 2-Slice", brand: "Smeg", category: "appliances", price: 149, colors: ["Pastel Blue", "Cream", "Red"], colorHex: { "Pastel Blue": "#a3c9e0", "Cream": "#f5e6d3", "Red": "#c41e3a" }, specs: "Retro design, 6 browning levels, reheat/defrost, removable crumb tray", reviews: [{ name: "Natalie P.", stars: 5, text: "Perfect for staff kitchen." }], icon: "fa-bread-slice" }
  ]
};

const allProducts = [...productsData.electronics, ...productsData.gifts, ...productsData.appliances, ...bulkProducts];

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const addToCart = (product, color) => {
    const existing = cart.find(item => item.id === product.id && item.selectedColor === color);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id && item.selectedColor === color 
          ? { ...item, qty: item.qty + 1 } 
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        icon: product.icon,
        image: product.image || null,
        selectedColor: color,
        qty: 1
      }]);
    }
    showToast(`${product.name} (${color}) added to cart`);
    setShowCart(true);
  };

  const updateQty = (index, delta) => {
    const newCart = [...cart];
    newCart[index].qty += delta;
    if (newCart[index].qty <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    showToast('Item removed from cart');
  };

  const getTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const vat = subtotal * 0.15;
    return { subtotal, vat, total: subtotal + vat };
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const ProductCard = ({ product, showBulkTag = false }) => {
    const bulkPrice = (product.price * 0.85).toFixed(2);
    const imageHtml = product.image 
      ? <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'contain', borderRadius: '12px' }} />
      : <i className={`fas ${product.icon}`} style={{ fontSize: '3.5rem', color: product.colorHex[product.colors[0]] || '#1f5e3a' }}></i>;

    return (
      <div className="product-card" onClick={() => openModal(product)}>
        <div className="product-img">
          {imageHtml}
        </div>
        <div className="product-info">
          <div className="product-title">{product.name}</div>
          <div className="product-brand">{product.brand}</div>
          <div className="product-colors">
            <span className="color-label"><i className="fas fa-palette"></i> Colors:</span>
            <div className="color-swatches-list">
              {product.colors.map(c => (
                <div 
                  key={c}
                  className="color-swatch" 
                  style={{ background: product.colorHex[c] }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Color selection logic
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className="price">
            R{product.price} <span className="bulk-price-tag">Bulk from R{bulkPrice}</span>
          </div>
          <button 
            className="add-to-cart-card"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, product.colors[0]);
            }}
          >
            <i className="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    );
  };

  const ProductSection = ({ title, icon, products, bulk = false }) => (
    <div className="product-section" style={bulk ? { background: '#f0f9eb', padding: '20px 20px 10px', borderRadius: '48px' } : {}}>
      <div className="section-header">
        <h2><i className={`fas ${icon}`} style={{ color: 'var(--battle-green)' }}></i> {title}</h2>
        <span className="see-more" onClick={() => showToast("Full catalog available. Contact corporate team for complete product list and bulk pricing.")}>See more →</span>
      </div>
      <div className="product-row">
        {products.slice(0, 4).map(product => (
          <ProductCard key={product.id} product={product} showBulkTag={bulk} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="App">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span><i className="fas fa-gift"></i> Corporate gifting now available</span>
        <span><i className="fas fa-file-invoice"></i> Request a bulk quotation</span>
        <span><i className="fas fa-globe"></i> SADC & international business enquiries welcome</span>
        <span><i className="fas fa-building"></i> Premium brand procurement for businesses</span>
      </div>

      {/* Header */}
      <div className="main-header">
        <div className="container">
          <div className="header-row">
            <div className="logo">
              <h1>BATTLEFIELD <span style={{ color: 'var(--battle-green)' }}>ONLINE</span></h1>
              <p>Premium Procurement • Corporate Gifting • B2B Hub</p>
            </div>
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search by brand, product, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="nav-icons">
              <a href="#bulkOrderPanel" onClick={(e) => {
                e.preventDefault();
                document.getElementById('bulkOrderPanel')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <i className="fas fa-chart-line"></i> Bulk Orders
              </a>
              <a href="#" onClick={() => showToast("Request a quote - our team will respond within 2 hours.")}>
                <i className="fas fa-file-signature"></i> Request a Quote
              </a>
              <a href="#" className="cart-icon" onClick={() => setShowCart(true)}>
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-badge">{cart.reduce((sum, item) => sum + item.qty, 0)}</span>
              </a>
              <a href="#" className="whatsapp" onClick={() => showToast("WhatsApp: +27 87 138 6656 | Our corporate team is online 8am-5pm SAST.")}>
                <i className="fab fa-whatsapp"></i> Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Dropdowns */}
        <div className="dropdown-group">
          <div className="dropdown">
            <button className="dropbtn"><i className="fas fa-trademark"></i> Shop by Brand ▼</button>
            <div className="dropdown-content">
              {[...new Set(allProducts.map(p => p.brand))].map(brand => (
                <a key={brand} onClick={() => {
                  const filtered = allProducts.filter(p => p.brand === brand);
                  // Filter logic would go here
                  showToast(`Filtering by ${brand}`);
                }}>{brand}</a>
              ))}
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn"><i className="fas fa-th-large"></i> Shop by Category ▼</button>
            <div className="dropdown-content">
              <a onClick={() => showToast("Showing all categories")}>All Categories</a>
              <a onClick={() => showToast("Showing Electronics & ICT")}>Electronics & ICT</a>
              <a onClick={() => showToast("Showing Corporate Gifts")}>Corporate Gifts</a>
              <a onClick={() => showToast("Showing Premium Appliances")}>Premium Appliances</a>
              <a onClick={() => showToast("Showing Bulk Office & Electronics")}>Bulk Office & Electronics</a>
            </div>
          </div>
        </div>

        {/* Product Sections */}
        <ProductSection 
          title="Bulk Office & Electronics (10+ units)" 
          icon="fa-warehouse" 
          products={bulkProducts} 
          bulk={true} 
        />

        <ProductSection 
          title="Electronics & ICT Devices" 
          icon="fa-microchip" 
          products={productsData.electronics} 
        />

        <ProductSection 
          title="Corporate Gifts & Executive Collection" 
          icon="fa-gift" 
          products={productsData.gifts} 
        />

        <ProductSection 
          title="Premium Appliances & Lifestyle" 
          icon="fa-blender" 
          products={productsData.appliances} 
        />

        {/* Bulk Order Panel */}
        <div id="bulkOrderPanel" className="bulk-panel">
          <h2><i className="fas fa-chart-simple"></i> Business Bulk Orders</h2>
          <p style={{ margin: '10px 0 20px' }}>Request quantity-based pricing for 10+ units. Our team responds within 2 hours.</p>
          <div className="bulk-form">
            <input type="text" placeholder="Company name *" />
            <input type="email" placeholder="Work email *" />
            <input type="text" placeholder="Product interest (brand or product)" />
            <input type="number" placeholder="Quantity required (min 10)" />
            <input type="text" placeholder="Delivery province / country" />
            <select><option>Branding required: No</option><option>Branding required: Yes</option></select>
            <input type="date" />
            <textarea rows="2" placeholder="Specifications / additional notes"></textarea>
            <div className="full-width">
              <button 
                className="submit-bulk-btn"
                onClick={() => showToast("Bulk request received! Our team will respond within 2 hours.")}
              >
                Request Bulk Quote →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedProduct.name} <span style={{ fontSize: '0.9rem', color: '#5b7c4a' }}>by {selectedProduct.brand}</span></h2>
              <span className="close-modal" onClick={closeModal}>&times;</span>
            </div>
            <div className="modal-product-image">
              {selectedProduct.image 
                ? <img src={selectedProduct.image} alt={selectedProduct.name} style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '16px' }} />
                : <i className={`fas ${selectedProduct.icon}`} style={{ fontSize: '5rem', color: selectedProduct.colorHex[selectedColor] }}></i>
              }
            </div>
            <div><strong><i className="fas fa-palette"></i> Available Colors:</strong></div>
            <div className="modal-colors-row">
              {selectedProduct.colors.map(color => (
                <div 
                  key={color}
                  className="modal-color-swatch"
                  style={{ 
                    background: selectedProduct.colorHex[color],
                    border: selectedColor === color ? '3px solid var(--battle-green)' : '3px solid white'
                  }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
            <div className="specs-section">
              <strong><i className="fas fa-list-ul"></i> Specifications</strong>
              <ul className="specs-list">
                <li><strong>Brand:</strong> {selectedProduct.brand}</li>
                <li><strong>Full Specifications:</strong> {selectedProduct.specs}</li>
                <li><strong>Bulk Eligibility:</strong> Volume pricing from 10 units (15% discount)</li>
                <li><strong>Corporate Warranty:</strong> 3 years for bulk orders</li>
              </ul>
            </div>
            <div className="reviews-section">
              <strong><i className="fas fa-star"></i> Customer Reviews</strong>
              {selectedProduct.reviews.map((review, idx) => (
                <div key={idx} className="review-item">
                  <div className="review-stars">{'★'.repeat(review.stars)}{'☆'.repeat(5-review.stars)}</div>
                  <strong>{review.name}</strong>
                  <p>{review.text}</p>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '10px 0' }}>
              R{selectedProduct.price} <span style={{ fontSize: '0.9rem' }}>(excl. VAT, bulk 10+ : R{(selectedProduct.price * 0.85).toFixed(2)} each)</span>
            </div>
            <button 
              className="modal-add-to-cart"
              onClick={() => {
                addToCart(selectedProduct, selectedColor);
                closeModal();
              }}
            >
              <i className="fas fa-cart-plus"></i> Add to Cart
            </button>
            <button 
              className="bulk-quote-btn"
              onClick={() => {
                closeModal();
                document.getElementById('bulkOrderPanel')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <i className="fas fa-chart-line"></i> Request Bulk Quote
            </button>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay" style={{ display: 'flex' }} onClick={(e) => {
          if (e.target === e.currentTarget) setShowCart(false);
        }}>
          <div className="cart-sidebar">
            <div className="cart-header">
              <h2><i className="fas fa-shopping-cart"></i> Your Cart</h2>
              <span className="cart-close" onClick={() => setShowCart(false)}>&times;</span>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <i className="fas fa-shopping-bag" style={{ fontSize: '3rem', marginBottom: '16px' }}></i>
                <p>Your cart is empty</p>
                <p style={{ fontSize: '0.85rem', color: '#6b8c5c' }}>Browse our premium products and add items for bulk pricing.</p>
              </div>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="cart-item-icon">
                      {item.image ? <img src={item.image} alt={item.name} style={{ maxWidth: '40px', maxHeight: '40px', objectFit: 'contain' }} /> : <i className={`fas ${item.icon}`}></i>}
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-color">{item.selectedColor} • {item.brand}</div>
                    </div>
                    <div className="cart-item-qty">
                      <button className="qty-btn" onClick={() => updateQty(index, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(index, 1)}>+</button>
                    </div>
                    <div className="cart-item-price">R{(item.price * item.qty).toFixed(2)}</div>
                    <span className="remove-item" onClick={() => removeItem(index)}><i className="fas fa-trash"></i></span>
                  </div>
                ))}
                <div className="cart-total">
                  <div className="cart-total-row">
                    <span>Subtotal</span>
                    <span>R{getTotal().subtotal.toFixed(2)}</span>
                  </div>
                  <div className="cart-total-row" style={{ fontSize: '0.9rem', color: '#5b7c4a' }}>
                    <span>VAT (15%)</span>
                    <span>R{getTotal().vat.toFixed(2)}</span>
                  </div>
                  <div className="cart-total-row" style={{ fontSize: '1.4rem', borderTop: '2px solid var(--battle-green)', paddingTop: '12px', marginTop: '8px' }}>
                    <span>Total</span>
                    <span>R{getTotal().total.toFixed(2)}</span>
                  </div>
                  <button 
                    className="checkout-btn"
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                  >
                    <i className="fas fa-lock"></i> Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="checkout-modal" style={{ display: 'flex' }} onClick={(e) => {
          if (e.target === e.currentTarget) setShowCheckout(false);
        }}>
          <div className="checkout-content">
            <div className="modal-header">
              <h2><i className="fas fa-credit-card"></i> Checkout</h2>
              <span className="close-modal" onClick={() => setShowCheckout(false)}>&times;</span>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              showToast('✅ Order placed successfully! Our team will contact you within 2 hours to confirm.');
              setShowCheckout(false);
              setCart([]);
            }}>
              <input type="text" placeholder="Full name *" required />
              <input type="email" placeholder="Email address *" required />
              <input type="tel" placeholder="Phone number *" required />
              <input type="text" placeholder="Delivery address *" required />
              <select required>
                <option value="">Select province</option>
                <option>Gauteng</option><option>Western Cape</option><option>KwaZulu-Natal</option>
                <option>Eastern Cape</option><option>Free State</option><option>Limpopo</option>
                <option>Mpumalanga</option><option>North West</option><option>Northern Cape</option>
              </select>
              
              <div style={{ margin: '16px 0' }}><strong>Payment Method</strong></div>
              <div className="payment-options">
                <div className="payment-option selected" data-method="card">
                  <i className="fas fa-credit-card"></i> Credit Card
                </div>
                <div className="payment-option" data-method="eft">
                  <i className="fas fa-university"></i> EFT
                </div>
                <div className="payment-option" data-method="invoice">
                  <i className="fas fa-file-invoice"></i> Corporate Invoice
                </div>
              </div>
              
              <div style={{ margin: '16px 0' }}>
                <input type="text" placeholder="Card number" />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input type="text" placeholder="MM/YY" style={{ flex: 1 }} />
                  <input type="text" placeholder="CVC" style={{ flex: 1 }} />
                </div>
              </div>
              
              <div style={{ background: '#f9fef7', padding: '16px', borderRadius: '16px', margin: '16px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span>R{getTotal().subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5b7c4a' }}>
                  <span>VAT (15%)</span>
                  <span>R{getTotal().vat.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', borderTop: '1px solid #d4e8ca', paddingTop: '12px', marginTop: '8px' }}>
                  <span>Total</span>
                  <span>R{getTotal().total.toFixed(2)}</span>
                </div>
              </div>
              
              <button type="submit" className="place-order-btn">
                <i className="fas fa-check-circle"></i> Place Order
              </button>
              <p style={{ fontSize: '0.75rem', color: '#6b8c5c', textAlign: 'center', marginTop: '12px' }}>
                Secure payment. All transactions are encrypted.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="toast" style={{ display: 'block' }}>
          <i className="fas fa-check-circle"></i> {toastMessage}
        </div>
      )}

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <h4>The Battlefield Online</h4>
              <a href="#">About Us</a>
              <a href="#">Partner With Us</a>
              <a href="#">Supplier Registration</a>
              <a href="#">SADC & International</a>
            </div>
            <div>
              <h4>Shop</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('.dropdown')?.scrollIntoView({ behavior: 'smooth' }); }}>Shop by Brand</a>
              <a href="#" onClick={(e) => { e.preventDefault(); document.querySelectorAll('.dropdown')[1]?.scrollIntoView({ behavior: 'smooth' }); }}>Shop by Category</a>
              <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('[data-section="gifts"]')?.scrollIntoView({ behavior: 'smooth' }); }}>Corporate Gifting</a>
              <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('bulkOrderPanel')?.scrollIntoView({ behavior: 'smooth' }); }}>Bulk Orders</a>
            </div>
            <div>
              <h4>Contact</h4>
              <p><i className="fas fa-phone-alt"></i> +27 10 026 7866</p>
              <p><i className="fab fa-whatsapp"></i> +27 87 138 6656</p>
              <p>admin@thebattlefieldholdings.com</p>
            </div>
          </div>
          <div className="corporate-details">
            The Battlefield (Pty) Ltd. An Integrated Marketing & Information Communications Technology (ICT) Company. A Division of The Battlefield Holdings<br />
            Head Office: Nelson Mandela Square. 2nd Floor, West Towers. Corner Maude and 5th Street Sandton. 2196. Gauteng. South Africa<br />
            Reg: 2019/377556/07. D. A Kgonyane (Director). N.Dip..(Marketing)
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;