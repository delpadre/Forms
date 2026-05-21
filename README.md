# 📋 Dynamic Forms — Formulários Dinâmicos via JSON

![Expo](https://img.shields.io/badge/Expo-SDK%2055-black?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.76-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![Platforms](https://img.shields.io/badge/Platforms-Android%20%7C%20iOS%20%7C%20Web-green)

## 📖 Descrição

Aplicativo mobile desenvolvido com **React Native + Expo SDK 55 + TypeScript**
que gera formulários dinamicamente a partir de uma estrutura JSON.
O formulário é construído automaticamente — nenhum campo é criado manualmente.

O app suporta **10 tipos de campos**, valida os dados, persiste com AsyncStorage
e exibe um resumo completo após o envio.

---

## 🧰 Tecnologias Utilizadas

| Tecnologia | Versão |
|---|---|
| React Native | 0.76 |
| Expo | SDK 55 |
| TypeScript | 5.3 |
| AsyncStorage | 1.23.1 |
| React | 18.3.1 |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+
- npm
- Expo Go (para testar no celular)

### Instalação

```bash
git clone https://github.com/delpadre/dynamic-forms.git
cd na pasta
npm install
```

### Execução

```bash
# Android / iOS via QR Code
npx expo start

# Web
npx expo start --web

# Android
npx expo start --android

# iOS
npx expo start --ios
```

---

## 🧩 Tipos de Campos Implementados

| Tipo | Descrição |
|---|---|
| `text` | Texto simples |
| `email` | E-mail com validação de formato |
| `password` | Senha oculta |
| `number` | Campo numérico |
| `multiline` | Área de texto |
| `select` | Dropdown com modal |
| `radio` | Seleção única |
| `checkbox` | Seleção múltipla |
| `switch` | Toggle on/off |
| `date` | Data com máscara DD/MM/AAAA |

---

## 💾 Persistência

- Dados salvos ao submeter o formulário
- Dados recuperados ao abrir o app
- Botão para limpar os dados salvos

---

## ⚛️ Hooks Utilizados

- `useState` — controle de estado dos campos
- `useEffect` — carregamento dos dados salvos
- `useMemo` — memoização dos valores e validações
- `useCallback` — memoização dos handlers

---

## 🗂️ Estrutura de Pastas

```
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
```

---

## 🖼️ Prints da Aplicação

<img width="372" height="792" alt="image" src="https://github.com/user-attachments/assets/96f0a231-e7d6-44d7-aa03-76a78db9f59e" />

<img width="383" height="790" alt="image" src="https://github.com/user-attachments/assets/65d138fd-2286-497f-adec-0f3e3f7e6578" />

<img width="365" height="812" alt="image" src="https://github.com/user-attachments/assets/7221b134-33eb-47a9-a9c3-4c16957210b1" />

<img width="366" height="356" alt="image" src="https://github.com/user-attachments/assets/4e7af351-bd85-4966-b757-05f120ec64df" />

---

## 👨‍🎓 Integrantes

- **Rafael** — RM552765
- **Giovanna** — RM553701
- **Rafael** — RM554019
