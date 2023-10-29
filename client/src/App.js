import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "./store/Slice/DataSlice";

function App() {
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData()); // Загрузить данные сразу

    const interval = setInterval(() => {
      dispatch(fetchData()); // Загрузить данные каждую секунду
    }, 1000);

    return () => {
      clearInterval(interval); // При размонтировании компонента очистить интервал
    };
  }, []);

  return (
    <div className="">
      <ul>
        {data &&
          data.map((item) => (
            <li key={item.ticker}>
              <span>{item.ticker}</span> - -
              <span
                className={`${
                  item.changes === "up"
                    ? "text-green-700"
                    : item.changes === "down"
                    ? "text-red-700"
                    : ""
                }`}
              >
                {item.price} $
              </span>
              -{" "}
              <span
                className={`${
                  item.changes === "up"
                    ? "text-green-700"
                    : item.changes === "down"
                    ? "text-red-700"
                    : ""
                }`}
              >
                {item.change} $
              </span>{" "}
              - <span>{item.last_trade_time}</span>- <span>{item.changes}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
