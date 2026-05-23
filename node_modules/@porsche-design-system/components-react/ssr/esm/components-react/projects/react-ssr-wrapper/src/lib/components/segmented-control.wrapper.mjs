"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { useEventCallback, usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';
import { DSRSegmentedControl } from '../dsr-components/segmented-control.mjs';

const PSegmentedControl = /*#__PURE__*/ forwardRef(({ backgroundColor, columns = 'auto', compact = false, description = '', disabled = false, form, hideLabel = false, label = '', message = '', name, noWrap = false, onBlur, onChange, onSegmentedControlChange, onUpdate, required = false, state = 'none', theme, value, className, children, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    useEventCallback(elementRef, 'blur', onBlur);
    useEventCallback(elementRef, 'change', onChange);
    useEventCallback(elementRef, 'segmentedControlChange', onSegmentedControlChange);
    useEventCallback(elementRef, 'update', onUpdate);
    const WebComponentTag = usePrefix('p-segmented-control');
    const propsToSync = [backgroundColor, columns, compact, description, disabled, form, hideLabel, label, message, name, noWrap, required, state, theme || useTheme(), value];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['backgroundColor', 'columns', 'compact', 'description', 'disabled', 'form', 'hideLabel', 'label', 'message', 'name', 'noWrap', 'required', 'state', 'theme', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsx(DSRSegmentedControl, { backgroundColor, columns, compact, description, disabled, form, hideLabel, label, message, name, noWrap, required, state, theme: theme || useTheme(), value, children })),
            }
            : {
                children,
                suppressHydrationWarning: true,
            }),
        'data-ssr': '',
        class: useMergedClass(elementRef, className),
        ref: syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsx(WebComponentTag, { ...props });
});

export { PSegmentedControl };
