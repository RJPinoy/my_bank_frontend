FROM jenkins/inbound-agent
USER root

# Install Docker from docker.com (latest stable version)
RUN apt update
RUN apt install -y curl
RUN curl -fsSL https://get.docker.com -o get-docker.sh
RUN sh get-docker.sh

# Install Node.js from Nodesource (latest stable version)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt install -y nodejs