import type { BaseProps } from '../../BaseProps';
import type { SelectedAriaAttributes, DrilldownLinkAriaAttribute, DrilldownLinkTarget } from '../types';
export type PDrilldownLinkProps = BaseProps & {
    /**
     * Display link in active state.
     */
    active?: boolean;
    /**
     * Add ARIA attributes (only has effect when `href` is defined and no slotted anchor is used).
     */
    aria?: SelectedAriaAttributes<DrilldownLinkAriaAttribute>;
    /**
     * Special download attribute to open native browser download dialog if target url points to a downloadable file (only has effect when `href` is defined and no slotted anchor is used).
     */
    download?: string;
    /**
     * When providing an url then the component will be rendered as `<a>` otherwise the component expects a slotted anchor.
     */
    href?: string;
    /**
     * Specifies the relationship of the target object to the link object (only has effect when `href` is defined and no slotted anchor is used).
     */
    rel?: string;
    /**
     * Target attribute where the link should be opened (only has effect when `href` is defined and no slotted anchor is used).
     */
    target?: DrilldownLinkTarget;
};
export declare const PDrilldownLink: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Display link in active state.
     */
    active?: boolean;
    /**
     * Add ARIA attributes (only has effect when `href` is defined and no slotted anchor is used).
     */
    aria?: SelectedAriaAttributes<DrilldownLinkAriaAttribute>;
    /**
     * Special download attribute to open native browser download dialog if target url points to a downloadable file (only has effect when `href` is defined and no slotted anchor is used).
     */
    download?: string;
    /**
     * When providing an url then the component will be rendered as `<a>` otherwise the component expects a slotted anchor.
     */
    href?: string;
    /**
     * Specifies the relationship of the target object to the link object (only has effect when `href` is defined and no slotted anchor is used).
     */
    rel?: string;
    /**
     * Target attribute where the link should be opened (only has effect when `href` is defined and no slotted anchor is used).
     */
    target?: DrilldownLinkTarget;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
