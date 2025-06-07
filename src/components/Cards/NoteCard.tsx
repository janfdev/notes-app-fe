import { BsPinAngleFill } from "react-icons/bs";
import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";

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
    <Card className="border rounded-md p-4 bg-white hover:shadow-2xl transition-all ease-in-out">
      <CardHeader
        className="flex items-center justify-between
      "
      >
        <div>
          <CardTitle className="font-poppins text-lg capitalize">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            {moment(date).format("DD MMMM YYYY")}
          </CardDescription>
        </div>
        <Button
          variant={"secondary"}
          className={`text-xl text-slate-600 cursor-pointer hover:text-blue-700 hover:border-blue-700 rounded-full border border-slate-600 w-10 h-10 flex items-center justify-center ${
            isPinned
              ? "text-blue-500 border-blue-500 bg-blue-200"
              : "text-black"
          }`}
          onClick={onPinNote}
        >
          <BsPinAngleFill className="text-lg" />
        </Button>
      </CardHeader>

      <CardContent className="text-wrap capitalize text-xs text-slate-600 mt-2">
        {content?.slice(0, 60)}
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-2">
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <Button variant={"outline"} key={index}>
              #{tag}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant={"default"} onClick={onEdit}>
            <MdCreate />
          </Button>

          <Button variant={"destructive"} onClick={onDelete}>
            <MdDelete />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
