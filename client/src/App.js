import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setData } from "./store/Slice/DataSlice";
import SmallCard from "./components/SmallCard";
import BigCard from "./components/BigCard";
import { changeTime, searchItem } from "./store/Slice/DataSlice";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");
function App() {
  const data = useSelector((state) => state.data.data);
  const Timer = useSelector((state) => state.data.timer);
  const search = useSelector((state) => state.data.search);
  const blockList = useSelector((state) => state.data.blockList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = setInterval(() => {
      socket.emit("start");
      socket.on("ticker", (data) => {
        const updatedData = data.map((item) => {
          if (item.ticker === "AAPL") {
            return {
              ...item,
              changes: "",
              variants: [
                "Apple",
                "aapl",
                "apl",
                "aple",
                "appple",
                "aplpe",
                "aaple",
                "appel",
                "aple",
                "apel",
                "applle",
                "apllee",
                "appl",
                "applle",
              ],
            };
          }
          if (item.ticker === "GOOGL") {
            return {
              ...item,
              changes: "",
              variants: [
                "Google",
                "googl",
                "gogle",
                "googgle",
                "googl",
                "googe",
                "goolge",
                "goglee",
              ],
            };
          }
          if (item.ticker === "MSFT") {
            return {
              ...item,
              changes: "",
              variants: [
                "Microsoft",
                "msft",
                "microsoft",
                "micrsoft",
                "micosoft",
                "microsof",
                "microsoftt",
                "mircosoft",
              ],
            };
          }
          if (item.ticker === "AMZN") {
            return {
              ...item,
              changes: "",
              variants: [
                "Amazon",
                "amzn",
                "amzon",
                "amazn",
                "amazonn",
                "amaon",
                "amazo",
                "amazzon",
              ],
            };
          }
          if (item.ticker === "FB") {
            return {
              ...item,
              changes: "",
              variants: [
                "Facebook",
                "fb",
                "facbook",
                "fecebook",
                "facebok",
                "faceboook",
                "fcaebook",
                "faceboo",
              ],
            };
          }
          if (item.ticker === "TSLA") {
            return {
              ...item,
              changes: "",
              variants: [
                "Tesla",
                "tsla",
                "tesela",
                "telsa",
                "tesl",
                "tesls",
                "tezla",
                "telsaa",
              ],
            };
          } else {
            return item;
          }
        });
        dispatch(setData(updatedData));
      });
      return () => {
        clearInterval(fetchData);
        socket.disconnect();
      };
    }, 5000);
  }, []);

  return (
    <div className="container bg-white flex flex-col mx-auto">
      <header className=" bg-gray-200 container">
        <ul className=" flex gap-2 p-2 mx-auto justify-center">
          {data &&
            data.map((item) => <SmallCard item={item} key={item.ticker} />)}
        </ul>
      </header>
      <body className="container p-2 flex flex-col items-center">
        <div className="flex gap-3 justify-center p-2">
          <input
            placeholder="search"
            type="text"
            value={search}
            onChange={(event) =>
              dispatch(searchItem(event.target.value.toLocaleLowerCase()))
            }
            className=" outline outline-black h-10 rounded-lg"
          />
          <input
            type="text"
            value={Timer}
            onChange={(event) => {
              const numericValue = event.target.value.replace(/\D/g, "");
              dispatch(changeTime(numericValue));
            }}
            className=" outline outline-black h-10 rounded-lg "
          />
        </div>
        <div>
          <ul className="flex flex-col container">
            {data &&
              data
                .filter((item) =>
                  search.length > 0
                    ? item.variants.some((variant) => variant.includes(search))
                    : true
                )
                .filter((item) => {
                  if (blockList.length > 0) {
                    return !blockList.includes(item.ticker);
                  }
                  return true;
                })
                .map((item) => <BigCard item={item} key={item.ticker} />)}
          </ul>
        </div>
      </body>
    </div>
  );
}

export default App;
