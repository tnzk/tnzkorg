<script context="module" lang="ts">
  type Article = {
    title: string,
    createdAt: string,
    distro: string,
    marp?: boolean,
    body: string,
  };
  export const prerender = true;
  export async function load({ page, fetch }) {
    let { slug } = page.params;
    const articleSet = await fetch(`${slug}.json`).then((r) => r.json());
    const languages = Object.keys(articleSet);
    return {
      props: { slug, articleSet, languages }
    };
  }
</script>

<script lang="ts">
  export let articleSet;
  export let languages;

  let article:Article = articleSet[languages[0]];
  let changeLanguage = (lang) => {
    article = articleSet[lang];
  };
</script>

<a href="/t">記事一覧</a>

<h1>{article.title}</h1>

{#if languages.length > 1}
  {#each languages as lang, i}
    {#if i > 0}
      &nbsp;|&nbsp;
    {/if}
    <a href="#/" on:click={() => changeLanguage(lang)}>{lang}</a>
  {/each}
{/if}

{#if article.distro}
  <p class="availableAt">
    This document is available at:
    <a href={article.distro} target="_blank">{article.distro}</a>
  </p>
{/if}

{#if article?.marp}
  <iframe title={article.title} srcdoc={article.body}></iframe>
{:else}
  {@html article.body}
{/if}

<style>
  iframe {
    width: 100%;
    height: 100vh;
  }
  .availableAt {
    border: 1px solid #9DBDD7;
    background: #E0EFFD;
    padding: 0.7em 1em;
    color: #9DBDD7;
  }
</style>
