import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import DodoPayments from "dodopayments";

export async function GET() {
  try {
    const userId = await getUserIdFromRequest();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = process.env.DODO_PAYMENTS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Billing not configured" }, { status: 500 });
    }

    const dodo = new DodoPayments({
      bearerToken: apiKey,
      environment: process.env.NODE_ENV === "production" ? "live_mode" : "test_mode",
    });

    // Note: In a real app, you would fetch the dodo_customer_id from your DB.
    // Dodo also allows searching by email or metadata.
    // For this implementation, we'll use a placeholder or check if Dodo has a direct 'create portal session' by metadata.
    
    // As per Dodo docs, you usually redirect to their customer portal URL
    // which can be pre-authenticated if you have the customer ID.
    // If we don't have it, we can provide the general portal link.
    
    const portalUrl = "https://buy.dodopayments.com/customer-portal";

    return NextResponse.json({ url: portalUrl });
  } catch (error) {
    console.error("Billing Portal Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
