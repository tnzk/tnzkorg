<script>
  export let articles;
</script>

<ul>
  {#each articles as article}
    <li>{article.createdAt} <a href="/t/{article.slug}">{article.title}</a></li>
  {/each}
</ul>
