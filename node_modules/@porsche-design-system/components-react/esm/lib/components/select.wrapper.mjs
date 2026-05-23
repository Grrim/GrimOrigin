"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { useEventCallback, usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';

const PSelect = /*#__PURE__*/ forwardRef(({ compact = false, description = '', disabled = false, dropdownDirection = 'auto', filter = false, form, hideLabel = false, label = '', message = '', name, onBlur, onChange, onToggle, onUpdate, required = false, state = 'none', theme, value, className, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    useEventCallback(elementRef, 'blur', onBlur);
    useEventCallback(elementRef, 'change', onChange);
    useEventCallback(elementRef, 'toggle', onToggle);
    useEventCallback(elementRef, 'update', onUpdate);
    const WebComponentTag = usePrefix('p-select');
    const propsToSync = [compact, description, disabled, dropdownDirection, filter, form, hideLabel, label, message, name, required, state, theme || useTheme(), value];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['compact', 'description', 'disabled', 'dropdownDirection', 'filter', 'form', 'hideLabel', 'label', 'message', 'name', 'required', 'state', 'theme', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: useMergedClass(elementRef, className),
        ref: syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsx(WebComponentTag, { ...props });
});

export { PSelect };
