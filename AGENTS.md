<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All wedding copy/data lives in `src/content/wedding.ts`; pages only render it (couple edits content in one place).
- Site access is gated in `__root` beforeLoad via server fn `checkAccess` (HMAC cookie from `SITE_PASSWORD` secret); never gate client-side only.
- Open content questions are tracked in `docs/DECISIONS_A_VALIDER.md`; never present unconfirmed info as fact.
