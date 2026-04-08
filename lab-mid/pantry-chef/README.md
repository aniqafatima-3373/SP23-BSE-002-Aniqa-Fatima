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
* **Dynamic Portion Scaler:** A client-side mathematical engine. When a user changes the "Serves" count, JavaScript instantly recalculates ingredient quantities without a page refresh.
* **Substitution Engine (NLP-Lite):** A dedicated lookup database that provides instant alternatives for missing ingredients (e.g., substituting Yogurt for Eggs), ensuring cooking never stops.
* **Culinary PDF Export:** Uses CSS `@media print` rules to hide UI elements like buttons and sidebars, generating a clean, professional recipe card for physical printing.

### 🎨 Premium UI/UX
* **Persistent Global Sidebar:** A unified navigation anchor. Unlike traditional top-bars, this sidebar stays fixed, allowing the user to switch between Home, Search, and Night Mode instantly.
* **Chef’s Night Mode:** Implemented using CSS Variables and Browser **Local Storage**. The theme preference is saved on the user's device for persistence.
* **Apothecary Aesthetic:** Curated use of `#556B2F` (Olive) and `#fdfae6` (Cream) to create a high-end, organic "Chef’s Journal" feel.

---

## 🛡 Security & Middleware

* **Password Security (Bcrypt.js):** We prioritize user data integrity. Passwords undergo **Salting and Hashing** using `bcryptjs` before being stored so raw passwords are never readable.
* **Session Management:** Using `express-session`, the server maintains a secure state for each user. Unauthorized users are redirected to the login page if they try to access protected routes.
* **AJAX-Powered Interactions:** The "Add Recipe" and "Quick Search" features utilize the **Fetch API**. This allows database operations to happen in the background without full page reloads.

---

## 🏗 System Architecture (MVC Pattern)

The application follows a strictly decoupled **Model-View-Controller** design to ensure the code is modular and scalable:

* **Model:** Defines the data structure (Schemas) for Users and Recipes in MongoDB using Mongoose.
* **View:** Uses EJS templates to render dynamic data into a responsive Bootstrap 5 interface.
* **Controller/Routes:** The logic layer that processes requests, handles API calls, and manages data flow.

---

## 🛣 API Route Map

### 🔐 Authentication Routes (Identity Management)
These routes handle user onboarding and secure access control.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/users/signup` | Signup Page: Renders the account creation interface. |
| **POST** | `/users/signup` | Registration: Hashes password via Bcrypt and saves user to MongoDB. |
| **GET** | `/users/login` | Login Page: Renders the secure "Welcome Back" entry. |
| **POST** | `/users/login` | Authentication: Verifies credentials and initiates an Express Session. |
| **GET** | `/users/logout` | Logout: Terminates the session and clears cookies. |

### 🍳 Application Routes (Business Logic)
Core features accessible only to authenticated users.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/` | Welcome Splash Screen: Initiates branding and session check. |
| **GET** | `/dashboard` | Main Hub: Displays user-specific recipes via `Recipe.find()`. |
| **GET** | `/search` | Hybrid Search: Executes both MongoDB and Spoonacular queries. |
| **POST** | `/add-recipe` | AJAX Create: Saves new data to MongoDB without page refresh. |
| **GET** | `/recipe/:id` | Recipe Detail: Renders specific recipe data and smart tools. |
| **PUT** | `/update-recipe/:id`| Update Logic: Modifies existing records based on unique ObjectIDs. |
| **DELETE** | `/delete-recipe/:id`| Delete Logic: Safely removes recipes from the collection. |

---

## 🛠 Tech Stack

| Component | Technology Used |
| :--- | :--- |
| **Runtime Environment** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB (NoSQL) |
| **Template Engine** | EJS (Embedded JavaScript) |
| **Styling** | Bootstrap 5 & Custom CSS |
| **HTTP Client** | Axios (API fetching) |
| **API Provider** | Spoonacular API |

---

## 📂 Project Structure

```text
pantry-chef/
├── models/             # Mongoose Schemas (User.js, Recipe.js)
├── public/             # Static assets (Custom CSS, LocalStorage JS, Images)
├── routes/             # Route Handlers (index.js, users.js)
├── views/              # Dynamic UI templates (dashboard, results, detail)
├── app.js              # Server configuration & Security middleware
└── package.json        # Project metadata and dependencies
