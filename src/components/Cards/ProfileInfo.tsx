type ProfileInfoProps = {
  name: string;
  onLogout: () => void;
};

const ProfileInfo = ({ name, onLogout }: ProfileInfoProps) => {
  const handleInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };
  return (
    <div className="flex items-center justify-between space-x-5">
      <span className="uppercase bg-blue-700 w-8 h-8 flex items-center justify-center text-white rounded-full">
        {handleInitials(name)}
      </span>
      <div className="flex flex-col text-sm">
        <p className="capitalize">{name}</p>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileInfo;
