import { Link, NavLink } from "react-router-dom";
import pic from '/logo3.png';
import {  } from "react-icons/fa";


const Navbar = () => {
  
  
return (
<header className="container">
<div className="navbar navbar-expand-md flex justify-between items-center gap-4 text-xl">
  <div className="logobrand" >
    <NavLink className='nav-link' to='/'>
        <img src={pic} alt="pic" width="45px" className="p-1"/>
    </NavLink>
  </div>

<nav className="d-flex justify-content-center align-items-center gap-5">
<NavLink className='nav-link' style={(e)=>{  
    return {
        textDecoration: e.isActive? "overline" : "",
        fontWeight: e.isActive ? "bold" : ""
    }
}}  
to='/'>All Users</NavLink>
<NavLink className='nav-link' style={(e)=>{   
    return {
        textDecoration: e.isActive? "overline" : "",
        fontWeight: e.isActive ? "bold" : ""
    }
}}   
to='/search'>Search User</NavLink>

</nav>
<div>

</div>
</div>
</header>
);
}
export default Navbar;