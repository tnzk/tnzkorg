<svelte:head>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-3063979-4"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-3063979-4');
  </script>
  <meta charset="utf-8">
  <!-- Always force latest IE rendering engine or request Chrome Frame -->
  <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <title>Kyohei Hamaguchi （濱口恭平） / &commat;tnzk</title>
  <style>
  @font-face {
    font-family: "Yu Gothic M";
    src: local("Yu Gothic Medium");
  }
  @font-face {
    font-family: "Yu Gothic M";
    src: local("Yu Gothic Bold");
    font-weight: bold;
  }
  body {
    margin: 0;
    border-top: 5px #0F4C81 solid;
    padding: 1em;
    line-height: 1.6em;
    color: #222;
    font-family: -apple-system, BlinkMacSystemFont, "游ゴシック体", YuGothic, "Yu Gothic M", "游ゴシック Medium", "Yu Gothic Medium", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN W3", HiraKakuProN-W3, "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", "Helvetica Neue", HelveticaNeue, Helvetica, Arial, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  h1,
  h2 {
    color: #0F4C81;
  }
  h1>img {
    vertical-align: middle;
  }
  footer {
    font-size: smaller;
    color: #555;
  }
  </style>
</svelte:head>
<slot></slot>
<footer>Kyohei Hamaguchi (tnzk) &copy; 2010-2020</footer>
