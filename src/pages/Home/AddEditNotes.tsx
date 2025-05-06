import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput";
import { useState } from "react";

type EditNotesProps = {
  onClose: () => void;
};

const AddEditNotes = ({ onClose }: EditNotesProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  return (
    <section className="relative bg-white p-6 rounded-md shadow-md w-full max-w-md mx-auto">
      <button
        className="absolute w-10 h-10 rounded-full flex items-center justify-center bg-blue-200 hover:bg-blue-500 group -top-5 -right-5"
        onClick={onClose}
      >
        <MdClose className="text-2xl text-black group-hover:text-white" />
      </button>

      <div className="flex flex-col gap-4">
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

        <div className="flex flex-col gap-2">
          <label className="input-label">CONTENT</label>
          <textarea
            className="text-sm text-slate-950 outline-none border bg-slate-50 p-2 rounded"
            placeholder="Content"
            rows={10}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>

        <div>
          <label className="input-label">TAGS</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        <button
          className="bg-blue-500 w-full rounded-md text-white p-3 font-medium"
          onClick={() => {}}
        >
          ADD
        </button>
      </div>
    </section>
  );
};

export default AddEditNotes;
