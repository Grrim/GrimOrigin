import type { BaseProps } from '../../BaseProps';
import type { BreakpointCustomizable, ButtonGroupDirection } from '../types';
export type PButtonGroupProps = BaseProps & {
    /**
     * Defines the direction of the main and cross axis. The default is ’{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint ‘xs’. You always need to provide a base value when using breakpoints.
     */
    direction?: BreakpointCustomizable<ButtonGroupDirection>;
};
/** @deprecated since v3.32.0, will be removed with next major release. Use simple styles instead. */
export declare const PButtonGroup: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Defines the direction of the main and cross axis. The default is ’{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint ‘xs’. You always need to provide a base value when using breakpoints.
     */
    direction?: BreakpointCustomizable<ButtonGroupDirection>;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
