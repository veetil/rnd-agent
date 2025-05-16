# IdeaCode.ai

This is the official repository for the IdeaCode.ai website, featuring the R&D Agent Store landing page.

## Features

- Modern, responsive landing page built with Next.js and Tailwind CSS
- Waitlist signup form with Supabase integration
- Animated visuals and interactive components
- Optimized for performance and SEO

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Supabase account for the waitlist functionality

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ideacode-rnd-agent.git
cd ideacode-rnd-agent
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Copy the `.env.local.example` file to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase URL and anon key:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Database Setup

Create the waitlist table in your Supabase project:

```sql
CREATE TABLE waitlist_rnd_agent (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `app/` - Next.js app directory with routes and layouts
- `components/` - Reusable UI components
- `public/` - Static assets
- `src/` - Source code
  - `utils/` - Utility functions and helpers
  - `hooks/` - Custom React hooks
  - `__tests__/` - Test files

## Testing

Run the test suite with:

```bash
npm test
# or
yarn test
```

For test coverage:

```bash
npm run test:coverage
# or
yarn test:coverage
```

## Deployment

See the [deployment guide](./deployment-guide.md) for instructions on deploying to Vercel and setting up the custom domain.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Contact

For questions or support, please contact [support@ideacode.ai](mailto:support@ideacode.ai).