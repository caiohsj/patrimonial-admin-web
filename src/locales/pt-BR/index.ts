export default {
  altLogo: 'SMX Inventários',
  errors: {
    unauthorized: 'Não autorizado',
    responseInvalid: 'Não conseguimos processar sua requisição',
  },
  views: {
    loginView: {
      title: 'Autenticação',
      form: {
        labels: {
          email: 'Email',
          password: 'Senha',
        },
        submit: 'Acessar',
      },
    },
    applicationConfigurationsView: {
      title: 'Configure a aplicação',
      form: {
        labels: {
          branch: 'Filial',
          place: 'Local',
        },
        submit: 'Aplicar',
      },
    },
    branchesView: {
      table: {
        title: 'Filiais',
        headers: {
          id: 'ID',
          description: 'Descrição',
        },
      },
    },
    placesView: {
      table: {
        title: 'Locais',
        headers: {
          id: 'ID',
          description: 'Descrição',
        },
      },
    },
    accountsView: {
      table: {
        title: 'Contas',
        headers: {
          id: 'ID',
          description: 'Descrição',
          tax_rate: 'Taxa Fiscal',
        },
      },
    },
    createAccountsView: {
      form: {
        title: 'Conta',
        labels: {
          description: 'Descrição',
          tax_rate: 'Taxa Fiscal',
        },
        submit: 'Cadastrar',
      },
    },
    editAccountsView: {
      form: {
        title: 'Conta #{id}',
        labels: {
          description: 'Descrição',
          tax_rate: 'Taxa Fiscal',
        },
        submit: 'Salvar',
      },
    },
    createBranchesView: {
      form: {
        title: 'Filial',
        labels: {
          description: 'Descrição',
        },
        submit: 'Cadastrar',
      },
    },
    editBranchesView: {
      form: {
        title: 'Filial #{id}',
        labels: {
          description: 'Descrição',
        },
        submit: 'Salvar',
      },
    },
    createPlacesView: {
      form: {
        title: 'Local',
        labels: {
          description: 'Descrição',
        },
        submit: 'Cadastrar',
      },
    },
    editPlacesView: {
      form: {
        title: 'Local #{id}',
        labels: {
          description: 'Descrição',
        },
        submit: 'Salvar',
      },
    },
  },
  components: {
    headers: {
      appHeader: {
        branch: 'Filial',
        place: 'Local',
        logout: 'Sair',
      },
    },
    navs: {
      asideNav: {
        items: {
          branches: 'Filiais',
          places: 'Locais',
          accounts: 'Contas',
        },
      },
    },
    tables: {
      baseTable: {
        search: 'Pesquisar',
        results: '{count} resultado(s)',
      },
      tableRow: {
        confirmationTitle: 'Você realmente confirma esta ação?',
        buttons: {
          edit: 'Editar',
          delete: 'Apagar',
        },
      },
    },
    feedbacks: {
      confirmationScreen: {
        confirm: 'Sim',
        cancel: 'Cancelar',
      },
    },
  },
};
