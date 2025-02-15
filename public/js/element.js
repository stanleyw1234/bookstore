window.addEventListener('DOMContentLoaded', async () => {
  console.log(publishable_key)

  const stripe = Stripe(publishable_key);
  const elements = stripe.elements({clientSecret:client_secret}); // use pi client_secrete to create element
  const paymentElement = elements.create('payment')
  paymentElement.mount('#stripe-element')


})


