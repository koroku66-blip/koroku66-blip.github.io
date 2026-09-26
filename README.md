# Morisaki Web — 制作サンプルのポートフォリオ

8業種の架空サイトを掲載する、GitHub Pages向け静的サイトです。HTML・CSS・必要なJavaScript・ローカル画像だけで動作し、公開時のビルドは不要です。

|作品|場所|構成|
|---|---|---|
|工務店|`works/koumuten/`|LP。`works/koumuten-b/` は同一作品の別案|
|整体院|`works/seitai/`|LP|
|税理士|`works/zeirishi/`|5ページ|
|美容室|`works/salon/`|3ページ|
|カフェ|`works/cafe/`|3ページ|
|地域清掃|`works/cleaning/`|LP|
|製造業|`works/manufacturing/`|5ページ|
|学習塾|`works/school/`|4ページ|

## 編集と確認

- 各フォルダのHTMLと`style.css`が納品・公開用ファイルです。業種固有のレイアウトは各サイト内にあります。
- `assets/base.css`は7業種共通のフォーム、アクセシビリティ、ナビゲーション等の基本要素です。工務店は既存の独立したCSS・JSを維持しています。
- `assets/site.js`はメニュー開閉、入力確認、概算計算だけを実装しています。
- `assets/portfolio.css`はポートフォリオ本体用です。
- 画像は`assets/images/`に集約したWebPです。出典・用途は`credits.html`に記載しています。

ローカル確認には `npm ci`、`npm run dev` を利用できます。Viteは確認用で、公開ファイルにはランタイム依存がありません。Pythonの簡易HTTPサーバーでも確認できます。

```sh
python tools/check.py
node --check assets/site.js
node --check works/koumuten/script.js
node --check works/koumuten-b/script.js
```

`tools/build.py`、`tools/portfolio.py`は初期制作に使った生成用スクリプトです。直接編集した公開ファイルが正本です。生成し直す場合は、個別の変更をスクリプトにも反映してから実行してください。`tools/format.py`はHTML/CSSの改行整形を行います。

## サンプルの範囲

名称、営業情報、サービス、料金は架空の設定です。実在する企業のサイト・実案件・施工実績・導入実績ではありません。フォームの入力はブラウザ上で確認表示するだけで、送信・保存・予約確定は行いません。LINE・電話も外部へ発信せず、予約方法のデモにつなぎます。

ポートフォリオ本体の相談先は、応募時に使用するランサーズ／クラウドワークスのメッセージです。実際の契約条件は案件ごとに確認してください。

現状監査・制作方針は `docs/design.md`、確認記録は `docs/quality.md` を参照してください。
