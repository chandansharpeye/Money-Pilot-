"""Run after `npx cap add android`: manifest permissions, portrait lock and launcher icons."""
import os, sys

ROOT = 'android/app/src/main'
MF = os.path.join(ROOT, 'AndroidManifest.xml')

if not os.path.exists(MF):
    print('AndroidManifest.xml not found - run `npx cap add android` first')
    sys.exit(1)

# ---- permissions + portrait ----
perms = [
    'android.permission.POST_NOTIFICATIONS',
    'android.permission.VIBRATE',
    'android.permission.SCHEDULE_EXACT_ALARM',
    'android.permission.USE_EXACT_ALARM',
    'android.permission.RECEIVE_BOOT_COMPLETED',
    'android.permission.USE_BIOMETRIC',
]
s = open(MF, encoding='utf-8').read()
add = ''.join('    <uses-permission android:name="%s" />\n' % p for p in perms if p not in s)
if add:
    s = s.replace('</manifest>', add + '</manifest>')
if 'screenOrientation' not in s:
    s = s.replace('<activity', '<activity android:screenOrientation="portrait"', 1)
open(MF, 'w', encoding='utf-8').write(s)
print('manifest patched')

# ---- launcher icons from icon-512.png ----
try:
    from PIL import Image
except Exception:
    print('Pillow not installed - keeping default icons')
    sys.exit(0)

src = Image.open('icon-512.png').convert('RGBA')
legacy = {'mdpi': 48, 'hdpi': 72, 'xhdpi': 96, 'xxhdpi': 144, 'xxxhdpi': 192}
fore = {'mdpi': 108, 'hdpi': 162, 'xhdpi': 216, 'xxhdpi': 324, 'xxxhdpi': 432}
done = 0
for d in legacy:
    folder = os.path.join(ROOT, 'res', 'mipmap-' + d)
    if not os.path.isdir(folder):
        continue
    done += 1
    sz = legacy[d]
    icon = src.resize((sz, sz), Image.LANCZOS)
    icon.save(os.path.join(folder, 'ic_launcher.png'))
    icon.save(os.path.join(folder, 'ic_launcher_round.png'))
    fs = fore[d]
    canvas = Image.new('RGBA', (fs, fs), (0, 0, 0, 0))
    inner = int(fs * 0.62)
    logo = src.resize((inner, inner), Image.LANCZOS)
    canvas.paste(logo, ((fs - inner) // 2, (fs - inner) // 2), logo)
    canvas.save(os.path.join(folder, 'ic_launcher_foreground.png'))
bg = os.path.join(ROOT, 'res', 'values', 'ic_launcher_background.xml')
if os.path.exists(bg):
    open(bg, 'w').write('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#FFFFFF</color>\n</resources>\n')
print('icons generated for %d densities' % done)
