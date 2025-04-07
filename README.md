# Modern E-Commerce Platform

A fully responsive modern e-commerce application with complete payment functionality, built with Next.js, Sanity CMS, and Stripe integration. This platform provides a seamless shopping experience with beautiful UI, advanced cart features, and secure checkout.

![E-Commerce Platform](https://user-images.githubusercontent.com/70088342/160780701-7bb38a57-76bd-49a2-a4ec-49f89c50a7c7.png)

## Features

- **Responsive Design**: Fully optimized for all device sizes
- **Dynamic Product Management**: Add, edit, and manage products using Sanity CMS
- **Advanced Cart Functionality**: Add/remove items, update quantities, real-time calculations
- **Secure Payment Processing**: Complete Stripe integration for handling transactions
- **User-friendly Interface**: Intuitive navigation and modern animations
- **Server-Side Rendering**: Optimized performance with Next.js
- **Content Management**: Easily update content without touching code

## Tech Stack

- **Frontend**: React.js, Next.js, TailwindCSS, Framer Motion
- **Backend**: Next.js API routes, Sanity CMS
- **Payment Processing**: Stripe
- **Styling**: TailwindCSS, CSS
- **State Management**: React Context API
- **Notifications**: React Hot Toast

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/joseook/joseok-ecommerce-sanity.git
   cd ecommerce_sanity_stripe
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SANITY_TOKEN=your_sanity_token
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### For Shoppers
- Browse products on the homepage
- View detailed product information
- Add products to cart
- Adjust quantities in the cart
- Complete checkout with Stripe

### For Store Owners
- Access the Sanity Studio at `/studio` route
- Add and edit products in real-time
- Manage categories and featured products
- Track orders and inventory

## Sanity + Stripe Integration

This project showcases a powerful integration between Sanity CMS and Stripe:

- **Content Management**: Sanity provides a flexible backend for managing all product content, images, and metadata
- **Payment Processing**: Stripe handles secure checkout, payment processing, and transaction management
- **Seamless Workflow**: Product data from Sanity is used to create and manage products in Stripe
- **Real-time Updates**: Changes made in Sanity are immediately reflected on the frontend


## Developer

Developed by **Joseok** (2025)

## License

This project is open-source and available under the [MIT License](./LICENSE).
