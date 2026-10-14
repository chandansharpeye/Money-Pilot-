# Money Pilot V3.1 — Welcome Tour + Jarvis Assistant

## Included
- Splash screen using the existing Money Pilot logo asset.
- First-launch welcome tour; replay remains available from the existing Finance Hub.
- Reworked AI tab into a usable offline Jarvis finance/accounting assistant.
- Local analysis for current-month income/expenses, top spending category, savings tips and accounting concepts.
- Rule-based debit/credit suggestions for common narrations, with a clear warning that suggestions are not posted entries.
- Optional browser speech recognition where supported.
- Existing localStorage finance data keys are not cleared by this update.

## Important AI limitation
This package contains an offline rule-based assistant, not a connected generative AI model. A true generative AI needs a secure server/backend and API credentials; never embed a private API key in this public HTML/JavaScript.

## Deploy
1. Back up current Money Pilot data first.
2. Extract this ZIP. Upload/replace the included project files in the repository root.
3. Commit and wait for GitHub Pages deployment.
4. Test in Chrome with a small test query and a non-critical transaction. Do not clear site storage to troubleshoot.

## Privacy/data
The assistant reads the current browser profile's saved transaction data locally for basic calculations. No transaction data is sent to an AI provider by this offline assistant.
