//MAIN LOGIC, INITIALIZATION OF THE SERVER IS DONE HERE


//TO RUN LOCALLY, TYPE "node app.js" IN TERMINAL (W/O THE QUOTATION MARKS)
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Set the path to your public directory
const publicDirectory = path.join(__dirname, 'public');

// Serve static files from the public directory
app.use(express.static(publicDirectory, { index: 'index.html' }));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
