import type { Civilization } from "@/lib/types";

// Seed data. Dates are approximate and conventionally cited. Every entry is `draft`:
// summaries are short orientation text; sources and review are added in the editorial workflow
// (research -> draft -> source verification -> human review -> publish).
const baseCivilizations: Civilization[] = [
  {
    id: "civ-ancient-egypt",
    slug: "ancient-egypt",
    region: "africa",
    startYear: -3100,
    endYear: -30,
    names: { en: "Ancient Egypt", ar: "مصر القديمة", de: "Das alte Ägypten", fr: "L'Égypte antique", es: "Antiguo Egipto", it: "Antico Egitto", zh: "古埃及" },
    summary: {
      en: "A civilization along the lower Nile that was unified under a single ruler around 3100 BCE and lasted about three millennia, known for its pharaohs, monumental tombs and temples, and hieroglyphic writing.",
      ar: "حضارة قامت على ضفاف النيل الأدنى وتوحدت تحت حاكم واحد نحو عام 3100 ق.م، واستمرت قرابة ثلاثة آلاف عام، وعُرفت بفراعنتها ومقابرها ومعابدها الضخمة وكتابتها الهيروغليفية.",
      de: "Eine Zivilisation am unteren Nil, die um 3100 v. Chr. unter einem Herrscher vereint wurde und etwa dreitausend Jahre bestand. Bekannt ist sie für Pharaonen, monumentale Gräber und Tempel sowie die Hieroglyphenschrift.",
    },
    keywords: ["egypt", "مصر", "ägypten", "égypte", "egipto", "egitto", "埃及", "pharaoh", "pharaohs", "فرعون", "الفراعنة", "فراعنة", "pyramids", "الاهرامات", "الأهرامات", "nile", "النيل", "hieroglyphs", "هيروغليفية", "kemet", "cleopatra", "كليوباترا"],
    status: "draft",
    sourceIds: ["src-shaw-egypt", "src-wilkinson-egypt"],
  },
  {
    id: "civ-mesopotamia",
    slug: "mesopotamia",
    region: "middleEast",
    startYear: -3500,
    endYear: -539,
    names: { en: "Mesopotamia", ar: "بلاد الرافدين", de: "Mesopotamien", fr: "Mésopotamie", es: "Mesopotamia", it: "Mesopotamia", zh: "美索不达米亚" },
    summary: {
      en: "The land between the Tigris and Euphrates, home to Sumer, Akkad, Babylon and Assyria, where early cities, cuneiform writing and some of the oldest known law codes developed.",
      ar: "الأرض الواقعة بين نهري دجلة والفرات، موطن سومر وأكاد وبابل وآشور، حيث نشأت المدن الأولى والكتابة المسمارية وبعض أقدم القوانين المعروفة.",
      de: "Das Land zwischen Euphrat und Tigris, Heimat von Sumer, Akkad, Babylon und Assyrien, in dem frühe Städte, die Keilschrift und einige der ältesten bekannten Gesetzessammlungen entstanden.",
    },
    keywords: ["sumer", "سومر", "akkad", "أكد", "babylon", "بابل", "assyria", "آشور", "iraq", "العراق", "mesopotamie", "mesopotamien", "cuneiform", "المسمارية", "tigris", "euphrates", "دجلة", "الفرات", "mesopotamia"],
    status: "draft",
    sourceIds: ["src-kuhrt-ane", "src-roth-laws"],
  },
  {
    id: "civ-ancient-greece",
    slug: "ancient-greece",
    region: "europe",
    startYear: -800,
    endYear: -146,
    names: { en: "Ancient Greece", ar: "اليونان القديمة", de: "Das antike Griechenland", fr: "La Grèce antique", es: "Antigua Grecia", it: "Antica Grecia", zh: "古希腊" },
    summary: {
      en: "A network of independent city-states, including Athens and Sparta, that shaped Western philosophy, drama, mathematics and political thought before coming under Roman control in the 2nd century BCE.",
      ar: "شبكة من دول المدن المستقلة، منها أثينا وإسبرطة، أسهمت في تشكيل الفلسفة والدراما والرياضيات والفكر السياسي في الغرب، قبل أن تخضع للسيطرة الرومانية في القرن الثاني قبل الميلاد.",
      de: "Ein Netz unabhängiger Stadtstaaten, darunter Athen und Sparta, das die westliche Philosophie, das Drama, die Mathematik und das politische Denken prägte, bevor es im 2. Jahrhundert v. Chr. unter römische Herrschaft kam.",
    },
    keywords: ["greece", "اليونان", "إغريق", "الاغريق", "griechenland", "grèce", "grecia", "希腊", "athens", "أثينا", "sparta", "إسبرطة", "hellenic", "hellenistic", "plato", "أفلاطون", "socrates", "سقراط", "aristotle", "أرسطو"],
    status: "draft",
    sourceIds: ["src-cartledge-greece"],
  },
  {
    id: "civ-roman-empire",
    slug: "roman-empire",
    region: "europe",
    startYear: -27,
    endYear: 476,
    names: { en: "Roman Empire", ar: "الإمبراطورية الرومانية", de: "Römisches Reich", fr: "Empire romain", es: "Imperio romano", it: "Impero romano", zh: "罗马帝国" },
    summary: {
      en: "A Mediterranean empire that grew from the city of Rome. The imperial period began in 27 BCE under Augustus; the Western Empire ended in 476 CE, while the Eastern half continued as the Byzantine Empire.",
      ar: "إمبراطورية متوسطية نمت انطلاقًا من مدينة روما. بدأ العهد الإمبراطوري عام 27 ق.م في عهد أغسطس، وانتهت الإمبراطورية الغربية عام 476 م، بينما استمر شطرها الشرقي بوصفه الإمبراطورية البيزنطية.",
      de: "Ein Mittelmeerreich, das von der Stadt Rom ausging. Die Kaiserzeit begann 27 v. Chr. unter Augustus; das Westreich endete 476 n. Chr., während die östliche Hälfte als Byzantinisches Reich fortbestand.",
    },
    keywords: ["rome", "روما", "rom", "roma", "罗马", "romans", "الرومان", "caesar", "قيصر", "augustus", "أغسطس", "byzantine", "بيزنطة", "latin", "italy"],
    status: "draft",
    sourceIds: ["src-beard-spqr"],
  },
  {
    id: "civ-persian-empire",
    slug: "persian-empire",
    region: "middleEast",
    startYear: -550,
    endYear: -330,
    names: { en: "Persian Empire (Achaemenid)", ar: "الإمبراطورية الفارسية (الأخمينية)", de: "Persisches Reich (Achämeniden)", fr: "Empire perse (Achéménides)", es: "Imperio persa (Aqueménida)", it: "Impero persiano (Achemenide)", zh: "波斯帝国（阿契美尼德）" },
    summary: {
      en: "The Achaemenid Empire, founded by Cyrus the Great around 550 BCE, stretched from Anatolia and Egypt to the Indus valley until its conquest by Alexander the Great in the 330s BCE.",
      ar: "الإمبراطورية الأخمينية التي أسسها قورش الكبير نحو عام 550 ق.م، وامتدت من الأناضول ومصر إلى وادي السند حتى فتحها الإسكندر الأكبر في ثلاثينيات القرن الرابع قبل الميلاد.",
      de: "Das Reich der Achämeniden, um 550 v. Chr. von Kyros dem Großen gegründet, reichte von Anatolien und Ägypten bis zum Indus-Tal, bis Alexander der Große es in den 330er-Jahren v. Chr. eroberte.",
    },
    keywords: ["persia", "فارس", "persien", "perse", "persia", "波斯", "iran", "إيران", "achaemenid", "الأخمينية", "cyrus", "قورش", "darius", "داريوس", "persepolis", "برسيبوليس"],
    status: "draft",
    sourceIds: ["src-briant-persia", "src-kuhrt-ane"],
  },
  {
    id: "civ-maya",
    slug: "maya",
    region: "americas",
    startYear: -2000,
    endYear: 1697,
    names: { en: "Maya Civilization", ar: "حضارة المايا", de: "Maya-Zivilisation", fr: "Civilisation maya", es: "Civilización maya", it: "Civiltà maya", zh: "玛雅文明" },
    summary: {
      en: "A Mesoamerican civilization of city-states in present-day Mexico, Guatemala, Belize and Honduras, known for hieroglyphic writing, a sophisticated calendar and astronomy. Its period spans from early villages to the last independent Maya city in 1697 CE.",
      ar: "حضارة من أمريكا الوسطى قامت على دول المدن في المكسيك وغواتيمالا وبليز وهندوراس الحالية، وعُرفت بالكتابة الهيروغليفية وتقويم متقدم وعلم الفلك. وتمتد فترتها من القرى الأولى إلى سقوط آخر مدينة مايا مستقلة عام 1697 م.",
      de: "Eine mesoamerikanische Zivilisation von Stadtstaaten im heutigen Mexiko, Guatemala, Belize und Honduras, bekannt für Hieroglyphenschrift, einen ausgefeilten Kalender und Astronomie. Ihr Zeitraum reicht von frühen Dörfern bis zur letzten unabhängigen Maya-Stadt 1697 n. Chr.",
    },
    keywords: ["maya", "المايا", "mayas", "玛雅", "mesoamerica", "tikal", "تيكال", "chichen itza", "yucatan", "guatemala", "mexico"],
    status: "draft",
    sourceIds: ["src-coe-maya", "src-coe-code"],
  },
];

import { extraCivilizations } from "./civilizations-extra.ts";
// Normalise: records without sources get an empty list so every page can rely on `sourceIds` being an array.
export const civilizations: Civilization[] = [...baseCivilizations, ...extraCivilizations].map((c) => ({ ...c, sourceIds: c.sourceIds ?? [] }));

export const regionKeys = ["africa", "middleEast", "europe", "asia", "americas"] as const;

export function getCivilization(slug: string) {
  return civilizations.find((c) => c.slug === slug);
}
