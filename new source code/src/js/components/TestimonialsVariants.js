"use strict";
import { average_rating, clients } from "../data/about.js";
import { count } from "../components/common.js";

const starRating = (averageRate) => {
  const fullStars = Math.floor(averageRate);
  const halfStar = averageRate % 1 >= 0.4 ? 0.5 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  const emptyFullStars = Math.floor(emptyStars);
  const emptyHalfStar = emptyStars % 1 >= 0.4 ? 0.5 : 0;

  return `<div class="flex gap-4 items-center">
      <h3 class="text-xl translate-y-0.5">${averageRate}</h3>
      <div class="flex items-center gap-1">
        ${[...Array(fullStars)]
          .map(
            (_) =>
              `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            class="size-6 fill-[var(--text-primary)] group-hover:fill-yellow-500"
          >
            <path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" />
          </svg>
          `
          )
          .join("")}
        ${
          halfStar === 0.5
            ? `<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            class="size-6 fill-[var(--text-primary)] group-hover:fill-yellow-500 mr-[3px]"
          >
            <path d="M336.1 71.6C336.1 60.5 328.5 50.9 317.7 48.3C306.9 45.7 295.8 50.8 290.7 60.7L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L323 480.1C331 476 336.1 467.7 336.1 458.7L336.1 71.6z" />
          </svg>`
            : ""
        }
        ${
          emptyHalfStar === 0.5
            ? `<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            class="size-[25px] fill-[var(--border)] -ml-[30px]"
            style="transform: rotateY(180deg)"
          >
            <path d="M336.1 71.6C336.1 60.5 328.5 50.9 317.7 48.3C306.9 45.7 295.8 50.8 290.7 60.7L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L323 480.1C331 476 336.1 467.7 336.1 458.7L336.1 71.6z" />
          </svg>`
            : ""
        }
        ${[...Array(emptyFullStars)]
          .map(
            (_) =>
              `<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            class="size-[26px] fill-[var(--border)]"
          >
            <path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" />
          </svg>`
          )
          .join("")}
      </div>
    </div>`;
};

const slider = (isReverse) => {
  return `
  <div class="ticker-wrapper mask-x overflow-hidden w-full relative z-20 flex ticker-wrapper">
    <div class="flex items-center will-change-transform ${
      isReverse ? "animate-scroll-x-reverse" : "animate-scroll-x"
    }"
    style="animation-duration: ${clients.length * 10}s"
    >
    
      ${[...clients, ...clients]
        .map(
          (item, i) => `
        <div class="px-4">
          <div class="relative flex flex-col justify-between aspect-square border-2 border-transparent lg:hover:border-(--text-primary) rad md:w-[400px] md:h-[400px] h-80 lg:p-8 py-8 group duration">
            <div class="space-y-8">
              <div class="flex justify-between items-center">
                ${starRating(item.rate)}
                <h1 class="count-title text-2xl">${count(i)}</h1>
              </div>
              <p
                class="md:text-2xl italic text-[var(--text-primary)]! font-light"
              >
                “ ${item.comment} ”
              </p>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                ${
                  item.image
                    ? `
                <img
                  src="${item.image}"
                  alt="${item.name}"
                  class="rounded-full size-[70px]"
                />`
                    : `
                <div class="border border-[var(--text-primary)] flex-center size-[70px] rounded-full">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-9 stroke-[var(--text-primary)]"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M12.1992 12C14.9606 12 17.1992 9.76142 17.1992 7C17.1992 4.23858 14.9606 2 12.1992 2C9.43779 2 7.19922 4.23858 7.19922 7C7.19922 9.76142 9.43779 12 12.1992 12Z"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M3 22C3.57038 20.0332 4.74796 18.2971 6.3644 17.0399C7.98083 15.7827 9.95335 15.0687 12 15C16.12 15 19.63 17.91 21 22"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                </div>`
                }
      
                <div class="space-y-2 flex-1">
                  <h1 class="text-2xl">${item.name}</h1>
                  <h2 class="text-sm">${item.role}</h2>
                </div>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="stroke-[var(--border)] group-hover:stroke-[var(--text-primary)] duration size-9"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                  ></path>
                  <path
                    d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                  ></path>
                </g>
              </svg>

            </div>
          </div>
        </div>`
        )
        .join("")}

    </div>
  </div>`;
};

