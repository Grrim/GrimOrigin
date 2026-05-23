import type { BaseProps } from '../../BaseProps';
import type { TagColor, TagIcon, Theme, TagVariant } from '../types';
export type PTagProps = BaseProps & {
    /**
     * @deprecated since v3.33.0, will be removed with next major release. Use `variant` prop instead. Background color variations depending on theme property.
     */
    color?: TagColor;
    /**
     * Displays as compact version.
     */
    compact?: boolean;
    /**
     * The icon shown.
     */
    icon?: TagIcon;
    /**
     * A URL path to a custom icon.
     */
    iconSource?: string;
    /**
     * Adapts the tag color depending on the theme.
     */
    theme?: Theme;
    /**
     * Background color variations.
     */
    variant?: TagVariant;
};
export declare const PTag: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * @deprecated since v3.33.0, will be removed with next major release. Use `variant` prop instead. Background color variations depending on theme property.
     */
    color?: TagColor;
    /**
     * Displays as compact version.
     */
    compact?: boolean;
    /**
     * The icon shown.
     */
    icon?: TagIcon;
    /**
     * A URL path to a custom icon.
     */
    iconSource?: string;
    /**
     * Adapts the tag color depending on the theme.
     */
    theme?: Theme;
    /**
     * Background color variations.
     */
    variant?: TagVariant;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
