"use strict";
import { services } from "../data/services.js";
import { count } from "./common.js";

const serviceButton = (title) => {
  return `
  <div class="magnetic w-fit">
    <button class="button-outline service-button text-xl group py-4" name=${title
      .split(" ")
      .join("-")}>
      Get Service
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-6"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </g>
      </svg>
    </button>
  </div>
  `;
};

const serviceCards = () => {
  return `<div class="grid 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8">
  ${services
    .map(
      (item, i) => `<div
              class="relative padding-query border-2 border-transparent hover:border-[var(--text-primary)] rad group lg:aspect-square aspect-auto service-card duration transition-colors"
            >
              <div
                class="absolute position-center size-4/7 service-image scale-125"
              >
                <div
                  class="aspect-square grayscale duration group-hover:opacity-5 lg:block hidden"
                >
                  <img src=${item.image} alt=${item.title} loading="lazy" />
                </div>
              </div>
  
              <div
                class="relative lg:opacity-0 group-hover:opacity-100 duration flex flex-col gap-8 items-query text-query"
              >
                <img class="lg:hidden size-32 block grayscale" src=${
                  item.image
                } alt=${item.title} loading="lazy" />
  
                <div class="flex gap-1">
                  <h1
                    class="line-clamp-1 lg:group-hover:translate-x-2 duration text-3xl"
                  >
                    ${item.title}
                  </h1>
                </div>
                <p
                  class="text-lg 2xl:line-clamp-[5] xl:line-clamp-[11] lg:line-clamp-[4] duration lg:translate-x-2 group-hover:translate-x-0 sm:inline hidden"
                >
                  ${item.description}
                </p>
                <div class="flex lg:w-full justify-between items-center">
                  ${serviceButton(item.title)}
                  <h1 class="count-title active text-3xl">
                    ${count(i)}
                  </h1>
                </div>
              </div>
            </div>`
    )
    .join("")}</div>`;
};

const serviceList = () => {
  return `<div>${services
    .map(
      (item, i) => `<div
      class="service-list-item border-t border-b first:border-t-[1.5px] last:border-b-[1.5px] border-[var(--border)] hover:border-[var(--text-primary)] group cursor-pointer duration"
    >
      <div class="flex items-center justify-between py-8 relative">
        <div class="flex items-center gap-8 sm:text-4xl text-2xl">
          <h1 class="count-title font-normal">${count(i)}</h1>
          <h1>${item.title}</h1>
        </div>

        <img
          src="${item.image}"
          alt="${item.title}"
          loading="lazy"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[100px] grayscale duration opacity-0 group-hover:opacity-100 group-hover:scale-125 group-hover:-translate-y-full"
        />

        <div
          class="p-1 rounded-full group-hover:bg-[var(--bg-primary-inverse)] duration group-hover:rotate-180"
        >
          <div class="relative stroke-[var(--text-primary)] group-hover:stroke-[var(--text-primary-inverse)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="size-6"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M6 12L18 12"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="minus-icon rotate-90 absolute left-1/2 top-0 -translate-x-1/2 size-6"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M6 12L18 12"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div
        class="overflow-hidden transition-all ease-in-out duration content"
        style="height: 0px"
      >
        <div
          class="duration space-y-8 lg:ps-17 mb-8"
        >
          <p class="text-xl font-light">${item.description}</p>
          ${serviceButton(item.title)}
        </div>
      </div>
    </div>`
    )
    .join("")}</div>`;
};

export const renderServices = (option) => {
  return option === "cards" ? serviceCards() : serviceList();
};
