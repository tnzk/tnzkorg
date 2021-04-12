---
marp: true
theme: gaia
inlineSVG: true
---
<!-- _class: lead gaia -->
# Puppeteer 難所攻略

---

## Puppeteer とは

- JavaScriptからChromeを制御するためのライブラリ
- Googleが開発してメンテしている
- E2Eテストなどの目的でよく使用されている

--- 

## Puppeteer の使い方

既存記事を参照のこと

---

# Puppeteer は難しい？

2つの意味で難しい

1. 非同期処理が難しい
2. Puppeteer独特のメンタルモデルが難しい

相互に全然関係ない話題なので、今回はこの2つをパートに分けて話します。

---
<!-- _class: lead gaia -->
# Part 1: 非同期処理が難しい
---

## 同期的/非同期的とは

- プログラムの基本は「逐次実行」＝同期処理
- 上から順に実行されていく
- 例（擬似コード）:

```
10 foo()
20 bar()
30 buzz()
```

foo→bar→buzzの順で完了する

--- 

## 逐次実行の例外

- 反復・条件分岐
- 割り込み
- 関数・サブルーチン・プロシージャ・メソッド
- 非同期処理

---

## 非同期処理のイメージ

```
10 foo() ← これが非同期処理だとする
20 bar()
30 buzz()
```

完了する順は、以下の3通り

1. foo→bar→buz
2. bar→foo→buz
3. bar→buz→foo

---

## つまり、

- 逐次実行→この実行が終わるまで、次の処理をしない
- 非同期処理→この実行を始めたら、実行が終わらなくてもすぐ次の処理を始める

---

## 何のために？

- 人間が快適に過ごすため
- 昔のコンピュータでは非同期処理が難しかったので、重い処理をしている間、人間はコンピュータで他のことができなかった
- CPUやメモリが少なかった時代はそれでよかった（どうせ他に何もできない）が、今は大抵の処理では計算リソースがあまる（例外: [動]画像処理、機械学習など）ので、もったいない
- あといろいろあって人類のほうが待つことができなくなった（待たなくて良いUXに慣れた、経済成長のため単位時間あたりの生産性を高める圧力がある、人類は堕落した、etc...）

---

## JavaScriptにおける非同期処理の書き方

1. `async/await`
2. `Promise`

---

## async を使った非同期処理の書き方

- 関数を定義するときに、`async`を付けると、その関数は非同期で実行"できる"関数みたいなものになる
- async関数と呼ぶ
- async関数は、普通に呼べば非同期に実行される

```
10 foo() ← これがasync関数だとする
20 bar()
30 buzz()
```

---

完了する順は、以下の3通り

1. foo→bar→buz
2. bar→foo→buz
3. bar→buz→foo

---

## await を使って async 関数を「待つ」

- async関数は、非同期で実行したくなければ、`await` を使って同期的に実行することもできる

```
10 await foo() ← これがasync関数だとする
20 bar()
30 buzz()
```

完了する順は、以下の1通り。なぜなら `await` で「待って」いるから。

foo→bar→buz

----

## Q: なぜ「待ちたい」ときと「待たなくていい」ときがあるのか？

- A: 気まぐれです（うそです）
- 非同期関数が返す値を使いたいとき→使いたいので、どれだけ時間がかかるとしても待つしかない
- 非同期関数に何かやってほしい（ファイルの保存など）が、返す値には興味がない→待たなくて大丈夫
- async関数だと、呼び出し側が都合に合わせて良い方を選べる

---

## いくつかの課題

- Q: 複数のasync関数を同時に実行して全員の終了を待ちたいときはどうすればいいの？
- Q: 待ちたくないけど、返す値を使って何かしたいときはどうしたらいいの？
- Q: （あといっこくらい何かほしい）

---

## A: Promiseを使う

- ちょっと難しくなるので、できればasync関数を使う感覚に慣れてから続きを読みましょう
- `async/await`とは別で、より細かく非同期処理を扱う方法

---

## Promiseとは？

- 約束。
- 普通の関数は値そのものを返すが、Promiseを使うと「値を返すという約束」を返すことができる。
  - 普通の関数: 値, 非同期関数: 値を返すという約束
  - 普通の関数: `value`, 非同期関数: `Promise.resolve(value)`

（ちなみにScalaだと同じような仕組みがFutureとして導入されている。約束に対して未来。なんとなくFutureのほうが無色透明な感じで個人的には好き）

---

## Promiseを返す関数

