import Link from "next/link";
import { colors, mono, sans } from "@/lib/typography";

export const metadata = {
  title: "Zásady ochrany osobních údajů — Peťanovi Projekty",
  description: "Informace o zpracování osobních údajů na blogu Peťanovi Projekty.",
};

const h2Style = {
  fontSize: sans.h2,
  fontWeight: 700,
  color: colors.textPrimary,
  letterSpacing: "-0.03em",
  marginTop: "3rem",
  marginBottom: "0.75rem",
};

const h3Style = {
  fontSize: sans.xl,
  fontWeight: 700,
  color: colors.textPrimary,
  letterSpacing: "-0.02em",
  marginTop: "2rem",
  marginBottom: "0.5rem",
};

const pStyle = {
  color: colors.textSecondary,
  fontSize: sans.base,
  lineHeight: 1.7,
  marginBottom: "0.75rem",
};

const listStyle = {
  color: colors.textSecondary,
  fontSize: sans.base,
  lineHeight: 1.8,
  paddingLeft: "1.25rem",
  marginBottom: "0.75rem",
};

export default function ZasadyPage() {
  return (
    <div style={{ padding: "5rem 2rem 8rem" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>

        <span className="font-mono" style={{ color: colors.blue, fontSize: mono.base, letterSpacing: "0.1em", display: "block", marginBottom: "1rem" }}>
          DOCUMENTS // ZÁSADY
        </span>

        <h1 style={{ fontSize: sans.h1, fontWeight: 700, color: colors.textPrimary, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "3rem" }}>
          Zásady ochrany osobních údajů
        </h1>

        {/* Kdo jsem */}
        <h2 style={h2Style}>Kdo jsem</h2>
        <p style={pStyle}>
          Jmenuji se Petr Trejbal a provozuji tento osobní blog s názvem „Peťanovi Projekty".
          Pokud mě chceš kontaktovat, použij{" "}
          <Link href="/#kontakt" style={{ color: colors.yellow, textDecoration: "none" }}>
            kontaktní formulář
          </Link>
          .
        </p>

        {/* Co sbírám */}
        <h2 style={h2Style}>Jaké osobní údaje sbírám a proč</h2>
        <h3 style={h3Style}>Kontaktování přes formulář</h3>
        <p style={pStyle}>Když mi napíšeš přes kontaktní formulář, ukládám tvoje:</p>
        <ul style={listStyle}>
          <li>jméno / přezdívku,</li>
          <li>e-mailovou adresu (pokud ho uvedeš),</li>
          <li>zprávu, kterou mi pošleš.</li>
        </ul>
        <p style={pStyle}>
          Tyto údaje slouží výhradně k tomu, abych ti mohl odpovědět nebo se pobavit.
          Neposílám žádné newslettery ani nabídky, pokud se s tebou výslovně na ničem nedomluvíme.
        </p>

        {/* Disclaimer */}
        <div style={{ borderLeft: `3px solid ${colors.yellow}`, paddingLeft: "1.5rem", marginTop: "3rem", marginBottom: "1rem" }}>
          <h2 style={{ ...h2Style, marginTop: "0" }}>Prohlášení o vyloučení odpovědnosti (Disclaimer)</h2>
          <p style={pStyle}>
            Návody a projekty na tomto blogu sdílím jako záznam svých vlastních pokusů. Nejsem certifikovaná zkušebna ani servis.
            Pokud se rozhodneš cokoliv z toho replikovat, děláš to na vlastní nebezpečí a vlastní odpovědnost.
            Elektřina kope, stroje mají svou hlavu a gravitace je neúprosná — prosím, používej u toho zdravý rozum.
          </p>
        </div>

        {/* Analytika */}
        <h2 style={h2Style}>Analytika</h2>
        <p style={pStyle}>
          Tento web může používat nástroje jako Google Analytics (nebo jiný analytický nástroj),
          který anonymně sleduje, kolik lidí na blog chodí, odkud přicházejí a co je zajímá.
          Tyto informace nepřiřazuji ke konkrétní osobě.
        </p>

        {/* Cookies */}
        <h2 style={h2Style}>Soubory cookies</h2>
        <p style={pStyle}>
          Web může používat cookies — malé soubory, které pomáhají s jeho fungováním nebo měřením návštěvnosti.
          O jejich využití rozhoduješ ty v konfiguračním panelu, který se ti zobrazí při první návštěvě.
        </p>

        {/* Jak dlouho */}
        <h2 style={h2Style}>Jak dlouho údaje uchovávám</h2>
        <p style={pStyle}>
          Údaje z kontaktního formuláře si ponechám tak dlouho, dokud spolu budeme komunikovat.
          Pak už je dále nijak nezpracuji, ani nearchivuji.
        </p>

        {/* Komu předávám */}
        <h2 style={h2Style}>Komu údaje předávám</h2>
        <p style={pStyle}>
          Nikomu. Údaje nesdílím, neprodávám, nepronajímám. Ani kamarádům. Ani robotům. Ani firmám.
        </p>

        {/* Práva */}
        <h2 style={h2Style}>Jaká máš práva</h2>
        <p style={pStyle}>Pokud jsi mi někdy poskytl(a) osobní údaje (např. přes kontaktní formulář), máš právo:</p>
        <ul style={listStyle}>
          <li>vědět, jaké údaje o tobě mám,</li>
          <li>požádat o jejich opravu nebo smazání,</li>
          <li>kdykoliv odvolat souhlas se zpracováním.</li>
        </ul>
        <p style={pStyle}>
          Stačí napsat přes{" "}
          <Link href="/#kontakt" style={{ color: colors.yellow, textDecoration: "none" }}>
            kontaktní formulář
          </Link>
          .
        </p>

        {/* Povinnosti */}
        <h2 style={h2Style}>Jaké máš povinnosti</h2>
        <p style={pStyle}>
          Jasně, že většinu odpovědnosti mám já — ten, kdo spravuje tenhle blog.
          Ale aby všechno fungovalo fér, i ty máš pár základních pravidel:
        </p>

        <h3 style={h3Style}>Zachovávej rozumnost a respekt</h3>
        <ul style={listStyle}>
          <li>Neposílej přes kontaktní formulář žádné citlivé údaje (např. rodná čísla, PINy, přístupová hesla, tajné recepty na guláš… prostě nic, co by tě mohlo mrzet).</li>
          <li>Nepiš mi jménem někoho jiného, pokud k tomu nemáš jeho svolení. (Ano, i když je to jen vtipná historka.)</li>
        </ul>

        <h3 style={h3Style}>Při používání webu</h3>
        <ul style={listStyle}>
          <li>Nezlob web. Není to armádní server, ale taky si nezaslouží spam, skriptování nebo hackování.</li>
          <li>Když se ti něco nezdá — třeba v cookies nebo textu — klidně se ozvi. Můžeme to vyřešit po lidsku.</li>
        </ul>

        <h3 style={h3Style}>Respektuj autorská práva</h3>
        <ul style={listStyle}>
          <li>Obsah blogu (texty, fotky, ikony apod.) je můj originální výtvor — tedy pokud není u konkrétního prvku uvedeno jinak. Takže ho prosím nekopíruj a nepoužívej dál bez domluvy.</li>
          <li>Pokud chceš něco použít, napiš mi. Nekoušu.</li>
        </ul>

        {/* Verze */}
        <div style={{ borderTop: `1px solid ${colors.borderSubtle}`, marginTop: "4rem", paddingTop: "1.5rem" }}>
          <span className="font-mono" style={{ color: colors.textMuted, fontSize: mono.base, letterSpacing: "0.05em" }}>
            VERZE DOKUMENTU: LEDEN 2026
          </span>
        </div>

      </div>
    </div>
  );
}
