"use strict";
import { my_name, short_description } from "./data/home.js";
import {
  how_do_i_work,
  tool_images,
  skills,
  experience,
  achievements,
} from "./data/about.js";
import { projects } from "./data/projects.js";
import { min_message_characters, min_name_characters } from "./data/contact.js";
import {
  set_client_option,
  set_projects_option,
  set_services_option,
  set_contact_option,
  set_footer_option,
  client_option,
  projects_option,
  clientCardOptions,
  projectOptions,
  serviceOptions,
  contactOptions,
  services_option,
  contact_option,
  footer_option,
  footerOptions,
} from "./data/config.js";
import { SocialLinks } from "./components/common.js";
import { renderClients } from "./components/TestimonialsVariants.js";
import { renderProjects } from "./components/portfolioVariants.js";
import { renderServices } from "./components/servicesVariants.js";
import { renderContact } from "./components/ContactVariants.js";
import { renderFooter } from "./components/FooterVariants.js";

// ------ preloader ------ //
const preloaderContainer = select(".preloader-container");
const slideUpElements = selectAll(".slide-up");
const slideDownElements = selectAll(".slide-down");
slideUpElements.forEach((el) => el.classList.remove("slide-up"));
slideDownElements.forEach((el) => el.classList.remove("slide-down"));
window.addEventListener("load", () => {
  preloaderContainer.classList.add("opacity-0");
  setTimeout(() => {
    preloaderContainer.classList.add("hidden");
  }, 300);
  slideUpElements.forEach((el) => el.classList.add("slide-up"));
  slideDownElements.forEach((el) => el.classList.add("slide-down"));
});
// ------ preloader ------ //

// ------ navigation ------ //
function scrollTo(id, offset = 0) {
  const el = document.getElementById(id);

  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY + offset;

  lenis?.stop();

  window.scrollTo({
    top: id === "home" ? 0 : top,
    behavior: "smooth",
  });

  lenis?.start();
}

selectAll("nav.desktop button").forEach((el) => {
  el.addEventListener("click", () => scrollTo(el.id));
});

const navWrapper = select("nav.desktop div");
const homeButton = select(".home-button");
const mobileNav = select("nav.mobile");
const desktopNav = select("nav.desktop");
const mobileNavOverlay = select(".mobile-nav-overlay");
const menuIcon = select(".menu-icon");

mobileNav.querySelectorAll("div").forEach((el, i) => {
  el.style.transitionDuration = `${i * 200 + 300}ms`;
  el.addEventListener("click", () => {
    scrollTo(el.id);
    closeMobileMenu();
  });
});

let isMobileMenuOpen = false;

function openMobileMenu() {
  mobileNav.classList.replace("-translate-x-full", "translate-x-0");
  mobileNav.querySelectorAll("div").forEach((el) => {
    el.classList.add("md:translate-x-8", "translate-x-4");
  });
  mobileNavOverlay.classList.replace("-translate-x-full", "translate-x-0");
  menuIcon.querySelector("span:first-child").classList.remove("h-[1.5px]");
  menuIcon
    .querySelector("span:first-child")
    .classList.add("rotate-45", "position-center", "h-0.5");
  menuIcon
    .querySelector("span:last-child")
    .classList.add("-rotate-45", "position-center");
}

function closeMobileMenu() {
  mobileNav.classList.replace("translate-x-0", "-translate-x-full");
  mobileNav.querySelectorAll("div").forEach((el) => {
    el.classList.remove("md:translate-x-8", "translate-x-4");
  });
  mobileNavOverlay.classList.replace("translate-x-0", "-translate-x-full");
  menuIcon
    .querySelector("span:first-child")
    .classList.remove("rotate-45", "position-center", "h-0.5");
  menuIcon.querySelector("span:first-child").classList.add("h-[1.5px]");
  menuIcon
    .querySelector("span:last-child")
    .classList.remove("-rotate-45", "position-center");
}

mobileNavOverlay.addEventListener("click", () => closeMobileMenu());

menuIcon.addEventListener("click", () => {
  isMobileMenuOpen = !isMobileMenuOpen;
  if (isMobileMenuOpen) openMobileMenu();
  else closeMobileMenu();
});

homeButton.addEventListener("click", () => scrollTo("home"));

let isShowMenu = false;
let ticking = false;

const homeClassList = select("section#home").classList;
let homeVariant;
if (homeClassList.contains("home-1")) homeVariant = "home-1";
else if (homeClassList.contains("home-2")) homeVariant = "home-2";
else homeVariant = "home-3";

