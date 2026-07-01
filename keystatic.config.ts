import React from "react";
import { config, collection, singleton, fields } from "@keystatic/core";
import { block } from "@keystatic/core/content-components";

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
        body: fields.mdx({
          label: "Obsah",
          components: {
            GpxViewer: block({
              label: "GPX Mapa",
              description: "Vloží interaktivní mapu trasy s profilem převýšení z GPX souboru.",
              schema: {
                gpxFile: fields.file({
                  label: "GPX Soubor (.gpx)",
                  directory: "public/gpx",
                  publicPath: "/gpx/",
                  description: "Nahrajte GPX soubor trasy přímo sem.",
                }),
                title: fields.text({
                  label: "Název trasy (volitelné)",
                  description: "Zobrazí se v záhlaví mapy, např. 'Malá Fatra — přechod'",
                }),
              },
              ContentView: () =>
                React.createElement(
                  "div",
                  {
                    style: {
                      padding: "12px 16px",
                      background: "#0d2540",
                      border: "1px solid #1E3A5F",
                      borderLeft: "3px solid #FBBF24",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    },
                  },
                  React.createElement(
                    "span",
                    {
                      style: {
                        fontFamily: "monospace",
                        fontSize: "11px",
                        color: "#FBBF24",
                        letterSpacing: "0.1em",
                      },
                    },
                    "[ GPX MAPA ]"
                  ),
                  React.createElement(
                    "span",
                    {
                      style: {
                        fontFamily: "monospace",
                        fontSize: "10px",
                        color: "#7A9BB5",
                        letterSpacing: "0.06em",
                      },
                    },
                    "mapa + profil převýšení"
                  )
                ),
            }),
          },
        }),
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
    homepage: singleton({
      label: "Hlavní stránka",
      path: "content/pages/homepage",
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
        heroLabel: fields.text({
          label: "Popisek nad nadpisem",
          description: 'Zobrazuje se jako "// DIGITÁLNÍ DENÍK".',
          defaultValue: "DIGITÁLNÍ DENÍK",
        }),
        heroHeadline: fields.text({
          label: "Nadpis — první část",
          description: 'Text nadpisu před zvýrazněným slovem, např. "Deník pokusů, omylů a".',
          defaultValue: "Deník pokusů, omylů a",
        }),
        heroHeadlineAccent: fields.text({
          label: "Nadpis — zvýrazněné slovo (žlutě)",
          description: 'Slovo na konci nadpisu zobrazené žlutě, např. "výprav.".',
          defaultValue: "výprav.",
        }),
        heroBodyFocusWords: fields.array(
          fields.text({ label: "Slovo" }),
          {
            label: "BODY ZÁJMU — seznam slov (střídají se každé 2 s)",
            description: 'Slova se budou cyklicky střídat každé 2 sekundy. Zobrazuje se jako "BODY ZÁJMU: TRÉNINK_".',
            itemLabel: (props) => props.value || "Slovo",
          }
        ),
        heroDescription: fields.text({
          label: "Krátký popis webu",
          description: "Pár vět pod nadpisem v hero sekci.",
          multiline: true,
          defaultValue: "DIY projekty, 3D tisk a outdoorové výpravy.\nZdokumentované, otestované a připravené k replikaci.",
        }),
        gpsCoordinates: fields.text({
          label: "GPS souřadnice (status bar)",
          description: 'Souřadnice zobrazené vedle hodin, např. "N 50°05′ E 14°28′".',
          defaultValue: "N 50°05′ E 14°28′",
        }),
        contactHeading: fields.text({
          label: "Kontakt — nadpis",
          defaultValue: "Chceš se o něco podělit?",
        }),
        contactDescription: fields.text({
          label: "Kontakt — popis",
          description: "Každý řádek se zobrazí jako samostatný odstavec.",
          multiline: true,
          defaultValue: "Máš dotaz, nápad, návrh nebo se chceš pochlubit?\nNašel si chybu na webu nebo v mých projektech?\nAni kritika není nežádoucí.\nNapiš a nějak to vyřešíme 😊",
        }),
        body: fields.mdx({ label: "Doplňkový obsah (volitelné)" }),
      },
    }),
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
