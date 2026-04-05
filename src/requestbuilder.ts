import { API_CONFIG } from "./config.js";

// base url aus bas url und user prefix
const base_url = API_CONFIG.baseUrl + "/" + API_CONFIG.userPrefix + "/";

export const RestEndpoints = {
  collections: base_url + "collections",
  items: base_url + "items",
  tags: base_url + "tags",
};

// Collections Endpoints

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

// Items einer Collection mit dem Key abrufen
export async function getItemsByCollectionKey(key: string) {
  const url = new URL(RestEndpoints.collections) + "/" + key + "/items";
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

// Top Items einer Collection mit dem Key abrufen
export async function getTopItemsByCollectionKey(key: string) {
  const url = new URL(RestEndpoints.collections) + "/" + key + "/items/top";
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

// Item Endpoints
export async function getItems() {
  const url = new URL(RestEndpoints.items);
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

export async function getItemsTags() {
  const url = new URL(RestEndpoints.items) + "/tags";
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

export async function getItemByKey(key: string) {
  const url = new URL(RestEndpoints.items) + "/" + key;
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

export async function getItemChildrenByKey(key: string) {
  const url = new URL(RestEndpoints.items) + "/" + key + "/children";
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

// tag of Item mit Key abrufen
export async function getTagsByItemKey(key: string) {
  const url = new URL(RestEndpoints.items) + "/" + key + "/tags";
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

// Tags Endpoints

// Alle Tags abrufen
export async function getTags() {
  const url = new URL(RestEndpoints.tags);
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}
