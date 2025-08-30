// server.js

// --- 1. Import Dependencies ---
// Express is the web framework we'll use to create the server.
const express = require('express');
// Cors is a middleware to allow our frontend (running on a different address) to communicate with our backend.
const cors = require('cors');

// --- 2. Initialize the Express App ---
const app = express();
const PORT = process.env.PORT || 3001; // The server will run on port 3001, which matches the frontend configuration.

// --- 3. Configure Middleware ---
// This enables Cross-Origin Resource Sharing, which is necessary to allow your HTML file to make requests to this server.
app.use(cors());
// This allows the server to accept and parse JSON data in the body of requests.
app.use(express.json());


// --- 4. Define API Endpoints (Routes) ---

/**
 * @route   POST /api/booking
 * @desc    Handles a new service booking request from the hero section form.
 * @access  Public
 */
app.post('/api/booking', (req, res) => {
  // We get the 'location' from the JSON data sent by the frontend.
  const { location } = req.body;

  // Basic validation to ensure a location was sent.
  if (!location) {
    // If no location, send back a 400 Bad Request error.
    return res.status(400).json({ message: 'Location is required to make a booking.' });
  }

  // Log the received data to the terminal so you can see it's working.
  console.log('--- New Booking Received ---');
  console.log('Location:', location);
  console.log('--------------------------');

  // --- Backend Logic Placeholder ---
  // In a real application, this is where you would:
  // 1. Save the booking details to a database (like MongoDB or PostgreSQL).
  // 2. Find the nearest available worker based on the location.
  // 3. Send a notification to that worker.
  // For now, we'll just send back a success message to the user.

  res.status(201).json({
    message: `Booking confirmed for location: "${location}". A professional will arrive in 15 minutes!`,
  });
});

/**
 * @route   POST /api/contact
 * @desc    Handles the contact form submission.
 * @access  Public
 */
app.post('/api/contact', (req, res) => {
  // Get the name, email, and message from the request body.
  const { name, email, message } = req.body;

  // Simple validation to make sure all fields were filled out.
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill out all fields.' });
  }

  // Log the contact message to your terminal.
  console.log('--- New Contact Form Submission ---');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  console.log('---------------------------------');

  // --- Backend Logic Placeholder ---
  // Here, you would typically:
  // 1. Save the message to your database.
  // 2. Use a service like Nodemailer or SendGrid to send an email to your support team.
  // For this example, we'll just send a confirmation response.

  res.status(200).json({
    message: 'Thank you for your message! We will get back to you shortly.',
  });
});

// --- 5. Start the Server ---
// This tells the server to start listening for incoming requests on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
  console.log('Waiting for requests from the website...');
});
