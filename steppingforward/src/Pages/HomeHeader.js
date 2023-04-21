import { Link, useMatch, useResolvedPath } from "react-router-dom"
import feetlogo from '../footprint.png';


export default function HomeHeader() {
  return (
    <nav className="nav">
      <img src={feetlogo} alt="footprint" width="70px" />
      <Link to="/" className="site-title">
        Stepping Forward
      </Link>
      <img src={feetlogo} alt="footprint" width="70px" />
      <ul>
   

      <CustomLink to="/ageCheck"> Sign Up </CustomLink> 
      <CustomLink to="/login"> Log In </CustomLink>    
    
          </ul>
    </nav>
  )
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
