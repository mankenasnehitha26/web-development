
function sayHello() {
  alert("Thanks for stopping by! Let's create memories together 📸");
}


const lightbox = document.getElementById("lightbox");
const lbImg    = document.getElementById("lightbox-img");

function openLightbox(img) {
  lbImg.src = img.src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  lightbox.style.display = "none";
}
