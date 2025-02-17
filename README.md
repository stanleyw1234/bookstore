# Take home project

## How to build, configure and run your application

1. Install Node.js and npm:
    - Download and install Node.js from (https://nodejs.org/). npm is included with Node.js.

2. Create a Stripe account and retrieve test API keys:
    - Go to (https://dashboard.stripe.com/register) and create a free test account.
    - After logging in, navigate to the Developers section to find your test API keys.

3. Clone the repository and install dependencies:
    - Run the following commands in your terminal:
      ```bash
      git clone https://github.com/stanleyw1234/bookstore.git
      cd bookstore
      npm install
      ```

4. Rename `sample.env` to `.env` and populate it with your Stripe account's test API keys.

5. Run the application locally:
    ```bash
    npm start
    ```

6. Navigate to [http://localhost:3000](http://localhost:3000) to view the bookstore website!


## How does the solution work? Which Stripe APIs does it use? How is your application architected?

This solution leverages the Stripe Payment Intents API to ensure secure and asynchronous payment confirmation, accommodating additional authentication steps like 3DS required by SCA and PSD2 regulations in the EU.
It also integrates Stripe Elements to create a custom UI for securely collecting and processing card details, which reduces fraud risk and ensures PCI compliance. By avoiding redirection to third-party pages, it offers a seamless checkout experience that enhances brand loyalty. Utilizing Stripe's robust solutions, this application delivers a secure and smooth checkout process, enhancing customer trust, satisfaction, and conversion rates.

### Checkout Flow
1. Customer selects which book to purchase
2. Client passes the book id to the server
3. Server retrieves book price using book id, then create a paymentIntent with stripe using `amount` and `currency` parameters 
4. Stripe returns the created paymentIntent to server
5. Server retrieves `client_secret` from paymentIntent, then send it to client
6. Client populate Stripe Element form using paymentIntent `client_secret`
7. Customer enters card & billing details, then click submit 
8. Client submit element object to stripe to confirm payment
9. Stripe redirects customer to the specified return URL (`/success`).
10. Client retrieves paymentIntent from Stripe and displays the confirmation page with payment status, amount and  paymentIntent ID

![Workflow](workflow.jpg)
reference: https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=elements


### Stripe APIs Used
Most of the Stripe API calls are abstracted away by the `stripe.js` package, simplifying the integration process. There are several paymentIntent API calls to create the paymentIntent, confirm the payment, and retrieve payment status & details. The `client_secret` is used to uniquely identify the paymentIntent. 

POST /v1/payment_intents                     : Create a paymentIntent
GET /v1/payment_intents/:id                  : Retrieve a paymentIntent
POST /v1/payment_intents/:id/confirm         : Confirm a payment

### Application Architecture
1. **Frontend**: The frontend is built using HTML, CSS (Bootstrap), and JavaScript. It provides the user interface for browsing books and initiating the checkout process.
2. **Backend**: The backend is built using Node.js and the Express framework. It handles API requests, interacts with Stripe's APIs, and manages the application's business logic.
3. **Environment Configuration**: The application uses environment variables to store sensitive information such as Stripe API keys. These are configured in the `.env` file.
4. **Routing**: The Express application defines routes to handle different endpoints, such as displaying books, creating checkout sessions, and confirming payments.



## How did you approach this problem? Which docs did you use to complete the project? What challenges did you encounter?

### I began by breaking down the requiremetns into several key actions:
-webapp passes the selected book info to server (already implemented)
-server creates payment intent with stripe
-webapp completes payment form and submit to stripe for processing
-retirve and display payment status on webapp

Using stripe.js as the foundation, I mapped each action to corresponding functions in stripe.js package


### Docs used:
I found useful step by step guide on how to implement stripe element from this tutorial:
https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=elements

I also found useful tutorial videos from stripe developer channel on youtube, helping me get started with node.js and express framework:
https://www.youtube.com/@StripeDev


### what challenges faced:
I faced some bug that client_secret is not correctly passed when creating stripe element, I double checked documentations and also inserted several console.log() to track down where the issue was and resolved it.

I struggled to find a way to 
I struggled to find a way to pass publishablekey from checkout.hbs to success.hbs, so in the end I added a api endpoint on server side for getting pulishable key



## How you might extend this if you were building a more robust instance of the same application.

To build a more robust instance of this application, consider the following enhancements:

1. **Allow User Profiles**:
    - Create user account on Stripe, allow users to use saved cards for seamless checkout
    - Allow users to view order history and request refunds

2. **Multiple Payment Methods**:
    - Support other popular payment methods such as Apple Pay, Google Pay, and Buy Now Pay Later options.
    - Integrate with regional payment methods like GrabPay in Singapore to cater to a wider audience.

3. **Scalability**:
    - Adopt a microservices architecture to handle different functionalities independently.
    - Use message queues like Kafka or Redis to manage high order volumes during peak times like Black Friday and Cyber Monday, decouple data flow from processing
    - Implement auto-scaling on cloud platforms (e.g., AWS, Azure) to dynamically adjust resources based on demand.

4. **Security Enhancements**:
    - Use HTTPS to secure data transmission between the client and server.
    - Implement logging and monitoring to detect and respond to security incidents promptly.

5. **Fault Tolerance**:
    - Implement retry mechanisms (exponential backoff) to handle transient network issues.
    - Use load balancers to distribute traffic evenly across multiple servers.
    - Set up failover strategies to ensure the application remains available even if some components fail.






