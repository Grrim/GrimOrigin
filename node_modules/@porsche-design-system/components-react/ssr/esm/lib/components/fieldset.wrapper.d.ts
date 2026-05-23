import type { BaseProps } from '../../BaseProps';
import type { SelectedAriaRole, FieldsetLabelSize, FieldsetState, Theme } from '../types';
export type PFieldsetProps = BaseProps & {
    /**
     * Add ARIA attributes.
     */
    aria?: SelectedAriaRole<"radiogroup">;
    /**
     * The label text.
     */
    label?: string;
    /**
     * The size of the label text.
     */
    labelSize?: FieldsetLabelSize;
    /**
     * The message styled depending on validation state.
     */
    message?: string;
    /**
     * Marks the Fieldset as required.
     */
    required?: boolean;
    /**
     * The validation state.
     */
    state?: FieldsetState;
    /**
     * Adapts color depending on theme.
     */
    theme?: Theme;
};
export declare const PFieldset: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Add ARIA attributes.
     */
    aria?: SelectedAriaRole<"radiogroup">;
    /**
     * The label text.
     */
    label?: string;
    /**
     * The size of the label text.
     */
    labelSize?: FieldsetLabelSize;
    /**
     * The message styled depending on validation state.
     */
    message?: string;
    /**
     * Marks the Fieldset as required.
     */
    required?: boolean;
    /**
     * The validation state.
     */
    state?: FieldsetState;
    /**
     * Adapts color depending on theme.
     */
    theme?: Theme;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