```js
let f = (x, y)=>{
  return Promise.resolve(x+y)
}
```

- こうすると`x`と`y`の和そのものではなく、和を返すという約束を返せる。
- 普通は返した頃には計算が終わっているので意味がないが、仮に`x`と`y`がとても大きい数で足し算に時間がかかる場合は、非同期にする意味がある

---

## Promise から値を取り出す

- 「値を返すという約束」は値そのものではないので、そのままは使えない
- 値を使って何かしたい場合、Promiseから値を取り出す必要がある
- 例えば、これはできない

```js
let p = f(1,2)
console.log(p * 2)
//=>NaN
```

---
- このようにして、Promiseが完了する（約束が果たされる）のを待つことができる

```js
(async ()=>{
  let q = await p
  console.log(q * 2)
})()
//=>6
```

---

## Q: 複数の非同期関数を待ちたい

- awaitでも順次やれば待てるが、並列実行できない。時間が無駄になる

```js
await f()
await g()
await h()
cont()
```

```
--f()-->
        --g()-->
                --h()-->
                        --cont()-->
```

---
- `Promise.all`は複数のPromiseを受け取り、そのすべてが完了するまで待ってくれる

```js
Promise.all([f(), g(), h()])
cont()
```

```
--f()-->
--g()-->
--h()-->
        --cont()-->
```

---

**三連await版**
```
--f()-->
        --g()-->
                --h()-->
                        --cont()-->
```
**Promise.all版**
```
--f()-->
--g()-->
--h()-->
        --cont()-->
```
:arrow_up:なんか速そう

---

## async関数＝Promiseを返す関数

- しれっと書いたが、実は`async/await`と`Promise`は混ぜて使うことができる
- というより、`async`キーワードは関数が返す値を`Promise`でくるむだけ
- `await`キーワードは、関数が返す`Promise`が実現するのを待つだけ

---

## Q: 待ちたくないが、Promiseが返す値を使いたい

- `Promise.then`を使う
- `Promise.then`に関数を渡すと、Promiseが完了したときにその関数を呼んでくれる

```js
let p = f()
p.then((value)=>{ console.log(value) })
```

---

## Part 1 まとめ

- 非同期処理は`async/await`か`Promise`を使って書く
- 待って値を使ったり、値を無視して待たずに進めたり、待たずに進めて値ができたら値を使ったりできる
- Puppeteerではブラウザの自動操作という時間のかかる場面がたくさん登場するので、非同期処理を使いこなすことがカギ
---
<!-- _class: lead gaia -->
# Part 2: Puppeteer独特のメンタルモデルが難しい
---

## Puppeteer の独特なところ

- 普通のプログラムは、書いたコードを実行したら、すべて手元で動作する
- Puppeteer では、手元のNode.jsが実行する箇所と、裏で起動してるHeadless Chromeが実行する箇所が混在する

```js
let query = 'What is a life, seriously?';
await page.type('.top_searchbox__text', query);
await page.click('.top_searchbox__submit');
await page.waitForSelector('.result_products__line_wrap > .product_list .product_list__name', { visible: true });
let n = await page.evaluate(() => {
  let itemNames = [...document.querySelectorAll('.result_products__line_wrap > .product_list  .product_list__name')].map(e => e.innerHTML);
  return itemNames;
});
console.log(n);
```
---

（図でNode実行箇所とChromium実行箇所を示す）

---

## 実行コンテキストの図解

- このような状況を「実行コンテキスト」が違うとか言ったりする
- evaluate 関数に渡された関数は、Nodeから背後のChromiumに注入される
- Chromium は、注入されたコードを開いているページのコンテキストで実行する
- なので、API経由で（要検証）プロセス間での通信が実行されている

---

図解

---

## コンテキストとは
同じ関数でもコンテキストが異なれば別の結果になる

- クラスの2つのインスタンスを例にとってみる
- この例は結果が変わるだけだが、エラーになる場合もある

---

## コンテキストの違いでエラーになる例

- デバイスの状態: 物理的な要素が絡むもの

---

## 「Webページ」という実行コンテキスト

- 処理系も違うし、ランタイムAPIも違う
- `window` みたいなものはNodeにはない
- 逆に `fs` モジュールみたいなものは Chromium にはない
- そういう機能を使っちゃうとエラーになる

---

- https://github.com/puppeteer/puppeteer/blob/main/src/common/ExecutionContext.ts#L278
Search "evaluate<T" で関数を文字列化して送信していることがわかる
- devtools の Runtime.evaluate を実行してる