"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { useEventCallback, usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';
import { DSRInputPassword } from '../dsr-components/input-password.mjs';

const PInputPassword = /*#__PURE__*/ forwardRef(({ autoComplete, compact = false, description = '', disabled = false, form, hideLabel = false, label = '', loading = false, maxLength, message = '', minLength, name, onBlur, onChange, onInput, placeholder = '', readOnly = false, required = false, state = 'none', theme, toggle = false, value = '', className, children, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    useEventCallback(elementRef, 'blur', onBlur);
    useEventCallback(elementRef, 'change', onChange);
    useEventCallback(elementRef, 'input', onInput);
    const WebComponentTag = usePrefix('p-input-password');
    const propsToSync = [autoComplete, compact, description, disabled, form, hideLabel, label, loading, maxLength, message, minLength, name, placeholder, readOnly, required, state, theme || useTheme(), toggle, value];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['autoComplete', 'compact', 'description', 'disabled', 'form', 'hideLabel', 'label', 'loading', 'maxLength', 'message', 'minLength', 'name', 'placeholder', 'readOnly', 'required', 'state', 'theme', 'toggle', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsx(DSRInputPassword, { autoComplete, compact, description, disabled, form, hideLabel, label, loading, maxLength, message, minLength, name, placeholder, readOnly, required, state, theme: theme || useTheme(), toggle, value, children })),
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

export { PInputPassword };
