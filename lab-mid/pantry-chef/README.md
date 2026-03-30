🌿 Pantry Chef | Olive Edition
Pantry Chef is a full-stack recipe management system built with the Apothecary Aesthetic. It allows users to manage their personal recipes via a local MongoDB database while providing a hybrid search experience integrated with the Spoonacular API.

🚀 Features
Aesthetic Splash Screen: A beautiful entry point for the user.

Unified Dashboard: Manage (Create, Read, Update, Delete) local recipes.

Hybrid Search: Search ingredients across local MongoDB and the Global Spoonacular API.

Olive & Cream UI: A premium, organic design for a gourmet experience.

RESTful API: Clean endpoints with proper HTTP methods and status codes.

🛠️ Tech Stack
Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Frontend: EJS, Bootstrap 5, Custom CSS

API Testing: Postman

External API: Spoonacular API

⚙️ Installation & Setup
Follow these steps to get the project running on your local machine:

1. Clone the Repository
   
git clone <your-github-repo-link>
cd pantry-chef
3. Install Dependencies
Make sure you have Node.js installed, then run:


npm install
3. Environment Variables
Create a .env file in the root directory and add your credentials:

Code snippet
PORT=3000
MONGO_URI=your_mongodb_connection_string
API_KEY=your_spoonacular_api_key
4. Run the Application
Start the server using:


npm start
# OR
node bin/www
Open http://localhost:3000 in your browser.

📂 Project Structure
/models - Mongoose schemas (Recipe.js)

/routes - RESTful API endpoints

/views - EJS templates (Splash, Dashboard, Search Results)

/public - Images and Custom CSS

🧪 API Testing
You can test the following RESTful endpoints using Postman:

GET /dashboard - View all local recipes

POST /add-recipe - Create a new recipe

PUT /update-recipe/:id - Update an existing recipe

DELETE /delete-recipe/:id - Remove a recipe
