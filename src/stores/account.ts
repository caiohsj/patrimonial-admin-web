import { defineStore } from 'pinia';
import type { Account } from '@/@types/interfaces/models/account';
import type { CreateAccountFormData } from '@/@types/interfaces/CreateAccountFormData';
import AccountResource from '@/api/resources/account';

type AccountStoreState = {
  accounts: Array<Account>;
  account: Account | null;
};

export const useAccountStore = defineStore('account', {
  state: (): AccountStoreState => ({
    accounts: [],
    account: null,
  }),

  getters: {},

  actions: {
    async fetchAccounts() {
      const { data } = await AccountResource.index();
      this.accounts = data;
    },

    createAccount(params: CreateAccountFormData) {
      return AccountResource.create(params);
    },

    async fetchAccount(id: number) {
      const { data } = await AccountResource.show(id);
      this.account = data;
    },

    updateAccount(params: CreateAccountFormData, id: number) {
      return AccountResource.update(params, id);
    },

    async deleteAccount(account: Account) {
      await AccountResource.delete(account);
      this.fetchAccounts();
    },
  },
});
