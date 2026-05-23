"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { useEventCallback, usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';

const PPinCode = /*#__PURE__*/ forwardRef(({ compact = false, description = '', disabled = false, form, hideLabel = false, label = '', length = 4, loading = false, message = '', name, onBlur, onChange, onUpdate, required = false, state = 'none', theme, type = 'number', value = '', className, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    useEventCallback(elementRef, 'blur', onBlur);
    useEventCallback(elementRef, 'change', onChange);
    useEventCallback(elementRef, 'update', onUpdate);
    const WebComponentTag = usePrefix('p-pin-code');
    const propsToSync = [compact, description, disabled, form, hideLabel, label, length, loading, message, name, required, state, theme || useTheme(), type, value];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['compact', 'description', 'disabled', 'form', 'hideLabel', 'label', 'length', 'loading', 'message', 'name', 'required', 'state', 'theme', 'type', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: useMergedClass(elementRef, className),
        ref: syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsx(WebComponentTag, { ...props });
});

export { PPinCode };
