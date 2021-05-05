import fs from 'fs';

const uniq = (array) => [...new Set(array)];

export async function get() {
  const slugs = uniq(fs.readdirSync('src/data/t').map(s => s.replace(/\..*$/, '')));
  const articles = slugs.map(slug => {
    return {
      slug,
      createdAt: slug.match(/^\d{4}\-\d{2}\-\d{2}/)[0],
      title: fs.readFileSync(`src/data/t/${slug}.en.md`, {encoding: 'utf-8'})
               .match( /title\: (.*?)$/m)[1],
    }
  }).sort((e1, e2) => (e1.createdAt < e2.createdAt ? 1 : -1));
  return {
    body: { articles }
  };
}
