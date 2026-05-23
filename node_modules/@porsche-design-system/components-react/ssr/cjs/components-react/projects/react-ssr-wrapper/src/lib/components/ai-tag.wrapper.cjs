"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');
var aiTag = require('../dsr-components/ai-tag.cjs');

const PAiTag = /*#__PURE__*/ react.forwardRef(({ locale = 'en_US', theme, variant = 'generated', className, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    const WebComponentTag = hooks.usePrefix('p-ai-tag');
    const propsToSync = [locale, theme || hooks.useTheme(), variant];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['locale', 'theme', 'variant'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsxRuntime.jsx(aiTag.DSRAiTag, { locale, theme: theme || hooks.useTheme(), variant })),
            }
            : {
                suppressHydrationWarning: true,
            }),
        'data-ssr': '',
        class: hooks.useMergedClass(elementRef, className),
        ref: utils.syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsxRuntime.jsx(WebComponentTag, { ...props });
});

exports.PAiTag = PAiTag;
