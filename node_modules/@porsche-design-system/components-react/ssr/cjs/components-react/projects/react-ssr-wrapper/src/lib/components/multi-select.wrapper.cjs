"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');
var multiSelect = require('../dsr-components/multi-select.cjs');

const PMultiSelect = /*#__PURE__*/ react.forwardRef(({ compact = false, description = '', disabled = false, dropdownDirection = 'auto', form, hideLabel = false, label = '', message = '', name, onBlur, onChange, onToggle, onUpdate, required = false, state = 'none', theme, value = [], className, children, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    hooks.useEventCallback(elementRef, 'blur', onBlur);
    hooks.useEventCallback(elementRef, 'change', onChange);
    hooks.useEventCallback(elementRef, 'toggle', onToggle);
    hooks.useEventCallback(elementRef, 'update', onUpdate);
    const WebComponentTag = hooks.usePrefix('p-multi-select');
    const propsToSync = [compact, description, disabled, dropdownDirection, form, hideLabel, label, message, name, required, state, theme || hooks.useTheme(), value];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['compact', 'description', 'disabled', 'dropdownDirection', 'form', 'hideLabel', 'label', 'message', 'name', 'required', 'state', 'theme', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsxRuntime.jsx(multiSelect.DSRMultiSelect, { compact, description, disabled, dropdownDirection, form, hideLabel, label, message, name, required, state, theme: theme || hooks.useTheme(), value, children })),
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

exports.PMultiSelect = PMultiSelect;
