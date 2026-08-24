"use strict";
import { projects } from "../data/projects.js";
import { count, renderArrow } from "../components/common.js";

const projectSideCards = () => {
  return `<div class="space-y-32">${projects
    .map(
      (item, i) => `<div class="grid lg:grid-cols-2 lg:gap-0 gap-4">
            <div id=${i} class="side-card view-light-box-trigger relative overflow-hidden aspect-[16/12] rad ${
        i % 2 === 0 ? "lg:order-1 origin-left" : "lg:order-2 origin-right"
      }">
            <img loading="lazy"
              src=${item.image}
              class="project-image object-cover size-full scale-120" alt="${
                item.title
              }"
            />
            </div>

            <div class="flex flex-col justify-center ${
              i % 2 === 0 ? "lg:order-2 lg:ml-16" : "lg:order-1 lg:mr-16"
            }">
              <div class="lg:space-y-8 space-y-4">
                <div class="flex flex-wrap justify-query lg:gap-12 gap-4 tools ${
                  i % 2 === 0 ? "lg:-rotate-6" : "lg:rotate-6"
                }">
                  ${item.tools
                    .map(
                      (
                        img
                      ) => `<div class="border border-[var(--text-primary)] rad p-4">
                    <img src="image/tools/${img.toLowerCase()}.svg" loading="lazy" class="grayscale size-7" alt="${img.toLowerCase()}" />
                  </div>`
                    )
                    .join("")}
                </div>

                <div class="flex flex-col items-query lg:gap-8 gap-4 title ${
                  i % 2 === 0 ? "lg:-rotate-3" : "lg:rotate-3"
                }">
                  <h1 class="line-clamp-2 text-7xl font-medium text-query">
                    ${item.title}
                  </h1>

                  <div class="magnetic">
                    ${
                      item.link
                        ? `
                      <a href=${item.link} target="_blank">
                        <button class="button-outline text-2xl group">
                      Visit Site
                      ${renderArrow()}
                      </button></a>
                      `
                        : ``
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>`
    )
    .join("")}</div>`;
};

const projectCards = ({ threeCols } = { threeCols: false }) => {
  return `<div class="grid lg:grid-cols-2 gap-4 ${
    threeCols ? "2xl:grid-cols-3" : ""
  }">${projects
    .map(
      (item, i) => `<div class="space-y-4 relative group block project-card ${
        threeCols ? "" : item.cols === 1 ? "lg:col-span-1" : "lg:col-span-2"
      }">
          <div
            class="relative view-light-box-trigger overflow-hidden group aspect-16/12 rad ${
              threeCols ? "" : item.cols === 1 ? "" : "lg:aspect-[16/10]"
            }"
            id=${i}
          >
            <img
              src=${item.image}
              alt=${item.title}
              class="project-image scale-125 object-cover size-full"
              sizes="(max-width: 768px) 99vw, 75vw"
              loading="lazy"
            />
          </div>
        </div>`
    )
    .join("")}</div>`;
};

