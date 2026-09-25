# Keel

A personal investment research and decision support workspace. Runs entirely
in the browser, no backend required. Ships as two entry points sharing the
same data: `index.html` for desktop, `mobile.html` for phones, both installable
as their own standalone app.

## Files

- `index.html` the desktop app
- `mobile.html` the mobile app (bottom tab nav, full-screen search and forms,
  touch-sized controls, otherwise the same data and scoring engine)
- `manifest.json` / `manifest-mobile.json` PWA metadata for each entry point
- `service-worker.js` offline caching for both, versioned so updates roll out cleanly
- `icons/` app icons (192, 512, maskable, apple touch, favicons)

## Deploy on GitHub Pages

1. Create a new **public** GitHub repository (for example `keel-app`). This
   is separate from the private repo you use for GitHub Sync of your research
   data inside Settings.
2. Push these files to the repository root (not inside a subfolder), on the
   branch you'll serve from (usually `main`).
3. In the repo, go to **Settings > Pages**, set Source to "Deploy from a
   branch", branch `main`, folder `/ (root)`, then save.
4. GitHub will publish it at `https://<your-username>.github.io/<repo-name>/`
   within a minute or two.
5. On your phone, open `.../mobile.html` in the browser and use Add to Home
   Screen (iOS Safari) or the Install app prompt (Android Chrome) to install
   it standalone. On desktop, open `index.html` (or the folder root) the same
   way to install that version. Installing one doesn't install the other,
   they're independent home screen entries.

## Updating after changes

Every time you push new files:

1. Bump `CACHE_VERSION` at the top of `service-worker.js` (e.g.
   `keel-cache-v1` to `keel-cache-v2`).
2. Also bump `APP_VERSION` near the top of the `<script>` in both
   `index.html` and `mobile.html` to match (it's just the label shown in
   Settings, purely cosmetic, but keep it in sync so the version you see on
   screen means something).

Once pushed, anyone with the app already open or installed will get a
notification the next time the browser checks for a new service worker
(automatically, typically within the hour, or immediately if they reopen the
app): a banner reading "A new version of Keel is available" with a Refresh
button. Tapping it applies the update and reloads. There's also a toggle in
**Settings > Updates** called "Auto-refresh on update" that, when on, applies
new versions the moment they're detected instead of waiting for someone to
tap Refresh, plus a manual "Check for updates" button for forcing a check on
demand. The service worker installs a new version in the background but
waits for explicit permission (or the auto-refresh setting) before it takes
over, so an update never yanks the rug out from under someone mid-edit.

## Data

Desktop and mobile share the same local storage on a given device (same
origin, same storage key), so research done in one shows up in the other
automatically when both are open in the same browser. Use **Settings >
Export** for a manual backup, or **Settings > GitHub Sync** to push a JSON
snapshot to a private repo automatically as you work (this only works once
the app is running from its real hosted URL, not from a `file://` link or
Claude's own preview).

Every analysis can be permanently deleted from its own workspace (the trash
icon next to the status dropdown), with a confirmation step first since it
removes all scores, reasoning, evidence, valuation notes, thesis and saved
history for that investment.
