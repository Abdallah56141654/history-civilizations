import type { Mystery } from "@/lib/types";

// Each entry separates what is known from what is only proposed. English text for the sections is the fallback for all languages.
// A theory is never written as a fact. Status stays "draft" until a person has checked the claims against the listed sources.
export const mysteries: Mystery[] = [
  {
    id: "mystery-atlantis", slug: "atlantis", civIds: ["civ-ancient-greece", "civ-ancient-egypt"], placeIds: ["place-athens"], personIds: [], status: "draft",
    sourceIds: ["src-plato-timaeus", "src-cartledge-greece"],
    names: { en: "Atlantis", ar: "أطلنطس", de: "Atlantis", fr: "Atlantide", es: "Atlántida", it: "Atlantide", zh: "亚特兰蒂斯" },
    summary: {
      en: "A legendary island state described by Plato. No archaeological site has been identified as Atlantis, and most scholars read the story as a philosophical allegory.",
      ar: "دولة جزيرة أسطورية وصفها أفلاطون. لم يُحدَّد أي موقع أثري على أنه أطلنطس، ويقرأ معظم الباحثين القصة بوصفها رمزية فلسفية.",
    },
    keywords: ["atlantis", "أطلنطس", "أطلانتس", "plato", "أفلاطون", "lost city", "المدينة المفقودة", "timaeus", "critias", "thera", "santorini"],
    sections: {
      know: { en: [
        "Atlantis first appears in two dialogues by Plato, Timaeus and Critias, written around 360 BCE.",
        "Plato describes a powerful island state that fought Athens and was destroyed by earthquakes and floods in a single day and night. He presents the story as one told to the Athenian lawgiver Solon by Egyptian priests.",
      ] },
      evidence: { en: [
        "No surviving source earlier than Plato mentions Atlantis, and no archaeological site has been identified as Atlantis.",
        "Later ancient writers either repeated Plato's account or doubted it. The geographer Strabo reports that Aristotle treated it as Plato's invention.",
      ] },
      unknown: { en: ["It is not known whether Plato drew on any older tradition or invented the story to illustrate his ideas about ideal states."] },
      theories: { en: [
        "Most scholars read Atlantis as a philosophical allegory.",
        "Some have proposed that the story echoes the Bronze Age eruption of Thera (Santorini) or other real disasters. Others have proposed locations from the Atlantic to the Mediterranean. None of these identifications is accepted by scholarly consensus.",
      ] },
      arguments: { en: [
        "For the allegory reading: the tale serves Plato's argument in the Timaeus and Critias, and the dialogues are not historical works.",
        "For a link to Thera: a catastrophic eruption did destroy Minoan settlements in the 17th to 16th century BCE, but its date, scale and details differ greatly from Plato's account.",
      ] },
      uncertainty: { en: ["Level: scholarly consensus holds that no historical Atlantis has been demonstrated. Specific locations are speculation."] },
    },
  },
  {
    id: "mystery-voynich", slug: "voynich-manuscript", civIds: [], placeIds: [], personIds: [], status: "draft",
    sourceIds: ["src-clemens-voynich"],
    names: { en: "The Voynich Manuscript", ar: "مخطوطة فوينيتش", de: "Das Voynich-Manuskript", fr: "Le manuscrit de Voynich", es: "El manuscrito Voynich", it: "Il manoscritto Voynich", zh: "伏尼契手稿" },
    summary: {
      en: "An illustrated codex written in an unidentified script, dated by radiocarbon to the early 15th century. Its text has never been convincingly deciphered.",
      ar: "مخطوطة مصوّرة مكتوبة بخط مجهول، أُرِّخت بالكربون المشع إلى أوائل القرن الخامس عشر. ولم يُفكّ نصها بشكل مقنع حتى اليوم.",
    },
    keywords: ["voynich", "فوينيتش", "manuscript", "مخطوطة", "undeciphered", "cipher", "yale", "beinecke", "codex"],
    sections: {
      know: { en: [
        "The Voynich Manuscript is an illustrated codex of roughly 240 vellum pages written in an unidentified script, with drawings of plants, astronomical diagrams and bathing figures.",
        "It is held at Yale University's Beinecke Rare Book and Manuscript Library. It is named after Wilfrid Voynich, who acquired it in 1912.",
      ] },
      evidence: { en: [
        "Radiocarbon dating of the vellum, carried out in 2009, indicated that the parchment dates to the early 15th century (about 1404 to 1438).",
        "Dating the vellum does not by itself date when the text was written.",
      ] },
      unknown: { en: ["Nobody has demonstrated what language, if any, the text encodes, who wrote it, or why."] },
      theories: { en: [
        "Proposed explanations include a cipher for a known language, an invented language, a hoax, and meaningless text produced for another purpose.",
        "Many claimed decipherments have been published. None has won general acceptance.",
      ] },
      arguments: { en: ["Researchers disagree about how to interpret statistical regularities in the text. They have been used to argue both for a real underlying language and for an elaborate fabrication."] },
      uncertainty: { en: ["Level: undeciphered. Origin and meaning are unresolved, and every explanation is a hypothesis."] },
    },
  },
  {
    id: "mystery-roanoke", slug: "lost-colony-of-roanoke", civIds: [], placeIds: [], personIds: [], status: "draft",
    sourceIds: ["src-horn-roanoke"],
    names: { en: "The Lost Colony of Roanoke", ar: "مستعمرة رونوك المفقودة", de: "Die verschwundene Kolonie Roanoke", fr: "La colonie perdue de Roanoke", es: "La colonia perdida de Roanoke", it: "La colonia perduta di Roanoke", zh: "罗阿诺克“失落殖民地”" },
    summary: {
      en: "An English settlement founded in 1587 on Roanoke Island that was found deserted in 1590. What happened to the settlers is unknown.",
      ar: "مستوطنة إنجليزية أُسست عام 1587 في جزيرة رونوك وُجدت مهجورة عام 1590. ومصير المستوطنين مجهول.",
    },
    keywords: ["roanoke", "رونوك", "lost colony", "croatoan", "john white", "virginia dare", "north carolina", "english colony"],
    sections: {
      know: { en: [
        "In 1587 an English group of more than 100 settlers led by John White landed on Roanoke Island, in present-day North Carolina.",
        "White sailed back to England for supplies. Because of the war with Spain he could not return until 1590, when he found the settlement empty.",
      ] },
      evidence: { en: [
        "White reported that the houses had been taken down and that the word CROATOAN was carved on a post. He had arranged that a carved cross would signal distress, and he found none.",
        "Croatoan was the name of a nearby island and of a Native American community.",
      ] },
      unknown: { en: ["What happened to the settlers is not known."] },
      theories: { en: [
        "The settlers may have moved to Croatoan Island or inland to live among Native communities. Some may have tried to sail to England, and some may have been killed in conflict.",
        "Archaeological work in the region has been proposed as possible evidence of dispersal, but no find has conclusively identified survivors.",
      ] },
      arguments: { en: ["Many historians read the carved name as a sign that the colonists left deliberately for Croatoan, because it was left as a message at a known location."] },
      uncertainty: { en: ["Level: unresolved. Plausible hypotheses exist, and none is proven."] },
    },
  },
  {
    id: "mystery-cleopatra-tomb", slug: "tomb-of-cleopatra", civIds: ["civ-ancient-egypt"], placeIds: ["place-alexandria"], personIds: ["person-cleopatra-vii"], status: "draft",
    sourceIds: ["src-schiff-cleopatra", "src-shaw-egypt"],
    names: { en: "The Tomb of Cleopatra", ar: "قبر كليوباترا", de: "Das Grab der Kleopatra", fr: "Le tombeau de Cléopâtre", es: "La tumba de Cleopatra", it: "La tomba di Cleopatra", zh: "克利奥帕特拉之墓" },
    summary: {
      en: "Ancient authors report that Cleopatra and Mark Antony were buried together in Alexandria. The tomb has never been found.",
      ar: "يروي مؤرخون قدماء أن كليوباترا ومارك أنتوني دُفنا معًا في الإسكندرية. ولم يُعثر على القبر حتى اليوم.",
    },
    keywords: ["cleopatra", "كليوباترا", "tomb", "قبر", "mark antony", "مارك أنطونيوس", "taposiris magna", "طابوزيريس ماجنا", "alexandria", "الإسكندرية"],
    sections: {
      know: { en: [
        "Ancient authors such as Plutarch report that after the deaths of Mark Antony and Cleopatra in 30 BCE, Octavian allowed them to be buried together in Alexandria.",
        "The tomb's location has never been identified.",
      ] },
      evidence: { en: [
        "The written reports come from authors writing more than a century after the events.",
        "Alexandria's ancient royal quarter lies partly under the modern city and partly under the sea, because the coastline has changed through earthquakes and subsidence.",
      ] },
      unknown: { en: ["It is not known whether the tomb survives, or where it is."] },
      theories: { en: [
        "One hypothesis, pursued by an Egyptian-Dominican expedition at Taposiris Magna west of Alexandria since 2005, is that the tomb could lie there. Excavations have uncovered a temple complex, coins and other finds, but no tomb of Cleopatra has been found.",
        "Other proposals place it in the submerged royal quarter or elsewhere in or near Alexandria.",
      ] },
      arguments: { en: ["Supporters of the Taposiris Magna idea point to the temple's association with Isis, whom Cleopatra identified herself with. Critics note that no inscription or find has tied the site to her burial."] },
      uncertainty: { en: ["Level: open question. The ancient reports mention the burial but do not give a location that can be checked."] },
    },
  },
];
export const getMystery = (slug: string) => mysteries.find((m) => m.slug === slug);
