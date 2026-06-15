const documentacao = {
    openapi: "3.0.3",

    info: {
        title: "API Produtos + Avaliações",
        description: "Documentação completa da API de produtos, setores e avaliações separadas por contexto",
        version: "1.0.0"
    },

    servers: [
        // {
        //     url: "http://localhost:3000",
        //     description: "Local"
        // },
        {
            url: "https://triangulo-alimentos.vercel.app",
            description: "Vercel"
        }
    ],

    tags: [
        { name: "Administradores", description: "Gestão de administradores" },
        { name: "Categorias", description: "Gestão de categorias" },
        { name: "Dashboard", description: "Indicadores gerais do sistema" },
        { name: "Produtos", description: "Gestão de produtos" },
        { name: "Setores", description: "Gestão de setores" },
        { name: "Avaliações Produtos", description: "Avaliações relacionadas a produtos" },
        { name: "Avaliações Setores", description: "Avaliações relacionadas a setores" },
        { name: "Autenticação", description: "Valida login e fornece token" }
    ],

    paths: {

        // DASHBOARD
// DashboardResumo 
        "/dashboard/resumo": {
            get: {
                tags: ["Dashboard"],
                summary: "Resumo geral do sistema",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: "Retorna métricas gerais como total de produtos, categorias, setores e avaliações",
                responses: {
                    200: {
                        description: "Resumo retornado com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/DashboardResumo" 
                                    //! DashboardResumo NAO EXISTE, gerar uma depois..
                                }
                            }
                        }
                    }
                }
            }
        },

        "/dashboard/produtos": {
            get: {
                tags: ["Dashboard"],
                summary: "Estatísticas de produtos",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: "Retorna produto mais e menos avaliado",
                responses: {
                    200: {
                        description: "Dados retornados com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/DashboardProdutos"
                                }
                            }
                        }
                    }
                }
            }
        },

        "/dashboard/avaliacoes": {
            get: {
                tags: ["Dashboard"],
                summary: "Médias de avaliações",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: "Retorna média geral de avaliações de produtos e setores",
                responses: {
                    200: {
                        description: "Dados retornados com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/DashboardAvaliacoes"
                                }
                            }
                        }
                    }
                }
            }
        },

        "/dashboard/setores": {
            get: {
                tags: ["Dashboard"],
                summary: "Estatísticas de setores",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                description: "Retorna melhor e pior setor com base nas avaliações",
                responses: {
                    200: {
                        description: "Dados retornados com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/DashboardSetores"
                                }
                            }
                        }
                    }
                }
            }
        },

        // ADMINISTRADORES

        "/administradores": {
            get: {
                tags: ["Administradores"],
                summary: "Listar administradores",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "Lista retornada com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Administrador" }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Administradores"],
                summary: "Criar administrador",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/AdministradorCreate" }
                        }
                    }
                },
                responses: {
                    201: { description: "Administrador criado com sucesso" }
                }
            }
        },

        "/administradores/{id_administrador}": {
            put: {
                tags: ["Administradores"],
                summary: "Atualizar administrador",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id_administrador",
                        in: "path",
                        required: true,
                        schema: { type: "integer" }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/AdministradorCreate" }
                        }
                    }
                },
                responses: {
                    200: { description: "Atualizado com sucesso" }
                }
            },
            delete: {
                tags: ["Administradores"],
                summary: "Remover administrador",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id_administrador",
                        in: "path",
                        required: true,
                        schema: { type: "integer" }
                    }
                ],
                responses: {
                    200: { description: "Removido com sucesso" }
                }
            }
        },

        "/login": {
            post: {
                tags: ['Autenticação'],
                summary: 'Realizar Login',
                description: "Autentica um usuario e retorna id e nome",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Login_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Login realizado com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Resposta_Login"
                                }
                            }
                        }
                    },
                    400: { description: "Email e senha são obrigatorios" },
                    401: { description: "Credenciais inválidas" },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },


        // CATEGORIAS

        "/categorias": {
            get: {
                tags: ["Categorias"],
                summary: "Listar categorias",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "Lista retornada com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Categoria" }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Categorias"],
                summary: "Criar categoria",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/CategoriaCreate" }
                        }
                    }
                },
                responses: {
                    201: { description: "Categoria criada com sucesso" }
                }
            }
        },

        "/categorias/{id_categoria}": {
            put: {
                tags: ["Categorias"],
                summary: "Atualizar categoria",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        schema: { type: "integer" }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/CategoriaCreate" }
                        }
                    }
                },
                responses: {
                    200: { description: "Atualizado com sucesso" }
                }
            },
            delete: {
                tags: ["Categorias"],
                summary: "Remover categoria",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        schema: { type: "integer" }
                    }
                ],
                responses: {
                    200: { description: "Removido com sucesso" }
                }
            }
        },

        // PRODUTOS

        "/produtos": {
            get: {
                tags: ["Produtos"],
                summary: "Listar produtos",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "Lista retornada com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Produto" }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Produtos"],
                summary: "Criar produto",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ProdutoCreate" }
                        }
                    }
                },
                responses: {
                    201: { description: "Produto criado com sucesso" }
                }
            }
        },

        "/produtos/{id_produto}": {
            put: {
                tags: ["Produtos"],
                summary: "Atualizar produto",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id_produto",
                        in: "path",
                        required: true,
                        schema: { type: "integer" }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ProdutoCreate" }
                        }
                    }
                },
                responses: {
                    200: { description: "Atualizado com sucesso" }
                }
            },
            delete: {
                tags: ["Produtos"],
                summary: "Remover produto",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id_produto",
                        in: "path",
                        required: true,
                        schema: { type: "integer" }
                    }
                ],
                responses: {
                    200: { description: "Removido com sucesso" }
                }
            }
        },

        // SETORES

        "/setores": {
            get: {
                tags: ["Setores"],
                summary: "Listar setores",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "Lista retornada com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Setor" }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Setores"],
                summary: "Criar setor",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/SetorCreate" }
                        }
                    }
                },
                responses: {
                    201: { description: "Setor criado com sucesso" }
                }
            }
        },

        "/setores/{id_setor}": {
            put: {
                tags: ["Setores"],
                summary: "Atualizar setor",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id_setor",
                        in: "path",
                        required: true,
                        schema: { type: "integer" }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/SetorCreate" }
                        }
                    }
                },
                responses: {
                    200: { description: "Atualizado com sucesso" }
                }
            },
            delete: {
                tags: ["Setores"],
                summary: "Remover setor",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id_setor",
                        in: "path",
                        required: true,
                        schema: { type: "integer" }
                    }
                ],
                responses: {
                    200: { description: "Removido com sucesso" }
                }
            }
        },

        // AVALIAÇÕES PRODUTOS

        "/avaliacoes-produtos": {
            get: {
                tags: ["Avaliações Produtos"],
                summary: "Listar avaliações de produtos",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "Lista retornada com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/AvaliacaoProduto" }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Avaliações Produtos"],
                summary: "Criar avaliação de produto",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/AvaliacaoProdutoCreate" }
                        }
                    }
                },
                responses: {
                    201: { description: "Avaliação criada com sucesso" }
                }
            }
        },

        "/avaliacoes-produtos/{id_avaliacao}": {
            delete: {
                tags: ["Avaliações Produtos"],
                summary: "Remover avaliação de produto",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id_avaliacao",
                        in: "path",
                        required: true,
                        schema: { type: "integer" }
                    }
                ],
                responses: {
                    200: { description: "Removido com sucesso" }
                }
            }
        },

        // AVALIAÇÕES SETORES

        "/avaliacoes-setores": {
            get: {
                tags: ["Avaliações Setores"],
                summary: "Listar avaliações de setores",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "Lista retornada com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/AvaliacaoSetor" }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Avaliações Setores"],
                summary: "Criar avaliação de setor",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/AvaliacaoSetorCreate" }
                        }
                    }
                },
                responses: {
                    201: { description: "Avaliação criada com sucesso" }
                }
            }
        },

        "/avaliacoes-setores/{id_avaliacao}": {
            delete: {
                tags: ["Avaliações Setores"],
                summary: "Remover avaliação de setor",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id_avaliacao",
                        in: "path",
                        required: true,
                        schema: { type: "integer" }
                    }
                ],
                responses: {
                    200: { description: "Removido com sucesso" }
                }
            }
        }

        // LOGIN
    },
    // SCHEMA

    components: {
        securitySchemes:{bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Insira o token jwt obtido do login'
        }},

        schemas: {

            Administrador: {
                type: "object",
                properties: {
                    id_administrador: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Admin" },
                    email: { type: "string", example: "admin@email.com" }
                }
            },

            AdministradorCreate: {
                type: "object",
                properties: {
                    nome: { type: "string", example: "Admin" },
                    email: { type: "string", example: "admin@email.com" },
                    senha: { type: "string", example: "123" }
                }
            },

            Login_Usuario: {
                type: 'object',
                required: true,
                properties: {
                    email: { type: "string", example: "geraldo.alq@email.com" },
                    senha: { type: "string", example: "SenhaSemCriptografia" }
                }
            },


            Resposta_Login: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Login realizado com sucesso' },
                    token: {
                        type: 'string',
                        description: 'Token JWT gerado',
                        example: 'jdfdfdjkdjfdfdjhdfdk'
                    },
                    usuario: {
                        type: 'object',
                        properties: {
                            id_usuario: { type: "string", example: 1 },
                            nome: { type: "string", example: "Ricardo" },
                        }
                    }
                }
            },


            Categoria: {
                type: "object",
                properties: {
                    id_categoria: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Eletrônicos" },
                    descricao: { type: "string", example: "Produtos eletrônicos" }
                }
            },

            CategoriaCreate: {
                type: "object",
                properties: {
                    nome: { type: "string", example: "Eletrônicos" },
                    descricao: { type: "string", example: "Produtos eletrônicos" }
                }
            },

            Produto: {
                type: "object",
                properties: {
                    id_produto: { type: "integer", example: 1 },
                    id_categoria: { type: "integer", example: 1 },
                    id_administrador: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Notebook" },
                    descricao: { type: "string", example: "RTX 4060" },
                    imagem_produto: { type: "string", example: "img.jpg" }
                }
            },

            ProdutoCreate: {
                type: "object",
                properties: {
                    id_categoria: { type: "integer", example: 1 },
                    id_administrador: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Notebook" },
                    descricao: { type: "string", example: "RTX 4060" },
                    imagem_produto: { type: "string", example: "img.jpg" }
                }
            },

            Setor: {
                type: "object",
                properties: {
                    id_setor: { type: "integer", example: 1 },
                    estado: { type: "string", example: "SP" },
                    cidade: { type: "string", example: "Bauru" }
                }
            },

            SetorCreate: {
                type: "object",
                properties: {
                    estado: { type: "string", example: "SP" },
                    cidade: { type: "string", example: "Bauru" }
                }
            },

            AvaliacaoProduto: {
                type: "object",
                properties: {
                    id_avaliacao: { type: "integer", example: 1 },
                    id_produto: { type: "integer", example: 1 },
                    nota: { type: "number", example: 4.5 },
                    comentario: { type: "string", example: "Muito bom" },
                    email: { type: "string", example: "user@email.com" }
                }
            },

            AvaliacaoProdutoCreate: {
                type: "object",
                properties: {
                    id_produto: { type: "integer", example: 1 },
                    nota: { type: "number", example: 4.5 },
                    comentario: { type: "string", example: "Muito bom" },
                    email: { type: "string", example: "user@email.com" }
                }
            },

            AvaliacaoSetor: {
                type: "object",
                properties: {
                    id_avaliacao: { type: "integer", example: 1 },
                    id_setor: { type: "integer", example: 1 },
                    nota: { type: "number", example: 4.8 },
                    comentario: { type: "string", example: "Ótimo atendimento" },
                    email: { type: "string", example: "user@email.com" }
                }
            },

            
            AvaliacaoSetorCreate: {
                type: "object",
                properties: {
                    id_setor: { type: "integer", example: 1 },
                    nota: { type: "number", example: 4.8 },
                    comentario: { type: "string", example: "Ótimo atendimento" },
                    email: { type: "string", example: "user@email.com" }
                }
            }
        }
    }
};

export default documentacao;