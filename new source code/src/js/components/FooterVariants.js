"use strict";

import { my_name } from "../data/home.js";
import { renderHeroName, SocialLinks } from "./common.js";

const footer1 = () => {
  return `
    <div id="footer" class="relative h-screen div-1"></div>

    <div
      class="fixed footer-image z-1 left-0 bottom-0 h-screen w-screen overflow-hidden md:bg-contain bg-cover max-md:bg-no-repeat"
      style="
        background-image: url(/public/images/hero.jpg);
        background-position: center center;
      "
    >
      <div class="overlay size-full absolute left-0 top-0"></div>
    </div>

    <div class="relative h-[75vh] div-2"></div>

    <footer
      class="fixed z-0 left-0 bottom-0 h-[75vh] w-screen overflow-hidden bg-black"
    >
      <div class="py-16 lg:space-y-16 space-y-8">
        <div
          class="relative text-center flex flex-col items-center gap-8 wrapper"
        >
          <p class="text-(--color-primary-fixed)! text-2xl">
            © 2025
            <span
              class="text-(--color-primary) cursor-pointer uppercase hover:underline name"
            >
              ${my_name}
            </span>
            All Rights Reserved.
          </p>

          <div class="social-links default flex justify-center gap-4 flex-wrap">
            ${SocialLinks()}
          </div>
        </div>

        ${renderHeroName({
    className:
      "text-(--color-primary-fixed)! absolute left-1/2 -translate-x-1/2 bottom-16",
  })}
      </div>
    </footer>
  `;
};

const footer2 = () => {
  return `<div
        id="footer"
        class="relative h-screen footer-placeholder max-sm:bg-no-repeat sm:bg-contain bg-cover"
        style="
          background-image: url(/public/images/hero.jpg);
          background-position: center center;
        "
      ></div>

      <footer class="fixed bottom-0 h-screen w-screen">
        <div
          class="overlay size-full absolute left-0 top-0 backdrop-blur-[2px]"
        ></div>

        <div
          class="wrapper relative text-center flex flex-col items-center gap-8 py-32"
        >
          <p class="text-[var(--color-primary-fixed)]! text-2xl">
            © 2025
            <span class="cursor-pointer uppercase hover:underline name">${my_name}</span>
            All Rights Reserved.
          </p>

          <div class="social-links default flex justify-center gap-4 flex-wrap">
            ${SocialLinks()}
          </div>
        </div>

        ${renderHeroName({
    className:
      "text-(--color-primary-fixed)! absolute left-1/2 -translate-x-1/2 bottom-16",
  })}
      </footer>`;
};

export const renderFooter = (option) => {
  return option === "footer-1"
    ? footer1()
    : option === "footer-2"
      ? footer2()
      : `<h1 class="text-red-500! text-6xl lowercase! text-center">variant doesn't exists, please check the spelling of variant</h1>`;
};
