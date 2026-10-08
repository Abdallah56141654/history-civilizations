import type { Lang } from "@/i18n/config";

export type LegalPage = "privacy" | "terms" | "disclaimer" | "cookies";
export interface LegalSection { heading: string; body: string[] }

// Plain-language templates. They describe what this codebase actually does by default (no analytics, no accounts, no forms).
// {operator} and {email} are replaced from environment variables. They are NOT legal advice and must be reviewed by a lawyer.
// Languages other than English and Arabic fall back to English with a visible notice.
export const legal: Record<LegalPage, Partial<Record<Lang, LegalSection[]>>> = {
  privacy: {
    en: [
      { heading: "Who is responsible", body: ["This website is operated by {operator}. You can reach the operator at {email}."] },
      { heading: "What the site stores on your device", body: [
        "To work as you expect, the site stores a few preferences in your browser: your theme (light or dark), your chosen language, and your last few searches. These stay on your device and are not sent to us.",
        "The language choice is also saved in a cookie named lang for one year so that the site can open in your language.",
      ] },
      { heading: "What the site does not do", body: ["The site has no user accounts, no comment forms and no newsletter sign-up in its default form. It does not ask you for personal data."] },
      { heading: "Server logs and hosting", body: ["The hosting provider may process technical request data such as your IP address in server logs. Please read your hosting provider's privacy notice for details."] },
      { heading: "Third-party services", body: [
        "Fonts are served from this site. When you open the map page, your browser requests map tiles from the map tile provider, which receives your IP address and the area you view. By default this is OpenStreetMap. External links lead to sites with their own privacy practices.",
      ] },
      { heading: "Analytics", body: ["By default no analytics tool is loaded. If the operator enables Google Analytics, it loads only after you accept in the consent banner, and you can change your choice at any time through the cookie settings link."] },
      { heading: "Your rights", body: ["Depending on where you live, you may have the right to access, correct or delete personal data held about you, to object to processing, and to complain to a data protection authority. Contact the operator to exercise these rights."] },
      { heading: "Changes", body: ["This policy may be updated. The date of the latest update is shown at the top of the page."] },
    ],
    ar: [
      { heading: "الجهة المسؤولة", body: ["يشغّل هذا الموقع {operator}. يمكنك التواصل مع المشغّل عبر {email}."] },
      { heading: "ما يخزّنه الموقع على جهازك", body: [
        "ليعمل الموقع كما تتوقع، يحفظ في متصفحك بعض التفضيلات: السمة (فاتحة أو داكنة)، واللغة التي اخترتها، وآخر عمليات بحثك. تبقى هذه على جهازك ولا تُرسل إلينا.",
        "كما تُحفظ اللغة في ملف ارتباط باسم lang لمدة سنة حتى يفتح الموقع بلغتك.",
      ] },
      { heading: "ما لا يفعله الموقع", body: ["لا يحتوي الموقع في صيغته الافتراضية على حسابات مستخدمين ولا نماذج تعليقات ولا اشتراك في نشرة بريدية. ولا يطلب منك بيانات شخصية."] },
      { heading: "سجلات الخادم والاستضافة", body: ["قد تعالج جهة الاستضافة بيانات تقنية للطلبات مثل عنوان IP في سجلات الخادم. يُرجى الاطلاع على سياسة الخصوصية لدى جهة الاستضافة."] },
      { heading: "خدمات الأطراف الثالثة", body: ["تُقدَّم الخطوط من هذا الموقع. وعند فتح صفحة الخريطة يطلب متصفحك بلاطات الخريطة من مزوّدها، فيتلقى عنوان IP الخاص بك والمنطقة التي تعرضها. والمزوّد الافتراضي هو OpenStreetMap. والروابط الخارجية تقود إلى مواقع لها ممارسات خصوصية خاصة بها."] },
      { heading: "التحليلات", body: ["لا تُحمَّل أي أداة تحليلات افتراضيًا. وإذا فعّل المشغّل Google Analytics فلن تُحمَّل إلا بعد موافقتك في شريط الموافقة، ويمكنك تغيير اختيارك في أي وقت عبر رابط إعدادات ملفات الارتباط."] },
      { heading: "حقوقك", body: ["بحسب بلد إقامتك، قد يكون لك الحق في الاطلاع على بياناتك الشخصية وتصحيحها وحذفها، والاعتراض على معالجتها، وتقديم شكوى لدى جهة حماية البيانات. تواصل مع المشغّل لممارسة هذه الحقوق."] },
      { heading: "التغييرات", body: ["قد تُحدَّث هذه السياسة. ويظهر تاريخ آخر تحديث أعلى الصفحة."] },
    ],
  },
  terms: {
    en: [
      { heading: "Purpose", body: ["This website provides general historical information for education and interest. By using it you agree to these terms."] },
      { heading: "Content status", body: ["Pages marked as drafts have not yet been fully checked against sources. Please do not rely on them for study, publication or decisions without verifying them yourself."] },
      { heading: "Intellectual property", body: [
        "Unless stated otherwise, the text, design and code of this site belong to {operator}. Images and other media carry their own licenses, which are shown with each item. You must follow the license of any item you reuse.",
      ] },
      { heading: "Acceptable use", body: ["Do not misuse the site, attempt to disrupt it, or copy it at a scale that harms its operation."] },
      { heading: "External links", body: ["The site links to external websites. The operator is not responsible for their content or practices."] },
      { heading: "Liability", body: ["The site is provided as is. To the extent permitted by law, the operator is not liable for losses arising from its use."] },
      { heading: "Changes and contact", body: ["These terms may change. Questions can be sent to {email}."] },
    ],
    ar: [
      { heading: "الغرض", body: ["يقدّم هذا الموقع معلومات تاريخية عامة للتعلّم والاهتمام. باستخدامك له فإنك توافق على هذه الشروط."] },
      { heading: "حالة المحتوى", body: ["الصفحات المصنفة كمسودات لم يُتحقق منها بالكامل مقابل المصادر بعد. يُرجى عدم الاعتماد عليها في الدراسة أو النشر أو اتخاذ القرارات دون التحقق منها بنفسك."] },
      { heading: "الملكية الفكرية", body: ["ما لم يُذكر خلاف ذلك، فنصوص هذا الموقع وتصميمه وشيفرته مملوكة لـ {operator}. وتحمل الصور والوسائط الأخرى تراخيصها الخاصة المبيّنة مع كل عنصر، ويجب عليك الالتزام بترخيص أي عنصر تعيد استخدامه."] },
      { heading: "الاستخدام المقبول", body: ["لا تُسئ استخدام الموقع ولا تحاول تعطيله ولا تنسخه بحجم يضر بتشغيله."] },
      { heading: "الروابط الخارجية", body: ["يحتوي الموقع على روابط لمواقع خارجية، ولا يتحمل المشغّل مسؤولية محتواها أو ممارساتها."] },
      { heading: "المسؤولية", body: ["يُقدَّم الموقع كما هو. وفي الحدود التي يسمح بها القانون، لا يتحمل المشغّل مسؤولية الخسائر الناشئة عن استخدامه."] },
      { heading: "التغييرات والتواصل", body: ["قد تتغير هذه الشروط. ويمكن إرسال الأسئلة إلى {email}."] },
    ],
  },
  disclaimer: {
    en: [
      { heading: "Educational purpose", body: ["The information on this site is for general education. It is not professional, legal or academic advice."] },
      { heading: "Accuracy", body: [
        "History is interpreted, and scholars disagree. The site tries to separate evidence, consensus, debated interpretation and speculation, but it can contain errors and omissions. Pages marked as drafts are especially provisional.",
        "If you find a mistake, please tell us and, if possible, name a source.",
      ] },
      { heading: "AI assistance", body: ["Tools may be used to help with research, drafting, translation and summaries. Nothing is published as verified fact without source checking and human review."] },
      { heading: "External content", body: ["Links and map data come from third parties and are outside the operator's control."] },
    ],
    ar: [
      { heading: "الغرض التعليمي", body: ["المعلومات في هذا الموقع للتثقيف العام، وليست نصيحة مهنية أو قانونية أو أكاديمية."] },
      { heading: "الدقة", body: [
        "التاريخ يخضع للتفسير ويختلف فيه الباحثون. يحاول الموقع التمييز بين الدليل والإجماع والتفسير المختلف عليه والتخمين، لكنه قد يحتوي على أخطاء وإغفالات. والصفحات المصنفة كمسودات مؤقتة بوجه خاص.",
        "إن وجدت خطأً فأخبرنا، وإن أمكن فاذكر مصدرًا.",
      ] },
      { heading: "الاستعانة بالذكاء الاصطناعي", body: ["قد تُستخدم أدوات للمساعدة في البحث والصياغة والترجمة والملخصات. ولا يُنشر شيء بوصفه حقيقة موثقة دون التحقق من المصادر والمراجعة البشرية."] },
      { heading: "المحتوى الخارجي", body: ["الروابط وبيانات الخرائط من أطراف ثالثة وتخرج عن سيطرة المشغّل."] },
    ],
  },
  cookies: {
    en: [
      { heading: "What this page covers", body: ["Cookies and similar storage in your browser. Below is what this site uses by default."] },
      { heading: "Preferences (strictly functional)", body: [
        "lang (cookie, one year): remembers your language so the site opens in it.",
        "lang, theme, recentSearches (browser local storage): remember your language, light or dark theme, and your last searches. They never leave your device.",
      ] },
      { heading: "Analytics (only if enabled and accepted)", body: ["If the operator enables Google Analytics, a banner asks for your consent first. Only after you accept does the site load Google's script, which sets cookies such as _ga. The choice is stored in browser local storage as consent."] },
      { heading: "Changing your choice", body: ["Use the cookie settings link in the footer when it is shown, or clear this site's data in your browser settings."] },
    ],
    ar: [
      { heading: "ما تغطيه هذه الصفحة", body: ["ملفات الارتباط وما يشبهها من تخزين في متصفحك. وفيما يلي ما يستخدمه هذا الموقع افتراضيًا."] },
      { heading: "التفضيلات (وظيفية بحتة)", body: [
        "lang (ملف ارتباط، سنة): يحفظ لغتك ليفتح الموقع بها.",
        "lang وtheme وrecentSearches (التخزين المحلي للمتصفح): تحفظ لغتك والسمة الفاتحة أو الداكنة وآخر عمليات بحثك. ولا تغادر جهازك أبدًا.",
      ] },
      { heading: "التحليلات (فقط إن فُعِّلت وقبلتها)", body: ["إذا فعّل المشغّل Google Analytics فسيطلب شريط موافقتك أولًا. وبعد موافقتك فقط يحمّل الموقع سكربت جوجل الذي يضع ملفات ارتباط مثل _ga. ويُحفظ اختيارك في التخزين المحلي باسم consent."] },
      { heading: "تغيير اختيارك", body: ["استخدم رابط إعدادات ملفات الارتباط في التذييل حين يظهر، أو امسح بيانات هذا الموقع من إعدادات متصفحك."] },
    ],
  },
};
export const LEGAL_UPDATED = "2026-10-06";
