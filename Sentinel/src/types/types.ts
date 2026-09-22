export type VaultItemType = "login" | "api_key" | "secure_note";

export interface VaultItem {
  id: string;
  type: VaultItemType;
  name: string;
  ciphertext: string;
  iv: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}


export interface MockCredential {
  id: string;
  type: "login";
  name: string;
  username: string;
  password: string;
  url?: string;
}