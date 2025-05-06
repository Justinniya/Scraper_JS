# Use Node.js official image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Install Playwright dependencies
RUN apt-get update && apt-get install -y \
  libgbm-dev \
  libnss3 \
  libatk-bridge2.0-0 \
  libxss1 \
  libappindicator3-1 \
  libnspr4

# Copy package files into the container
# COPY app/package*.json ./

# Install dependencies inside the container
# RUN npm install
RUN npx playwright install-deps chromium

# Install ONLY Chromium browser for Playwright
RUN npx playwright install
RUN npm install axios
COPY app/ .

# Expose the port the app will run on
EXPOSE 3000

# Run the API
CMD ["node", "scraper-airbnb.js"]
