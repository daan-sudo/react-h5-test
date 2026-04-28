# 第一阶段：编译阶段 (GitHub Actions 会运行这个)
FROM node:20-alpine AS build-stage

# 设置工作目录
WORKDIR /app

# 先拷贝 package.json 安装依赖，利用 Docker 缓存
COPY package*.json ./
RUN npm install

# 拷贝所有源代码并进行打包
COPY . .
RUN npm run build

# 第二阶段：运行阶段 (最终镜像只包含 Nginx 和打包后的静态文件)
FROM nginx:alpine

# 从第一阶段拷贝打包好的 dist 目录到 Nginx 目录
# 注意：Vue/Vite 默认打包目录是 dist，如果是 React 可能是 build
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]