const projectList = () => {
  return `
    <div class="relative project-list-container">
      <div
        class="pointer-events-none fixed left-0 top-0 -translate-1/2 max-lg:hidden image-cursor w-[400px] h-[300px]"
      >
        <div class="relative w-full h-full">
          <img
            alt="service preview"
            class="object-cover rounded-xl project-list-image size-full hidden"
            priority
          />
        </div>
      </div>

      ${projects
        .map(
          (el, i) => `
        <div
        data-image="${el.image}"
        id=${i}
        class="project-list-item border-t-3 border-(--border) group hover:border-(--text-primary) duration pb-16 pt-4 lg:relative sticky max-lg:top-16 cursor-pointer max-lg:bg-(--bg-secondary) hide-cursor-trigger"
      >
        <div class="lg:gap-16 gap-8 flex md:flex-row flex-col relative">
          <div class="lg:basis-2/5 md:basis-1/2 flex flex-col gap-8">
            <div class="space-y-2 text-query mix-blend-difference">
              <h1 class="text-2xl text-(--color-primary-fixed)! count-title">${count(
                i
              )}</h1>
              <h1 class="text-6xl font-medium text-(--color-primary-fixed)!">
                ${el.title}
              </h1>
              <div class="flex lg:gap-4 gap-2 flex-wrap max-lg:justify-center">
              ${el.tags
                .slice(0, 3)
                .map(
                  (
                    name
                  ) => `<div class="lg:px-4 px-2 py-1 border rad max-lg:text-sm border-(--color-primary-fixed) text-(--color-primary-fixed)">
                ${name}
              </div>`
                )
                .join("")}
              </div>
            </div>

            <div
              class="flex items-center overflow-hidden relative max-lg:hidden mix-blend-difference"
            >
              <h1
                class="text-6xl text-(--color-primary-fixed)! leading-[3.8rem] translate-y-full group-hover:translate-y-0 duration-300"
              >
                View
              </h1>
              <svg
                viewBox="0 0 24.00 24.00"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(-45)"
                class="size-20 dark:fill-(--text-primary)! dark:stroke-(--text-primary)! fill-(--color-primary-fixed)! stroke-(--color-primary-fixed)! rotate-45 group-hover:rotate-0 opacity-0 group-hover:opacity-100 max-lg:hidden"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M15.6468 10.8686L10.3515 5.6L11.9596 4L20 12L11.9596 20L10.3515 18.4L15.6468 13.1314L4 13.1314V10.8686L15.6468 10.8686Z"></path>{" "}
                </g>
              </svg>
            </div>

            <div class="relative lg:hidden">
              <img
                src="${el.image}"
                alt="${el.title}"
                class="object-cover rounded-xl size-full aspect-4/3"
              />
            </div>
          </div>
          <p
            class="md:text-2xl text-lg font-light lg:basis-3/5 md:basis-1/2 md:text-start text-center text-(--color-primary-fixed)! mix-blend-difference max-md:hidden line-clamp-4 h-fit"
          >
            ${el.description}
          </p>
        </div>
      </div>`
        )
        .join("")}
    </div>`;
};

const projectStackedCards = ({ sticky } = { sticky: false }) => {
  return `<div class="relative 2xl:px-32 space-y-16 sex">
    ${projects
      .map(
        (item, i) => `
      <div
      class="stacked-card view-light-box-trigger aspect-[16/10] z-30 overflow-hidden block group rad ${
        sticky ? "sticky top-16" : "relative"
      }"
      id=${i}
    >
      <img
        src="${item.image}"
        alt="${item.title}"
        sizes="(max-width: 768px) 100vw, 75vw"
        class="object-cover rad scale-115 project-image size-full"
        loading="lazy"
      />

      <div
        class="absolute left-0 bottom-0 size-full bg-gradient-to-b from-black/45 to-black/0 rad opacity-0 group-hover:opacity-100 duration"
      ></div>

      <div
        class="absolute left-8 top-0 w-[calc(100%-64px)] sm:flex hidden items-start justify-between gap-4 rad group-hover:translate-y-full -translate-y-full duration"
      >
        <div class="text-4xl flex gap-4">
          <h1 class="active text-white!">${count(i)}</h1>
          <h1 class="mix-blend-difference line-clamp-1 flex-1 text-white!">
            ${item.title}
          </h1>
        </div>
        <div class="flex flex-wrap gap-4 capitalize font-[var(--font-secondary)] text-sm text-primary">
          ${item.tags
            .slice(0, 3)
            .map(
              (tag) =>
                `<span class="rounded-full py-2 px-4 bg-white/15 text-white">${tag}</span>`
            )
            .join("")}
        </div>
      </div>
    </div>
      `
      )
      .join("")}
  </div>`;
};

export const renderProjects = (option) => {
  return option === "side-cards"
    ? projectSideCards()
    : option === "cards"
    ? projectCards()
    : option === "3-cards"
    ? projectCards({ threeCols: true })
    : option === "list"
    ? projectList()
    : option === "stacked-cards"
    ? projectStackedCards()
    : option === "stacked-sticky-cards"
    ? projectStackedCards({ sticky: true })
    : `<h1 class="text-red-500! text-6xl lowercase! text-center">variant doesn't exists, please check the spelling of variant</h1>`;
};
