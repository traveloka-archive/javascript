/** @babel */
/* global atom */
import path from 'path';
import { CompositeDisposable, Range } from 'atom';
import { allowUnsafeNewFunction } from 'loophole';
import setText from 'atom-set-text';
import pkgDir from 'pkg-dir';
import { sync as loadJson } from 'load-json-file';
import ruleURI from 'eslint-rule-documentation';

const SEVERITY_ERROR_CODE = 2;

let lintText;
allowUnsafeNewFunction(() => {
  lintText = require('marlint').lintText;
});

function lint(textEditor) {
  const filePath = textEditor.getPath();
  const dir = pkgDir.sync(path.dirname(filePath));

  // no package.json
  if (!dir) {
    return [];
  }

  // ugly hack to workaround ESLint's lack of a `cwd` option
  // TODO: remove this when https://github.com/sindresorhus/atom-linter-xo/issues/19 is resolved
  const defaultCwd = process.cwd();
  process.chdir(dir);

  const pkg = loadJson(path.join(dir, 'package.json'));

  const lintAll = atom.config.get('linter-marlint.lintAll');
  if (!lintAll) {
    // only lint when `marlint` included as a dependency
    if (!(pkg.dependencies && pkg.dependencies.marlint) &&
      !(pkg.devDependencies && pkg.devDependencies.marlint)) {
      return [];
    }
  }

  let report;
  allowUnsafeNewFunction(() => {
    report = lintText(textEditor.getText(), {
      cwd: dir,
      filename: filePath,
    });
  });

  process.chdir(defaultCwd);

  const textBuffer = textEditor.getBuffer();

  return report.results[0].messages.map(x => {
    let fix;

    if (x.fix) {
      fix = {
        range: new Range(
          textBuffer.positionForCharacterIndex(x.fix.range[0]),
          textBuffer.positionForCharacterIndex(x.fix.range[1])
        ),
        newText: x.fix.text,
      };
    }

    const ret = {
      filePath,
      fix,
      type: x.severity === SEVERITY_ERROR_CODE ? 'Error' : 'Warning',
      html: `<span>${x.message} (<a href=${ruleURI(x.ruleId || '').url}>${x.ruleId}</a>)</span>`,
    };

    // some messages don't have these
    const lineOffset = 1;
    const columnOffset = 1;
    if (typeof x.line === 'number' && typeof x.column === 'number') {
      ret.range = [
        [x.line - lineOffset, x.column - lineOffset],
        [x.line - columnOffset, x.column - columnOffset],
      ];
    }

    return ret;
  });
}

export const config = {
  lintAll: {
    title: 'Lint all files',
    description: 'Lint all files even though `marlint` is not specified as package dependency',
    type: 'boolean',
    default: false,
  },
};

export function provideLinter() {
  return {
    name: 'Marlint',
    grammarScopes: [
      'source.js',
      'source.jsx',
      'source.js.jsx',
    ],
    scope: 'file',
    lintOnFly: true,
    lint,
  };
}

export function activate() {
  /* eslint no-invalid-this: 0 */
  require('atom-package-deps').install('linter-marlint');

  this.subscriptions = new CompositeDisposable();
  this.subscriptions.add(atom.commands.add('atom-text-editor', {
    'Marlint:AutoFix': () => {
      const editor = atom.workspace.getActiveTextEditor();

      if (!editor) {
        return;
      }

      let report;

      allowUnsafeNewFunction(() => {
        report = lintText(editor.getText(), {
          fix: true,
          cwd: path.dirname(editor.getPath()),
        });
      });

      const output = report.results[0].output;

      if (output) {
        setText(output);
      }
    },
  }));
}

export function deactivate() {
  this.subscriptions.dispose();
}
