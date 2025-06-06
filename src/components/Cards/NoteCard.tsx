import { BsPinAngleFill } from "react-icons/bs";
import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

type NoteCardProps = {
  title: string;
  date: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onPinNote: () => void;
};

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote
}: NoteCardProps) => {
  return (
    <section className="border rounded-md p-4 bg-white hover:shadow-2xl transition-all ease-in-out">
      <div
        className="flex items-center justify-between
      "
      >
        <div>
          <h3 className="text-medium text-lg capitalize">{title}</h3>
          <span className="text-xs text-gray-500">
            {moment(date).format("DD MMMM YYYY")}
          </span>
        </div>
        <div
          className={`text-xl text-slate-600 cursor-pointer hover:text-blue-700 hover:border-blue-700 rounded-full border border-slate-600 w-10 h-10 flex items-center justify-center ${
            isPinned ? "text-blue-500 border-blue-500" : "text-black"
          }`}
          onClick={onPinNote}
        >
          <BsPinAngleFill />
        </div>
      </div>

      <p className="text-wrap capitalize text-xs text-slate-600 mt-2">
        {content?.slice(0, 60)}
      </p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs text-slate-100 px-2 py-1 rounded-full bg-slate-800"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="text-2xl bg-green-500 hover:bg-green-700 text-white rounded-full p-1"
            onClick={onEdit}
          />
          <MdDelete
            className="text-2xl bg-red-500 hover:bg-red-700 text-white rounded-full p-1"
            onClick={onDelete}
          />
        </div>
      </div>
    </section>
  );
};

export default NoteCard;
