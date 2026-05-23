"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');
var tag = require('../dsr-components/tag.cjs');

const PTag = /*#__PURE__*/ react.forwardRef(({ color = 'background-surface', compact = false, icon, iconSource, theme, variant, className, children, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    const WebComponentTag = hooks.usePrefix('p-tag');
    const propsToSync = [color, compact, icon, iconSource, theme || hooks.useTheme(), variant];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['color', 'compact', 'icon', 'iconSource', 'theme', 'variant'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsxRuntime.jsx(tag.DSRTag, { color, compact, icon, iconSource, theme: theme || hooks.useTheme(), variant, children })),
            }
            : {
                children,
                suppressHydrationWarning: true,
            }),
        'data-ssr': '',
        class: hooks.useMergedClass(elementRef, className),
        ref: utils.syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsxRuntime.jsx(WebComponentTag, { ...props });
});

exports.PTag = PTag;
