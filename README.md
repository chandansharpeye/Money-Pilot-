# Money Pilot V3 — Complete Accounting Cycle

## Included
- Existing Money Pilot V2 files and finance features retained as the base.
- New Accounting Studio: transaction entry, reviewed debit/credit suggestions, journal, ledger, trial balance, preliminary final-account summaries, CSV export and accounting-only JSON backup.
- Student Mode and Business Mode selector.
- Offline-first local storage; accounting journals are stored separately inside the app data object and legacy personal-finance transactions are not rewritten.
- Perpetual inventory treatment: purchases debit Inventory; sales can include cost of goods sold to post Dr. COGS / Cr. Inventory.

## Important AI note
The debit/credit assistant in this ZIP is an **offline rule-based smart suggestion engine**, not a connected generative AI model. It does not require an API key and always requires the user to review and confirm before posting. Actual cloud AI integration needs a secure backend; never put private API keys in a public GitHub Pages HTML file.

## Accounting limitations
- This is a starter accounting workflow, not certified accounting/tax software.
- The final accounts shown are preliminary and based on posted balances. Closing stock, depreciation, accruals, prepayments, GST, tax, opening balances, inventory quantities/valuation and other adjustments must be entered and reviewed before relying on reports.
- The perpetual inventory workflow accepts cost of goods sold per sale, but does not yet calculate quantity-on-hand or FIFO/weighted-average cost from item-level purchase/sale lines.
- Business Mode is a workflow selection, not separate company ledgers or multi-entity accounting yet.

## Deploy
1. Make a backup of the current site and accounting data first.
2. Extract this ZIP and upload its contents to the root of the GitHub Pages repository.
3. Commit the changes and wait for Pages deployment.
4. Verify existing transactions, add a small test entry, confirm the journal balances, then export a backup.

## Data safety
The new accounting journals are separate from the old `D.tx` finance transactions. This code does not intentionally clear or migrate old personal-finance records. Always download a full backup before upgrading.
