# Dockerfile
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

COPY . .

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip
# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

CMD ["npm", "dev"]
