const express = require('express');
const app = express();
const PORT = 4000;

// ==========================================
// THE FIX: Prettify JSON Output
// This forces the browser to display the JSON neatly!
// ==========================================
app.set('json spaces', 4); 

// Middleware to parse JSON bodies (Required to read POST data)
app.use(express.json());

// ==========================================
// STEP 5: Middleware [cite: 1663-1664]
// Add middleware to log the HTTP method and path of incoming requests.
// ==========================================
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
});

// ==========================================
// STEP 1: Data Setup [cite: 1642-1649]
// Create an array of products with id, name, price, category, and inStock.
// ==========================================
let products = [
    { id: 1, name: "Gaming Laptop", price: 1200, category: "electronics", inStock: true },
    { id: 2, name: "Wireless Mouse", price: 25, category: "electronics", inStock: true },
    { id: 3, name: "Desk Chair", price: 150, category: "furniture", inStock: false },
    { id: 4, name: "Mechanical Keyboard", price: 90, category: "electronics", inStock: true }
];

// ==========================================
// STEP 2: GET /products Route [cite: 1650-1655]
// Respond with all products in JSON format and support query parameters.
// ==========================================
app.get('/products', (req, res) => {
    let result = products;

    // Filter by category
    if (req.query.category) {
        result = result.filter(p => p.category.toLowerCase() === req.query.category.toLowerCase());
    }

    // Filter by maxPrice
    if (req.query.maxPrice) {
        const max = parseFloat(req.query.maxPrice);
        if (!isNaN(max)) {
            result = result.filter(p => p.price <= max);
        }
    }

    // Filter by inStock status
    if (req.query.inStock) {
        const isStock = req.query.inStock === 'true';
        result = result.filter(p => p.inStock === isStock);
    }

    res.json(result);
});

// ==========================================
// STEP 3: GET /products/:id Route [cite: 1656-1658]
// Return the product matching the id, or 404 if it doesn't exist.
// ==========================================
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
});

// ==========================================
// STEP 4: POST /products Route [cite: 1659-1662]
// Accept JSON body to add a new product and return a success message.
// ==========================================
app.post('/products', (req, res) => {
    const { name, price, category, inStock } = req.body;

    // ------------------------------------------
    // STEP 6: Error Handling (Missing & Invalid Data) [cite: 1665, 1668, 1671]
    // ------------------------------------------
    
    // Check for missing data
    if (!name || price === undefined || !category || inStock === undefined) {
        return res.status(400).json({ error: "Missing required data: name, price, category, and inStock are required." });
    }

    // Check for invalid data types
    if (typeof name !== 'string' || typeof price !== 'number' || typeof category !== 'string' || typeof inStock !== 'boolean') {
        return res.status(400).json({ error: "Invalid data types provided." });
    }

    // Create the new product (auto-increment the ID)
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        price,
        category,
        inStock
    };

    products.push(newProduct);
    
    // Return success message and added product
    res.status(201).json({ message: "Product added successfully", product: newProduct });
});

// ==========================================
// STEP 6: Error Handling (Invalid Routes) [cite: 1665-1667]
// Return meaningful error messages and status codes for invalid routes.
// ==========================================
app.use((req, res) => {
    res.status(404).json({ error: "Invalid route. Please check the URL and HTTP method." });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Product Catalog API is running on http://localhost:${PORT}`);
});