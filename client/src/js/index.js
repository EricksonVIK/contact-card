// Central webpack file for js --- Creates and entry point for webpack
// import other js files
import "./form";
// import "./submit";

// import images
import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";

// import CSS
import "../css/index.css";

// import IndexedDB functions -- postDb initially found in database moved to index
import { initdb, getDb } from "./database";

// import bootstrap after npm install bootstrap && @popperjs/core
// import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// import fetch cards
import { fetchCards } from "./card";
// import form
import { toggleForm, clearForm } from "./form";

// on load functions
window.addEventListener("load", function () {
  initdb();
  fetchCards();
  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
});

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
