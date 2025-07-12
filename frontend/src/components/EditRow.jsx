import { useState } from "react";

export default function EditRow({ id, title, updateToDo, cancelEditing }) {
  const [titleText, setTitleText] = useState(title);
  return (
    <>
      <tr>
        <td colSpan="3">
          <input
            className="border-gray-300 border p-2.5 rounded w-2/3"
            type="text"
            value={titleText}
            onChange={() => setTitleText(event.target.value)}
          ></input>
          <button
            className="bg-gray-200 py-2.5 m-2 px-4 rounded text-black hover:bg-gray-300"
            onClick={() => updateToDo(id, titleText)}
          >
            Save
          </button>
          <button
            className="bg-gray-200 py-2.5 m-2 px-4 rounded text-black hover:bg-gray-300"
            onClick={cancelEditing}
          >
            Cancel
          </button>
        </td>
      </tr>
    </>
  );
}
