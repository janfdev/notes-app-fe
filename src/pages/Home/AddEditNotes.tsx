import TagInput from "../../components/Input/TagInput";

const AddEditNotes = () => {
  return (
    <section className="">
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-lg text-slate-950 outline-none border rounded-md px-4 py-2"
          placeholder="Go to Gym at 5 PM"
        />
      </div>

      <div className="flex flex-col mt-2 gap-2">
        <label className="input-label">CONTENT</label>
        <textarea
          className="text-sm text-slate-950 outline-none border bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput />
      </div>

      <button
        className="bg-blue-500 w-full text-white p-3 font-medium mt-5 "
        onClick={() => {}}
      >
        ADD
      </button>
    </section>
  );
};

export default AddEditNotes;
