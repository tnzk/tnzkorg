import fs from 'fs';
import remark from 'remark';
import remarkFrontMatter from 'remark-frontmatter';
import remarkExtractFrontMatter from 'remark-extract-frontmatter';
import remarkHTML from 'remark-html';
import yaml from 'yaml';
import Marp from '@marp-team/marp-core'

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

const renderMarkdown = async (source:string) => {
  return await remark()
    .use(remarkHTML)
    .use(remarkFrontMatter)
    .use(remarkExtractFrontMatter, { yaml: yaml.parse })
    .process(source);
};

type Frontmatter = {
  title: string,
  distro:string,
  createdAt:string,
  marp:boolean
};

type LoadArticleFunc = (string) => Promise<{
  title: string,
  body: string,
  marp?: boolean,
  styles? :string,
}>;
const loadArticle:LoadArticleFunc = async (path:string) => {
  const source = fs.readFileSync(path, { encoding: 'utf-8'});
  const { data, contents } = await renderMarkdown(source);
  const { title, distro, marp } = data as Frontmatter;
  if (marp) {
    const { html, css } = marpedContents(source)
    return {
      title, distro,
      body: `<style>${css}</style>${html}`.trim(),
      marp: true,
    }
  } else {
    return {
      title, distro,
      body: contents.toString(),
    }
  };
};

const marpedContents = (source:string) => {
  const marp = new Marp();
  const { html, css } = marp.render(source);
  return { html, css };
};
