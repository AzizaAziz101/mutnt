/* Mobiles Menü: Button öffnet/schließt die Linkliste, Escape schließt. */
(function () {
    var btn = document.getElementById('menu-btn');
    var list = document.getElementById('nav-links');
    if (!btn || !list) return;
    function setOpen(open) {
        list.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', String(open));
        btn.firstElementChild.textContent = open ? 'Schließen' : 'Menü';
    }
    btn.addEventListener('click', function () { setOpen(!list.classList.contains('open')); });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && list.classList.contains('open')) { setOpen(false); btn.focus(); }
    });
})();

/* Mega-Menü per Escape schließen (Fokus verlassen) */
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.activeElement && document.activeElement.closest('.has-menu')) document.activeElement.blur();
});

/* Mega-Menü: öffnet sofort beim Hover, schließt erst 500 ms nach Verlassen */
(function () {
    var items = document.querySelectorAll('.has-menu');
    var timers = new WeakMap();
    items.forEach(function (li) {
        if (li.querySelector(':scope > a[aria-current]')) return; /* aktuelle Seite: kein Aufklappen */
        li.addEventListener('mouseenter', function () {
            items.forEach(function (o) {
                if (o !== li) { clearTimeout(timers.get(o)); o.classList.remove('is-open'); }
            });
            clearTimeout(timers.get(li));
            li.classList.add('is-open');
        });
        li.addEventListener('mouseleave', function () {
            timers.set(li, setTimeout(function () { li.classList.remove('is-open'); }, 500));
        });
    });
})();
