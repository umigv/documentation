# Remotely connecting to the Jetson Orin

## Introduction

There are a few ways to connect to the Jetson Orin remotely. This document will cover the following methods:

- VNC
- SSH

## VNC

### Setting up VNC

1. Install the VNC server on the Jetson Orin by running the following command:

`sudo apt-get install vino`

2. Enable the VNC server to start on boot by running the following command:

    ```bash
    cd /usr/lib/systemd/user/graphical-session.target.wants
    sudo ln -s ../vino-server.service ./.
    ```
3. Configure the VNC server by running the following command:
   
   ```bash
   gsettings set org.gnome.Vino prompt-enabled false
   gsettings set org.gnome.Vino require-encryption false
   ```
4. Set a password for the VNC server by running the following command:
   ```bash
   # Replace thepassword with your desired password
   gsettings set org.gnome.Vino authentication-methods "['vnc']"
   gsettings set org.gnome.Vino vnc-password $(echo -n 'thepassword'|base64)
    ```
5. Reboot the Jetson
   `sudo reboot`

?> Note: The Jetson Orin will only accept VNC connections if the VNC server was logged in at least once locally on boot.

### Connecting to the Jetson Orin using VNC

#### Windows
1. Download and install VNC Viewer from the [RealVNC website](https://www.realvnc.com/en/connect/download/viewer/).
2. Launch VNC Viewer and enter the IP address of the Jetson Orin in the search bar.
3. Enter the password you set in step 4 of the Setting up VNC section.
4. Click Connect.

#### MacOS
1. Open Finder and search for **Screen Sharing**.
2. Click the plus icon in the top right corner and enter the IP address of the Jetson Orin.
3. Enter the password you set in step 4 of the Setting up VNC section.
4. Click Connect.

#### Linux
1. Install gvncviewer by running the following command:
   `sudo apt-get install gvncviewer`
2. Launch gvncviewer by running the following command:
   `gvncviewer`
3. Enter the IP address of the Jetson Orin in the search bar.
4. Enter the password you set in step 4 of the Setting up VNC section.
   

!> **Note:** To connect to the Jetson Orin remotely, you must be on the same network as the Jetson Orin. More than likely, you will be using a static IP address for the Jetson Orin. If you are not using a static IP address, please follow the guide [here](/jetson/static-ip.md).

!> **Note:** If you are not connected to MWireless, you will need the UMich VPN to connect to the Jetson Orin remotely. More information on the UMich VPN can be found [here](https://its.umich.edu/enterprise/wifi-networks/vpn/getting-started).


## References
[VNC Setup](https://developer.nvidia.com/embedded/learn/tutorials/vnc-setup)


## SSH

### Connecting to the Jetson Orin using SSH

#### Windows 
1. Download and install XMing [here](https://sourceforge.net/projects/xming/).
2. Download and install Putty [here](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html).
3. Launch XMing on Windows client
4. Launch Putty
    - In the **Session** section enter the IP address of the Jetson Orin 
5. Navigate on the sidebar to: **SSH** -> **X11**
    1. Enable X11 forwarding
    2. X display location = **:0.0**
    3. MIT-Magic-Cookie-1
    4. X authority file for local display = point to the Xming.exe executable
   
#### MacOS
1. Run `brew install --cask xquartz`

#### Linux 
