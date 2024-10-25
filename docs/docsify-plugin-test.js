(function () {
    var test = function (hook, vm) {
      hook.beforeEach(function (markdown, next) {
        const filesMap = {
          '#/cv/scene_perception': 'https://raw.githubusercontent.com/umigv/UMARV-CV-ScenePerception/main/README.md',
          '#/cv/yolo_stack': 'https://raw.githubusercontent.com//umigv/yolo_stack/main/README.md',
          '#/cv/onboarding': 'https://raw.githubusercontent.com/umigv/CV-Onboarding/main/README.md',
          '#/nav/nav_stack': 'https://raw.githubusercontent.com/umigv/nav_stack/main/README.md',
          '#/nav/onboarding': 'https://raw.githubusercontent.com/umigv/nav-onboarding-2024/main/README.md',
          '#/nav/simulation': 'https://raw.githubusercontent.com/umigv/simulation_stack/main/README.md',
          '#/embedded/stack': 'https://raw.githubusercontent.com/umigv/Embedded_Stack_ROS2/master/Readme.md',
          '#/sensors/onboarding': 'https://raw.githubusercontent.com/umigv/sensors-onboarding/main/README.md',
        };

        try {
            const url = filesMap[window.location.hash];
            if (url) {  
                fetch(url)
                .then(response => response.text())
                .then(text => {
                    console.log('Loaded', url);
                    next(markdown + text);
                })
                .catch(error => {
                    console.error('Error:', error);
                    next(markdown);
                });
            }

        } catch (e) {
          console.error(e);
        } finally {
          next(markdown);
        }
      });

      hook.afterEach(function (html, next) {
        next(html);
      });
    };

    $docsify = $docsify || {};
    $docsify.plugins = [].concat(test, $docsify.plugins || []);
  })();
