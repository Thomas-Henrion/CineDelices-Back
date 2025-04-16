# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.14.0
ARG PNPM_VERSION=10.7.1

# Étape de build
FROM node:${NODE_VERSION}-alpine AS build

# Installation de pnpm
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

# Installation des dépendances (incluant les devDependencies)
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copie des fichiers source
COPY . .

# Build du projet TypeScript
RUN pnpm build

# Étape de production
FROM node:${NODE_VERSION}-alpine AS production

# Installation de pnpm
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

# Installation des dépendances de production uniquement
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

# Copie des fichiers compilés depuis l'étape de build
COPY --from=build /usr/src/app/dist ./dist
COPY package.json pnpm-lock.yaml ./

# Défini l'utilisateur non-root
USER node

# Expose le port de l'application
EXPOSE 3000

# Démarre l'application
CMD ["pnpm", "start"]