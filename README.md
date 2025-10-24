# Lucia Herranz Soprano

A modern portfolio website for soprano singer Lucia Herranz, built with React and TypeScript.

## Features

- Photo gallery with content management
- Biography and repertoire information
- Admin panel for content management
- Responsive design
- Integration with Supabase for backend services

## Technologies

This project is built with:

- **Vite** - Build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI framework
- **shadcn-ui** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a service

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone https://github.com/gomez60621-lab/lucia-herranz-soprano.git
```

2. Navigate to the project directory:
```sh
cd lucia-herranz-soprano
```

3. Install dependencies:
```sh
npm install
```

4. Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=your_supabase_url
```

5. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```sh
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for deployment to GitHub Pages via GitHub Actions. Push to the `main` branch to trigger an automatic deployment.

## Project Structure

- `/src` - Source code
  - `/components` - React components
  - `/pages` - Page components
  - `/lib` - Utility functions and configurations
- `/public` - Static assets
- `/supabase` - Supabase configuration
- `/.github/workflows` - GitHub Actions workflows

## License

All rights reserved.
