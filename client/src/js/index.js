// Central webpack file for js --- Creates and entry point for webpack
// import other js files
import "./form";
import "./submit";
// import images
import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";
// import CSS
import "../css/index.css";
// import bootstrap after npm install bootstrap && @popperjs/core
// import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// DOM manipulation to insert images page
window.addEventListener("load", function () {
  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
});
