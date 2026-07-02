import { defineConfig } from 'astro/config';
import { createHash } from 'crypto';

export default defineConfig({
  site: 'https://cout-ravalement-facade.fr',
  output: 'static',
  vite: {
    ssr: {
      external: [],
    },
    css: {
      modules: {
        generateScopedName: (name, filename) => {
          const file = filename.split('/').pop().split('.')[0];
          const hash = createHash('md5').update(filename + name).digest('hex').substring(0, 5);
          return `w_${file}_${name}_${hash}`;
        },
      },
    },
  },
  trailingSlash: 'never',
});
