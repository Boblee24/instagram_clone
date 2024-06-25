import { Timestamp, collection, getDocs } from "firebase/firestore"
import { database } from "../../config/firebase"
import { useEffect, useState } from "react"
import Post from "./post"


export interface PostInterface {
  username: string,
  id: string,
  description: string,
  title: string,
  userId: string,
  timestamp : Timestamp
}

const Main = () => {

  const postRef = collection(database, "posts")
  const [postsList, setPostsLists] = useState<PostInterface[] | null>(null)
  const getPosts = async () => {
    const data = await getDocs(postRef)
    setPostsLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostInterface[])
  }

  useEffect(() => {
    getPosts()
  }, [])
  return (
    <div className=''>
      {postsList?.map((post) => 
        <Post Ipost= {post} />
      )}
    </div>
  )
}

export default Main