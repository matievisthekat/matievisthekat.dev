# my portfolio site i guess

### palettes

| colourblindness |                                light                                 | dark | solarized |
| :------------ | :------------------------------------------------------------------: | :--: | :--: |
| none       | [link](https://coolors.co/242d29-506966-7ba4a2-5d88a1-c79b8d-eeeeee) | n/a | n/a |
| protanopia    | [link](https://coolors.co/272729-5a5b66-8c8da2-6f709a-b3b390-eeeeee) | n/a | n/a |
| dueteranopia  | [link](https://coolors.co/27262a-595766-8a87a2-6d6999-b6b991-eeeeee) | n/a | n/a |
| tritanopia    | [link](https://coolors.co/242a2a-516767-7da2a2-5f9695-c49393-eeeeee) | n/a | n/a |
| achromatopsia | [link](https://coolors.co/292929-616161-979797-7d7d7d-a6a6a6-eeeeee) | n/a | n/a |
| protanomaly   | [link](https://coolors.co/252a29-546066-8296a2-64799d-bea98e-eeeeee) | n/a | n/a |
| deuteranomaly | [link](https://coolors.co/252a29-556266-8399a2-657c9d-bea68e-eeeeee) | n/a | n/a |
| tritanomaly   | [link](https://coolors.co/242b29-506866-7ca3a2-5e8e9c-c5978f-eeeeee) | n/a | n/a |
| achromatomaly | [link](https://coolors.co/272b29-596463-8a9d9c-6e828d-b5a19a-eeeeed) | n/a | n/a |

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
- `~/css` (mostly) auto-generated from `~/sass`
  - `/**/*.min.css` non auto-generated css files
  - `/**/*.css` auto-generated css files
  - `/**/*.css.map` auto-generated css sourcemaps
- `~/sass` Syntactically Awesome StyleSheets
  - `/**/*.scss` scss formatted sass styles
  - `/**/*.sass` sass formatted styles
- `~/js` auto-generated from `~/ts`
  - `/**/*.js` auto-generated js files
  - `/**/*.js.map` auto-generated js sourcemaps
- `~/ts`
  - `/**/*.ts` typescript source files
- `~/**/*.html` source html for site pages
- `~/.prettierrc` Prettier formatting configuration
- `~/tsconfig.json` typescript compiler configuration
- `~/sass_watch.sh` shortcut script to build sass in dev mode
- `~/tsc_watch.sh` shortcut script to build ts in dev mode
- `~/CNAME` CNAME DNS record for GitHub Pages
- `~/README.md` this file
