# Documentation for running all ARV software

## How to run the documentation locally:
1. Clone the repository
2. The documentation is written using a tool called `docsify`. To install `docsify`, run the following command:
    ```bash
    npm install -g docsify-cli
    ```
3. To run the documentation locally, run the following command:
   
    ```bash
      docsify serve docs
      ```
4. Open a browser and navigate to `http://localhost:3000`

## Updating documentation with content in this repository
1. Navigate to the `docs` directory
2. Update the content in the markdown files in the `docs/<subteam>` directory to the respective markdown files in the repository
3. Update the `_sidebar.md` file with the new content
4. Commit the changes and push to the repository
5. The documentation will be updated automatically

## Adding documentation from other GitHub repositories
1. Navigate to the respective directory where the documentation would be accessed on the website within the `docs` directory
2. Create a blank markdown file with a placeholder comment at the top of the file ex. `<---Placeholder--->`
3. In `docs/_sidebar.md`, add a new entry for the documentation with the path to the new markdown file
4. In `docsify-plugin-test.js`, add a new entry for the documentation in the ```filesMap``` object with the path to the new markdown file and the URL to the raw markdown file in the repository. Ensure the path follows the format `#/subteam/filename`
5. Commit the changes and push to the repository 

#### Example: 
`docs/cv/onboarding.md`:
```markdown
1. <---Placeholder--->
2. > Repository: [CV-Onboarding](https://github.com/umigv/CV-Onboarding)
3. ---
```
`docs/_sidebar.md`:
```markdown
...
- Computer Vision
  ...
  - [Onboarding](cv/onboarding.md)
  ...
```
`docsify-plugin-test.js`:
```javascript
const filesMap = {
    ...
    "#/cv/onboarding": "https://raw.githubusercontent.com/umigv/CV-Onboarding/main/README.md",
    ...
}
```


## Known Issues
1. Using direct links to the documentation site for paths that fetch content from other repositories will not work. The content will not be displayed. To access the content, navigate to the respective directory in the sidebar. Finding a solution to this issue.
2. External links in the documentation will not work unless the link is to another URL (ex. having a link to another MD file in the external repo). Finding a solution to this issue.