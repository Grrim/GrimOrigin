import type { BaseProps } from '../../BaseProps';
import type { TextFieldWrapperActionIcon, BreakpointCustomizable, TextFieldWrapperState, Theme, TextFieldWrapperUnitPosition } from '../types';
export type PTextFieldWrapperProps = BaseProps & {
    /**
     * Action icon can be set to `locate` for `input type="search"` in order to display an action button.
     */
    actionIcon?: TextFieldWrapperActionIcon;
    /**
     * Disables the action button and shows a loading indicator. No events will be triggered while loading state is active.
     */
    actionLoading?: boolean;
    /**
     * The description text.
     */
    description?: string;
    /**
     * Show or hide label and description text. For better accessibility it is recommended to show the label.
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
     * Emitted when the action button is clicked.
     */
    onAction?: (event: CustomEvent<void>) => void;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `showCounter` instead. Show or hide max character count.
     */
    showCharacterCount?: boolean;
    /**
     * Show or hide max character count.
     */
    showCounter?: boolean;
    /**
     * @experimental Show or hide password toggle for `input type="password"`.
     */
    showPasswordToggle?: boolean;
    /**
     * The validation state.
     */
    state?: TextFieldWrapperState;
    /**
     * Show search button if wrapped inside a form.
     */
    submitButton?: boolean;
    /**
     * Adapts the color depending on the theme.
     */
    theme?: Theme;
    /**
     * The unit text.
     */
    unit?: string;
    /**
     * The unit position.
     */
    unitPosition?: TextFieldWrapperUnitPosition;
};
/** @deprecated since v3.29.0, will be removed with next major release. Please use one of the specific input components instead: `p-input-date`, `p-input-email`, `p-input-number`, `p-input-password`, `p-input-search`, `p-input-tel`, `p-input-text`, `p-input-time` or `p-input-url`. */
export declare const PTextFieldWrapper: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Action icon can be set to `locate` for `input type="search"` in order to display an action button.
     */
    actionIcon?: TextFieldWrapperActionIcon;
    /**
     * Disables the action button and shows a loading indicator. No events will be triggered while loading state is active.
     */
    actionLoading?: boolean;
    /**
     * The description text.
     */
    description?: string;
    /**
     * Show or hide label and description text. For better accessibility it is recommended to show the label.
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
     * Emitted when the action button is clicked.
     */
    onAction?: (event: CustomEvent<void>) => void;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `showCounter` instead. Show or hide max character count.
     */
    showCharacterCount?: boolean;
    /**
     * Show or hide max character count.
     */
    showCounter?: boolean;
    /**
     * @experimental Show or hide password toggle for `input type="password"`.
     */
    showPasswordToggle?: boolean;
    /**
     * The validation state.
     */
    state?: TextFieldWrapperState;
    /**
     * Show search button if wrapped inside a form.
     */
    submitButton?: boolean;
    /**
     * Adapts the color depending on the theme.
     */
    theme?: Theme;
    /**
     * The unit text.
     */
    unit?: string;
    /**
     * The unit position.
     */
    unitPosition?: TextFieldWrapperUnitPosition;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
