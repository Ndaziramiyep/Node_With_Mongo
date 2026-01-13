const { MongoClient } = require('mongodb');

async function fixIndex() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('nodedb');
    
    // Drop the problematic index
    try {
      await db.collection('categories').dropIndex('id_1');
      console.log('Dropped id_1 index from categories');
    } catch (error) {
      console.log('Index id_1 not found or already dropped');
    }
    
    console.log('Index fix completed');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

fixIndex();