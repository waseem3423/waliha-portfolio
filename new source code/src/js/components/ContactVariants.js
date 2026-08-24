"use strict";

import { contact_info } from "../data/contact.js";
import { renderArrow } from "./common.js";

const contactInfo = () => {
  return `
<div class="wrapper flex flex-col gap-16 justify-between">
  <div class="2xl:text-[10.5rem] lg:text-9xl text-7xl text-query justify-query normal-case! text-primary flex flex-wrap gap-2 items-center">
    <span>✺ Interested in</span>
    <span>working with</span>
    <span class="inline-flex items-center">
      <div class="relative aspect-video 2xl:h-28 lg:h-20 h-14 mx-3 rounded-full overflow-hidden inline-block align-middle">
        <img
          src="/public/images/hero.jpg"
          alt="hero"
          class="object-cover size-full"
        />
      </div>
      <span>me?</span>
    </span>
  </div>
  <div
    class="flex gap-8 flex-wrap justify-center contact-info-container"
  >${contact_info
    .map(
      (item) => `
    <div class="relative border-2 border-[var(--border)] rounded-full p-8 group hover:border-(--text-primary) duration">
      <h1 class="text-3xl">${item.info}</h1>
      <div class="bg-[var(--bg-primary-inverse)] text-[var(--text-primary-inverse)] py-1 px-4 absolute top-0 -translate-y-1/2 rounded-full left-1/2 -translate-x-1/2 group-hover:opacity-100 opacity-0 duration">
        ${item.title}
      </div>
    </div>`
    )
    .join("")}
  </div>
</div>
  `;
};

const contact1 = () => {
  return `
      <div class="space-y-16">
        ${contactInfo()}
        <form id="contact-form" method="post">
          <div class="wrapper border-t border-[var(--border)]">
            <div class="grid md:grid-cols-2 grid-cols-1">
              <label
                class="py-16 space-y-8 block duration md:border-0 border-b border(--border)"
              >
                <h1 class="text-3xl">Name *</h1>
                <input
                  placeholder="John Alex"
                  type="text"
                  name="name"
                  class="text-2xl placeholder:text-[var(--light-text-fixed)] outline-none p-0! flex bg-transparent text-[var(--text-primary)] w-full py-8 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 mb-0!"
                />
                <p class="text-red-500! font-light name-error mt-2"></p>
              </label>

              <label
                class="py-16 space-y-8 block duration md:border-l 2xl:pl-24 lg:pl-16 md:pl-8 border-(--border)"
              >
                <h1 class="text-3xl">Your Email *</h1>
                <input
                  placeholder="john.example@gmail.com"
                  name="email"
                  type="text"
                  class="text-2xl placeholder:text-[var(--light-text-fixed)] outline-none p-0! flex bg-transparent text-[var(--text-primary)] w-full py-8 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 mb-0!"
                />
                <p class="text-red-500! font-light email-error mt-2"></p>
              </label>
            </div>
          </div>

          <div
            class="wrapper md:border-y border-t border-(--border) md:pr-0!"
          >
            <div class="grid md:grid-cols-12 grid-cols-1">
              <label
                class="py-16 space-y-8 block duration xl:col-span-9 md:col-span-7"
              >
                <h1 class="text-3xl">Your Message *</h1>
                <textarea
                  type="text"
                  name="message"
                  placeholder="Hi, I'm Looking for..."
                  class="text-2xl resize-none placeholder:text-[var(--light-text-fixed)] outline-none flex bg-transparent text-[var(--text-primary)] w-full ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 mb-0!"
                  rows="4"
                ></textarea>
                <p class="text-red-500! font-light message-error mt-2"></p>
              </label>

              <button
                class="submit-button xl:aspect-square xl:col-span-3 md:col-span-5 flex-center group bg-[var(--bg-primary-inverse)]"
                type="submit"
              >
                <span class="spinner hidden"></span>
                <div
                  class="magnetic flex-center font-medium py-16 text-4xl text-[var(--text-primary-inverse)] uppercase text-end"
                >
                  <span class="send">
                    Send To <br />
                    Me
                  </span>

                  <span class="failed hidden">
                    failed <br />
                    Try Again
                  </span>

                  <span class="success hidden">
                    Email Sent <br />
                    Successfully
                  </span>

                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-[var(--text-primary-inverse)] size-[120px] check-icon hidden"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g id="Circle_Check" data-name="Circle Check">
                        <g>
                          <path
                            d="M15.81,10.4a.5.5,0,0,0-.71-.71l-3.56,3.56L9.81,11.52a.5.5,0,0,0-.71.71l2.08,2.08a.513.513,0,0,0,.71,0Z"
                          ></path>
                          <path
                            d="M12,21.934A9.934,9.934,0,1,1,21.933,12,9.945,9.945,0,0,1,12,21.934ZM12,3.067A8.934,8.934,0,1,0,20.933,12,8.944,8.944,0,0,0,12,3.067Z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>

                  <span class="overflow-hidden relative size-[140px] arrow-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      class="absolute stroke-[var(--text-primary-inverse)] group-hover:-translate-y-30 group-hover:translate-x-30 size-[140px]"
                      stroke-width="0.6"
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
                      class="absolute stroke-[var(--text-primary-inverse)] translate-30 -translate-x-30 group-hover:translate-0 size-[140px]"
                      stroke-width="0.6"
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
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div class="wrapper feedback mt-16">
            <div class="p-8 flex-center border gap-x-4 rad">
              <p class="feedback-message !text-inherit text-center text-lg"></p>
            </div>
          </div>
        </form>
      </div>
        `;
};

