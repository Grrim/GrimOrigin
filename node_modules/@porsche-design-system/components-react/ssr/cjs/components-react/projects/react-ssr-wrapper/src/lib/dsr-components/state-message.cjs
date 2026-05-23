'use strict';

var jsxRuntime = require('react/jsx-runtime');
require('react');
require('../../provider.cjs');
var icon_wrapper = require('../components/icon.wrapper.cjs');

const messageId = 'message';
const StateMessage = ({ hasMessage, state, message, theme }) => {
    const isErrorState = state === 'error';
    return (
    // needs to be rendered always to have correct behaviour for screen readers
    jsxRuntime.jsx("span", { id: messageId, className: "message", role: state === 'success' ? 'status' : 'alert', children: hasMessage && [
            jsxRuntime.jsx(icon_wrapper.PIcon, { name: isErrorState ? 'exclamation' : 'check', color: isErrorState ? 'notification-error' : 'notification-success', theme: theme, "aria-hidden": "true" }),
            message || jsxRuntime.jsx("slot", { name: "message" }),
        ] }));
};

exports.StateMessage = StateMessage;
exports.messageId = messageId;
