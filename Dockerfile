FROM node:5.12.0

MAINTAINER Orlando Hohmeier <orlando@mesosphere.io>

WORKDIR /opt/marathon-ui

ADD . /opt/marathon-ui/

USER root

VOLUME "/opt/marathon-ui/tests"
VOLUME "/opt/marathon-ui/dist"

RUN ["/usr/local/bin/npm", "install"]
RUN ["/usr/local/bin/npm", "install","-g",  "gulp"]
CMD ["npm", "run", "livereload"]
