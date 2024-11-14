# Docker Environment Set Up 
In order to ensure that everyone working on Maverick is working in the same envrionment we will use docker. Docker allows us to each individually run our code on the same base OS with the same base packages (and versions) from all of our various laptops. We have developed a docker base which utilizes Ubuntu Jammy and includes ROS Humble. All Maverick development needs to be done in this environment, so you should **always** be working inside of the Docker container when working on Maverick. 

## Install Docker and Related Apps 
1. **Download Docker:**
   - Go to the [Docker website](https://www.docker.com/products/docker-desktop) and download Docker Desktop for your operating system.
   - Follow the installation instructions provided on the website.

2. **Verify Installation:**
   - Open a terminal or command prompt.
   - Run the command `docker --version` to ensure Docker is installed correctly.

3. **Download Docker Desktop:**
    - Go to the [Docker website](https://www.docker.com/products/docker-desktop) and download Docker Desktop for your operating system.
    - Follow the installation instructions provided on the website.
    - You can run, stop, and delete docker containers with this application. 

4. **Optional: Install Docker Extension for VSCode:**
   - Open Visual Studio Code.
   - Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
   - Search for "Docker" and install the Docker extension by Microsoft.
   - This extension provides a rich set of functionalities to manage Docker containers, images, and more directly from VSCode.

## Pull and Build Image (Initial Setup Only)
1. **Download the Pre-Composed Docker System:**
   - Use the following link to download the necessary files to build an image: [Download Docker Starter](https://github.com/umigv/Docker-Env)
   - Make sure the Dockerfile does NOT have a '.txt' extension (this will cause an error in the build)

2. **Build the Docker Image:**
   - Make sure Docker Desktop application is Open and the Engine is running. 
   - Open a terminal or command prompt.
   - Navigate to the directory where the Dockerfile is located.
   - Run the command `docker build -t maverick .` to build the Docker image.

3. **Verify the Docker Image:**
   - Run the command `docker images` to list all available Docker images.
   - Ensure that the **'maverick'** image is listed.

4. **Deleting a Docker Image**
   - If you'd like to restart you can delete a docker image by running the command `docker rmi [image_name]`. In this case our image_name is *maverick*.

## Running Maverick Code 
1. **Run the Docker Container:**
   - Run the command `docker run -it --name [container_name] maverick` to start a new container from the pre-built image. You can choose container_name to be whatever you like, we recommend: *maverick_container*. A new root should open in terminal. 
   - If you open Docker Desktop, you should see this container running. 
2. **Enter the Workspace Directory:**
   - Once inside the Docker container, navigate to the `workspace` directory by running the command:
     ```sh
     cd /workspace
     ```

3. **Pull a GitHub Repository:**
   - Ensure you have `git` installed in the container. Since the container is built on Ubuntu Jammy, you can install `git` using:
     ```sh
     apt update
     apt install -y git
     ```
   - Clone the desired GitHub repository by running the command:
     ```sh
     git clone ______
     ```
   - Remember to use git best practices and always use your own git branch.

4. **Stopping and Removing the Docker Container:**
   ** Running docker containers is highly draining to your laptop battery. Always remember to shut down containers when they are not in use instead of letting them run in the background. 
   - To stop the running container, type `exit` in the container terminal.
   - Alternatively, you can press the stop (block) or the trash can icon next to the container in the Docker Desktop application. 
   - In the terminal run the command `docker rmi [container name]` to delete a container. 

By following these steps, you should be able to set up and use the pre-built Docker image for Maverick, and work within the container to pull and manage your GitHub repositories. If you encounter any issues, refer to the Docker documentation or seek assistance from your team.