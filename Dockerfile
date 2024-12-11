FROM node:18.20.5

WORKDIR /app
ENV PORT 8080

COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]
