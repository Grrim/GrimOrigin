"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');

/** @deprecated since v3.32.0, will be removed with next major release. Use simple styles instead. */
const PButtonGroup = /*#__PURE__*/ react.forwardRef(({ direction = { base: 'column', xs: 'row' }, className, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    const WebComponentTag = hooks.usePrefix('p-button-group');
    hooks.useBrowserLayoutEffect(() => {
        elementRef.current.direction = direction;
    }, [direction]);
    const props = {
        ...rest,
        class: hooks.useMergedClass(elementRef, className),
        ref: utils.syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsxRuntime.jsx(WebComponentTag, { ...props });
});

exports.PButtonGroup = PButtonGroup;
