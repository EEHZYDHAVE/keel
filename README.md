# Keel

**Research · Evaluate · Decide**

Keel is a personal investment research workspace that runs in the browser. You use it to research an investment the same structured way every time: record the facts, score your judgment, explain why, say how confident you are, and keep a history of how your thinking changed.

It supports five kinds of investment: individual stocks, bonds, bond funds, equity funds and index funds. It comes as two single-file apps, one for desktop and one for your phone, and both work on the same data.

> **Keel is decision support, not investment advice.** It never tells you to buy, sell or hold. Every score is your own structured assessment, based on the framework and assumptions you chose.

<!-- Add screenshots here, for example:
![Dashboard](docs/dashboard.png)
![Analysis workspace](docs/analysis.png)
![Valuation scenarios](docs/valuation.png)
-->

## Why it exists

Investment research tends to end up scattered across notes, spreadsheets and memory, and each investment gets judged by a slightly different standard. Keel fixes that with three ideas:

- **The same framework every time.** Each type of investment has its own checklist, because a bond and a stock need different questions. Every investment of that type is evaluated against the same one.
- **Facts, judgment and confidence stay separate.** A P/E of 28 is a fact. "Valuation looks expensive, 2 out of 5" is your judgment. "I'm only moderately sure" is your confidence. Keel stores them separately and never turns a raw metric into a score on its own.
- **Every score can be explained.** You can open any overall score and see which categories drove it, which criteria sit underneath, and the reasoning and sources you wrote.

## What you can do

### Research five kinds of investment

Each type has its own framework of weighted categories and criteria.

| Investment type | Categories | Criteria |
|---|---|---|
| Individual Stocks | 10 | 68 |
| Bonds | 9 | 42 |
| Bond Funds | 12 | 45 |
| Equity Funds | 10 | 49 |
| Index Funds | 10 | 40 |

<details>
<summary>See the categories and default weights for each type</summary>

**Individual Stocks:** Business Understanding 10%, Industry & Competitive Environment 8%, Financial Performance 15%, Financial Strength 10%, Management & Capital Allocation 10%, Competitive Advantage 12%, Valuation 18%, Risk 10%, Expected Return 4%, Portfolio Fit 3%.

**Bonds:** Issuer Analysis 12%, Bond Terms & Structure 8%, Credit Quality 20%, Interest-Rate & Duration Risk 15%, Yield & Expected Return 20%, Inflation & Currency Risk 10%, Liquidity 5%, Additional Bond Risks 5%, Portfolio Fit 5%.

**Bond Funds:** Fund Mandate & Structure 8%, Portfolio Composition 15%, Credit Quality 15%, Interest-Rate & Duration Risk 15%, Yield & Return 12%, Fund Manager & Investment Process 10%, Performance 8%, Liquidity 5%, Costs & Tax 5%, Inflation & Currency Risk 4%, Additional Risks 3%, Portfolio Fit 5%.

**Equity Funds:** Fund Mandate & Structure 8%, Portfolio Composition 15%, Investment Strategy 12%, Underlying Company Quality 12%, Manager & Investment Process 15%, Performance & Benchmark 15%, Risk 10%, Costs & Tax 6%, Geographic & Currency Exposure 2%, Portfolio Fit 5%.

**Index Funds:** Index Objective & Methodology 15%, Index Composition & Exposure 15%, Diversification & Concentration 10%, Fund Structure & Implementation 10%, Tracking Quality 15%, Costs & Tax 12%, Risk 10%, Underlying Market Characteristics 5%, Currency & Geographic Exposure 3%, Portfolio Fit 5%.

The index fund framework deliberately keeps two questions apart: is this *index* a suitable exposure for you, and is this particular *fund* an efficient way to get it?

</details>

### Score with a framework you can explain

- Each criterion takes a **score** (1 to 5), a **confidence** (1 to 5), your **reasoning** and optional **evidence** sources.
- Category scores roll up into one **overall score out of 100**, using category weights you can change.
- **Scoring profiles** (Default, Risk Focus, Value / Cost Focus, Quality Focus) re-weight the categories without touching your assessments, so you can see the same research from different angles.
- **Confidence-adjusted scoring** (on by default, switchable in Settings) uses your confidence as a weight. A high score you're unsure about counts for less.
- **"Why this score?"** shows each category's weight and contribution.
- Completion is tracked separately from the score, so a half-finished analysis never looks like a finished one. Missing criteria are left out of the maths, not counted as zero.

### Value stocks with a scenario model

