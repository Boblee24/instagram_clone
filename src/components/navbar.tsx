import { Link } from "react-router-dom"
import { auth } from '../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"


const Navbar = () => {

  const [user] = useAuthState(auth)
  const signUserOut = async () => {
    await signOut(auth)
  }

  return (
    <div className=" bg-slate-400 flex justify-end p-4 items-center gap-10 pr-10">
      <div className="flex py-3 gap-5 text-[1.4rem]">
        <Link to="/" className=" border-black border-b-4" >Main</Link>
        {!user ? <Link to="login" className="rounded-lg bg-slate-300 px-2">Login</Link> : <Link to="createpost" className="border-black border-b-4">Create Post</Link>}
        
      </div>
      <div>
        {user && (
          <div className="flex items-center text-[1.3rem] gap-2">
            <p>{user?.displayName}</p> {/*This displays the name and profile picture of the the user  */}
            <img src={user?.photoURL || ""} alt='userimage' width={30} height={30}/>
            <button onClick={signUserOut} className="bg-slate-300 rounded-lg px-2">Log Out</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar