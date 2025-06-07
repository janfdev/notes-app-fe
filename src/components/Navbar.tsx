import { useNavigate } from "react-router";
import { useState } from "react";
import ProfileInfo from "./Cards/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";
import { UserInfo } from "../utils/types";

type NavbarProps = {
  userInfo: UserInfo | null;
  onSearchNote: (query: string) => void;
};

const Navbar = ({ userInfo, onSearchNote }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };
  return (
    <nav className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={handleClearSearch}
      />
      {userInfo ? (
        <ProfileInfo userInfo={userInfo} onLogout={handleLogout} />
      ) : (
        <div className="flex items-center gap-x-3"></div>
      )}{" "}
    </nav>
  );
};

export default Navbar;
