const SmallCard = ({ item }) => {
  return (
    <li
      className={`flex rounded-sm  bg-white p-2 items-center justify-between container border border-gray-400 max-w-[165px] text-sm ${
        item.changes === "up"
          ? "bg-green-100"
          : item.changes === "down"
          ? "bg-red-100"
          : "bg-gray-100"
      }`}
    >
      <div
        className={` rounded-xl w-8 h-8 flex items-center justify-center ${
          item.changes === "up"
            ? "bg-green-700"
            : item.changes === "down"
            ? "bg-red-700"
            : "bg-gray-700"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`
            ${
              item.changes === "up"
                ? "rotate-180"
                : item.changes === "down"
                ? ""
                : " opacity-0"
            }`}
        >
          <path
            d="M13.3333 7.99999L12.3933 7.05999L8.66667 10.78V2.66666H7.33334V10.78L3.61334 7.05332L2.66667 7.99999L8.00001 13.3333L13.3333 7.99999Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span>{item.ticker}</span>
        <span>{item.price}</span>
      </div>
      <div className="flex flex-col">
        <span>{`${
          item.changes === "up" ? "+" : item.changes === "down" ? "-" : " "
        } ${item.change}`}</span>
        <span>{`${
          item.changes === "up" ? "+" : item.changes === "down" ? "-" : " "
        } ${item.change_percent} %`}</span>
      </div>
      <div></div>
    </li>
  );
};

export default SmallCard;
