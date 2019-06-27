document.querySelector('.review__add a').addEventListener('click', event => {

  event.target.parentElement.style.display = 'none';
  event.target.parentElement.insertAdjacentHTML('afterend', '<span>Share your thoughts with other customers:</span>');

  cloneReviewTemplate();

  setBindForPreview();

  setSubmitAction();

  setCancelAction();

  document.querySelectorAll('.review__button-group--text-actions .button').forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();
      let reviewCommentElement = document.querySelector('.pdp__modal-textarea--review');
      let startPos = reviewCommentElement.selectionStart;
      let endPos = reviewCommentElement.selectionEnd;
      let commentText = reviewCommentElement.value;
      console.log(commentText);
      const tagOpen = `[${event.target.dataset.char}]`;
      const tagClose = `[/${event.target.dataset.char}]`;
      commentText = [commentText.slice(0, endPos), tagClose, commentText.slice(endPos)].join('');
      commentText = [commentText.slice(0, startPos), tagOpen, commentText.slice(startPos)].join('');
      console.log(commentText);
      reviewCommentElement.value = commentText;
      console.log(startPos + ", " + endPos);
      bindPreviewElements(reviewCommentElement);
      // moveCursorToEnd(reviewCommentElement);
      // reviewCommentElement.selectionStart = reviewCommentElement.selectionEnd = reviewCommentElement.value.length;
      return;
    });
  });

  document.querySelectorAll('.review__rating .vote').forEach(element => {

    // element.addEventListener('mouseover', event => {
    //   for (let elementSibling = event.target.previousElementSibling; elementSibling; elementSibling = elementSibling.previousElementSibling) {
    //     elementSibling.classList.remove('vote--empty');
    //     elementSibling.classList.add('vote--full');
    //   }
    //   event.target.classList.remove('vote--empty');
    //   event.target.classList.add('vote--full');
    // });

    // element.addEventListener('mouseleave', event => {
    //   for (const voteElement of event.target.parentElement.children) {
    //     voteElement.classList.remove('vote--full');
    //     voteElement.classList.add('vote--empty');
    //   }
    // });

    element.addEventListener('click', event => {
      for (let elementSibling = event.target.nextElementSibling; elementSibling; elementSibling = elementSibling.nextElementSibling) {
        elementSibling.classList.remove('vote--full');
        elementSibling.classList.add('vote--empty');
      }
      for (let elementSibling = event.target.previousElementSibling; elementSibling; elementSibling = elementSibling.previousElementSibling) {
        elementSibling.classList.remove('vote--empty');
        elementSibling.classList.add('vote--full');
      }
      event.target.classList.remove('vote--empty');
      event.target.classList.add('vote--full');

      const voteUlElement = event.target.parentElement.cloneNode(true);

      const previewRatingElem = document.querySelector('.preview__rating');

      previewRatingElem.innerHTML = '';
      previewRatingElem.append(voteUlElement);

    });

  });
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
    document.querySelectorAll(`.review__preview [data-bind="${bindClass}"]`).forEach(elemPreview => {
      if (imgUrl) {
        elemPreview.src = imgUrl
      } else {
        elemPreview.innerHTML = parseTextForPreview(element.value);
      }

      if (bindClass == 'review') {
        elemPreview.classList.remove('h--italic');
        elemPreview.classList.remove('review__preview-yourreview--default');
        elemPreview.classList.add('review__preview-yourreview--notdefault');
      }

    })
  }
}

function removeBindingFromChildren(parent) {
  parent.querySelectorAll('[data-bind]').forEach(element => {
    element.removeAttribute('data-bind');
  })
}

function parseTextForPreview(text) {
  const charsReference = getAllCharsReference();
  charsReference.forEach((parse, char) => {

    const tagOpen = `[${char}]`;
    const tagClose = `[/${char}]`;

    let pos = 0;
    while (true) {
      if ((pos = text.indexOf(tagClose)) != -1) {
        const head = text.slice(0, pos)
        const tail = text.slice(pos + 4);
        text = `${head}</span>${tail}`;
      } else if ((pos = text.indexOf(tagOpen)) != -1) {
        const head = text.slice(0, pos)
        const tail = text.slice(pos + 3);
        text = `${head}${parse}${tail}`;
      } else {
        break;
      }
    }
  });
  return text;
}

function getAllCharsReference() {
  let chars = new Map();
  document.querySelectorAll('[data-char]').forEach(element => {
    chars.set(element.dataset.char, element.dataset.parse);
  })
  return chars;
}
