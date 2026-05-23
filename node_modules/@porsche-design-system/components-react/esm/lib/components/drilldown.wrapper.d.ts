import type { BaseProps } from '../../BaseProps';
import type { SelectedAriaAttributes, DrilldownAriaAttribute, DrilldownUpdateEventDetail, Theme } from '../types';
export type PDrilldownProps = BaseProps & {
    /**
     * Defines which drilldown-item to be visualized as opened.
     */
    activeIdentifier?: string | undefined;
    /**
     * Add ARIA attributes.
     */
    aria?: SelectedAriaAttributes<DrilldownAriaAttribute>;
    /**
     * Emitted when the component requests to be dismissed.
     */
    onDismiss?: (event: CustomEvent<void>) => void;
    /**
     * Emitted when activeIdentifier is changed.
     */
    onUpdate?: (event: CustomEvent<DrilldownUpdateEventDetail>) => void;
    /**
     * If true, the drilldown is visualized as opened.
     */
    open?: boolean;
    /**
     * Adapts the drilldown color depending on the theme.
     */
    theme?: Theme;
};
export declare const PDrilldown: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Defines which drilldown-item to be visualized as opened.
     */
    activeIdentifier?: string | undefined;
    /**
     * Add ARIA attributes.
     */
    aria?: SelectedAriaAttributes<DrilldownAriaAttribute>;
    /**
     * Emitted when the component requests to be dismissed.
     */
    onDismiss?: (event: CustomEvent<void>) => void;
    /**
     * Emitted when activeIdentifier is changed.
     */
    onUpdate?: (event: CustomEvent<DrilldownUpdateEventDetail>) => void;
    /**
     * If true, the drilldown is visualized as opened.
     */
    open?: boolean;
    /**
     * Adapts the drilldown color depending on the theme.
     */
    theme?: Theme;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
