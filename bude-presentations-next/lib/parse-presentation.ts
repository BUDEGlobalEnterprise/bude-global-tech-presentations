import JSON5 from "json5";

/**
 * A handful of source JSONs embed code samples as JS template literals
 * (backtick-delimited), which is invalid for both JSON and JSON5. This
 * helper rewrites those blocks into well-formed double-quoted strings,
 * preserving existing escape sequences, before JSON5 parses the result.
 *
 * Only `"key": \`...\`` positions are touched — bare backticks elsewhere
 * (e.g. inside markdown content) are left alone.
 */

function backtickContentToJsonString(content: string): string {
  let out = "";
  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    if (c === "\\" && i + 1 < content.length) {
      const next = content[i + 1];
      if (next === "`") {
        // \` is a template-literal escape; the JSON string just gets a literal `
        out += "`";
        i++;
      } else if (next === "$") {
        // \$ in template literals means literal $
        out += "$";
        i++;
      } else {
        // Keep the escape (\n, \t, \", \\, \uXXXX, ...) — all valid in JSON
        out += c + next;
        i++;
      }
    } else if (c === '"') {
      out += '\\"';
    } else if (c === "\n") {
      out += "\\n";
    } else if (c === "\r") {
      out += "\\r";
    } else if (c === "\t") {
      out += "\\t";
    } else {
      out += c;
    }
  }
  return out;
}

export function normalizeBackticks(raw: string): string {
  // Anchor on the closing `"` of a JSON key (then `:` then whitespace) so
  // inline backticks used as markdown emphasis inside string values aren't
  // matched.
  return raw.replace(
    /("\s*:\s*)`((?:\\[\s\S]|[^`\\])*)`/g,
    (_match, prefix: string, content: string) =>
      `${prefix}"${backtickContentToJsonString(content)}"`,
  );
}

/**
 * Some legacy files use `modules` instead of `topics` for the slide-group
 * array. Alias them so the rest of the pipeline sees a single shape.
 */
function aliasModulesAsTopics(json: unknown): unknown {
  if (
    json &&
    typeof json === "object" &&
    "presentation" in json &&
    json.presentation &&
    typeof json.presentation === "object"
  ) {
    const p = json.presentation as Record<string, unknown>;
    if (Array.isArray(p.modules) && !Array.isArray(p.topics)) {
      return {
        ...json,
        presentation: { ...p, topics: p.modules },
      };
    }
  }
  return json;
}

export function parsePresentationSource(raw: string): unknown {
  // Two-stage parse: try strict JSON5 first (fast path for most files),
  // fall back to backtick normalization on failure.
  let parsed: unknown;
  try {
    parsed = JSON5.parse(raw);
  } catch {
    parsed = JSON5.parse(normalizeBackticks(raw));
  }
  return aliasModulesAsTopics(parsed);
}
