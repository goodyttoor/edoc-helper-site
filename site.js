// Fade content up as it comes into view (groups stagger a little). Anything at or above the screen's lower edge is
// shown — also what a jump (a #link, the scrollbar) skipped past, so nothing stays hidden. Only with JS and without
// reduced motion; otherwise everything is simply there.
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const groups = ['.pillars .pillar', '.sec-h', '.feature', '.grid3 .mini', '.steps .step', '.trust .mini', 'details.qa', '.cta-band .wrap > *', '.doc section', '.doc figure']
  let pending = []
  for (const sel of groups) {
    document.querySelectorAll(sel).forEach((el, i) => {
      // On screen already at load: no fade (the page just appeared).
      const r = el.getBoundingClientRect()
      if (r.top < innerHeight && r.bottom > 0 && scrollY > 0) return
      el.classList.add('rv'); el.style.setProperty('--d', `${(i % 6) * 0.07}s`); pending.push(el)
    })
  }
  let queued = false
  const check = () => {
    queued = false
    const edge = innerHeight * 0.92
    pending = pending.filter(el => { if (el.getBoundingClientRect().top < edge) { el.classList.add('in'); return false } return true })
    if (!pending.length) { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll) }
  }
  const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(check) } }
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll)
  requestAnimationFrame(check)
})()
