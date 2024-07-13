// backend.js
const { MongoClient } = require('mongodb');
const { config } = require('dotenv');

config(); 

const url = process.env.MONGODB_URL;

async function connectToDatabase() {
  try {
    console.log('Attempting to connect to the database...');
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to the database');

    const db = client.db(); // Get the database instance

    // Insert songs directly into the database
    const songsCollection = db.collection('songs'); // Specify the collection for songs

    // Insert song documents
    const songs = [
      { title: 'Song 1', artist: 'Artist 1' },
      { title: 'Song 2', artist: 'Artist 2' },
      { title: 'Song 3', artist: 'Artist 3' }
      // Add more song objects as needed
    ];

    // Insert the songs into the collection
    const result = await songsCollection.insertMany(songs);
    console.log(`${result.insertedCount} songs inserted into the database`);

    // Close the database connection
    await client.close();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Terminate if connection fails
  }
}

module.exports = { connectToDatabase };

// server.js
const { connectToDatabase } = require('./backend.js');

// Start the database connection process
connectToDatabase();
