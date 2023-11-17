import { useReducer } from "react";
import supabase, { supabaseUrl } from "./supabase";

export async function getUsers() {
  const { data, error } = await supabase.from("owner").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function deketetUsers(id) {
  const { data, error } = await supabase.from("owner").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("User could not deleted 🤔");
  }

  return data;
}

export async function addUsers(userData, id) {
  const hasImagePAth = userData.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${userData.image.name}`.replaceAll(
    "/",
    ""
  );

  console.log(userData.image);
  const imagePath = hasImagePAth
    ? userData.image
    : `${supabaseUrl}/storage/v1/object/public/owners/${imageName}`;

  let query = supabase.from("owner");

  if (!id) query = query.insert([{ ...userData, image: imagePath }]);
  if (id)
    query = query
      .update({ ...userData, image: imagePath })
      .eq("id", userData.id);
  const { data, error } = await query.select();

  if (error) {
    throw new Error("User could not added 🤔");
  }

  const { data: img, error: errStorage } = await supabase.storage
    .from("owners")
    .upload(imageName, userData.image);
  // if (errStorage) await supabase.from("owner").delete().eq("id", data.id);
  return data;
}
