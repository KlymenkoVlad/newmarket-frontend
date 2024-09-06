"use client";

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Ripples from "react-ripples";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { passwordUpdate } from "@/actions/authActions";

const PasswordForm = () => {
  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        newPasswordConfirmation: "",
      }}
      validationSchema={Yup.object({
        oldPassword: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
        newPassword: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
          .notOneOf(
            [Yup.ref("oldPassword")],
            "New password must be different from the old password.",
          ),
        newPasswordConfirmation: Yup.string()
          .oneOf([Yup.ref("newPassword")], "Passwords must match")
          .required("Please confirm your new password."),
      })}
      onSubmit={async ({ newPassword, oldPassword }, { resetForm }) => {
        try {
          toast.loading("We are working on updating your password");
          const res = await passwordUpdate({ newPassword, oldPassword });
          toast.dismiss();

          if (res.error) {
            toast.error(res.error);
          } else if (res.status) {
            toast.success("Password was successfully updated");
          } else {
            toast.error("Something is went wrong");
          }
        } catch (error) {
          console.error(error);
        } finally {
          resetForm();
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="m-auto flex w-[270px] flex-col justify-center px-8 pb-8 pt-6 ms:w-[300px] sm:w-[400px]">
          <h2 className="mb-6 text-lg font-medium text-red-500">
            Edit Your Password
          </h2>

          <div className="mb-10 bg-white">
            <label
              className="bottom-8 left-0 -translate-y-2 text-sm text-gray-500 transition-transform duration-300"
              htmlFor="oldPassword"
            >
              Your Old Password
            </label>
            <Field
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
              name="oldPassword"
              type="password"
            />
            <ErrorMessage
              name="oldPassword"
              component="div"
              className="mt-2 text-red-500"
            />
          </div>

          <div className="mb-10 bg-white">
            <label
              className="bottom-8 left-0 -translate-y-2 text-sm text-gray-500 transition-transform duration-300"
              htmlFor="newPassword"
            >
              Your New Password
            </label>
            <Field
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
              name="newPassword"
              type="password"
            />
            <ErrorMessage
              name="newPassword"
              component="div"
              className="mt-2 text-red-500"
            />
          </div>

          <div className="mb-10 bg-white">
            <label
              className="bottom-8 left-0 -translate-y-2 text-sm text-gray-500 transition-transform duration-300"
              htmlFor="newPasswordConfirmation"
            >
              Confirm Your New Password
            </label>
            <Field
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
              name="newPasswordConfirmation"
              type="password"
            />
            <ErrorMessage
              name="newPasswordConfirmation"
              component="div"
              className="mt-2 text-red-500"
            />
          </div>

          <div className="inline-flex items-center justify-start">
            <Ripples during={800} color="#6eb9f7">
              <button
                disabled={isSubmitting}
                className="rounded-md border-0 bg-blue-500 px-4 py-2 text-base font-medium uppercase text-white shadow-md transition-colors duration-500 ease-in-out hover:bg-blue-600 focus:outline-none active:bg-blue-400 disabled:bg-blue-200"
                type="submit"
              >
                Send
              </button>
            </Ripples>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordForm;