The stock Valuation tab is a small financial model built on price, earnings and P/E. You enter your Bear, Base and Bull assumptions and it works out the expected return and the most you could pay for the return you want. See [How the stock valuation model works](#how-the-stock-valuation-model-works).

### Capture risk, thesis and history

- **Risk:** structured risk scoring (where a higher score always means lower risk) plus notes on key risks, loss scenarios and what would change your mind.
- **Thesis:** a narrative section for the investment thesis, strengths, concerns, assumptions, catalysts, what would invalidate it and what would make you reconsider. It is kept separate from the numbers.
- **History:** save a version at any point, view what the analysis looked like then, restore it, or delete it. Saved versions include scores, reasoning, evidence, valuation, risk notes, thesis and scenario assumptions.

### Compare, filter and track

- **Dashboard:** top research scores, score distribution, what needs attention and what changed recently.
- **Analyses:** search and filter your research by status.
- **Rankings:** order investments using any scoring profile. Labels are neutral ("Highest Score"), never "best".
- **Watchlist:** track investments you aren't ready to analyse fully, per investment type or across all of them.
- **Statuses:** Draft, In Progress, Complete, Needs Review, Watching, Archived.
- **Search** across everything from the top bar.

## How scoring works

| Step | Rule |
|---|---|
| Criterion scale | 1 = very weak / unattractive, 5 = very strong / attractive. For risk criteria, 1 = very high risk and 5 = very low risk, so a higher score is always better. |
| Confidence adjustment | `effective score = 3 + (score − 3) × (confidence − 1) ÷ 4`. At confidence 5 the score counts in full. As confidence drops, the score is pulled toward 3 (Average). A criterion with no confidence set counts in full. |
| Category score | The average of the effective scores of its scored criteria. |
| Overall score | The weighted average of category scores, converted to 0 to 100 by multiplying by 20. Categories with no scored criteria are left out. |

Examples of the confidence adjustment: a 5 at confidence 5 counts as 5, at confidence 3 as 4, at confidence 2 as 3.5, and at confidence 1 as 3.

The score is a structured personal assessment. It is not an objective measure of quality or a prediction of returns.

## How the stock valuation model works

**What you enter**

- **Market data:** any two of Share Price, EPS and P/E (the third is calculated), plus Dividend / Share. Payout ratio and Dividend Yield are calculated for you.
- **Two settings:** your holding period in years (default 5) and your **required annual return** (default 12%). The required return is your own minimum yearly return, covering price gain plus dividends. It decides how results are labelled and how the "highest price" is calculated. It does not change the forecasts.
- **Three assumptions per scenario:** earnings growth per year, the P/E at the end of the period (exit P/E), and dividend payout. A blank exit P/E or payout uses today's value.

**What it calculates**

```
EPS in year N       = today's EPS × (1 + growth) ^ N
Share price in N    = EPS in year N × exit P/E
Dividends           = each year's EPS × payout   (paid at year end, not reinvested)
Total return        = (price in N + dividends) ÷ today's price − 1
Annual return       = (1 + total return) ^ (1 ÷ N) − 1
Highest price today = (price in N + dividends), discounted back at your required return
```

**Worked example** (price 100, P/E 20, dividend 1.50 a share, 5 years, 12% required return, Base growth 8%, then "Fill Bear and Bull from Base"):

| | Bear | Base | Bull |
|---|---|---|---|
| Earnings growth / exit P/E | 2% / 14 | 8% / 20 | 14% / 24 |
| Share price in 5 years | 77 | 147 | 231 |
| Dividends collected | 8.0 | 9.5 | 11.3 |
| Annual return | −3.1% | 9.4% | 19.4% |
| Highest price for your 12% | 50 | 90 | 139 |

In this example the Base case earns 9.4% a year, 2.6 points below the 12% required. A price of about 90 would earn 12%, so today's 100 is about 11% above that.

You can also set a probability for each scenario (default 25 / 50 / 25) to get a probability-weighted return, and open a sensitivity grid that shows annual return across a range of growth rates and exit P/Es. The Expected Return section of the Analysis tab shows your Base case as a hint. It informs your score without setting it.

The model needs positive earnings, so for a loss-making company it explains why there is no result. Bonds get a real-return calculation (yield and expected inflation). Funds record their raw data on the Valuation tab and keep the judgment on the Analysis tab.

Every number comes from your assumptions. The model does not check them and does not predict anything.

## Getting started

1. Open the app:
   - **Desktop:** `index.html`
   - **Phone:** `keel-mobile.html`
   - Hosted on GitHub Pages, these are at `https://<your-username>.github.io/<repo>/index.html` and `.../keel-mobile.html` (replace the placeholders). You can add either one to your home screen to install it.
2. The first launch includes sample analyses across all five types so you can explore. Remove them in **Settings → Data → Sample data → Clear**.
3. Pick an investment type, choose **New Analysis**, and enter the name, identifier (ticker or similar) and currency.
4. Work through the Analysis categories. Changes save automatically, so you can leave and come back where you stopped.
5. Fill in Valuation, Risk and Thesis, and use **Save version** when you reach a point worth keeping.

## Your data and privacy

Keel has no server and no accounts. Your research lives in your browser's local storage on each device.

- **Export and import:** Settings can export everything as a JSON file and import it back (import replaces current data).
- **GitHub sync (optional):** Keel can push your data to a repository you choose, as `keel-data.json`, and pull it back. This is how you move data between your computer and your phone, and it doubles as a backup.
- **Network requests:** apart from the optional GitHub sync (which talks only to `api.github.com`), the app loads its fonts (Inter and IBM Plex Mono) from Google Fonts.

**Use a private repository for the data, and treat the token carefully.**

- Your research is personal. Push it only to a **private** repository.
- The GitHub token is stored in this browser's local storage in plain text. Create a **fine-grained personal access token** limited to that one repository with *Contents: read and write* permission, and nothing broader.
- Don't connect sync on a shared or public computer. If a token is ever exposed, revoke it in GitHub and create a new one.

## Syncing with GitHub

1. Create a **private** repository for your data (for example `keel-data`).
2. In GitHub, create a fine-grained personal access token for that repository with *Contents: read and write*.
3. In Keel, open **Settings → GitHub Sync**, enter `owner/repo`, the branch (usually `main`) and the token, and connect.
4. With **Auto-sync** on, Keel pushes a few seconds after each change. **Push Now** and **Pull Latest** do it on demand.

Things to know:

- **Pull replaces what's on that device** with the repository's copy. Keel asks you to confirm.
- When you start on a second device, **pull first**, then edit. Pushes overwrite the file, so the last device to push wins. If a push collides with another one, Keel retries once automatically.
- Background syncs stay quiet. If a push fails, the reason appears under the sync buttons in Settings, and a manual Push shows it straight away.

## Repository contents

| File | Purpose |
|---|---|
| `index.html` | The desktop app, complete in one file |
| `keel-mobile.html` | The phone app (bottom navigation, sheets), complete in one file |
| `manifest.json`, `manifest-mobile.json` | Web app manifests, so each app can be installed to a home screen |
| `service-worker.js` | Caches the app files; its version number is how devices learn an update is available |
| `icons/` | App icons |

Both apps use the same storage key (`keel_invresearch_v1`) and the same data format, so on the same device and address they read the same data.

## Updating the app

The service worker caches the app files, so a new version has to be announced to devices:

1. Replace `index.html` and/or `keel-mobile.html` in the repository.
2. Increase `APP_VERSION` near the top of each HTML file's script, and change the matching version suffix in `service-worker.js` to the same value.
3. Commit. Devices pick up the update at their next visit. You can also use **Settings → Check for updates**, and turn on **Auto-refresh on update** to apply new versions without a prompt.

## Technical notes

- **No build step and no dependencies.** Each app is a single file of plain HTML, CSS and JavaScript.
- **Framework-driven.** Investment types, categories, criteria, weights and valuation fields are defined as data. One scoring engine and one set of components (assessment, evidence, risk, score breakdown, history, scenario) render every investment type, so adding a new type means adding a framework rather than new screens.
- **Data model.** An *investment* has one *analysis*. The analysis holds criterion assessments (score, confidence, reasoning, evidence), valuation inputs, scenario assumptions, risk notes, a thesis and saved versions.
- **Live valuation inputs.** The valuation boxes update the results as you type without redrawing the page.
- **Sync.** GitHub's REST contents API, with one automatic retry on a conflicting write.
- **Layout.** A desktop-first layout for the main app, a separate touch layout for the phone app, and light and dark themes.

## Limitations and roadmap

- **All data is entered by hand.** There is no market data feed.
- **No portfolio view yet.** The Portfolio Fit criteria are manual. Holdings, allocation and overlap analysis are planned.
- **The framework editor changes category weights only.** Adding or removing categories and criteria, and pinning each analysis to a framework version, are planned.
- **The stock valuation model is a simple earnings × P/E model.** It needs positive earnings, assumes dividends are paid at year end and not reinvested, and is not a full discounted cash flow.
- **Single user, last write wins.** Sync is designed for one person across a couple of devices, not for collaboration.

## Disclaimer

Keel is a research and note-keeping tool. Nothing in it is investment, financial, tax or legal advice, and its scores and estimates are not predictions or recommendations. You are responsible for your own decisions.
