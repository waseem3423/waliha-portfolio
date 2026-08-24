"use strict";

function select(className) {
  return document.querySelector(className);
}

function selectAll(className) {
  return [...document.querySelectorAll(className)];
}