window.addEventListener("scroll", () => {
  if (!ticking) {
    ticking = true;
    window.requestAnimationFrame(() => {
      const shouldShow = window.scrollY > 730;
      if (shouldShow !== isShowMenu) isShowMenu = shouldShow;
      if (isShowMenu) {
        navWrapper.classList.replace("wide-wrapper", "wrapper");
        homeButton.classList.remove("translate-y-full", "opacity-0");
        homeButton.classList.add("-translate-y-4", "opacity-100");
        if (homeVariant !== "home-1")
          desktopNav.classList.replace("-translate-y-full", "translate-y-0");
      } else {
        navWrapper.classList.replace("wrapper", "wide-wrapper");
        homeButton.classList.remove("-translate-y-4", "opacity-100");
        homeButton.classList.add("translate-y-full", "opacity-0");
        if (homeVariant !== "home-1")
          desktopNav.classList.replace("translate-y-0", "-translate-y-full");
      }
      ticking = false;
    });
  }
});

// ------ navigation ------ //

// ------ theme panel ------ //
const themePanel = select(".theme-panel");
let isOpen = false;
document.addEventListener("click", (e) => {
  if (!themePanel.contains(e.target)) {
    isOpen = false;
    themePanel.dataset.open = isOpen;
  }
});
select(".variants-button").addEventListener("click", () => {
  isOpen = !isOpen;
  themePanel.dataset.open = isOpen;
});
select(".theme-button").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
select(".variants").innerHTML = [
  {
    title: "client variants",
    options: clientCardOptions,
  },
  {
    title: "project variants",
    options: projectOptions,
  },
  {
    title: "service variants",
    options: serviceOptions,
  },
  { title: "contact variants", options: contactOptions },
  { title: "footer variants", options: footerOptions },
]
  .map(
    (item) => `<div class="space-y-2">
      <h1 class="text-xl tracking-wide capitalize">${item.title}</h1>
      <select
        class="p-2 w-full border text-primary border-[var(--text-primary)]"
        name=${item.title.split(" ").join("-")}
      >
        ${item.options
          .map((o) => `<option value=${o} class="text-black!">${o}</option>`)
          .join("")}
      </select>
    </div>`
  )
  .join("");

const clientVariantsMenu = select("select[name='client-variants']");
const projectVariantsMenu = select("select[name='project-variants']");
const serviceVariantsMenu = select("select[name='service-variants']");
const contactVariantsMenu = select("select[name='contact-variants']");
const footerVariantsMenu = select("select[name='footer-variants']");

clientVariantsMenu.value = client_option;
projectVariantsMenu.value = projects_option;
serviceVariantsMenu.value = services_option;
contactVariantsMenu.value = contact_option;
footerVariantsMenu.value = footer_option;
// ------ theme panel ------ //

// ------ global ------ //
selectAll(".social-links.default").forEach(
  (el) => (el.innerHTML = SocialLinks())
);
select(".social-links.theme").innerHTML = SocialLinks({ theme: true });
// ------ global ------ //

// ------ home ------ //
// hero name
const heroName = select(".hero-name span");
const nameLength =
  heroName.textContent.length < 9 ? 9 : heroName.textContent.length;
const viewWidth = `${100 / (nameLength - (nameLength / 100) * 49.5)}vw`;
heroName.style.cssText = `font-size: ${viewWidth}; line-height: ${viewWidth}`;

// home nav buttons
selectAll(".nav-button").forEach((el) => {
  el.addEventListener("click", () => scrollTo(el.name));
});

// achievements
if (homeVariant !== "home-3") {
  select(".achievements").innerHTML = achievements
    .map(
      (item) => `
  <div
    class="group md:space-y-0 space-y-16 flex flex-col items-center justify-between"
  >
    <div class="space-y-4 text-center w-full">
      <h1 class="lg:text-8xl text-7xl font-medium font-secondary">${item.count}</h1>
      <h1 class="lg:text-4xl text-3xl">${item.title}</h1>
    </div>
  </div>
    `
    )
    .join("");
} else {
  select("textPath").innerHTML = `${achievements
    .slice(0, 3)
    .map((a) => `${a.count} ${a.title}`)
    .join(" ✺ ")} ✺ `;
}

if (homeVariant !== "home-3") {
  select(".circular-text").addEventListener("click", () => scrollTo("contact"));
}

