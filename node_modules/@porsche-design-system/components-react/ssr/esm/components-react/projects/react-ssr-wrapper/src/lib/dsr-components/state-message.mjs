import { jsx } from 'react/jsx-runtime';
import 'react';
import '../../provider.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

const messageId = 'message';
const StateMessage = ({ hasMessage, state, message, theme }) => {
    const isErrorState = state === 'error';
    return (
    // needs to be rendered always to have correct behaviour for screen readers
    jsx("span", { id: messageId, className: "message", role: state === 'success' ? 'status' : 'alert', children: hasMessage && [
            jsx(PIcon, { name: isErrorState ? 'exclamation' : 'check', color: isErrorState ? 'notification-error' : 'notification-success', theme: theme, "aria-hidden": "true" }),
            message || jsx("slot", { name: "message" }),
        ] }));
};

export { StateMessage, messageId };
