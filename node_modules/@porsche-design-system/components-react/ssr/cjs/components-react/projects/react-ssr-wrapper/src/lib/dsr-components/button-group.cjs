'use strict';

var jsxRuntime = require('react/jsx-runtime');
var splitChildren = require('../../splitChildren.cjs');
var react = require('react');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the buttons to group." }
 * @deprecated since v3.32.0, will be removed with next major release. Use simple styles instead.
 */
class DSRButtonGroup extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const style = minifyCss.minifyCss(stylesEntry.getButtonGroupCss(this.props.direction));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx("div", { role: "group", children: jsxRuntime.jsx("slot", {}) })] }), this.props.children] }));
    }
}

exports.DSRButtonGroup = DSRButtonGroup;
