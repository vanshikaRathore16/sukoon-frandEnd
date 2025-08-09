import { Link, useNavigate } from "react-router-dom";
import { isUserExit } from "./auth/auth";

function Header() {
  const navigate = useNavigate();
  const handleSignOut = (event)=>{
     sessionStorage.clear();
    navigate("/");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-white fs-4" to="/">
          Sukoon
        </Link>

        {/* Left Navigation */}
        <div className="d-flex gap-4 align-items-center flex-grow-1 ms-5">
          <Link to="/home" className="nav-link text-white">Home</Link>
          <Link to="/mood" className="nav-link text-white">Mood</Link>
          <Link to="/qoute" className="nav-link text-white">Quotes</Link>
          <Link to="/pose" className="nav-link text-white">Pose</Link>
          <Link to="/personalplan" className="nav-link text-white">Personal Plan</Link>
          <Link to="/routine" className="nav-link text-white">Routine</Link>
          <Link to="/aboutus" className="nav-link text-white">About Us</Link>
          <Link to="/metidation" className="nav-link text-white">Meditation</Link>
        </div>

        {/* Right Side: Icons + Button */}
        <div className="d-flex gap-4 align-items-center">
          <Link to="/favorite" className="nav-link text-white fs-5">
            <i className="bi bi-heart-fill"></i>
          </Link>
          <Link to="/profile" className="nav-link text-white fs-5">
            <i className="bi bi-person-circle"></i>
          </Link>
          {!isUserExit() &&<Link to="/login" className="btn btn-outline-light rounded-pill px-3 py-1 m-2">
            Sign In
          </Link>}
           {!isUserExit() && <Link to="/signup" className="btn btn-outline-light rounded-pill px-3 py-1 m-2">
            Sign Up
          </Link>}
          {isUserExit() && <Link onClick={handleSignOut} className="btn btn-outline-light rounded-pill px-3 py-1 m-2">
            log-out
          </Link>}
       </div>
      </nav>
    </>
  );
}

export default Header;
