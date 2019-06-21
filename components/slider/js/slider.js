class SimpleSlider extends HTMLElement {

  constructor() {
    super();
    this.links = [];
    this.index;
  }

  init() {

    const shadow = this.attachShadow({ mode: 'open' });

    var shadowContent = ((document.querySelector('link[rel="import"]')) && document.querySelector('link[rel="import"]').import) || document;

    shadow.append(shadowContent.getElementById('simple-slider__template').content.cloneNode(true));

    this.imgElement = shadow.querySelector('.simple-slider__image');

    this.getLinks();

    if (this.links.length) {
      this.index = 0;
      this.render(this.index);
    }
  }

  connectedCallback() {

    this.init();

    this.shadowRoot.querySelectorAll('.simple-slider__control span').forEach(element => {
      element.addEventListener('click', event => {
        const imgWidth = this.imgElement.getBoundingClientRect().width;


        let watermarkStartingCoord;
        if (event.target.parentElement.classList.contains('simple-slider__control--prev')) {
          watermarkStartingCoord = -150 - imgWidth;
          this.switch(-1);
        } else {
          watermarkStartingCoord = +imgWidth + 150;
          this.switch(1);
        }

        this.shadowRoot.querySelector('.simple-slider__watermark').style.cssText = '';

        this.shadowRoot.querySelector('.simple-slider__watermark').style.left = watermarkStartingCoord;
        // this.shadowRoot.querySelector('.simple-slider__watermark').style.transform = `translateY(-50%)`;

        void this.shadowRoot.querySelector('.simple-slider__watermark').offsetWidth;

        this.shadowRoot.querySelector('.simple-slider__watermark').style.transition = `all 1s`;

        this.shadowRoot.querySelector('.simple-slider__watermark').style.left = '';
        this.shadowRoot.querySelector('.simple-slider__watermark').style.transform = `translate(-50%, -50%) rotate(30deg)`;
        this.shadowRoot.querySelector('.simple-slider__watermark').style.opacity = `0.5`;



        // this.shadowRoot.querySelector('.simple-slider__watermark').classList.add('simple-slider__watermark--slide');

        this.resetImgEffect('simple-slider__image--fade');
        this.render(this.index);
      });
    });
  }

  resetImgEffect(effectClass = '') {
    this.imgElement.classList.remove(effectClass);
    //https://css-tricks.com/restart-css-animation/
    void this.imgElement.offsetWidth;
    this.imgElement.classList.add(effectClass);
  }

  startAutoplay() {
    this.autoplay = setInterval(() => {
      this.switch(1);
      this.render(this.index);
    }, 2000);
  }

  switch(amount) {
    // jsbug https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
    return this.index = ((this.index + this.links.length + amount) % this.links.length);
  }

  render(index) {
    this.imgElement.src = this.links[index];
  }

  getLinks() {
    this.querySelectorAll('img').forEach(element => {
      this.links.push(element.src);
    });
  }
}

customElements.define("simple-slider", SimpleSlider);
