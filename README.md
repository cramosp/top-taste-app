# <img src="public/toptastelogo.png" alt="App Icon" width="30" height="30"/> Top Taste App

Top Taste App is a Next.js application designed to showcase the best in culinary delights. Leveraging the power of Next.js along with a suite of modern web technologies, this app provides users with an engaging experience to explore and discover top-rated recipes, restaurants, and food trends.

[Top Taste App](https://top-taste-app.vercel.app/)

## Features

- **Responsive Design**: Built ensuring a great experience across all devices.
- **User Authentication**: Integrated with Next Auth for secure user authentication.
- **Material UI**: Utilizes Material UI for a sleek and intuitive interface.
- **App directory**: Utilizes App directory introduces App Router, built on React Server Components.
- **Dynamic Routing**: Leverages Next.js dynamic routing for efficient navigation and content discovery.
- **TypeScript**: Employs TypeScript to enhance development by adding static type definitions. This brings increased reliability and more predictable code, helping to catch errors early and improving the overall developer experience.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Ensure you have the following installed:

- Node.js (v18 or later)
- npm / yarn / pnpm / bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/cramosp/top-taste-app.git
```

2. Navigate to the project directory:

```bash
cd top-taste-app
```

3. Create an `.env.local` in the root directory, to set up the environment variables needed for the app:
   To generate the `NEXTAUTH_SECRET`, you can execute `openssl rand -base64 32` in your terminal:

```
# Express API url
NEXT_PUBLIC_API_URL=http://localhost:5005

# NextAuth
NEXTAUTH_URL=http://localhost:3000

# You can generate a secret executing in your terminal:
# openssl rand -base64 32
NEXTAUTH_SECRET=<paste-your-secret-token-here>
```

4. Install NPM packages:

```bash
npm install
```

5. Run the development server. **Note**: You need to have the Rest API running before running the development server.

```bash
npm run dev
```

### Available scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.
- `npm run build`: Builds the app for production to the .next folder.
- `npm run start`: Starts the app in production mode.
- `npm run lint`: Runs the linter to catch issues in your code.
- `npm run prettier`: Formats your codebase using Prettier.
- `npm run prepare`: Sets up Husky for managing Git hooks. (At the moment I am only using `pre-commit` hook to run the linters)

## Express REST API

- Repository: https://github.com/cramosp/top-taste-server
