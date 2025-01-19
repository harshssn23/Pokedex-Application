# Pokedex-Application

This project is a Pokédex application built using modern web technologies to display information about Pokémon fetched from the PokeAPI. The app allows users to search for specific Pokémon, filter by types, view detailed stats, and explore similar Pokémon.
## Website link: [https://pokedexbyharsh.netlify.app/home]
## i. Tech Stack

### Frontend
- **React**: For building a responsive and dynamic user interface.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For styling the application with a utility-first approach.
- **React Router**: For managing navigation within the app.

### Backend (API)
- **PokeAPI**: Used to fetch real-time Pokémon data.

### Dev Tools
- **Vite**: For fast and optimized development.
- **ESLint**: For maintaining code quality and consistency.
- **Prettier**: For consistent code formatting.

## ii. Pre-requisites (for the app to run locally)

Ensure the following tools are installed on your system:

1. **Node.js** (version 16 or later):
   - Install Node.js from [Node.js official website](https://nodejs.org/).

2. **npm** or **yarn**:
   - Comes bundled with Node.js. Alternatively, install Yarn by following [these instructions](https://classic.yarnpkg.com/en/docs/install).

3. **Git**:
   - Install Git from [Git official website](https://git-scm.com/).

## iii. Migration & Seed Database Steps

The Pokédex application fetches data directly from the PokeAPI, so there is no local database setup required. However, caching is implemented within the application to improve performance.

### How Caching Works:
- Data is stored in an in-memory JavaScript object to avoid redundant API calls.
- Cached data persists during the app's runtime.

No additional migration or seeding steps are required.

## iv. Running the App

Follow these steps to run the application locally:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies
```bash
npm install
```
Or, if using Yarn:
```bash
yarn install
```

### 3. Start the Development Server
```bash
npm run dev
```
Or, if using Yarn:
```bash
yarn dev
```

The app will start on [http://localhost:3000](http://localhost:3000) (or a different port if specified).

### 4. Build for Production
To create a production-ready build of the application:
```bash
npm run build
```
Or, if using Yarn:
```bash
yarn build
```
The optimized build will be output to the `dist/` directory.

### 5. Serve the Production Build Locally
Install a static server like `serve`:
```bash
npm install -g serve
serve -s dist
```
The app will be available locally on the specified port.

---

### Notes
- Make sure you have a stable internet connection to fetch data from PokeAPI.
- Feel free to customize the application by modifying the files as per your requirements.

Enjoy exploring the Pokémon world with this Pokédex app!

