#!/usr/bin/env node
/**
 * auditsocials-mcp
 *
 * Model Context Protocol server exposing the AuditSocials Social Media
 * Advertising Compliance Glossary (212 terms, CC BY 4.0). Lets AI assistants
 * define and search platform-policy, advertising-compliance, and enforcement
 * terminology, with source attribution on every response.
 *
 * Glossary only. The policy-tracker, enforcement, and scanner products are
 * intentionally NOT exposed here.
 *
 * Source: https://www.auditsocials.com/knowledge/glossary
 * DOI:    https://doi.org/10.5281/zenodo.20458599  (CC BY 4.0)
 */
import { readFileSync } from "node:fs";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

interface GlossaryTerm {
  term: string;
  slug: string;
  category: string;
  shortDefinition: string;
  fullDefinition: string;
  relatedTerms: string[];
  platforms: string[];
  links?: { label: string; href: string }[];
}

interface GlossaryFile {
  meta: {
    title: string;
    license: string;
    licenseUrl: string;
    doi: string;
    source: string;
    namespace: string;
    termCount: number;
  };
  terms: GlossaryTerm[];
}

const data: GlossaryFile = JSON.parse(
  readFileSync(new URL("./data/glossary.json", import.meta.url), "utf8"),
);
const TERMS = data.terms;
const META = data.meta;

const ATTRIBUTION = `\n\n—\nSource: ${META.title} (${META.license}). DOI: https://doi.org/${META.doi} · ${META.source}`;

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function findTerm(query: string): GlossaryTerm | undefined {
  const q = query.trim().toLowerCase();
  const slug = norm(query);
  return (
    TERMS.find((t) => t.slug === slug) ||
    TERMS.find((t) => t.term.toLowerCase() === q) ||
    TERMS.find((t) => t.term.toLowerCase().includes(q) || t.slug.includes(slug))
  );
}

function formatTerm(t: GlossaryTerm): string {
  const lines = [
    `# ${t.term}`,
    `Category: ${t.category}`,
    `Applies to: ${t.platforms.join(", ")}`,
    "",
    t.fullDefinition,
  ];
  if (t.relatedTerms?.length) {
    lines.push("", `Related terms: ${t.relatedTerms.join(", ")}`);
  }
  lines.push(`URI: ${META.namespace}${t.slug}`);
  return lines.join("\n");
}

const server = new McpServer({
  name: "auditsocials-glossary",
  version: "0.1.0",
});

server.tool(
  "glossary_define",
  "Define a social media advertising / platform-policy compliance term from the AuditSocials Compliance Glossary. Accepts a term name or slug (e.g. 'account suspension' or 'account-suspension'). Returns the full definition, category, applicable platforms, and related terms.",
  { term: z.string().describe("The term name or slug to define") },
  async ({ term }) => {
    const found = findTerm(term);
    if (!found) {
      const suggestions = TERMS.filter((t) =>
        t.term.toLowerCase().includes(term.trim().toLowerCase()),
      )
        .slice(0, 5)
        .map((t) => `- ${t.term} (${t.slug})`);
      const msg =
        `No exact match for "${term}" in the AuditSocials Compliance Glossary.` +
        (suggestions.length
          ? `\n\nDid you mean:\n${suggestions.join("\n")}`
          : "\n\nTry glossary_search to browse related terms.") +
        ATTRIBUTION;
      return { content: [{ type: "text", text: msg }] };
    }
    return { content: [{ type: "text", text: formatTerm(found) + ATTRIBUTION }] };
  },
);

server.tool(
  "glossary_search",
  "Search the AuditSocials Compliance Glossary by keyword and/or category. Returns matching terms with their short definitions. Use this to discover terms before calling glossary_define.",
  {
    query: z
      .string()
      .describe("Keyword to match against term names and definitions"),
    category: z
      .string()
      .optional()
      .describe(
        "Optional category filter: Platform Policy, Legal & Regulatory, Ad Tech & Metrics, Content & Creative, Privacy & Data, Industry-Specific, Enforcement & Risk",
      ),
    limit: z
      .number()
      .int()
      .min(1)
      .max(50)
      .optional()
      .describe("Max results (default 10)"),
  },
  async ({ query, category, limit }) => {
    const q = query.trim().toLowerCase();
    const cat = category?.trim().toLowerCase();
    const matches = TERMS.filter((t) => {
      const inCat = !cat || t.category.toLowerCase() === cat;
      const inQuery =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.slug.includes(norm(query)) ||
        t.shortDefinition.toLowerCase().includes(q) ||
        t.fullDefinition.toLowerCase().includes(q);
      return inCat && inQuery;
    }).slice(0, limit ?? 10);

    if (!matches.length) {
      return {
        content: [
          {
            type: "text",
            text: `No glossary terms matched "${query}"${category ? ` in category "${category}"` : ""}.${ATTRIBUTION}`,
          },
        ],
      };
    }
    const body = matches
      .map((t) => `- ${t.term} (${t.slug}) — [${t.category}] ${t.shortDefinition}`)
      .join("\n");
    return {
      content: [
        {
          type: "text",
          text: `${matches.length} match(es) for "${query}":\n\n${body}${ATTRIBUTION}`,
        },
      ],
    };
  },
);

server.tool(
  "glossary_list_categories",
  "List the AuditSocials Compliance Glossary categories with the number of terms in each. Useful to understand the scope of the vocabulary.",
  {},
  async () => {
    const counts = new Map<string, number>();
    for (const t of TERMS) counts.set(t.category, (counts.get(t.category) ?? 0) + 1);
    const body = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([c, n]) => `- ${c}: ${n} terms`)
      .join("\n");
    return {
      content: [
        {
          type: "text",
          text: `AuditSocials Compliance Glossary — ${META.termCount} terms across ${counts.size} categories:\n\n${body}${ATTRIBUTION}`,
        },
      ],
    };
  },
);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // stderr is safe for logs; stdout is the MCP transport channel.
  console.error(
    `auditsocials-mcp running (stdio) — ${META.termCount} glossary terms, ${META.license}`,
  );
}

main().catch((err) => {
  console.error("auditsocials-mcp fatal:", err);
  process.exit(1);
});
