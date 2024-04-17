// MAIN LOGIC, INITIALIZATION OF THE APP IS DONE HERE
// TO RUN LOCALLY, TYPE "node app.js" IN TERMINAL (W/O THE QUOTATION MARKS)

// Import necessary modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

const app = express();

// Set the path to your public directory
const publicDirectory = path.join(__dirname, 'public');

// Serve static files from the public directory
app.use(express.static(publicDirectory, { index: 'index.html' }));
app.use(logger('dev'));

module.exports = app;
