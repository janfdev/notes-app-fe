import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

type TagInputProps = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

const TagInput = ({ tags, setTags }: TagInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };
  return (
    <div>
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="text-sm px-3 py-2 bg-transparent border rounded outline-none"
          placeholder="Add tags"
        />

        <button className="w-8 h-8 flex items-center justify-center rounded  border border-blue-700 hover:bg-blue-700">
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
