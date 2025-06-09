import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Textarea } from "./ui/textarea";
import TagInput from "./Input/TagInput";

type NoteData = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
};

type ModalProps = {
  noteData?: NoteData | null;
  type?: "add" | "edit";
  getAllNotes: () => void;
};

export function ModalAddNotes({ noteData, type, getAllNotes }: ModalProps) {
  const [title, setTitle] = useState<string>(noteData?.title || "");
  const [content, setContent] = useState<string>(noteData?.content || "");
  const [tags, setTags] = useState<string[]>(noteData?.tags || []);

  const [error, setError] = useState<string | null>(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags
      });

      if (response.data && response.data.note) {
        getAllNotes();
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
    const noteId = noteData?._id;
    try {
      const response = await axiosInstance.put(`/edit-note/${noteId}`, {
        title,
        content,
        tags
      });

      if (response.data && response.data.note) {
        getAllNotes();
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
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button size={"lg"} className="py-3 px-5">
            <MdAdd className="text-lg" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {type === "add" ? "Add Notes" : "Update Notes"}
            </DialogTitle>
            <DialogDescription>
              {type === "add"
                ? "Add Notes for your task"
                : "Please change minimum one field to update task"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title-1">Title</Label>
              <Input
                id="title-1"
                defaultValue=""
                type="text"
                placeholder="Add your note today"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Textarea
                cols={70}
                rows={10}
                placeholder="Content"
                value={content}
                onChange={({ target }) => setContent(target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tags">Tags</Label>
              <TagInput tags={tags} setTags={setTags} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {type === "add" ? "Add Notes" : "Update Notes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
