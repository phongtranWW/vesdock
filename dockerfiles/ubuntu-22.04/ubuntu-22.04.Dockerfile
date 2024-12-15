FROM ubuntu:22.04

RUN mkdir -p /var/run/sshd

RUN apt-get update && apt-get install -y openssh-server sudo

COPY run.sh run.sh

RUN chmod +x run.sh

CMD ["/bin/bash", "-c", "./run.sh && rm run.sh"] 