import { jsxs, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import 'react';
import '../../provider.mjs';
import { descriptionId } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { loadingId, LoadingMessage } from './loading-message.mjs';
import { Label } from './label.mjs';
import { messageId, StateMessage } from './state-message.mjs';
import { PSpinner } from '../components/spinner.wrapper.mjs';

const InputBase = ({ children, 
// host,
id, label, description, loading, initialLoading, required, disabled, state, message, theme, readOnly, type, form, placeholder, maxLength, minLength, max, min, value, step, spellCheck, autoComplete, pattern, multiple, name, 
// onInput,
// onWheel,
// onChange,
// onBlur,
// onKeyDown,
// refElement,
start, end, }) => {
    const { namedSlotChildren } = splitChildren(children);
    return (jsxs("div", { className: "root", children: [jsx(Label, { hasLabel: !!label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: !!description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, label: label, description: description, htmlFor: id, isRequired: required, isLoading: loading, isDisabled: disabled }), jsxs("div", { className: "wrapper", children: [jsx("slot", { name: "start" }), start, jsx("input", { "aria-describedby": loading ? loadingId : `${descriptionId} ${messageId}`, "aria-invalid": state === 'error' ? 'true' : null, "aria-disabled": disabled || loading ? 'true' : null, "aria-readonly": readOnly ? 'true' : null, id: id, name: name, form: form, type: type, required: required, placeholder: placeholder || null, maxLength: maxLength, minLength: minLength, spellCheck: spellCheck, max: max, min: min, step: step, defaultValue: value, readOnly: readOnly, autoComplete: autoComplete, disabled: disabled, pattern: pattern, multiple: multiple, dir: "auto" // This is the default: let the browser decide in which direction the value should be placed.
                     }), end, jsx("slot", { name: "end" }), loading && jsx(PSpinner, { className: "spinner", size: "inherit", theme: theme, "aria-hidden": "true" })] }), jsx(StateMessage, { hasMessage: (message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(state), state: state, message: message, theme: theme, host: null }), jsx(LoadingMessage, { loading: loading, initialLoading: initialLoading })] }));
};

export { InputBase };
