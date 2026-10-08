import type { Place } from "@/lib/types";

export const places: Place[] = [
  {
    id: "place-giza", slug: "giza", civIds: ["civ-ancient-egypt"], lat: 29.9792, lng: 31.1342, status: "draft", sourceIds: ["src-shaw-egypt"],
    names: { en: "Giza", ar: "الجيزة", de: "Gizeh", fr: "Gizeh", es: "Guiza", it: "Giza", zh: "吉萨" },
    summary: {
      en: "A plateau near modern Cairo with the three main pyramids, built for the kings Khufu, Khafre and Menkaure during the Old Kingdom, together with the Great Sphinx.",
      ar: "هضبة قرب القاهرة الحديثة تضم الأهرامات الثلاثة الرئيسية التي شُيّدت للملوك خوفو وخفرع ومنكاورع في عصر الدولة القديمة، إضافة إلى أبي الهول.",
    },
    keywords: ["pyramids", "الاهرامات", "الأهرامات", "khufu", "خوفو", "sphinx", "أبو الهول", "cairo", "القاهرة"],
  },
  {
    id: "place-alexandria", slug: "alexandria", civIds: ["civ-ancient-egypt", "civ-ancient-greece"], lat: 31.2001, lng: 29.9187, status: "draft", sourceIds: ["src-shaw-egypt"],
    names: { en: "Alexandria", ar: "الإسكندرية", de: "Alexandria", fr: "Alexandrie", es: "Alexandría", it: "Alessandria d'Egitto", zh: "亚历山大港" },
    summary: {
      en: "A Mediterranean port city traditionally founded by Alexander the Great in 331 BCE. It became the capital of Ptolemaic Egypt and was known for its great library and the Pharos lighthouse.",
      ar: "مدينة ساحلية على المتوسط يُنسب تأسيسها تقليديًا إلى الإسكندر الأكبر عام 331 ق.م. صارت عاصمة مصر البطلمية، واشتهرت بمكتبتها الكبرى ومنارة فاروس.",
    },
    keywords: ["library of alexandria", "مكتبة الإسكندرية", "pharos", "فاروس", "ptolemaic", "البطالمة", "cleopatra", "كليوباترا"],
  },
  {
    id: "place-rome", slug: "rome", civIds: ["civ-roman-empire"], lat: 41.9028, lng: 12.4964, status: "draft", sourceIds: ["src-beard-spqr"],
    names: { en: "Rome", ar: "روما", de: "Rom", fr: "Rome", es: "Roma", it: "Roma", zh: "罗马" },
    summary: {
      en: "A city on the Tiber that, by Roman tradition, was founded in 753 BCE. It was the capital of the Roman Republic and of the Empire.",
      ar: "مدينة على نهر التيبر تقول التقاليد الرومانية إنها تأسست عام 753 ق.م. كانت عاصمة الجمهورية الرومانية ثم الإمبراطورية.",
    },
    keywords: ["colosseum", "الكولوسيوم", "forum", "tiber", "italy", "إيطاليا"],
  },
  {
    id: "place-athens", slug: "athens", civIds: ["civ-ancient-greece"], lat: 37.9838, lng: 23.7275, status: "draft", sourceIds: ["src-cartledge-greece"],
    names: { en: "Athens", ar: "أثينا", de: "Athen", fr: "Athènes", es: "Atenas", it: "Atene", zh: "雅典" },
    summary: {
      en: "The leading city-state of classical Greece. Its Acropolis holds the Parthenon, built in the 5th century BCE under Pericles.",
      ar: "أبرز دول المدن في اليونان الكلاسيكية. تضم أكروبوليسها البارثينون الذي بُني في القرن الخامس قبل الميلاد في عهد بريكليس.",
    },
    keywords: ["acropolis", "الأكروبوليس", "parthenon", "البارثينون", "greece", "اليونان"],
  },
  {
    id: "place-babylon", slug: "babylon", civIds: ["civ-mesopotamia"], lat: 32.5364, lng: 44.4208, status: "draft", sourceIds: ["src-kuhrt-ane"],
    names: { en: "Babylon", ar: "بابل", de: "Babylon", fr: "Babylone", es: "Babilonia", it: "Babilonia", zh: "巴比伦" },
    summary: {
      en: "An ancient city on the Euphrates in present-day Iraq, capital of Babylonia under rulers such as Hammurabi and Nebuchadnezzar II. Its ruins lie near the modern city of Hillah.",
      ar: "مدينة قديمة على نهر الفرات في العراق الحالي، كانت عاصمة بابل في عهد حكام منهم حمورابي ونبوخذ نصر الثاني. وتقع أطلالها قرب مدينة الحلة الحديثة.",
    },
    keywords: ["iraq", "العراق", "hillah", "الحلة", "nebuchadnezzar", "نبوخذنصر", "hanging gardens", "الحدائق المعلقة"],
  },
  {
    id: "place-persepolis", slug: "persepolis", civIds: ["civ-persian-empire"], lat: 29.9345, lng: 52.8916, status: "draft", sourceIds: ["src-briant-persia"],
    names: { en: "Persepolis", ar: "برسيبوليس (تخت جمشيد)", de: "Persepolis", fr: "Persépolis", es: "Persépolis", it: "Persepoli", zh: "波斯波利斯" },
    summary: {
      en: "The ceremonial capital of the Achaemenid Empire in Fars, Iran. Construction began under Darius I around 518 BCE; the complex was burned in 330 BCE after Alexander the Great took it.",
      ar: "العاصمة الاحتفالية للإمبراطورية الأخمينية في إقليم فارس بإيران. بدأ بناؤها في عهد داريوس الأول نحو 518 ق.م، وأُحرق المجمع عام 330 ق.م بعد استيلاء الإسكندر الأكبر عليه.",
    },
    keywords: ["takht-e jamshid", "تخت جمشيد", "iran", "إيران", "fars", "فارس"],
  },
  {
    id: "place-palenque", slug: "palenque", civIds: ["civ-maya"], lat: 17.4839, lng: -92.0461, status: "draft", sourceIds: ["src-coe-maya"],
    names: { en: "Palenque", ar: "بالينكي", de: "Palenque", fr: "Palenque", es: "Palenque", it: "Palenque", zh: "帕伦克" },
    summary: {
      en: "A Maya city in Chiapas, Mexico, that flourished in the 7th century CE under K'inich Janaab' Pakal. The Temple of the Inscriptions contains his tomb.",
      ar: "مدينة مايا في ولاية تشياباس بالمكسيك ازدهرت في القرن السابع الميلادي في عهد باكال. ويضم معبد النقوش قبره.",
    },
    keywords: ["pakal", "باكال", "chiapas", "mexico", "المكسيك", "temple of the inscriptions"],
  },
  {
    id: "place-tikal", slug: "tikal", civIds: ["civ-maya"], lat: 17.222, lng: -89.6237, status: "draft", sourceIds: ["src-coe-maya"],
    names: { en: "Tikal", ar: "تيكال", de: "Tikal", fr: "Tikal", es: "Tikal", it: "Tikal", zh: "蒂卡尔" },
    summary: {
      en: "One of the largest Maya cities, in the Petén region of Guatemala, with tall temple-pyramids. It was a major power during the Classic period.",
      ar: "إحدى أكبر مدن المايا، في منطقة بيتين بغواتيمالا، وتضم معابد هرمية شاهقة. كانت قوة كبرى خلال العصر الكلاسيكي.",
    },
    keywords: ["guatemala", "غواتيمالا", "peten", "mayan"],
  },
];
