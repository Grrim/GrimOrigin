import type { BaseProps } from '../../BaseProps';
import type { SegmentedControlBackgroundColor, BreakpointCustomizable, SegmentedControlColumns, SegmentedControlChangeEventDetail, SegmentedControlUpdateEventDetail, SegmentedControlState, Theme } from '../types';
export type PSegmentedControlProps = BaseProps & {
    /**
     * @deprecated since v3.0.0, will be removed with next major release. Background color variations
     */
    backgroundColor?: SegmentedControlBackgroundColor;
    /**
     * Sets the amount of columns.
     */
    columns?: BreakpointCustomizable<SegmentedControlColumns>;
    /**
     * A boolean value that, if present, renders the segmented-control as a compact version.
     */
    compact?: boolean;
    /**
     * Supplementary text providing more context or explanation for the segmented-control.
     */
    description?: string;
    /**
     * Disables the segmented-control.
     */
    disabled?: boolean;
    /**
     * The id of a form element the segmented-control should be associated with.
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
     * Dynamic feedback text for validation or status.
     */
    message?: string;
    /**
     * The name of the segmented-control.
     */
    name?: string;
    /**
     * If true, prevents items from wrapping to new rows and renders them in a single scrollable row instead.
     */
    noWrap?: boolean;
    /**
     * Emitted when the segmented-control has lost focus.
     */
    onBlur?: (event: CustomEvent<void>) => void;
    /**
     * Emitted when the selection is changed.
     */
    onChange?: (event: CustomEvent<SegmentedControlChangeEventDetail>) => void;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead. Emitted when selected element changes.
     */
    onSegmentedControlChange?: (event: CustomEvent<SegmentedControlUpdateEventDetail>) => void;
    /**
     * @deprecated since v3.30.0, will be removed with next major release, use `change` event instead. Emitted when selected element changes.
     */
    onUpdate?: (event: CustomEvent<SegmentedControlUpdateEventDetail>) => void;
    /**
     * A boolean value that specifies a selection must be made from the group before the form can be submitted.
     */
    required?: boolean;
    /**
     * Indicates the validation or overall status of the component.
     */
    state?: SegmentedControlState;
    /**
     * Adapts the segmented-control color depending on the theme.
     */
    theme?: Theme;
    /**
     * Sets the initial value of the segmented-control.
     */
    value?: string | number;
};
export declare const PSegmentedControl: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * @deprecated since v3.0.0, will be removed with next major release. Background color variations
     */
    backgroundColor?: SegmentedControlBackgroundColor;
    /**
     * Sets the amount of columns.
     */
    columns?: BreakpointCustomizable<SegmentedControlColumns>;
    /**
     * A boolean value that, if present, renders the segmented-control as a compact version.
     */
    compact?: boolean;
    /**
     * Supplementary text providing more context or explanation for the segmented-control.
     */
    description?: string;
    /**
     * Disables the segmented-control.
     */
    disabled?: boolean;
    /**
     * The id of a form element the segmented-control should be associated with.
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
     * Dynamic feedback text for validation or status.
     */
    message?: string;
    /**
     * The name of the segmented-control.
     */
    name?: string;
    /**
     * If true, prevents items from wrapping to new rows and renders them in a single scrollable row instead.
     */
    noWrap?: boolean;
    /**
     * Emitted when the segmented-control has lost focus.
     */
    onBlur?: (event: CustomEvent<void>) => void;
    /**
     * Emitted when the selection is changed.
     */
    onChange?: (event: CustomEvent<SegmentedControlChangeEventDetail>) => void;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead. Emitted when selected element changes.
     */
    onSegmentedControlChange?: (event: CustomEvent<SegmentedControlUpdateEventDetail>) => void;
    /**
     * @deprecated since v3.30.0, will be removed with next major release, use `change` event instead. Emitted when selected element changes.
     */
    onUpdate?: (event: CustomEvent<SegmentedControlUpdateEventDetail>) => void;
    /**
     * A boolean value that specifies a selection must be made from the group before the form can be submitted.
     */
    required?: boolean;
    /**
     * Indicates the validation or overall status of the component.
     */
    state?: SegmentedControlState;
    /**
     * Adapts the segmented-control color depending on the theme.
     */
    theme?: Theme;
    /**
     * Sets the initial value of the segmented-control.
     */
    value?: string | number;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