const clientSlider = () => {
  return `<div>
      <div class="wrapper lg:mb-32 mb-16">
      <div class="flex lg:justify-between justify-center items-center">
        <div class="space-y-8">
          <div class="lg:w-fit text-query">
            <h1 class="fill-text about-content-title">what</h1>
            <br />
            <h1 class="fill-text about-content-title">clients say</h1>
          </div>
          <div class="flex items-center gap-4 justify-query">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              class="size-6 fill-[var(--text-primary)]"
            >
              <path
                d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
              />
            </svg>
            <h3 class="text-lg space-x-1">
              <span class="font-medium text-primary"> ${average_rating} </span>
              Average Rating
            </h3>
          </div>
        </div>
        <div class="arrow left">
          <img src="/public/svgs/arrow-down-left.svg" alt="arrow" />
        </div>
      </div>
    </div>
  <div class="space-y-8">
  ${slider(false)}
  ${slider(true)}
    </div>
  </div>`;
};

const clientStackedStickyCards = () => {
  return `    <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-32 gap-16 wrapper">
      <div>
        <div class="lg:sticky lg:top-20 relative space-y-8">
          <div class="text-query">
            <h1 class="client-fill-text about-content-title">What</h1>
            <br />
            <h1 class="client-fill-text about-content-title">Clients Say</h1>
          </div>
          <p class="text-query lg:w-4/7">
            Clients who chose to work with me and trusted my expertise.
          </p>

          <div class="flex items-center gap-4 justify-query">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              class="size-6 fill-[var(--text-primary)]"
            >
              <path
                d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
              />
            </svg>
            <h3 class="text-lg">
              <span class="font-medium text-primary"> ${average_rating} </span>
              Average Rating
            </h3>
          </div>

          <hr class="border-[var(--border)]" />

          <div class="flex gap-8 justify-query flex-wrap">
            <div class="magnetic"><button class="button-outline text-2xl see-work">See My Work</button></div>
            <div class="magnetic">
              <button variant="primary" class="button-primary text-2xl contact-now">
              Contact Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="relative clients-stacked-cards">
        ${clients
          .map(
            (item, i) => `
          <div
  class="padding-query stacked-card first:pt-0 group space-y-16 sticky top-22 border-t-2 first:border-0 bg-[var(--bg-secondary)] border-primary"
>
  <div class="flex flex-col items-query gap-8">
    <div class="flex justify-between items-center lg:w-full">
      ${starRating(item.rate)}
      <h1 class="count-title text-2xl">${count(i)}</h1>
    </div>

    <p
      class="text-2xl italic text-[var(--text-primary)]! text-query font-light"
    >
      “ ${item.comment} ”
    </p>
  </div>

  <div class="flex lg:justify-between justify-center items-center">
    <div class="flex items-center gap-8">
      ${
        item.image
          ? `<img
                src="${item.image}"
                alt="${item.name}"
                class="rounded-full size-[100px]"
                loading="lazy"
              />`
          : `<div class="border border-[var(--text-primary)] flex-center size-[100px] rounded-full">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="size-9 stroke-[var(--text-primary)]"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M12.1992 12C14.9606 12 17.1992 9.76142 17.1992 7C17.1992 4.23858 14.9606 2 12.1992 2C9.43779 2 7.19922 4.23858 7.19922 7C7.19922 9.76142 9.43779 12 12.1992 12Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M3 22C3.57038 20.0332 4.74796 18.2971 6.3644 17.0399C7.98083 15.7827 9.95335 15.0687 12 15C16.12 15 19.63 17.91 21 22"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
              </div>`
      }

      <div class="space-y-4 flex-1">
        <h1 class="sm:text-3xl text-2xl">${item.name}</h1>
        <h2>${item.role}</h2>
      </div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="stroke-[var(--border)] group-hover:stroke-[var(--text-primary)] lg:inline hidden size-[50px]"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
        ></path>
        <path
          d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
        ></path>
      </g>
    </svg>
  </div>
</div>
          `
          )
          .join("")}
      </div>
    </div>`;
};

export const renderClients = (option) => {
  return option === "slider" ? clientSlider() : clientStackedStickyCards();
};
