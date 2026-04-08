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
```
Output of the Pantry Chef 
Splash Screen:
 
 <img width="743" height="371" alt="image" src="https://github.com/user-attachments/assets/4a78346b-72fb-45ae-b7da-eeda6ae8e074" />

Splash Screen & Features 
•	What is happening: This is the entry point of the application. It provides a high-impact visual introduction to the "Pantry Chef" brand.
•	Technical Detail: Below the fold, it highlights the three core "value propositions": Hybrid Search, Portion Scaler, and the Substitution Engine to educate the user before they sign in.

Signup and login
 
 
Signup and Login 
•	What is happening: These screens handle user boarding and secure access.
•	Technical Detail: The backend utilizes bcryptjs for password hashing and express-session to keep the user logged in. Once authenticated, the server creates a unique session cookie that allows the user to access their private dashboard.
Dashboard:
 
Dashboard (Home, Search, & Night Mode, Add Recipe Modal) 
•	What is happening: The main hub of the project. It shows a summary of the user's personal collection (e.g., "3 Total Recipes").
 
 
•	Technical Detail: * Persistent Sidebar: Provides one-click access to Home, Search, and Night Mode from anywhere.
o	Search Modal: A "Quick Search" popup that allows users to find recipes without a full page reload.
o	Add Recipe Modal: Triggered by the Floating Action Button (+), this allows the user to save new recipes directly to MongoDB via a POST request.






Result Screen:
 
Search Result Screen 
•	What is happening: This view displays the results of the "Hybrid Search."
•	Technical Detail: The system is simultaneously querying the local MongoDB database and the Spoonacular API. It uses a card-grid layout to display recipe titles and high-quality images, encouraging the user to click for more details.

Detail Screen:
 
Detailed Recipe View 
•	What is happening: The final stage of the user flow where the actual cooking instructions are presented.
•	Technical Detail:
o	Portion Scaler: Users can change the "Serves" input, and the ingredient amounts update instantly using client-side math.
o	Substitution Engine: A dedicated box allows users to type an ingredient they are missing to find a safe alternative.
o	Export PDF: A button that triggers a print-optimized CSS view, allowing the chef to have a physical copy of the recipe in the kitchen.
In Night Mode:
 
 
 
 
 


 
PDF :
 

