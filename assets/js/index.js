document.addEventListener('DOMContentLoaded', function () {
  const openModalBtn = document.querySelector(".openmodal");
  const modal = document.querySelector("dialog");
  const closeModalBtn = document.querySelector(".buttonclose");
 const usernameDisplay = document.querySelector('.username');
  // Abre o popup
  openModalBtn.addEventListener('click', () => {
    modal.showModal();
  });

  // Fecha o popup
  closeModalBtn.addEventListener('click', () => {
    modal.close();
  });
});


