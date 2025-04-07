import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-03-23',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log('Request body:', req.body);

      if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: 'Invalid request body: expected an array of items' });
      }

      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1R5Xn5B6EMFzSnymLOODOeFg' },
            { shipping_rate: 'shr_1R5XnvB6EMFzSnymsuJhy9R1' },

        ],
        line_items: req.body.map((item) => {
          if (!item.image?.[0]?.asset?._ref) {
            throw new Error(`Invalid item: ${item.name} - missing image reference`);
          }
          const img = item.image[0].asset._ref;
          const newImage = img
              .replace('image-', 'https://cdn.sanity.io/images/56ktwspe/production/')
              .replace('-webp', '.webp');

          return {
            price_data: {
              currency: 'eur',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      const session = await stripe.checkout.sessions.create(params);
      console.log('Stripe session created:', session);

      res.status(200).json(session);
    } catch (err) {
      console.error('Stripe API error:', err.message, err.stack);
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};