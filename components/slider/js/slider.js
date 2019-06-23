customElements.define("simple-slider", class extends HTMLElement {

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.getTemplate();

    this.links = [];
    this.index;
  }

  init() {

    this.imgElement = this.shadowRoot.querySelector('.simple-slider__image');

    this.initLinks();

    if (this.links.length) {
      this.index = 0;
      this.reloadImagebyCurrentIndex();
    }

    this.initWatermark();
  }

  connectedCallback() {

    this.init();

    this.shadowRoot.querySelectorAll('.simple-slider__control span').forEach(element => {
      element.addEventListener('click', event => {

        if (event.target.parentElement.classList.contains('simple-slider__control--prev')) {
          this.switchIndexByOffset(-1);
          this.setWatermarkStartingPosition('left');
        } else {
          this.setWatermarkStartingPosition('right');
          this.switchIndexByOffset(1);
        }

        this.startWatermarkSlide();

        this.resetImgEffect('simple-slider__image--fade');
        this.reloadImagebyCurrentIndex();
      });
    });
  }

  initWatermark() {
    if (this.dataset.watermark) {
      this.shadowRoot.querySelector('.simple-slider__watermark').textContent = this.dataset.watermark;
    }
  }

  setWatermarkStartingPosition(position) {

    const watermarkElement = this.shadowRoot.querySelector('.simple-slider__watermark');

    let watermarkStartingCoord;
    if (position == 'left') {
      watermarkStartingCoord = (0 - watermarkElement.offsetWidth) + 'px';
    } else {
      watermarkStartingCoord = '100%';
    }

    watermarkElement.style.cssText = '';

    watermarkElement.style.left = watermarkStartingCoord;
    watermarkElement.style.transform = `translateY(-50%)`;
  }

  startWatermarkSlide() {

    const watermarkElement = this.shadowRoot.querySelector('.simple-slider__watermark');

    // reset animation
    void watermarkElement.offsetWidth;

    watermarkElement.style.transition = `all 1s`;

    watermarkElement.style.left = '';
    watermarkElement.style.transform = `translate(-50%, -50%)`;
    watermarkElement.style.opacity = 0.5;
  }

  resetImgEffect(effectClass = '') {
    this.imgElement.classList.remove(effectClass);
    //https://css-tricks.com/restart-css-animation/
    void this.imgElement.offsetWidth;
    this.imgElement.classList.add(effectClass);
  }

  startAutoplay() {
    this.autoplay = setInterval(() => {
      this.switchIndexByOffset(1);
      this.reloadImagebyCurrentIndex();
    }, 2000);
  }

  switchIndexByOffset(offset) {
    // jsbug https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.html
    return this.index = ((this.index + this.links.length + offset) % this.links.length);
  }

  reloadImagebyCurrentIndex() {
    this.imgElement.src = this.links[this.index].src;
  }

  initLinks() {
    this.querySelectorAll('img').forEach(element => {

      const img = {
        src: element.src,
        caption: element.nextSibling.data
      };

      this.links.push(img);
    });
  }

  getTemplate() {
    return `
      ${this.getTemplateCss()}
      ${this.getTemplateHtml()}
    `;
  }

  getTemplateHtml() {
    return `
      <div class="simple-slider__control simple-slider__control--prev" prev>
        <span></span>
      </div>
      <img class="simple-slider__image" src="">
      <div class="simple-slider__image simple-slider__watermark"></div>
      <div class="simple-slider__control simple-slider__control--next">
        <span></span>
      </div>
    `;
  }

  getTemplateCss() {
    return `
      <style>
        :host {
          /* prevent selection with multiple clicks */
          -webkit-user-select: none;
          -moz-user-select: none;
          -khtml-user-select: none;
          -ms-user-select: none;

          margin: auto;
          display: block;
          position: relative;
          /* max-height: 100%; */
          max-width: 100%;

          z-index: 0;
          overflow: hidden;
        }

        :host(:hover) {
          animation: scaleAnim 0.3s forwards;
        }

        @keyframes scaleAnim {
          0% {
            z-index: 1;
          }

          100% {
            z-index: 1;
            transform-origin: center;
            transform: scale(1.2);
          }
        }

        :host(:hover) .simple-slider__control {
          visibility: visible;
        }

        .simple-slider__image--fade {
          animation: fadeInOut 0.3s linear;
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        .simple-slider__image {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
          display: inline-block;
          object-fit: contain;
          /* max-height: 100%; */
          max-width: 100%;
          z-index: 1;
        }

        .simple-slider__watermark {
          white-space: nowrap;
          font-size: 2em;
          z-index: 2;
          opacity: 0.5;
          color: white;
        }

        .simple-slider__control {
          position: absolute;
          height: 100%;
          width: 2em;
          visibility: hidden;
          z-index: 2;
        }

        .simple-slider__control span {
          z-index: 3;
          content: "";
          position: absolute;
          width: 1.31em;
          height: 2.44em;
          background: url(../../../media/svg/arrow.svg) 0 0 no-repeat;
          top: 50%;
          left: 50%;
          background-size: 1.31em 2.44em;
        }

        .simple-slider__control--prev {
          top: 0;
          left: 0;
        }

        .simple-slider__control--prev span {
          transform: translate(-50%, -50%);
        }


        .simple-slider__control--next {
          top: 0;
          right: 0;
        }

        .simple-slider__control--next span {
          transform: translate(-50%, -50%) rotate(180deg);
        }
      </style>
    `;
  }
});
