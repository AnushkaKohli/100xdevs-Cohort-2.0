import express from "express";
import db from "@repo/db/client";

const app = express();
app.use(express.json());
const PORT = 3003;

app.post("/hdfcWebhook", async (req, res) => {
  // TODO: Add zod validation here?
  // TODO: HDFC bank should ideally send us a secret so we know this request is sent by them
  // TODO: Check if this onRampTxn is processing or success
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  // Update balance in db, add txn
  try {
    // A transaction is written so that both the updates HAVE to happen. If the server goes down after the first update then the entire thing will rollback, including refund of money as well as the update in balance table
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            // Increment is done instead of updating the amount by adding the balance to previous balance because if 2 requests come at the same time then balance will be updated like:
            // 0 + 200
            // 0 + 400
            // So the user should have 600rs but the user will only have 400rs
            // by using increment, the database will handle the increment
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(200).json({
      message: "Captured",
    });
  } catch (error) {
    console.error("Error updating balance: ", error);
    // If 400 staus code is returned then hdfc bank will refund the money bakc to the user
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003, () => {
  console.log(`Listening to app on port ${PORT}`);
});
