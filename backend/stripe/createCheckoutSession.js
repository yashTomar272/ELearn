const router = require("express").Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { item } = req.body;
  const userId = req.headers.userid;

  console.log("Received item: ", item);
  console.log("Received userId: ", userId);

  if (!item || !userId) {
    return res.status(400).json({ message: 'Missing item or userId' });
  }


  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: { name: item.title,
             images: [item.thumbnail],
           },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      }],
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/courses`,
      metadata: {
        courseId: item._id,
        userId, // 👈 Stripe metadata me bhi bhejna zaruri hai
      },
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Stripe checkout failed' });
  }
});



module.exports = router;
