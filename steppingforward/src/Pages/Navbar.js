import { Link, useMatch, useResolvedPath } from "react-router-dom"
import feetlogo from '../footprint.png';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';


 
const Navbar = () => {
  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout()
      navigate('/home')
    } catch (e) {
      console.log(e.message)
    }
  }

  function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }

  return (
    <nav className="nav">
      <img src={feetlogo} alt="footprint" width="70px" />
      <Link to="/home" className="site-title">
        Stepping Forward
      </Link>
      <img src={feetlogo} alt="footprint" width="70px" />
      <ul>        
        <CustomLink to="/details"> Calculate Steps </CustomLink>  
        <CustomLink to="/resources"> Resources </CustomLink>  
        <CustomLink to="/goals"> Goals </CustomLink>  
        <CustomLink to="/contactForm"> Email Reminders </CustomLink>  
        <CustomLink to="/profile"> My Account </CustomLink> 
        <CustomLink to="/" onClick={handleLogout}> Log Out </CustomLink>    
      </ul>
    </nav>
  )
}
  


export default Navbar;