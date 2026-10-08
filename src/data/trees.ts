import type { FamilyTree } from "@/lib/types";

// Only relationships that are well attested are drawn. Uncertain points are said in `notes`, not hidden.
export const trees: FamilyTree[] = [
  {
    id: "tree-cleopatra", slug: "cleopatra-vii-and-her-family", civIds: ["civ-ancient-egypt"], status: "draft", sourceIds: ["src-schiff-cleopatra", "src-shaw-egypt"],
    title: { en: "Cleopatra VII and her family" },
    intro: { en: "Cleopatra's father, her siblings and co-rulers, her partners, and her four children." },
    nodes: [
      { id: "auletes", gen: 0, col: 1.5, names: { en: "Ptolemy XII Auletes", ar: "بطليموس الثاني عشر", de: "Ptolemaios XII.", fr: "Ptolémée XII", es: "Ptolomeo XII", it: "Tolomeo XII", zh: "托勒密十二世" }, death: -51 },
      { id: "arsinoe", gen: 1, col: 0, names: { en: "Arsinoe IV", ar: "أرسينوي الرابعة", de: "Arsinoë IV.", fr: "Arsinoé IV", es: "Arsínoe IV", it: "Arsinoe IV", zh: "阿尔西诺伊四世" }, death: -41, approx: true },
      { id: "ptol14", gen: 1, col: 1, names: { en: "Ptolemy XIV", ar: "بطليموس الرابع عشر", de: "Ptolemaios XIV.", fr: "Ptolémée XIV", es: "Ptolomeo XIV", it: "Tolomeo XIV", zh: "托勒密十四世" }, death: -44, approx: true },
      { id: "ptol13", gen: 1, col: 2, names: { en: "Ptolemy XIII", ar: "بطليموس الثالث عشر", de: "Ptolemaios XIII.", fr: "Ptolémée XIII", es: "Ptolomeo XIII", it: "Tolomeo XIII", zh: "托勒密十三世" }, death: -47 },
      { id: "cleopatra", gen: 1, col: 3, names: { en: "Cleopatra VII", ar: "كليوباترا السابعة", de: "Kleopatra VII.", fr: "Cléopâtre VII", es: "Cleopatra VII", it: "Cleopatra VII", zh: "克利奥帕特拉七世" }, birth: -69, death: -30, personId: "person-cleopatra-vii" },
      { id: "caesar", gen: 1, col: 4, names: { en: "Julius Caesar", ar: "يوليوس قيصر", de: "Gaius Julius Caesar", fr: "Jules César", es: "Julio César", it: "Giulio Cesare", zh: "尤利乌斯·凯撒" }, birth: -100, death: -44, personId: "person-julius-caesar" },
      { id: "antony", gen: 1, col: 5, names: { en: "Mark Antony", ar: "مارك أنتوني", de: "Marcus Antonius", fr: "Marc Antoine", es: "Marco Antonio", it: "Marco Antonio", zh: "马克·安东尼" }, birth: -83, death: -30 },
      { id: "caesarion", gen: 2, col: 3, names: { en: "Caesarion (Ptolemy XV)", ar: "قيصرون (بطليموس الخامس عشر)", de: "Caesarion (Ptolemaios XV.)", fr: "Césarion (Ptolémée XV)", es: "Cesarión (Ptolomeo XV)", it: "Cesarione (Tolomeo XV)", zh: "凯撒里昂（托勒密十五世）" }, birth: -47, death: -30 },
      { id: "helios", gen: 2, col: 4, names: { en: "Alexander Helios", ar: "الإسكندر هيليوس", de: "Alexander Helios", fr: "Alexandre Hélios", es: "Alejandro Helios", it: "Alessandro Helios", zh: "亚历山大·赫利俄斯" }, birth: -40 },
      { id: "selene", gen: 2, col: 5, names: { en: "Cleopatra Selene II", ar: "كليوباترا سيلين الثانية", de: "Kleopatra Selene II.", fr: "Cléopâtre Séléné II", es: "Cleopatra Selene II", it: "Cleopatra Selene II", zh: "克利奥帕特拉·塞勒涅二世" }, birth: -40, death: -5, approx: true },
      { id: "philadelphus", gen: 2, col: 6, names: { en: "Ptolemy Philadelphus", ar: "بطليموس فيلادلفوس", de: "Ptolemaios Philadelphos", fr: "Ptolémée Philadelphe", es: "Ptolomeo Filadelfo", it: "Tolomeo Filadelfo", zh: "托勒密·费拉德尔福斯" }, birth: -36 },
      { id: "juba", gen: 2, col: 7, names: { en: "Juba II", ar: "يوبا الثاني", de: "Juba II.", fr: "Juba II", es: "Juba II", it: "Giuba II", zh: "尤巴二世" }, death: 23, approx: true },
    ],
    parents: [
      ["auletes", "arsinoe"], ["auletes", "ptol14"], ["auletes", "ptol13"], ["auletes", "cleopatra"],
      ["cleopatra", "caesarion"], ["caesar", "caesarion"],
      ["cleopatra", "helios"], ["cleopatra", "selene"], ["cleopatra", "philadelphus"],
      ["antony", "helios"], ["antony", "selene"], ["antony", "philadelphus"],
    ],
    unions: [
      { a: "cleopatra", b: "ptol13", kind: "spouse" },
      { a: "cleopatra", b: "ptol14", kind: "spouse" },
      { a: "cleopatra", b: "caesar", kind: "partner" },
      { a: "cleopatra", b: "antony", kind: "partner" },
      { a: "selene", b: "juba", kind: "spouse" },
    ],
    notes: { en: [
      "Cleopatra named Julius Caesar as the father of Caesarion. Caesar did not formally acknowledge the child, and historians differ on how to weigh the claim.",
      "Whether Cleopatra and Mark Antony were formally married is uncertain, so that link is drawn as a partnership.",
      "The tree shows the siblings as children of Ptolemy XII. It does not show their mothers, whose identities are not all certain. Dates marked as approximate are scholarly estimates.",
    ] },
  },
];
export const getTree = (slug: string) => trees.find((t) => t.slug === slug);
