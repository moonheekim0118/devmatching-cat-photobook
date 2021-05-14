import breadCrumbTempalte from "../templates/BreadCrumb.js";
import { $, getClosestCrumb } from "../utils/dom.js";
import { SELECTORS } from "../utils/constants.js";

function BreadCrumb({ initialState, onMove }) {
  this.$target = $(SELECTORS.BREADCRUMB_CONTAINER);
  this.state = initialState;
  this.onMove = onMove;

  this.bindEvent = () => {
    this.$target.addEventListener("click", this.onClickCrumb);
  };

  this.onClickCrumb = ({ target }) => {
    const $crumb = getClosestCrumb(target);
    if (!$crumb) return;
    const { id, name } = $crumb.dataset;
    if (name === this.state.currentDirName) return;
    this.onMove(name, id);
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = breadCrumbTempalte(this.state.history);
  };

  this.render();
  this.bindEvent();
}

export default BreadCrumb;
