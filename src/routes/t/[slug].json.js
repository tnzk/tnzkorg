import fs from 'fs';
import remark from 'remark';
import remarkFrontMatter from 'remark-frontmatter';
import remarkExtractFrontMatter from 'remark-extract-frontmatter';
import remarkHTML from 'remark-html';
import yaml from 'yaml';

const renderMarkdown = async (source) => {
  return await remark()
    .use(remarkHTML)
    .use(remarkFrontMatter)
    .use(remarkExtractFrontMatter, { yaml: yaml.parse })
    .process(source);
};

const loadArticle = async (path) => {
  const source = fs.readFileSync(path, { encoding: 'utf-8'});
  const { data, contents } = await renderMarkdown(source);
  const { title, distro } = data;
  return {
    title, distro,
    body: contents
  }
};

export async function get({ params }) {
  const { slug } = params;
  const possibleLanguages = ['en', 'ja']
  const availablePaths = possibleLanguages
    .map(lang => { return { lang, path: `src/data/t/${slug}.${lang}.md` } })
    .filter(({lang, path}) => {
      try {
        fs.accessSync(path);
      } catch (err) {
        return false;
      }
      return true;
    });
  const responseBody = Object.fromEntries(await Promise.all(availablePaths.map(async ({lang, path}) => {
    return [
      lang,
      await loadArticle(path),
    ];
  })));

  return {
    body: responseBody
  };
}
