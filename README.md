# Documentation for running all ARV software

## Embedded
1. Open 1 terminal
2. `cd ~/ros2_ws`
3. `source /opt/ros/humble/setup.zsh`
4. `source install/setup.zsh`
5. `ros2 run arv_embedded dual_odrive_controller`


## Navigation
1. Open 3 terminals.
2. `cd ~/ros2_ws` in each terminal.
3. run `source /opt/ros/humble/setup.zsh` && `source install/setup.zsh` in each terminal.
4. Terminal 1: `ros2 launch marvin_simulation simulation.launch.py world:=igvc_flat`
5. Terminal 2: `ros2 launch src/nav_stack/launch/nav_stack.launch.py`
6. Terminal 3: `ros2 run tf2_ros static_transform_publisher "0" "0" "0" "0" "0" "0" "map" "odom"` \
**Note the static transform publisher will not need to be called when running the sensors stack.**

