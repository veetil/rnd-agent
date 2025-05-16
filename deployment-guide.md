# Deployment Guide for IdeaCode.ai

This guide outlines the steps to deploy the IdeaCode.ai website to Vercel with a custom domain.

## Prerequisites

- A Vercel account
- Access to the domain registrar for ideacode.ai
- Supabase project with the waitlist table

## Supabase Setup

1. Create a Supabase project if you haven't already
2. Create a table named `waitlist_rnd_agent` with the following schema:
   ```sql
   CREATE TABLE waitlist_rnd_agent (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email TEXT UNIQUE NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
3. Get your Supabase URL and anon key from the Supabase dashboard

## Vercel Deployment

1. Push your code to a GitHub repository
2. Log in to your Vercel account
3. Click "New Project" and import your GitHub repository
4. Configure the project with the following settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
5. Add the following environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
6. Click "Deploy"

## Custom Domain Setup

1. After deployment, go to the "Domains" section in your Vercel project
2. Add your custom domain: `ideacode.ai`
3. Follow Vercel's instructions to configure your domain's DNS settings:
   - Option 1: Use Vercel as your nameserver
   - Option 2: Add the required A, AAAA, and CNAME records to your existing DNS configuration
4. Wait for DNS propagation (can take up to 48 hours, but usually much faster)

## Verify Deployment

1. Visit your custom domain (ideacode.ai)
2. Test the waitlist form to ensure it's correctly saving emails to Supabase
3. Check that all pages and links are working correctly

## Troubleshooting

- If the site doesn't load, check your DNS configuration
- If the waitlist form doesn't work, verify your Supabase environment variables
- For any deployment issues, check the Vercel deployment logs

## Maintenance

- To update the site, simply push changes to your GitHub repository's main branch
- Vercel will automatically rebuild and deploy the updated site