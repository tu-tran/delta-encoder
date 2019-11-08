import { EndPoint } from "./config";

async function getRequestBody(type, data) {
  if (!type || !data) {
    throw new Error(`Invalid data [type=${type}, data=${data}]`);
  }

  let content;
  switch (type) {
    case "text":
      content = data;
      break;
    case "url": {
      const resp = await fetch(data);
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      content = await resp.text();
      break;
    }
    case "file":
      content = data;
      break;
    default:
      throw new Error(`Unsupported data [type=${type}, data=${data}]`);
  }

  const formData = new FormData();
  const dataBlock = type === "file" ? data : new Blob([JSON.stringify({ data: content })], { type: "application/json" });
  formData.append("data", dataBlock);
  return formData;
}

async function post(endpoint, type, data) {
  const content = await getRequestBody(type, data);
  return fetch(endpoint, {
    method: "POST",
    body: content
  }).then((r) => r.text());
}

export default {
  compress: async ({ type, data }) => post(`${EndPoint}/compress`, type, data),
  decompress: async ({ type, data }) => post(`${EndPoint}/decompress`, type, data)
};
