"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';
import { DSRAiTag } from '../dsr-components/ai-tag.mjs';

const PAiTag = /*#__PURE__*/ forwardRef(({ locale = 'en_US', theme, variant = 'generated', className, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    const WebComponentTag = usePrefix('p-ai-tag');
    const propsToSync = [locale, theme || useTheme(), variant];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['locale', 'theme', 'variant'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsx(DSRAiTag, { locale, theme: theme || useTheme(), variant })),
            }
            : {
                suppressHydrationWarning: true,
            }),
        'data-ssr': '',
        class: useMergedClass(elementRef, className),
        ref: syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsx(WebComponentTag, { ...props });
});

export { PAiTag };
