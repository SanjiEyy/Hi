const express = require('express');
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

const app = express();
const PORT = 3000;
const greetingsFilePath = path.join(__dirname, 'greetings.txt');

// Function to get a random greeting based on the time of day in Manila timezone
function getGreetingBasedOnTime() {
    // Get current time in Manila timezone
    const currentHour = moment().tz('Asia/Manila').hour();
    const greetings = fs.readFileSync(greetingsFilePath, 'utf-8').split('\n').filter(Boolean);

    let session = '';

    if (currentHour >= 5 && currentHour < 12) {
        session = 'morning';
    } else if (currentHour >= 12 && currentHour < 17) {
        session = 'afternoon';
    } else if (currentHour >= 17 && currentHour < 21) {
        session = 'evening';
    } else {
        session = 'night';
    }

    // Replace <session> in greetings with the appropriate time of day
    const updatedGreetings = greetings.map(greeting => greeting.replace('<session>', session));

    const randomIndex = Math.floor(Math.random() * updatedGreetings.length);
    return updatedGreetings[randomIndex];
}

// API endpoint to get a greeting based on the time of day
app.get('/greeting', (req, res) => {
    const greeting = getGreetingBasedOnTime();
    res.send({ greeting });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
