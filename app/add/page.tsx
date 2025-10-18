"use client";
import { Roboto } from "next/font/google";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import NavBar from "../NavBar";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AuthenticateUser } from "../services/AuthenticateUser";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// import { Terminal } from "lucide-react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const schema = z.object({
  title: z.string().min(3).max(50),
  // content: z.string().min(30),
  tags: z.string(),
  category: z.enum(["Science", "Jobs", "Education", "Movies", "Television"]),
   image: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Image is required",
    })
    .refine(
      (files) => files[0]?.size <= 5 * 1024 * 1024,
      "Max file size is 5MB"
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type),
      "Only .jpg, .png, .webp formats allowed"
    ),
});

type FormData = z.infer<typeof schema>;
export default function Addblog() {
  const [image, setImage] = useState<string>("");
  const [value,setValue] = useState<string>("")
  const imageRef = useRef(null);
  const router = useRouter()
  const [showAlert ,setShowalert] = useState<boolean>(false)
  useEffect(() => {
    AuthenticateUser(router)
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // const handlePost = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   const val = imageRef.current?.files[0];
  //   if (val) {
  //     formData.append("image", val);
  //   }
  //   const value = Object.fromEntries(formData);
  //   console.log(formData);
  // };
  const handleImage = (e: ChangeEvent<HTMLFormElement>) => {
    const file = e.target.files[0];
    if (file) {
      const v = URL.createObjectURL(file);
      setImage(v);
    }
  };
  const submitData = async (data:FormData) =>{
      const formData = new FormData()
      formData.append("title",data.title)
      formData.append("content",value)
      formData.append("tags",data.tags)
      formData.append("category",data.category)
      formData.append("image",data.image[0])
//       console.log("FormData contents:");
// formData.forEach((value, key) => {
//   console.log("Key - value",key, value);
// });

      

      try{
        const res = await fetch("/api/addBlog",{
          method:"POST",
          body:formData
        })
        const responseData = await res.json()
        if(responseData.status==="success"){
          reset()
          setShowalert(true)
          setTimeout(()=>{
            setShowalert(false)
          },2000)
          setValue("")
        }
        else{
          if(responseData.message === "No Token Availabe"){
            router.push("/login")
          }
        }
        
      }
      catch(err){
          console.error("Error in Api")
      }
  }
  return (
    <div className="mt-0">
      <div className="fixed bottom-0  z-50">
        <NavBar />
      </div>
      <div className={"h-screen bg-white xl:ml-40"}>
        <div className="border-black  xl:mx-30 rounded-2xl p-5 outline-1">
          <h1 className="text-center text-2xl text-indigo-500 font-semibold">
            Create New Blog Post
          </h1>
          <p className="text-center font-medium">
            Fill out the details below to publish your story
          </p>
          <form
            className="xl:mx-10 my-5 flex flex-col gap-5"
            onSubmit={handleSubmit(submitData)}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Blog Title
              </label>
              <input
                type="text"
                {...register("title")}
                className="rounded-md outline-1 p-1"
              />
              {errors.title && <span className="text-red-500">Title Required</span>}
            </div>
            {/* <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Blog Content
              </label>
              <textarea
                className="outline-1 rounded-md h-60 p-2"
                {...register("content")}
              ></textarea>
              {errors.content && <span className="text-red-500">Content Required</span>}

            </div> */}
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Blog Content 
              </label>
                <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        // modules={modules}
        placeholder="Type or paste styled text here..."

        style={{
          borderRadius: "20px",
          backgroundColor: "white",
          height:'11rem',
        }}
      />
              {/* {!value && <span className="text-red-500">Content Required</span>} */}

            </div>
            <div className="flex flex-col gap-2 mt-8">
              <label htmlFor="" className="font-semibold">
                Tags
              </label>
              <input
                type="text"
                {...register("tags")}
                className="rounded-md outline-1 p-1"
              />
              {errors.tags && <span className="text-red-500">Tag Required</span>}

            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Category
              </label>
              <select
                {...register("category")}
                id=""
                className="p-2 outline-1 rounded-md"
              >
                <option value="" disabled>
                  Select a Category
                </option>
                <option value="Science">Science</option>
                <option value="Jobs">Jobs</option>
                <option value="Education">Education</option>
                <option value="Movies">Movies</option>
                <option value="Television">Television</option>
              </select>
              {errors.category && <span className="text-red-500">Category Required</span>}

            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="" className="font-semibold">
                Featured Image
              </label>
              <input
                type="file"
                placeholder="immmm"
                // ref={imageRef}
                id="file"
                {...register("image")}
                className=" z-10 flex text-white outline-1 w-full rounded-xl h-45 outline-dashed"
                // onChange={(e) => handleImage}
              />
              {errors.image && <span className="text-red-500">Upload an Image</span>}
              {/* <p className="absolute top-28 left-80 z-0">Drag and Drop image or choose a image</p> */}
              {image && (
                <img
                  src={image}

                  className=" absolute top-10 left-10 z-0 h-40 w-40"
                  alt="Uploaded Preview"
                />
              )}
            </div>
            <div className="flex gap-5 mb-10 justify-end">
              <button
                type="button"
                className="outline-indigo-600 outline-1 rounded-md p-2 text-indigo-600"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="bg-indigo-600 p-2 rounded-md text-white"
              >
                Publish Post
              </button>
            </div>
          </form>
          {
            showAlert && 
            <Alert variant="default" className="fixed top-2 left-140 border-green-700 text-green-900  bg-green-200 w-100 z-50">
  {/* <Terminal /> */}
  <AlertTitle className="text-2xl text-center">Upload Successfull✅</AlertTitle>
  {/* <AlertDescription className="">
    You can add components and dependencies to your app using the cli.
  </AlertDescription> */}
</Alert>
          }
          
        </div>
      </div>
    </div>
  );
}
