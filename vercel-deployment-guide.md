# Vercel Deployment Guide for IdeaCode.ai

This guide provides detailed instructions for deploying the IdeaCode.ai website to Vercel and configuring the custom domain.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Database Migrations](#database-migrations)
- [Manual Deployment Steps](#manual-deployment-steps)
- [Automated Deployment](#automated-deployment)
- [Custom Domain Configuration](#custom-domain-configuration)
- [Post-Deployment Verification](#post-deployment-verification)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before proceeding with deployment, ensure you have:

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have an account.
2. **Vercel CLI**: Install the Vercel CLI with `npm install -g vercel`.
3. **Supabase Project**: A Supabase project with the following credentials:
   - Project URL
   - Anon Key
   - Service Role Key (for migrations)
4. **Domain Access**: Administrative access to the DNS settings for ideacode.ai.
5. **Node.js and npm**: Latest stable versions installed.

## Environment Setup

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

These variables will be used for local development and testing. For production, you'll need to set them in the Vercel dashboard.

### Vercel Configuration

Create a `vercel.json` file in the project root:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["sfo1"],
  "rewrites": [
    { "source": "/", "destination": "/rnd-agent-store" }
  ]
}
```

This configuration:
- Specifies build commands
- Sets the deployment region to San Francisco
- Redirects the root path to the R&D Agent Store page

## Database Migrations

Before deployment, ensure the required database tables exist in your Supabase project.

### Waitlist Table

The `waitlist_rnd_agent` table is used to store email sign-ups for the waitlist. You can create it using the migration script:

1. Ensure the `SUPABASE_SERVICE_ROLE_KEY` is set in your `.env` file.
2. Run the migration script:
   ```bash
   node scripts/apply-migrations.js
   ```

Alternatively, you can manually create the table in the Supabase dashboard:

```sql
-- Create waitlist_rnd_agent table
CREATE TABLE IF NOT EXISTS waitlist_rnd_agent (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS waitlist_rnd_agent_email_idx ON waitlist_rnd_agent (email);
```

## Manual Deployment Steps

If you prefer to deploy manually instead of using the deployment script, follow these steps:

### 1. Login to Vercel

```bash
vercel login
```

### 2. Run Tests

Ensure all tests pass before deployment:

```bash
npm test
```

### 3. Build the Project Locally

Test the build process locally:

```bash
npm run build
```

### 4. Deploy to Vercel

Deploy to production:

```bash
vercel --prod
```

### 5. Set Environment Variables

In the Vercel dashboard:
1. Go to your project
2. Navigate to "Settings" > "Environment Variables"
3. Add the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 6. Configure Custom Domain

In the Vercel dashboard:
1. Go to your project
2. Navigate to "Settings" > "Domains"
3. Add your domain: `ideacode.ai`
4. Follow the instructions to configure DNS settings

## Automated Deployment

For a streamlined deployment process, use the provided deployment script:

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

The script will:
1. Check for and install the Vercel CLI if needed
2. Verify login status
3. Check for environment variables
4. Create or update configuration files
5. Run tests and build the project
6. Deploy to Vercel
7. Set up the custom domain (optional)

## Custom Domain Configuration

### DNS Configuration

To point ideacode.ai to your Vercel deployment, you'll need to configure the following DNS records:

#### If using Vercel DNS:

1. Transfer or delegate your domain to Vercel following their instructions.

#### If using external DNS:

1. Add an A record:
   - Name: `@` (root domain)
   - Value: `76.76.21.21` (Vercel's IP)
   - TTL: 3600 (or as recommended)

2. Add a CNAME record for www subdomain:
   - Name: `www`
   - Value: `cname.vercel-dns.com.`
   - TTL: 3600 (or as recommended)

### SSL Certificate

Vercel automatically provisions SSL certificates for custom domains. The process typically takes a few minutes after DNS propagation.

## Post-Deployment Verification

After deployment, verify the following:

1. **Website Accessibility**: Ensure the website is accessible at both ideacode.ai and www.ideacode.ai.
2. **Redirects**: Verify that the root path redirects to the R&D Agent Store page.
3. **Waitlist Functionality**: Test the waitlist form to ensure emails are being stored in the Supabase database.
4. **SSL Certificate**: Confirm that HTTPS is working correctly.
5. **Responsive Design**: Check the website on different devices and screen sizes.

## Troubleshooting

### Common Issues

#### Deployment Failures

- **Build Errors**: Check the build logs in the Vercel dashboard for specific errors.
- **Missing Dependencies**: Ensure all dependencies are properly installed.
- **Environment Variables**: Verify all required variables are set in Vercel.

#### Database Connection Issues

- **Incorrect Credentials**: Double-check your Supabase credentials.
- **CORS Issues**: Ensure your Supabase project allows requests from your Vercel domain.
- **Table Missing**: Verify the `waitlist_rnd_agent` table exists in your Supabase database.

#### Domain Configuration

- **DNS Propagation**: DNS changes can take up to 48 hours to propagate globally.
- **Incorrect Records**: Verify your DNS records match Vercel's recommendations.
- **SSL Issues**: If HTTPS isn't working, check the SSL certificate status in the Vercel dashboard.

### Getting Help

If you encounter issues not covered in this guide:

- **Vercel Support**: Visit [vercel.com/support](https://vercel.com/support)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)

## Maintenance and Updates

### Continuous Deployment

Vercel supports continuous deployment from GitHub. To set this up:

1. Connect your GitHub repository to Vercel
2. Configure automatic deployments for specific branches
3. Set up preview deployments for pull requests

### Monitoring

Monitor your deployment using Vercel Analytics:

1. Enable Analytics in the Vercel dashboard
2. Monitor performance, errors, and user behavior
3. Set up alerts for critical issues

### Regular Updates

Keep your deployment up to date:

1. Regularly update dependencies
2. Apply security patches promptly
3. Test thoroughly before deploying updates