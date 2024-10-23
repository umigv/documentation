# Using MQTT To Communicate Between Jetson and Laptop

> [!WARNING]  
> This guide assumes you have a Jetson and a laptop connected to the same network and that static IP addresses are used for both devices. If you do not have a static IP address, please follow the guide static ip guide [here](https://google.com).

## Install MQTT on Jetson
1. Install the MQTT broker on Jetson
   
    ```bash
    sudo apt-get install mosquitto
    ```

2. Install the MQTT client on Jetson (this is a fast way to verify MQTT broker is working)

    ```bash
    sudo apt-get install mosquitto-clients
    ```

3. Configure the MQTT broker to allow anonymous access and to listen on all interfaces

    ```bash
    sudo nano /etc/mosquitto/mosquitto.conf
    ```

    Add the following lines to the configuration file

    ```
    allow_anonymous true
    listener 1884 0.0.0.0
    ```

4. Restart the MQTT broker to use the new configuration

    ```bash
    sudo systemctl restart mosquitto
    ```
> [!TIP]
> If the mosquitto service is not running, you can start it using the following command
> ```bash
> sudo mosquitto -c /etc/mosquitto/mosquitto.conf  
> ```

5. Verify the MQTT broker is running

    ```bash
    systemctl status mosquitto
    ```
    or
    ```bash
    ps -ef | grep mosquitto
    ```
6. Test the MQTT broker by subscribing to a topic (must be done on two separate terminals)

    ```bash
    mosquitto_sub -t test
    ```

    In a new terminal, publish a message to the topic

    ```bash
    mosquitto_pub -t test -m "Hello MQTT"
    ```

    The message should appear in the terminal where you subscribed to the topic


## Install MQTT on Laptop
1. Install MQTT client on laptop

    ```bash
    sudo apt-get install mosquitto-clients
    ```
2. Subscribe to the same topic as the Jetson

    ```bash
    mosquitto_sub -h <Jetson IP> -t test
    ```
3. Publish a message from the laptop to the Jetson

    ```bash
    mosquitto_pub -h <Jetson IP> -t test -m "Hello from Laptop"
    ```
    The message should appear in the terminal where you subscribed to the topic on the Jetson

## Using MQTT in Python
1. Install the Python MQTT client on both the Jetson and Laptop

    ```bash
    pip install paho-mqtt
    ```

2. Create a Python script to publish a message to the Jetson

    ```python
    import paho.mqtt.client as mqtt
    import json

    MQTT_BROKER = "<Jetson IP>"
    MQTT_PORT = 1884
    MQTT_TOPIC = "test"

    client = mqtt.Client(mqtt.allbackAPIVersion.VERSION1)
    client.connect(MQTT_BROKER, MQTT_PORT)

    data = {"key": "value"}
    client.publish(MQTT_TOPIC, json.dumps(data))

    client.disconnect()
    ```
3. Create a Python script to subscribe to the Jetson

    ```python
    import paho.mqtt.client as mqtt
    import json

    MQTT_BROKER = "<Jetson IP>"
    MQTT_PORT = 1884
    MQTT_TOPIC = "test"

    def on_message(client, userdata, message):
        data = json.loads(message.payload)
        print(data)

    client = mqtt.Client(mqtt.allbackAPIVersion.VERSION1)
    client.connect(MQTT_BROKER, MQTT_PORT)
    client.subscribe(MQTT_TOPIC)
    client.on_message = on_message

    client.loop_forever()
    ```
4. Run the publisher script on the Jetson and the subscriber script on the Laptop.


## Troubleshooting
1. If the subscriber is not receiving messages, check the IP address of the Jetson and the laptop. The IP address should be static and on the same network.
2. If the subscriber is not receiving messages, check the MQTT broker configuration on the Jetson. The broker should allow anonymous access and listen on all interfaces.
   

## References
1. [MQTT](https://mqtt.org/)
2. [Mosquitto](https://mosquitto.org/)
3. [Paho MQTT](https://github.com/eclipse/paho.mqtt.python)
4. [Communicate between two Devices using MQTT](https://mohamedelhlafi.medium.com/use-the-mqtt-protocol-to-communicate-data-between-2-raspberry-pi-3d432dea9313)

