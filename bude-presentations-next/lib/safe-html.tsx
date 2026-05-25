"use client";

import DOMPurify from "isomorphic-dompurify";

// Force external links opened in a new tab to be safe against reverse
// tabnabbing. Registered once at module load (idempotent).
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A" && node.getAttribute("target") === "_blank") {
    node.setAttribute("rel", "noopener noreferrer");
  }
});

const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    // Inline
    "b", "i", "em", "strong", "u", "s", "sub", "sup", "br",
    "code", "kbd", "mark", "small", "span", "a",
    // Block (existing JSONs lean on <p>, <h4>, <ul>, <li>, etc.)
    "p", "h1", "h2", "h3", "h4", "h5", "h6",
    "ul", "ol", "li", "blockquote", "hr", "div",
  ],
  ALLOWED_ATTR: ["href", "target", "rel", "class", "title"],
};

interface SafeHTMLProps {
  html: string;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3";
  className?: string;
}

export function SafeHTML({ html, as: Tag = "span", className }: SafeHTMLProps) {
  const clean = DOMPurify.sanitize(html, PURIFY_CONFIG);
  return (
    <Tag
      className={className}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized by DOMPurify
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
