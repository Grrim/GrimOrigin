import type { BaseProps } from '../../BaseProps';
import type { BreakpointCustomizable, InputNumberBlurEventDetail, InputNumberChangeEventDetail, InputNumberInputEventDetail, InputNumberState, Theme } from '../types';
export type PInputNumberProps = BaseProps & {
    /**
     * Provides a hint to the browser about what type of data the field expects, which can assist with autofill features (e.g., autocomplete='postal-code').
     */
    autoComplete?: string;
    /**
     * A boolean value that, if present, renders the input field as a compact version.
     */
    compact?: boolean;
    /**
     * Show or hide the increment/decrement stepper controls.
     */
    controls?: boolean;
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
     * The max value of the number input.
     */
    max?: number;
    /**
     * Dynamic feedback text for validation or status.
     */
    message?: string;
    /**
     * The min value of the number input.
     */
    min?: number;
    /**
     * The name of the input field, used when submitting the form data.
     */
    name: string;
    /**
     * Emitted when the number input has lost focus.
     */
    onBlur?: (event: CustomEvent<InputNumberBlurEventDetail>) => void;
    /**
     * Emitted when the number input loses focus after its value was changed.
     */
    onChange?: (event: CustomEvent<InputNumberChangeEventDetail>) => void;
    /**
     * Emitted when the value has been changed as a direct result of a user action.
     */
    onInput?: (event: CustomEvent<InputNumberInputEventDetail>) => void;
    /**
     * A string that provides a brief hint to the user about what kind of information is expected in the field (e.g., placeholder='Enter a number'). This text is displayed when the input field is empty.
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
    state?: InputNumberState;
    /**
     * The granularity that the value must adhere to.
     */
    step?: number;
    /**
     * Controls the visual appearance of the component.
     */
    theme?: Theme;
    /**
     * The number input value.
     */
    value?: string;
};
export declare const PInputNumber: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Provides a hint to the browser about what type of data the field expects, which can assist with autofill features (e.g., autocomplete='postal-code').
     */
    autoComplete?: string;
    /**
     * A boolean value that, if present, renders the input field as a compact version.
     */
    compact?: boolean;
    /**
     * Show or hide the increment/decrement stepper controls.
     */
    controls?: boolean;
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
     * The max value of the number input.
     */
    max?: number;
    /**
     * Dynamic feedback text for validation or status.
     */
    message?: string;
    /**
     * The min value of the number input.
     */
    min?: number;
    /**
     * The name of the input field, used when submitting the form data.
     */
    name: string;
    /**
     * Emitted when the number input has lost focus.
     */
    onBlur?: (event: CustomEvent<InputNumberBlurEventDetail>) => void;
    /**
     * Emitted when the number input loses focus after its value was changed.
     */
    onChange?: (event: CustomEvent<InputNumberChangeEventDetail>) => void;
    /**
     * Emitted when the value has been changed as a direct result of a user action.
     */
    onInput?: (event: CustomEvent<InputNumberInputEventDetail>) => void;
    /**
     * A string that provides a brief hint to the user about what kind of information is expected in the field (e.g., placeholder='Enter a number'). This text is displayed when the input field is empty.
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
    state?: InputNumberState;
    /**
     * The granularity that the value must adhere to.
     */
    step?: number;
    /**
     * Controls the visual appearance of the component.
     */
    theme?: Theme;
    /**
     * The number input value.
     */
    value?: string;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
