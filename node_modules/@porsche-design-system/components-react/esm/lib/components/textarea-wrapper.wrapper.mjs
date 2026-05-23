"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';

/** @deprecated since v3.29.0, will be removed with next major release. Please use `p-textarea` instead. */
const PTextareaWrapper = /*#__PURE__*/ forwardRef(({ description = '', hideLabel = false, label = '', message = '', showCharacterCount, showCounter = true, state = 'none', theme, className, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    const WebComponentTag = usePrefix('p-textarea-wrapper');
    const propsToSync = [description, hideLabel, label, message, showCharacterCount, showCounter, state, theme || useTheme()];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['description', 'hideLabel', 'label', 'message', 'showCharacterCount', 'showCounter', 'state', 'theme'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: useMergedClass(elementRef, className),
        ref: syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsx(WebComponentTag, { ...props });
});

export { PTextareaWrapper };
