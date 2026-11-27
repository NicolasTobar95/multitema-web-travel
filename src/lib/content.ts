import { getCollection } from 'astro:content';

/** Viajes en el orden del catálogo (getCollection no garantiza el orden del JSON). */
export const getTrips = async () => (await getCollection('trips')).sort((a, b) => a.data.order - b.data.order);
