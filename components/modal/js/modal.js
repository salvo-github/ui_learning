function toggleDisplay(id) {
  const modal = document.querySelector(`#${id}`);
  const modalOverlay = document.querySelector("#modal-overlay");

  modal.classList.toggle("element--close");
  modalOverlay.classList.toggle("element--close");

  return false;
}
