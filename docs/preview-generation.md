# Lab preview generation

CanvasMath hover previews are short muted WebM clips stored in `public/previews/`. They are produced locally with Playwright and FFmpeg — not during production builds or in the browser runtime.

## Prerequisites

1. **FFmpeg** with `libvpx-vp9` support (`ffmpeg -version`)
2. **Playwright Chromium** (`npm install -D playwright` then `npx playwright install chromium`)
3. **Local Vite server** (`npm run dev` on port 5173)

## Commands

```bash
npm run previews:test          # first 3 modules
npm run previews:all           # all discovered modules (skip existing)
npm run previews:single -- --slug powers-of-two-2048
node scripts/generate-lab-previews.mjs --all --overwrite
node scripts/generate-lab-previews.mjs --all --failed-only
```

## License reminder

Before generating or publishing preview clips, verify that each embedded simulation's license and provider terms permit promotional screenshots or short preview captures. Skip or use passive captures when terms are unclear.

## Outputs

| Path | Purpose |
|------|---------|
| `public/previews/<slug>.webm` | Deployable preview video |
| `src/lib/lab-previews.generated.ts` | Auto mapping (merged in `lab-previews.ts`) |
| `preview-generation-report.json` | Per-module status report |
| `.tmp/lab-preview-generator/` | Temporary frames (gitignored) |

Manual overrides in `src/lib/lab-previews.ts` (`MANUAL_LAB_PREVIEWS`) always win over generated entries.
