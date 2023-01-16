import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const { VITE_TOKEN, VITE_PROJECT_ID, VITE_DATASET } = import.meta.env;

export const client = sanityClient({
  projectId: VITE_PROJECT_ID,
  dataset: VITE_DATASET,
  apiVersion: '2022-12-24',
  useCdn: true,
  token: VITE_TOKEN,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
