<script context="module">
  export const prerender = true;
  export async function load({ fetch }) {
    const { articles } = await fetch(`t.json`).then((r) => r.json());
    return { props: { articles } };
  }
</script>

<script>
  import Articles from '../_Articles.svelte';
  export let articles;
</script>

<a href="/">トップページ</a>
<h1>記事一覧</h1>
<Articles {articles} />
