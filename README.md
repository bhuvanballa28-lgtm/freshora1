# FRESHORA - Branded Grocery In-Store Self-Ordering System

A modern, responsive, kiosk-ready React frontend application for **FRESHORA**, an in-store grocery shop providing all types of branded grocery essentials (Kellogg's, Amul, Quaker, Barilla, Bertolli, Tropicana, Nescafé, Twinings, Lay's, Cadbury, 24 Mantra Organic, Heinz, Organic India, Daawat, Blue Diamond, and more).

---

## 🌟 Key Features

1. **Branded Grocery Catalog & Listing**
   - High-resolution product images with dietary tags (`🌱 Vegetarian`, `🥑 100% Vegan`).
   - Category filtering: *All Products, Dairy & Spreads, Breakfast & Cereals, Beverages & Coffee, Snacks & Chocolates, Pantry & Gourmet, Organic & Health*.
   - Live search by product name, brand name, or aisle category.
   - Dietary & price sorting filters (*Popularity, Top Rated, Price: Low to High, Price: High to Low*).
   - In-store stock counts, customer ratings, MRP vs. in-store discounted pricing, and percentage OFF badges.

2. **Product Specification Popup (Item Click)**
   - Clicking on any grocery item card opens the **Product Specification Popup**.
   - Displays comprehensive official specifications:
     * Brand & Sub-brand details
     * Full Nutritional Facts table (Energy, Protein, Carbohydrates, Total Sugars, Total Fat, Sodium per serving)
     * Complete Ingredients breakdown
     * Shelf Life & Best Before duration
     * Storage & preservation guidelines
     * Country of Origin
     * FSSAI License & Manufacturer/Packer address
     * Direct **Add to Cart** and quantity stepper controls directly inside the specifications popup.

3. **Cart & Mandatory SMS Checkout Popup (Cart Icon Click)**
   - Clicking the Cart icon in the top navigation or floating mobile action button opens the **Cart & SMS Checkout Popup**.
   - Review selected grocery items with thumbnail, pack size, unit price, quantity increment/decrement, and remove button.
   - Total calculation: Subtotal, FRESHORA In-Store Savings, optional Eco-Friendly Bag, and included taxes (GST).
   - **MANDATORY Customer Details for SMS Bill**:
     * Prominent digital billing notice explaining that as per store policy, the digital tax invoice, itemized receipt, and collection token are sent via SMS mandatorily.
     * **Customer Full Name** (Mandatory, with real-time validation error if empty)
     * **Phone Number** (Mandatory 10-digit mobile number, with validation error if invalid)
     * **Address** (Mandatory Billing / Delivery address, with validation error if empty)
   - **Place Order Button**:
     * High-contrast action button displaying total payable amount.
     * Prevents placement if required customer fields are missing, showing inline feedback and alert notification.

4. **Order Confirmation & Simulated SMS Bill Modal**
   - Generates an instant in-store pickup token (e.g., `TOKEN #FR-7821`).
   - Assigns collection bay (e.g. `Express Counter 2 - Packing Bay`).
   - **Simulated SMS Bill Notification Card**:
     * Realistic mobile message preview showing the SMS sent to `+91 [Phone Number]`.
     * Contains order number, total paid, customer name, delivery address, and official digital invoice link.
   - Full itemized tax receipt with item breakdown and taxes.
   - Buttons to **Print Tax Invoice** (`window.print()`) or **Place Another Order**.

---

## 📁 File Structure

```
freshora-grocery/
├── index.html                   # Autonomous, single-file runnable React frontend (Tailwind + React 18 + Babel)
├── package.json                 # Modern Vite + React project configuration
├── vite.config.js               # Vite bundler configuration
├── README.md                    # Project documentation
├── public/                      # Static assets
└── src/
    ├── App.jsx                  # Main single-page application orchestrating state & modals
    ├── main.jsx                 # React root entry point
    ├── index.css                # Global stylesheet & scrollbar styles
    ├── components/
    │   ├── Navbar.jsx           # Store branding, search bar, category pills, cart trigger
    │   ├── ProductCard.jsx      # Product card with badges, price, quick-add stepper, and specs trigger
    │   ├── ProductSpecsModal.jsx# Popup showing rich specifications, ingredients, and nutrition
    │   ├── CartModal.jsx        # Popup showing cart items, mandatory Name/Phone/Address inputs & Place Order button
    │   ├── CartDrawer.jsx       # Re-export of CartModal
    │   └── OrderConfirmationModal.jsx # Order placed modal with Token and simulated SMS bill preview
    └── data/
        └── products.js          # Complete catalog of branded grocery products with full specifications
```

---

## 🚀 How to Run

### Option 1: Instant Browser Preview (Zero dependencies)
Double-click `index.html` in any web browser, or run a lightweight local static server:
```bash
cd freshora-grocery
python3 -m http.server 8085
```
Then visit `http://localhost:8085` in your browser.

### Option 2: Standard Vite / React Dev Server (If Node.js is installed)
```bash
cd freshora-grocery
npm install
npm run dev
```
Open `http://localhost:5173` to view the app with Hot Module Replacement (HMR).
