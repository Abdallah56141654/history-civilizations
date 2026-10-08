import en from "./dictionaries/en.json";
import ar from "./dictionaries/ar.json";
import de from "./dictionaries/de.json";
import fr from "./dictionaries/fr.json";
import es from "./dictionaries/es.json";
import it from "./dictionaries/it.json";
import zh from "./dictionaries/zh.json";
import type { Lang } from "./config";

export type Dictionary = typeof en;

const dictionaries: Record<Lang, Dictionary> = { en, ar, de, fr, es, it, zh };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
