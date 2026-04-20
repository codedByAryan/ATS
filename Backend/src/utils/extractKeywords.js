import normalizeText from "./normalizeText.js";

const STOP_WORDS = new Set([
  "the",
  "and",
  "or",
  "for",
  "with",
  "a",
  "an",
  "to",
  "of",
  "in",
  "on",
  "at",
  "by",
  "is",
  "are",
  "as",
  "be",
  "this",
  "that",
  "from",
  "will",
  "can",
  "your",
  "you",
  "our",
  "we",
  "us",
  "has",
  "have",
  "had",
  "should",
  "must",
  "job",
  "role",
  "candidate",
  "experience",
  "years",
  "year",
  "looking",
  "work",
  "working",
  "responsible",
  "skills",
  "skill"
]);

const extractKeywords = (text = "") => {
  const cleaned = normalizeText(text);

  const words = cleaned.split(" ").filter((word) => {
    return word.length > 2 && !STOP_WORDS.has(word);
  });

  return [...new Set(words)];
};

export default extractKeywords;