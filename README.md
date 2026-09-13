# BuildSync

A high-performance construction coordination platform and client portal designed for general contractors, project managers, and property owners.

## Features

- **Client Portal**: Track project timelines, phase milestones, daily log updates, architectural documents, and invoices in real time.
- **Executive Admin Dashboard**: Comprehensive management of ongoing projects, consultation bookings, estimate workflows, and client directory.
- **Architectural Design System**: High-contrast, dark-mode construction visual hierarchy with GPU-accelerated video background, responsive layout, and mobile optimization.
- **Authentication**: Email and password authentication powered by Supabase with role-based access control (RBAC).
- **Document & Media Gallery**: Visual previews for blueprints, site photographs, and structural inspection records.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling & Animation**: Tailwind CSS v4, Motion
- **Icons**: Lucide React
- **Backend & Database**: Supabase (Auth, Profiles, Projects, Consultations)
- **Deployment**: Google Cloud Run / Google AI Studio

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/buildsync.git
   cd buildsync
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## License

MIT
