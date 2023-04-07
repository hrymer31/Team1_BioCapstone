import { Link, useMatch, useResolvedPath } from "react-router-dom"
import feetlogo from '../footprint.png';



//WILL NEED TO ADD MYACCOUNT ROUTE for my account 
export default function Navbar() {
  return (
    <nav className="nav">
      <img src={feetlogo} alt="footprint" width="70px" />
      <Link to="/" className="site-title">
        Stepping Forward
      </Link>
      <img src={feetlogo} alt="footprint" width="70px" />
      <ul>
   
              
             
     
      <CustomLink to="/resources"> Resources </CustomLink>  
      <CustomLink to="/goals"> Goals </CustomLink> 
      <CustomLink to="/reminders"> Email Reminders </CustomLink>   
      <CustomLink to="/logout"> Log Out </CustomLink>    

      
    
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

