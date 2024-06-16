import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection} from 'firebase/firestore'
import { auth, database } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

interface FormData {
    title: string,
    description : string
}

const CreateForm = () => {
    const schema = yup.object().shape({
        title: yup.string().required("This field is required"),
        description: yup.string().required("This field is required"),
    })
    const { register, handleSubmit, formState : {errors}} = useForm<FormData>({
        resolver: yupResolver(schema)
    })
    const postRef = collection(database, "posts")
    const [user] = useAuthState(auth)
    const createHandlePost = async (data: FormData) => {
        await addDoc(postRef, {
            ...data,
            username : user?.displayName,
            userId : user?.uid
        })// allow read, write: if request.auth != null && request.resource.id == request.resource.data.userId; this above code hel filter those that can read and write the database 
    }
    return (

        <form onSubmit={handleSubmit(createHandlePost)} className="gap-4 flex flex-col">
            <input placeholder="Title..."{...register("title")} />
            <p className="text-[red]" >{errors.title?.message}</p>
            <textarea placeholder="Description..." {...register('description')}/>
            <p className="text-[red]">{errors.description?.message}</p>
            <input type="submit" />
        </form>
    )
}

export default CreateForm