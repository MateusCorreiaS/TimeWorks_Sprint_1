const button = document.querySelector("button");
const modal = document.querySelector("dialog");

button.onclick = function () {
  modal.showModal();
}

const buttonClose = modal.querySelector("button");
buttonClose.onclick = function () {
  modal.close();
}