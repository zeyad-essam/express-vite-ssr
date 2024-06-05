# Express-Vite-SSR

This project demonstrates server-side rendering (SSR) using Vite with React Router and React Query, all within an Express.js server. The server is configured to serve the client folder, making development and deployment straightforward.

## Project Overview

- **Express.js**: Backend server to serve the client and handle SSR.
- **Vite**: Bundler and build tool for the client, known for its fast build times and HMR.
- **React Router**: Handles client-side routing.
- **React Query**: Manages data fetching and state management.

## Installation

First, clone the repository:

```bash
git clone https://github.com/zeyad-essam/express-vite-ssr.git
cd express-vite-ssr
```

Next, install dependencies:

```bash
npm install
```

## Running the Development Server

First, start the server:

```bash
npm run dev
```

This command starts the Express server and the Vite development server concurrently. Next, open your browser and navigate to `http://localhost:3000`.

## Building for Production

First, build the client:

```bash
npm run build
```

Next, start the production server:

```bash
npm start
```

## Contributing

Feel free to open issues or submit pull requests if you have any suggestions or improvements.
