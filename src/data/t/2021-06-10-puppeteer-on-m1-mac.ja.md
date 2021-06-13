---
title: Apple Silicon / M1 で Puppeteer のインストールに失敗する場合
distro: https://zenn.dev/tnzk/articles/a99b246faf5f69
---

なるべくコマンドライン以外の作業をしたくない人向け:

brew で Chromium をインストール:

```zsh
$ brew install chromium
$ `which chromium`
```

`[npm/yarn/pnpm] install` で Chromium の自動ダウンロードが始まらないように環境変数を設定しておく（個人的には `.env` に書いといて M1の人だけ `$ source .env` する運用が楽だなと思います）:

```zsh:.env
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH=`which chromium`
```

Puppeteer には `/usr/bin/chromium-browser` がベタ書きされていて[パッチを当てなきゃいけないみたいな話](https://github.com/puppeteer/puppeteer/issues/6622#issuecomment-788199984)もあるのだが、実際は `puppeteer.launch` のオプションで実行時に指定できる。何らかのフレームワークが Puppeteer を隠蔽しきっていてこのオプションを触れないとかでなければこっちのほうが楽。

```js
const browser = await puppeteer.launch({
    executablePath: process.env[‘PUPPETEER_EXECUTABLE_PATH’],
})
```

# 参考

- [Installation fails on Apple Silicon / M1](https://github.com/puppeteer/puppeteer/issues/6622)
- [M1 MacBookでpuppeteerが動かない時の解決策](https://qiita.com/3tomcha/items/f141faa1cb24124e9d66)
- [M1 Macでpuppeteerを動かす方法（2020年12月21日時点）](https://qiita.com/Buzzword111/items/aa5dd4c89358a63f970a)
