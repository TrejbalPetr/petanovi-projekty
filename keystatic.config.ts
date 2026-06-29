import { config, collection, singleton, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Články",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Název" } }),
        date: fields.date({ label: "Datum" }),
        category: fields.select({
          label: "Kategorie",
          options: [
            { label: "DIY", value: "DIY" },
            { label: "Expedice", value: "Expedice" },
            { label: "Documents", value: "Documents" },
          ],
          defaultValue: "DIY",
        }),
        excerpt: fields.text({
          label: "Perex",
          multiline: true,
        }),
        metaDescription: fields.text({
          label: "Meta description (SEO)",
          description: "Popis článku pro vyhledávače a sdílení (doporučeno 120–160 znaků). Pokud nevyplníš, použije se perex.",
          multiline: true,
        }),
        readingTime: fields.number({
          label: "Čas čtení (minuty)",
          defaultValue: 5,
        }),
        coordinates: fields.text({
          label: "GPS Souřadnice",
          description: 'Např. "50°01\'N 14°26\'E"',
        }),
        coverImage: fields.image({
          label: "Náhledový obrázek",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
        }),
        ogImage: fields.image({
          label: "OG Image (pro sdílení na sociálních sítích)",
          description: "Obrázek zobrazovaný při sdílení na Facebooku, Twitteru, LinkedIn apod. (doporučeno 1200×630 px). Pokud nevyplníš, použije se náhledový obrázek.",
          directory: "public/images/og",
          publicPath: "/images/og/",
        }),
        body: fields.mdx({ label: "Obsah" }),
        downloads: fields.array(
          fields.object({
            label: fields.text({
              label: "Popisek",
              description: "Zobrazovaný název (např. 'Výkres rámu'). Nechte prázdné pro použití názvu souboru.",
            }),
            filename: fields.text({
              label: "Název souboru ke stažení",
              description: "Přesný název včetně přípony (např. ram-v2.stl). Prohlížeč soubor stáhne pod tímto jménem.",
            }),
            file: fields.file({
              label: "Soubor",
              directory: "public/downloads",
              publicPath: "/downloads/",
              description: "PDF, PNG, SVG, STL, OBJ, ZIP...",
            }),
          }),
          {
            label: "Soubory ke stažení",
            itemLabel: (props) => props.fields.label.value || "Soubor",
          }
        ),
      },
    }),
  },
  singletons: {
    oProjektu: singleton({
      label: "Stránka: O projektu",
      path: "content/pages/o-projektu",
      format: { contentField: "body" },
      schema: {
        metaTitle: fields.text({
          label: "Meta Title",
          description: "Titulek stránky pro vyhledávače (doporučeno do 60 znaků).",
        }),
        metaDescription: fields.text({
          label: "Meta Description (SEO)",
          description: "Popis stránky pro vyhledávače a sdílení (doporučeno 120–160 znaků).",
          multiline: true,
        }),
        ogImage: fields.image({
          label: "OG Image (pro sdílení na sociálních sítích)",
          description: "Obrázek zobrazovaný při sdílení na Facebooku, Twitteru, LinkedIn apod. (doporučeno 1200×630 px).",
          directory: "public/images/og",
          publicPath: "/images/og/",
        }),
        body: fields.mdx({ label: "Obsah stránky" }),
      },
    }),
    zasady: singleton({
      label: "Stránka: Zásady ochrany osobních údajů",
      path: "content/pages/zasady",
      format: { contentField: "body" },
      schema: {
        metaTitle: fields.text({
          label: "Meta Title",
          description: "Titulek stránky pro vyhledávače (doporučeno do 60 znaků).",
        }),
        metaDescription: fields.text({
          label: "Meta Description (SEO)",
          description: "Popis stránky pro vyhledávače a sdílení (doporučeno 120–160 znaků).",
          multiline: true,
        }),
        ogImage: fields.image({
          label: "OG Image (pro sdílení na sociálních sítích)",
          description: "Obrázek zobrazovaný při sdílení na Facebooku, Twitteru, LinkedIn apod. (doporučeno 1200×630 px).",
          directory: "public/images/og",
          publicPath: "/images/og/",
        }),
        body: fields.mdx({ label: "Obsah stránky" }),
      },
    }),
  },
});
