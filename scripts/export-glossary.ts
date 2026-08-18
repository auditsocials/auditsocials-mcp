// Regenerates the bundled glossary snapshot from the main app data source.
// Run from repo root:  npx tsx packages/auditsocials-mcp/scripts/export-glossary.ts
import { writeFileSync } from "node:fs";
import { GLOSSARY_TERMS } from "../../../src/data/glossary-terms";

const out = {
  meta: {
    title: "AuditSocials Social Media Advertising Compliance Glossary",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    doi: "10.5281/zenodo.20458599",
    source: "https://www.auditsocials.com/knowledge/glossary",
    namespace: "https://w3id.org/auditsocials/glossary/",
    termCount: GLOSSARY_TERMS.length,
  },
  terms: GLOSSARY_TERMS,
};
writeFileSync(
  new URL("../src/data/glossary.json", import.meta.url),
  JSON.stringify(out, null, 2),
);
console.log(`exported ${GLOSSARY_TERMS.length} terms`);
