import TagInput from "../../components/Input/TagInput";
import { useState } from "react";

const AddEditNotes = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  return (
    <section className="">
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-lg text-slate-950 outline-none border rounded-md px-4 py-2"
          placeholder="Go to Gym at 5 PM"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col mt-2 gap-2">
        <label className="input-label">CONTENT</label>
        <textarea
          className="text-sm text-slate-950 outline-none border bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      <button
        className="bg-blue-500 w-full rounded-md text-white p-3 font-medium mt-5 "
        onClick={() => {}}
      >
        ADD
      </button>
    </section>
  );
};

export default AddEditNotes;
