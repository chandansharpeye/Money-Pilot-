# Money Pilot V3.5 (based on V3.1) — Welcome Tour + Jarvis Assistant

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


## Money Pilot upgrade pack (local-first)

Added in this update while preserving the existing transaction store and modules:
- Future Balance Predictor: editable current/opening balance and average net cash-flow projection from the last three completed months. Forecast is an estimate, not bank-synced balance.
- Savings Challenges: targets, target dates, manual deposits and progress, stored in the active profile data.
- Smart SMS Import: paste a bank transaction SMS, parse likely amount/type/merchant, review and confirm before saving; duplicate fingerprints are checked and OTP-like messages are rejected.
- Jarvis voice transaction command: supported browser speech recognition can stage simple income/expense commands; a confirmation prompt is required before adding.
- App-open lock: passcode hash stored using PBKDF2 in browser storage, optional WebAuthn platform authenticator/device verification where HTTPS and browser/device support it, and lock-on-open/lock after a long background period.
- Encrypted active-profile backup/restore using PBKDF2 + AES-GCM. The passphrase is not stored; losing it means the encrypted backup cannot be restored.

### Important platform limits
This source is still a PWA/web app. It cannot automatically read incoming SMS in the background. The SMS panel is a manual paste/import workflow. Native SMS automation needs a real Android project, native SMS receiver/permission flow, Android-side implementation and review of current Google Play SMS/Call Log permission rules before distribution. Do not claim it is enabled in this ZIP.

The app lock is a local privacy gate, not a security boundary against someone who can modify the client code or access browser storage. WebAuthn prompts for device verification and may use biometrics or the device screen lock depending on the Android/browser setup. Strong protection of financial data requires native Android Keystore/biometric APIs and encrypted storage. Keep the Android screen lock enabled and make backups.

### Test after deployment
1. Back up existing data first.
2. Deploy over HTTPS, then reload the PWA (if needed, close/reopen it to refresh the service worker cache).
3. Test passcode lock, optional device verification, encrypted backup/restore with a non-critical profile, forecast opening balance, a savings challenge, SMS import using a sample message, and Jarvis voice command confirmation.
4. Confirm existing Home, Add, Report, Scan, accounting and invoice modules still work.


## V3.5: BHIM-style app lock
- App khulte hi 4-digit PIN keypad (dots + number pad), BHIM jaisa.
- Pehli baar app kholne par PIN banao, phir fingerprint/face unlock ON karne ka option.
- Har baar app khulne par fingerprint prompt apne aap aata hai; fail ho to PIN se unlock.
- App 30 second background me rahe to wapas aane par lock.
- 5 galat PIN ke baad cooldown. "PIN bhool gaye?" me profile wali DOB se reset (data delete nahi hota).
- Purana alphanumeric passcode wale users ke liye fallback password box.
- Same storage key and PBKDF2 hash, existing data/lock settings nahi tootte.
- Limit: yeh local privacy gate hai (browser storage level). Bank-grade security ke liye native Android Keystore chahiye.


## V3.5: Notification reminders (sound ke saath)
Reminders page (Bill / payment reminders) me naya "Notifications" card:
- Notification ON/OFF, reminder ka time, due se 1 din pehle yaad dilana, roz hisaab likhne ka reminder, test button.
- Reminders in cheezon se bante hain: unpaid bills, EMI next date, follow-ups, savings challenges aur goals ki date.
- Overdue cheezon ka roz ek nudge.

### Kaise kaam karta hai
- **Browser/PWA:** app khula ya background me ho tab notification aati hai. Chrome ka Periodic Background Sync installed PWA par kabhi-kabhi band app me bhi chalata hai, lekin time ki guarantee nahi.
- **Android APK (Capacitor):** exact time par local notification, app band ho tab bhi, phone ki notification sound/vibration ke saath. Ye pakka tareeka hai.
- Notification ki sound phone/browser ki notification setting se aati hai (custom sound web par set nahi hoti).

### APK me enable karne ke steps
1. `npm install` (package.json me `@capacitor/local-notifications` add hai)
2. `npx cap sync android`
3. Android 13+ ke liye `POST_NOTIFICATIONS` aur exact alarm ki permission AndroidManifest me plugin docs ke hisaab se check karo.
4. Build karke phone me install, Reminders page > "Notification ON karo".


