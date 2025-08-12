"use server";

import prisma from "@/lib/prisma";
import { SubjectSchema } from "./formValidationSchemas";

type CurrentState =  {success: boolean, error: boolean}

export const createSubject = async ( currentState: CurrentState,  data: SubjectSchema) => {
 try{
  await prisma.subject.create({
    data: {
      name: data.name,
    }
  });
  return {success: true , error:false};
  // revalidatePath("/subjects");
 }catch(err){
  console.log(err);
  return {success: false , error:true};
 }
};


export const updateSubject = async (currentState: CurrentState, data: SubjectSchema) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    });

    // This will force the subjects page to get the latest data
    // revalidatePath("/subjects");

    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

export const deleteSubject = async ( currentState: CurrentState,  data: FormData) => {
  const id = data.get("id") as string;
  try{
   await prisma.subject.delete({
    where: {
      id: parseInt(id),
    }
   });
   return {success: true , error:false};
   // revalidatePath("/subjects");
  }catch(err){
   console.log(err);
   return {success: false , error:true};
  }
 };
