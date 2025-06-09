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
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import noteEmpty from "../../assets/image/note-empty.svg";
import noData from "../../assets/image/no-data.svg";

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
  data?: Note | null;
};

type ToastState = {
  isShow: boolean;
  message: string;
  type?: "add" | "edit" | "delete";
};

const Home: React.FC = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState<ModalState>({
    isShow: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState<ToastState>({
    isShow: true,
    message: "",
    type: undefined,
  });

  const [allNotes, setAllNotes] = useState<Note[]>([]);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const [isSearch, setIsSearch] = useState<boolean>(false);

  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const navigate = useNavigate();

  // Handle show/close toast
  const showToastMessage = (
    message: string,
    type: "add" | "edit" | "delete"
  ) => {
    setShowToastMsg({
      isShow: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShow: false,
      message: "",
    });
  };

  // Handle Edit
  const handleEdit = (noteDetails: Note) => {
    setOpenAddEditModal({
      isShow: true,
      data: noteDetails,
      type: "edit",
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

  // Delete Notes
  const deleteNotes = async (noteId: string) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);

      if (response.data && !response.data.error) {
        getAllNotes();
        showToastMessage("Note deleted successfully", "delete");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err.response && err.response.data && err.response.data.message) {
        console.error(err.response.data.message);
      }
    }
  };

  // Update pin
  // ubah tipe parameter jadi Note, bukan string | boolean
  const updatePinned = async (noteData: Note) => {
    try {
      const response = await axiosInstance.put(
        `/update-note-pinned/${noteData._id}`,
        {
          isPinned: !noteData.isPinned,
        }
      );

      if (response.data && !response.data.error) {
        setRefreshTrigger((prev) => prev + 1);
        showToastMessage("Note updated successfully", "edit");
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error(error);
    }
  };

  // Search for a note
  const onSearchNote = async (query: string) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, [refreshTrigger]); // ✅ tambahkan dependency array

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <h1>cihuy</h1>

      <div className="container mx-auto">
        {allNotes.length > 0 ? (
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
                onDelete={() => {
                  deleteNotes(item._id);
                }}
                onPinNote={() => {
                  updatePinned(item);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? noData : noteEmpty}
            message={
              isSearch
                ? `Oops! No notes found matching your search.`
                : `Start creating your first note! Click the 'Add' button to jot down your toughts, ideas, and reminders, Let's get started!`
            }
          />
        )}
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
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
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
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShow={showToastMsg.isShow}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={() => handleCloseToast()}
      />
    </>
  );
};

export default Home;
