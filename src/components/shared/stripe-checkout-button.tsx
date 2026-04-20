"use client";
import { stripeCheckoutSession } from "@/app/(commonLayout)/pricing/_action";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const StripeCheckoutButton = () => {
  const router = useRouter();

  const handleCheckout = async () => {
    const res = await stripeCheckoutSession();

    if (res.success) {
      router.push(res.paymentUrl!);
    } else {
      toast.error(res.message);
    }
  };
  
  return <Button onClick={handleCheckout}>Pay With Stripe</Button>;
};

export default StripeCheckoutButton;
