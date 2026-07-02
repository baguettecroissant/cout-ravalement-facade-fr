import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { createHash } from 'crypto';

const isBuild = process.argv.includes('build');

export default defineConfig({
  site: 'https://cout-ravalement-facade.fr',
  output: 'static',
  adapter: isBuild ? cloudflare() : undefined,
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
