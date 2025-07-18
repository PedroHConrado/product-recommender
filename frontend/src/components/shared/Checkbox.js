import React from 'react';

function Checkbox({ children, ...props }) {
  return (
    <label className="flex items-center cursor-pointer">
      <input type="checkbox" {...props} />
      <span className="text-white ml-3 leading-relaxed flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{children}</span>
    </label>
  );
}

export default Checkbox;
