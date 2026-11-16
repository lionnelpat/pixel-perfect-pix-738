// Allège les photos de public/photos pour les téléphones en connexion mobile.
// À lancer après avoir déposé une nouvelle photo : `npm run photos`.
//
// Pour chaque photo pas encore traitée : la recompresse en JPEG (960 px de large au plus),
// crée les versions -480 et -720, puis l'inscrit dans src/content/photo-variants.json
// (lu par src/lib/images.ts pour proposer la bonne taille à chaque écran).
import { readdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/photos");
const MANIFEST = path.resolve("src/content/photo-variants.json");
const VARIANTS = [480, 720];
const FULL = 960;
/** Image de partage (réseaux sociaux) : format imposé 1200 × 630, laissée telle quelle. */
const SKIP = new Set(["partage.jpg"]);

const isVariant = (f) => /-(480|720)\.jpg$/.test(f);
const files = (await readdir(DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f) && !isVariant(f) && !SKIP.has(f));
const manifest = new Set(JSON.parse(await readFile(MANIFEST, "utf8").catch(() => "[]")));

for (const file of files) {
  const base = file.replace(/\.[^.]+$/, "");
  const out = `${base}.jpg`;
  if (manifest.has(`/photos/${out}`)) continue;

  const input = await readFile(path.join(DIR, file));
  const jpeg = (width, quality) =>
    sharp(input).rotate().resize({ width, withoutEnlargement: true }).jpeg({ quality, mozjpeg: true }).toBuffer();

  for (const w of VARIANTS) await writeFile(path.join(DIR, `${base}-${w}.jpg`), await jpeg(w, 68));
  const tmp = path.join(DIR, `${base}.tmp`);
  await writeFile(tmp, await jpeg(FULL, 74));
  if (file !== out) await unlink(path.join(DIR, file));
  await rename(tmp, path.join(DIR, out));

  manifest.add(`/photos/${out}`);
  console.log(`${file} → ${out} (+ ${VARIANTS.map((w) => `-${w}`).join(", ")})`);
}

await writeFile(MANIFEST, `${JSON.stringify([...manifest].sort(), null, 2)}\n`);