const contact2 = () => {
  return `
  <div class="space-y-16 wide-wrapper">
  
  ${contactInfo()}

    <div class="space-y-16 wrapper">
    <form id="contact-form" class="lg:space-y-16 space-y-8">
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-8">
        <label class="border-2 border-[var(--border)] dark:bg-[var(--color-landing)] focus-within:border-[var(--text-primary)] rad padding-query space-y-8 block duration">
          <h1 class="text-3xl">Name *</h1>
          <input class="text-2xl placeholder:text-[var(--light-text-fixed)] outline-none p-0! flex bg-transparent text-[var(--text-primary)] w-full py-8 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 mb-0!"
            placeholder="John Alex"
            type="text"
            name="name"
          />
          <p class="text-red-500! font-light name-error mt-2"></p>
        </label>

        <label class="border-2 border-[var(--border)] dark:bg-[var(--color-landing)] focus-within:border-[var(--text-primary)] rad padding-query space-y-8 block duration">
          <h1 class="text-3xl">Email *</h1>
          <input class="text-2xl placeholder:text-[var(--light-text-fixed)] outline-none p-0! flex bg-transparent text-[var(--text-primary)] w-full py-8 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 mb-0!"
            placeholder="john.example@gmail.com""
            type="text"
            name="email"
          />
          <p class="text-red-500! font-light email-error mt-2"></p>
        </label>

        <label class="border-2 border-[var(--border)] dark:bg-[var(--color-landing)] focus-within:border-[var(--text-primary)] rad padding-query space-y-8 block duration lg:col-span-2">
          <h1 class="text-3xl">Message *</h1>
          <textarea class="text-2xl placeholder:text-[var(--light-text-fixed)] outline-none p-0! flex bg-transparent text-[var(--text-primary)] w-full py-8 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 mb-0!"
            placeholder="Hi, I'm Looking for..."
            type="text"
            name="message"
          ></textarea>
          <p class="text-red-500! font-light message-error mt-2"></p>
        </label>
      </div>

      <div class="wrapper feedback mt-16">
        <div class="p-8 flex-center border gap-x-4 rad">
          <p class="feedback-message !text-inherit text-center text-lg"></p>
        </div>
      </div>

      <div class="flex-center">
        <div class="magnetic lg:w-60! w-full">
          <button class="button-primary group h-28! lg:w-60! w-full! submit-button flex-center" type="submit">
            <span class="spinner hidden"></span>
            <div class="text flex justify-center items-center font-medium text-2xl">Send Message ${renderArrow()}</div>
          </button>
        </div>
      </div>
    </form>
  </div>
  </div>
  `;
};

export const renderContact = (option) => {
  return option === "contact-1" ? contact1() : contact2();
};
