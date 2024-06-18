import { addDoc, collection } from "firebase/firestore"
import { PostInterface } from "./main"
import { auth, database } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState } from "react"

interface Props {
  Ipost: PostInterface
}

const Post = (props: Props) => {
  const likeRef = collection(database, "likes")
  const [user] = useAuthState(auth)
  const [likeCount, setLikeCount] = useState<number>()

  const likePost = async() => {
    await addDoc(likeRef, {
      userId :user?.uid,
      postId: Ipost.id
    })
  }

  const { Ipost } = props
  return (
    <div className="text-center">
      <div>
        <h1 className="text-[2rem] font-bold">{Ipost.title}</h1>
      </div>
      <div className="text-[1.4rem]">
        <p>{Ipost.description}</p>
      </div>
      <div>
        <h4 className="text-[#6565fd] ">@{Ipost.username}</h4>
      </div>
      <div>
        <button onClick={likePost} className="border-2 border-black px-2 py-1">
          &#128077;
        </button>
      </div>
    </div>
  )
}

export default Post