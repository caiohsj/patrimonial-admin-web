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
    createBranchesView: {
      form: {
        title: 'Filiais',
        labels: {
          description: 'Descrição',
        },
        submit: 'Cadastrar',
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
        },
      },
    },
    tables: {
      baseTable: {
        search: 'Pesquisar',
        results: '{count} resultado(s)',
      },
    },
  },
};
