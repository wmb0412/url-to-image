# development
FROM node:18-buster-slim As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node .puppeteerrc.cjs ./

RUN npm config set registry https://registry.npm.taobao.org
RUN npm ci

COPY --chown=node:node . .

USER node

# build
FROM node:18-buster-slim As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm config set registry https://registry.npm.taobao.org

RUN npm ci --only=production && npm cache clean --force

USER node


#production
FROM node:18-buster-slim As production

# 切换国内源
RUN sed -i 's/http:\/\/deb.debian.org/http:\/\/mirrors.163.com/g' /etc/apt/sources.list
RUN  apt-get clean

# 安装chromium需要的依赖 https://source.chromium.org/chromium/chromium/src/+/main:chrome/installer/linux/debian/dist_package_versions.json
RUN apt-get update && apt-get install -y --no-install-recommends \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libexpat1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libuuid1 \
    libx11-6 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxkbcommon0 \
    libxrandr2 \
    libxrender1 \
    libxshmfence1 \
    libxss1 \
    libxtst6 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
   
# 中文乱码 安装字体
RUN apt-get update \
    && apt-get -y --no-install-recommends install fonts-droid-fallback ttf-wqy-zenhei ttf-wqy-microhei fonts-arphic-ukai fonts-arphic-uming \
    && apt-get -y --no-install-recommends install fontconfig xfonts-utils

WORKDIR /usr/share/fonts
RUN mkfontscale \
    && mkfontdir \
    && fc-cache

#项目部署docker
WORKDIR /usr/src/app

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=development /usr/src/app/.cache /root/.cache
RUN mkdir public

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
