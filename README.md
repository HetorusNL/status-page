# Status Page

Status page showing the status of the websites provided in the config/pages.json and config/pages_sso.json configuration files.

## Using this repository

Websites can be added/removed by modifying the above mentioned JSON files while adhering to the following format for each entry:

```json
{
  "name": "Name of the website",
  "url": "https://website-root.url",
  "favicon": "https://website.url/path/to/favicon"
}
```

## Scripts

### Run the development server

run the following command to run the dev server:  
`yarn start`  
this starts the development server on `localhost:3000`

### Run a build (without incrementing version number)

run the following command to build the application:  
`yarn build`  
this updates the version number (if changed in `package.json`) and builds the application

### Run a build with version increment and git commit creation

the Semantic Versioning, also known as "semver", is used:  
version: `major.minor.patch`  
run one of the following commands:  
`yarn release-patch` // increments the `patch` number of the version  
`yarn release-minor` // increments the `minor` number of the version  
`yarn release-major` // increments the `major` number of the version  
all these three commands also create a git commit and git tag with the message:  
`v${npm_package_version}` (which is the major.minor.patch version)  
these three commands also perform a push to the master branch on github and push the tags

### Deploy the newly generated version to the server

run the following command to deploy the new version:  
`yarn deploy`  
this removes the previous build from the server and copies the build to the server
