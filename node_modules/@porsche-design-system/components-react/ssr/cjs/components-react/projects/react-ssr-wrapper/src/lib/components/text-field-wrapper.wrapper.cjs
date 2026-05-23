"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');
var textFieldWrapper = require('../dsr-components/text-field-wrapper.cjs');

/** @deprecated since v3.29.0, will be removed with next major release. Please use one of the specific input components instead: `p-input-date`, `p-input-email`, `p-input-number`, `p-input-password`, `p-input-search`, `p-input-tel`, `p-input-text`, `p-input-time` or `p-input-url`. */
const PTextFieldWrapper = /*#__PURE__*/ react.forwardRef(({ actionIcon, actionLoading = false, description = '', hideLabel = false, label = '', message = '', onAction, showCharacterCount, showCounter = true, showPasswordToggle = true, state = 'none', submitButton = true, theme, unit = '', unitPosition = 'prefix', className, children, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    hooks.useEventCallback(elementRef, 'action', onAction);
    const WebComponentTag = hooks.usePrefix('p-text-field-wrapper');
    const propsToSync = [actionIcon, actionLoading, description, hideLabel, label, message, showCharacterCount, showCounter, showPasswordToggle, state, submitButton, theme || hooks.useTheme(), unit, unitPosition];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['actionIcon', 'actionLoading', 'description', 'hideLabel', 'label', 'message', 'showCharacterCount', 'showCounter', 'showPasswordToggle', 'state', 'submitButton', 'theme', 'unit', 'unitPosition'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsxRuntime.jsx(textFieldWrapper.DSRTextFieldWrapper, { actionIcon, actionLoading, description, hideLabel, label, message, showCharacterCount, showCounter, showPasswordToggle, state, submitButton, theme: theme || hooks.useTheme(), unit, unitPosition, children })),
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

exports.PTextFieldWrapper = PTextFieldWrapper;
