# Client-Side Resume Editor

A privacy-focused, single-page resume editor built with Next.js and Tailwind CSS. Design your resume with real-time preview, multiple fonts, and section toggles, then export directly to PDF or LaTeX.

**Live Demo:** [Deploy with Vercel](https://vercel.com/new/clone?repository-url=https://github.com/adidey/ONE_PAGE_RESUME)

## Features

- **Privacy First**: All data lives in your browser. No database, no accounts, no tracking.
- **Real-Time Editing**: Click and type directly on the resume preview.
- **Customizable**:
    - **Fonts**: Choose from Sans, Serif, Monospace, or Modern (Montserrat).
    - **Sections**: Toggle Summary, Experience, Education, Projects, and Skills on/off.
- **Smart Layout**: Automatic A4 page formatting and overflow detection.
- **Export Options**:
    - **PDF**: Clean, margin-free PDF export.
    - **LaTeX**: Generate `.tex` source for professional typesetting.
- **Zero Config**: Client-side only architecture.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Next/Font](https://nextjs.org/docs/basic-features/font-optimization) (Google Fonts)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

The project structure is simple:

- `app/page.tsx`: Main editor entry point.
- `components/Resume.tsx`: Core resume renderer.
- `components/Toolbar.tsx`: Sidebar for global settings.
- `lib/defaultResume.ts`: Data schema and initial state.

## Deployment

The easiest way to deploy is using the Vercel Platform:

1. Push your changes to GitHub.
2. Import the project in Vercel.
3. Deploy! (No environment variables required).
