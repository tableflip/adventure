FROM node:6.10.2

# Add Tini a lightweight init system that properly handles running as PID 1.
# A Node.js process running as PID 1 will not respond to SIGTERM (CTRL-C) and similar signals.
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#handling-kernel-signals
ENV TINI_VERSION v0.14.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# Set up our app
WORKDIR /app
ADD . /app
RUN npm install --production
EXPOSE 3000
CMD ["node", "index.js"]
