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

