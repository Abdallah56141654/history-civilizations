import type { Person } from "@/lib/types";

export const people: Person[] = [
  {
    id: "person-cleopatra-vii", slug: "cleopatra-vii", civIds: ["civ-ancient-egypt"], role: "ruler", birthYear: -69, deathYear: -30, status: "draft", sourceIds: ["src-shaw-egypt", "src-wilkinson-egypt"],
    names: { en: "Cleopatra VII", ar: "كليوباترا السابعة", de: "Kleopatra VII.", fr: "Cléopâtre VII", es: "Cleopatra VII", it: "Cleopatra VII", zh: "克利奥帕特拉七世" },
    summary: {
      en: "The last active ruler of Ptolemaic Egypt. She allied with Julius Caesar and later Mark Antony, and died in 30 BCE after Octavian's victory, after which Egypt became a Roman province.",
      ar: "آخر حكام مصر البطلمية الفاعلين. تحالفت مع يوليوس قيصر ثم مع مارك أنتوني، وتوفيت عام 30 ق.م بعد انتصار أوكتافيان، فأصبحت مصر بعدها ولاية رومانية.",
    },
    keywords: ["cleopatra", "كليوباترا", "ptolemaic", "البطالمة", "mark antony", "مارك أنطونيوس", "queen of egypt"],
  },
  {
    id: "person-ramesses-ii", slug: "ramesses-ii", civIds: ["civ-ancient-egypt"], role: "ruler", birthYear: -1303, deathYear: -1213, approx: true, status: "draft", sourceIds: ["src-shaw-egypt"],
    names: { en: "Ramesses II", ar: "رمسيس الثاني", de: "Ramses II.", fr: "Ramsès II", es: "Ramsés II", it: "Ramses II", zh: "拉美西斯二世" },
    summary: {
      en: "A pharaoh of the 19th Dynasty who reigned for about 66 years, from roughly 1279 to 1213 BCE. He is known for large building projects such as Abu Simbel and for the Battle of Kadesh.",
      ar: "فرعون من الأسرة التاسعة عشرة حكم نحو 66 عامًا، من حوالي 1279 إلى 1213 ق.م. اشتهر بمشاريع بناء ضخمة مثل أبو سمبل وبمعركة قادش.",
    },
    keywords: ["ramses", "رمسيس", "pharaoh", "فرعون", "abu simbel", "أبو سمبل", "kadesh", "قادش", "ramses the great"],
  },
  {
    id: "person-augustus", slug: "augustus", civIds: ["civ-roman-empire"], role: "ruler", birthYear: -63, deathYear: 14, status: "draft", sourceIds: ["src-beard-spqr"],
    names: { en: "Augustus", ar: "أغسطس", de: "Augustus", fr: "Auguste", es: "Augusto", it: "Augusto", zh: "奥古斯都" },
    summary: {
      en: "The first Roman emperor. Born Octavian and adopted as Caesar's heir, he won the civil wars and, from 27 BCE, ruled while keeping the outward forms of the Republic.",
      ar: "أول أباطرة روما. وُلد باسم أوكتافيان وتبنّاه قيصر وريثًا له، وانتصر في الحروب الأهلية، وحكم منذ 27 ق.م مع الإبقاء على الأشكال الظاهرية للجمهورية.",
    },
    keywords: ["octavian", "أوكتافيان", "caesar augustus", "emperor", "إمبراطور", "principate"],
  },
  {
    id: "person-julius-caesar", slug: "julius-caesar", civIds: ["civ-roman-empire"], role: "statesman", birthYear: -100, deathYear: -44, status: "draft", sourceIds: ["src-beard-spqr"],
    names: { en: "Julius Caesar", ar: "يوليوس قيصر", de: "Gaius Julius Caesar", fr: "Jules César", es: "Julio César", it: "Giulio Cesare", zh: "尤利乌斯·凯撒" },
    summary: {
      en: "A Roman general and statesman who conquered Gaul, won a civil war and became dictator. He was assassinated by a group of senators on 15 March 44 BCE.",
      ar: "قائد وسياسي روماني فتح بلاد الغال وانتصر في حرب أهلية وصار ديكتاتورًا. اغتاله مجموعة من أعضاء مجلس الشيوخ في 15 مارس 44 ق.م.",
    },
    keywords: ["caesar", "قيصر", "ides of march", "gaul", "rubicon", "cleopatra"],
  },
  {
    id: "person-pericles", slug: "pericles", civIds: ["civ-ancient-greece"], role: "statesman", birthYear: -495, deathYear: -429, approx: true, status: "draft", sourceIds: ["src-cartledge-greece"],
    names: { en: "Pericles", ar: "بريكليس", de: "Perikles", fr: "Périclès", es: "Pericles", it: "Pericle", zh: "伯里克利" },
    summary: {
      en: "An Athenian statesman who led the city during much of its 5th-century golden age and sponsored the Parthenon building program. He died in 429 BCE during the plague of Athens.",
      ar: "رجل دولة أثيني قاد المدينة في معظم عصرها الذهبي في القرن الخامس ق.م ورعى برنامج بناء البارثينون. توفي عام 429 ق.م أثناء وباء أثينا.",
    },
    keywords: ["athens", "أثينا", "parthenon", "البارثينون", "peloponnesian war", "الحرب البيلوبونيسية", "golden age"],
  },
  {
    id: "person-cyrus-the-great", slug: "cyrus-the-great", civIds: ["civ-persian-empire"], role: "ruler", birthYear: null, deathYear: -530, status: "draft", sourceIds: ["src-briant-persia", "src-kuhrt-ane"],
    names: { en: "Cyrus the Great", ar: "قورش الكبير", de: "Kyros II.", fr: "Cyrus le Grand", es: "Ciro el Grande", it: "Ciro il Grande", zh: "居鲁士大帝" },
    summary: {
      en: "The founder of the Achaemenid Empire, who reigned from about 559 to 530 BCE. He conquered the Medes, Lydia and, in 539 BCE, Babylon.",
      ar: "مؤسس الإمبراطورية الأخمينية، حكم من نحو 559 إلى 530 ق.م. أخضع الميديين وليديا، وفي عام 539 ق.م بابل.",
    },
    keywords: ["cyrus", "قورش", "kyros", "achaemenid", "الأخمينية", "cyrus cylinder", "أسطوانة قورش"],
  },
  {
    id: "person-darius-i", slug: "darius-i", civIds: ["civ-persian-empire"], role: "ruler", birthYear: -550, deathYear: -486, approx: true, status: "draft", sourceIds: ["src-briant-persia"],
    names: { en: "Darius I", ar: "داريوس الأول", de: "Dareios I.", fr: "Darius Ier", es: "Darío I", it: "Dario I", zh: "大流士一世" },
    summary: {
      en: "An Achaemenid king who ruled from 522 to 486 BCE. He organized the empire into provinces called satrapies, left the Behistun inscription, and began building Persepolis.",
      ar: "ملك أخميني حكم من 522 إلى 486 ق.م. نظّم الإمبراطورية في ولايات تسمى الساتراپيات، وترك نقش بيستون، وبدأ بناء برسيبوليس.",
    },
    keywords: ["darius", "داريوس", "dareios", "behistun", "بيستون", "satrap", "satrapies", "الساتراب"],
  },
  {
    id: "person-hammurabi", slug: "hammurabi", civIds: ["civ-mesopotamia"], role: "ruler", birthYear: null, deathYear: -1750, approx: true, status: "draft", sourceIds: ["src-kuhrt-ane", "src-roth-laws"],
    names: { en: "Hammurabi", ar: "حمورابي", de: "Hammurabi", fr: "Hammurabi", es: "Hammurabi", it: "Hammurabi", zh: "汉谟拉比" },
    summary: {
      en: "A king of Babylon who reigned from about 1792 to 1750 BCE (middle chronology). He is best known for the law stele that bears his name.",
      ar: "ملك بابل حكم من نحو 1792 إلى 1750 ق.م (حسب التسلسل الزمني الأوسط). اشتهر بمسلة القوانين التي تحمل اسمه.",
    },
    keywords: ["hammurabi code", "شريعة حمورابي", "قانون حمورابي", "babylon", "بابل", "laws", "stele"],
  },
  {
    id: "person-pakal", slug: "pakal-the-great", civIds: ["civ-maya"], role: "ruler", birthYear: 603, deathYear: 683, status: "draft", sourceIds: ["src-coe-maya"],
    names: { en: "K'inich Janaab' Pakal (Pakal the Great)", ar: "باكال العظيم", de: "Pakal der Große", fr: "Pakal le Grand", es: "Pakal el Grande", it: "Pakal il Grande", zh: "帕卡尔大帝" },
    summary: {
      en: "Ruler of the Maya city of Palenque from 615 to 683 CE. He was buried in the Temple of the Inscriptions, whose texts record much of his reign.",
      ar: "حاكم مدينة بالينكي المايانية من 615 إلى 683 م. دُفن في معبد النقوش الذي تسجل نصوصه جزءًا كبيرًا من فترة حكمه.",
    },
    keywords: ["pakal", "باكال", "palenque", "بالينكي", "k'inich janaab' pakal", "maya king"],
  },
  {
    id: "person-alexander-the-great", slug: "alexander-the-great", civIds: ["civ-ancient-greece", "civ-persian-empire"], role: "ruler", birthYear: -356, deathYear: -323, status: "draft", sourceIds: ["src-briant-persia", "src-cartledge-greece"],
    names: { en: "Alexander the Great", ar: "الإسكندر الأكبر", de: "Alexander der Große", fr: "Alexandre le Grand", es: "Alejandro Magno", it: "Alessandro Magno", zh: "亚历山大大帝" },
    summary: {
      en: "King of Macedon who conquered the Achaemenid Empire between 334 and 330 BCE and pushed on to the Indus region. He died in Babylon in 323 BCE.",
      ar: "ملك مقدونيا الذي أخضع الإمبراطورية الأخمينية بين 334 و330 ق.م ومضى حتى منطقة السند. توفي في بابل عام 323 ق.م.",
    },
    keywords: ["alexander", "الإسكندر", "macedon", "مقدونيا", "iskandar", "alexandria", "hellenistic"],
  },
];
