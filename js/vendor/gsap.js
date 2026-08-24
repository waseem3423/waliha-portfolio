"use strict";

function runGlobalGsap() {
  const homeClassList = select("section#home").classList;
  if (homeClassList.contains("home-1")) gsapHome1();
  else if (homeClassList.contains("home-2")) gsapHome2();
  else gsapHome3();

  // fill-text
  gsapFillText({ itemClass: ".fill-text" });
  gsapFillText({ itemClass: ".client-fill-text" });
  // zoom-out-image
  gsapZoomOutImage({ itemClass: ".zoom-out-image" });
  // arrow-down
  gsapArrowDown({ itemClass: ".arrow img" });
  gsapArrowDown({ itemClass: ".client-arrow img" });
  // separators
  selectAll(".separator").forEach((a) =>
    gsap.to(a, {
      ease: "power1.inOut",
      scaleX: 1,
      scrollTrigger: {
        trigger: a,
        scrub: 3,
        end: "bottom center",
      },
    })
  );
  // portfolio overflow
  const container = select(".portfolio-overview-container");
  gsap.to(".col-slide-down-md", {
    y: 192,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      scrub: 1,
    },
  });
  gsap.to(".col-slide-down", {
    y: 32,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      scrub: 1,
    },
  });
  // ------ global GSAP code ------ //
}

function gsapStackedCards({ containerClass, scale }) {
  // stacked-card
  selectAll(`${containerClass} .stacked-card`)
    .slice(0, -1)
    .forEach((card) => {
      gsap.to(card, {
        scale,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 64px",
          scrub: 0.3,
        },
      });
    });
}

function gsapProjectSideCards() {
  // side-cards
  const sideCards = selectAll(".side-card");
  const titles = selectAll(".title");
  const tools = selectAll(".tools");

  sideCards.forEach((item, i) => {
    const isEven = i % 2 === 0;
    return gsap.fromTo(
      item,
      {
        rotate: isEven ? -15 : 15,
        x: isEven ? -150 : 150,
        y: 150,
      },
      {
        rotate: 0,
        x: 0,
        y: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: item,
          scrub: 2,
          end: "bottom bottom",
        },
      }
    );
  });

  titles.forEach((item) =>
    gsap.fromTo(
      item,
      {
        y: 50,
      },
      {
        y: 0,
        rotate: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: item,
          scrub: 2,
          end: "top center",
        },
      }
    )
  );

  tools.forEach((item) => {
    gsap.fromTo(
      item,
      {
        y: 50,
        scale: 0.75,
        opacity: 0.5,
      },
      {
        scale: 1,
        y: 0,
        rotate: 0,
        opacity: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: item,
          scrub: 4,
          end: "top center",
        },
      }
    );
  });
}

function gsapProjectCards() {
  const projectCards = selectAll(".project-card");

  projectCards.forEach((item, i) => {
    const isEven = Math.trunc(i / 3) % 2 === 0;

    return gsap.fromTo(
      item,
      {
        x: isEven ? (i % 3) * -125 : (2 - (i % 3)) * 125,
        y: isEven ? (i % 3) * -50 : (2 - (i % 3)) * -50,
        rotate: isEven ? (2 - (i % 3)) * -4 : (i % 3) * 4,
      },
      {
        ease: "power1.inOut",
        x: 0,
        y: 0,
        rotate: 0,
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "center center",
          scrub: 1.5,
        },
      }
    );
  });
}

function scrollStaggerAnimation({
  selector,
  containerSelector,
  start = "top 85%",
  fromVars = { opacity: 0, y: 100 },
  toVars = { opacity: 1, y: 0 },
  stagger = 0.1,
  duration = 0.8,
  ease = "power2.out",
}) {
  const elements = document.querySelectorAll(selector);
  const container = document.querySelector(containerSelector);
  if (!elements || !container) return;
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(elements, fromVars, {
    ...toVars,
    duration,
    stagger,
    ease,
  });
  ScrollTrigger.create({
    trigger: container,
    start,
    onEnter: () => tl.play(),
    onLeaveBack: () => tl.reverse(),
  });
}

function gsapFillText({ itemClass }) {
  // fill text
  selectAll(itemClass).forEach((txt) => {
    gsap.to(txt, {
      ease: "power1.inOut",
      backgroundSize: "100% 100%",
      scrollTrigger: {
        trigger: txt,
        end: "bottom center",
        scrub: 1,
      },
    });
  });
}

function gsapZoomOutImage({ itemClass }) {
  // zoom out images
  selectAll(itemClass).forEach((img) => {
    gsap.to(img, {
      scale: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: img,
        scrub: 1,
      },
    });
  });
}

function gsapArrowDown({ itemClass }) {
  selectAll(itemClass).forEach((a) =>
    gsap.to(a, {
      ease: "power1.inOut",
      rotate: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: a,
        end: "bottom center",
        scrub: 1,
      },
    })
  );
}

function gsapHome1() {
  // ------ home-1 ------ //
  const heroText = select(".hero-text");
  const heroImage = select(".hero-image");
  gsap.to(heroText, {
    ease: "none",
    y: -100,
    scrollTrigger: {
      trigger: heroText,
      start: "top 128px",
      scrub: true,
    },
  });
  gsap.to(heroImage, {
    ease: "power1.inOut",
    scale: 1.25,
    scrollTrigger: {
      trigger: heroImage,
      start: "top 75%",
      scrub: 1,
    },
  });
  // ------ home-1 ------ //
}

function gsapHome2() {
  // ------ home-2 ------ //
  const sectionContainer = select(".section-container");
  gsap.to(sectionContainer, {
    ease: "none",
    y: 500,
    scrollTrigger: {
      trigger: sectionContainer,
      start: "top top",
      scrub: true,
    },
  });
  // ------ home-2 ------ //
}

function gsapHome3() {
  // ------ home-3 ------ //
  const shrinkText = select(".shrink-text");
  gsap.to(shrinkText, {
    ease: "power1.inOut",
    scaleY: 1,
    scrollTrigger: {
      trigger: shrinkText,
      start: "top 64px",
      end: "bottom top",
      scrub: 1,
    },
  });
  // ------ home-3 ------ //
}

function footer1Gsap() {
  const div1 = select(".div-1");
  const image = select(".footer-image");
  const div2 = select(".div-2");
  const footer = select("footer");

  gsap.fromTo(
    image,
    { y: 300 },
    {
      y: "-75%",
      ease: "none",
      scrollTrigger: {
        trigger: div1,
        start: "top bottom",
        end: "bottom 25%",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    footer,
    { y: 300 },
    {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: div2,
        start: "-45% bottom",
        end: "top 25%",
        scrub: true,
      },
    }
  );
}

function footer2Gsap() {
  const footer = select("footer");
  const footerPlaceholder = select(".footer-placeholder");
  gsap.fromTo(
    footer,
    { y: 300 },
    {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: footerPlaceholder,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    }
  );
}
