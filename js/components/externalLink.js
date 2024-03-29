"use strict";
const allAnchors = document.querySelectorAll('a');
allAnchors.forEach((a) => {
    const href = new URL(a.href);
    const style = getComputedStyle(a);
    if (href.hostname !== window.location.hostname) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
        if (a.classList.contains('show-external')) {
            a.innerHTML += `<svg width="1em" height="1em" fill="${style.color}" stroke="${style.color}" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><path d="M246.499 52.9313L92 207.431" stroke-width="12" stroke-linecap="round"/><path d="M262.541 41C262.541 38.7909 260.75 37 258.541 37H222.541C220.332 37 218.541 38.7909 218.541 41C218.541 43.2091 220.332 45 222.541 45H254.541V77C254.541 79.2091 256.332 81 258.541 81C260.75 81 262.541 79.2091 262.541 77V41ZM249.328 55.87L261.369 43.8284L255.713 38.1716L243.671 50.2132L249.328 55.87Z"/><line x1="47" y1="257" x2="247" y2="257" stroke-width="14" stroke-linecap="round"/><line x1="170" y1="52" x2="47" y2="52" stroke-width="14" stroke-linecap="round"/><line x1="247" y1="257" x2="247" y2="129" stroke-width="14" stroke-linecap="round"/><line x1="47" y1="52" x2="47" y2="257" stroke-width="14" stroke-linecap="round"/></svg>`;
        }
    }
});
//# sourceMappingURL=externalLink.js.map