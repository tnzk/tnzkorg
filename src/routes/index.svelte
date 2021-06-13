<script context="module">
  export const prerender = true;
  export async function load({ fetch }) {
    const { articles } = await fetch(`t.json`).then((r) => r.json());
    return { props: { articles } };
  }
</script>

<script>
  import Articles from './_Articles.svelte';
  export let articles;
</script>

<style>
img.rounded {
  object-fit: cover;
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
</style>

<h1>
  <img src="images/tnzkreal02.jpg" alt="my profile" class="rounded">
  <img src="images/tnzkreal01.png" alt="my profile" class="rounded">
  <img src="images/tnzk.png" alt="my avatar" class="rounded">
  Kyohei Hamaguchi (濱口 恭平) / &commat;tnzk
</h1>
<p>システム開発会社社長・プログラミングスクール運営会社CTO・他役員や技術顧問等 / 1990年生まれ。鳥羽商船高専制御情報工学科→筑波大情報科学類→仮想化テック系ベンチャーCTO→フリーランス→開発会社＋スクール運営 / 全日本剣道連盟居合道三段・無雙直伝英信流土佐大田派初段 / 5歳児のパパ</p>
<p>C++/.NET/nasmを使ってソフトウェアドライバの開発などをしていたので、ローレイヤに割と強いです。Web系の開発はRailsが中心ですが、最近はReactとSvelteに切り替えつつあります。画像認識系もときどきやります。PyTorchを使います。</p>
<p>最近はエンジニア組織のチームビルディングや、PdM・PMをやることが多いです。アジャイル・テスト駆動開発やATDDなどの手法を軸にしつつ、事業ドメインと事業の成長段階に合わせて&quot;ちょうどよく&quot;スケールしていけるシステム（ソフトウェア &amp; 人的）を作ることが得意です。</p>
<p>
  Twitter:
  <a href="https://twitter.com/hmgchk" target="_blank">@hmgchk</a>
  &nbsp;/&nbsp;
  <a href="https://twitter.com/tnzk" target="_blank">@tnzk</a>
</p>
<section>
  <h2>現在</h2>
  <ul>
    <li><a href="https://mosqiiit.co.jp/" target="_blank">株式会社MOSQIIIT</a>（JS特化のプログラミング教室Code Village運営） 取締役CTO 2019年11月〜現在</li>
    <li><a href="https://www.zumen.co.jp" target="_blank">株式会社ZUMEN</a>（建設×AIベンチャー） 創業者, 取締役CTO 2019年7月〜現在</li>
    <li><a href="https://www.5thfloor.co.jp" target="_blank">フィフス・フロア株式会社</a>（受託開発、同人業界向けwebサービス） 創業者, 代表取締役CEO 2015年2月〜現在</li>
    <li><a href="http://magia.co.jp" target="_blank">株式会社MAGIA</a>（YouTube動画制作・チャンネル運用、版権管理） 取締役CTO 2014年〜現在</li>
  </ul>
</section>
<section>
  <h2>略歴</h2>
  <ul>
    <li><a href="https://www.finplanet.co.jp/" target="_blank">株式会社フィンプラネット</a> CTO 2018年6月〜2018年9月</li>
    <li><a href="https://syginc.jp/" target="_blank">株式会社Synclogue(現: 株式会社SYG)</a> Co-Founder, 取締役CTO 2012年〜2014年</li>
  </ul>
</section>
<section>
  <h2>その他</h2>
  <ul>
    <li><a href="https://fukidass.com/" target="_blank">FUKIDASS</a>メンバー</li>
    <li><a href="https://cto-a.org/" target="_blank">一般社団法日本CTO協会</a>個人会員</li>
    <li><a href="https://joinmastodon.org/sponsors" target="_blank">Mastodon公式ゴールドスポンサー</a>（金額としてはゴールドですが、個人なのでシルバー枠に掲載してもらってます）</li>
    <li><a href="https://qiita.com/tnzk" target="_blank">Qiita / @tnzk</a></li>
    <li><a href="https://github.com/tnzk" target="_blank">GitHub / @tnzk</a></li>
    <li>一次創作者向けMastodonサーバー ichiji.social 運営 (<a rel="me" href="https://ichiji.social/@tnzk" target="_blank">tnzk@ichiji.social</a>)</li>
  </ul>
</section>
<!--
<section>
  <h2>メディア掲載・出演</h2>
  <ul>
    <li><a href="https://magazine.techcareer.jp/interview/tonarino_cto/13041/" target="_blank">techcareer magazine 『突撃！隣のCTO 社会に役立つプロジェクトを「テクノロジー」というツールで仕掛け続けたい　株式会社MOSQIIIT・CTO濱口恭平さん』</a></li>
    <li><a href="https://youtu.be/JaUKNVPKiwI" target="_blank">MOSQIIITチャンネル『プログラミング言語って何なの！？特性や違いを徹底解説！』</a></li>
    <li><a href="https://www.youtube.com/playlist?list=PLj3WcbSxSR5VYMla_prQzFz0F3MmPy9ZD" target="_blank">BIM CHANNEL 『ダイナモを学ぶ』</a></li>
  </ul>
</section>
-->
<section>
  <h2>記事</h2>
  <Articles {articles} />
</section>
