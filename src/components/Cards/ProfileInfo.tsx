import { HiOutlineLogout } from "react-icons/hi";

type ProfileInfoProps = {
  name: string;
  onLogout: () => void;
  userInfo?: {
    firstName: string;
    email: string;
  };
};

const ProfileInfo = ({ userInfo, name, onLogout }: ProfileInfoProps) => {
  const handleInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };
  return (
    <div className="flex items-center justify-between space-x-5">
      <span className="uppercase bg-blue-700 w-8 h-8 flex items-center justify-center text-white rounded-full">
        {handleInitials(userInfo?.firstName || name)}
      </span>
      <div className="flex items-center gap-x-3">
        <p className="capitalize text-[15px]">{name}</p>
        <button
          onClick={onLogout}
          className="bg-red-500 flex items-center justify-center text-white text-xl p-2 rounded-md"
        >
          <HiOutlineLogout />
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
