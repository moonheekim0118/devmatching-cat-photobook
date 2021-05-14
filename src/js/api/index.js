import { baseUrl } from "../../../baseUrl.js";
const baseOption = {
  method: "GET",
};

const request = async (url) => {
  const response = await fetch(url, baseOption);
  if (!response.ok) {
    throw new Error("서버 에러!");
  }
  const data = await response.json();
  return data;
};

const api = {
  getRootData: () => {
    return request(baseUrl);
  },
  getDirectoryData: (nodeId) => {
    return request(`${baseUrl}/${nodeId}`);
  },
};

export default api;
