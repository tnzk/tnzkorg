---
title: Install Puppeteer on MacBook Pro with Apple Silicon / M1
distro: https://dev.to/tnzk/install-puppeteer-on-macbook-pro-with-apple-silicon-m1-3kc
---

For those who wouldn't like to work outside the CLI.

Install Chromium via brew:

```zsh
$ brew install chromium
$ `which chromium`
```

Set an environemntal variable to prevent `[npm/yarn/pnpm] install` downloading Chromium automatically (I'd put `.env` into the repo so coworkers with Apple Silicon can `$ source .env` .)

```zsh:.env
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH=`which chromium`
```

Although [in some situations you need to patch Puppeteer](https://github.com/puppeteer/puppeteer/issues/6622#issuecomment-788199984) since it has a hard-coded executable path to `/usr/bin/chromium-browser`, you can try an option of `puppeteer.launch` to overwrite it.

```js
const browser = await puppeteer.launch({
    executablePath: process.env[‘PUPPETEER_EXECUTABLE_PATH’],
})
```

# 参考

- [Installation fails on Apple Silicon / M1](https://github.com/puppeteer/puppeteer/issues/6622)
- [M1 MacBookでpuppeteerが動かない時の解決策](https://qiita.com/3tomcha/items/f141faa1cb24124e9d66)
- [M1 Macでpuppeteerを動かす方法（2020年12月21日時点）](https://qiita.com/Buzzword111/items/aa5dd4c89358a63f970a)
