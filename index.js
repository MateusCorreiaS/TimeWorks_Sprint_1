document.addEventListener('DOMContentLoaded', function() {
  const openModalBtn = document.querySelector(".openmodal");
  const modal = document.querySelector("dialog");
  const closeModalBtn = document.querySelector(".buttonclose");

  // Abre o popup
  openModalBtn.addEventListener('click', () => {
      modal.showModal();
  });

  // Fecha o popup
  closeModalBtn.addEventListener('click', () => {
      modal.close();
  });
});


