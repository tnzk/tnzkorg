import fs from 'fs';

const uniq = (array:string[]) => [...new Set(array)];

export async function get() {
  const slugs = uniq(fs.readdirSync('src/data/t').map(s => s.replace(/\..*$/, '')));
  const articles = slugs.map(slug => {
    return {
      slug,
      createdAt: slug.match(/^\d{4}\-\d{2}\-\d{2}/)[0],
      title: getTitle(slug),
    }
  }).sort((e1, e2) => (e1.createdAt < e2.createdAt ? 1 : -1));
  return {
    body: { articles }
  };
}

const pathWithLang = (slug:string, lang:string) => `src/data/t/${slug}.${lang}.md`
const getTitle = (slug:string) => {
  const checkIfLangExists = (lang:string) => {
    try { fs.accessSync(pathWithLang(slug, lang))
    } catch { return false; }
    return true;
  };
  const normalizedLang = ['en', 'ja'].filter(checkIfLangExists)[0];
  const path = pathWithLang(slug, normalizedLang);
  const body = fs.readFileSync(path, {encoding: 'utf-8'});
  const regexp = /title\: (.*?)$/m;
  return regexp.test(body) ? body.match(regexp)[1] : slug;
};
