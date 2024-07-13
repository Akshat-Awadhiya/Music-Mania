const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./backend.js');

const app = express();
app.use(cors());
// other code

app.get('/', (req, res) => {
    res.send('Hello from the server!'); // Sending a response to the client
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectToDatabase(); // Start the database connection process
