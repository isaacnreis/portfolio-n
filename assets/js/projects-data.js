const projectsData = [
  {
    id: "01",
    title: "DoIt - Gerenciador de Tarefas Full-Stack",
    description:
      "Solução full-stack para gerenciamento de tarefas com autenticação JWT. O projeto demonstra a criação de um back-end robusto com Node.js e um front-end reativo e otimizado para SEO com Nuxt.js, focando em uma experiência de usuário intuitiva, responsiva e acessível.",
    imageClass: "projeto-doIt",
    demoUrl: "https://doit-jade.vercel.app/",
    repoUrl: "https://github.com/isaacnreis/doIt",
  },
  {
    id: "02",
    title: "VortexAdmin - Dashboard Administrativo Interativo",
    description:
      "Dashboard administrativo interativo para gerenciamento de dados complexos. A plataforma oferece visualização de métricas com gráficos dinâmicos, gestão de usuários e produtos, e temas personalizáveis (Dark/Light). O projeto destaca competências em Vue 3, TypeScript e bibliotecas de visualização de dados.",
    imageClass: "projeto-vortexAdmin",
    demoUrl: "https://vortexadmin.netlify.app/",
    repoUrl: "https://github.com/isaacnreis/vortexadmin",
  },
  {
    id: "03",
    title: "ReactStore - E-commerce com Integração de Pagamentos",
    description:
      "Simulação de e-commerce funcional com integração de pagamentos via Stripe. O projeto demonstra a construção de uma experiência de compra completa, com gerenciamento de estado eficiente e uma interface responsiva. Evidencia a aplicação de boas práticas para criar uma loja virtual escalável com React.",
    imageClass: "projeto-reactStore",
    demoUrl: "https://react-store-lyart.vercel.app/",
    repoUrl: "https://github.com/isaacnreis/react-store",
  },
  {
    id: "04",
    title: "CineScope - Catálogo Interativo de Filmes",
    description:
      "Catálogo interativo de filmes que consome a API do TMDB em tempo real. A aplicação permite pesquisa, visualização de detalhes e criação de uma lista de favoritos com persistência local. Demonstra forte habilidade em React, gerenciamento de estado e integração com APIs externas.",
    imageClass: "projeto-cineScope",
    demoUrl: "https://cine-scope-mu.vercel.app/",
    repoUrl: "https://github.com/isaacnreis/cineScope",
  },
  {
    id: "05",
    title: "Codificador de Texto - Lógica e Manipulação do DOM",
    description:
      "Ferramenta para codificar e decodificar textos em tempo real, construída com JavaScript puro. O projeto demonstra a aplicação de lógica de programação e manipulação direta do DOM para resolver um problema algorítmico e criar uma funcionalidade interativa com tecnologias web fundamentais.",
    imageClass: "projeto-encoderDecoder",
    demoUrl: "https://isaacnreis.github.io/alura-challenge-one/",
    repoUrl: "https://github.com/isaacnreis/alura-challenge-one",
  },
  {
    id: "06",
    title: "Controle de Orçamento - Validação e Persistência de Dados",
    description:
      "Aplicação para controle de despesas com validação de formulários e persistência de dados via Local Storage. O sistema oferece uma experiência guiada para o usuário cadastrar e consultar despesas, com feedback visual claro. Demonstra a criação de uma ferramenta funcional para gerenciamento de dados no lado do cliente.",
    imageClass: "projeto-orcamentoPessoal",
    demoUrl: "https://isaacnreis.github.io/orcamento-pessoal/",
    repoUrl: "https://github.com/isaacnreis/orcamento-pessoal",
  },
  {
    id: "07",
    title: "Pokedex - Consumo de API e Renderização Dinâmica",
    description:
      "Pokedex interativa que consome a PokeAPI para exibir dados de Pokémon de forma dinâmica. O projeto destaca a habilidade de realizar requisições assíncronas, processar os dados e renderizar componentes de forma eficiente, resultando em uma experiência de usuário fluida e responsiva.",
    imageClass: "projeto-pokedex",
    demoUrl: "https://js-developer-pokedex-isaacnreis.vercel.app/",
    repoUrl: "https://github.com/isaacnreis/js-developer-pokedex",
  },
  {
    id: "08",
    title: "Jogo da Velha - Lógica de Jogo e Interatividade",
    description:
      "Implementação do clássico Jogo da Velha com JavaScript puro. O projeto demonstra a aplicação de lógica de programação para gerenciar o estado do jogo, validar jogadas e determinar o vencedor, evidenciando a capacidade de criar interatividade e regras de negócio no front-end.",
    imageClass: "projeto-jogoDaVelha",
    demoUrl: "https://isaacnreis.github.io/jogodavelha/",
    repoUrl: "https://github.com/isaacnreis/jogodavelha",
  },
  {
    id: null,
    title: "Explore Mais Projetos no GitHub",
    description:
      "Meu perfil no GitHub é um reflexo contínuo da minha jornada como desenvolvedor. Lá você encontrará uma variedade de outros projetos, experimentos e contribuições que demonstram minha paixão por aprender e construir. Explore para ver mais de perto meu código e minhas áreas de interesse.",
    imageClass: "projeto-git",
    customLinks: [
      { text: "Link Para GitHub", url: "https://github.com/isaacnreis" },
      {
        text: "Repositório Deste Portfólio",
        url: "https://github.com/isaacnreis/portfolio-novo",
      },
    ],
  },
];
