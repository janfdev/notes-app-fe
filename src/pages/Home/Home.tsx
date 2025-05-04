import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <NoteCard
          title="Meeting on Office"
          date="3 May 2025"
          tags={["Meeting", "Office"]}
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
          content="meeting with the team
         lorem basdkadjshdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"
        />
      </div>
    </>
  );
};

export default Home;
