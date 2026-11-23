import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      // Existing marketing content still uses a few plain <img> tags for
      // remote/legacy assets; they are intentionally left as-is.
      '@next/next/no-img-element': 'off',
    },
  },
  {
    // Legacy components predate the React Compiler hook rules. Their behavior
    // is unchanged by this task, so those rules are scoped off here only.
    files: [
      'components/CakeDisplayCooler.tsx',
      'components/cake-world.tsx',
      'components/layout.tsx',
    ],
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    '.next-prod/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'scratch/**',
  ]),
]);
