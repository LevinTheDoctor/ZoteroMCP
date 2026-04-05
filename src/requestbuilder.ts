import { API_CONFIG } from "./config.js";

// base url aus bas url und user prefix
const base_url = API_CONFIG.baseUrl + "/" + API_CONFIG.userPrefix + "/";

export const RestEndpoints = {
  items: base_url + "items",
  collections: base_url + "collections",
  tags: base_url + "tags",
};

// Alle Collections abrufen
export async function getCollections() {
  const url = new URL(RestEndpoints.collections);
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

// Letze Collections abrufen
export async function getCollectionsTop() {
  const url = new URL(RestEndpoints.collections) + "/top";
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

// Eine Collection mit dem Key abrufen
export async function getCollectionByKey(key: string) {
  const url = new URL(RestEndpoints.collections) + "/" + key;
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

// Untercollections einer Collection mit dem Key abrufen
export async function getSubcollectinsByKey(key: string) {
  const url = new URL(RestEndpoints.collections) + "/" + key + "/collections";
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}
