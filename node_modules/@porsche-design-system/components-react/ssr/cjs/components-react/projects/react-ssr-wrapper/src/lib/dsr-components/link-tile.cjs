'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var link_wrapper = require('../components/link.wrapper.cjs');
var linkPure_wrapper = require('../components/link-pure.wrapper.cjs');

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the img or picture tag." }
 * @slot {"name": "footer", "description": "Renders a footer section below the description." }
 */
class DSRLinkTile extends react.Component {
    host;
    hasFooterSlot = false;
    render() {
        splitChildren.splitChildren(this.props.children);
        const linkProps = {
            theme: this.props.background,
            variant: 'secondary',
            aria: this.props.aria,
        };
        const sharedLinkProps = {
            href: this.props.href,
            target: this.props.target,
            download: this.props.download,
            rel: this.props.rel,
        };
        const link = (react.createElement(link_wrapper.PLink, { ...sharedLinkProps, ...linkProps, key: "link-or-button", className: "link-or-button" }, this.props.label));
        const linkPure = (react.createElement(linkPure_wrapper.PLinkPure, { ...sharedLinkProps, ...linkProps, key: "link-or-button-pure", className: "link-or-button-pure", hideLabel: true, icon: "arrow-right" }, this.props.label));
        const style = minifyCss.minifyCss(stylesEntry.getLinkTileCss(this.props.aspectRatio, this.props.size, this.props.weight, this.props.background, this.props.align, this.props.compact, this.props.gradient, this.props.hasFooterSlot));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsx("a", { ...sharedLinkProps, tabIndex: -1, "aria-hidden": "true" }), jsxRuntime.jsx("slot", { name: "header" }), jsxRuntime.jsx("div", { className: "media", children: jsxRuntime.jsx("slot", {}) }), jsxRuntime.jsxs("div", { className: "footer", children: [jsxRuntime.jsx("p", { children: this.props.description }), jsxRuntime.jsx("slot", { name: "footer" }), typeof this.props.compact === 'boolean' ? (this.props.compact ? linkPure : link) : [linkPure, link]] })] })] }), this.props.children] }));
    }
}

exports.DSRLinkTile = DSRLinkTile;
