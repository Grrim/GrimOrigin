import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getTagCss as getComponentCss$9 } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { VARIANT_TO_COLOR_MAP, getDirectChildHTMLElement } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the tag content." }
 */
class DSRTag extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const hasIcon = !!(this.props.icon || this.props.iconSource);
        const deprecationMap = {
            'background-default': 'background-base',
            'neutral-contrast-high': 'primary',
            'notification-neutral': 'notification-info-soft',
            'notification-warning': 'notification-warning-soft',
            'notification-success': 'notification-success-soft',
            'notification-error': 'notification-error-soft',
        };
        // Resolve effective color: variant takes precedence over color
        const resolvedColor = this.props.variant
            ? VARIANT_TO_COLOR_MAP[this.props.variant]
            : (deprecationMap[this.props.color] || this.props.color);
        const style = minifyCss(getComponentCss$9(resolvedColor, this.props.compact, !!getDirectChildHTMLElement(null, 'a,button'), hasIcon, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("span", { children: [hasIcon && (jsx(PIcon, { className: "icon", name: this.props.icon, source: this.props.iconSource, color: "primary", size: "x-small", theme: this.props.theme, "aria-hidden": "true" })), jsx("slot", {})] })] }), this.props.children] }));
    }
}

export { DSRTag };
