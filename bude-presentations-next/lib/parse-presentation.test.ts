import { describe, expect, it } from "vitest";

import { normalizeBackticks, parsePresentationSource } from "./parse-presentation";

const BT = "`";

describe("normalizeBackticks", () => {
  it("converts a value-position backtick block into a JSON string", () => {
    const input = `{ "code": ${BT}const x = 1;${BT} }`;
    expect(JSON.parse(normalizeBackticks(input))).toEqual({
      code: "const x = 1;",
    });
  });

  it("escapes embedded double quotes", () => {
    const input = `{ "code": ${BT}say "hi"${BT} }`;
    expect(JSON.parse(normalizeBackticks(input))).toEqual({ code: 'say "hi"' });
  });

  it("converts literal newlines and tabs to escapes", () => {
    const input = `{ "code": ${BT}line1\n\tline2${BT} }`;
    expect(JSON.parse(normalizeBackticks(input))).toEqual({
      code: "line1\n\tline2",
    });
  });

  it("decodes template-literal backtick escapes (\\` -> `)", () => {
    // value content is: tag\`x\`  -> should decode to tag`x`
    const input = `{ "code": ${BT}tag\\${BT}x\\${BT}${BT} }`;
    expect(JSON.parse(normalizeBackticks(input))).toEqual({ code: "tag`x`" });
  });

  it("leaves inline backticks inside a normal double-quoted value untouched", () => {
    // This is the intro-retool bug: backticks used as markdown emphasis
    // inside a string must NOT trigger the regex (it anchors on \": <backtick>).
    const input = `{ "note": "use ${BT}code${BT} here, never this: ${BT}DROP${BT}" }`;
    const out = normalizeBackticks(input);
    expect(JSON.parse(out)).toEqual({
      note: `use ${BT}code${BT} here, never this: ${BT}DROP${BT}`,
    });
  });
});

describe("parsePresentationSource", () => {
  it("parses plain JSON", () => {
    expect(parsePresentationSource('{"presentation":{"topics":[]}}')).toEqual({
      presentation: { topics: [] },
    });
  });

  it("parses JSON5 with trailing commas", () => {
    expect(
      parsePresentationSource('{ "presentation": { "topics": [], }, }'),
    ).toEqual({ presentation: { topics: [] } });
  });

  it("parses a file whose code block uses backticks", () => {
    const src = `{ "presentation": { "topics": [ { "slides": [ { "type": "content", "box": { "code": ${BT}a\nb${BT} } } ] } ] } }`;
    const obj = parsePresentationSource(src) as {
      presentation: { topics: { slides: { box: { code: string } }[] }[] };
    };
    expect(obj.presentation.topics[0].slides[0].box.code).toBe("a\nb");
  });

  it("aliases `modules` to `topics` while keeping the original", () => {
    const obj = parsePresentationSource(
      '{"presentation":{"modules":[{"slides":[]}]}}',
    ) as { presentation: { topics: unknown[]; modules: unknown[] } };
    expect(obj.presentation.topics).toHaveLength(1);
    expect(obj.presentation.modules).toHaveLength(1);
  });

  it("does not overwrite topics when both topics and modules exist", () => {
    const obj = parsePresentationSource(
      '{"presentation":{"topics":[{"id":"a","slides":[]}],"modules":[{"id":"b","slides":[]}]}}',
    ) as { presentation: { topics: { id: string }[] } };
    expect(obj.presentation.topics[0].id).toBe("a");
  });
});
