#!/bin/bash
set -e
useradd -ms /bin/bash $USER_NAME
usermod -aG sudo $USER_NAME
echo "$USER_NAME:$USER_PASSWORD" | chpasswd

echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config
echo "PermitRootLogin no" >> /etc/ssh/sshd_config

/usr/sbin/sshd -D