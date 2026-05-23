import type { FC } from 'react';
type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type LegacyLabelProps = {
    hasLabel: boolean;
    hasDescription: boolean;
    formElement?: FormElement;
    host: HTMLElement;
    label: string;
    description?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
};
export declare const LegacyLabel: FC<LegacyLabelProps>;
export {};
