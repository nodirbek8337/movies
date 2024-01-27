import { connect, ConnectOptions } from "mongoose";

export const dbConnect = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI muhit o'zgaruvchisi aniqlanmagan");
    }

    await connect(process.env.MONGO_URI, {} as ConnectOptions);
    console.log("Ulanish muvaffaqiyatli amalga oshirildi");
  } catch (error) {
    console.error("Xatolik sodir bo'ldi:", error);
  }
};