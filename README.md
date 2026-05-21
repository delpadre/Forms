📋 Dynamic Forms — Formulários Dinâmicos via JSON
Mostrar Imagem
Mostrar Imagem
Mostrar Imagem
Mostrar Imagem
📖 Descrição
Aplicativo mobile desenvolvido com React Native + Expo SDK 55 + TypeScript que gera formulários dinamicamente a partir de uma estrutura JSON. O formulário é construído automaticamente — nenhum campo é criado manualmente.
O app suporta 10 tipos de campos, valida os dados, persiste com AsyncStorage e exibe um resumo completo após o envio.

🧰 Tecnologias Utilizadas
TecnologiaVersãoReact Native0.76ExpoSDK 55TypeScript5.3AsyncStorage1.23.1React18.3.1

🚀 Como Executar o Projeto
Pré-requisitos

Node.js 18+
npm
Expo Go (para testar no celular)

Instalação
bash# Clone o repositório
git clone https://github.com/seu-usuario/dynamic-forms.git
cd dynamic-forms

# Instale as dependências
npm install
Execução
bash# Android / iOS via QR Code
npx expo start

# Web
npx expo start --web

# Android
npx expo start --android

# iOS
npx expo start --ios

🧩 Tipos de Campos Implementados
TipoDescriçãotextTexto simplesemailE-mail com validação de formatopasswordSenha ocultanumberCampo numéricomultilineÁrea de textoselectDropdown com modalradioSeleção únicacheckboxSeleção múltiplaswitchToggle on/offdateData com máscara DD/MM/AAAA

💾 Persistência

Dados salvos ao submeter o formulário
Dados recuperados ao abrir o app
Botão para limpar os dados salvos


⚛️ Hooks Utilizados

useState — controle de estado dos campos
useEffect — carregamento dos dados salvos
useMemo — memoização dos valores e validações
useCallback — memoização dos handlers


🗂️ Estrutura de Pastas
dynamic-forms/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── types/
    │   └── form.ts
    ├── config/
    │   └── formConfig.ts
    ├── services/
    │   └── storageService.ts
    ├── hooks/
    │   └── useForm.ts
    ├── utils/
    │   └── validation.ts
    ├── components/
    │   ├── DynamicField.tsx
    │   └── fields/
    │       ├── TextField.tsx
    │       ├── SelectField.tsx
    │       ├── RadioField.tsx
    │       ├── CheckboxField.tsx
    │       ├── SwitchField.tsx
    │       └── DateField.tsx
    └── screens/
        ├── FormScreen.tsx
        └── ResultScreen.tsx

🖼️ Prints da Aplicação

Adicione os prints aqui


👨‍🎓 Integrantes

Rafael — RM552765
Giovanna — RM553701
Rafael — RM554019
