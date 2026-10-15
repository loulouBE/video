// Maakt gsm-schermafbeeldingen (iPhone 13) van de echte TEXTIEL & VINYL-site en lijst de geladen beelden op.
// Gebruik: PW=$(npm root -g)/playwright node site-capture.cjs <uitmap>
const { chromium, devices } = require(process.env.PW);
const fs = require('fs');
(async () => {
  const out = process.argv[2];
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices['iPhone 13'], locale: 'nl-BE' });
  const imgs = new Set();
  for (const [naam, pad] of [['home', '/'], ['registreer', '/registreer'], ['collectie', '/collectie'], ['tickets', '/tickets']]) {
    const page = await ctx.newPage();
    page.on('response', r => { const u = r.url(); if (/\.(jpe?g|png|webp)(\?|$)/i.test(u)) imgs.add(u); });
    await page.goto('https://events.loulou.store' + pad, { waitUntil: 'networkidle', timeout: 60000 }).catch(e => console.log(naam, e.message));
    await page.waitForTimeout(2500);
    for (let y = 0; y < 9000; y += 700) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(200); }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(1200);
    // "Edit with Lovable"-badge verbergen (hoort niet bij de site)
    await page.addStyleTag({ content: '#lovable-badge, [id*="lovable-badge"], a[href*="lovable.dev"], iframe { display: none !important; }' });
    await page.evaluate(() => { for (const el of document.querySelectorAll('body *')) { if (/Edit with/.test(el.textContent || '') && getComputedStyle(el).position === 'fixed') el.style.setProperty('display', 'none', 'important'); } });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/${naam}-top.png` });
    await page.screenshot({ path: `${out}/${naam}-full.png`, fullPage: true });
    const knop = await page.getByText('Registreer je vinyl').first().boundingBox().catch(() => null);
    console.log(naam, await page.title(), 'hoogte', await page.evaluate(() => document.body.scrollHeight), 'knop', JSON.stringify(knop));
    await page.close();
  }
  fs.writeFileSync(`${out}/beelden.txt`, [...imgs].join('\n'));
  await browser.close();
})();
