const express = require('express');
const path = require('path');

const app = express();
const port = 3060; // Choose your desired port

// Serve static files from the "rotmg_toolset" directory
app.use(express.static(path.join(__dirname, 'rotmg_toolset_contents')));

// Handle requests to the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'rotmg_toolset_contents', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
