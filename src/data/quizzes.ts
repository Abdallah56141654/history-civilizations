import type { Quiz } from "@/lib/types";

// Draft quizzes. Questions use well-established facts; they still go through human review before status "reviewed".
// Options must keep the same order in every language. The Roman quiz is English only for now (fallback + notice).
export const quizzes: Quiz[] = [
  {
    id: "quiz-ancient-egypt", slug: "ancient-egypt", civId: "civ-ancient-egypt", status: "draft",
    title: { en: "How Much Do You Know About Ancient Egypt?", ar: "ما مقدار معرفتك بمصر القديمة؟" },
    intro: { en: "Ten questions on pharaohs, writing, tombs and the Nile.", ar: "عشرة أسئلة عن الفراعنة والكتابة والمقابر والنيل." },
    questions: [
      {
        id: "q1", correct: 0,
        text: { en: "Which river was the lifeline of ancient Egyptian civilization?", ar: "أي نهر كان شريان الحياة للحضارة المصرية القديمة؟" },
        options: { en: ["The Nile", "The Tigris", "The Euphrates", "The Indus"], ar: ["النيل", "دجلة", "الفرات", "السند"] },
        explanation: { en: "Its yearly flood left fertile silt along the valley, which made farming possible in an otherwise desert land.", ar: "كان فيضانه السنوي يترك طميًا خصبًا على طول الوادي، فأتاح الزراعة في أرض صحراوية في معظمها." },
      },
      {
        id: "q2", correct: 1,
        text: { en: "What is the name of the script used for monumental inscriptions in ancient Egypt?", ar: "ما اسم الخط المستخدم في النقوش الضخمة في مصر القديمة؟" },
        options: { en: ["Cuneiform", "Hieroglyphs", "Linear B", "Runes"], ar: ["المسمارية", "الهيروغليفية", "الخط الخطي ب", "الرونية"] },
        explanation: { en: "Hieroglyphs were used on temples and tombs. Hieratic and later demotic scripts were used for everyday writing.", ar: "استُخدمت الهيروغليفية على المعابد والمقابر، أما الهيراطيقية ثم الديموطيقية فكانتا للكتابة اليومية." },
      },
      {
        id: "q3", correct: 0,
        text: { en: "Which stone, found in 1799, helped scholars decipher hieroglyphs?", ar: "أي حجر عُثر عليه عام 1799 ساعد العلماء على فك رموز الهيروغليفية؟" },
        options: { en: ["The Rosetta Stone", "The Behistun Inscription", "The Moabite Stone", "The Palermo Stone"], ar: ["حجر رشيد", "نقش بيستون", "حجر موآب", "حجر باليرمو"] },
        explanation: { en: "It carries the same decree in hieroglyphic, demotic and Greek. Jean-François Champollion made the key breakthrough in 1822.", ar: "يحمل المرسوم نفسه بالهيروغليفية والديموطيقية واليونانية. وحقق جان فرانسوا شامبليون الاختراق الحاسم عام 1822." },
      },
      {
        id: "q4", correct: 2,
        text: { en: "For which king was the Great Pyramid of Giza built?", ar: "لأي ملك بُني الهرم الأكبر في الجيزة؟" },
        options: { en: ["Ramesses II", "Tutankhamun", "Khufu", "Akhenaten"], ar: ["رمسيس الثاني", "توت عنخ آمون", "خوفو", "إخناتون"] },
        explanation: { en: "Khufu ruled in the 4th Dynasty of the Old Kingdom, in the 26th century BCE.", ar: "حكم خوفو في الأسرة الرابعة من الدولة القديمة، في القرن السادس والعشرين قبل الميلاد." },
      },
      {
        id: "q5", correct: 2,
        text: { en: "Who was the last active ruler of Ptolemaic Egypt?", ar: "من كانت آخر حاكمة فاعلة لمصر البطلمية؟" },
        options: { en: ["Nefertiti", "Hatshepsut", "Cleopatra VII", "Ahmose-Nefertari"], ar: ["نفرتيتي", "حتشبسوت", "كليوباترا السابعة", "أحمس نفرتاري"] },
        explanation: { en: "Cleopatra VII died in 30 BCE. Egypt then became a Roman province.", ar: "توفيت كليوباترا السابعة عام 30 ق.م، ثم أصبحت مصر ولاية رومانية." },
      },
      {
        id: "q6", correct: 1,
        text: { en: "In which year did Egypt come under Roman control after the fall of Alexandria?", ar: "في أي عام خضعت مصر للسيطرة الرومانية بعد سقوط الإسكندرية؟" },
        options: { en: ["332 BCE", "30 BCE", "641 CE", "1517 CE"], ar: ["332 ق.م", "30 ق.م", "641 م", "1517 م"] },
        explanation: { en: "Octavian took Alexandria in 30 BCE. 332 BCE is Alexander's arrival, 641 CE the Arab conquest period and 1517 CE the Ottoman conquest.", ar: "دخل أوكتافيان الإسكندرية عام 30 ق.م. أما 332 ق.م فهو وصول الإسكندر، و641 م فترة الفتح العربي، و1517 م الفتح العثماني." },
      },
      {
        id: "q7", correct: 1,
        text: { en: "Near which city is the Valley of the Kings, burial place of many New Kingdom pharaohs?", ar: "قرب أي مدينة يقع وادي الملوك، مدفن كثير من فراعنة الدولة الحديثة؟" },
        options: { en: ["Memphis", "Thebes (Luxor)", "Alexandria", "Giza"], ar: ["منف", "طيبة (الأقصر)", "الإسكندرية", "الجيزة"] },
        explanation: { en: "The valley lies on the west bank of the Nile opposite ancient Thebes, today Luxor.", ar: "يقع الوادي على الضفة الغربية للنيل قبالة طيبة القديمة، الأقصر اليوم." },
      },
      {
        id: "q8", correct: 0,
        text: { en: "Who led the excavation that found the tomb of Tutankhamun in 1922?", ar: "من قاد الحفريات التي اكتشفت مقبرة توت عنخ آمون عام 1922؟" },
        options: { en: ["Howard Carter", "Jean-François Champollion", "Auguste Mariette", "Flinders Petrie"], ar: ["هوارد كارتر", "جان فرانسوا شامبليون", "أوغست مارييت", "فليندرز بتري"] },
        explanation: { en: "Howard Carter's team, funded by Lord Carnarvon, found the largely intact tomb in the Valley of the Kings.", ar: "عثر فريق هوارد كارتر، بتمويل من اللورد كارنارفون، على المقبرة شبه السليمة في وادي الملوك." },
      },
      {
        id: "q9", correct: 1,
        text: { en: "Which rock-cut temple complex in the south of Egypt was built under Ramesses II?", ar: "أي مجمع معابد منحوت في الصخر جنوب مصر بُني في عهد رمسيس الثاني؟" },
        options: { en: ["Karnak", "Abu Simbel", "Edfu", "Philae"], ar: ["الكرنك", "أبو سمبل", "إدفو", "فيلة"] },
        explanation: { en: "The Abu Simbel temples were carved into a cliff beside the Nile and later moved in the 1960s to avoid flooding by Lake Nasser.", ar: "نُحتت معابد أبو سمبل في جرف بجانب النيل، ثم نُقلت في الستينيات لتفادي غمرها ببحيرة ناصر." },
      },
      {
        id: "q10", correct: 1,
        text: { en: "How many days did the ancient Egyptian civil calendar have?", ar: "كم يومًا كان في التقويم المدني المصري القديم؟" },
        options: { en: ["360", "365", "354", "366"], ar: ["360", "365", "354", "366"] },
        explanation: { en: "It had 12 months of 30 days plus 5 extra days. It had no leap day, so it slowly drifted against the seasons.", ar: "كان فيه 12 شهرًا من 30 يومًا مع 5 أيام إضافية. ولم يكن فيه يوم كبيس، فكان ينزاح ببطء عن الفصول." },
      },
    ],
  },
  {
    id: "quiz-roman-empire", slug: "roman-empire", civId: "civ-roman-empire", status: "draft",
    title: { en: "Roman Empire: Five Quick Questions" },
    intro: { en: "Emperors, assassinations and the end of the Western Empire." },
    questions: [
      {
        id: "q1", correct: 0,
        text: { en: "Who is regarded as the first Roman emperor?" },
        options: { en: ["Augustus", "Julius Caesar", "Nero", "Constantine"] },
        explanation: { en: "Octavian received the name Augustus in 27 BCE and held power while keeping Republican forms.", },
      },
      {
        id: "q2", correct: 2,
        text: { en: "In which month was Julius Caesar assassinated in 44 BCE?" },
        options: { en: ["January", "August", "March", "December"] },
        explanation: { en: "He was killed on 15 March, known in the Roman calendar as the Ides of March." },
      },
      {
        id: "q3", correct: 1,
        text: { en: "Which year is traditionally used for the end of the Western Roman Empire?" },
        options: { en: ["410 CE", "476 CE", "800 CE", "1453 CE"] },
        explanation: { en: "In 476 CE Odoacer deposed the last western emperor. 410 CE is the sack of Rome by the Visigoths, 800 CE Charlemagne's coronation and 1453 CE the fall of Constantinople." },
      },
      {
        id: "q4", correct: 3,
        text: { en: "Which city was the capital of the Eastern Roman (Byzantine) Empire?" },
        options: { en: ["Alexandria", "Athens", "Antioch", "Constantinople"] },
        explanation: { en: "Constantinople, today Istanbul, was dedicated as an imperial capital in 330 CE." },
      },
      {
        id: "q5", correct: 1,
        text: { en: "Octavian's fleet defeated which pair at the Battle of Actium in 31 BCE?" },
        options: { en: ["Pompey and Crassus", "Mark Antony and Cleopatra", "Brutus and Cassius", "Hannibal and Hasdrubal"] },
        explanation: { en: "After Actium, Octavian took Alexandria in 30 BCE and Egypt came under Roman control." },
      },
    ],
  },
];

export const getQuiz = (slug: string) => quizzes.find((q) => q.slug === slug);
