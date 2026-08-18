# AuditSocials Glossary MCP — 212 Advertising & Platform‑Policy Terms for AI

[![npm version](https://img.shields.io/npm/v/auditsocials-mcp)](https://www.npmjs.com/package/auditsocials-mcp)
[![npm downloads](https://img.shields.io/npm/dm/auditsocials-mcp)](https://www.npmjs.com/package/auditsocials-mcp)
[![license: CC BY 4.0](https://img.shields.io/badge/license-CC_BY_4.0-blue)](https://creativecommons.org/licenses/by/4.0/)
[![DOI](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.20458599-blue)](https://doi.org/10.5281/zenodo.20458599)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-server-blue)](https://modelcontextprotocol.io)

> **A [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server that gives AI assistants an authoritative, openly‑licensed glossary of social media advertising & platform‑policy terminology — 212 terms (CC BY 4.0)** covering platform policy, legal & regulatory frameworks (DSA, GDPR, FTC), ad‑tech metrics, content & creative standards, privacy & data, industry‑specific rules, and enforcement & risk.

Let AI assistants **define and search advertising‑compliance terms accurately**, with source attribution and a persistent URI on every response — instead of hallucinating definitions for regulatory and platform‑policy jargon.

- 📚 **212 curated terms** across 8 categories — platform policy, legal/regulatory, ad‑tech, content standards, privacy, industry rules, enforcement & risk.
- 🔗 **Cited & persistent** — every definition carries a source URL and a stable `w3id.org` URI; the dataset has a Zenodo **DOI**.
- 🆓 **No API key, no config** — the glossary is bundled and read‑only; just `npx`.
- 🤖 **Grounding for RAG & agents** — reduce hallucination on DSA/GDPR/FTC and platform‑policy terminology.

> **Scope:** glossary only. The AuditSocials policy tracker, enforcement intelligence and scanner are **not** exposed through this server. For live pre‑publish policy checks, see the companion [AuditSocials Compliance MCP](https://www.npmjs.com/package/auditsocials-compliance-mcp).

---

## Tools

| Tool | Description |
|---|---|
| `glossary_define` | Define a term by name or slug. Returns the full definition, category, applicable platforms, related terms and persistent URI. |
| `glossary_search` | Search by keyword and/or category. Returns matching terms with short definitions. |
| `glossary_list_categories` | List glossary categories with term counts. |

## Quickstart

```bash
npx -y auditsocials-mcp
```

No API key and no configuration required — the 212‑term glossary is bundled.

## Client setup

Speaks MCP over **stdio**, so it works with any MCP‑compatible client.

**Claude Desktop / Claude Code** — add to `mcpServers`:

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

**Cursor, VS Code, Windsurf, Cline, Continue, Zed and other MCP clients** — point them at the `npx -y auditsocials-mcp` command (no env needed).

## Usage — just ask your assistant

- *"Define account suspension using the AuditSocials glossary."*
- *"Search the AuditSocials glossary for DSA terms."*
- *"What categories are in the AuditSocials advertising‑compliance glossary?"*
- *"Define shadow ban and list related terms."*

Each answer includes the definition, category, applicable platforms, related terms, a source URL and a persistent URI — so your assistant cites rather than guesses.

## What's inside

212 terms spanning:

- **Platform policy** — advertising & community‑guideline concepts across Meta, TikTok, LinkedIn, Google Ads, YouTube, X, Snapchat, Pinterest.
- **Legal & regulatory** — DSA, GDPR, FTC, COPPA, and related frameworks.
- **Ad‑tech & metrics** — delivery, attribution, and measurement terminology.
- **Content & creative standards**, **privacy & data**, **industry‑specific rules**, and **enforcement & risk** (bans, appeals, demonetization, shadow‑limiting).

## Data, provenance & license

- **Source:** <https://www.auditsocials.com/knowledge/glossary>
- **Archived dataset (DOI):** <https://doi.org/10.5281/zenodo.20458599>
- **Persistent URIs:** `https://w3id.org/auditsocials/glossary/{term}`
- **License:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — free to use with attribution.

Curated by **AuditSocials**, a platform policy intelligence service that monitors policy changes, regulator actions and enforcement decisions across eight social platforms.

## FAQ

**What is the AuditSocials Glossary MCP?**
An MCP server that lets AI assistants define and search 212 openly‑licensed social‑media advertising and platform‑policy terms, with source attribution on every response.

**Do I need an API key?**
No. The glossary is bundled and read‑only — just run `npx -y auditsocials-mcp`.

**Why use it instead of asking the model directly?**
Regulatory and platform‑policy terminology (DSA, GDPR, FTC, demonetization, shadow bans) is easy to get subtly wrong. This grounds answers in a curated, cited dataset with persistent URIs — ideal for RAG and agents.

**Can I use the definitions in my own product?**
Yes, under CC BY 4.0 with attribution to AuditSocials (link the source URL or DOI).

**Which MCP clients work?**
Any stdio MCP client — Claude Desktop, Claude Code, Cursor, VS Code, Windsurf, Cline, Continue, Zed and others.

## Links

- 📖 **Glossary (web):** <https://www.auditsocials.com/knowledge/glossary>
- 🧭 **Dataset DOI (Zenodo):** <https://doi.org/10.5281/zenodo.20458599>
- 🛡️ **Companion — live pre‑publish policy check:** <https://www.npmjs.com/package/auditsocials-compliance-mcp>
- 📦 **npm:** <https://www.npmjs.com/package/auditsocials-mcp>

## Development

```bash
npm install
npm run export-glossary   # regenerate the bundled snapshot from source data
npm run build             # compile to dist/
```

---

**Keywords:** MCP server, Model Context Protocol, advertising compliance glossary, platform policy terminology, DSA glossary, GDPR terms, FTC advertising, social media policy definitions, content moderation glossary, regtech, ad‑tech glossary, CC BY 4.0 dataset, RAG grounding, AI definitions.

## License

Content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) · © AuditSocials
