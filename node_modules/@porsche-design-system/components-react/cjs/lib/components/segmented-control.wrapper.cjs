"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');

const PSegmentedControl = /*#__PURE__*/ react.forwardRef(({ backgroundColor, columns = 'auto', compact = false, description = '', disabled = false, form, hideLabel = false, label = '', message = '', name, noWrap = false, onBlur, onChange, onSegmentedControlChange, onUpdate, required = false, state = 'none', theme, value, className, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    hooks.useEventCallback(elementRef, 'blur', onBlur);
    hooks.useEventCallback(elementRef, 'change', onChange);
    hooks.useEventCallback(elementRef, 'segmentedControlChange', onSegmentedControlChange);
    hooks.useEventCallback(elementRef, 'update', onUpdate);
    const WebComponentTag = hooks.usePrefix('p-segmented-control');
    const propsToSync = [backgroundColor, columns, compact, description, disabled, form, hideLabel, label, message, name, noWrap, required, state, theme || hooks.useTheme(), value];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['backgroundColor', 'columns', 'compact', 'description', 'disabled', 'form', 'hideLabel', 'label', 'message', 'name', 'noWrap', 'required', 'state', 'theme', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: hooks.useMergedClass(elementRef, className),
        ref: utils.syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsxRuntime.jsx(WebComponentTag, { ...props });
});

exports.PSegmentedControl = PSegmentedControl;
