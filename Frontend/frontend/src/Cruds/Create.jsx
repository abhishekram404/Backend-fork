import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";

import { toast } from "react-toastify";
import { useAddBlogsMutation } from "../Features/Auth/Blog/blogApi";

const CrudForm = () => {
  const nav = useNavigate();
  const { state } = useLocation;
  const [createPost, { isLoading, error }] = useAddBlogsMutation();
  const { user } = useSelector((store) => store.user); // Create wala

  const blogSchema = Yup.object().shape({
    title: Yup.string()
      .min(10, "Too short")
      .max(200, "Too Long")
      .required("title is required"),
    detail: Yup.string()
      .min(5, "Too short")
      .max(2000, "Too Long")
      .required("detail is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: state == null ? "" : state.title,
      detail: state == null ? "" : state.detail,
      image: null,
      imageUrl: state == null ? "" : state.imageUrl,
    },
    onSubmit: async (val) => {
      let formData = new FormData();
      formData.append("title", val.title);
      formData.append("detail", val.detail);
      formData.append("image", val.image);
      try {
        const blogData = {
          blog: formData,
          token: user.token,
        };
        const response = await createPost(blogData).unwrap();
        toast.success("successfully created");
        nav("/");
      } catch (err) {
        toast.error(err.data);
      }
    },
    validationSchema: blogSchema,
  });
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex justify-center mt-3 items-center max-h-2xl "
      >
        <div className="w-[40%] shadow-2xl bg-white p-4 space-y-4 lg:w-[90%] xl:w-[90%]">
          <div className="flex justify-between">
            <h1 className="text-2xl ">Add Some Blog</h1>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="title">Title</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.title}
              className="border border-gray-500 outline-none px-2 py-1"
              type="text"
              id="title"
              name="title"
            />
            {formik.errors.title && formik.touched.title ? (
              <h1 className="text-pink-700">{formik.errors.title}</h1>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="detail">Detail</label>
            <textarea
              className="border border-gray-500 outline-none px-2 py-1"
              onChange={formik.handleChange}
              value={formik.values.detail}
              name="detail"
              id="detail"
              cols="30"
              rows="5"
            ></textarea>
            {formik.errors.detail && formik.touched.detail ? (
              <h1 className="text-pink-700">{formik.errors.detail}</h1>
            ) : (
              ""
            )}
          </div>

          {formik.values.imageUrl && (
            <img className="h-14 w-14" src={formik.values.imageUrl} alt="" />
          )}

          <div className="flex flex-col space-y-2">
            <label htmlFor="image">Select an Image</label>
            <input
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                formik.setFieldValue("image", file);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.addEventListener("load", () => {
                  formik.setFieldValue("imageUrl", reader.result);
                });
              }}
              className="border border-gray-500 outline-none px-2 py-1"
              type="file"
              id="image"
              name="image"
            />
          </div>

          <div>
            <button className="bg-blue-500 p-2 w-[40%] rounded" type="submit">
              {isLoading === true ? (
                <div className="h-7 w-7 mx-auto rounded-full   border-2 border-black border-t-white animate-spin"></div>
              ) : (
                <h1>Submit</h1>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CrudForm;
