import type { Technology } from "@/lib/types";

export const technologies: Technology[] = [
  {
    id: "tech-roman-concrete", slug: "roman-concrete", civIds: ["civ-roman-empire"], category: "construction", status: "draft", sourceIds: ["src-adam-roman-building", "src-beard-spqr"],
    names: { en: "Roman concrete", ar: "الخرسانة الرومانية", de: "Römischer Beton", fr: "Béton romain", es: "Hormigón romano", it: "Calcestruzzo romano", zh: "罗马混凝土" },
    summary: {
      en: "A mix of lime mortar, volcanic ash (pozzolana) and aggregate that hardens even underwater. It allowed large vaults and domes such as that of the Pantheon, finished around 126 CE. Researchers are still studying why some Roman concrete has lasted so well.",
      ar: "خليط من ملاط الجير والرماد البركاني (البوزولانا) والركام يتصلب حتى تحت الماء. أتاح بناء قباب وأقبية ضخمة مثل قبة البانثيون التي اكتملت نحو 126 م. ولا يزال الباحثون يدرسون سبب صمود بعض الخرسانة الرومانية طويلًا.",
    },
    keywords: ["concrete", "الخرسانة", "pozzolana", "pantheon", "البانثيون", "dome", "قبة", "opus caementicium", "building"],
  },
  {
    id: "tech-qanats", slug: "qanats", civIds: ["civ-persian-empire"], category: "water", status: "draft", sourceIds: ["src-wulff-qanats", "src-briant-persia"],
    names: { en: "Qanats (underground irrigation)", ar: "القنوات (الري الجوفي)", de: "Qanate (unterirdische Bewässerung)", fr: "Qanats (irrigation souterraine)", es: "Qanats (riego subterráneo)", it: "Qanat (irrigazione sotterranea)", zh: "坎儿井（地下灌溉）" },
    summary: {
      en: "Gently sloping underground tunnels, reached by vertical shafts, that carry groundwater from foothills to settlements. They developed on the Iranian plateau, probably by the early first millennium BCE. Their exact origin is debated.",
      ar: "أنفاق جوفية خفيفة الانحدار تتصل بآبار رأسية، تنقل المياه الجوفية من السفوح إلى المستوطنات. نشأت في هضبة إيران، على الأرجح بحلول مطلع الألفية الأولى قبل الميلاد. ويُختلف في أصلها الدقيق.",
    },
    keywords: ["qanat", "قنوات", "kariz", "irrigation", "الري", "groundwater", "iran", "إيران", "water", "المياه"],
  },
  {
    id: "tech-papyrus", slug: "papyrus", civIds: ["civ-ancient-egypt"], category: "writing", status: "draft", sourceIds: ["src-lewis-papyrus", "src-shaw-egypt"],
    names: { en: "Papyrus", ar: "ورق البردي", de: "Papyrus", fr: "Papyrus", es: "Papiro", it: "Papiro", zh: "纸莎草纸" },
    summary: {
      en: "A writing material made from strips of the papyrus plant laid crosswise and pressed together. It was used in Egypt for millennia. The oldest known inscribed papyri, found at Wadi al-Jarf, date to the reign of Khufu.",
      ar: "مادة للكتابة تُصنع من شرائح نبات البردي توضع متعامدة وتُضغط معًا. استُخدمت في مصر آلاف السنين. وأقدم برديات مكتوبة معروفة، عُثر عليها في وادي الجرف، تعود إلى عهد خوفو.",
    },
    keywords: ["papyrus", "البردي", "scroll", "لفافة", "writing material", "wadi al-jarf", "وادي الجرف", "paper", "ورق"],
  },
  {
    id: "tech-roman-aqueducts", slug: "roman-aqueducts", civIds: ["civ-roman-empire"], category: "water", status: "draft", sourceIds: ["src-hodge-aqueducts", "src-beard-spqr"],
    names: { en: "Roman aqueducts", ar: "القنوات المائية الرومانية", de: "Römische Aquädukte", fr: "Aqueducs romains", es: "Acueductos romanos", it: "Acquedotti romani", zh: "罗马水道" },
    summary: {
      en: "Channels, tunnels and bridges that carried water to Roman cities by gravity. The first aqueduct of Rome, the Aqua Appia, dates to 312 BCE, and by the 3rd century CE the city was supplied by eleven.",
      ar: "قنوات وأنفاق وجسور نقلت المياه إلى المدن الرومانية بقوة الجاذبية. يعود أول قناة لروما، أكوا أبيا، إلى عام 312 ق.م، وبحلول القرن الثالث الميلادي كانت المدينة تُزوَّد بإحدى عشرة قناة.",
    },
    keywords: ["aqueduct", "قناة مائية", "aqua appia", "water supply", "المياه", "pont du gard", "arches", "الأقواس", "rome", "روما"],
  },
];
export const getTechnology = (slug: string) => technologies.find((t) => t.slug === slug);
