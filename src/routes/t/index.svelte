<script context="module">
  export const prerender = true;
  export async function load({ fetch }) {
    const { slugs } = await fetch(`t.json`).then((r) => r.json());
    return {
      props: {
        slugs
      }
    };
  }
</script>

<script>
  export let slugs;
</script>

<a href="/">トップページ</a>
<h1>記事一覧</h1>
<ul>
  {#each slugs as slug}
    <li><a href="/t/{slug}">{slug}</a></li>
  {/each}
</ul>
