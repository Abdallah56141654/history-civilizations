import type { Article } from "@/lib/types";

// Drafts, English only for now. Other languages fall back to English with a visible notice.
export const articles: Article[] = [
  {
    id: "article-nile-and-egypt", slug: "how-the-nile-shaped-ancient-egypt", status: "draft", authorId: "editorial-team", updatedAt: "2026-10-05",
    civIds: ["civ-ancient-egypt"], personIds: [], eventIds: ["event-egypt-unification"], placeIds: ["place-giza"],
    sourceIds: ["src-shaw-egypt", "src-wilkinson-egypt"],
    title: { en: "How the Nile Shaped Ancient Egypt" },
    excerpt: { en: "Flood, silt and a river that doubled as a highway: why almost everything in ancient Egypt happened along one narrow valley." },
    body: {
      en: [
        "Almost all of ancient Egypt's population lived along the Nile, in a narrow green strip bordered by desert. Each summer the river flooded and left behind a layer of fertile silt, which made farming possible with very little rain.",
        "The Egyptians organized their year around this cycle: Akhet (inundation), Peret (growing season) and Shemu (harvest). The river was also the main highway. Boats could drift north with the current and sail south against it using the prevailing wind.",
        "The deserts on either side and the cataracts to the south helped protect the country. Many historians link the early rise of a unified state to the need to manage the river valley, although this explanation is debated.",
      ],
    },
    keywords: ["nile", "النيل", "flood", "agriculture", "الزراعة", "inundation"],
  },
  {
    id: "article-augustus-27-bce", slug: "from-republic-to-empire-27-bce", status: "draft", authorId: "editorial-team", updatedAt: "2026-10-05",
    civIds: ["civ-roman-empire"], personIds: ["person-augustus"], eventIds: ["event-actium"], placeIds: ["place-rome"],
    sourceIds: ["src-beard-spqr"],
    title: { en: "From Republic to Empire: Rome in 27 BCE" },
    excerpt: { en: "How Octavian became Augustus without ever calling himself a king, and why the date is a convention rather than a clean break." },
    body: {
      en: [
        "After defeating Mark Antony and Cleopatra at Actium in 31 BCE, Octavian held more power than any Roman before him. In January 27 BCE the Senate granted him the name Augustus.",
        "Augustus avoided the titles of king and dictator. He kept the Senate, the magistracies and elections, while commanding the army and controlling key provinces. Modern historians call this arrangement the Principate.",
        "Whether 27 BCE marks a clean break is debated, because the Republic had been unstable for decades. The date is a convention that many textbooks use to mark the start of imperial Rome.",
      ],
    },
    keywords: ["principate", "republic", "الجمهورية", "emperor", "إمبراطور", "augustus", "أغسطس"],
  },
  {
    id: "article-cuneiform", slug: "cuneiform-writing-in-wedges", status: "draft", authorId: "editorial-team", updatedAt: "2026-10-05",
    civIds: ["civ-mesopotamia"], personIds: ["person-darius-i"], eventIds: [], placeIds: ["place-babylon"],
    sourceIds: ["src-kuhrt-ane", "src-walker-cuneiform"],
    title: { en: "Cuneiform: Writing in Wedges" },
    excerpt: { en: "A script pressed into clay that lasted about three thousand years, and the trilingual inscription that helped unlock it." },
    body: {
      en: [
        "Cuneiform is a writing system made by pressing a reed stylus into wet clay, which leaves wedge-shaped marks. Its earliest forms appear in the city of Uruk in southern Mesopotamia around 3400–3000 BCE and were first used mainly for administrative records.",
        "Over about three thousand years the script was adapted to write several languages, including Sumerian, Akkadian and Hittite.",
        "Modern readers could not read cuneiform until the 19th century. The trilingual Behistun inscription of Darius I, which repeats one text in Old Persian, Elamite and Babylonian, was a key to its decipherment.",
      ],
    },
    keywords: ["writing", "الكتابة", "المسمارية", "cuneiform", "clay tablets", "الألواح الطينية", "behistun", "بيستون", "uruk", "الوركاء"],
  },
  {
    id: "article-persian-governance", slug: "governing-a-vast-empire-the-achaemenid-persians", status: "draft", authorId: "editorial-team", updatedAt: "2026-10-05",
    civIds: ["civ-persian-empire"], personIds: ["person-darius-i", "person-cyrus-the-great"], eventIds: ["event-cyrus-babylon"], placeIds: ["place-persepolis"],
    sourceIds: ["src-briant-persia"],
    title: { en: "Governing a Vast Empire: The Achaemenid Persians" },
    excerpt: { en: "Satrapies, roads and a shared administrative language: how the Persian kings held together lands from the Aegean to the Indus." },
    body: {
      en: [
        "At its height the Achaemenid Empire stretched from the Aegean coast to the Indus. Darius I organized it into provinces called satrapies, each overseen by a governor known as a satrap.",
        "Roads and communication tied the provinces together. Herodotus describes a Royal Road running from Sardis to Susa, and Aramaic served as a common administrative language across much of the empire.",
        "The kings generally let local institutions and customs continue as long as taxes and loyalty were delivered. Our knowledge comes from Persian inscriptions and administrative tablets, and from Greek authors who wrote from an outside and often hostile viewpoint.",
      ],
    },
    keywords: ["satrap", "الساتراب", "royal road", "طريق الملوك", "administration", "الإدارة", "aramaic", "الآرامية"],
  },
  {
    id: "article-maya-glyphs", slug: "reading-maya-hieroglyphs", status: "draft", authorId: "editorial-team", updatedAt: "2026-10-05",
    civIds: ["civ-maya"], personIds: ["person-pakal"], eventIds: [], placeIds: ["place-palenque"],
    sourceIds: ["src-coe-code", "src-coe-maya"],
    title: { en: "Reading Maya Hieroglyphs" },
    excerpt: { en: "A script of word signs and syllables, and the scholars who showed that it records real history." },
    body: {
      en: [
        "Maya writing combines logograms, which stand for whole words, with syllabic signs that spell out sounds. Texts were carved in stone, painted on pottery and written in bark-paper books, of which only a few survive.",
        "For decades scholars doubted that the script recorded spoken language. In the 1950s the Soviet linguist Yuri Knorozov argued that it had a syllabic component, and in 1960 Tatiana Proskouriakoff showed that many inscriptions record the lives of rulers rather than only astronomy and ritual.",
        "A large part of the script can now be read, thanks to the work of many epigraphers in the later 20th century. Inscriptions such as those at Palenque are a major source for the history of Maya dynasties.",
      ],
    },
    keywords: ["hieroglyphs", "الهيروغليفية", "writing", "الكتابة", "knorozov", "epigraphy", "codex"],
  },
];
