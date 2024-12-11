import dotenv from 'dotenv';
import { defineCliConfig } from 'sanity/cli';

dotenv.config()

const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET } = process.env

export default defineCliConfig({
  api: {
    projectId: SANITY_STUDIO_PROJECT_ID,
    dataset: SANITY_STUDIO_DATASET
  }
})
