import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { labelId, descriptionId } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';

const LegacyLabel = ({ hasLabel, hasDescription, 
// host,
label, description, isLoading, isDisabled,
// formElement,
 }) => {
    return (jsxs(Fragment, { children: [jsx("div", { className: "label-wrapper", children: jsx("label", { className: "label", id: labelId, "aria-disabled": isLoading || isDisabled ? 'true' : null, children: hasLabel && (jsx(Fragment, { children: label || jsx("slot", { name: "label" }) })) }) }), hasDescription && (jsx("span", { className: "label", id: descriptionId, "aria-disabled": isLoading || isDisabled ? 'true' : null, children: description || jsx("slot", { name: "description" }) }))] }));
};

export { LegacyLabel };
