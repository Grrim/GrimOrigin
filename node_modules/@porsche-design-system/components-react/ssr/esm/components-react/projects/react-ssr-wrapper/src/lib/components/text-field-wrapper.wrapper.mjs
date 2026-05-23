"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { useEventCallback, usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';
import { DSRTextFieldWrapper } from '../dsr-components/text-field-wrapper.mjs';

/** @deprecated since v3.29.0, will be removed with next major release. Please use one of the specific input components instead: `p-input-date`, `p-input-email`, `p-input-number`, `p-input-password`, `p-input-search`, `p-input-tel`, `p-input-text`, `p-input-time` or `p-input-url`. */
const PTextFieldWrapper = /*#__PURE__*/ forwardRef(({ actionIcon, actionLoading = false, description = '', hideLabel = false, label = '', message = '', onAction, showCharacterCount, showCounter = true, showPasswordToggle = true, state = 'none', submitButton = true, theme, unit = '', unitPosition = 'prefix', className, children, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    useEventCallback(elementRef, 'action', onAction);
    const WebComponentTag = usePrefix('p-text-field-wrapper');
    const propsToSync = [actionIcon, actionLoading, description, hideLabel, label, message, showCharacterCount, showCounter, showPasswordToggle, state, submitButton, theme || useTheme(), unit, unitPosition];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['actionIcon', 'actionLoading', 'description', 'hideLabel', 'label', 'message', 'showCharacterCount', 'showCounter', 'showPasswordToggle', 'state', 'submitButton', 'theme', 'unit', 'unitPosition'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsx(DSRTextFieldWrapper, { actionIcon, actionLoading, description, hideLabel, label, message, showCharacterCount, showCounter, showPasswordToggle, state, submitButton, theme: theme || useTheme(), unit, unitPosition, children })),
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

export { PTextFieldWrapper };
