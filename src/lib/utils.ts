import fs from 'fs';

const pathWithLang = (slug:string, lang:string) => `src/data/t/${slug}.${lang}.md`
export const getTitle = (slug:string) => getMetadata(slug, 'title');
export const isDraft  = (slug:string) => getMetadata(slug, 'draft') == 'true';
const getMetadata = (slug:string, field:string) => {
  const checkIfLangExists = (lang:string) => {
    try { fs.accessSync(pathWithLang(slug, lang))
    } catch { return false; }
    return true;
  };
  const normalizedLang = ['en', 'ja'].filter(checkIfLangExists)[0];
  const path = pathWithLang(slug, normalizedLang);
  const body = fs.readFileSync(path, {encoding: 'utf-8'});
  const regexp = new RegExp(`${field}\: (.*?)$`,'m');
  return regexp.test(body) ? body.match(regexp)[1] : slug;
};