// portfolio-overview-container
select(".portfolio-overview-container div").innerHTML = [0, 1, 1, 2]
  .map(
    (n, i) => `<div class="md:space-y-4 space-y-2 ${
      i === 1
        ? "col-slide-down-md md:block hidden"
        : i === 2
        ? "col-slide-down md:hidden"
        : ""
    }">
        ${projects
          .slice(n * 3, (n + 1) * 3)
          .map(
            (p) =>
              `<div class="relative aspect-[16/12]">
                  <img
                    src=${p.image}
                    alt=${p.title}
                    class="rounded-xl object-cover size-full"
                  />
                </div>`
          )
          .join("")}
      </div>`
  )
  .join("");
// ------ home ------ //
//
//
//
// ------ about section ------ //
// how-do-i-work
select(".how-do-i-work").innerHTML = how_do_i_work
  .map(
    (item, i) => `<div class="space-y-2">
    <p class="fill-text lg:text-[2.3rem] sm:text-3xl text-2xl text-[var(--text-primary)]!">✺ 0${
      i + 1
    }</p>
    <br />
    <p class="fill-text lg:text-[2.3rem] sm:text-3xl text-2xl text-[var(--text-primary)]!">${item}</p>
</div>`
  )
  .join("");

// skills
select(".skills").innerHTML = skills
  .map(
    (item, i) => `<div
            class="p-1 rounded-full text-xl group border-2 border-[var(--border)] hover:border-[var(--text-primary)] transition-colors overflow-hidden"
          >
          
          <div class="relative flex justify-between items-center gap-8 p-4 overflow-hidden rounded-full font-normal sm:text-3xl">
            <div
              class="absolute h-full bg-[var(--bg-primary-inverse)] left-0 top-0 progress origin-left rounded-full"
              style="width: ${item.progress}%"
            >
            </div>

            <div class="flex gap-4 z-1 mix-blend-difference">
              <h1 class="opacity-50 group-hover:opacity-100! duration text-[var(--color-primary-fixed)]! font-secondary">${
                i < 9 ? 0 : ""
              }${i + 1}</h1>
              <h1 class="line-clamp-1 text-[var(--color-primary-fixed)]!">
                ${item.skill}
              </h1>
            </div>

            <h1 class="z-1 mix-blend-difference text-[var(--color-primary-fixed)]! font-secondary">
              ${item.progress}%
            </h1>
          </div>
          </div>`
  )
  .join("");

// favorite stack
select(".favorite-stack").innerHTML = tool_images
  .map(
    (
      item
    ) => `<div class="relative aspect-square flex-center group tool rounded-full border border-primary">
            <img
              src=${item}
              alt="tool"
              loading="lazy"
              class="grayscale-100 group-hover:grayscale-0 duration size-12"
            />
          </div>`
  )
  .join("");

// experience
select(".experience").innerHTML = experience
  .map(
    (item) => `<div
            class="sticky stacked-card top-20 padding-query flex items-center justify-query md:gap-8 gap-4 border-t-2 first:border-0  border-primary bg-[var(--bg-secondary)] group"
          >
            <h1 class="text-lg rad text-nowrap lg:p-8 p-4 2xl:inline-block hidden border-[var(--border)] border-2 group-hover:border-[var(--text-primary)] duration font-secondary">
              ${item.years}
            </h1>

            <div class="flex flex-col gap-4 items-query text-query">
              <h1 class="text-lg text-nowrap p-4 2xl:hidden inline-block border-[var(--border)] border font-secondary">
                ${item.years}
              </h1>
              <h1 class="md:text-2xl text-xl">${item.event}</h1>
              <p class="capitalize">${item.location}</p>
            </div>
          </div>`
  )
  .join("");

// clients
let clientCtx;

function handleClients() {
  if (clientCtx) clientCtx.revert();
  clientCtx = gsap.context(() => {
    if (client_option === "stacked-sticky-cards") {
      gsapStackedCards({
        containerClass: ".clients-stacked-cards",
        scale: 0.85,
      });
    } else {
      gsapArrowDown({ itemClass: ".client-arrow img" });
    }
    gsapFillText({ itemClass: ".client-fill-text" });
  });

  if (client_option === "stacked-sticky-cards") {
    select(".see-work").addEventListener("click", () => scrollTo("portfolio"));
    select(".contact-now").addEventListener("click", () => scrollTo("contact"));
  }
}

handleClients();

