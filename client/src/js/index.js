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
import { initdb, getDb, deleteDb, postDb } from "./database";

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

  // Form functionality
  const form = document.getElementById("formToggle");
  const newContactButton = document.getElementById("new-contact");
  let submitBtnToUpdate = false;
  let profileId;
  
  newContactButton.addEventListener('click', event => {
    toggleForm()
   })
  
  form.addEventListener('submit', event => {
    // Handle data
    event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;
  
    // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {
  
    fetchCards();
      // Toggles the submit button back to POST functionality
    submitBtnToUpdate = false;
  }
  
  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
  });

// delete function
window.deleteCard = (e) => {
  // grab id from button element attached to card
  let id = parseInt(e.id);
  // delete card
  deleteDb(id);
  // reload the dom
  fetchCards();
};
