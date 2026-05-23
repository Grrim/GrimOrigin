import type { BaseProps } from '../../BaseProps';
import type { SelectedAriaAttributes, CrestAriaAttribute, CrestTarget } from '../types';
export type PCrestProps = BaseProps & {
    /**
     * Add ARIA attributes.
     */
    aria?: SelectedAriaAttributes<CrestAriaAttribute>;
    /**
     * When providing an url then the component will be rendered as `<a>`.
     */
    href?: string;
    /**
     * Target attribute where the link should be opened.
     */
    target?: CrestTarget;
};
export declare const PCrest: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Add ARIA attributes.
     */
    aria?: SelectedAriaAttributes<CrestAriaAttribute>;
    /**
     * When providing an url then the component will be rendered as `<a>`.
     */
    href?: string;
    /**
     * Target attribute where the link should be opened.
     */
    target?: CrestTarget;
} & import("react").RefAttributes<HTMLElement>>;
