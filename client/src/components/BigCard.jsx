import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/Slice/DataSlice";

const BigCard = ({ item }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.data.blockList);

  return (
    <li
      className={`flex  border-y border-black justify-between gap-2 w-[600px] p-2 ${
        item.changes === "up"
          ? "bg-green-100"
          : item.changes === "down"
          ? "bg-red-100"
          : "bg-gray-100"
      }`}
    >
      <div>{item.ticker}</div>
      <div className=" flex-1">{item.variants[0]}</div>
      <div>{item.price}$</div>
      <div>{`${
        item.changes === "up" ? "+" : item.changes === "down" ? "-" : " "
      } ${item.change}`}</div>
      <div>{`${
        item.changes === "up" ? "+" : item.changes === "down" ? "-" : " "
      } ${item.change_percent} %`}</div>
      <button
        className=" text-lg text-blue-800 border border-black hover:bg-gray-300 "
        onClick={() => dispatch(remove(item.ticker))}
      >
        remove
      </button>
    </li>
  );
};

export default BigCard;
