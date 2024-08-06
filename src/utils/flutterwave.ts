import forge from "node-forge";
import axios from "axios";

interface TransferData {
  account_bank: string;
  account_number: string;
  amount: number;
  currency?: string;
  beneficiary_name: string;
}

interface CardChargeData {
  amount: number;
  currency?: string;
  card_number: string;
  cvv: string;
  expiry_month: string;
  expiry_year: string;
  email: string;
  tx_ref: string;
  name: string;
  pin: string;
}

interface ValidateChargeData {
  otp: string;
  flw_ref: string;
}

interface BankTransferData {
  amount: number;
  email: string;
  currency: string;
  tx_ref: string;
}

interface BankWithdrawalData {
  account_bank: string;
  account_number: string;
  amount: number;
  email: string;
  tx_ref: string;
  currency: string;
}

interface VerifyAccountData {
  accountNumber: string;
  bankCode: string;
}

class Flutterwave {
  private secretKey: string;
  private publicKey: string;
  private encryptKey: string;

  constructor(secretKey: string, publicKey: string, encryptKey: string) {
    this.secretKey = secretKey;
    this.publicKey = publicKey;
    this.encryptKey = encryptKey;
  }

  private encrypt(text: string): string {
    const key = this.encryptKey;
    const cipher = forge.cipher.createCipher(
      "3DES-ECB",
      forge.util.createBuffer(key)
    );
    cipher.start({ iv: "" });
    cipher.update(forge.util.createBuffer(text, "utf8"));
    cipher.finish();
    const encrypted = cipher.output;
    return forge.util.encode64(encrypted.getBytes());
  }

  async transferToBank(data: TransferData): Promise<any> {
    try {
      const {
        account_bank,
        account_number,
        amount,
        currency = "NGN",
        beneficiary_name,
      } = data;

      const transferData = {
        account_bank,
        account_number,
        amount,
        currency,
        beneficiary_name,
      };

      const endpoint = "https://api.flutterwave.com/v3/transfers";

      const response = await axios.post(endpoint, transferData, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });
      return {
        success: true,
        ...response.data,
      };
    } catch (err: any) {
      return {
        success: false,
        ...err.response.data,
      };
    }
  }

  async chargeCard(data: CardChargeData): Promise<any> {
    try {
      const {
        amount,
        currency = "NGN",
        card_number,
        cvv,
        expiry_month,
        expiry_year,
        email,
        tx_ref,
        name,
        pin,
      } = data;

      const chargeData = {
        amount,
        currency,
        card_number,
        cvv,
        expiry_month,
        expiry_year,
        email,
        name,
        tx_ref,
        authorization: {
          mode: "pin",
          pin,
        },
      };

      const encryptData = {
        client: this.encrypt(JSON.stringify(chargeData)),
      };

      const endpoint = "https://api.flutterwave.com/v3/charges?type=card";

      const response = await axios.post(endpoint, encryptData, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });
      return {
        success: true,
        ...response.data,
      };
    } catch (err: any) {
      return {
        success: false,
        ...err.response.data,
      };
    }
  }

  async validateCharge(data: ValidateChargeData): Promise<any> {
    try {
      const { otp, flw_ref } = data;

      const validateData = {
        otp,
        flw_ref,
      };

      const endpoint = "https://api.flutterwave.com/v3/validate-charge";
      const response = await axios.post(endpoint, validateData, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });
      return {
        success: true,
        ...response.data,
      };
    } catch (err: any) {
      return {
        success: false,
        ...err.response.data,
      };
    }
  }

  async payWithBankTransfer(data: BankTransferData): Promise<any> {
    try {
      const { amount, email, currency, tx_ref } = data;

      const chargeData = {
        amount,
        email,
        currency,
        tx_ref,
      };

      const endpoint =
        "https://api.flutterwave.com/v3/charges?type=bank_transfer";
      const response = await axios.post(endpoint, chargeData, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });
      return {
        success: true,
        ...response.data,
      };
    } catch (err: any) {
      return {
        success: false,
        ...err.response.data,
      };
    }
  }

  async payWithBankWithdrawal(data: BankWithdrawalData): Promise<any> {
    try {
      const { account_bank, account_number, amount, email, tx_ref, currency } =
        data;
      const chargeData = {
        account_bank,
        account_number,
        amount,
        email,
        tx_ref,
        currency,
      };
      const endpoint =
        "https://api.flutterwave.com/v3/charges?type=debit_ng_account";
      const response = await axios.post(endpoint, chargeData, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });
      return {
        success: true,
        ...response.data,
      };
    } catch (err: any) {
      return {
        success: false,
        ...err.response.data,
      };
    }
  }

  async verifyAccountNumber(data: VerifyAccountData): Promise<any> {
    try {
      const { accountNumber, bankCode } = data;
      const toBeSentData = {
        account_number: accountNumber,
        account_bank: bankCode,
      };
      const endpoint = "https://api.flutterwave.com/v3/accounts/resolve";
      const response = await axios.post(endpoint, toBeSentData, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });
      return {
        success: true,
        ...response.data,
      };
    } catch (err: any) {
      return {
        success: false,
        ...err.response.data,
      };
    }
  }
}

export default Flutterwave;
