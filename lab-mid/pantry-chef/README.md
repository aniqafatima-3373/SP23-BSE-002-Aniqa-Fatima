🍳 Pantry Chef – Digital Culinary Atelier

Pantry Chef is a sophisticated full-stack web application designed to bridge the gap between local pantry management and global culinary inspiration. Using a premium Olive & Cream aesthetic, the system allows users to securely manage personal recipes via a MongoDB dashboard while searching the Spoonacular API for worldwide culinary data.
🚀 Key Features & Innovation
🧠 Hybrid Search Engine
A robust search logic that queries both local MongoDB collections and the Spoonacular API based on user-inputted ingredients.


Smart Ingredient Matcher ($all logic): The search engine uses a strict matching algorithm to ensure suggested recipes contain all user-specified "leftover" ingredients.
🛠 Smart Culinary Tools

Dynamic Portion Scaler: A client-side mathematical engine that adjusts ingredient quantities in real-time based on the number of servings.


Substitution Engine (NLP-Lite): A searchable database that provides instant alternatives for missing ingredients to prevent cooking interruptions.


Culinary PDF Export: A print-optimized feature that converts digital recipes into physical cards using CSS Media Queries.
🎨 Premium UI/UX

Persistent Sidebar: A unified navigation anchor providing seamless flow across all application states (Dashboard, Search, Detail).


Chef’s Night Mode: A persistent, low-light UI theme synchronized across the app using Browser Local Storage.


Apothecary Aesthetic: Professional use of #556B2F (Olive) and #fdfae6 (Cream) for a high-end gourmet experience.
🛡 Security & Middleware
Password Security (Bcrypt.js): User passwords are "salted and hashed" using bcryptjs before storage, ensuring plain text credentials are never saved in the database.
Session Management: Implemented via express-session to maintain an authenticated state and prevent unauthorized access to the /dashboard.
AJAX-Powered Interactions: The "Add Recipe" and "Quick Search" features utilize the Fetch API/AJAX, allowing users to perform CRUD operations without a full page reload, maintaining a "Single-Page Experience."
🏗 System Architecture (MVC Pattern)The application follows a strictly decoupled Model-View-Controller design to ensure scalability:
Model: Defines the recipe and user schemas in MongoDB using Mongoose.
View: Interactive templates created with EJS and styled with Bootstrap 5.
Controller/Routes: Node.js logic handling CRUD operations, authentication, and External API coordination.

