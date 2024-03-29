# my portfolio site i guess

### project structure
- `~/.github` GitHub configuration
  - `/workflows` GitHub workflows
    - `/build_css.yml` build `~/css` from `~/sass`
    - `/build_js.yml` build `~/js` from `~/ts`
- `~/fonts` custom fonts
  - `/raleway` Raleway custom font
    - `/OFL.txt` Open Font License
    - `/Raleway.*` font files in different formats (for browser compatibility)
- `~/img` all images used in the site
  - `/favicon.png` site favicon
  - `/me.png` the same as `favicon.png` but square
- `~/css` auto-generated from `~/sass`
  - `/raw` css parsed directly from sass. no optimization
      - `/**/*.css` auto-generated css files
  - `/prod` css parsed by postcss. optimized
      - `/**/*.css` auto-generated css files
      - `/**/*.css.map` auto-generated css sourcemaps
- `~/sass` Syntactically Awesome StyleSheets
  - `/common` styles available to any other file
    - `/*.scss` scss formatted sass styles
    - `/*.sass` sass formatted styles
  - `/components` styles for specific components
    - `/**/*.scss` scss formatted sass styles
    - `/**/*.sass` sass formatted styles
  - `/pages` styles for specific pages
    - `/**/*.scss` scss formatted sass styles
    - `/**/*.sass` sass formatted styles
- `~/js` auto-generated from `~/ts`
  - `/**/*.js` auto-generated js files
  - `/**/*.js.map` auto-generated js sourcemaps
- `~/ts`
  - `/common` code available to any other files
    - `/*.ts` typescript source files
  - `/components` code for specific components
    - `/*.ts` typescript source files
  - `/pages` code for specific pages
    - `/*.ts` typescript source files
- `~/**/*.html` source html for site pages
- `~/.prettierrc` Prettier formatting configuration
- `~/tsconfig.json` typescript compiler configuration
- `~/sass.sh` shortcut script to build sass
- `~/postcss.sh` shortcut script to build css for production use
- `~/CNAME` CNAME DNS record for GitHub Pages
- `~/README.md` this file
