const wrap = document.querySelector(".wrap");
const images = ["10", "11", "12"];

const randomImage = images[Math.floor(Math.random() * images.length)];

const image = document.createElement("img");
image.classList.add("bg");
image.src = `https://picsum.photos/id/${randomImage}/1024`;

wrap.prepend(image);
