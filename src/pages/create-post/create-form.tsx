import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection } from 'firebase/firestore'
import { auth, database } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"

interface FormData {
    title: string,
    description: string
}

const CreateForm = () => {
    const schema = yup.object().shape({
        title: yup.string().required("This field is required"),
        description: yup.string().required("This field is required"),
    })
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })
    const postRef = collection(database, "posts");
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const createHandlePost = async (data: FormData) => {
        await addDoc(postRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })// allow read, write: if request.auth != null && request.resource.id == request.resource.data.userId; this above code hel filter those that can read and write the database 
        navigate("/");
    }
    return (

        <form onSubmit={handleSubmit(createHandlePost)} className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    id="title"
                    placeholder="Title..."
                    {...register("title")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    placeholder="Description..."
                    {...register('description')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>}
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default CreateForm