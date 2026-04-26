import { Webhooks } from "@dodopayments/nextjs";
import { query } from "@/lib/db";

export const POST = Webhooks({
  webhookKey: process.env.DODO_WEBHOOK_SECRET!,

  onSubscriptionActive: async (payload) => {
    const { data } = payload;
    let userId =
      data.metadata?.client_reference_id ||
      data.metadata?.external_user_id ||
      data.customer?.metadata?.client_reference_id;

    console.log(
      `[SDK Webhook] subscription.active: sub_id=${data.subscription_id}, userId=${userId}`,
    );

    // Fallback: search by email if userId is missing
    if (!userId && data.customer?.email) {
      console.log(
        `[SDK Webhook] userId missing, searching by email: ${data.customer.email}`,
      );
      const userResult = await query(
        "SELECT id FROM users WHERE LOWER(email) = LOWER($1)",
        [data.customer.email],
      );
      if (userResult.rows.length > 0) {
        userId = userResult.rows[0].id;
        console.log(`[SDK Webhook] Found user ${userId} by email`);
      }
    }

    if (userId) {
      console.log(
        `[SDK Webhook] Upgrading user ${userId} to Pro (Subscription Active)`,
      );
      await query(
        "UPDATE users SET is_pro = true, subscription_id = $1, dodo_customer_id = $2, cancel_at_period_end = false WHERE id = $3",
        [data.subscription_id, data.customer?.customer_id, userId],
      );
    } else {
      console.warn(
        "[SDK Webhook] No userId found in subscription.active payload metadata or email search",
      );
    }
  },

  onSubscriptionUpdated: async (payload) => {
    const { data } = payload;
    const userId =
      data.metadata?.client_reference_id ||
      data.metadata?.external_user_id ||
      data.customer?.metadata?.client_reference_id;

    console.log(
      `[SDK Webhook] subscription.updated: sub_id=${data.subscription_id}, status=${data.status}, userId=${userId}`,
    );

    // Dunning: "on_hold" usually happens during payment retries, so we keep Pro access
    const isPro = data.status === "active" || data.status === "on_hold";
    const isCancelled = data.status === "cancelled";

    if (userId) {
      if (isCancelled) {
        await query(
          "UPDATE users SET cancel_at_period_end = true WHERE id = $1",
          [userId],
        );
      } else {
        await query(
          "UPDATE users SET is_pro = $1, subscription_id = $2, cancel_at_period_end = false WHERE id = $3",
          [isPro, data.subscription_id, userId],
        );
      }
    } else {
      // Fallback: search by subscription_id
      if (isCancelled) {
        await query(
          "UPDATE users SET cancel_at_period_end = true WHERE subscription_id = $1",
          [data.subscription_id],
        );
      } else {
        await query(
          "UPDATE users SET is_pro = $1, cancel_at_period_end = false WHERE subscription_id = $2",
          [isPro, data.subscription_id],
        );
      }
    }
  },

  onDunningStarted: async (payload) => {
    const { data } = payload;
    console.log(
      `[SDK Webhook] dunning.started: sub_id=${data.subscription_id}. Access preserved during retries.`,
    );
    // Access is preserved because is_pro remains true while status is 'active' or 'on_hold'
  },

  onDunningRecovered: async (payload) => {
    const { data } = payload;
    console.log(
      `[SDK Webhook] dunning.recovered: sub_id=${data.subscription_id}. User is back in good standing.`,
    );
  },

  onSubscriptionFailed: async (payload) => {
    const { data } = payload;
    console.log(
      `[SDK Webhook] subscription.failed: sub_id=${data.subscription_id}.`,
    );
    // Final failure - revoke access
    await query(
      "UPDATE users SET is_pro = false, cancel_at_period_end = false WHERE subscription_id = $1",
      [data.subscription_id],
    );
  },

  onPaymentSucceeded: async (payload) => {
    const { data } = payload;
    const userId =
      data.metadata?.client_reference_id ||
      data.metadata?.external_user_id ||
      data.customer?.metadata?.client_reference_id;

    console.log(`[SDK Webhook] payment.succeeded: userId=${userId}`);

    if (userId) {
      console.log(
        `[SDK Webhook] Upgrading user ${userId} to Pro (Payment Succeeded)`,
      );
      await query("UPDATE users SET is_pro = true WHERE id = $1", [userId]);
    }
  },

  onSubscriptionCancelled: async (payload) => {
    const { data } = payload;
    const userId =
      data.metadata?.client_reference_id ||
      data.metadata?.external_user_id ||
      data.customer?.metadata?.client_reference_id;

    console.log(
      `[SDK Webhook] subscription.cancelled: sub_id=${data.subscription_id}, userId=${userId}`,
    );

    if (userId) {
      console.log(
        `[SDK Webhook] Marking user ${userId} as cancelled (access remains until expiry)`,
      );
      await query(
        "UPDATE users SET cancel_at_period_end = true WHERE id = $1",
        [userId],
      );
    } else {
      // Fallback: search by subscription_id
      console.log(
        `[SDK Webhook] No userId in metadata, marking as cancelled by sub_id=${data.subscription_id}`,
      );
      await query(
        "UPDATE users SET cancel_at_period_end = true WHERE subscription_id = $1",
        [data.subscription_id],
      );
    }
  },

  onSubscriptionExpired: async (payload) => {
    const { data } = payload;
    const userId =
      data.metadata?.client_reference_id ||
      data.metadata?.external_user_id ||
      data.customer?.metadata?.client_reference_id;

    console.log(
      `[SDK Webhook] subscription.expired: sub_id=${data.subscription_id}, userId=${userId}`,
    );

    if (userId) {
      console.log(
        `[SDK Webhook] Downgrading user ${userId} (Subscription Expired)`,
      );
      await query(
        "UPDATE users SET is_pro = false, subscription_id = NULL, cancel_at_period_end = false WHERE id = $1",
        [userId],
      );
    } else {
      // Fallback: search by subscription_id
      await query(
        "UPDATE users SET is_pro = false, subscription_id = NULL, cancel_at_period_end = false WHERE subscription_id = $1",
        [data.subscription_id],
      );
    }
  },

  onPayload: async (payload) => {
    console.log(`[SDK Webhook] Received ${payload.type} event`);
  },
});
