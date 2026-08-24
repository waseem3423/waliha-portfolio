"use strict";
// ==================[ theme configuration ]================== //

// -------[ clients ]------- //
/* options:
1 - slider
2 - stacked-sticky-cards
*/
export let client_option = "slider";
export function set_client_option(opt) {
  client_option = opt;
}
//
//
//
// -------[ projects/portfolio section ]------- //
/* options:
1 - stacked-sticky-cards
2 - stacked-cards
3 - side-cards
4 - cards
5 - 3-cards
6 - list
*/
export let projects_option = "side-cards";
export function set_projects_option(opt) {
  projects_option = opt;
}
//
//
//
// -------[ services section ]------- //
/* options:
1 - cards
2 - list
*/
export let services_option = "cards";
export function set_services_option(opt) {
  services_option = opt;
}
//
//
//
// -------[ contact section ]------- //
/* options:
1 - contact-1
2 - contact-2
*/
export let contact_option = "contact-1";
export function set_contact_option(opt) {
  contact_option = opt;
}
//
//
//
// -------[ footer ]------- //
/* options:
1 - footer-1
2 - footer-2
*/
export let footer_option = "footer-2";
export function set_footer_option(opt) {
  footer_option = opt;
}

// options
export const clientCardOptions = ["stacked-sticky-cards", "slider"];

export const projectOptions = [
  "stacked-cards",
  "stacked-sticky-cards",
  "cards",
  "3-cards",
  "list",
  "side-cards",
];

export const serviceOptions = ["cards", "list"];

export const contactOptions = ["contact-1", "contact-2"];

export const footerOptions = ["footer-1", "footer-2"];
