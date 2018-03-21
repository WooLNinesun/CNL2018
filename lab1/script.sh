#! /bin/bash

sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"

sudo iptables -F -t nat
sudo iptables -t nat -A POSTROUTING -s 192.168.100.0/24 -o enp0s3 -j MASQUERADE
#sudo iptables -t nat -A PREROUTING -d 10.0.2.0/24 -j NETMAP --to 192.168.100.0/24

sudo iptables -A FORWARD -i enp0s3 -o enp0s8 -j ACCEPT

sudo iptables -t filter -P FORWARD DROP
sudo iptables -t filter -A FORWARD -p icmp -j ACCEPT
sudo iptables -t filter -A FORWARD -p tcp --sport 53 -j ACCEPT
sudo iptables -t filter -A FORWARD -p udp --sport 53 -j ACCEPT
sudo iptables -t filter -A FORWARD -p tcp --dport 53 -j ACCEPT
sudo iptables -t filter -A FORWARD -p udp --dport 53 -j ACCEPT
sudo iptables -t filter -A FORWARD -p tcp --sport 80 -j ACCEPT
sudo iptables -t filter -A FORWARD -p udp --sport 80 -j ACCEPT
sudo iptables -t filter -A FORWARD -p tcp --dport 80 -j ACCEPT
sudo iptables -t filter -A FORWARD -p udp --dport 80 -j ACCEPT
sudo iptables -t filter -A FORWARD -p tcp --sport 443 -j ACCEPT
sudo iptables -t filter -A FORWARD -p udp --sport 443 -j ACCEPT
sudo iptables -t filter -A FORWARD -p tcp --dport 443 -j ACCEPT
sudo iptables -t filter -A FORWARD -p udp --dport 443 -j ACCEPT
sudo iptables -t filter -A FORWARD -p tcp --sport 20 -j ACCEPT
sudo iptables -t filter -A FORWARD -p udp --sport 20 -j ACCEPT
sudo iptables -t filter -A FORWARD -p tcp --dport 20 -j ACCEPT
sudo iptables -t filter -A FORWARD -p udp --dport 20 -j ACCEPT
sudo iptables -t filter -A FORWARD -p tcp --sport 21 -j ACCEPT
sudo iptables -t filter -A FORWARD -p udp --sport 21 -j ACCEPT
sudo iptables -t filter -A FORWARD -p tcp --dport 21 -j ACCEPT
sudo iptables -t filter -A FORWARD -p udp --dport 21 -j ACCEPT
sudo iptables -t filter -A FORWARD -p tcp --sport 23 -j ACCEPT
sudo iptables -t filter -A FORWARD -p udp --sport 23 -j ACCEPT
sudo iptables -t filter -A FORWARD -p tcp --dport 23 -j ACCEPT
sudo iptables -t filter -A FORWARD -p udp --dport 23 -j ACCEPT
