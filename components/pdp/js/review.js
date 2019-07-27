document.querySelector('.review__add a').addEventListener('click', (event) => {
  event.target.parentElement.style.display = 'none';
  event.target.parentElement.insertAdjacentHTML(
    'afterend',
    '<span>Share your thoughts with other customers:</span>'
  );

  cloneReviewTemplate();

  setBindForPreview();

  setSubmitAction();

  setCancelAction();
});

function setCancelAction() {
  document
    .querySelector('.review__cta--cancel')
    .addEventListener('click', (event) => {
      document.querySelector('.review__placeholder').innerHTML = '';
      document.querySelector('.review__add span:nth-child(2)').style.display =
        '';
      document
        .querySelector('.review__add span:nth-child(2)')
        .nextElementSibling.remove();
    });
}

function setSubmitAction() {
  document
    .querySelector('.review__cta--submit')
    .addEventListener('click', (event) => {
      event.preventDefault();

      const placeholderElement = document.querySelector('.review__placeholder');
      const previewElement = placeholderElement.firstElementChild;

      removeBindingFromChildren(previewElement);

      document
        .querySelector('.review__list')
        .append(previewElement.cloneNode(true));

      placeholderElement.innerHTML = '';

      document.querySelector('.review__add span:nth-child(2)').style.display =
        '';
      document
        .querySelector('.review__add span:nth-child(2)')
        .nextElementSibling.remove();
    });
}

function cloneReviewTemplate() {
  const reviewTemplate = document.querySelector('#review__template');
  /**
   *The template will be cloned in the position marked by ".review__placeholder"
   */
  const reviewPreviewForm = reviewTemplate.content.cloneNode(true);

  document.querySelector('.review__placeholder').append(reviewPreviewForm);

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
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return monthNames[index];
}

function setBindForPreview() {
  setBindForInputFields();

  setBindForRating();

  setBindForCommentStyleModifiers();
}

function setBindForInputFields() {
  document.querySelector('.review__form').addEventListener('input', (event) => {
    bindPreviewElements(event.target);
  });
}

function setBindForRating() {
  document.querySelectorAll('.review__rating .vote').forEach((element) => {
    element.addEventListener('click', (event) => {
      for (
        let elementSibling = event.target.nextElementSibling;
        elementSibling;
        elementSibling = elementSibling.nextElementSibling
      ) {
        voteRemove(elementSibling);
      }
      for (
        let elementSibling = event.target.previousElementSibling;
        elementSibling;
        elementSibling = elementSibling.previousElementSibling
      ) {
        voteAdd(elementSibling);
      }
      voteAdd(event.target);

      const voteUlElement = event.target.parentElement.cloneNode(true);
      const previewRatingElem = document.querySelector('.preview__rating');
      previewRatingElem.innerHTML = '';
      previewRatingElem.append(voteUlElement);
    });
  });
}

function voteAdd(voteElement) {
  voteElement.classList.remove('vote--empty');
  voteElement.classList.add('vote--full');
}

function voteRemove(voteElement) {
  voteElement.classList.remove('vote--full');
  voteElement.classList.add('vote--empty');
}

function setBindForCommentStyleModifiers() {
  document
    .querySelectorAll('.review__button-group--text-actions .button')
    .forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();

        let reviewCommentElement = document.querySelector(
          '.pdp__modal-textarea--review'
        );

        let startPositionSelectedText = reviewCommentElement.selectionStart;
        let endPositionSelectedTest = reviewCommentElement.selectionEnd;

        let commentText = reviewCommentElement.value;

        const tagOpen = `[${event.target.dataset.char}]`;
        const tagClose = `[/${event.target.dataset.char}]`;

        /**
         * The follow logic will split the text based on the current position of the selection (start and end)
         * When a button for applying a style it's clicked the selected text will be surrounded by two tag (tagOpen and tagClose)
         * The identifier for the style to apply it's retrieved by the data-char attribute on the element clicked
         */
        commentText = [
          commentText.slice(0, endPositionSelectedTest),
          tagClose,
          commentText.slice(endPositionSelectedTest)
        ].join('');

        commentText = [
          commentText.slice(0, startPositionSelectedText),
          tagOpen,
          commentText.slice(startPositionSelectedText)
        ].join('');

        reviewCommentElement.value = commentText;

        bindPreviewElements(reviewCommentElement);
      });
    });
}

function bindPreviewElements(element) {
  let imgUrl;
  if (element.files && element.files[0]) {
    imgUrl = URL.createObjectURL(element.files[0]);
    event.target.nextElementSibling.firstElementChild.textContent =
      'Image Selected';
    event.target.nextElementSibling.lastElementChild.src = imgUrl;
    event.target.nextElementSibling.lastElementChild.style.opacity = 1;
  }

  const bindIdentifier = element.dataset.bind || undefined;

  if (bindIdentifier) {
    document
      .querySelectorAll(`.review__preview [data-bind="${bindIdentifier}"]`)
      .forEach((elemPreview) => {
        if (imgUrl) {
          elemPreview.src = imgUrl;
        } else {
          elemPreview.innerHTML = parseTextForPreview(element.value);
        }

        if (bindIdentifier === 'review') {
          elemPreview.classList.remove('font__style--italic');
          elemPreview.classList.remove(
            'review__preview-yourreview--default-text'
          );
          elemPreview.classList.add('review__preview-yourreview--input-text');
        }
      });
  }
}

function removeBindingFromChildren(parent) {
  parent.querySelectorAll('[data-bind]').forEach((element) => {
    element.removeAttribute('data-bind');
  });
}

function parseTextForPreview(text) {
  const charsReference = getAllCharsReference();
  charsReference.forEach((classList, char) => {
    const tagOpen = `[${char}]`;
    const tagClose = `[/${char}]`;

    /**
     * The follow values are used to take remove the tag (eg. [b] or [/i]), visible
     * in the textinput, from the preview.
     *
     * All the text inside the input will be checked and if a tag it's found it will be removed and
     * replaced with a span (eg. <span class"...">TEXT</span>). The class list it's retrieved from the tag in the
     * data attribute: data-class-list-parse (list of classes)
     */
    const tagOpenLegth = tagOpen.length;
    const tagCloseLegth = tagClose.length;

    while (true) {
      if (text.indexOf(tagOpen) !== -1) {
        const pos = text.indexOf(tagOpen);
        const textBeforeTag = text.slice(0, pos);
        const textAfterTag = text.slice(pos + tagOpenLegth);
        text = `${textBeforeTag}<span class="${classList}">${textAfterTag}`;
      } else if (text.indexOf(tagClose) !== -1) {
        const pos = text.indexOf(tagClose);
        const textBeforeTag = text.slice(0, pos);
        const textAfterTag = text.slice(pos + tagCloseLegth);
        text = `${textBeforeTag}</span>${textAfterTag}`;
      } else {
        break;
      }
    }
  });
  return text;
}

function getAllCharsReference() {
  let chars = new Map();
  document.querySelectorAll('[data-char]').forEach((element) => {
    chars.set(element.dataset.char, element.dataset.classListParse);
  });
  return chars;
}
