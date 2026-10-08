import type { CompareDim, Localized } from "@/lib/types";

// Short orientation text for the comparison tool, keyed by civilization id. English only for now (fallback + notice).
// Descriptive, not evaluative. Add a civilization here and it becomes comparable with every other one.
export const COMPARE_DIMS: CompareDim[] = ["geography", "government", "religion", "writing", "architecture", "economy"];

const en = (s: string): Localized => ({ en: s });

export const profiles: Record<string, Record<CompareDim, Localized>> = {
  "civ-ancient-egypt": {
    geography: en("The Nile valley and delta in northeastern Africa, bordered by desert on both sides."),
    government: en("A monarchy ruled by pharaohs, supported by a large bureaucracy of officials and scribes."),
    religion: en("Polytheistic. Gods such as Ra, Isis and Osiris were worshipped in temples, with strong beliefs about the afterlife."),
    writing: en("Hieroglyphs for monumental texts, with hieratic and later demotic scripts for everyday writing, usually on papyrus."),
    architecture: en("Monumental stone building: pyramids, temples with massive columns, and rock-cut tombs."),
    economy: en("Based on Nile agriculture, especially grain, with state-organized storage and taxation, and trade in goods such as gold, papyrus and linen."),
  },
  "civ-mesopotamia": {
    geography: en("The land between the Tigris and Euphrates rivers, largely in present-day Iraq, with flat river plains and little stone or timber."),
    government: en("Mostly independent city-states, later united in territorial kingdoms and empires such as Akkad, Babylon and Assyria."),
    religion: en("Polytheistic. Each city had a patron god, and temple towers called ziggurats were central in many cities."),
    writing: en("Cuneiform on clay tablets, used for administration, literature and law across many languages."),
    architecture: en("Mud-brick construction, including ziggurats, palaces and city walls."),
    economy: en("Irrigated agriculture along the rivers, long-distance trade for metals, stone and timber, and temple and palace administration."),
  },
  "civ-ancient-greece": {
    geography: en("The Greek mainland, the Aegean islands and colonies around the Mediterranean and Black Sea, with mountainous terrain and a long coastline."),
    government: en("Independent city-states with varied systems, including monarchy, oligarchy, tyranny and, in Athens, a direct democracy for male citizens."),
    religion: en("Polytheistic. Olympian gods such as Zeus and Athena were honored in city cults, festivals and shared sanctuaries like Delphi and Olympia."),
    writing: en("The Greek alphabet, adapted from Phoenician script, with vowels written as separate letters."),
    architecture: en("Temples built in the Doric, Ionic and Corinthian orders, plus theaters and open public spaces called agoras."),
    economy: en("Farming of olives, grain and grapes, seafaring trade, and slave labor. Coinage spread widely."),
  },
  "civ-roman-empire": {
    geography: en("Centered on Italy and, at its height, ringing the Mediterranean from Britain to Egypt and parts of the Near East."),
    government: en("A republic until the late 1st century BCE, then an empire ruled by emperors alongside the Senate and a large provincial administration."),
    religion: en("Polytheistic state cults that adopted many foreign deities. Christianity spread within the empire and was favored from the 4th century CE."),
    writing: en("Latin, written in the Latin alphabet, which is the ancestor of the alphabet used for many modern languages."),
    architecture: en("Concrete, arches and vaults enabled structures like the Colosseum, aqueducts, baths and roads."),
    economy: en("Agriculture, large-scale trade across the Mediterranean, taxation, standardized coinage and widespread slavery."),
  },
  "civ-persian-empire": {
    geography: en("The Iranian plateau and a vast territory from Anatolia and Egypt to Central Asia and the Indus valley."),
    government: en("A monarchy ruled by the King of Kings, with provinces called satrapies run by governors known as satraps."),
    religion: en("Royal inscriptions honor Ahura Mazda. How this relates to Zoroastrianism is debated, and local religions were generally tolerated."),
    writing: en("Old Persian cuneiform for royal inscriptions, with Aramaic widely used for administration."),
    architecture: en("Palace complexes with large columned halls and monumental stairways, as at Persepolis."),
    economy: en("Tribute and taxes from the provinces, regulated coinage such as the gold daric, and trade along imperial roads."),
  },
  "civ-maya": {
    geography: en("The Yucatán Peninsula and neighboring lowlands and highlands in present-day Mexico, Guatemala, Belize and Honduras."),
    government: en("Independent city-states ruled by divine kings known as k'uhul ajaw, sometimes allied and sometimes in conflict."),
    religion: en("Polytheistic, with rituals tied to a sacred calendar and to kingship."),
    writing: en("A logo-syllabic hieroglyphic script carved on stone and written in bark-paper books."),
    architecture: en("Stepped temple-pyramids, palaces and plazas built of limestone, often with carved inscriptions."),
    economy: en("Maize-based agriculture, with trade in goods such as jade, obsidian, cacao and salt."),
  },
};
