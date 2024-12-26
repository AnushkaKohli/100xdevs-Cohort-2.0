"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

const createOnrampTransaction = async (provider: string, amount: number) => {
  // Ideally the token should come from the banking provider (hdfc/axis)
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  //   This token would come from hdfc bank server
  //   const token = await axios.get("https://api.hdfc.com/getToken", {
  //      amount:
  //   });
  const token = (Math.random() * 1000).toString();
  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token,
      userId: Number(session?.user?.id),
      // Because we will always store amount in paisa as we dont want any decimals in the database. Ideally this is done on client side.
      amount: amount * 100,
    },
  });
  return {
    message: "Done",
  };
};

export default createOnrampTransaction;
