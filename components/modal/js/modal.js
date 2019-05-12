function modalToggle(id) {
  const modal = document.querySelector(`#${id}`);
  const modalOverlay = document.querySelector("#modal-overlay");

  modal.classList.toggle("modal--close");
  modalOverlay.classList.toggle("modal--close");

  return false;
}
