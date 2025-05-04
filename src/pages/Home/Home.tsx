import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar";
import AddEditNotes from "./AddEditNotes";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Meeting on Office"
            date="3 May 2025"
            tags={["#Meeting"]}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
            content="meeting with the team
         lorem basdkadjshdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"
          />
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-700 absolute right-5 bottom-10"
        onClick={() => {}}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <AddEditNotes />
    </>
  );
};

export default Home;
