import type { BaseProps } from '../../BaseProps';
import type { BreakpointCustomizable, RadioGroupDirection, RadioGroupChangeEventDetail, RadioGroupState, Theme } from '../types';
export type PRadioGroupProps = BaseProps & {
    /**
     * A boolean value that, if present, renders the radio group as a compact version.
     */
    compact?: boolean;
    /**
     * Supplementary text providing more context or explanation for the radio group.
     */
    description?: string;
    /**
     * Defines the direction of the main and cross axis. The default is 'column' showing options vertically stacked. You always need to provide a base value when using breakpoints.
     */
    direction?: BreakpointCustomizable<RadioGroupDirection>;
    /**
     * A boolean value that, if present, makes the radio group unusable and unclickable. The value will not be submitted with the form.
     */
    disabled?: boolean;
    /**
     * Specifies the id of the <form> element that the radio group belongs to (useful if the radio group is not a direct descendant of the form).
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
     * Dynamic feedback text for validation or status.
     */
    message?: string;
    /**
     * The name of the group of radio buttons, used when submitting the form data.
     */
    name: string;
    /**
     * Emitted when the radio-group has lost focus.
     */
    onBlur?: (event: CustomEvent<void>) => void;
    /**
     * Emitted when the selected option is changed.
     */
    onChange?: (event: CustomEvent<RadioGroupChangeEventDetail>) => void;
    /**
     * A boolean value that specifies a selection must be made from the group before the form can be submitted.
     */
    required?: boolean;
    /**
     * Indicates the validation or overall status of the radio group component.
     */
    state?: RadioGroupState;
    /**
     * Controls the visual appearance of the component.
     */
    theme?: Theme;
    /**
     * The default value for the radio-group.
     */
    value?: string;
};
export declare const PRadioGroup: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * A boolean value that, if present, renders the radio group as a compact version.
     */
    compact?: boolean;
    /**
     * Supplementary text providing more context or explanation for the radio group.
     */
    description?: string;
    /**
     * Defines the direction of the main and cross axis. The default is 'column' showing options vertically stacked. You always need to provide a base value when using breakpoints.
     */
    direction?: BreakpointCustomizable<RadioGroupDirection>;
    /**
     * A boolean value that, if present, makes the radio group unusable and unclickable. The value will not be submitted with the form.
     */
    disabled?: boolean;
    /**
     * Specifies the id of the <form> element that the radio group belongs to (useful if the radio group is not a direct descendant of the form).
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
     * Dynamic feedback text for validation or status.
     */
    message?: string;
    /**
     * The name of the group of radio buttons, used when submitting the form data.
     */
    name: string;
    /**
     * Emitted when the radio-group has lost focus.
     */
    onBlur?: (event: CustomEvent<void>) => void;
    /**
     * Emitted when the selected option is changed.
     */
    onChange?: (event: CustomEvent<RadioGroupChangeEventDetail>) => void;
    /**
     * A boolean value that specifies a selection must be made from the group before the form can be submitted.
     */
    required?: boolean;
    /**
     * Indicates the validation or overall status of the radio group component.
     */
    state?: RadioGroupState;
    /**
     * Controls the visual appearance of the component.
     */
    theme?: Theme;
    /**
     * The default value for the radio-group.
     */
    value?: string;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
