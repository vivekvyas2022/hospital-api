const mongoose = require('mongoose');

main().catch((err) => console.log(err));

const db = mongoose.connection;

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017');
  console.log('MongoDB is successfully connected');
}

db.once('open', () => {
  console.log('DB is open');
});

module.exports = db;
