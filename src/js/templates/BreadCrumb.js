const directoryTemplate = (data) => {
  return `
    <div class="crumb"  data-name=${data.name} data-id=${data.id}>${data.name}</div>
    `;
};

const breadCrumbTempalte = (history) => {
  const list = history.map((data) => directoryTemplate(data));
  return list.join("\n");
};

export default breadCrumbTempalte;
