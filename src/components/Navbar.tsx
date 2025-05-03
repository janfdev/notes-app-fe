import { useNavigate } from "react-router";
import ProfileInfo from "./Cards/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <nav className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      <SearchBar />
      <ProfileInfo name="john doe" onLogout={handleLogout} />
    </nav>
  );
};

export default Navbar;
