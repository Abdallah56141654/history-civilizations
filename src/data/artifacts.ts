import type { Artifact } from "@/lib/types";

export const artifacts: Artifact[] = [
  {
    id: "artifact-rosetta-stone", slug: "rosetta-stone", civIds: ["civ-ancient-egypt"], placeIds: ["place-alexandria"], status: "draft", sourceIds: ["src-parkinson-rosetta", "src-shaw-egypt"],
    heldAt: "British Museum, London",
    names: { en: "The Rosetta Stone", ar: "حجر رشيد", de: "Der Stein von Rosetta", fr: "La pierre de Rosette", es: "La piedra de Rosetta", it: "La stele di Rosetta", zh: "罗塞塔石碑" },
    summary: {
      en: "A stele inscribed with a decree of 196 BCE in hieroglyphic, demotic and Greek. French soldiers found it in 1799 near Rashid (Rosetta), and it has been in the British Museum since 1802. It was key to deciphering hieroglyphs.",
      ar: "مسلة نُقش عليها مرسوم يعود إلى عام 196 ق.م بالهيروغليفية والديموطيقية واليونانية. عثر عليها جنود فرنسيون عام 1799 قرب رشيد، وهي في المتحف البريطاني منذ 1802. وكانت مفتاحًا لفك رموز الهيروغليفية.",
    },
    keywords: ["rosetta", "رشيد", "hieroglyphs", "الهيروغليفية", "champollion", "شامبليون", "decree", "ptolemy v", "british museum"],
  },
  {
    id: "artifact-cyrus-cylinder", slug: "cyrus-cylinder", civIds: ["civ-persian-empire", "civ-mesopotamia"], placeIds: ["place-babylon"], status: "draft", sourceIds: ["src-finkel-cyrus", "src-briant-persia"],
    heldAt: "British Museum, London",
    names: { en: "The Cyrus Cylinder", ar: "أسطوانة قورش", de: "Der Kyros-Zylinder", fr: "Le cylindre de Cyrus", es: "El cilindro de Ciro", it: "Il cilindro di Ciro", zh: "居鲁士圆柱" },
    summary: {
      en: "A baked-clay cylinder with a cuneiform text in Akkadian, found at Babylon in 1879. It describes Cyrus's takeover of the city and his care for its temples. Calling it the first charter of human rights is a modern claim that scholars debate.",
      ar: "أسطوانة من الطين المحروق عليها نص مسماري بالأكادية، عُثر عليها في بابل عام 1879. تصف سيطرة قورش على المدينة واهتمامه بمعابدها. أما وصفها بأنها أول شرعة لحقوق الإنسان فادعاء حديث يختلف حوله الباحثون.",
    },
    keywords: ["cyrus", "قورش", "cylinder", "أسطوانة", "babylon", "بابل", "human rights", "حقوق الإنسان", "akkadian", "cuneiform", "british museum"],
  },
  {
    id: "artifact-antikythera", slug: "antikythera-mechanism", civIds: ["civ-ancient-greece"], placeIds: ["place-athens"], status: "draft", sourceIds: ["src-freeth-antikythera"],
    heldAt: "National Archaeological Museum, Athens",
    names: { en: "The Antikythera Mechanism", ar: "آلية أنتيكيثيرا", de: "Der Mechanismus von Antikythera", fr: "Le mécanisme d'Anticythère", es: "El mecanismo de Anticitera", it: "Il meccanismo di Antikythera", zh: "安提基特拉机械" },
    summary: {
      en: "A geared bronze device recovered from a shipwreck off the island of Antikythera in 1901 and dated to roughly the 2nd or 1st century BCE. It modelled astronomical cycles and could be used to predict eclipses and keep a calendar.",
      ar: "جهاز برونزي مسنّن انتُشل من حطام سفينة قرب جزيرة أنتيكيثيرا عام 1901 ويُؤرَّخ نحو القرنين الثاني أو الأول قبل الميلاد. كان يحاكي دورات فلكية ويمكن استخدامه للتنبؤ بالكسوف وضبط التقويم.",
    },
    keywords: ["antikythera", "أنتيكيثيرا", "mechanism", "آلية", "astronomical calculator", "حاسوب فلكي", "gears", "shipwreck", "computer"],
  },
];
export const getArtifact = (slug: string) => artifacts.find((a) => a.slug === slug);
