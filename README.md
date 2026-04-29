# MTG Scribe

ローカル LLM で動作する議事録アプリケーション (プロトタイプ)。すべての文字起こしと要約は端末上で完結し、外部に音声・テキストを送信しない。

## 必要環境

- Node.js `>=22.12.0`
- pnpm `10.33.2` (`packageManager` で固定)

## セットアップ

```bash
pnpm install
```

`postinstall` で `vp config` が走り、Vite+ のフックが有効化される。

## 開発

```bash
# 開発サーバー (apps/website)
pnpm dev

# 全チェック (format / lint / typecheck / test / build)
pnpm exec vp run ready

# 個別
pnpm exec vp check          # format + lint + typecheck
pnpm exec vp run -r test    # 全パッケージのテスト
pnpm exec vp run -r build   # 本番ビルド
```

## ツールチェーン

[Vite+](https://viteplus.dev/) を採用。`vp` CLI 経由で Vite / Rolldown / Vitest / tsdown / Oxlint / Oxfmt / Vite Task を一括管理する。詳細は `node_modules/vite-plus/docs` または `https://viteplus.dev/guide/` を参照。
