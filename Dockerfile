# Dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip
# Install Python dependencies
COPY scripts/requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

CMD ["npm", "start"]
