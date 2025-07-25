import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom"; // Use Link for client-side routing
import "./Navbar.css";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header>
			<h2><span>WHEELS</span> Moto</h2>
			<nav ref={navRef}>
				<a href="/">Home</a>
				<a href="/About">About</a>
				<a href="/Contacts">Contacts</a>
				<a href="/Services">Services</a>
				<a href="/Accessories">Accessories</a>
				{/* Updated - Link for 'Check Your Status' */}
				<Link to="/status">Check Your Status</Link> 
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;