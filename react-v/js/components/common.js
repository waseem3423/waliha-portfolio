"use strict";
import { social_links } from "../data/contact.js";
import { my_name } from "../data/home.js";

export const renderArrow = () => {
  return `
<span class="relative overflow-hidden size-9">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    class="absolute group-hover:-translate-y-7 group-hover:translate-x-7 size-9"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </g>
  </svg>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    class="absolute translate-y-7 -translate-x-7 group-hover:translate-0 size-9"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </g>
  </svg>
</span>`;
};

export const SocialLinks = ({ theme } = { theme: false }) => {
  return social_links
    .map(
      (item) =>
        `
      <button class="magnetic w-fit"><a
          href=${item.link}
          target="_blank"
          class="flex items-center px-0 group relative  ${
            theme ? "text-primary" : "text-[var(--color-primary-fixed)]"
          } overflow-hidden"
          style="font-family: 'Saira Condensed', sans-serif"
          ><span class="lg:text-3xl text-2xl font-light uppercase slide-up"
            >${item.name}</span
          >
          <span class="relative overflow-hidden size-9 slide-up ${
            theme
              ? "stroke-[var(--text-primary)]"
              : "stroke-[var(--color-primary-fixed)]"
          }">
            ${renderArrow()}
          </span>
        </a></button>`
    )
    .join("");
};

export const renderHeroName = ({ className } = { className: "" }) => {
  const nameLength = my_name.length < 9 ? 9 : my_name.length;
  const viewWidth = `${100 / (nameLength - (nameLength / 100) * 49.5)}vw`;
  return `<h1 class="hero-name ${className}" style="font-size: ${viewWidth}; line-height: ${viewWidth}">
          <span class="block slide-up">${my_name.toLowerCase()}</span>
        </h1>`;
};

export const count = (i) => {
  return `${i < 9 ? 0 : ""}${i + 1}`;
};
