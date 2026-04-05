import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getCollections, getItemByKey } from "./api.js";

const server = new McpServer({
  name: "ZoteroMCP",
  version: "0.1.0",
  description: "MCP Server fuer Zotero",
});

// Tools
server.tool(
  "get-item-by-key",
  "Ruft ein spezifisches Item anhand seines Keys ab",
  { key: z.string().describe("Der Zotero Item Key") },
  async ({ key }) => {
    const data = await getItemByKey(key);
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  },
);

server.tool(
  "getCollections",
  "Ruft die Collections des Nutzers ab",
  {},
  async () => {
    const data = await getCollections();
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  },
);

// Server starten
const transport = new StdioServerTransport();
await server.connect(transport);
