"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { usePrefix, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';

/** @deprecated since v3.32.0, will be removed with next major release. Use simple styles instead. */
const PButtonGroup = /*#__PURE__*/ forwardRef(({ direction = { base: 'column', xs: 'row' }, className, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    const WebComponentTag = usePrefix('p-button-group');
    useBrowserLayoutEffect(() => {
        elementRef.current.direction = direction;
    }, [direction]);
    const props = {
        ...rest,
        class: useMergedClass(elementRef, className),
        ref: syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsx(WebComponentTag, { ...props });
});

export { PButtonGroup };
