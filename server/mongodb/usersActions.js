const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const CONSTANT_VARIABLE = require('../constants/constants');

module.exports = {
  fetchUser: async function () {

  },

  findUser: email => {
    const query = { email: email };

    dbo.collection(CONSTANT_VARIABLE.COLLECTION_USERS).findOne(query, (err, doc) => {
      if (err) throw err;
      // user Found
      if (doc) {
        db.close();
        return doc;
      }
      // user Not Found
      else if (!doc) {
        db.close();
        return false;
      }
    });
  },

  insertUser: async userData => {
    const client = new MongoClient(CONSTANT_VARIABLE.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      // Connect to the MongoDB cluster
      await client.connect();
      // Find the User by Email
      const isUserExist = await client.db(CONSTANT_VARIABLE.MONGODB_DBNAME).
        collection(CONSTANT_VARIABLE.COLLECTION_USERS).
        findOne({ email: userData.email });
      // User Exists
      if (isUserExist) {
        return false;
      }
      else {
        // User doesn't Exists 
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        const result = await client.db(CONSTANT_VARIABLE.MONGODB_DBNAME).
          collection(CONSTANT_VARIABLE.COLLECTION_USERS).insertOne(userData);
        console.log(`New listing created with the following id: ${result.insertedId}`);
        return result;
      }
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  },

  updateUser: async function (filter, updateDocument) {
    const client = new MongoClient(CONSTANT_VARIABLE.MONGODB_URL);

  },

  deleteUser: async function (platformId) {
    const client = new MongoClient(CONSTANT_VARIABLE.MONGODB_URL);
  },

}