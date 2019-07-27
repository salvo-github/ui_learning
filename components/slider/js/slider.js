/**
 * Example
 *
 * ```html
 * <simple-slider class="pdp__card--slider" data-watermark='Demo Shop'>
 * <img src="../../../media/products/1.jpg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duisscelerisque</img>
 * <img src="../../../media/products/2.jpg">eros ac vehicula tristique. Nam consecteturligula sed neque volutpat,</img>
 * <img src="../../../media/products/3.jpg">nec molestie nunc malesuada. Duis tortor nisi, efficitur utmolestie.</img>
 * </simple-slider>
 * ```
 */
customElements.define(
  'simple-slider',
  class extends HTMLElement {
    // the index of the current image to load
    index;
    // the links and the captions for every image tag added inside the custom tag slimple-slider
    links;
    // element in the shadow dom where the current image will be loaded
    imgElement;

    constructor() {
      super();

      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = this.getTemplate();
    }

    init() {
      this.imgElement = this.shadowRoot.querySelector(
        'img.simple-slider__image'
      );

      this.initLinks();

      if (this.links.length) {
        this.initIndex();
      }

      this.initWatermark();
    }

    connectedCallback() {
      this.init();

      this.shadowRoot
        .querySelectorAll('.simple-slider__control span')
        .forEach((element) => {
          element.addEventListener('click', (event) => {
            /**
             * used to change the index fo the image to show and set the initial position for the
             * sliding caption
             */
            if (
              event.target.parentElement.classList.contains(
                'simple-slider__control--prev'
              )
            ) {
              this.switchIndexByOffset(-1);
              this.setCaptionStartingPosition('left');
            } else {
              this.setCaptionStartingPosition('right');
              this.switchIndexByOffset(1);
            }

            this.resetImgEffect('simple-slider__image--fade');
            this.reloadImagebyCurrentIndex();
            this.renderCaptionByCurrentIndex();
          });
        });
    }

    initLinks() {
      this.links = [];

      this.querySelectorAll('img').forEach((element) => {
        const img = {
          src: element.src,
          caption: element.nextSibling.data
        };

        this.links.push(img);
      });
    }

    initIndex() {
      //current index
      this.index = 0;
      this.reloadImagebyCurrentIndex();
      this.renderCaptionByCurrentIndex();
    }

    initWatermark() {
      if (this.dataset.watermark) {
        this.shadowRoot.querySelector(
          '.simple-slider__watermark'
        ).textContent = this.dataset.watermark;
      }
    }

    setCaptionStartingPosition(position) {
      const captionElement = this.shadowRoot.querySelector(
        '.simple-slider__caption'
      );

      /**
       * The caption must be moved outside the image before the animation start
       *
       * If the initial position of the caption it's for example LEFT, the rigth side of the caption box
       * will be positioned before the right side of the image (caption elment and image element have the same width)
       */
      let captionStartingCoord;
      if (position === 'left') {
        captionStartingCoord = 0 - captionElement.offsetWidth + 'px';
      } else {
        captionStartingCoord = '100%';
      }

      captionElement.style.cssText = '';

      captionElement.style.left = captionStartingCoord;
      captionElement.style.transform = 'translate(0)';
    }

    renderCaptionByCurrentIndex() {
      const captionElement = this.shadowRoot.querySelector(
        '.simple-slider__caption'
      );

      captionElement.textContent = this.links[this.index].caption;

      // reset animation
      //https://css-tricks.com/restart-css-animation/
      void captionElement.offsetWidth;

      captionElement.style.transition = `all 1s`;

      captionElement.style.left = '';
      captionElement.style.transform = '';
    }

    resetImgEffect(effectClass = '') {
      this.imgElement.classList.remove(effectClass);

      // reset animation
      //https://css-tricks.com/restart-css-animation/
      void this.imgElement.offsetWidth;

      this.imgElement.classList.add(effectClass);
    }

    switchIndexByOffset(offset) {
      // jsbug https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.html
      this.index =
        (this.index + this.links.length + offset) % this.links.length;
    }

    reloadImagebyCurrentIndex() {
      const src = this.links[this.index].src;
      this.imgElement.src = src;
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
      <div class="simple-slider__image simple-slider__watermark"></div>
      <img class="simple-slider__image" src="">
      <div class="simple-slider__image simple-slider__caption"></div>
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
          /* top: 50%;
          left: 50%;
          transform: translate(-50%, -50%); */
          position: absolute;
          display: inline-block;
          object-fit: contain;
          /* max-height: 100%; */
          max-width: 100%;
          z-index: 1;
        }

        .simple-slider__watermark {
          font-weight: bold;
          white-space: nowrap;
          font-size: 2em;
          z-index: 2;
          opacity: 0.3;
          color: white;
          top: 5%;
          right: 5%;
        }

        .simple-slider__caption {
          width: 80%;
          font-size: 0.86em;
          z-index: 2;
          opacity: 1;
          color: white;
          bottom: 20%;
          left: 50%;
          transform: translate(-50%);
        }

        .simple-slider__control {
          position: absolute;
          height: 100%;
          width: 10%;
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
  }
);
