import { DIR_TYPES, NODE_ACTION_TYPES } from "../utils/constants.js";

const thumNailImage = {
  [DIR_TYPES.FILE]: "./assets/file.png",
  [DIR_TYPES.DIRECTORY]: "./assets/directory.png",
};

const nodeTemplate = (data) => {
  return `
    <div class="Node" data-type=${data.type} data-action=${
    NODE_ACTION_TYPES.FORWARD
  }
    data-name=${data.name} data-id=${data.id} data-path=${data.filePath}>
        <img src=${thumNailImage[data.type]}>
        <div>${data.name}</div>
    </div>
  `;
};

const prevButtonTemplate = `
    <div class="Node" data-action=${NODE_ACTION_TYPES.BACKWARD}>
        <img src="./assets/prev.png">
    </div>
`;

const nodeListTemplate = (datas) => {
  const list = datas.map((data) => nodeTemplate(data));
  list.unshift(prevButtonTemplate);
  return list.join("\n");
};

export default nodeListTemplate;
