'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');

class DSRAiTag extends react.Component {
    host;
    render() {
        const { short, long, generated, modified } = utilsEntry.getAiTagTranslation(this.props.locale);
        const style = minifyCss.minifyCss(stylesEntry.getAiTagCss(this.props.theme));
        return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx("div", { children: this.props.variant !== 'abbreviation' ? (this.props.variant === 'modified' ? (modified) : (generated)) : (jsxRuntime.jsx("abbr", { title: long, children: short })) })] }) }));
    }
}

exports.DSRAiTag = DSRAiTag;
