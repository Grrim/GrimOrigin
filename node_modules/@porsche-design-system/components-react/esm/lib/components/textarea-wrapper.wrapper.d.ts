import type { BaseProps } from '../../BaseProps';
import type { BreakpointCustomizable, TextareaWrapperState, Theme } from '../types';
export type PTextareaWrapperProps = BaseProps & {
    /**
     * The description text.
     */
    description?: string;
    /**
     * Show or hide label. For better accessibility it is recommended to show the label.
     */
    hideLabel?: BreakpointCustomizable<boolean>;
    /**
     * The label text.
     */
    label?: string;
    /**
     * The message styled depending on validation state.
     */
    message?: string;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `showCounter` instead. Show or hide max character count.
     */
    showCharacterCount?: boolean;
    /**
     * Show or hide max character count.
     */
    showCounter?: boolean;
    /**
     * The validation state.
     */
    state?: TextareaWrapperState;
    /**
     * Adapts the color depending on the theme.
     */
    theme?: Theme;
};
/** @deprecated since v3.29.0, will be removed with next major release. Please use `p-textarea` instead. */
export declare const PTextareaWrapper: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * The description text.
     */
    description?: string;
    /**
     * Show or hide label. For better accessibility it is recommended to show the label.
     */
    hideLabel?: BreakpointCustomizable<boolean>;
    /**
     * The label text.
     */
    label?: string;
    /**
     * The message styled depending on validation state.
     */
    message?: string;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `showCounter` instead. Show or hide max character count.
     */
    showCharacterCount?: boolean;
    /**
     * Show or hide max character count.
     */
    showCounter?: boolean;
    /**
     * The validation state.
     */
    state?: TextareaWrapperState;
    /**
     * Adapts the color depending on the theme.
     */
    theme?: Theme;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
