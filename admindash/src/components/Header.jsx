import React from 'react';

const Header = ({ category, title,currentColor, onClick , btnText}) => (
  <div className=" mb-10 flex justify-between">
    <div>
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
    </div>
    <div >
    <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="lg:text-xl opacity-0.9 text-xs text-white hover:drop-shadow-xl rounded-md  p-4"
              onClick={onClick}
            >
            {btnText}
            </button>
    </div>
  </div>
);

export default Header;
