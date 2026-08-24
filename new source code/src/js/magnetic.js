"use strict";
class GSAPMagnetic {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      strength: parseFloat(element.dataset.strength) || options.strength,
      ease: options.ease,
    };
    this.bounds = null;
    this.init();
  }

  init() {
    this.element.addEventListener("mouseenter", (e) => {
      this.bounds = this.element.getBoundingClientRect();
      gsap.to(this.element, {
        ease: this.options.ease,
      });
    });

    this.element.addEventListener("mousemove", (e) => this.handleMove(e));

    this.element.addEventListener("mouseleave", () => this.handleLeave());
  }

  handleMove(e) {
    if (!this.bounds) return;

    const centerX = this.bounds.left + this.bounds.width / 2;
    const centerY = this.bounds.top + this.bounds.height / 2;

    const deltaX = (e.clientX - centerX) * this.options.strength;
    const deltaY = (e.clientY - centerY) * this.options.strength;

    gsap.to(this.element, {
      x: deltaX,
      y: deltaY,
      ease: this.options.ease,
      overwrite: "auto",
    });
  }

  handleLeave() {
    gsap.to(this.element, {
      x: 0,
      y: 0,
      ease: this.options.ease,
      overwrite: "auto",
    });
    this.bounds = null;
  }

  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
  }
}

// Initialize all magnetic elements
const magneticElements = [];
const globalOptions = {
  strength: 0.2,
  duration: 0.5,
  ease: "",
};

function runMangetic() {
  if (window.innerWidth > 1023) {
    setTimeout(() => {
      document.querySelectorAll(".magnetic").forEach((element) => {
        const magnetic = new GSAPMagnetic(element, globalOptions);
        magneticElements.push(magnetic);
      });
    }, 500);
  }
}

runMangetic();
