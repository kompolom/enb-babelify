var enb = require('enb'),
    babel = require('babel-core'),
    babelOptions = {
        compact : false,
        plugins: [
            'transform-object-assign',
            'transform-es2015-arrow-functions',
            'transform-es2015-block-scoped-functions',
            'transform-es2015-function-name',
            'transform-es2015-block-scoping',
            'transform-es2015-destructuring',
            'transform-es2015-parameters',
            'transform-es2015-shorthand-properties',
            'transform-es2015-spread',
            'transform-es2015-template-literals'
        ]
    };
    buildFlow = enb.buildFlow || require('enb/lib/build-flow');

/**
 * @class BrowserJsTech
 * @augments {BaseTech}
 * @classdesc
 *
 * Process JavaScript file by Babel. <br/><br/>
 *
 * @param {Object}    [options]                              Options
 * @param {String}    [options.target='?.browser.es5.js']    Path to compiled file.
 * @param {String}    [options.source]                 Path to a source Javascript code
 * @param {String}    [options.babelOptions={}]              Options provided to Babel
 *
 * @example
 * // Code in a file system before build:
 * // blocks/
 * // ├── block.vanilla.js
 * // └── block.browser.js
 * // └── block.js
 * //
 * // After build:
 * // bundle/
 * // └── bundle.browser.es5.js
 *
 * var BabelBrowser = require('enb-babel/techs/browser-js'),
 *     FileProvideTech = require('enb/techs/file-provider'),
 *     bemTechs = require('enb-bem-techs');
 *
 * module.exports = function(config) {
 *     config.node('bundle', function(node) {
 *         // get FileList
 *         node.addTechs([
 *             [FileProvideTech, { target: '?.bemdecl.js' }],
 *             [bemTechs.levels, levels: ['blocks']],
 *             [bemTechs.deps],
 *             [bemTechs.files]
 *         ]);
 *
 *         // build browser.js file
 *         node.addTech([ BabelBrowser, { source: '?.browser.js' } ]);
 *         node.addTarget('?.browser.es5.js');
 *     });
 * };
 */
module.exports = buildFlow.create()
    .name('babel')
    .target('target', '?.es5.js')
    .defineOption('babelOptions', {})
    .useSourceText('source', '')
    .builder(function (source) {
        return babel.transform(source, babelOptions).code;
    })
    .createTech();
