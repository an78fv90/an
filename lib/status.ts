export const ORDER_FLOW = ["BOOKING_CONFIRMED","CASTING_SCHEDULED","CASTING_COMPLETED","PREPARATION","FINISHING","FRAMING","QUALITY_CHECK","SHIPPED","DELIVERED"] as const;
export const stageIndex = (s: string) => Math.max(0, ORDER_FLOW.indexOf(s as never));
export const BOOKING_STATUS = ["PENDING","CONFIRMED","COMPLETED","CANCELLED"] as const;
export const PAY_STATUS = ["PENDING","PAID","FAILED","REFUNDED"] as const;
export const fmt = (d: Date) => d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
