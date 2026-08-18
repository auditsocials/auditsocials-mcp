# auditsocials-mcp

A [Model Context Protocol](https://modelcontextprotocol.io) server that exposes the **AuditSocials Social Media Advertising Compliance Glossary** — 212 openly licensed terms (CC BY 4.0) covering platform policy, legal & regulatory frameworks (DSA, GDPR, FTC), ad-tech metrics, content & creative standards, privacy & data, industry-specific rules, and enforcement & risk.

Let AI assistants define and search advertising-compliance terminology, with source attribution on every response.

> **Scope:** glossary only. The AuditSocials policy tracker, enforcement intelligence, and scanner are **not** exposed through this server.

## Tools

| Tool | Description |
|---|---|
| `glossary_define` | Define a term by name or slug. Returns the full definition, category, applicable platforms, related terms, and URI. |
| `glossary_search` | Search by keyword and/or category. Returns matching terms with short definitions. |
| `glossary_list_categories` | List glossary categories with term counts. |

## Install

```bash
npm install -g auditsocials-mcp
```

Or run on demand with `npx auditsocials-mcp`.

## Use with Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "auditsocials-glossary": {
      "command": "npx",
      "args": ["-y", "auditsocials-mcp"]
    }
  }
}
```

Then ask, for example: *"Define account suspension"* or *"Search the AuditSocials glossary for DSA terms."*

## Use with other MCP clients

The server speaks MCP over stdio. Point any MCP-compatible client (Cursor, Continue, etc.) at the `auditsocials-mcp` command.

## Data & license

- **Source:** <https://www.auditsocials.com/knowledge/glossary>
- **Archived dataset (DOI):** <https://doi.org/10.5281/zenodo.20458599>
- **Persistent URIs:** `https://w3id.org/auditsocials/glossary/{term}`
- **License:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — attribution required.

Curated by AuditSocials, a platform policy intelligence service monitoring policy changes, regulator actions, and enforcement decisions across eight social platforms.

## Development

```bash
npm install
npm run export-glossary   # regenerate the bundled snapshot from the source data
npm run build             # compile to dist/
npm start                 # run the server
```
