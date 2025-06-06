import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput";
import { useState } from "react";
import { AxiosError } from "axios";
import axiosInstance from "../../utils/axiosInstance";

type NoteData = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
};

type EditNotesProps = {
  noteData: NoteData;
  type: "add" | "edit";
  onClose: () => void;
  getAllNotes: () => void;
};

const AddEditNotes = ({
  noteData,
  getAllNotes,
  type,
  onClose
}: EditNotesProps) => {
  const [title, setTitle] = useState<string>(noteData?.title || "");
  const [content, setContent] = useState<string>(noteData?.content || "");
  const [tags, setTags] = useState<string[]>(noteData?.tags || []);

  const [error, setError] = useState<string | null>(null);

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags
      });

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/edit-note/${noteId}`, {
        title,
        content,
        tags
      });

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title");
      return;
    }

    if (!content) {
      setError("Please enter a content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
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

        {error && <p className="text-red-500 text-xs pt-1">{error}</p>}

        <button
          className="bg-blue-500 w-full cursor-pointer rounded-md text-white p-3 font-medium"
          onClick={() => {
            handleAddNote();
          }}
        >
          {type === "edit" ? "Update Note" : "Add Note"}
        </button>
      </div>
    </section>
  );
};

export default AddEditNotes;
