import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getDrilldownCss as getComponentCss$1b } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { updateDrilldownItemState, parseAndGetAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PButton } from '../components/button.wrapper.mjs';
import { PButtonPure } from '../components/button-pure.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot to render p-drilldown items." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 * @controlled {"props": ["activeIdentifier"], "event": "update"}
 *
 * @experimental
 */
class DSRDrilldown extends Component {
    host;
    drilldownItemElements = [];
    primary = true;
    isSecondaryDrawerVisible = !!this.props.activeIdentifier;
    dialog;
    drawer;
    isDesktop = false;
    async componentWillLoad() {
        this.props.defineDrilldownItemElements();
        const activeItem = this.props.drilldownItemElements.find((item) => item.identifier === this.props.activeIdentifier);
        activeItem && updateDrilldownItemState(activeItem, true); // Set item state
    }
    render() {
        splitChildren(this.props.children);
        const style = minifyCss(getComponentCss$1b(this.props.open, this.primary, this.isSecondaryDrawerVisible, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx("dialog", { inert: !this.props.open, ...parseAndGetAriaAttributes(this.props.aria), children: jsxs("div", { className: "drawer", children: [jsx(PButtonPure, { className: "back", type: "button", size: "small", alignLabel: "end", stretch: true, icon: "arrow-left", theme: this.props.theme, hideLabel: true, children: "Back" }), jsx(PButton, { className: "dismiss-mobile", type: "button", variant: "ghost", hideLabel: true, icon: "close", theme: this.props.theme, children: "Dismiss drilldown" }), jsx(PButtonPure, { className: "dismiss-desktop", type: "button", size: "medium", icon: "close", hideLabel: true, theme: this.props.theme, children: "Dismiss drilldown" }), jsx("div", { className: "scroller", children: jsx("slot", {}) })] }) })] }), this.props.children] }));
    }
}

export { DSRDrilldown };
