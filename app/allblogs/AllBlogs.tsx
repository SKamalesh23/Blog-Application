"use client";
import React from "react";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { Blog, SingleBlog } from "../page";
import DOMPurify from "dompurify";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "../Footer";
import NavBar from "../NavBar";
import { useRouter } from "next/navigation";
interface AllBlogsProps {
  initBlogs: Blog[];
}

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
const AllBlogs = ({ initBlogs }: AllBlogsProps) => {
  const router = useRouter();
  const handleClick = (blog: string) => {
    router.push(`/view/blog?blogId=${blog}`);
  };

  return (
    <div>
      <div className="fixed bottom-0">
        <NavBar />
      </div>
      <div
        className={roboto.className + " xl:mb-10 h-screen bg-white xl:ml-40"}
      >
        <div className="w-full h-50 bg-gray-50">
          <div className="p-5 pt-5 flex flex-col justify-center items-center">
            <input
              type="text"
              className="w-[500px] border-indigo-500 rounded-xl p-2 outline-1"
              placeholder="Search Blogs and Content..."
            />
            <h1 className="text-center pt-7 xl:pt-8 xl:text-3xl font-medium font-mono">
              WELCOME TO BLOG BYTES
            </h1>
            <p className="text-center  xl:w-2xl text-gray-500">
              Discover compelling stories, share your insights, and connect with
              a vibrant community of writers.
            </p>
          </div>
          <div>
            <h2 className="p-9 pt-0 text-2xl">Recent Posts..</h2>
            <div className="xl:px-15 justify-start flex flex-wrap xl:gap-5 card-class">
              {initBlogs.length > 0 &&
                initBlogs.map((blog) => (
                  <Card
                    className="w-screen xl:w-70 py-0 xl:shadow-2xl hover:cursor-pointer"
                    onClick={() => {
                      handleClick(blog.BLOG_Id);
                    }}
                    key={blog.BLOG_Id}
                  >
                    <CardHeader className="relative w-full h-40 rounded-t-2xl overflow-hidden">
                      <img
                        src={`${blog?.BLOG_Image.slice(6)}`}
                        alt="Blog header"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </CardHeader>

                    <CardContent>
                      <h2
                        className={roboto.className + "text-xl font-semibold"}
                      >
                        {blog.BLOG_Title}
                      </h2>
                      <div className="flex gap-3 my-1">
                        <div className="h-6 w-6 rounded-full overflow-hidden">
                          <Image
                            src="/uploads/class.jpg"
                            alt="Profile Image"
                            width={100} // intrinsic image size
                            height={100}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <p className="text-sm text-gray-600 items-center">
                          {blog.users_master.USER_FirstName +
                            " " +
                            blog.users_master.USER_LastName}{" "}
                        </p>
                      </div>
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            blog?.BLOG_Content.length > 200
                              ? blog.BLOG_Content.slice(0, 200)
                              : blog.BLOG_Content
                          ),
                        }}
                      />
                      {/* <p className="mt-2 text-sm">
                {blog.BLOG_Content.length>200 ? blog.BLOG_Content.slice(0,200) :blog.BLOG_Content}
                </p> */}
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-5 flex-wrap text-sm pb-5">
                        {blog.BLOG_Tags.split(",").map((tag, index) => (
                          <span
                            key={index}
                            className="bg-green-600 px-3 rounded-xl text-white"
                          >
                            {tag}
                          </span>
                        ))}

                        {/* <span className="bg-green-600 px-3 rounded-xl text-white">Health</span>
                    <span className="bg-green-600 px-3 rounded-xl text-white">Peace</span> */}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
          <div className="mt-3 mb-6">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
