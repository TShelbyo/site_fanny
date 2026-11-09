/**
 * Lecture et vérification de src/content/site.json.
 * Si un champ obligatoire manque (ex. un « alt » d'image), le build s'arrête
 * avec un message indiquant précisément le champ à corriger.
 */
import { z } from 'astro/zod';
import type { ImageMetadata } from 'astro';
import raw from '../content/site.json';

const image = z.object({
  image: z.string().min(1),
  alt: z.string().min(1, 'Le texte alternatif (alt) est obligatoire'),
});
const lien = z.object({ libelle: z.string(), lien: z.string() });
const page = z.object({ titre: z.string(), description: z.string() });

const schema = z.object({
  site: z.object({
    url: z.string().url(),
    langue: z.string().default('fr'),
    nomSite: z.string(),
    descriptionParDefaut: z.string(),
    imagePartage: z.string(),
  }),
  navigation: z.array(lien),
  livre: z.object({
    titre: z.string(),
    genre: z.string().optional(),
    sousTitre: z.string().optional(),
    accroche: z.string(),
    couverture: image,
    photo: image,
    resume: z.array(z.string()),
    details: z
      .object({
        formats: z.string().optional(),
        pages: z.number().optional(),
        parution: z.string().optional(),
      })
      .optional(),
  }),
  pages: z.object({
    accueil: page,
    autrice: page,
    abecedaire: page.extend({ introduction: z.string().optional() }),
    contact: page,
    mentionsLegales: page,
  }),
  autrice: z.object({
    nom: z.string(),
    photo: image,
    bio: z.array(z.string()),
    reseaux: z.array(z.object({ nom: z.string(), lien: z.string().url() })),
  }),
  abecedaire: z.array(z.object({ mot: z.string(), definition: z.string() })),
  contact: z.object({
    titre: z.string(),
    texte: z.string(),
    sujets: z.array(z.object({ titre: z.string(), texte: z.string() })).default([]),
    email: z.string().email(),
    objetParDefaut: z.string().optional(),
    delaiReponse: z.string().optional(),
  }),
  piedDePage: z.object({ mention: z.string(), liens: z.array(lien) }),
});

const parsed = schema.safeParse(raw);
if (!parsed.success) {
  const details = parsed.error.issues
    .map((i) => `  • ${i.path.join(' > ')} : ${i.message}`)
    .join('\n');
  throw new Error(`\n\nErreur dans src/content/site.json :\n${details}\n`);
}

export const site = parsed.data;

/* ---------- Images : "couverture.jpg" -> image optimisée de src/assets ---------- */
const assets = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export function img(nom: string): ImageMetadata {
  const found = assets[`../assets/${nom}`];
  if (!found) {
    throw new Error(
      `\n\nImage introuvable : « ${nom} ». Déposez-la dans src/assets/ ou corrigez son nom dans site.json.\n`,
    );
  }
  return found.default;
}
