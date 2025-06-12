import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";
import { Button } from "../ui/button";
import { CiStar } from "react-icons/ci";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import { Badge } from "../ui/badge";

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
          <CardDescription className="text-xs capitalize text-gray-500">
            {moment(date).fromNow()} • {moment(date).format("DD MMM YYYY")}
          </CardDescription>
        </div>
        <button
          className={`text-xl text-slate-600 cursor-pointer rounded-full border border-slate-600 w-10 h-10 flex items-center justify-center ${
            isPinned
              ? "text-yellow-500 fill-yellow-400 border-yellow-500 bg-yellow-200"
              : "text-black border-black hover:text-yellow-500 hover:border-yellow-500"
          }`}
          onClick={onPinNote}
        >
          <CiStar className="size-6" />
        </button>
      </CardHeader>

      <CardContent className="text-wrap capitalize text-xs text-slate-600 mt-2">
        {content?.slice(0, 60)}
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-2">
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <Badge variant={"outline"} key={index}>
              #{tag}
            </Badge>
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
