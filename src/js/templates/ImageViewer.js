import { imageUrl } from "../../../baseUrl.js";

const imageTemplate = (path) => {
  const filePath = `${imageUrl}${path}`;
  return `
    <div class="content">
    <img src=${filePath}>
    `;
};

export default imageTemplate;
