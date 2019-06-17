class LiveTimer extends TimeFormatted {

  connectedCallback() {
    const tickEvent = new CustomEvent("tick", {
      detail: Date.now();
    });
    setInterval(() => {
      this.dispatchEvent(tickEvent);
    }, 1000);
    this.dispatchEvent(tickEvent);
  }

}

customElements.define("live-timer", LiveTimer, { extends: "time-formatted" });
