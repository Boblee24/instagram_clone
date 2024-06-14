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
    <div>
      <Link to="/" >Main</Link>
      <Link to="login">Login</Link>
      <div>
        {user && (
          <>
            <p>{user?.displayName}</p> {/*This displays the name and profile picture of the the user  */}
            <img src={user?.photoURL || ""} alt='userimage' />
          </>
        )}
      </div>
      <button onClick={signUserOut}>Log Out</button>
    </div>
  )
}

export default Navbar