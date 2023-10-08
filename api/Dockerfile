FROM node:18.0.0-alpine

ARG SSH_KEY

RUN apk add --no-cache dumb-init

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

WORKDIR /usr/src/app

# Install openssh
RUN apk add --no-cache openssh
# Add github to known hosts
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

COPY . .

# yarn and yarn build will install, build and remove dev dependencies
RUN ssh-agent sh -c 'echo $SSH_KEY | base64 -d | ssh-add - ; yarn && yarn build'

ENV NODE_ENV=production

CMD yarn start