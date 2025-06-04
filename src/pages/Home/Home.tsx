import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import axios, { AxiosError } from "axios";

Modal.setAppElement("#root");

// ✅ Tipe User
interface User {
  _id: string;
  fullName: string;
  email: string;
  // tambahkan properti lain jika perlu
}

// ✅ Tipe state modal
type ModalState = {
  isShow: boolean;
  type: "add" | "edit";
  data: null;
};

const Home: React.FC = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState<ModalState>({
    isShow: false,
    type: "add",
    data: null
  });

  const [userInfo, setUserInfo] = useState<User | null>(null);

  const navigate = useNavigate();

  const getUserInfo = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get<{ user: User }>("/get-user");
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

  useEffect(() => {
    getUserInfo();
  }, []); // ✅ tambahkan dependency array

  return (
    <>
      <Navbar userInfo={userInfo} />

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
            content="meeting with the team"
          />
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
        />
      </Modal>
    </>
  );
};

export default Home;
