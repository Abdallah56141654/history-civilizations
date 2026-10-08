import type { Author } from "@/lib/types";

// A collective byline. No individual credentials are claimed. Add real authors here when they exist.
export const authors: Author[] = [
  {
    id: "editorial-team",
    slug: "editorial-team",
    names: { en: "Editorial team", ar: "فريق التحرير", de: "Redaktion", fr: "Équipe éditoriale", es: "Equipo editorial", it: "Redazione", zh: "编辑团队" },
    bio: {
      en: "The editorial team drafts pages from published scholarship. Pages stay marked as drafts until their claims have been checked against sources and reviewed by a person.",
      ar: "يعدّ فريق التحرير الصفحات استنادًا إلى الدراسات المنشورة. تبقى الصفحات مصنفة كمسودات حتى يُتحقق من معلوماتها مقابل المصادر وتراجعها جهة بشرية.",
      de: "Die Redaktion erstellt Seiten auf Grundlage veröffentlichter Forschung. Seiten bleiben Entwürfe, bis ihre Aussagen anhand von Quellen geprüft und von einer Person gesichtet wurden.",
    },
  },
];
export const getAuthor = (id: string) => authors.find((a) => a.id === id);
