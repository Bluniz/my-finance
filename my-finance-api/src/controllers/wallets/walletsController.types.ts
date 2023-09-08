export interface WalletCreateBody {
  userId: string;
  name: string;
  description: string;
}

export interface WalletListParams {
  userId: string;
}

export interface WalletDeleteParams {
  walletId: string;
}

export interface WalletUpdateBody {
  name: string;
  description: string;
  walletId: string;
}
