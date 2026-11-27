import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { LANDSCAPES, PHOTOS } from './lib/catalog';

const coords = z.object({ lat: z.number().min(-90).max(90), lon: z.number().min(-180).max(180) });

const trips = defineCollection({
  loader: file('src/content/trips.json'),
  schema: z.object({
    /** Orden de aparición en listados */
    order: z.number().int().positive(),
    title: z.string(),
    shortTitle: z.string(),
    region: z.string(),
    days: z.number().int().positive(),
    /** "todos" = aparece en cualquier filtro de paisaje */
    landscape: z.enum(LANDSCAPES),
    difficulty: z.enum(['Baja', 'Media', 'Media-alta', 'Alta']),
    /** USD, precio de ejemplo */
    priceFrom: z.number().int().positive(),
    image: z.enum(PHOTOS),
    /** Fecha de ejemplo, ISO yyyy-mm-dd */
    nextDeparture: z.iso.date(),
    seatsLeft: z.number().int().min(0).max(12),
    tag: z.string().optional(),
    description: z.string(),
    coords: coords.optional(),
    distanceKm: z.number().positive().optional(),
    maxAltitudeM: z.number().positive().optional(),
    transfersKm: z.number().positive().optional(),
  }),
});

const testimonials = defineCollection({
  loader: file('src/content/testimonials.json'),
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    trip: z.string(),
    city: z.string(),
    rating: z.number().int().min(1).max(5),
  }),
});

const parks = defineCollection({
  loader: file('src/content/parks.json'),
  schema: z.object({ name: z.string() }),
});

const search = defineCollection({
  loader: file('src/content/search.json'),
  schema: z.object({
    label: z.string(),
    fields: z.array(z.object({ label: z.string(), options: z.array(z.string()).min(1) })).min(1),
  }),
});

const faq = defineCollection({
  loader: file('src/content/faq.json'),
  schema: z.object({ order: z.number().int().positive(), question: z.string(), answer: z.string() }),
});

export const collections = { trips, testimonials, parks, search, faq };
