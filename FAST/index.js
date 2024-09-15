const hide_menu = document.querySelector(".hide_menu");
const menu_header = document.querySelector(".menu ul");

$(document).on("ready", function () {
  $(".lazy").slick({
    lazyLoad: "ondemand", // ondemand progressive anticipated
    infinite: true,
    arrows: false,
    dots: true,
  });
});

// ..

const images = document.querySelectorAll(".wrapper .image img.show_img");
const preview_btn = document.querySelectorAll(
  ".wrapper .image img.preview_btn"
);
const gallery = document.querySelector(".gallery");
const galleryImg = document.querySelector(".gallery-inner img");
const close = document.querySelector(".gallery .close");

const next = document.querySelector(".control.next");
const prev = document.querySelector(".control.prev");

let currentIndex = 0;

preview_btn.forEach((img, index) => {
  img.addEventListener("click", () => {
    console.log(index);
    currentIndex = index;
    showGallery();
  });
});

function showGallery() {
  currentIndex == images.length - 1
    ? next.classList.add("hide")
    : next.classList.remove("hide");
  console.log(images);

  currentIndex == 0
    ? prev.classList.add("hide")
    : prev.classList.remove("hide");

  gallery.classList.add("show");
  galleryImg.src = images[currentIndex].src;
}

close.addEventListener("click", () => {
  gallery.classList.remove("show");
});

next.addEventListener("click", () => {
  currentIndex != images.length - 1 ? currentIndex++ : undefined;
  showGallery();
});
prev.addEventListener("click", () => {
  currentIndex != 0 ? currentIndex-- : undefined;
  showGallery();
});

// esc click
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 27) gallery.classList.remove("show");
});

hide_menu.onclick = () => {
  if (hide_menu.val === true) {
    menu_header.setAttribute("style", "visibility:hiden");
    console.log("an");
  } else {
    menu_header.setAttribute("style", "visibility:visible");
    console.log("hien");
  }
  hide_menu.val = !hide_menu.val;
  console.log(hide_menu.val);
};
