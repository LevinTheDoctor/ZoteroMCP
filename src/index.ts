import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as api from "./api.js";

const server = new McpServer({
  name: "ZoteroMCP",
  version: "0.1.0",
  description: "MCP Server fuer Zotero",
});

// Ressourcen definieren
server.resource(
  "collection",
  new ResourceTemplate("zotero://collection/{key}", {
    list: async () => {
      const collections = await api.getCollections();
      return {
        resources: collections.map((col: any) => ({
          uri: `zotero://collection/${col.key}`,
          name: col.data.name,
          description: `${col.meta.numItems} Items, ${col.meta.numCollections} Subcollections`,
        })),
      };
    },
  }),
  async (uri, { key }) => {
    // Muss ein String sein, da er in der URI definiert ist
    if (typeof key !== "string") {
      throw new Error("Key muss ein String sein");
    }
    // Hier rufen wir die API auf, um die Collection und ihre Items zu bekommen
    const [collection, items] = await Promise.all([
      api.getCollectionByKey(key),
      api.getItemsByCollectionKey(key),
    ]);

    return {
      contents: [
        {
          uri: uri.href,
          text: JSON.stringify({ collection, items }, null, 2),
        },
      ],
    };
  },
);

// Tools die Wie ein API Endpunkt funktionieren, aber mit Validierung und Dokumentation
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
