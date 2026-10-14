// Maakt een gsm-schermafbeelding (iPhone 13) van loulou.store zonder zwevende widgets.
// Gebruik: PW=$(npm root -g)/playwright node scripts/webshop-screenshot.cjs <uitmap>
const { chromium, devices } = require(process.env.PW);
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices['iPhone 13'], locale: 'nl-BE' });
  const page = await ctx.newPage();
  await page.goto('https://loulou.store', { waitUntil: 'networkidle', timeout: 60000 }).catch(e => console.log('goto', e.message));
  await page.waitForTimeout(3000);
  // cookie/popup-knoppen proberen weg te klikken
  for (const t of ['Accepteren', 'Alles accepteren', 'Accept', 'Akkoord', 'OK']) {
    const b = page.getByRole('button', { name: t }).first();
    if (await b.isVisible().catch(() => false)) { await b.click().catch(() => {}); await page.waitForTimeout(800); }
  }
  await page.keyboard.press('Escape');
  // lazy images laden
  for (let y = 0; y < 6000; y += 600) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(250); }
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(1500);
  await page.evaluate(() => { for (const el of document.querySelectorAll('body *')) { const cs = getComputedStyle(el); if ((cs.position === 'fixed' || cs.position === 'sticky') && el.getBoundingClientRect().top > 150) el.style.setProperty('display','none','important'); } });
  await page.waitForTimeout(500);
  await page.screenshot({ path: process.argv[2] + '/top.png' });
  await page.addStyleTag({ content: 'iframe{display:none!important}' });
  await page.evaluate(() => { for (const el of document.querySelectorAll('body *')) { const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); if (cs.position === 'fixed' && (r.top > 150 || /Hulp nodig/.test(el.textContent || ''))) el.style.setProperty('display','none','important'); } });
  const hulp = page.getByText('Hulp nodig?').first();
  if (await hulp.count()) {
    await hulp.evaluate(el => {
      let n = el;
      while (n) {
        if (n.nodeType === 1 && getComputedStyle(n).position === 'fixed') { n.style.setProperty('display','none','important'); }
        n = n.parentNode || n.host;
        if (n && n.nodeType === 11) n = n.host;
      }
    });
    console.log('hulp verborgen');
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: process.argv[2] + '/full.png', fullPage: true });
  console.log(await page.title(), await page.evaluate(() => document.body.scrollHeight));
  await browser.close();
})();
