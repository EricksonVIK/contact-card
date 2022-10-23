// after npm i idb -- import openDB
import { openDB } from "idb";
import "regenerator-runtime/runtime";

// async function
export const initdb = async () => {
  // We are creating a new database named 'contact_db' which will be using version 1 of the database.
  openDB("contact_db", 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains("contacts")) {
        console.log("contacts store already exists");
        return;
      }
      // Create a new object store for the data and give it a key name of 'id' which will increment automatically
      db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
      console.log("contacts store created");
    },
  });
};

// get function from indexedDB
export const getDb = async () => {
  console.log("GET from the database");
  // create a connection to indexedDB database and version
  const contactDB = await openDB("contact_db", 1);
  // create a new transaction and specify data privileges
  const tx = contactDB.transaction("contacts", "readonly");
  // open up the desired object store
  const store = tx.objectStore("contacts");
  // use the getAll() method
  const request = store.getAll();
  // get confirmation of the request
  const result = await request;
  console.log("result.value", result);
  return result;
};

// Export a function we will use to POST to the database.
export const postDb = async (name, email, phone, profile) => {
  console.log("POST to the database");

  // Create a connection to the database and specify the version we want to use.
  const contactDb = await openDB("contact_db", 1);

  // Create a new transaction and specify the store and data privileges.
  const tx = contactDb.transaction("contacts", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("contacts");

  // Use the .add() method on the store and pass in the content.
  const request = store.add({
    name: name,
    email: email,
    phone: phone,
    profile: profile,
  });

  // Get confirmation of the request.
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

export const deleteDb = async (id) => {
  console.log("DELETE from the database", id);

  // create connection to indexdb and version
  const contactDb = await openDB("contact_db", 1);

  // create new transaction with privileges
  const tx = contactDb.transaction("contacts", "readwrite");

  // open desired object
  const store = tx.objectStore("contacts");

  // use .delete() to remove data
  const request = store.delete(id);

  // confirm removal
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

// edit funtion
export const editDb = async (id, name, email, phone, profile) => {
  console.log("UPDATE card");

  // create connection to indexdb and version
  const contactDb = await openDB("contact_db", 1);

  // create new transaction with privileges
  const tx = contactDb.transaction("contacts", "readwrite");

  // open desired object
  const store = tx.objectStore("contacts");

  // use put() to update
  const request = store.put({
    id: id,
    name: name,
    email: email,
    phone: phone,
    profile: profile,
  });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};
