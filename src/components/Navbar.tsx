import { useNavigate } from "react-router";
import { useState } from "react";
import ProfileInfo from "./Cards/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleSearch = () => {};

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
      <ProfileInfo name="john doe" onLogout={handleLogout} />
    </nav>
  );
};

export default Navbar;