clientVariantsMenu.addEventListener("change", (e) => {
  set_client_option(e.target.value);
  select(".clients").innerHTML = renderClients(e.target.value);
  handleClients();
  ScrollTrigger.refresh();
  runMangetic();
  renderCustomCursor();
  scrollTo("testimonials");
});

select(".clients").innerHTML = renderClients(client_option);

// ------ about section ------ //
//
//
//
// ------ portfolio section ------ //
// projects
const projectsContainer = select(".projects");
projectsContainer.innerHTML = renderProjects(projects_option);

const lightBox = select(".light-box");
const closeButton = select(".close-button-holder");
const overlay = select(".light-box-overly");
const lightBoxImage = lightBox.querySelector("img");

function openLightbox(projectIdx) {
  const project = projects[projectIdx];
  const { image, title, link, description, tags, tools } = project;

  lightBoxImage.src = image;
  lightBoxImage.alt = title;

  lightBox.querySelector("a").href = link;
  lightBox.querySelector(".project-title").textContent = title;
  lightBox.querySelector("p").textContent = description;
  lightBox.querySelector(".light-box-tools").innerHTML = tools
    .map(
      (name) => `<div
              class="rad border border-[var(--border)] text-sm font-[var(--font-secondary)] p-3"
            >
              <img src="/public/images/tools/${name}.svg" alt="${name}" class="size-9" loading="lazy" />
            </div>`
    )
    .join("");

  lightBox.querySelector(".light-box .project-tags").innerHTML = tags
    .map(
      (
        name
      ) => `<span class="rounded-full border border-[var(--text-primary)] py-2 px-4">
          ${name}
        </span>`
    )
    .join("");

  lightBox.classList.replace("translate-y-full", "translate-y-0");
  lightBoxImage.classList.replace("opacity-0", "opacity-100");
  closeButton.classList.remove("-translate-y-full", "opacity-0");
  closeButton.classList.add("translate-y-4", "opacity-100");
  overlay.style.transition = "calc(var(--animation-duration)/2)";
  overlay.classList.remove("translate-y-full", "opacity-0");
  overlay.classList.add("translate-y-0", "opacity-100");
}

function closeLightbox() {
  lightBox.classList.replace("translate-y-0", "translate-y-full");
  lightBoxImage.classList.replace("opacity-100", "opacity-0");
  closeButton.classList.remove("translate-y-4", "opacity-100");
  closeButton.classList.add("-translate-y-full", "opacity-0");
  overlay.style.transition = "calc(var(--animation-duration)*2)";
  overlay.classList.remove("translate-y-0", "opacity-100");
  overlay.classList.add("translate-y-full", "opacity-0");
}

let projectCtx;

function handlePortfolio() {
  if (projectCtx) projectCtx.revert();
  projectCtx = gsap.context(() => {
    if (projects_option === "side-cards") gsapProjectSideCards();
    else if (projects_option === "cards" || projects_option === "3-cards")
      gsapProjectCards();
    else if (
      projects_option === "stacked-sticky-cards" ||
      projects_option === "stacked-cards"
    ) {
      gsapStackedCards({
        containerClass: ".projects div",
        top: "top 25%",
        scale: 0.85,
      });
    } else if (projects_option === "list") {
      renderImageCursor();
      const projectListImage = select(".project-list-image");
      selectAll(".project-list-item").forEach((el) => {
        el.addEventListener(
          "mouseenter",
          () => (
            (projectListImage.style.display = "inline"),
            (projectListImage.src = el.dataset.image)
          )
        );

        el.addEventListener(
          "mouseleave",
          () => (projectListImage.style.display = "none")
        );
      });
      selectAll(".view-light-box-button").forEach((el) => {
        el.addEventListener("click", () => openLightbox(el.id));
      });
    }
    gsapZoomOutImage({ itemClass: "img.project-image" });
  });

  closeButton.addEventListener("click", () => closeLightbox());
  selectAll(".view-light-box-trigger, .project-list-item").forEach((el) => {
    el.addEventListener("click", () => openLightbox(el.id));
  });
}

handlePortfolio();

projectVariantsMenu.addEventListener("change", (e) => {
  set_projects_option(e.target.value);
  projectsContainer.innerHTML = renderProjects(e.target.value);
  handlePortfolio();
  ScrollTrigger.refresh();
  scrollTo("portfolio", 200);
  runMangetic();
  renderCustomCursor();
});
// ------ portfolio section ------ //
//
//
//
// ------ services section ------ //
select(".services").innerHTML = renderServices(services_option);
let serviceCtx;

