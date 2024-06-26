import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import { signOut } from 'firebase/auth'
import "./nav.css"
const NavBarPopUp = () => {

    const [user] = useAuthState(auth)
    const signUserOut = async () => {
        await signOut(auth)
    }
    return (
        <div className='absolute right-0 bg-slate-600 dialog'>
            <div className="flex items-center text-[1.3rem] gap-2  ">
                <p>{user?.displayName}</p> {/*This displays the name and profile picture of the the user  */}
                <img src={user?.photoURL || ""} alt='userimage' width={30} height={30} />
                <button onClick={signUserOut} className="bg-slate-300 rounded-lg px-2">Log Out</button>
            </div>
        </div>
    )
}

export default NavBarPopUp