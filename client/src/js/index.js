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
import { initdb, deleteDb, postDb, editDb } from "./database";

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

newContactButton.addEventListener("click", (event) => {
  toggleForm();
});

form.addEventListener("submit", (event) => {
  // handle the form data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {
    // Obtains values passed into the form element
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let profile = document.querySelector('input[type="radio"]:checked').value;

    // Calls the editDB function passing in any values from the form element as well as the ID of the contact that we are updating
    editDb(profileId, name, email, phone, profile);

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

window.editCard = (e) => {
  // grab id from button element and sets a global variable
  profileId = parseInt(e.dataset.id);

  // grab infor to pre-populate edit form
  let editName = e.dataset.name;
  let editEmail = e.dataset.email;
  let editPhone = e.dataset.phone;

  // grabs new value
  document.getElementById("name").value = editName;
  document.getElementById("email").value = editEmail;
  document.getElementById("phone").value = editPhone;

  form.style.display = "block";

  // Toggles the Submit button so that it now Updates an existing contact instead of posting a new one
  submitBtnToUpdate = true;
};

if ("serviceWorker" in navigator) {
  // use window load event to keep page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}

const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installBtn.style.visibility = "visible";
  installBtn.addEventListener("click", () => {
    console.log("Install clicked!");
    event.prompt();
    installBtn.setAttribute("disabled", true);
    installBtn.textContent = "Installed!";
  });
});

window.addEventListener("appinstalled", (event) => {
  console.log("👍", "appinstalled", event);
});

const shareData = {
    title: "Erickson Contact Cards",
    text: "Contact Card App",
    url: "https://pacific-woodland-23884.herokuapp.com/"
}

const shareBtn = document.getElementById("shareBtn");

shareBtn.addEventListener('click', async () => {
    try {
        await navigator.share(shareData);
        window.alert("App Shared!")
    } catch (err) {
        window.alert("Something went wrong!")
    }
});