export type forWhatProps = "payment_history" | "recent_transaction";

export enum TransactionCategory {
  RENT = "RENT",
  SECURITY = "SECURITY",
  UTILITY = "UTILITY",
  ELECTRICITY = "ELECTRICITY",
  WALLET_FUNDING = "WALLET_FUNDING",
}

export type transactionDataProps = {
  id: string;
  userId: string;
  reference: string;
  amount: number;
  chargeBack: number;
  type: string;
  category: string;
  narration: string;
  status: string;
  metadata: {
    costOfUnit: number;
    merchantId: string;
    paidamount: number;
    token: string;
    unit: number;
  };
  createdAt: string;
  updatedAt: string;
};
