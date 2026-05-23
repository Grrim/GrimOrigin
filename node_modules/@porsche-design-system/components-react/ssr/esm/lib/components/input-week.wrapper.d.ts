import type { BaseProps } from '../../BaseProps';
import type { BreakpointCustomizable, InputWeekBlurEventDetail, InputWeekChangeEventDetail, InputWeekInputEventDetail, InputWeekState, Theme } from '../types';
export type PInputWeekProps = BaseProps & {
    /**
     * Provides a hint to the browser about what type of data the field expects, which can assist with autofill features.
     */
    autoComplete?: string;
    /**
     * A boolean value that, if present, renders the input field as a compact version.
     */
    compact?: boolean;
    /**
     * Supplementary text providing more context or explanation for the input.
     */
    description?: string;
    /**
     * A boolean value that, if present, makes the input field unusable and unclickable. The value will not be submitted with the form.
     */
    disabled?: boolean;
    /**
     * Specifies the id of the <form> element that the input belongs to (useful if the input is not a direct descendant of the form).
     */
    form?: string;
    /**
     * Controls the visibility of the label.
     */
    hideLabel?: BreakpointCustomizable<boolean>;
    /**
     * Text content for a user-facing label.
     */
    label?: string;
    /**
     * @experimental Shows a loading indicator.
     */
    loading?: boolean;
    /**
     * Specifies the latest week that can be selected. The value must be a week string in YYYY-Www format (e.g., max='2024-W52').
     */
    max?: string;
    /**
     * Dynamic feedback text for validation or status.
     */
    message?: string;
    /**
     * Specifies the earliest week that can be selected. The value must be a week string in YYYY-Www format (e.g., min='2024-W01').
     */
    min?: string;
    /**
     * The name of the input field, used when submitting the form data.
     */
    name: string;
    /**
     * Emitted when the number input has lost focus.
     */
    onBlur?: (event: CustomEvent<InputWeekBlurEventDetail>) => void;
    /**
     * Emitted when the number input loses focus after its value was changed.
     */
    onChange?: (event: CustomEvent<InputWeekChangeEventDetail>) => void;
    /**
     * Emitted when the value has been changed as a direct result of a user action.
     */
    onInput?: (event: CustomEvent<InputWeekInputEventDetail>) => void;
    /**
     * A boolean value that, if present, makes the input field uneditable by the user, but its value will still be submitted with the form.
     */
    readOnly?: boolean;
    /**
     * A boolean value that, if present, indicates that the input field must be filled out before the form can be submitted.
     */
    required?: boolean;
    /**
     * Indicates the validation or overall status of the input component.
     */
    state?: InputWeekState;
    /**
     * Defines the stepping interval in weeks. For example, step="1" increments by 1 week. The default is 1 month.
     */
    step?: number;
    /**
     * Controls the visual appearance of the component.
     */
    theme?: Theme;
    /**
     * The default week value for the input, in YYYY-Www format (e.g., value='2025-W27')
     */
    value?: string;
};
export declare const PInputWeek: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Provides a hint to the browser about what type of data the field expects, which can assist with autofill features.
     */
    autoComplete?: string;
    /**
     * A boolean value that, if present, renders the input field as a compact version.
     */
    compact?: boolean;
    /**
     * Supplementary text providing more context or explanation for the input.
     */
    description?: string;
    /**
     * A boolean value that, if present, makes the input field unusable and unclickable. The value will not be submitted with the form.
     */
    disabled?: boolean;
    /**
     * Specifies the id of the <form> element that the input belongs to (useful if the input is not a direct descendant of the form).
     */
    form?: string;
    /**
     * Controls the visibility of the label.
     */
    hideLabel?: BreakpointCustomizable<boolean>;
    /**
     * Text content for a user-facing label.
     */
    label?: string;
    /**
     * @experimental Shows a loading indicator.
     */
    loading?: boolean;
    /**
     * Specifies the latest week that can be selected. The value must be a week string in YYYY-Www format (e.g., max='2024-W52').
     */
    max?: string;
    /**
     * Dynamic feedback text for validation or status.
     */
    message?: string;
    /**
     * Specifies the earliest week that can be selected. The value must be a week string in YYYY-Www format (e.g., min='2024-W01').
     */
    min?: string;
    /**
     * The name of the input field, used when submitting the form data.
     */
    name: string;
    /**
     * Emitted when the number input has lost focus.
     */
    onBlur?: (event: CustomEvent<InputWeekBlurEventDetail>) => void;
    /**
     * Emitted when the number input loses focus after its value was changed.
     */
    onChange?: (event: CustomEvent<InputWeekChangeEventDetail>) => void;
    /**
     * Emitted when the value has been changed as a direct result of a user action.
     */
    onInput?: (event: CustomEvent<InputWeekInputEventDetail>) => void;
    /**
     * A boolean value that, if present, makes the input field uneditable by the user, but its value will still be submitted with the form.
     */
    readOnly?: boolean;
    /**
     * A boolean value that, if present, indicates that the input field must be filled out before the form can be submitted.
     */
    required?: boolean;
    /**
     * Indicates the validation or overall status of the input component.
     */
    state?: InputWeekState;
    /**
     * Defines the stepping interval in weeks. For example, step="1" increments by 1 week. The default is 1 month.
     */
    step?: number;
    /**
     * Controls the visual appearance of the component.
     */
    theme?: Theme;
    /**
     * The default week value for the input, in YYYY-Www format (e.g., value='2025-W27')
     */
    value?: string;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
