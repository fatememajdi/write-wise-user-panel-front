export type Transaction = {
    id: string,
    shortId: string,
    invoiceNumber: string,
    paymentServiceType: string,
    originalAmount: number,
    discountPercent: number,
    amountAfterDiscount: number,
    amountPaidShow: string,
    tax: number,
    tokenNumber: number,
    currency: string,
    paymentStatus: string,
    paidDate: number
}