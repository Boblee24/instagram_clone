import { Link } from "react-router-dom"
import { auth } from '../../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth"
// import { signOut } from "firebase/auth"
import { IoMdMenu } from "react-icons/io";
import NavBarPopUp from "./navbarpopup";
import { useState } from "react";


const Navbar = () => {

  const [user] = useAuthState(auth)
  const [isNavBarVisible, setIsNavBarVisible] = useState<boolean>(false);

  const toggleNavBar = () => {
    setIsNavBarVisible(!isNavBarVisible);
  };


  return (
    <div className=" bg-slate-400 flex justify-end p-4 items-center gap-10 pr-10">
      <div className="flex py-3 gap-5 text-[1.4rem]">
        {user && <Link to="/" className=" border-black border-b-4">Main</Link>}
        {!user ? <Link to="login" className="rounded-lg bg-slate-300 px-2">Login</Link> : <Link to="createpost" className="border-black border-b-4">Create Post</Link>}

      </div>
      <div>
        {user && (
          <div className="relative ">
            <IoMdMenu size={40} onClick={toggleNavBar}/>
            <NavBarPopUp isNavBarVisible = {isNavBarVisible} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar