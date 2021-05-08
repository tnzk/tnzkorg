import fs from 'fs';
import { getTitle, isDraft } from '../../lib/utils';

const uniq = (array:string[]) => [...new Set(array)];

export async function get() {
  const slugs = uniq(fs.readdirSync('src/data/t').map(s => s.replace(/\..*$/, '')));
  const articles = slugs.map(slug => {
    return (isDraft(slug) ? null : {
      slug,
      createdAt: slug.match(/^\d{4}\-\d{2}\-\d{2}/)[0],
      title: getTitle(slug),
    });
  }).filter(e => e).sort((e1, e2) => (e1.createdAt < e2.createdAt ? 1 : -1));
  return {
    body: { articles }
  };
}
