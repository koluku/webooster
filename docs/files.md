# Files

gulp実行時にhtmlとcssはルート上に出力されますが、jsは移動しません。

## Jade

HTMLはJadeで出力します。

- index.jade

	- 基本ファイル。最初は大体これに書いてからモジュール化していく。

- _head.jade

	- headタグ以下を書くファイル。

- _header.jade

	- header以下を書くファイル。

- _footer.jade

	- footer以下を書くファイル。

## Sass

CSSはSassで出力します。

- style.scss

	- コアファイル。初期では読み込みに関する指定がある。普段はCSSを書き込まないが、バグ修正などの一時的なコード追加に使う。

- _var.scss

	- 変数ファイル。初期ではフォントに関する指定がある。

- _mixin.scss

	- Mixinファイル。初期ではclearfixがある。

- _base.scss

  - 土台ファイル。HTMLタグに直接スタイルを指定する。初期ではbody、p、a、imgに指定がある。

- _layout.scss

  - レイアウトファイル。ページ毎に大きく変動しないスタイルを指定する。初期ではheader、main、footerが未指定状態で存在する。

- _mod.scss

  - モジュールファイル。classを記述するファイル。初期では何も書かれていない。

### その他

初期でCSSリセットとしてNormalize.cssが読み込まれる。


## JavaScript

JavaScriptはJade側でjQueryが読み込まれる。

- main.js

JavaScriptを記述するためのファイル。
初期では何も書かれていない。
