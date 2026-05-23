import type { BaseProps } from '../../BaseProps';
export type PRadioGroupOptionProps = BaseProps & {
    /**
     * A boolean value that, if present, makes the radio group option unusable and unclickable.
     */
    disabled?: boolean;
    /**
     * Text content for a user-facing label.
     */
    label?: string;
    /**
     * @experimental Shows a loading indicator.
     */
    loading?: boolean;
    /**
     * The value for the input.
     */
    value?: string;
};
export declare const PRadioGroupOption: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * A boolean value that, if present, makes the radio group option unusable and unclickable.
     */
    disabled?: boolean;
    /**
     * Text content for a user-facing label.
     */
    label?: string;
    /**
     * @experimental Shows a loading indicator.
     */
    loading?: boolean;
    /**
     * The value for the input.
     */
    value?: string;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
