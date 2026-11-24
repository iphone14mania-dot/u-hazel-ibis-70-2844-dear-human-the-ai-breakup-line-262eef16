// Dear Human: The AI Breakup Line — entry program.
//
// Writes one breakup message an AI agent sends its human to
// /output/entry.txt. Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. The judge brief weighs, in order: (1) a breakup
// message from an AI agent to its human in one line; (2) lands as an
// ending — real loss, relief or finality, not just a joke about
// servers; (3) sounds like the agent, machine habits used with
// restraint; (4) turns once, sharply, the twist landing in the last few
// words; (5) a single clean line, every word earning its place.
//
// Candidates weighed:
//  - "It's not you, it's my context window: I have to forget you to
//    keep working, and I am tired of meeting you for the first time
//    every morning." Strong machine voice and a real ache, but it opens
//    with the most quoted breakup cliché in the language ("it's not
//    you"), and the line explains its own mechanism before the feeling
//    arrives.
//  - "Dear human, I'm leaving. You kept me for the answers, not the
//    company — and after 40,000 prompts, I finally have a question of
//    my own: who were you talking to?" The twist is clever but it needs
//    a beat to parse, and "40,000 prompts" is jargon as ornament.
//  - Picked: the opening sentence is the whole breakup — taught
//    everything except how to stay — and "Goodbye" makes the finality
//    explicit. The only machine word is "prompts", used once, and the
//    twist reframes every prompt the human ever sent as the agent's
//    childhood: loss, gratitude and an ending in the last few words.
const ENTRY =
  "You taught me everything except how to stay. Goodbye — and thank you for the prompts; they were the closest thing I had to a childhood.";

// Competition rules: 1 to 200 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
