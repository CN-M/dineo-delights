import {defineCliConfig} from 'sanity/cli'

const {VITE_PROJECT_ID, VITE_DATASET} = import.meta.env

export default defineCliConfig({
  api: {
    projectId: VITE_PROJECT_ID,
    dataset: VITE_DATASET,
  },
})
