# CNLab

1.  安裝虛擬機 Ubuntu{A,B} with os ubuntu-16.04.4-desktop-amd64

    *   虛擬機 Ubuntu{A,B} 記憶體:1024MB, 硬碟: hdi 10GB 動態配置
    *   ubuntu name & account: team8, password cnl2018

2.  Ubuntu{A,B} sudo apt update && sudo apt upgrade && sudo apt install vim

3.  Ubuntu{A,B} 都關機設定網路卡介面

4.  UbuntuA

    ```
    sudo ip address add 192.168.100.254/24 broadcast + dev enp0s8 
    sudo ip route add 192.168.100.0/24 via 192.168.100.254 dev enp0s8
    ```

5.  UbuntuB 能夠透過 DHCP 伺服器得到 private IP address.

    安裝 dhcp3-server

    ```
    sudo apt install isc-dhcp-server
    ```

    設定 network interface

    ```
    sudo vim /etc/default/isc-dhcp-server
    INTERFACE = "enp0s8"
    ```

    設定 dhcp 參數

    ```
    sudo vim /etc/dhcp/dhcpd.conf

    option domain-name "b04902083.ntu";
    option domain-name-servers 140.112.30.21, 140.112.30.12;
    default-lease-time 6000
    max-lease-time 72000

    subnet 192.168.100.0 netmask 255.255.255.0 {
     	range 192.168.100.20 192.168.100.100;
     	option routers 192.168.100.254;
    	option broadcast-address 192.168.100.255;
    }
    ```

    重新啟動 DHCP

    ```
    sudo /etc/init.d/isc-dhcp-server start
    ```

6.  UbuntuB 要能用 UbuntuA 上的 NAT 獲得 private IP 並與外部網路連結

    打開 forward 功能

    ```
    echo "1" > /proc/sys/net/ipv4/ip_forward
    ```

    設定 NAT

    in /script.sh