# Zotero MCP – Setup

> Connect Zotero to Claude via a local MCP server and access your reference manager directly.

---

## Prerequisites

- [Zotero](https://www.zotero.org/) is installed and running
- [Node.js](https://nodejs.org/) is installed (verify with `node --version`)
- The `ZoteroMCP` project is cloned and available locally

---

## Step 1 – Enable the Local API in Zotero

1. Open **Zotero**
2. Open Preferences via the menu or the shortcut:

   ```
   Cmd + ,
   ```

3. Navigate to **Advanced → Miscellaneous**
4. Enable the following option:

   > ✅ **Allow other applications on this computer to communicate with Zotero**

   The local API URL will then be displayed, for example:

   ```
   http://localhost:23119/api/
   ```

   > **Tip:** Note down the port number — you'll need it in the next step.

---

## Step 2 – Connect the API to the Project

Create the file `src/config.ts` in the project directory and replace the placeholders with your actual URL from Zotero:

```typescript
// src/config.ts

export const API_CONFIG = {
  baseUrl: "http://localhost:23119/api", // Use the port from your Zotero settings
  userPrefix: "users/0",                 // Local user (default: 0)
  timeout: 500,                          // Timeout in milliseconds
};
```

---

## Step 3 – Build the Project

Navigate to the project directory and run the build command:

```bash
# Navigate to the project directory
cd /path/to/project/ZoteroMCP

# Install dependencies (only required once)
npm install

# Build the project
npm run build
```

> **Alternative:** In **Visual Studio Code** you can run the build directly via the integrated terminal or a `tasks.json` configuration.

After the build, the compiled file will be available at `dist/index.js`.

---

## Step 4 – Register the MCP Server in Claude Desktop

For Claude to recognize the MCP server, the Claude Desktop configuration file needs to be updated.

**Path to the configuration file:**

```
/Users/YOUR-USERNAME/Library/Application Support/Claude/claude_desktop_config.json
```

Add the following block to the `mcpServers` object:

```json
{
  "mcpServers": {
    "zotero": {
      "command": "node",
      "args": ["/absolute/path/to/project/ZoteroMCP/dist/index.js"]
    }
  }
}
```

> **Important:** Always use the **absolute path** to `dist/index.js` — relative paths are not reliably resolved here.

Restart **Claude Desktop** after saving the change for the MCP server to be picked up.

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---|---|---|
| API not reachable | Zotero is not running | Start Zotero and verify the API option is enabled |
| Wrong port | Port has changed | Check the port in Zotero settings and update `config.ts` |
| MCP not recognized | Incorrect path in JSON | Use the absolute path to `dist/index.js` |
| `dist/index.js` missing | Build was not run | Run `npm run build` again |

---

## Project Structure (after build)

```
ZoteroMCP/
├── src/
│   ├── config.ts        # API configuration
│   └── index.ts         # MCP server entry point
├── dist/
│   └── index.js         # Compiled output (used by Claude)
├── package.json
└── tsconfig.json
```
