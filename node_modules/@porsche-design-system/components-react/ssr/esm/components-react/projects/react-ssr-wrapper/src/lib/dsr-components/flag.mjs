import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getFlagCss as getComponentCss$16 } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { parseAndGetAriaAttributes, buildFlagUrl } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';

class DSRFlag extends Component {
    host;
    render() {
        const style = minifyCss(getComponentCss$16(this.props.size));
        return (jsx(Fragment, { children: jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx("img", { src: buildFlagUrl(this.props.name), width: 24, height: 24, loading: "lazy", alt: parseAndGetAriaAttributes(this.props.aria)?.['aria-label'] ?? '' })] }) }));
    }
}

export { DSRFlag };
