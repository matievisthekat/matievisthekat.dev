"use strict";
var _a;
const theme = (window.localStorage.getItem('theme') || 'light');
const colourblind = (window.localStorage.getItem('colourblind') || 'none');
(_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.classList.add(colourblind, theme);
//# sourceMappingURL=theme.js.map