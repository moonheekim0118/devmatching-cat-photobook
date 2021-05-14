import { SELECTORS } from "./constants.js";

export const $ = (selector, target = document) =>
  target.querySelector(selector);
export const $$ = (selector, target = document) =>
  target.querySelectorAll(selector);
export const getClosestNode = (target) => target.closest(SELECTORS.NODE_ITEM);
export const getClosestCrumb = (target) => target.closest(SELECTORS.CRUMB_ITEM);
