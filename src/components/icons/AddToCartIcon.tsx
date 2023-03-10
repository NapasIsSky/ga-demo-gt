import React from "react";

interface IAddToCardIcon {
  className: string;
}

const AddToCardIcon: React.FC<IAddToCardIcon> = (props) => {
  return (
    <svg
      className={props.className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="add_shopping_cart_24px">
        <path
          id="icon/action/add_shopping_cart_24px"
          d="M13.92 9.5H11.92V6.5H8.92004V4.5H11.92V1.5H13.92V4.5H16.92V6.5H13.92V9.5ZM5.93005 20.5C5.93005 19.4 6.82007 18.5 7.92004 18.5C9.02002 18.5 9.92004 19.4 9.92004 20.5C9.92004 21.6 9.02002 22.5 7.92004 22.5C6.82007 22.5 5.93005 21.6 5.93005 20.5ZM17.92 18.5C16.8201 18.5 15.9301 19.4 15.9301 20.5C15.9301 21.6 16.8201 22.5 17.92 22.5C19.02 22.5 19.92 21.6 19.92 20.5C19.92 19.4 19.02 18.5 17.92 18.5ZM16.4701 13.5H9.02002L7.92004 15.5H19.92V17.5H7.92004C6.40002 17.5 5.44006 15.87 6.17004 14.53L7.52002 12.09L3.92004 4.5H1.92004V2.5H5.19006L9.45007 11.5H16.4701L20.3401 4.5L22.0801 5.45999L18.2201 12.47C17.88 13.09 17.2201 13.5 16.4701 13.5Z"
        />
      </g>
    </svg>
  );
};

export default AddToCardIcon;
