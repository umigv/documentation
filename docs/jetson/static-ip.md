# Setting a static IP address on the Jetson Orin

There are a few ways to set a static IP address on the Jetson Orin. This is the method we found successful on Jetpack 6.1 and Ubuntu 22.04.

## Setting a static IP address for Ethernet

To set a static IP address for the Ethernet connection utlize the `nmcli` command.

1. Find the name of the network interface by running the following command:
    ```bash
    nmcli device status
    ```
    The network interface name will be listed in the first column.
    Typically the ethernet interface is named `eth0`.

2. Set the static IP address by running the following command:
    ```bash
    sudo nmcli connection modify <interface_name> ipv4.addresses <static_ip>/<subnet> ipv4.gateway <gateway_ip> ipv4.dns <dns_ip> ipv4.method manual
    ```
    Replace `<interface_name>`, `<static_ip>`, `<subnet>`, `<gateway_ip>`, and `<dns_ip>` with the appropriate values.
    The `<subnet>` is typically `24`.
    The `<gateway_ip>` is typically the IP address of the router but in the case of just connecting the Jetson to the laptop, the `<gateway_ip>` is the IP address of the laptop.
    Set the `<dns_ip>` to `8.8.8.8,8.8.4.4` to use Google's DNS servers.

3. Restart the network service by running the following command:
    ```bash
    sudo nmcli connection down <interface_name> && sudo nmcli connection up <interface_name>
    ```
    Replace `<interface_name>` with the name of the network interface.

4. Verify the static IP address was set by running the following command:
    ```bash
    ip a
    ```
    The static IP address should be listed under the network interface.

## Connecting to the Jetson Orin using the static IP address

Once the static IP address is set on the Jetson Orin, you can connect to it using the static IP address.

### Windows

1. Open the Network and Sharing Center by right-clicking on the network icon in the taskbar and selecting **Open Network & Internet settings**.
2. Click on **Change adapter options**.
3. Right-click on the network adapter you are using to connect to the Jetson Orin and select **Properties**.
4. Select **Internet Protocol Version 4 (TCP/IPv4)** and click **Properties**.
5. Select **Use the following IP address** and enter the static IP address, subnet mask, default gateway, and DNS server.
6. Click **OK**.
7. Click **Close**.

### MacOS

1. Open **System Preferences**.
2. Click on **Network**.
3. Select the network adapter you are using to connect to the Jetson Orin.
4. Click on **Details**.
5. Select **TCP/IP**.
6. Change **Configure IPv4** to **Manually**.
7. Enter a static IP address that is on the same subnet as the Jetson Orin. The subnet mask should typically be `255.255.255.0`.
8. Click **Ok**.

### Linux

1. Open the network settings by clicking on the network icon in the taskbar.
2. Click on **Wired Settings**.
3. Click on the gear icon next to the network adapter you are using to connect to the Jetson Orin.
4. Click on **IPv4**.
5. Change the **Method** to **Manual**.
6. Enter the static IP address, subnet mask, default gateway, and DNS server.
7. Click **Apply**.
8. Click **Close**.
9. Restart the network service by running the following command:
    ```bash
    sudo systemctl restart NetworkManager
    ```
    This will apply the changes to the network settings.


## Setting a static IP address for WiFi

To set a static IP address for the WiFi connection, follow the same steps as setting a static IP address for Ethernet but replace the network interface name with the name of the WiFi interface. The WiFi interface is typically named `wlan0` on the Jetson Orin.
