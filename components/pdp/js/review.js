document.querySelector('.review__add a').addEventListener('click', event => {

  event.target.parentElement.style.display = 'none';
  event.target.parentElement.insertAdjacentHTML('afterend', '<span>Share your thoughts with other customers:</span>');

  cloneReviewTemplate();

  setBindForPreview();

  setSubmitAction();

  setCancelAction();

});

function setCancelAction() {
  document.querySelector('.review__cta--cancel').addEventListener('click', event => {

    document.querySelector('.review__placeholder').innerHTML = '';
    document.querySelector('.review__add span:nth-child(2)').style.display = '';
    document.querySelector('.review__add span:nth-child(2)').nextElementSibling.remove();
  });
}

function setSubmitAction() {
  document.querySelector('.review__cta--submit').addEventListener('click', event => {

    event.preventDefault();

    const placeholderElement = document.querySelector('.review__placeholder');
    const previewElement = placeholderElement.firstElementChild;

    removeBindingFromChildren(previewElement);

    document.querySelector('.review__list').append(previewElement.cloneNode(true));

    placeholderElement.innerHTML = '';

    document.querySelector('.review__add span:nth-child(2)').style.display = '';
    document.querySelector('.review__add span:nth-child(2)').nextElementSibling.remove();
  });
}

function cloneReviewTemplate() {
  const reviewTemplate = document.querySelector('#review__template');
  document.querySelector('.review__placeholder').append(reviewTemplate.content.cloneNode(true));

  const dateElement = document.querySelector('.review__preview-today');

  setDate(dateElement);
}

function setDate(element) {

  const today = new Date();

  const year = today.getFullYear();
  const month = getMonthNameByIndex(today.getMonth());
  const date = today.getDate();

  element.textContent = `${month} ${date}, ${year}`;

}

function getMonthNameByIndex(index) {
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  return monthNames[index];
}

function setBindForPreview() {
  document.querySelector('.review__form').addEventListener('keyup', event => {
    bindPreviewElements(event.target);
  });

  document.querySelector('.review__form').addEventListener('keydown', event => {
    bindPreviewElements(event.target);
  });

  document.querySelector('.review__form').addEventListener('change', event => {
    bindPreviewElements(event.target);
  });
}

function bindPreviewElements(element) {

  let imgUrl;
  if (element.files && element.files[0]) {
    imgUrl = URL.createObjectURL(element.files[0]);
    event.target.nextElementSibling.firstElementChild.textContent = 'Image Selected';
    event.target.nextElementSibling.lastElementChild.src = imgUrl;
    event.target.nextElementSibling.lastElementChild.style.opacity = 1;
  }

  const bindClass = element.dataset.bind || undefined;

  if (bindClass) {
    document.querySelectorAll(`[data-bind="${bindClass}"]`).forEach(elem => {
      if (imgUrl) {
        elem.src = imgUrl
      }
      else elem.textContent = element.value;
    })
  }
}

function removeBindingFromChildren(parent) {
  parent.querySelectorAll('[data-bind]').forEach(element => {
    element.removeAttribute('data-bind');
  })
}
