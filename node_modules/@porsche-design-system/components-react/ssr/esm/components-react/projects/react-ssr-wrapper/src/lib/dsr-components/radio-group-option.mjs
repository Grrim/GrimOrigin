import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getRadioGroupOptionCss as getComponentCss$y } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { loadingId, LoadingMessage } from './loading-message.mjs';
import { Label } from './label.mjs';
import { messageId } from './state-message.mjs';
import { PSpinner } from '../components/spinner.wrapper.mjs';

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "label-after", "description": "Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`)." }
 */
class DSRRadioGroupOption extends Component {
    host;
    initialLoading = false;
    inputElement;
    render() {
        splitChildren(this.props.children);
        const { theme = 'light', selected: isSelected, name, state } = this.props;
        const isDisabled = this.props.disabled || this.props.disabledParent;
        const isOptionLoading = this.props.loading && !isSelected;
        const isLoading = isOptionLoading || this.props.loadingParent;
        const id = 'radio-group-option';
        const style = minifyCss(getComponentCss$y(isDisabled, isLoading, state, theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(Fragment, { children: jsxs("div", { className: "root", children: [jsxs("div", { className: "wrapper", children: [jsx("input", { id: id, type: "radio", name: name, checked: isSelected, disabled: isDisabled || isLoading, value: this.props.value, onClick: (e) => {
                                                    e.stopPropagation();
                                                }, onBlur: this.props.onBlur, "aria-describedby": isLoading ? loadingId : `${messageId}`, "aria-invalid": state === 'error' ? 'true' : null, "aria-disabled": isDisabled || isLoading ? 'true' : null }), isOptionLoading && !this.props.loadingParent && (jsx(PSpinner, { className: "spinner", size: "inherit", theme: theme, "aria-hidden": "true" }))] }), jsx(Label, { hasLabel: this.props.label, hasDescription: false, host: null, label: this.props.label, htmlFor: id, isDisabled: isDisabled, isLoading: isLoading, stopClickPropagation: true }), !this.props.loadingParent && (jsx(LoadingMessage, { loading: isOptionLoading, initialLoading: this.props.initialLoading }))] }) })] }), this.props.children] }));
    }
}

export { DSRRadioGroupOption };
