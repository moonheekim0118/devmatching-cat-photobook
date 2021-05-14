import { SELECTORS } from "../utils/constants.js";
import { $ } from "../utils/dom.js";

function Loading({ initialState }) {
  this.$target = $(SELECTORS.LOADING_CONTAINER);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.isLoading) {
      this.$target.style = "display:block";
    } else {
      this.$target.style = "display:none";
    }
  };

  this.render();
}

export default Loading;
