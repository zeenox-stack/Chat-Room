import React, { useState } from "react";
import { CredsType } from "../../App";

const Prompt: React.FC<{
  setClose: (value: boolean) => void;
  setName: (value: string) => void;
}> = React.memo(({ setClose, setName }) => {
  const [input, setInput] = useState<CredsType>({ name: "" });

  return (
    <div className="flex flex-col justify-center items-center w-1/2 h-1/2 bg-hite rounded-sm shadow-sm bg-white border border-gray-200">
      <label htmlFor="name" className="text-lg font-sans">Name: </label>
      <input
        type="text"
        name="name"
        onChange={(e) => setInput((n) => ({ ...n, name: e.target.value }))}
        className="px-3 py-2 bg-gray-300 text-gray-400 border-gray-300 rounded-3xl focus:outline-none "
      />
      <button
        onClick={() => {
          setName(input.name);
          setClose(true);
        }} 
        disabled={
          input.name.trim() === "" ||
          input.name.length < 3 
        } 
        className="bg-gray-200 hover:bg-gray-100 disabled:bg-gray-300 mt-2 px-4 py-2 rounded-2xl text-lg font-[Poppins] hover:border border-gray-500"
      >
        Submit
      </button>
    </div>
  );
});

export default Prompt;
