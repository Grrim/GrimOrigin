'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var loadingMessage = require('./loading-message.cjs');
var stateMessage = require('./state-message.cjs');
var legacyLabel = require('./legacy-label.cjs');
var spinner_wrapper = require('../components/spinner.wrapper.cjs');

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the input." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @deprecated since v3.29.0, will be removed with next major release. Please use `p-checkbox` instead.
 */
class DSRCheckboxWrapper extends react.Component {
    host;
    initialLoading = false;
    input;
    render() {
        const { namedSlotChildren, otherChildren } = splitChildren.splitChildren(this.props.children);
        const { disabled } = typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props || {};
        const style = minifyCss.minifyCss(stylesEntry.getCheckboxWrapperCss(this.props.hideLabel, this.props.state, disabled, this.props.loading, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsx(legacyLabel.LegacyLabel, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, label: this.props.label, isLoading: this.props.loading, isDisabled: disabled, formElement: typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props }), jsxRuntime.jsxs("div", { className: "wrapper", children: [jsxRuntime.jsx("slot", {}), this.props.loading && (jsxRuntime.jsx(spinner_wrapper.PSpinner, { className: "spinner", size: "inherit", theme: this.props.theme, "aria-hidden": "true" }))] }), jsxRuntime.jsx(stateMessage.StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null }), jsxRuntime.jsx(loadingMessage.LoadingMessage, { loading: this.props.loading, initialLoading: this.props.initialLoading })] })] }), this.props.children] }));
    }
}

exports.DSRCheckboxWrapper = DSRCheckboxWrapper;