function handleServices() {
  if (serviceCtx) serviceCtx.revert();
  if (services_option === "cards") {
    serviceCtx = gsap.context(() =>
      gsapZoomOutImage({ itemClass: ".service-image" })
    );
  } else {
    const serviceListItems = selectAll(".service-list-item");
    serviceListItems.forEach((el) => {
      el.addEventListener("click", () => {
        const content = el.querySelector(".content");
        const isOpen = el.classList.contains("open");

        serviceListItems.forEach((item) => {
          item.classList.remove("open");
          item.querySelector(".content").style.height = `0px`;
          item.querySelector(".count-title").classList.remove("active");
          item.querySelector(".minus-icon").classList.remove("rotate-0");
          item
            .querySelector("img")
            .classList.remove("opacity-100", "-translate-y-full");
        });

        if (isOpen) {
          content.style.height = `0px`;
          el.classList.remove("open");
        } else {
          content.style.height = `${content.scrollHeight}px`;
          el.classList.add("open");
          el.querySelector(".count-title").classList.add("active");
          el.querySelector(".minus-icon").classList.add("rotate-90");
          el.querySelector("img").classList.add(
            "opacity-100",
            "-translate-y-full"
          );
        }
      });
    });
  }

  selectAll(".service-button").forEach((el) => {
    el.addEventListener("click", () => {
      select("textarea").value = `Hi ${my_name}, I'm interested in (${el.name
        .split("-")
        .join(" ")}) service`;
      scrollTo("contact");
    });
  });
}

handleServices();

serviceVariantsMenu.addEventListener("change", (e) => {
  set_services_option(e.target.value);
  select(".services").innerHTML = renderServices(services_option);
  handleServices();
  ScrollTrigger.refresh();
  scrollTo("services", 200);
  runMangetic();
  renderCustomCursor();
});
// ------ services section ------ //
//
//
//
// ------ contact section ------ //
select(".contact-area").innerHTML = renderContact(contact_option);

contactVariantsMenu.addEventListener("change", (e) => {
  set_contact_option(e.target.value);
  select(".contact-area").innerHTML = renderContact(e.target.value);
  handleContact();
  scrollTo("contact", 200);
  runMangetic();
  renderCustomCursor();
  footerGsap();
});

const sendEmail = async (formData) => {
  return await (
    await fetch("/src/php/send-email.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
  ).json();
};

function renderFeedbackMessage({ success, message }) {
  if (success) {
    select(".feedback div").classList.remove(
      "bg-red-500/15",
      "text-red-500",
      "border",
      "border-red-500/25"
    );
    select(".feedback div").classList.add(
      "bg-green-500/15",
      "text-green-500",
      "border",
      "border-green-500/25"
    );
    select(".feedback-message").textContent = message;
  } else {
    select(".feedback div").classList.remove(
      "bg-green-500/15",
      "text-green-500",
      "border",
      "border-green-500/25"
    );
    select(".feedback div").classList.add(
      "bg-red-500/15",
      "text-red-500",
      "border",
      "border-red-500/25"
    );

    select(".feedback-message").textContent = message || "Failed to send";
  }
}

function handleContact() {
  const form = select("form");
  const nameError = select(".name-error");
  const emailError = select(".email-error");
  const messageError = select(".message-error");
  const nameInput = select("input[name='name']");
  const emailInput = select("input[name='email']");
  const messageInput = select("textarea[name='message']");
  const submitButton = select(".submit-button");
  const feedback = select(".feedback");

  feedback.classList.add("hidden");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    let isValid = true;
    [nameError, emailError, messageError].forEach((el) =>
      el.classList.add("hidden")
    );

    if (nameInput.value.trim().length < min_name_characters) {
      nameError.textContent = `Name must be at least ${min_name_characters} characters.`;
      nameError.classList.remove("hidden");
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      emailError.classList.remove("hidden");
      isValid = false;
    }

    if (messageInput.value.trim().length < min_message_characters) {
      messageError.textContent = `Message must be at least ${min_message_characters} characters.`;
      messageError.classList.remove("hidden");
      isValid = false;
    }

    // contact-1
    if (contact_option === "contact-1" && isValid) {
      submitButton.disabled = true;
      select("span.spinner").classList.remove("hidden");
      select("span.send").classList.add("hidden");
      select(".arrow-icon").classList.add("hidden");
      select("span.success").classList.add("hidden");
      select("span.failed").classList.add("hidden");

      const response = await sendEmail(formData);

      feedback.classList.remove("hidden");

      if (response.success) {
        select("span.success").classList.remove("hidden");
        renderFeedbackMessage(response);
        form.reset();
      } else {
        select("span.failed").classList.remove("hidden");
        select(".arrow-icon").classList.remove("hidden");
        renderFeedbackMessage(response);
      }
    }
    // contact-2
    else if (isValid) {
      submitButton.disabled = true;

      select("span.spinner").classList.remove("hidden");

      select(".submit-button .text").classList.add("hidden");

      const response = await sendEmail(formData);

      feedback.classList.remove("hidden");

      if (response.success) {
        renderFeedbackMessage(response);
        form.reset();
      } else {
        renderFeedbackMessage(response);
      }

      select(".submit-button .text").classList.remove("hidden");
    }

    submitButton.disabled = false;
    select(".spinner").classList.add("hidden");
  });
}

