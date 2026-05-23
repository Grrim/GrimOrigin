'use strict';

var jsxRuntime = require('react/jsx-runtime');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');

const LegacyLabel = ({ hasLabel, hasDescription, 
// host,
label, description, isLoading, isDisabled,
// formElement,
 }) => {
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("div", { className: "label-wrapper", children: jsxRuntime.jsx("label", { className: "label", id: utilsEntry.labelId, "aria-disabled": isLoading || isDisabled ? 'true' : null, children: hasLabel && (jsxRuntime.jsx(jsxRuntime.Fragment, { children: label || jsxRuntime.jsx("slot", { name: "label" }) })) }) }), hasDescription && (jsxRuntime.jsx("span", { className: "label", id: utilsEntry.descriptionId, "aria-disabled": isLoading || isDisabled ? 'true' : null, children: description || jsxRuntime.jsx("slot", { name: "description" }) }))] }));
};

exports.LegacyLabel = LegacyLabel;
