import { API_CONFIG } from "./config.js";
import { get } from "./requestbuilder.js";

// base url aus bas url und user prefix
const base = API_CONFIG.baseUrl + "/" + API_CONFIG.userPrefix;

// Endpoints zentral definieren
export const Endpoints = {
  collections: `${base}/collections`,
  items: `${base}/items`,
  tags: `${base}/tags`,
};

// Collections
export const getCollections = () => get(Endpoints.collections);
export const getCollectionsTop = () => get(`${Endpoints.collections}/top`);
export const getCollectionByKey = (key: string) =>
  get(`${Endpoints.collections}/${key}`);
export const getSubcollectionsByKey = (key: string) =>
  get(`${Endpoints.collections}/${key}/collections`);
export const getItemsByCollectionKey = (key: string) =>
  get(`${Endpoints.collections}/${key}/items`);
export const getTopItemsByCollectionKey = (key: string) =>
  get(`${Endpoints.collections}/${key}/items/top`);

// Items
export const getItems = () => get(Endpoints.items);
export const getItemByKey = (key: string) => get(`${Endpoints.items}/${key}`);
export const getItemChildrenByKey = (key: string) =>
  get(`${Endpoints.items}/${key}/children`);
export const getItemsTags = () => get(`${Endpoints.items}/tags`);
export const getTagsByItemKey = (key: string) =>
  get(`${Endpoints.items}/${key}/tags`);

// Tags
export const getTags = () => get(Endpoints.tags);
