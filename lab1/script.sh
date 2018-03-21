#! /bin/bash

#sudo ip address add 192.168.100.254/24 broadcast + dev enp0s8 
#sudo ip route add 192.168.100.0/24 via 192.168.100.254 dev enp0s8

#sudo apt install isc-dhcp-server

#sudo vim /etc/default/isc-dhcp-server
#INTERFACE = "enp0s8"



#sudo vim /etc/dhcp/dhcpd.conf
#---
#option domain-name "b04902083.ntu";
#option domain-name-servers 140.112.30.21, 140.112.30.12;
#default-lease-time 6000
#max-lease-time 72000

#subnet 192.168.100.0 netmask 255.255.255.0 {
#        range 192.168.100.20 192.168.100.100;
#            option routers 192.168.100.254;
#                option broadcast-address 192.168.100.255;
#}

sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"

sudo iptables -F -t nat
sudo iptables -t nat -A POSTROUTING -s 192.168.100.0/24 -o enp0s3 -j MASQUERADE
sudo iptables -t nat -A PREROUTING -d 10.0.2.0/24 -j NETMAP --to 192.168.100.0/24

