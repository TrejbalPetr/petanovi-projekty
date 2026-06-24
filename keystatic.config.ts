import { config, collection, fields } from "@keystatic/core";

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
        body: fields.mdx({ label: "Obsah" }),
      },
    }),
  },
});
