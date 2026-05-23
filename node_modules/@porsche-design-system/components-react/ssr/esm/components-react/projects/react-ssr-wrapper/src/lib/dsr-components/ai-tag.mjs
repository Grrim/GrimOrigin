import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getAiTagCss as getComponentCss$1p } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { getAiTagTranslation } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';

class DSRAiTag extends Component {
    host;
    render() {
        const { short, long, generated, modified } = getAiTagTranslation(this.props.locale);
        const style = minifyCss(getComponentCss$1p(this.props.theme));
        return (jsx(Fragment, { children: jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx("div", { children: this.props.variant !== 'abbreviation' ? (this.props.variant === 'modified' ? (modified) : (generated)) : (jsx("abbr", { title: long, children: short })) })] }) }));
    }
}

export { DSRAiTag };