setTimeout(() => handleContact(), 500);
//
//
//
// ------ footer ------ //
let footerCtx;

function handleFooter() {
  select(".footer-wrapper").innerHTML = renderFooter(footer_option);

  if (footerCtx) footerCtx.revert();
  footerCtx = gsap.context(() => {
    if (footer_option === "footer-1") footer1Gsap();
    else footer2Gsap();
  });
}

handleFooter();

footerVariantsMenu.addEventListener("change", (e) => {
  set_footer_option(e.target.value);
  handleFooter();
  scrollTo("footer", 200);
  runMangetic();
  setTimeout(() => renderCustomCursor(), 500);
  select(".name").addEventListener("click", () =>
    window.scrollTo({ left: 0, top: 0, behavior: "instant" })
  );
});
select(".short-description").innerHTML = short_description;
// ------ footer ------ //
//
//
//
// ------ run global gsap code ------ //
runGlobalGsap();
scrollStaggerAnimation({
  selector: ".tool",
  containerSelector: ".favorite-stack",
});
scrollStaggerAnimation({
  selector: ".progress",
  containerSelector: ".skills",
  fromVars: { scaleX: 0 },
  toVars: {
    duration: 2,
    scaleX: 1,
  },
});
gsapStackedCards({ containerClass: ".experience", scale: 0.5 });
// ------ run global gsap code ------ //

// ------ custom cursor ------ //
function renderCustomCursor() {
  // Only initialize on non-touch devices
  if (window.innerWidth > 1023) {
    const customCursor = select(".custom-cursor");
    let mouseX = 0;
    let mouseY = 0;

    gsap.set([customCursor], { xPercent: -50, yPercent: -50 });

    document.addEventListener(
      "mousemove",
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      },
      { passive: true }
    );

    gsap.ticker.add(() => {
      gsap.to(customCursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    const cursorClassList = select(".custom-cursor").classList;

    const active = () => cursorClassList.replace("size-4", "size-24");
    const deactive = () => cursorClassList.replace("size-24", "size-4");
    const hide = () => cursorClassList?.replace("size-4", "size-0");
    const show = () => cursorClassList?.replace("size-0", "size-4");

    selectAll("button", "a").forEach((el) => {
      el.addEventListener("mouseenter", () => active());
      el.addEventListener("mouseleave", () => deactive());
    });

    selectAll(".view-light-box-trigger").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        active();
        customCursor.innerHTML = `<h1 class="-rotate-12 text-black! text-3xl font-semibold">
              VIEW
            </h1>`;
      });
      el.addEventListener("mouseleave", () => {
        deactive();
        customCursor.innerHTML = ``;
      });
    });

    selectAll(".hide-cursor-trigger").forEach((el) => {
      el.addEventListener("mouseenter", hide);
      el.addEventListener("mouseleave", show);
    });
  }
}

function renderImageCursor() {
  const imageCursor = select(".image-cursor");

  const container = select(".project-list-container");

  let mouseX = 0;
  let mouseY = 0;

  gsap.set([imageCursor], { xPercent: -50, yPercent: -50 });

  container.addEventListener(
    "mousemove",
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    },
    { passive: true }
  );

  gsap.ticker.add(() => {
    gsap.to(imageCursor, {
      x: mouseX,
      y: mouseY,
      duration: 0.3,
      ease: "power2.out",
    });
  });
}

setTimeout(() => {
  renderCustomCursor();
  handleFooter();
}, 1000);

// ------ custom cursor ------ //
