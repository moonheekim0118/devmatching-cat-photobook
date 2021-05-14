import nodeListTemplate from "../templates/Nodes.js";
import { SELECTORS, DIR_TYPES, NODE_ACTION_TYPES } from "../utils/constants.js";
import { $, getClosestNode } from "../utils/dom.js";

function Nodes({
  initialState,
  onClickNode,
  onOpenImageViewer,
  onHistoryBack,
}) {
  this.$target = $(SELECTORS.NODE_CONTAINER);
  this.state = initialState;
  this.onClickNode = onClickNode;
  this.onOpenImageViewer = onOpenImageViewer;
  this.onHistoryBack = onHistoryBack;

  this.bindEvent = () => {
    this.$target.addEventListener("click", this.onClick);
  };

  this.onClick = ({ target }) => {
    const $node = getClosestNode(target);
    if (!$node) return;
    const { name, id, type, path, action } = $node.dataset;
    if (action === NODE_ACTION_TYPES.BACKWARD) {
      return this.onHistoryBack();
    }
    if (type === DIR_TYPES.DIRECTORY) {
      return this.onClickNode(name, id);
    }
    return this.onOpenImageViewer(path);
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = nodeListTemplate(this.state.currentDatas);
  };

  this.bindEvent();
  this.render();
}

export default Nodes;
