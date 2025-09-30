import React from "react";
import Skeleton from "../atoms/Skeleton";
import { PaymentProps } from "@/lib/types";

const PaymentStatus = ({ status, errorMsg }: PaymentProps) => {
  if (status === "processing") {
    return (
      <div className="flex items-center gap-3">
        <Skeleton width={28} height={28} className="rounded-full" />
        <span className="text-sm text-gray-600">Processing payment...</span>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="p-3 bg-emerald-50 rounded-lg text-emerald-700 text-sm font-medium">
        Payment succeeded 🎉 — order placed!
      </div>
    );
  }

  if (status === "failure") {
    return (
      <div className="p-3 bg-rose-50 rounded-lg text-rose-700 text-sm font-medium">
        Payment failed — {errorMsg ?? "please try another card"}.
      </div>
    );
  }

  return null;
};

export default PaymentStatus;
