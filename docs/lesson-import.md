# Local Lesson Import

CanvasMath can batch-import locally hosted lesson modules from `import-source/` into `public/games/lessons/` and register them in `src/lib/generated-lessons.ts`.

## Commands

```bash
npm run lessons:validate   # dry-run validation only
npm run lessons:import       # copy assets and generate records
npm run lessons:overwrite    # replace existing lesson folders/icons
```

Import is a deliberate local action. It is not wired to `dev`, `build`, or deployment.

## License and content review

Before publishing imported lessons to a public CanvasMath deployment:

- **Redistribution rights** — Only publish modules that CanvasMath is permitted to redistribute. Importing files into this repository does not establish redistribution rights.
- **License verification** — Confirm each lesson's license, attribution requirements, or written permission from the rights holder.
- **External dependencies** — Review `lesson-import-report.json` for external scripts, analytics, tracking, ads, and network requests before classroom deployment.
- **Audience appropriateness** — Confirm content is appropriate for the intended K-12 audience.
- **Source integrity** — The importer copies lesson source as-is. It does not remove advertisements, analytics, branding, or third-party requests. Report findings for manual review rather than automatic removal.

Do not add unsupported or unverified license values to generated module records. Metadata such as grade levels, difficulty, standards alignment, and learning objectives should be added only from verified sources.

## Outputs (committed and deployed)

| Path | Purpose |
|------|---------|
| `public/games/lessons/lessonXXX/` | Local lesson entry pages and assets |
| `public/thumbnails/lessons/lessonXXX.png` | Card thumbnails |
| `src/lib/generated-lessons.ts` | Generated module manifest |

## Temporary (gitignored)

| Path | Purpose |
|------|---------|
| `import-source/` | Staging area for source lessons and icons |
| `lesson-import-report.json` | Validation and external-dependency audit report |
