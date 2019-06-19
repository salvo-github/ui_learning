class SimpleSlider extends HTMLElement {

  constructor() {
    super();
    this.links = [];
    this.index;
  }

  init() {

    const shadow = this.attachShadow({ mode: 'open' });

    var content = ((document.querySelector('link[rel="import"]')) && document.querySelector('link[rel="import"]').import) || document;

    shadow.append(content.getElementById('simple-slider__template').content.cloneNode(true));

    this.imgElement = shadow.querySelector('.simple-slider__image');
  }

  connectedCallback() {

    this.init();

    this.shadowRoot.querySelectorAll('.simple-slider__control').forEach(element => {
      element.addEventListener('click', event => {
        if (event.target.classList.contains('simple-slider__control--prev')) {
          this.switch(-1);
        } else {
          this.switch(1);
        }

        this.resetAnimation();
        this.render(this.index);
      });
    });



    if (this.style) {
      this.imgElement.style.cssText = this.style.cssText;
    }

    this.getLinks();

    if (this.links.length) {
      this.index = 0;
      this.render(this.index);
      // this.startAutoplay();
    }
  }

  resetAnimation() {
    this.imgElement.classList.remove('elementToFadeInAndOut');
    //https://css-tricks.com/restart-css-animation/
    void this.imgElement.offsetWidth;
    this.imgElement.classList.add('elementToFadeInAndOut');
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
