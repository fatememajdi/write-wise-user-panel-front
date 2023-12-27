export type Package = {
    id: string,
    name: string,
    discountPercent: number,
    currencyName: string,
    originalAmount: number,
    description: string,
    title: string,
    subDescription: string,
    amountWithDiscount: number,
    showingPrice: string,
    showingPriceWithDiscount: string,
    currency: string,
    adjustableQuantity: boolean,
    discountName: string,
    showingDiscountAmount: string,
    isPopup: boolean,
    flagUrl: string
}