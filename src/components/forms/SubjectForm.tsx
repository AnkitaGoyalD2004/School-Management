"use client";

import { createSubject, updateSubject } from "@/lib/action";
import { SubjectSchema, subjectSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../InputField";


const SubjectForm = ({
  setOpen,
  type,
  data,
  relatedData
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  const [state, formAction] = useActionState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    startTransition(() => {
      formAction(data);
    });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`${type === "create" ? "created" : " updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const teachers = relatedData ?.teachers;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new subject" : "Update subject"}</h1>
      <span className="text-xs text-gray-400 font-medium">
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        {type === "update" && (
          <input
            type="hidden"
            {...register("id")}
            defaultValue={data?.id}
          />
        )}
        <InputField
          label="Subject Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Teachers</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("teachers")}
            defaultValue={data?.teachers}
          >

            { teachers.map((teacher: { id: string; name: string; surname: string }) => (
              <option value={teacher.id} key={teacher.id}>{teacher.name + " " + teacher.surname}</option>
            ))}

          </select>

          {errors.teachers?.message && (
            <p className="text-xs text-red-400">
              {errors.teachers.message.toString()}
            </p>
          )}
        </div>

      </div>
      {state.error && <span className="text-red-500">Something went wrong</span>}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
