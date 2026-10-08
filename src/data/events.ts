import type { HistoricalEvent } from "@/lib/types";

export const events: HistoricalEvent[] = [
  {
    id: "event-egypt-unification", slug: "unification-of-egypt", civIds: ["civ-ancient-egypt"], personIds: [], placeIds: [], year: -3100, approx: true, status: "draft", sourceIds: ["src-shaw-egypt", "src-wilkinson-egypt"],
    names: { en: "Unification of Egypt (traditional date)", ar: "توحيد مصر (تاريخ تقليدي)", de: "Einigung Ägyptens (traditionelles Datum)", fr: "Unification de l'Égypte (date traditionnelle)", es: "Unificación de Egipto (fecha tradicional)", it: "Unificazione dell'Egitto (data tradizionale)", zh: "埃及统一（传统年代）" },
    summary: {
      en: "By tradition, Upper and Lower Egypt were joined under a single ruler around 3100 BCE. The date is approximate, and scholars debate how the unification actually happened.",
      ar: "تفيد التقاليد بأن مصر العليا والسفلى اتحدتا تحت حاكم واحد نحو عام 3100 ق.م. والتاريخ تقريبي، ويختلف الباحثون في كيفية حدوث التوحيد فعليًا.",
    },
    keywords: ["narmer", "نعرمر", "menes", "مينا", "first dynasty", "الأسرة الأولى", "upper egypt", "lower egypt"],
  },
  {
    id: "event-hammurabi-stele", slug: "hammurabi-law-stele", civIds: ["civ-mesopotamia"], personIds: ["person-hammurabi"], placeIds: ["place-babylon"], year: -1754, approx: true, status: "draft", sourceIds: ["src-roth-laws", "src-kuhrt-ane"],
    names: { en: "Hammurabi's law stele", ar: "مسلة قوانين حمورابي", de: "Stele mit dem Kodex Hammurabi", fr: "Stèle du code d'Hammurabi", es: "Estela del código de Hammurabi", it: "Stele del codice di Hammurabi", zh: "汉谟拉比法典石碑" },
    summary: {
      en: "A stone stele carrying a prologue, some 280 legal provisions and an epilogue was set up under Hammurabi of Babylon. It was found at Susa in 1901–1902 and is now in the Louvre.",
      ar: "مسلة حجرية تحمل مقدمة ونحو 280 مادة قانونية وخاتمة أقيمت في عهد حمورابي ملك بابل. عُثر عليها في سوسة عامي 1901–1902 وهي اليوم في متحف اللوفر.",
    },
    keywords: ["code of hammurabi", "شريعة حمورابي", "قانون حمورابي", "laws", "louvre", "اللوفر", "susa", "سوسة"],
  },
  {
    id: "event-cyrus-babylon", slug: "persian-conquest-of-babylon", monthDay: [10, 12], civIds: ["civ-persian-empire", "civ-mesopotamia"], personIds: ["person-cyrus-the-great"], placeIds: ["place-babylon"], year: -539, status: "draft", sourceIds: ["src-briant-persia", "src-kuhrt-ane"],
    names: { en: "Persian conquest of Babylon", ar: "الفتح الفارسي لبابل", de: "Persische Eroberung Babylons", fr: "Conquête de Babylone par les Perses", es: "Conquista persa de Babilonia", it: "Conquista persiana di Babilonia", zh: "波斯征服巴比伦" },
    summary: {
      en: "In 539 BCE the army of Cyrus took Babylon, ending the Neo-Babylonian kingdom and bringing Mesopotamia into the Achaemenid Empire.",
      ar: "في عام 539 ق.م دخل جيش قورش بابل، فانتهت المملكة البابلية الحديثة وصارت بلاد الرافدين جزءًا من الإمبراطورية الأخمينية.",
    },
    keywords: ["cyrus", "قورش", "babylon", "بابل", "neo-babylonian", "nabonidus", "نابونيد"],
  },
  {
    id: "event-marathon", slug: "battle-of-marathon", civIds: ["civ-ancient-greece", "civ-persian-empire"], personIds: ["person-darius-i"], placeIds: [], year: -490, status: "draft", sourceIds: ["src-cartledge-greece", "src-briant-persia"],
    names: { en: "Battle of Marathon", ar: "معركة ماراثون", de: "Schlacht bei Marathon", fr: "Bataille de Marathon", es: "Batalla de Maratón", it: "Battaglia di Maratona", zh: "马拉松战役" },
    summary: {
      en: "In 490 BCE an Athenian-led force defeated a Persian expeditionary force at Marathon in Attica, during the first Persian invasion of Greece.",
      ar: "في عام 490 ق.م هزمت قوة بقيادة أثينا قوة فارسية استكشافية في ماراثون بإقليم أتيكا، خلال الغزو الفارسي الأول لليونان.",
    },
    keywords: ["marathon", "ماراثون", "persian wars", "الحروب الفارسية", "athens", "أثينا", "greco-persian"],
  },
  {
    id: "event-gaugamela", slug: "battle-of-gaugamela", monthDay: [10, 1], civIds: ["civ-ancient-greece", "civ-persian-empire"], personIds: ["person-alexander-the-great"], placeIds: [], year: -331, status: "draft", sourceIds: ["src-briant-persia"],
    names: { en: "Battle of Gaugamela", ar: "معركة غوغميلا", de: "Schlacht von Gaugamela", fr: "Bataille de Gaugamèles", es: "Batalla de Gaugamela", it: "Battaglia di Gaugamela", zh: "高加米拉战役" },
    summary: {
      en: "In 331 BCE Alexander the Great defeated the Persian king Darius III at Gaugamela in northern Mesopotamia, a decisive battle in the conquest of the Achaemenid Empire.",
      ar: "في عام 331 ق.م هزم الإسكندر الأكبر الملك الفارسي داريوس الثالث في غوغميلا بشمال بلاد الرافدين، وهي معركة حاسمة في فتح الإمبراطورية الأخمينية.",
    },
    keywords: ["alexander", "الإسكندر", "darius iii", "داريوس الثالث", "arbela", "أربيل"],
  },
  {
    id: "event-caesar-assassination", slug: "assassination-of-julius-caesar", monthDay: [3, 15], civIds: ["civ-roman-empire"], personIds: ["person-julius-caesar"], placeIds: ["place-rome"], year: -44, status: "draft", sourceIds: ["src-beard-spqr"],
    names: { en: "Assassination of Julius Caesar", ar: "اغتيال يوليوس قيصر", de: "Ermordung Caesars", fr: "Assassinat de Jules César", es: "Asesinato de Julio César", it: "Assassinio di Giulio Cesare", zh: "凯撒遇刺" },
    summary: {
      en: "On 15 March 44 BCE Julius Caesar was killed in Rome by a group of senators. The killing did not restore the Republic and was followed by new civil wars.",
      ar: "في 15 مارس 44 ق.م قتلت مجموعة من أعضاء مجلس الشيوخ يوليوس قيصر في روما. ولم يُعِد القتل الجمهورية، بل تبعته حروب أهلية جديدة.",
    },
    keywords: ["ides of march", "brutus", "بروتوس", "cassius", "senate", "مجلس الشيوخ"],
  },
  {
    id: "event-actium", slug: "battle-of-actium", monthDay: [9, 2], civIds: ["civ-roman-empire", "civ-ancient-egypt"], personIds: ["person-augustus", "person-cleopatra-vii"], placeIds: [], year: -31, status: "draft", sourceIds: ["src-beard-spqr", "src-shaw-egypt"],
    names: { en: "Battle of Actium", ar: "معركة أكتيوم", de: "Schlacht bei Aktium", fr: "Bataille d'Actium", es: "Batalla de Accio", it: "Battaglia di Azio", zh: "亚克兴海战" },
    summary: {
      en: "In 31 BCE the fleet of Octavian defeated the forces of Mark Antony and Cleopatra off Actium in western Greece. In 30 BCE Octavian took Alexandria and Egypt came under Roman control.",
      ar: "في عام 31 ق.م هزم أسطول أوكتافيان قوات مارك أنتوني وكليوباترا قبالة أكتيوم في غرب اليونان. وفي 30 ق.م دخل أوكتافيان الإسكندرية وخضعت مصر للسيطرة الرومانية.",
    },
    keywords: ["octavian", "أوكتافيان", "mark antony", "مارك أنطونيوس", "cleopatra", "كليوباترا", "naval battle"],
  },
  {
    id: "event-fall-western-rome", slug: "fall-of-the-western-roman-empire", monthDay: [9, 4], civIds: ["civ-roman-empire"], personIds: [], placeIds: ["place-rome"], year: 476, status: "draft", sourceIds: ["src-beard-spqr"],
    names: { en: "Fall of the Western Roman Empire", ar: "سقوط الإمبراطورية الرومانية الغربية", de: "Untergang des Weströmischen Reiches", fr: "Chute de l'Empire romain d'Occident", es: "Caída del Imperio romano de Occidente", it: "Caduta dell'Impero romano d'Occidente", zh: "西罗马帝国灭亡" },
    summary: {
      en: "In 476 CE the Germanic commander Odoacer deposed the last western emperor, Romulus Augustulus. Historians often use this date as a convenient marker, although the decline of the Western Empire was gradual.",
      ar: "في عام 476 م عزل القائد الجرماني أودواكر آخر أباطرة الغرب، رومولوس أغسطولوس. يستخدم المؤرخون هذا التاريخ كعلامة مناسبة، رغم أن تراجع الإمبراطورية الغربية كان تدريجيًا.",
    },
    keywords: ["odoacer", "أودواكر", "romulus augustulus", "decline of rome", "سقوط روما", "476"],
  },
];
