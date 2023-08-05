# TCC - Projeto de Registro de Documentos na Blockchain

## Introdução

Este documento apresenta o Trabalho de Conclusão de Curso (TCC) intitulado "Projeto de Registro de Documentos na Blockchain". O objetivo deste projeto é explorar a tecnologia blockchain e sua aplicação no registro seguro e imutável de documentos. Para esse fim, serão utilizadas as seguintes tecnologias:

- **Front-end**: Vite
- **API**: Express
- **Smart Contracts**: Solidity

## 1. Visão Geral

A blockchain é uma tecnologia revolucionária que permite o registro e a validação de transações de forma descentralizada, segura e imutável. Ela se tornou conhecida inicialmente como a infraestrutura por trás das criptomoedas, mas suas aplicações se estendem a diversas áreas, incluindo o gerenciamento de documentos e registros.

O projeto de Registro de Documentos na Blockchain visa criar um sistema que permita a autenticação e o registro seguro de documentos em uma rede blockchain pública ou privada. A utilização de smart contracts em Solidity permitirá automatizar a validação e a execução das transações relacionadas aos documentos.

## 2. Tecnologias Utilizadas

### 2.1. Vite

Vite é uma ferramenta de construção de aplicativos web que visa oferecer um ambiente de desenvolvimento rápido e leve. Ele utiliza a tecnologia de module bundler, que permite uma inicialização rápida do projeto, melhorando significativamente o tempo de desenvolvimento. Vite será utilizado como o front-end deste projeto, fornecendo uma interface de usuário interativa e responsiva.

### 2.2. Express

Express é um framework web rápido e minimalista para Node.js. Ele oferece uma série de recursos para o desenvolvimento de APIs (Interfaces de Programação de Aplicativos) robustas e escaláveis. No contexto deste projeto, o Express será utilizado para construir a API que interage com os smart contracts e gerencia as solicitações de registro e autenticação de documentos.

### 2.3. Solidity

Solidity é uma linguagem de programação de contratos inteligentes (smart contracts) usada para implementar a lógica de negócios na Ethereum e outras plataformas de blockchain compatíveis com o padrão ERC-20. Os smart contracts escritos em Solidity são executados na máquina virtual Ethereum (EVM) e permitem a criação de aplicações descentralizadas (DApps). Neste projeto, os smart contracts serão escritos em Solidity para implementar as funcionalidades relacionadas ao registro e validação de documentos na blockchain.

## 3. Funcionalidades do Sistema

O sistema de Registro de Documentos na Blockchain terá as seguintes funcionalidades principais:

1. Autenticação do usuário: Os usuários devem se autenticar para acessar o sistema e registrar documentos. Será utilizado um sistema seguro de autenticação para garantir a integridade e a privacidade das informações dos usuários.

2. Registro de documentos: Os usuários poderão fazer o upload de documentos, que serão convertidos em formato digital e registrados na blockchain. O hash do documento será armazenado de forma imutável na cadeia de blocos, garantindo a sua integridade e inviolabilidade.

3. Verificação de documentos: O sistema permitirá que os usuários verifiquem a autenticidade de um documento através do seu hash armazenado na blockchain. Isso garantirá que o documento não tenha sido alterado desde o seu registro original.

4. Smart Contracts: Serão desenvolvidos smart contracts em Solidity para automatizar a lógica de registro e validação de documentos. Esses contratos inteligentes serão implantados na blockchain para execução automática das transações.

## 4. Conclusão

O projeto de Registro de Documentos na Blockchain tem como objetivo demonstrar a viabilidade e os benefícios da utilização da tecnologia blockchain no contexto de registros e autenticações de documentos. A combinação das tecnologias Vite, Express e Solidity possibilitará a construção de um sistema seguro, eficiente e confiável.

A aplicação prática do projeto poderá ser explorada em diversas áreas, como autenticação de diplomas e certificados, registro de propriedades intelectuais, validação de contratos e muito mais.

Espera-se que este trabalho contribua para a disseminação do conhecimento sobre blockchain e suas aplicações, além de inspirar futuras pesquisas e projetos no campo das tecnologias descentralizadas.
