import type { BaseProps } from '../../BaseProps';
import type { BreakpointCustomizable, InputTelBlurEventDetail, InputTelChangeEventDetail, InputTelInputEventDetail, InputTelState, Theme } from '../types';
export type PInputTelProps = BaseProps & {
    /**
     * Provides a hint to the browser about what type of data the field expects, which can assist with autofill features (e.g., autocomplete='tel').
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
     * Controls the visibility of the phone icon.
     */
    indicator?: boolean;
    /**
     * Text content for a user-facing label.
     */
    label?: string;
    /**
     * @experimental Shows a loading indicator.
     */
    loading?: boolean;
    /**
     * A non-negative integer specifying the maximum number of characters the user can enter into the input.
     */
    maxLength?: number;
    /**
     * Dynamic feedback text for validation or status.
     */
    message?: string;
    /**
     * A non-negative integer specifying the minimum number of characters required for the input's value to be considered valid.
     */
    minLength?: number;
    /**
     * The name of the input field, used when submitting the form data.
     */
    name: string;
    /**
     * Emitted when the tel input has lost focus.
     */
    onBlur?: (event: CustomEvent<InputTelBlurEventDetail>) => void;
    /**
     * Emitted when the tel input loses focus after its value was changed.
     */
    onChange?: (event: CustomEvent<InputTelChangeEventDetail>) => void;
    /**
     * Emitted when the value has been changed as a direct result of a user action.
     */
    onInput?: (event: CustomEvent<InputTelInputEventDetail>) => void;
    /**
     * Specifies a regular expression that the input's value must match for the value to pass constraint validation. This allows for more specific tel validation rules than the browser's default. If provided, it overrides the browser's default tel validation.
     */
    pattern?: string;
    /**
     * A string that provides a brief hint to the user about what kind of information is expected in the field (e.g., placeholder='(123) 456-7890')
     */
    placeholder?: string;
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
    state?: InputTelState;
    /**
     * Controls the visual appearance of the component.
     */
    theme?: Theme;
    /**
     * The tel input value.
     */
    value?: string;
};
export declare const PInputTel: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Provides a hint to the browser about what type of data the field expects, which can assist with autofill features (e.g., autocomplete='tel').
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
     * Controls the visibility of the phone icon.
     */
    indicator?: boolean;
    /**
     * Text content for a user-facing label.
     */
    label?: string;
    /**
     * @experimental Shows a loading indicator.
     */
    loading?: boolean;
    /**
     * A non-negative integer specifying the maximum number of characters the user can enter into the input.
     */
    maxLength?: number;
    /**
     * Dynamic feedback text for validation or status.
     */
    message?: string;
    /**
     * A non-negative integer specifying the minimum number of characters required for the input's value to be considered valid.
     */
    minLength?: number;
    /**
     * The name of the input field, used when submitting the form data.
     */
    name: string;
    /**
     * Emitted when the tel input has lost focus.
     */
    onBlur?: (event: CustomEvent<InputTelBlurEventDetail>) => void;
    /**
     * Emitted when the tel input loses focus after its value was changed.
     */
    onChange?: (event: CustomEvent<InputTelChangeEventDetail>) => void;
    /**
     * Emitted when the value has been changed as a direct result of a user action.
     */
    onInput?: (event: CustomEvent<InputTelInputEventDetail>) => void;
    /**
     * Specifies a regular expression that the input's value must match for the value to pass constraint validation. This allows for more specific tel validation rules than the browser's default. If provided, it overrides the browser's default tel validation.
     */
    pattern?: string;
    /**
     * A string that provides a brief hint to the user about what kind of information is expected in the field (e.g., placeholder='(123) 456-7890')
     */
    placeholder?: string;
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
    state?: InputTelState;
    /**
     * Controls the visual appearance of the component.
     */
    theme?: Theme;
    /**
     * The tel input value.
     */
    value?: string;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