## V3.5: Data safety, Trash/Undo, naya Menu
- **Automatic copy:** har save ke baad data ki copy IndexedDB me banti hai, aur pichhle 7 din ki daily copies rehti hain. localStorage khaali mile to app restore ka option deta hai.
- **Backup reminder:** 7 din se backup nahi liya to Home par card aata hai. "Backup lo" button phone ke share sheet se file WhatsApp/Drive par bhej deta hai.
- **Protected storage:** browser ko data khud delete karne se rokne ki request (Security & Backup page).
- **Trash + Undo:** koi bhi delete (entry, bill, loan, goal, customer, stock...) 30 din tak Trash me rehta hai. Delete ke baad 7 second ka Undo button aata hai.
- **Naya Menu:** search box, "Haal hi me" list, aur 7 saaf groups. Pehle chhupe hue tools (Study Timer, Homework, Finance Hub, Search) bhi ab dikhte hain.
- Limit: automatic copy usi browser me rehti hai, "Clear site data" se ye bhi ud sakti hai. Isliye haftawari backup file bahar rakho.


## V3.5: 2 main tabs + naye business features + fixes
- **2 main tabs:** Business aur Student. Har tab me numbered sections (1, 2, 3...) aur unke sub-features. Pehli baar app khulne par poochta hai, baad me upar se badal sakte ho. Home, Settings aur search (🔎) dono tabs me common.
- **Naye business features:** 💸 UPI Collect (QR + payment link + invoice PDF par QR), 📄 Party Statement (PDF + WhatsApp reminder 1st/2nd/final), 🚨 Stock Alerts (kam stock + expiry, notification ke saath).
- **Fixes (V3.1 ke purane bug):** Accounting Cycle, Finance Hub, AI Business Analyst aur Barcode/Outstanding/Inventory/Bank/Audit/Sync/CA tabs galat ya khaali page dikha rahe the. Study Timer aur Homework khaali dikhte the. PDF, Excel aur backup download standalone app me save nahi ho rahe the.
- **AI features:** Scan screenshot, AI insights aur Doubt Solver online AI server (Claude) maangte hain, jo is app me connect nahi hai. Ye features tab tak band rahenge jab tak Cloudflare Worker se jode na jayein (`worker.js` repo me hai).

## V3.5 final testing round
- **Startup bug fix:** `LG` (language) kabhi declare nahi tha, isliye app start ke beech me toot jata tha aur galat amount jaise messages me error aata tha. Ab language `localStorage` se load hoti hai (Hinglish/English/Hindi/Odia).
- **Accounting Cycle page ab chalta hai:** month-end closing checklist (7 steps), income/kharch/munafa, lena-dena, stock value, supplier payable, "Month close karo" aur WhatsApp summary. Pehle ye tab khaali tha.
- **Test coverage:** sabhi 62 tabs khulte hain, har page ke buttons dabakar JS errors check kiye, UPI QR ko QR decoder se verify kiya, party reminders, stock alerts, invoice PDF QR, PIN lock, notifications, Trash/Undo, IndexedDB recovery aur student flows test hue.
- **Test nahi ho paya (phone par check karna):** fingerprint/face unlock, asli notification sound, share sheet, aur PDF/Excel libraries (internet chahiye, CDN se load hoti hain).

## V3.5 final verification (is round)
- **Bug fix:** Copy buttons (UPI link, WhatsApp fallback) ab clipboard permission na milne par bhi error nahi dete, text-copy ka fallback chalta hai aur sahi message dikhta hai.
- **Tested (headless browser):** sabhi 62 tabs dono modes (Business/Student) me khulte hain; asli forms se entry, income, udhaar, stock, cash book, invoice (GST ke saath) bane; stock alerts (kam stock, expiry paas, expire ho chuka) aur notification queue; party statement aur WhatsApp reminder; UPI QR ko QR decoder se verify kiya; global search; Undo/Trash; IndexedDB copy; PIN lock; 115 buttons ki click-through me 0 JS error.
- **Test nahi ho paya (phone par check karna):** fingerprint/face unlock, asli notification sound, share sheet, aur PDF/Excel download (jsPDF/SheetJS internet se load hote hain).
