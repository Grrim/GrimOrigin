import { Component } from 'react';
/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the input." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @deprecated since v3.29.0, will be removed with next major release. Please use one of the specific input components instead: `p-input-date`, `p-input-email`, `p-input-number`, `p-input-password`, `p-input-search`, `p-input-tel`, `p-input-text`, `p-input-time` or `p-input-url`.
 */
export declare class DSRTextFieldWrapper extends Component<any> {
    host: HTMLElement;
    private showPassword;
    private isClearable;
    private input;
    private unitOrCounterElement;
    private ariaElement;
    private isSearch;
    private isPassword;
    private isCalendar;
    private isTime;
    private isWithinForm;
    private hasAction;
    private hasCounter;
    private isCounterVisible;
    private hasUnit;
    private eventListener;
    render(): JSX.Element;
}
