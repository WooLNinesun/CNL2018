#! /bin/bash

sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"

# clear
sudo iptables -F && sudo iptables -X && sudo iptables -Z
sudo iptables -F -t nat
sudo iptables -t nat -A POSTROUTING -s 192.168.100.0/24 -o enp0s3 -j MASQUERADE

sudo iptables -A FORWARD -i enp0s3 -o enp0s8

sudo iptables -t filter -P FORWARD DROP
# icmp
sudo iptables -t filter -A FORWARD -p icmp -j ACCEPT
# DNS HTTP Line FTP Telnet
for port in 53 80 443 20 21 23; do
  for potocol in tcp udp; do
    sudo iptables -t filter -A FORWARD -p ${potocol} --sport ${port} -j ACCEPT
    sudo iptables -t filter -A FORWARD -p ${potocol} --dport ${port} -j ACCEPT
  done
done
