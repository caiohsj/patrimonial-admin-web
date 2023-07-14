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
      selectBranch: 'Selecione uma filial',
      selectPlace: 'Selecione um local',
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
          branch: 'Filial',
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
    costCentersView: {
      table: {
        title: 'Centros de Custos',
        headers: {
          id: 'ID',
          description: 'Descrição',
        },
      },
    },
    createCostCentersView: {
      form: {
        title: 'Centro de Custo',
        labels: {
          description: 'Descrição',
        },
        submit: 'Salvar',
      },
    },
    editCostCentersView: {
      form: {
        title: 'Centro de Custo #{id}',
        labels: {
          description: 'Descrição',
        },
        submit: 'Salvar',
      },
    },
    materialPossessionsView: {
      table: {
        title: 'Bens',
        headers: {
          id: 'ID',
          description: 'Descrição',
          number: 'Número',
        },
      },
    },
    createMaterialPossessionsView: {
      form: {
        title: 'Adicionar um bem',
        labels: {
          number: 'Número',
          description: 'Descrição',
          images: 'Adicionar imagem',
        },
        submit: 'Salvar',
        nextStep: 'Avançar',
        stepTwo: {
          labelImages: 'Imagens',
          countImages: '{count} imagem(ns)',
        },
      },
    },
    bulkCreateMaterialPossessionsView: {
      form: {
        title: 'Adicionar múltiplos bens',
        labels: {
          from: 'De',
          to: 'Até',
          numberPrefix: 'Prefixo do número',
          description: 'Descrição',
          images: 'Adicionar imagem',
        },
        submit: 'Salvar',
        nextStep: 'Avançar',
        stepTwo: {
          labelImages: 'Imagens',
          countImages: '{count} imagem(ns)',
        },
      },
    },
    rolesView: {
      table: {
        title: 'Cargos',
        headers: {
          id: 'ID',
          name: 'Nome',
        },
      },
    },
    createRolesView: {
      form: {
        title: 'Adicionar um cargo',
        labels: {
          name: 'Nome do cargo',
          permissions: 'Permissões',
        },
        submit: 'Salvar',
        nextStep: 'Avançar',
        stepTwo: {},
      },
    },
    usersView: {
      table: {
        title: 'Usuários',
        headers: {
          id: 'ID',
          name: 'Nome',
          email: 'E-mail',
          role_name: 'Cargo',
        },
      },
    },
    createUsersView: {
      form: {
        title: 'Adicionar um novo usuário',
        labels: {
          name: 'Nome',
          email: 'Email',
          role: 'Cargo do usuário',
        },
        submit: 'Salvar',
        nextStep: 'Avançar',
        stepTwo: {},
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
          costCenters: 'Centros de Custos',
          materialPossessions: 'Bens',
          roles: 'Cargos',
          users: 'Usuários',
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
