export default function TodoInput({ item, onChange, onClick, error }) {
  return (
    <div className="w-full flex items-center gap-2 mb-4">
      <input
        className="flex-grow border-gray-300 border p-2.5 rounded w-2/3"
        type="text"
        placeholder="Add a new Task"
        value={item}
        onChange={onChange}
      ></input>
      <button
        className="bg-blue-500 py-2.5 m-2 px-4 rounded text-white hover:bg-blue-800"
        onClick={onClick}
      >
        Add
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
