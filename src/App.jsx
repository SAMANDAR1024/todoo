import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [qoshish, setQoshish] = useState("");
  useEffect(() => {
    axios
      .get("https://json-placeholder.mock.beeceptor.com/users")
      .then((res) => {
        setTodo(res.data.map((item) => ({ ...item, completed: false })));
        setTodo(res.data);
        console.log(res.data);
      });
  }, []);

  if (todo.length === 0) {
    return (
      <div className="m-auto flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
        <div className="w-16 h-16 border-4  border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  const filtered = todo.filter((item) => {
    return item.name.toLowerCase().includes(input.toLowerCase());
  });

  return (
    <>
      <div className="w-[600px] mx-auto flex gap-2 my-3 ">
        <input
          value={qoshish}
          onChange={(e) => {
            setQoshish(e.currentTarget.value);
          }}
          className="w-[500px] p-3 rounded-lg bg-slate-300 "
          type="text"
          placeholder="Kiritish uchun yozin..."
        />
        <button
          onClick={() => {
            const new_arr = todo.concat({
              name: qoshish,
              id: todo.length + 1,
              completed: false,
            });
            setTodo(new_arr);
            setQoshish("");
          }}
          className="w-[80px] cursor-pointer rounded-lg bg-green-400 text-white p-3"
        >
          +ADD
        </button>
      </div>
      <div className="w-[600px] p-6 bg-slate-400 mx-auto rounded-lg my-4 ">
        <div>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.currentTarget.value);
            }}
            className="w-full p-3 rounded-xl mb-4  bg-slate-200"
            type="text"
            placeholder="Name yozing"
          />
        </div>
        {filtered.map((item) => {
          return (
            <div className=" mb-6 ">
              <div className="flex justify-between items-center">
                <p
                  className={`text-xl text-white ${
                    item.completed ? "line-through" : "text-white"
                  }`}
                >
                  {item.name}
                </p>
                <div className="flex gap-2 items-center text-white">
                  <button
                    onClick={() => {
                      setTodo(
                        todo.map((i) => {
                          i.id === item.id
                            ? { ...i, completed: !i.completed }
                            : i;
                        })
                      );
                    }}
                    className="cursor-pointer bg-green-500 p-2 rounded-xl w-"
                  >
                    belgilash
                  </button>
                  <button
                    onClick={() => {
                      setTodo(todo.filter((fil_i) => fil_i.id !== item.id));
                    }}
                    className="cursor-pointer bg-red-500 p-2 rounded-xl w-"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;

// import { useState } from "react";

// import "./App.css";

// function App() {
//   const [value, setValue] = useState("");
//   const [number, setNumber] = useState(null);
//   const mevalar = [
//     {
//       name: "olma",
//     },
//     {
//       name: "uzum",
//     },
//     {
//       name: "nok",
//     },
//     {
//       name: "Shoftoli",
//     },
//   ];

//   const new_arr = mevalar.filter(
//     (item) =>
//       item.name.toLowerCase().includes(value.toLowerCase()) &&
//       item.name.length >= number
//   );
//   console.log(new_arr);

//   return (
//     <div>
//       <div className="flex gap-2 justify-center">
//         <input
//           className="p-2 mb-2 border rounded-lg"
//           type="text"
//           value={value}
//           onChange={(e) => {
//             setValue(e.currentTarget.value);
//           }}
//           placeholder="meva kiriting..."
//         />

//         <input
//           value={number}
//           onChange={(e) => {
//             if (e.currentTarget.value === "") {
//               setNumber(null);
//             } else {
//               setNumber(Number(e.currentTarget.value));
//             }
//           }}
//           type="number"
//           className="p-2 mb-2 border rounded-lg"
//           placeholder="sonnini kiriting..."
//         />
//       </div>
//       <div>
//         {new_arr.map((item, i) => {
//           return (
//             <div key={i} className="mb-2 flex gap-2 justify-center">
//               {item.name}
//               <p>{item.name.length}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default App;
