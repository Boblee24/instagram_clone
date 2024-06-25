import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { PostInterface } from "./main"
import { auth, database } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import { format } from "date-fns"

// import { useState } from "react"

interface Props {
  Ipost: PostInterface
}
interface Ilike {
  userId: string;
}

const Post = (props: Props) => {
  const { Ipost } = props

  const likeRef = collection(database, "likes")
  const [user] = useAuthState(auth)
  const likeDoc = query(likeRef, where("postId", "==", Ipost.id))//this gets the collection of the of a specific type of data

  const [likes, setLikes] = useState<Ilike[] | null>(null)
  const getLikes = async () => {
    const data = await getDocs(likeDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })))

  }
  useEffect(() => {
    getLikes()
  }, [])

  const likePost = async () => {
    try {
      await addDoc(likeRef, {
        userId: user?.uid,
        postId: Ipost.id
      })
      if (user) {
        setLikes((prev) => prev ? [...prev, { userId: user?.uid }] : [{ userId: user?.uid }])
      }
    } catch (error) {
      console.log("bollocks")
    }

  }
  const hasUSerLiked = likes?.find((like) => like.userId === user?.uid)

  return (
    <div className="text-center">
      <div>
        <h1 className="text-[2rem] font-bold">{Ipost.title} </h1>
        <span>{Ipost.timestamp && format(Ipost.timestamp.toDate(), "PP p")}</span>
      </div>
      <div className="text-[1.4rem]">
        <p>{Ipost.description}</p>
      </div>
      <div>
        <h4 className="text-[#6565fd] ">@{Ipost.username}</h4>
      </div>
      <div>
        <button onClick={likePost} className="border-2 border-black px-2 py-1">
          {hasUSerLiked ? <> &#128078; </> : <>&#128077; </>} {likes && likes?.length}
        </button>
      </div>
    </div>
  )
}

export default Post