# 🌿 Sproutly - AI-Powered Botanical Sanctuary & Diagnostics

Sproutly is a modern, full-stack smart gardening and plant health monitoring web application. It bridges the gap between automated botanical logging and advanced clinical leaf diagnostics by leveraging cutting-edge Artificial Intelligence.

---

## 🚀 Project Introduction (Intro)

**Sproutly** is designed for modern urban gardeners and plant enthusiasts to eliminate guesswork from plant care. The application serves as an AI-powered sanctuary where users can dynamically track their garden inventory and analyze plant health. 

### Core Features:
* **360-Degree Analytical Dashboard:** A unified control center providing real-time Key Performance Indicators (KPIs) like Total Plants, Garden Health %, and a chronological history ledger.
* **AI Plant Scanner (My Garden):** Users can upload a picture of any plant, and the embedded **Google Gemini 2.5 Flash AI** engine automatically detects the plant's scientific name, structural species type, watering schedules, and sunlight thresholds to autofill the logging form.
* **AI Health Clinic (Leaf Pathology):** An advanced diagnostic layer where uploading a photo of an infected leaf allows the AI to analyze the visual pathology, return a severity assessment (`high`, `medium`, `low`), diagnose the exact disease, and prescribe a step-by-step treatment plan.
* **Interactive Diagnostic Vault:** Saved clinical reports are archived securely on the dashboard. Clicking any past ledger card dynamically summons a modal popup containing the full AI prescription details without refreshing the page.

---

## 🛠️ Tech Stack & Dependencies (Jo Projects Me Istamal Huay)

Sproutly is built using a decoupled, highly efficient runtime ecosystem:

### Backend Architecture
* **Node.js & Express.js:** Powering the stateless RESTful API routing and endpoints.
* **MongoDB & Mongoose:** NoSQL document database utilizing strict schema blueprints for structured data storage.
* **JSON Web Tokens (JWT):** Ensuring state security and session authorization guardrails.
* **Bcryptjs:** Enforcing password hashing protection before database entries.

### Frontend Interface
* **React.js & Vite:** Providing a blazing-fast, component-driven Single Page Application (SPA) environment.
* **Tailwind CSS:** For an elegant, minimalist, and fully responsive fluid user interface layout.
* **Lucide React:** A lightweight, modern SVG icon library mapping the system's iconography layout.
* **Axios:** Managing automated async network requests bundled with structural Interceptors to seamlessly inject security headers.

### AI Integration
* **Google Gemini 2.5 Flash API:** Driving the vision-and-text processing multi-modal cognitive analysis engine.

---

## 📂 Project Structure (Folder Layout)

The project layout follows a highly efficient, single-folder decoupled design matching the system architecture:

```text
sproutly/
├── server/                    # ⚙️ BACKEND SUBSYSTEM
│   ├── config/
│   │   └── cloudinary.js      # Media cloud storage layout (if configured)
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT Security Token Guard verification layer
│   ├── models/
│   │   └── User.js            # MongoDB structure blueprint for accounts data
│   ├── routes/
│   │   ├── auth.js            # Public routes for session registration & login
│   │   ├── diagnoses.js       # Protected routes for AI Scan reports history
│   │   ├── gardens.js         # Protected routes for ecosystem summaries
│   │   └── plants.js          # Protected routes for individual botanical entries
│   ├── .env                   # Environment Vault (Database URI, API Keys, Secrets)
│   ├── package.json           # Backend dependency manifests
│   └── server.js              # CORE ENTRY ENGINE (Connects DB, Middleware & Inline Handlers)
│
└── client/                    # 🎨 FRONTEND INTERFACE (React SPA)
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx     # Reusable global header and session controller
    │   │   └── PlantCard.jsx  # Reusable UI component mapping database items
    │   ├── pages/
    │   │   ├── Splash.jsx     # App Landing gate page
    │   │   ├── Login.jsx      # Authentication session interface
    │   │   ├── Signup.jsx     # Registration intake interface
    │   │   ├── Dashboard.jsx  # Live Analytics panel & Diagnostic Vault Modal
    │   │   ├── MyGarden.jsx   # Botanical Logger with built-in autofill AI scanner
    │   │   └── Clinic.jsx     # AI Clinical Pathology Scanner & report saver
    │   ├── utils/
    │   │   └── api.js         # Axios instance featuring global Request Interceptors
    │   ├── App.jsx            # Routing Map control center protected by checkposts
    │   └── main.jsx           # App mounting initialization anchor
```





# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## 🔗 Project Resources & Live Demo

* **Google Drive Folder:** [Click Here to Access Sproutly Google Drive](https://drive.google.com/file/d/1nsVsmGlX6dCysSNFlCdMohJzDdFRFCIO/view?usp=drivesdk)
