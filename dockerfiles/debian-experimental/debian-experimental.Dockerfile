FROM debian:experimental

RUN mkdir -p /var/run/sshd

RUN apt update && apt install -y openssh-server sudo

COPY run.sh run.sh

RUN chmod +x run.sh

CMD ["/bin/bash", "-c", "./run.sh && rm run.sh"] 