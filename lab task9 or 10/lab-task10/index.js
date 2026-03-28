const express = require('express');
const mongoose = require('mongoose'); // 1. Import Mongoose
const app = express();
const PORT = 3000;

app.set('json spaces', 4);
app.use(express.json());

// Logger Middleware
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
});

// ==========================================
// MONGODB SETUP & SCHEMA [cite: 1791-1801]
// ==========================================
// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/product_catalog')
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Define the Product Schema [cite: 1792-1801]
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

// Create the Model
const Product = mongoose.model('Product', productSchema);

// ==========================================
// CRUD ROUTES [cite: 1802-1809]
// ==========================================

// 1. CREATE: POST /products [cite: 1804]
app.post('/products', async (req, res) => {
    try {
        const { name, price, category, inStock } = req.body;

        // Validation: Ensure products cannot be created without a name or price 
        if (!name || price === undefined) {
            return res.status(400).json({ error: "Name and price are required fields." });
        }

        const newProduct = new Product({ name, price, category, inStock });
        await newProduct.save();

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. READ ALL: GET /products [cite: 1805]
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. READ ONE: GET /products/:id [cite: 1806]
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID format" });
    }
});

// 4. UPDATE: PUT /products/:id [cite: 1807]
app.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product updated", product: updatedProduct });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5. DELETE: DELETE /products/:id [cite: 1807]
app.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: "Invalid ID format" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
});