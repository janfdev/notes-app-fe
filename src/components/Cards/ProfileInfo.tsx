import { HiOutlineLogout } from "react-icons/hi";
import { UserInfo } from "../../utils/types";



type ProfileInfoProps = {
  onLogout: () => void;
  userInfo: UserInfo;
};

const ProfileInfo = ({ userInfo, onLogout }: ProfileInfoProps) => {
  const handleInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex items-center justify-between space-x-5">
      <span className="uppercase bg-blue-700 w-8 h-8 flex items-center justify-center text-white rounded-full">
        {handleInitials(userInfo.fullName)}
      </span>
      <div className="flex items-center gap-x-3">
        <p className="capitalize text-[15px]">{userInfo.fullName}</p>
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
