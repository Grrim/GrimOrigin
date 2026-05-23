import type { BaseProps } from '../../BaseProps';
import type { SelectedAriaAttributes, FlagAriaAttribute, FlagName, FlagSize } from '../types';
export type PFlagProps = BaseProps & {
    /**
     * A map of ARIA attributes to enhance the flag's accessibility. For example, use `{ 'aria-label': 'German flag' }` to provide a descriptive label for screen readers.
     */
    aria?: SelectedAriaAttributes<FlagAriaAttribute>;
    /**
     * Specifies the country flag to display. Use the two-letter ISO 3166-1 alpha-2 country code. For example, use `us` for the United States, `de` for Germany, `gb` for Great Britain.
     */
    name?: FlagName;
    /**
     * The size of the flag. Pre-defined sizes are aligned with the Porsche Next typescale. Available values are `small`, `medium`, `large`, etc.
     */
    size?: FlagSize;
};
export declare const PFlag: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * A map of ARIA attributes to enhance the flag's accessibility. For example, use `{ 'aria-label': 'German flag' }` to provide a descriptive label for screen readers.
     */
    aria?: SelectedAriaAttributes<FlagAriaAttribute>;
    /**
     * Specifies the country flag to display. Use the two-letter ISO 3166-1 alpha-2 country code. For example, use `us` for the United States, `de` for Germany, `gb` for Great Britain.
     */
    name?: FlagName;
    /**
     * The size of the flag. Pre-defined sizes are aligned with the Porsche Next typescale. Available values are `small`, `medium`, `large`, etc.
     */
    size?: FlagSize;
} & import("react").RefAttributes<HTMLElement>>;
