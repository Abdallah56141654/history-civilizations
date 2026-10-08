import type { Civilization } from "@/lib/types";

// Sources are added in the verification step; until then these records have none.
type Draft = Omit<Civilization, "sourceIds"> & { sourceIds?: string[] };

export const extraCivilizations: Draft[] = [
  {
    id: "civ-ancient-china", slug: "ancient-china", region: "asia", startYear: -1600, endYear: 220,
    names: { en: "Ancient China", ar: "الصين القديمة", de: "Das alte China", fr: "La Chine antique", es: "Antigua China", it: "Antica Cina", zh: "古代中国" },
    summary: {
      en: "The early Chinese states and empires from the Shang dynasty to the end of the Han in 220 CE, including the unification under the Qin in 221 BCE, which laid foundations for imperial government, writing and bureaucracy.",
      ar: "الدول والإمبراطوريات الصينية المبكرة، من أسرة شانغ حتى نهاية أسرة هان عام 220 م، ومنها توحيد الصين على يد أسرة تشين عام 221 ق.م الذي أرسى أسس الحكم الإمبراطوري والكتابة والبيروقراطية.",
      de: "Die frühen chinesischen Staaten und Kaiserreiche von der Shang-Dynastie bis zum Ende der Han 220 n. Chr., einschließlich der Reichseinigung unter den Qin 221 v. Chr., die Grundlagen für kaiserliche Verwaltung, Schrift und Bürokratie legte.",
    },
    keywords: ["china", "الصين", "chine", "cina", "中国", "han dynasty", "qin", "shang", "هان", "تشين", "great wall", "سور الصين"], status: "draft",
  },
  {
    id: "civ-ancient-india", slug: "ancient-india", region: "asia", startYear: -3300, endYear: 550,
    names: { en: "Ancient India", ar: "الهند القديمة", de: "Das alte Indien", fr: "L'Inde ancienne", es: "Antigua India", it: "Antica India", zh: "古印度" },
    summary: {
      en: "The civilizations of the Indian subcontinent from the Indus Valley cities of the 3rd millennium BCE through the Maurya and Gupta empires, a long span that produced major advances in mathematics, philosophy and urban planning.",
      ar: "حضارات شبه القارة الهندية، من مدن وادي السند في الألفية الثالثة قبل الميلاد مرورًا بإمبراطوريتي موريا وغوبتا، وهي مدة طويلة شهدت إنجازات كبرى في الرياضيات والفلسفة وتخطيط المدن.",
      de: "Die Kulturen des indischen Subkontinents von den Indus-Städten des 3. Jahrtausends v. Chr. bis zu den Reichen der Maurya und Gupta, eine lange Epoche mit bedeutenden Fortschritten in Mathematik, Philosophie und Stadtplanung.",
    },
    keywords: ["india", "الهند", "inde", "indien", "india", "印度", "indus", "السند", "harappa", "mohenjo-daro", "maurya", "موريا", "gupta", "غوبتا"], status: "draft",
  },
  {
    id: "civ-islamic-civilization", slug: "islamic-civilization", region: "middleEast", startYear: 622, endYear: 1258,
    names: { en: "Islamic Civilization (early caliphates)", ar: "الحضارة الإسلامية (الخلافة المبكرة)", de: "Islamische Zivilisation (frühe Kalifate)", fr: "Civilisation islamique (premiers califats)", es: "Civilización islámica (primeros califatos)", it: "Civiltà islamica (primi califfati)", zh: "伊斯兰文明（早期哈里发国家）" },
    summary: {
      en: "The civilization that grew with the early Islamic caliphates, from the Hijra in 622 CE to the Mongol sack of Baghdad in 1258, spanning North Africa, the Middle East and Central Asia and notable for scholarship in medicine, astronomy, mathematics and philosophy.",
      ar: "الحضارة التي نشأت مع الخلافات الإسلامية المبكرة، من الهجرة عام 622 م إلى سقوط بغداد على يد المغول عام 1258، وامتدت من شمال أفريقيا إلى الشرق الأوسط وآسيا الوسطى، وعُرفت بإسهاماتها العلمية في الطب والفلك والرياضيات والفلسفة.",
      de: "Die Zivilisation der frühen islamischen Kalifate, von der Hidschra 622 bis zur Eroberung Bagdads durch die Mongolen 1258. Sie reichte von Nordafrika über den Nahen Osten bis nach Zentralasien und ist bekannt für Gelehrsamkeit in Medizin, Astronomie, Mathematik und Philosophie.",
    },
    keywords: ["islam", "islamic", "الإسلام", "الاسلامية", "الإسلامية", "caliphate", "الخلافة", "abbasid", "العباسية", "umayyad", "الأموية", "baghdad", "بغداد", "hijra", "الهجرة", "golden age"], status: "draft",
  },
  {
    id: "civ-aztec-empire", slug: "aztec-empire", region: "americas", startYear: 1428, endYear: 1521,
    names: { en: "Aztec Empire", ar: "إمبراطورية الأزتك", de: "Aztekenreich", fr: "Empire aztèque", es: "Imperio azteco", it: "Impero azteco", zh: "阿兹特克帝国" },
    summary: {
      en: "The Triple Alliance of Tenochtitlan, Texcoco and Tlacopan, formed in 1428, dominated central Mexico until the fall of Tenochtitlan to Spanish forces and their indigenous allies in 1521.",
      ar: "التحالف الثلاثي بين تينوختيتلان وتكسكوكو وتلاكوبان الذي تشكّل عام 1428 وهيمن على وسط المكسيك حتى سقوط تينوختيتلان عام 1521 أمام القوات الإسبانية وحلفائها من السكان الأصليين.",
      de: "Der 1428 gebildete Dreibund von Tenochtitlan, Texcoco und Tlacopan beherrschte Zentralmexiko, bis Tenochtitlan 1521 an spanische Truppen und ihre indigenen Verbündeten fiel.",
    },
    keywords: ["aztec", "azteca", "azteken", "الازتك", "الأزتك", "mexica", "tenochtitlan", "تينوختيتلان", "nahuatl", "mexico", "المكسيك"], status: "draft",
  },
  {
    id: "civ-inca-empire", slug: "inca-empire", region: "americas", startYear: 1438, endYear: 1533,
    names: { en: "Inca Empire", ar: "إمبراطورية الإنكا", de: "Inkareich", fr: "Empire inca", es: "Imperio inca", it: "Impero inca", zh: "印加帝国" },
    summary: {
      en: "The largest empire of the pre-Columbian Americas, centered on Cusco and expanding from about 1438 along the Andes, linked by an extensive road network until the Spanish conquest in 1533.",
      ar: "أكبر إمبراطورية في الأمريكتين قبل كولومبوس، تمركزت في كوسكو وتوسعت منذ نحو عام 1438 على امتداد جبال الأنديز، وربطتها شبكة طرق واسعة حتى الغزو الإسباني عام 1533.",
      de: "Das größte Reich des vorkolumbischen Amerika mit Zentrum Cusco; es dehnte sich ab etwa 1438 entlang der Anden aus und war durch ein weites Straßennetz verbunden, bis zur spanischen Eroberung 1533.",
    },
    keywords: ["inca", "inka", "الانكا", "الإنكا", "cusco", "كوسكو", "andes", "الأنديز", "peru", "بيرو", "quechua", "machu picchu", "ماتشو بيتشو"], status: "draft",
  },
  {
    id: "civ-nubia-kush", slug: "nubia-kush", region: "africa", startYear: -2500, endYear: 350,
    names: { en: "Nubia and Kush", ar: "النوبة وكوش", de: "Nubien und Kusch", fr: "Nubie et Koush", es: "Nubia y Kush", it: "Nubia e Kush", zh: "努比亚与库施" },
    summary: {
      en: "Nubian cultures along the middle Nile in present-day Sudan, from the Kerma culture to the Kingdom of Kush, whose rulers governed Egypt as the 25th Dynasty and which later centered on Meroë until about 350 CE.",
      ar: "ثقافات النوبة على امتداد النيل الأوسط في السودان الحالي، من ثقافة كرمة إلى مملكة كوش التي حكم ملوكها مصر بوصفهم الأسرة الخامسة والعشرين، ثم تمركزت في مروي حتى نحو عام 350 م.",
      de: "Nubische Kulturen am mittleren Nil im heutigen Sudan, von der Kerma-Kultur bis zum Königreich Kusch, dessen Herrscher als 25. Dynastie Ägypten regierten und das sich später auf Meroe konzentrierte, bis etwa 350 n. Chr.",
    },
    keywords: ["nubia", "النوبة", "kush", "cush", "كوش", "kerma", "كرمة", "meroe", "مروي", "sudan", "السودان", "napata", "25th dynasty"], status: "draft",
  },
  {
    id: "civ-ottoman-empire", slug: "ottoman-empire", region: "middleEast", startYear: 1299, endYear: 1922,
    names: { en: "Ottoman Empire", ar: "الدولة العثمانية", de: "Osmanisches Reich", fr: "Empire ottoman", es: "Imperio otomano", it: "Impero ottomano", zh: "奥斯曼帝国" },
    summary: {
      en: "A state that began in northwestern Anatolia around 1299, captured Constantinople in 1453, and at its height ruled much of southeastern Europe, western Asia and North Africa until its dissolution in 1922.",
      ar: "دولة نشأت في شمال غرب الأناضول نحو عام 1299، وفتحت القسطنطينية عام 1453، وحكمت في أوج قوتها معظم جنوب شرق أوروبا وغرب آسيا وشمال أفريقيا حتى انحلالها عام 1922.",
      de: "Ein Staat, der um 1299 im Nordwesten Anatoliens entstand, 1453 Konstantinopel eroberte und auf seinem Höhepunkt große Teile Südosteuropas, Westasiens und Nordafrikas beherrschte, bis er 1922 aufgelöst wurde.",
    },
    keywords: ["ottoman", "ottomans", "العثمانية", "العثمانيين", "osmanen", "osman", "turkey", "تركيا", "istanbul", "إسطنبول", "constantinople", "القسطنطينية", "sultan", "سلطان"], status: "draft",
  },
  {
    id: "civ-mongol-empire", slug: "mongol-empire", region: "asia", startYear: 1206, endYear: 1368,
    names: { en: "Mongol Empire", ar: "الإمبراطورية المغولية", de: "Mongolenreich", fr: "Empire mongol", es: "Imperio mongol", it: "Impero mongolo", zh: "蒙古帝国" },
    summary: {
      en: "Founded by Genghis Khan in 1206, the Mongol Empire became the largest contiguous land empire in history, later dividing into separate khanates; the Yuan dynasty in China ended in 1368.",
      ar: "أسسها جنكيز خان عام 1206، وأصبحت أكبر إمبراطورية برية متصلة في التاريخ، ثم انقسمت لاحقًا إلى خانيات منفصلة، وانتهت أسرة يوان في الصين عام 1368.",
      de: "1206 von Dschingis Khan gegründet, wurde das Mongolenreich zum größten zusammenhängenden Landreich der Geschichte und zerfiel später in getrennte Khanate; die Yuan-Dynastie in China endete 1368.",
    },
    keywords: ["mongol", "mongols", "المغول", "mongolen", "mongolia", "منغوليا", "genghis", "جنكيز خان", "khan", "خان", "yuan", "kublai", "قبلاي"], status: "draft",
  },
];
