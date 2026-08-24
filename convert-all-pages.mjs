import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;
const htmlDir = __dirname;
const pagesOut = path.join(root, 'src/pages');
const componentsOut = path.join(root, 'src/components');

fs.mkdirSync(pagesOut, { recursive: true });
fs.mkdirSync(componentsOut, { recursive: true });

const PAGE_FILES = ['index.html'];

function toComponentName(filename) {
  const base = filename.replace(/\.html$/i, '');
  if (base === 'index') return 'Portfolio';
  return base
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

function toRoutePath(filename) {
  return '/';
}

function htmlToJsx(fragment) {
  let jsx = fragment;

  // Protect <style> blocks — CSS braces break JSX
  const styleBlocks = [];
  jsx = jsx.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (_, attrs, css) => {
    const i = styleBlocks.length;
    styleBlocks.push({ attrs, css });
    return `__STYLE_BLOCK_${i}__`;
  });

  // Comments
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, (_, c) => `{/*${c}*/}`);

  // Attributes
  jsx = jsx.replace(/\bclass=/g, 'className=');
  jsx = jsx.replace(/\bfor=/g, 'htmlFor=');

  jsx = jsx.replace(/\bmuted(?=[\s>])/g, ' muted');
  jsx = jsx.replace(/\bautoplay(?=[\s>])/gi, ' autoPlay');
  jsx = jsx.replace(/\bloop(?=[\s>])/g, ' loop');
  jsx = jsx.replace(/\bplaysinline(?=[\s>])/gi, ' playsInline');
  jsx = jsx.replace(/\bchecked(?=[\s>])/g, ' defaultChecked');
  jsx = jsx.replace(/\bdisabled(?=[\s>])/g, ' disabled');
  jsx = jsx.replace(/\brequired(?=[\s>])/g, ' required');

  // SVG / HTML camelCase props
  jsx = jsx.replace(/\btabindex=/gi, 'tabIndex=');
  jsx = jsx.replace(/\bcolspan=/gi, 'colSpan=');
  jsx = jsx.replace(/\browspan=/gi, 'rowSpan=');
  jsx = jsx.replace(/\bmaxlength=/gi, 'maxLength=');
  jsx = jsx.replace(/\bminlength=/gi, 'minLength=');
  jsx = jsx.replace(/\breadonly=/gi, 'readOnly=');
  jsx = jsx.replace(/\bautocomplete=/gi, 'autoComplete=');
  jsx = jsx.replace(/\bstroke-width=/gi, 'strokeWidth=');
  jsx = jsx.replace(/\bstroke-linecap=/gi, 'strokeLinecap=');
  jsx = jsx.replace(/\bstroke-linejoin=/gi, 'strokeLinejoin=');
  jsx = jsx.replace(/\bfill-rule=/gi, 'fillRule=');
  jsx = jsx.replace(/\bclip-rule=/gi, 'clipRule=');
  jsx = jsx.replace(/\bclip-path=/gi, 'clipPath=');
  jsx = jsx.replace(/\bfont-size=/gi, 'fontSize=');
  jsx = jsx.replace(/\bfont-family=/gi, 'fontFamily=');
  jsx = jsx.replace(/\bfont-weight=/gi, 'fontWeight=');
  jsx = jsx.replace(/\bstop-color=/gi, 'stopColor=');
  jsx = jsx.replace(/\bstop-opacity=/gi, 'stopOpacity=');
  jsx = jsx.replace(/\bfill-opacity=/gi, 'fillOpacity=');
  jsx = jsx.replace(/\bstroke-opacity=/gi, 'strokeOpacity=');
  jsx = jsx.replace(/\bxlink:href=/gi, 'xlinkHref=');
  jsx = jsx.replace(/\bxml:lang=/gi, 'xmlLang=');
  jsx = jsx.replace(/\bxml:space=/gi, 'xmlSpace=');
  jsx = jsx.replace(/\bxmlns:xlink=/gi, 'xmlnsXlink=');

  // Convert inline style strings to React style objects
  jsx = jsx.replace(/\sstyle="([^"]*)"/g, (_, css) => {
    const parts = css
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!parts.length) return '';
    const obj = parts
      .map((part) => {
        const i = part.indexOf(':');
        if (i === -1) return null;
        let key = part.slice(0, i).trim();
        let val = part.slice(i + 1).trim();
        if (key === 'enable-background') return null;
        // remove !important for React style objects
        val = val.replace(/\s*!important/gi, '');
        key = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        return `${key}: '${val.replace(/'/g, "\\'")}'`;
      })
      .filter(Boolean)
      .join(', ');
    if (!obj) return '';
    return ` style={{ ${obj} }}`;
  });

  // Self-close void tags
  const voids = [
    'img', 'br', 'hr', 'input', 'source', 'meta', 'link', 'area', 'base',
    'col', 'embed', 'param', 'track', 'wbr',
  ];
  for (const tag of voids) {
    const re = new RegExp(`<(${tag})(\\s[^>]*?)?(?<!/)>`, 'gi');
    jsx = jsx.replace(re, (m, t, attrs = '') => {
      if (m.endsWith('/>')) return m;
      return `<${t}${attrs} />`;
    });
  }

  // Restore <style> blocks
  jsx = jsx.replace(/__STYLE_BLOCK_(\d+)__/g, (_, idx) => {
    const block = styleBlocks[Number(idx)];
    const css = block.css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    return `<style${block.attrs} dangerouslySetInnerHTML={{ __html: \`${css}\` }} />`;
  });

  return jsx.trim();
}

// Convert index.html to Portfolio.jsx
const routes = [];

for (const file of PAGE_FILES) {
  const htmlPath = path.join(htmlDir, file);
  if (!fs.existsSync(htmlPath)) {
    console.warn('Missing', file);
    continue;
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const name = toComponentName(file);
  const route = toRoutePath(file);

  const bodyMatch = html.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : html;

  const jsxBody = htmlToJsx(bodyContent);

  const pageCode = `import React from 'react';\n\nexport default function ${name}() {\n  return (\n    <div className="portfolio-root">\n${jsxBody}\n    </div>\n  );\n}\n`;
  fs.writeFileSync(path.join(pagesOut, `${name}.jsx`), pageCode);
  routes.push({ file, name, route, importPath: `./pages/${name}` });
  console.log('SUCCESS: Converted', file, '-> src/pages/' + name + '.jsx');
}

// Write routes config
const routesFile = `/** Auto-generated route table */
${routes.map((r) => `import ${r.name} from '${r.importPath}';`).join('\n')}

export const routes = [
${routes
  .map((r) => `  { path: '${r.route}', element: ${r.name}, name: '${r.name}' },`)
  .join('\n')}
];
`;

fs.writeFileSync(path.join(root, 'src/routes.jsx'), routesFile);
console.log('SUCCESS: Wrote src/routes.jsx');
