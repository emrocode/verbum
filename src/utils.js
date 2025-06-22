export function formatSense(sense) {
  const regex = /^\d+\.\s*\w+\.\s*(.+?)(?:Sin\.|Ant\.|$)/;
  const match = sense.raw.match(regex);
  const extractedText = match ? match[1].trim() : sense.description;

  let raw = `[${sense.meaning_number}] ${sense.category}. ${extractedText}`;

  if (sense.synonyms) raw += `\n[sin.] ${sense.synonyms.join(", ")}`;
  if (sense.antonyms) raw += `\n[ant.] ${sense.antonyms.join(", ")}`;

  return raw;
}
