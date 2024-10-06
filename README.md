# Documentation for running all ARV software

## Embedded
1. Open 1 terminal
2. `cd ~/ros2_ws`
3. `source /opt/ros/humble/setup.zsh`
4. `source install/setup.zsh`
5. run embedded node: `ros2 run arv_embedded dual_odrive_controller`

**If the node says calibration complete before doing anything:**
1. Stop the node.
2. Open a new terminal.
3. `odrivetool`
4. `odrv0.clear_errors()`
5. `odrv1.clear_errors()`
6. `quit()`
7. restart arv_embedded node.


## Navigation
1. Open 3 terminals.
2. `cd ~/ros2_ws` in each terminal.
3. run `source /opt/ros/humble/setup.zsh` && `source install/setup.zsh` in each terminal.
4. Terminal 1: `ros2 launch marvin_simulation simulation.launch.py world:=igvc_flat`
5. Terminal 2: `ros2 launch src/nav_stack/launch/nav_stack.launch.py`
6. Terminal 3: `ros2 run tf2_ros static_transform_publisher "0" "0" "0" "0" "0" "0" "map" "odom"` \
**Note the static transform publisher will not need to be called when running the sensors stack.**

## Sensors 
1. Plug in and make sure it shows wired connected in the network settings
2. `sudo wireshark`
   a. On this specific laptop ethernet is called enp48s0
   b. If the lidar isn’t working you’ll see a message like this: “Who has 192.168.191.1? Tell 192.168.191.254” (the ips might be different, so use the ones you see in place of these for the rest of the guide)
3. To fix, you need to run this script with the correct wired port and ips from wireshark: https://github.com/umigv/sensors_stack/blob/hersh-devel/sensors_scripts/scripts/config_velodyne_connection.sh

These are the specific commands:
```
sudo ifconfig enp48s0 192.168.191.1 # IP always the same
sudo route add 192.168.191.254 enp48s0 # IP of the Velodyne (from wireshark)
```
(The ethernet port should match the one on your computer, and the ips you should use are the ones you found in wireshark)

4. To test if this works without ROS, run sudo wireshark again, and choose the ethernet port. You should see a bunch of UDP messages instead of the “who has” message
```
roslaunch velodyne_pointcloud VLP16_points.launch 
```
Change global option fixed frame to velodyne
Add pointcloud2

make sure there is a sensors_scripts folder from sensor_stack in the catkin_ws/src
In separate terminal: rviz

