import imageTemplate from "../templates/ImageViewer.js";
import { $ } from "../utils/dom.js";
import { SELECTORS } from "../utils/constants.js";

function ImageViewer({ initialState, onCloseModal }) {
  this.$target = $(SELECTORS.IMAGE_VIEWER);
  this.state = initialState;
  this.onCloseModal = onCloseModal;

  this.bindEvent = () => {
    document.addEventListener("keydown", ({ key }) => {
      if (key !== "Escape") return;
      if (!this.state.isModalOpen) return;
      this.onCloseModal();
    });
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.isModalOpen) {
      this.$target.style = "display:block";
      this.$target.innerHTML = imageTemplate(this.state.currentImagePath);
    } else {
      this.$target.style = "display:none";
    }
  };
  this.render();
  this.bindEvent();
}

export default ImageViewer;
