/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
  {
    id: "principal",
    title: "Principal",
    type: "basic",
    icon: "heroicons_outline:home",
    link: "/principal",
  },
  {
    type: "divider",
  },
  {
    id: "usuario",
    title: "Usuário",
    type: "aside",
    icon: "heroicons_outline:identification",
    children: [
      {
        id: "cadastro-usuario",
        title: "Cadastro Usuário",
        type: "basic",
        link: "/usuario/cadastro",
        tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Usuário",
      },
      {
        id: "cadastro-perfil",
        title: "Cadastro Perfil de Acesso",
        type: "basic",
        link: "/usuario/perfil",
        tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Perfil",
      },
      {
        id: "cadastro-dados-pessoais",
        title: "Cadastro Perfil de Acesso",
        type: "basic",
        link: "/usuario/dados-pessoais",
        tooltip:
          "Espaço para Cadastrar, Editar, Listar e Inativar um Dados Pessoais",
      },
    ],
  },
  {
    id: "secretaria",
    title: "Secretaria",
    type: "aside",
    icon: "heroicons_outline:briefcase",
    children: [
      {
        id: "estudante",
        title: "Estudante",
        type: "collapsable",
        icon: "heroicons_outline:user-circle",
        children: [
          {
            id: "cadastro-estudante",
            title: "Cadastro Estudante",
            type: "basic",
            link: "/secretaria/estudante",
            tooltip:
              "Espaço para Cadastrar, Editar, Listar e Inativar um Estudante",
          },
        ],
      },
      
    ],
  },
  {
    id: "academico",
    title: "Acadêmico",
    type: "aside",
    icon: "heroicons_outline:user-group",
    children: [
      {
        id: "turma",
        title: "Turma",
        type: "collapsable",
        icon: "heroicons_outline:user-circle",
        children: [
          {
            id: "cadastro-turma",
            title: "Cadastro Turma",
            type: "basic",
            link: "/academico/turma",
            tooltip:
              "Espaço para Cadastrar, Editar, Listar e Inativar uma Turma",
          },
          {
            id: "meus-cursos",
            title: "Meus Cursos",
            type: "basic",
            link: "/academico/turma/meus-cursos",
            tooltip:
              "Espaço para Cadastrar e Editar Pauta",
          },
        ],
      },
      {
        id: "disciplina",
        title: "Disciplina",
        type: "collapsable",
        icon: "heroicons_outline:user-circle",
        children: [
          {
            id: "cadastro-disciplina",
            title: "Cadastro Disciplina",
            type: "basic",
            link: "/academico/disciplina",
            tooltip:
              "Espaço para Cadastrar, Editar, Listar e Inativar uma Disciplina",
          },
        ],
      },
      {
        id: "instrutor",
        title: "Instrutor",
        type: "collapsable",
        icon: "heroicons_outline:user-circle",
        children: [
          {
            id: "cadastro-instrutor",
            title: "Cadastro Instrutor",
            type: "basic",
            link: "/academico/instrutor",
            tooltip:
              "Espaço para Cadastrar, Editar, Listar e Inativar uma Instrutor",
          },
        ],
      },
      {
        id: "periodos-letivos",
        title: "Pediodos Letivos",
        type: "collapsable",
        icon: "heroicons_outline:user-circle",
        children: [
          {
            id: "cadastro-periodos-letivos",
            title: "Cadastro Periodos Letivos",
            type: "basic",
            link: "/academico/periodo-letivo",
            tooltip:
              "Espaço para Cadastrar, Editar, Listar e Inativar um Periodos Letivos",
          },
        ],
      },
    ],
  },
  {
    id: "financeiro",
    title: "Financeiro",
    type: "aside",
    icon: "heroicons_outline:currency-dollar",
    children: [
      {
        id: "cadastro-transacao",
        title: "Cadastro Transação",
        type: "basic",
        link: "/financeiro/transacao",
        tooltip:
          "Espaço para Cadastrar, Editar, Listar e Inativar uma Transação",
      },
    ],
  },
  {
    id: "servico-social",
    title: "Serviço Social",
    type: "aside",
    icon: "heroicons_outline:clipboard-list",
    children: [
      {
        id: "cadastro-entrevista",
        title: "Cadastro Entrevista",
        type: "basic",
        link: "/servico-social/entrevista",
        tooltip:
          "Espaço para Cadastrar, Editar, Listar e Inativar uma Entrevista",
      },
    ],
  },
  {
    id: "monitoramento",
    title: "Monitoramento",
    type: "aside",
    icon: "heroicons_outline:document-report",
    children: [
      {
        id: "relatorio-a",
        title: "Relatório A",
        type: "basic",
        link: "/monitoramento/relatorio-a",
        tooltip: "Geração do relatório A",
      },
    ],
  },
  {
    id: "administrativo",
    title: "Administrativo",
    type: "aside",
    icon: "heroicons_outline:adjustments",
    children: [
      {
        id: "rotina",
        title: "Rotina",
        type: "basic",
        icon: "heroicons_outline:refresh",
        link: "/administrativo/rotina",
        tooltip: "Gerenciamento das Rotinas",
      },
    ],
  },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'principal',
        title: 'Principal',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/principal'
    },
    {
        type: 'divider',
    },
    {
        id: 'usuario',
        title: 'Usuário',
        type: 'aside',
        icon: 'heroicons_outline:identification',
        children: [
            {
                id: 'cadastro-usuario',
                title: 'Cadastro Usuário',
                type: 'basic',
                link: '/usuario/cadastro',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Usuário"
            },
            {
                id: 'cadastro-perfil',
                title: 'Cadastro Perfil de Acesso',
                type: 'basic',
                link: '/usuario/perfil',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Perfil"
            },
            {
                id: 'cadastro-dados-pessoais',
                title: 'Cadastro Perfil de Acesso',
                type: 'basic',
                link: '/usuario/dados-pessoais',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Dados Pessoais"
            }
        ]
    },
    {
        id: 'secretaria',
        title: 'Secretaria',
        type: 'aside',
        icon: 'heroicons_outline:briefcase',
        children: [
            {
                id: 'estudante',
                title: 'Estudante',
                type: 'collapsable',
                icon: 'heroicons_outline:user-circle',
                children: [
                    {
                        id: 'cadastro-estudante',
                        title: 'Cadastro Estudante',
                        type: 'basic',
                        link: '/secretaria/estudante',
                        tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Estudante"
                    },

                ]
            },
            {
                id: 'disciplina',
                title: 'Disciplina',
                type: 'collapsable',
                icon: 'heroicons_outline:user-circle',
                children: [
                    {
                        id: 'cadastro-disciplina',
                        title: 'Cadastro Disciplina',
                        type: 'basic',
                        link: '/secretaria/disciplina',
                        tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar uma Disciplina"
                    }

                ]
            },
            {
                id: 'periodos-letivos',
                title: 'Pediodos Letivos',
                type: 'collapsable',
                icon: 'heroicons_outline:user-circle',
                children: [
                    {
                        id: 'cadastro-periodos-letivos',
                        title: 'Cadastro Periodos Letivos',
                        type: 'basic',
                        link: '/academico/periodo-letivo',
                        tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Periodos Letivos"
                    }

                ]
            }
        ]
    },
    {
        id: 'academico',
        title: 'Acadêmico',
        type: 'aside',
        icon: 'heroicons_outline:user-group',
        children: [
            {
                id: 'cadastro-turma',
                title: 'Cadastro Turma',
                type: 'basic',
                link: '/academico/turma',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar uma Turma"

            }
        ]
    },
    {
        id: 'financeiro',
        title: 'Financeiro',
        type: 'aside',
        icon: 'heroicons_outline:currency-dollar',
        children: [
            {
                id: 'cadastro-transacao',
                title: 'Cadastro Transação',
                type: 'basic',
                link: '/financeiro/transacao',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar uma Transação"

            }
        ]
    },
    {
        id: 'servico-social',
        title: 'Serviço Social',
        type: 'aside',
        icon: 'heroicons_outline:clipboard-list',
        children: [
            {
                id: 'cadastro-entrevista',
                title: 'Cadastro Entrevista',
                type: 'basic',
                link: '/servico-social/entrevista',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar uma Entrevista"

            }
        ]
    },
    {
        id: 'monitoramento',
        title: 'Monitoramento',
        type: 'aside',
        icon: 'heroicons_outline:document-report',
        children: [
            {
                id: 'relatorio-a',
                title: 'Relatório A',
                type: 'basic',
                link: '/monitoramento/relatorio-a',
                tooltip: "Geração do relatório A"

            }
        ]
    },{
        id: 'administrativo',
        title: 'Administrativo',
        type: 'aside',
        icon: 'heroicons_outline:adjustments',
        children: [
            {
                id: 'rotina',
                title: 'Rotina',
                type: 'basic',
                icon: 'heroicons_outline:refresh',
                link: '/administrativo/rotina',
                tooltip: "Gerenciamento das Rotinas"
            }
        ]
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'principal',
        title: 'Principal',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/principal'
    },
    {
        type: 'divider',
    },
    {
        id: 'usuario',
        title: 'Usuário',
        type: 'aside',
        icon: 'heroicons_outline:identification',
        children: [
            {
                id: 'cadastro-usuario',
                title: 'Cadastro Usuário',
                type: 'basic',
                link: '/usuario/cadastro',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Usuário"
            },
            {
                id: 'cadastro-perfil',
                title: 'Cadastro Perfil de Acesso',
                type: 'basic',
                link: '/usuario/perfil',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Perfil"
            },
            {
                id: 'cadastro-dados-pessoais',
                title: 'Cadastro Perfil de Acesso',
                type: 'basic',
                link: '/usuario/dados-pessoais',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Dados Pessoais"
            }
        ]
    },
    {
        id: 'secretaria',
        title: 'Secretaria',
        type: 'aside',
        icon: 'heroicons_outline:briefcase',
        children: [
            {
                id: 'estudante',
                title: 'Estudante',
                type: 'collapsable',
                icon: 'heroicons_outline:user-circle',
                children: [
                    {
                        id: 'cadastro-estudante',
                        title: 'Cadastro Estudante',
                        type: 'basic',
                        link: '/secretaria/estudante',
                        tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Estudante"
                    },

                ]
            },
            {
                id: 'disciplina',
                title: 'Disciplina',
                type: 'collapsable',
                icon: 'heroicons_outline:user-circle',
                children: [
                    {
                        id: 'cadastro-disciplina',
                        title: 'Cadastro Disciplina',
                        type: 'basic',
                        link: '/secretaria/disciplina',
                        tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar uma Disciplina"
                    }

                ]
            },
            {
                id: 'periodos-letivos',
                title: 'Pediodos Letivos',
                type: 'collapsable',
                icon: 'heroicons_outline:user-circle',
                children: [
                    {
                        id: 'cadastro-periodos-letivos',
                        title: 'Cadastro Periodos Letivos',
                        type: 'basic',
                        link: '/academico/periodo-letivo',
                        tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Periodos Letivos"
                    }

                ]
            }
        ]
    },
    {
        id: 'academico',
        title: 'Acadêmico',
        type: 'aside',
        icon: 'heroicons_outline:user-group',
        children: [
            {
                id: 'cadastro-turma',
                title: 'Cadastro Turma',
                type: 'basic',
                link: '/academico/turma',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar uma Turma"

            }
        ]
    },
    {
        id: 'financeiro',
        title: 'Financeiro',
        type: 'aside',
        icon: 'heroicons_outline:currency-dollar',
        children: [
            {
                id: 'cadastro-transacao',
                title: 'Cadastro Transação',
                type: 'basic',
                link: '/financeiro/transacao',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar uma Transação"

            }
        ]
    },
    {
        id: 'servico-social',
        title: 'Serviço Social',
        type: 'aside',
        icon: 'heroicons_outline:clipboard-list',
        children: [
            {
                id: 'cadastro-entrevista',
                title: 'Cadastro Entrevista',
                type: 'basic',
                link: '/servico-social/entrevista',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar uma Entrevista"

            }
        ]
    },
    {
        id: 'monitoramento',
        title: 'Monitoramento',
        type: 'aside',
        icon: 'heroicons_outline:document-report',
        children: [
            {
                id: 'relatorio-a',
                title: 'Relatório A',
                type: 'basic',
                link: '/monitoramento/relatorio-a',
                tooltip: "Geração do relatório A"

            }
        ]
    },{
        id: 'administrativo',
        title: 'Administrativo',
        type: 'aside',
        icon: 'heroicons_outline:adjustments',
        children: [
            {
                id: 'rotina',
                title: 'Rotina',
                type: 'basic',
                icon: 'heroicons_outline:refresh',
                link: '/administrativo/rotina',
                tooltip: "Gerenciamento das Rotinas"
            }
        ]
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'principal',
        title: 'Principal',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/principal'
    },
    {
        type: 'divider',
    },
    {
        id: 'usuario',
        title: 'Usuário',
        type: 'aside',
        icon: 'heroicons_outline:identification',
        children: [
            {
                id: 'cadastro-usuario',
                title: 'Cadastro Usuário',
                type: 'basic',
                link: '/usuario/cadastro',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Usuário"
            },
            {
                id: 'cadastro-perfil',
                title: 'Cadastro Perfil de Acesso',
                type: 'basic',
                link: '/usuario/perfil',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Perfil"
            },
            {
                id: 'cadastro-dados-pessoais',
                title: 'Cadastro Perfil de Acesso',
                type: 'basic',
                link: '/usuario/dados-pessoais',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Dados Pessoais"
            }
        ]
    },
    {
        id: 'secretaria',
        title: 'Secretaria',
        type: 'aside',
        icon: 'heroicons_outline:briefcase',
        children: [
            {
                id: 'estudante',
                title: 'Estudante',
                type: 'collapsable',
                icon: 'heroicons_outline:user-circle',
                children: [
                    {
                        id: 'cadastro-estudante',
                        title: 'Cadastro Estudante',
                        type: 'basic',
                        link: '/secretaria/estudante',
                        tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Estudante"
                    },

                ]
            },
            {
                id: 'disciplina',
                title: 'Disciplina',
                type: 'collapsable',
                icon: 'heroicons_outline:user-circle',
                children: [
                    {
                        id: 'cadastro-disciplina',
                        title: 'Cadastro Disciplina',
                        type: 'basic',
                        link: '/secretaria/disciplina',
                        tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar uma Disciplina"
                    }

                ]
            },
            {
                id: 'periodos-letivos',
                title: 'Pediodos Letivos',
                type: 'collapsable',
                icon: 'heroicons_outline:user-circle',
                children: [
                    {
                        id: 'cadastro-periodos-letivos',
                        title: 'Cadastro Periodos Letivos',
                        type: 'basic',
                        link: '/academico/periodo-letivo',
                        tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar um Periodos Letivos"
                    }

                ]
            }
        ]
    },
    {
        id: 'academico',
        title: 'Acadêmico',
        type: 'aside',
        icon: 'heroicons_outline:user-group',
        children: [
            {
                id: 'cadastro-turma',
                title: 'Cadastro Turma',
                type: 'basic',
                link: '/academico/turma',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar uma Turma"

            }
        ]
    },
    {
        id: 'financeiro',
        title: 'Financeiro',
        type: 'aside',
        icon: 'heroicons_outline:currency-dollar',
        children: [
            {
                id: 'cadastro-transacao',
                title: 'Cadastro Transação',
                type: 'basic',
                link: '/financeiro/transacao',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar uma Transação"

            }
        ]
    },
    {
        id: 'servico-social',
        title: 'Serviço Social',
        type: 'aside',
        icon: 'heroicons_outline:clipboard-list',
        children: [
            {
                id: 'cadastro-entrevista',
                title: 'Cadastro Entrevista',
                type: 'basic',
                link: '/servico-social/entrevista',
                tooltip: "Espaço para Cadastrar, Editar, Listar e Inativar uma Entrevista"

            }
        ]
    },
    {
        id: 'monitoramento',
        title: 'Monitoramento',
        type: 'aside',
        icon: 'heroicons_outline:document-report',
        children: [
            {
                id: 'relatorio-a',
                title: 'Relatório A',
                type: 'basic',
                link: '/monitoramento/relatorio-a',
                tooltip: "Geração do relatório A"

            }
        ]
    },{
        id: 'administrativo',
        title: 'Administrativo',
        type: 'aside',
        icon: 'heroicons_outline:adjustments',
        children: [
            {
                id: 'rotina',
                title: 'Rotina',
                type: 'basic',
                icon: 'heroicons_outline:refresh',
                link: '/administrativo/rotina',
                tooltip: "Gerenciamento das Rotinas"
            }
        ]
    }
];
