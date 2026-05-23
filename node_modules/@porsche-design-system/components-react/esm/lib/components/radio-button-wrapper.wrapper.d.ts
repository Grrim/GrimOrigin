import type { BaseProps } from '../../BaseProps';
import type { BreakpointCustomizable, RadioButtonWrapperState, Theme } from '../types';
export type PRadioButtonWrapperProps = BaseProps & {
    /**
     * Show or hide label. For better accessibility it's recommended to show the label.
     */
    hideLabel?: BreakpointCustomizable<boolean>;
    /**
     * The label text.
     */
    label?: string;
    /**
     * @experimental Disables the radio button and shows a loading indicator.
     */
    loading?: boolean;
    /**
     * The message styled depending on validation state.
     */
    message?: string;
    /**
     * The validation state.
     */
    state?: RadioButtonWrapperState;
    /**
     * Adapts the color depending on the theme.
     */
    theme?: Theme;
};
/** @deprecated since v3.30.0, will be removed with next major release. Please use `p-radio-group` instead. */
export declare const PRadioButtonWrapper: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Show or hide label. For better accessibility it's recommended to show the label.
     */
    hideLabel?: BreakpointCustomizable<boolean>;
    /**
     * The label text.
     */
    label?: string;
    /**
     * @experimental Disables the radio button and shows a loading indicator.
     */
    loading?: boolean;
    /**
     * The message styled depending on validation state.
     */
    message?: string;
    /**
     * The validation state.
     */
    state?: RadioButtonWrapperState;
    /**
     * Adapts the color depending on the theme.
     */
    theme?: Theme;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
