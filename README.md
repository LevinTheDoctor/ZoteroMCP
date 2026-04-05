# Zotero MCP – Einrichtung

> Verbinde Zotero mit Claude über einen lokalen MCP-Server und greife direkt auf deine Literaturverwaltung zu.

---

## Voraussetzungen

- [Zotero](https://www.zotero.org/) ist installiert und geöffnet
- [Node.js](https://nodejs.org/) ist installiert (`node --version` zum Prüfen)
- Das Projekt `ZoteroMCP` liegt lokal vor und wurde geklont

---

## Schritt 1 – Lokale API in Zotero aktivieren

1. Öffne **Zotero**
2. Gehe zu den Einstellungen über das Menü oder den Shortcut:

   ```
   Cmd + ,
   ```

3. Navigiere zu **Erweitert → Verschiedenes**
4. Aktiviere die Option:

   > ✅ **Anderen Anwendungen auf diesem Computer erlauben, mit Zotero zu kommunizieren**

   Danach erscheint die lokale API-URL, zum Beispiel:

   ```
   http://localhost:23119/api/
   ```

   > **Tipp:** Notiere dir den Port – du brauchst ihn im nächsten Schritt.

---

## Schritt 2 – API im Projekt anbinden

Erstelle die Datei `src/config.ts` im Projektverzeichnis und ersetze die Platzhalter durch deine tatsächliche URL aus Zotero:

```typescript
// src/config.ts

export const API_CONFIG = {
  baseUrl: "http://localhost:23119/api", // Port aus den Zotero-Einstellungen übernehmen
  userPrefix: "users/0",                 // Lokaler Nutzer (Standard: 0)
  timeout: 500,                          // Timeout in Millisekunden
};
```

---

## Schritt 3 – Projekt bauen

Wechsle ins Projektverzeichnis und führe den Build-Befehl aus:

```bash
# Ins Projektverzeichnis wechseln
cd /pfad/zum/Projekt/ZoteroMCP

# Abhängigkeiten installieren (nur beim ersten Mal nötig)
npm install

# Projekt bauen
npm run build
```

> **Alternativ:** In **Visual Studio Code** kannst du den Build direkt über den integrierten Terminal oder eine `tasks.json`-Konfiguration ausführen.

Nach dem Build liegt die kompilierte Datei unter `dist/index.js`.

---

## Schritt 4 – MCP in Claude Desktop einbinden

Damit Claude den MCP-Server erkennt, muss die Konfigurationsdatei von Claude Desktop angepasst werden.

**Pfad zur Konfigurationsdatei:**

```
/Users/DEIN-NUTZER/Library/Application Support/Claude/claude_desktop_config.json
```

Füge den folgenden Block in das `mcpServers`-Objekt ein:

```json
{
  "mcpServers": {
    "zotero": {
      "command": "node",
      "args": ["/absoluter/pfad/zum/Projekt/ZoteroMCP/dist/index.js"]
    }
  }
}
```

> **Wichtig:** Verwende den **absoluten Pfad** zur `dist/index.js` – relative Pfade funktionieren hier nicht zuverlässig.

Starte **Claude Desktop** nach der Änderung neu, damit der MCP-Server erkannt wird.

---

## Troubleshooting

| Problem | Mögliche Ursache | Lösung |
|---|---|---|
| API nicht erreichbar | Zotero ist nicht geöffnet | Zotero starten und API-Option prüfen |
| Falscher Port | Port hat sich geändert | Port in Zotero-Einstellungen prüfen und `config.ts` aktualisieren |
| MCP wird nicht erkannt | Falscher Pfad in JSON | Absoluten Pfad zur `dist/index.js` verwenden |
| `dist/index.js` fehlt | Build nicht ausgeführt | `npm run build` erneut ausführen |

---

## Projektstruktur (nach dem Build)

```
ZoteroMCP/
├── src/
│   ├── config.ts        # API-Konfiguration
│   └── index.ts         # Einstiegspunkt des MCP-Servers
├── dist/
│   └── index.js         # Kompilierte Ausgabe (wird von Claude genutzt)
├── package.json
└── tsconfig.json
```
