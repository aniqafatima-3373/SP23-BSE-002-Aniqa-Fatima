# 🍳 Pantry Chef – Digital Culinary Atelier

**Pantry Chef** is a sophisticated full-stack web application designed to bridge the gap between local pantry management and global culinary inspiration. Using a premium **Olive & Cream** aesthetic, the system allows users to securely manage personal recipes via a MongoDB dashboard while searching the **Spoonacular API** for worldwide culinary data.

---

## 🚀 Key Features & Innovation

### 🧠 Hybrid Search Engine
This is a dual-layer search system that provides a comprehensive user experience:
* **Local Discovery:** It first scans the user's private MongoDB collection for personal "Chef Specials."
* **Global Inspiration:** Simultaneously, it fetches millions of recipes from the **Spoonacular API**.
* **Smart Ingredient Matcher ($all logic):** To solve the "leftover" problem, the search engine uses a strict MongoDB matching algorithm. This ensures that suggested recipes contain **all** user-specified ingredients, not just some of them.

### 🛠 Smart Culinary Tools
* **Dynamic Portion Scaler:** A client-side mathematical engine. When a user changes the "Serves" count, JavaScript instantly recalculates ingredient quantities (Amount * [New Servings / Original Servings]) without a page refresh.
* **Substitution Engine (NLP-Lite):** A dedicated lookup database that provides instant alternatives for missing ingredients (e.g., substituting Yogurt for Eggs), ensuring cooking never stops.
* **Culinary PDF Export:** Uses CSS `@media print` rules to hide UI elements like buttons and sidebars, generating a clean, professional recipe card for physical printing.

### 🎨 Premium UI/UX
* **Persistent Global Sidebar:** A unified navigation anchor. Unlike traditional top-bars, this sidebar stays fixed, allowing the user to switch between Home, Search, and Night Mode instantly, which reduces "navigation friction."
* **Chef’s Night Mode:** Implemented using CSS Variables and Browser **Local Storage**. The theme preference is saved on the user's device, so the app stays in Night Mode even after the browser is closed.
* **Apothecary Aesthetic:** Curated use of `#556B2F` (Olive) and `#fdfae6` (Cream) to create a high-end, organic "Chef’s Journal" feel.

---

## 🛡 Security & Middleware

* **Password Security (Bcrypt.js):** We prioritize user data integrity. Passwords undergo **Salting and Hashing** using `bcryptjs` before being stored. This means even the database administrator cannot see raw passwords.
* **Session Management:** Using `express-session`, the server maintains a secure state for each user. Unauthorized users are automatically redirected to the login page if they try to access the `/dashboard` via URL.
* **AJAX-Powered Interactions:** The "Add Recipe" and "Quick Search" features utilize the **Fetch API**. By sending data asynchronously, we perform database operations in the background, keeping the user in their "Flow State" without full page reloads.

---

## 🏗 System Architecture (MVC Pattern)

The application follows a strictly decoupled **Model-View-Controller** design to ensure the code is clean, modular, and easy to maintain:

* **Model:** Defines the data structure (Schemas) for Users and Recipes in MongoDB using Mongoose.
* **View:** Uses EJS templates to render dynamic data into a responsive Bootstrap 5 interface.
* **Controller/Routes:** The logic layer that processes requests, handles API calls, and manages the flow between the Database and the UI.

---

## 🛠 Tech Stack

| Component | Technology Used | Technical Reason |
| :--- | :--- | :--- |
| **Runtime Environment** | Node.js | For high-performance, asynchronous server-side execution. |
| **Framework** | Express.js | To handle complex routing and middleware efficiently. |
| **Database** | MongoDB (NoSQL) | Flexible document storage perfect for varied recipe data. |
| **Template Engine** | EJS | To inject dynamic server-side data directly into HTML. |
| **Styling** | Bootstrap 5 | To ensure a Mobile-First, fully responsive layout. |
| **HTTP Client** | Axios | For reliable asynchronous fetching of external API data. |
| **API Provider** | Spoonacular API | The industry standard for high-quality culinary data. |

---

## 🛣 API Route Map

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/` | Welcome Splash Screen: Initiates branding and session check. |
| **GET** | `/dashboard` | Main Hub: Displays user-specific recipes via `Recipe.find()`. |
| **GET** | `/search` | Hybrid Search: Executes both MongoDB and Spoonacular queries. |
| **POST** | `/add-recipe` | AJAX Create: Saves new data to MongoDB without page refresh. |
| **PUT** | `/update-recipe/:id` | Update Logic: Modifies existing records based on unique ObjectIDs. |
| **DELETE** | `/delete-recipe/:id` | Delete Logic: Safely removes records from the database. |

---

## 📂 Project Structure

```text
pantry-chef/
├── models/             # Database structures (User.js, Recipe.js)
├── public/             # Static assets (Custom CSS, LocalStorage JS, Images)
├── routes/             # Controller logic and URL definitions (index.js)
├── views/              # Dynamic UI templates (dashboard.ejs, results.ejs, detail.ejs)
├── app.js              # Central server config, Security middleware, & Session setup
└── package.json        # Project metadata and Dependency list
👨‍💻 Developed By
Aniqa Fatima Registration No: SP23-BSE-002

Course: Advance Web Technology

Instructor: Mam Yasmeen Jana

🌟 User-Centric Design Decisions
Solving the "Messy Hands" Problem: We added PDF Export so users can print recipes and avoid touching their devices with flour or water.

Solving the "Dim Lighting" Problem: Night Mode was added specifically for low-light kitchen environments to reduce eye strain.

The "Problem Solver" Approach: Most apps just display data. Pantry Chef solves problems by offering Substitutions when an ingredient is missing, making it a true utility tool for the modern kitchen.