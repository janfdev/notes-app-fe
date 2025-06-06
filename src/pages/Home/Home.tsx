import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import axios, { AxiosError } from "axios";
import { UserInfo } from "../../utils/types";

type Note = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdOn: string;
};

type ModalState = {
  isShow: boolean;
  type: "add" | "edit";
  data: Note | null;
};

const Home: React.FC = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState<ModalState>({
    isShow: false,
    type: "add",
    data: null
  });

  const [allNotes, setAllNotes] = useState<Note[]>([]);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const navigate = useNavigate();

  // Handle Edit
  const handleEdit = (noteDetails: Note) => {
    setOpenAddEditModal({
      isShow: true,
      data: noteDetails,
      type: "edit"
    });
  };

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ message: string }>;
        if (err.response?.data?.message) {
          console.error(err.response.data.message);
          localStorage.clear();
          navigate("/login");
        } else {
          console.error(
            "An unexpected error occurred while fetching user info."
          );
        }
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An uxpected error occurred. Please try again", error);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []); // ✅ tambahkan dependency array

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.map((item) => (
            <NoteCard
              key={item._id}
              title={item.title}
              content={item.content}
              date={item.createdOn}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => {
                handleEdit(item);
              }}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-700 absolute right-5 bottom-10"
        onClick={() =>
          setOpenAddEditModal({ isShow: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() =>
          setOpenAddEditModal({ isShow: false, type: "add", data: null })
        } // ✅ tambahkan handler
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)"
          }
        }}
        contentLabel="Add or Edit Note Modal"
        className="w-[40%] max-h-[90%] rounded-md mx-auto mt-14 p-5 overflow-hidden"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShow: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
