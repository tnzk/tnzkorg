import fs from 'fs';
import path from 'path';

const uniq = (array) => [...new Set(array)];

export async function get() {
  const slugWithLangs = fs.readdirSync('src/data/t').map(s => s.replace(/\..*$/, ''));

  return {
    body: { slugs: uniq(slugWithLangs) }
  };
}
