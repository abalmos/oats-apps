# A monorepo for @abalmos OATS' group apps

## Folder structure

The goal of this monorepo is to allow the developer to work on each project as
its own repo with the exception that other monorepo packages / applications can
access each other _before_ release. The only exception to this is the initial
install (see "Install from scratch").

- `packages/*`: Used for things that should (_could_) be released as an NPM
  module
- `applications/*`: Used for things that "run" as is and will be "hosted" by us

## Install from scratch

While at the root of the monorepo:

```bash
$ yarn install
$ yarn run lerna bootstrap
```

Afterwards, `yarn run lerna bootstrap` will update all dependencies and link the
`.bin` files.

## **Required** VS code plugins

If you are not using VS Code, then use a tool that will automate running
`eslint`, `stylelint`, `tslint`, and `prettier`. Try `ale` if you're on `vim`.

When using VS Code, enable editor.formatOnSave in editor settings.

### Required

1. [`EditorConfig for VS Code`](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
2. [`ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3. [`Prettier - Code formatter`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
4. [`stylelint`](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)
5. [`TSLint`](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

### Suggested

1. [`Babel JavaScript`](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel) (Syntax highlighting for ES201x, React (JSX), CSS-in-JS, etc.)
2. [`Vim`](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) (Because, why not!?)

## Working on a package

After the initial bootstrap, you shouldn't have to anything differently then
when working on a non-monorepo package. All the normal `yarn` commands should
work the local `package.json` defines the projects dependencies, scripts,
etc.

## Notes about configuration files

### `.babelrc`

Babel@7 has drastically improved the configuration process, but to fix other
issues, e.g., transpiling `node_modules` unexpectedly, it is still a bit
short of what a monorepo would enjoy. Its not that bad. We just have to teach
babel to look upwards for the root config.

If you using WebPack with `babel-loader` this is done by adding the
`rootMode` option. Such as:

```js
{
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          rootMode: 'upward' // This MUST be present
        }
      }
    }]
  }
}
```

You may included a local `.babelrc` as you please. It will automatically be
merged with the root level config. It is expected that nearly all babel
config will be local.

### `.eslintrc`

Packages will pick up the root `.eslintrc` file with no modifications.
However, it WILL stop at a local `.eslintrc` file. If a local `.eslintrc`
is needed (seems unlikely as most changes should probably go in the root
file), then something like:

```json
{
  "extends": "../../.eslintrc",
  "rules": [ ... ]
}
```

### `tslint.json`

Packages will pick up the root `tslint.json` file with no modifications.
However, it WILL stop at a local `tslint.json` file. If a local `tslint.json`
is needed (seems unlikely as most changes should probably go in the root
file), then something like:

```json
{
  "extends": "../../tslint.json",
  "rules": [ ... ]
}
```

is needed to ensure the monorepo wide ts lint rules are still applied.

### `.stylelintrc`

Packages will pick up the root `.stylelintrc` file with no modifications.
However, it WILL stop at a local `.stylelintrc` file. If a local `.stylelintrc`
is needed (seems unlikely as most changes should probably go in the root
file), then something like:

```json
{
  "extends": "../../.stylelintrc",
  "rules": [ ... ]
}
```

### `prettier.config.js`

Packages will pick up the root `prettier.config.js` file with no
modifications. However, it WILL stop at a local `prettier.config.js` file. If
a local `prettier.config.js` is needed (seems unlikely as most changes should
probably go in the root file), then something like:

```js
const root = require('../../prettier.config.js');

module.exports = Object.assign(root, {
  arrowParens: 'always'
});
```

is needed to ensure the monorepo wide formatting rules are still applied.

### `tsconfig.json`

This is specific to a package and should remain entirely local.

### `webpack.config.js`

This is specific to a package and should remain entirely local.
