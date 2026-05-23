import type { BaseProps } from '../../BaseProps';
import type { AiTagLocale, Theme, AiTagVariant } from '../types';
export type PAiTagProps = BaseProps & {
    /**
     * Locale for the AI text (ISO format, e.g. "de_DE").
     */
    locale?: AiTagLocale;
    /**
     * Adapts the tag color depending on the theme.
     */
    theme?: Theme;
    /**
     * Variant to display: 'abbreviation' (e.g. "AI"), 'generated' (e.g. "AI-generated"), or 'modified' (e.g. "AI-modified").
     */
    variant?: AiTagVariant;
};
export declare const PAiTag: import("react").ForwardRefExoticComponent<Omit<import("react").DOMAttributes<{}>, "onChange" | "onInput" | "onToggle"> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Locale for the AI text (ISO format, e.g. "de_DE").
     */
    locale?: AiTagLocale;
    /**
     * Adapts the tag color depending on the theme.
     */
    theme?: Theme;
    /**
     * Variant to display: 'abbreviation' (e.g. "AI"), 'generated' (e.g. "AI-generated"), or 'modified' (e.g. "AI-modified").
     */
    variant?: AiTagVariant;
} & import("react").RefAttributes<HTMLElement>>;
