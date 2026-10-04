# BirthdayWishora — Birthday Wishes Platform

**Make Every Birthday Unforgettable.**

BirthdayWishora is a global birthday wishes and personalized greeting platform built with Next.js and Supabase.

## Current product
- Birthday wishes by relationship and style
- SEO pages for `/wishes/[category]` and `/wishes/[category]/[style]`
- Personalized generator fields: name, age, language and personal memory
- AI-generated wishes with a database fallback
- Copy + WhatsApp + Facebook + X + Email sharing
- Supabase-backed content taxonomy and wishes
- Dynamic sitemap and robots metadata
- Mobile-friendly responsive UI

## Brand
- Product: BirthdayWishora
- Tagline: Make Every Birthday Unforgettable.
- Domain target: birthdaywishora.com
- Positioning: Find, personalize and share the perfect birthday message.

## Stack
- Next.js App Router + TypeScript
- Supabase
- GitHub
- Ready for Vercel deployment

## Local setup
1. Copy `.env.example` to `.env.local`.
2. Set the Supabase publishable key.
3. Set `NEXT_PUBLIC_SITE_URL` to the local or production origin.
4. Install dependencies with `npm install`.
5. Run `npm run dev`.

## Production
Connect this repository to Vercel and add the same environment variables in the project settings. Connect `birthdaywishora.com` when the production domain is ready.

## Content
The database contains relationship and style taxonomies plus English starter wishes. `supabase/seed.sql` contains reproducible content inserts for new environments.

## Next phase
Multilingual expansion, greeting-card templates, authentication/saved wishes, analytics, rate limiting and monetization.
