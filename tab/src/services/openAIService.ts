import { callFunction } from "./callFunction";

export async function textCompletion(text: string): Promise<string> {
  try {
    const response = await callFunction("callOai", "post", undefined, text);
    return response?.choice;
  } catch (e: any) {
    console.log(e);
    return e?.message;
  }
}
