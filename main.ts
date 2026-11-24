import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-sentence entry for make.fun's "Everyday Wonder"
// bounty: a single sentence on a small moment of wonder in
// everyday life, where the judge rewards surprise. Pass 2:
// the sentence is split at its turn. Why it wins: the
// wonder is quiet and backwards — the old man is the one
// who learned something new that morning, from a child —
// and the elevator doors holding for nobody gives the
// moment a witness that isn't a person at all.
// buildEntryLine() is the single source of truth for the exact
// text; nothing below duplicates the sentence.
const ENTRY_BEATS = [
  "The elevator held its doors for nobody, and for one floor's ride an old man hummed a song his grandson had taught him that morning,",
  "note-perfect, eyes closed, smiling at the ceiling.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
