import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirm: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email Required").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
      fullname: Yup.string().required("Required"),
      confirm: Yup.string()
        .label("confirm password")
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
  });
  return (
    <div>
      <div className="bg-green-500 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullname"
                placeholder="Full Name"
                onChange={formik.handleChange}
                value={formik.values.fullname}
              />
              {formik.errors.fullname && formik.touched.fullname ? (
                <h1 className="text-pink-700">{formik.errors.fullname}</h1>
              ) : (
                ""
              )}

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <h1 className="text-pink-700">{formik.errors.email}</h1>
              ) : (
                ""
              )}

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <h1 className="text-red-700">{formik.errors.password} </h1>
              ) : (
                ""
              )}
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                value={formik.values.confirm}
              />
              {formik.errors.confirm && formik.touched.confirm ? (
                <h1 className="text-red-700">{formik.errors.confirm} </h1>
              ) : (
                ""
              )}
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green text-white bg-gray-900 hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>

              <div className="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
            </form>
          </div>

          <div className="text-white mt-6">
            Already have an account?
            <a
              className="no-underline border-b border-blue text-blue"
              href="../login/"
            >
              Log in
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
