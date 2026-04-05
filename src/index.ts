import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as api from "./api.js";

const server = new McpServer({
  name: "ZoteroMCP",
  version: "0.1.0",
  description: "MCP Server fuer Zotero",
});

// Tools
server.tool(
  "getCollections",
  "Ruft die Collections des Nutzers ab",
  {},
  async () => {
    const data = await api.getCollections();
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  },
);

server.tool(
  "getCollectionsTop",
  "Ruft die Neusten Collections des Nutzers ab",
  {},
  async () => {
    const data = await api.getCollectionsTop();
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  },
);

server.tool(
  "getCollectionByKey",
  "Ruft eine spezifische Collection anhand ihres Keys ab",
  { key: z.string().describe("Der Zotero Collection Key") },
  async ({ key }) => {
    const data = await api.getCollectionByKey(key);
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  },
);

server.tool(
  "getItemsByCollectionKey",
  "Ruft ein spezifisches Item anhand der Collection ab",
  { key: z.string().describe("Der Zotero Collection Key") },
  async ({ key }) => {
    const data = await api.getItemsByCollectionKey(key);
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  },
);

server.tool(
  "getTopItemsByCollectionKey",
  "Ruft die neuesten Items einer spezifischen Collection ab",
  { key: z.string().describe("Der Zotero Collection Key") },
  async ({ key }) => {
    const data = await api.getTopItemsByCollectionKey(key);
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  },
);

server.tool("getItems", "Ruft die Items des Nutzers ab", {}, async () => {
  const data = await api.getItems();
  return {
    content: [{ type: "text", text: JSON.stringify(data) }],
  };
});

server.tool(
  "get-item-by-key",
  "Ruft ein spezifisches Item anhand seines Keys ab",
  { key: z.string().describe("Der Zotero Item Key") },
  async ({ key }) => {
    const data = await api.getItemByKey(key);
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  },
);

server.tool(
  "get-item-children-by-key",
  "Ruft die Kinder eines spezifischen Items anhand seines Keys ab",
  { key: z.string().describe("Der Zotero Item Key") },
  async ({ key }) => {
    const data = await api.getItemChildrenByKey(key);
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  },
);

server.tool(
  "get-items-tags",
  "Ruft die Tags der Items des Nutzers ab",
  {},
  async () => {
    const data = await api.getItemsTags();
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  },
);

server.tool(
  "get-tags-by-item-key",
  "Ruft die Tags eines spezifischen Items anhand seines Keys ab",
  { key: z.string().describe("Der Zotero Item Key") },
  async ({ key }) => {
    const data = await api.getTagsByItemKey(key);
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  },
);

server.tool("get-tags", "Ruft die Tags des Nutzers ab", {}, async () => {
  const data = await api.getTags();
  return {
    content: [{ type: "text", text: JSON.stringify(data) }],
  };
});

// Server starten
const transport = new StdioServerTransport();
await server.connect(transport);
