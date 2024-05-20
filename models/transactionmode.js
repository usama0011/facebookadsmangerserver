import mongoose from "mongoose";

const { Schema } = mongoose;

const transactionSchema = new Schema(
    {

        TransactionID: {
            type: String,
        },
        Date: {
            type: String,
        },
        Amount: {
            type: String,
        },

        Paymentmethod: {
            type: String,
        },
        Paymentstatus: {
            type: String,
        },
        Date: {
            type: String,
        },
        Date: {
            type: String,
        },
        PaymentStatus: {
            type: String,
        },
        VATinvoiceID: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
