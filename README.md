# Plataforma Geoespacial com ArcGIS

Este projeto apresenta um mapa interativo da cidade de Porto Alegre, permitindo a visualização de diferentes camadas de dados geoespaciais, como:

- **Bairros**: Delimitações e informações detalhadas sobre cada bairro.
- **Regiões de Planejamento**: Áreas organizadas para planejamento urbano.
- **Eixos**: Estruturas lineares representando vias principais ou corredores de transporte.
- **Pontos Cotados**: Localizações específicas com informações relevantes.

A aplicação foi projetada para facilitar a análise e o planejamento urbano, oferecendo uma interface intuitiva e personalizável.

## Funcionalidades

- **Mapeamento Interativo**: Criação de mapas dinâmicos e interativos.
- **Busca por Bairros**: Localize bairros específicos utilizando ferramentas de busca avançada.
- **Visualização por Camadas**: Ative ou desative camadas de dados para personalizar a visualização do mapa.
- **Exibição de Detalhes de Bairros**: Acesse informações detalhadas sobre bairros ao interagir com o mapa.

## Requisitos

- **ArcGIS Pro** ou **ArcGIS Online**.
- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/Plataforma-Geoespacial-com-ArcGIS.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente (.env):
   ```bash
   ARCGIS_API_KEY="SUA_API_KEY_AQUI"
    ```

  ## Tecnologias Utilizadas

  Este projeto foi desenvolvido utilizando as seguintes tecnologias:

  - **React**: Biblioteca JavaScript para construção de interfaces de usuário.
  - **Vite**: Ferramenta de build rápida e moderna para projetos web.
  - **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
  - **Styled Components**: Biblioteca para estilização de componentes React.
  - **ArcGIS API for JavaScript**: API para criação de aplicações geoespaciais.

  ## Estrutura do Projeto

  ```
  Plataforma-Geoespacial-com-ArcGIS/
  ├── public/                # Arquivos estáticos
  ├── src/                   # Código-fonte do projeto
  │   ├── assets/            # Recursos como imagens e estilos globais
  │   ├── components/        # Componentes reutilizáveis
  │   ├── pages/             # Páginas principais da aplicação
  │   ├── router/            # Definições de rotas da aplicação
  │   └── main.tsx           # Ponto de entrada do React
  ├── .env                   # Variáveis de ambiente
  ├── package.json           # Configurações e dependências do projeto
  ├── tsconfig.json          # Configurações do TypeScript
  └── vite.config.ts         # Configurações do Vite
  ```