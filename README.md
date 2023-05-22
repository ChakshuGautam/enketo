<p align="center">
  <h1>Workflow Module</h1>
</p>

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Samagra-Development/workflow/tree/dev)

## About :open_book:

Enketo has been used all around the world for a wide range of uses from needs assessments in humanitarian aid, to raising historical awareness, to clinical research, to election monitoring.

## Features :dart:

- [x] Can connect to your custom backend
- [ ] Have the edit api in case user wants to edit submitted response
- [ ] Api for the customize change in XML of form
- [x] Have beautiful themes and widgets
- [x] Are printer-friendly
- [x] Can use very powerful skip and validation logic
- [x] Run on any device, mobile or desktop, as long as it has a fairly modern browser

## Use Case :rocket:

![Screencast from 03-02-22 05_31_50 PM IST](https://user-images.githubusercontent.com/56133783/152341126-ac03baa3-258c-473a-956a-d0973682234a.gif)

## Requirements :scroll:

1. Your machine should have [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) or [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Docker](https://docs.docker.com/get-docker/), [Python](https://www.python.org/downloads/) installed.

*Note: Preferable Npm version (6.14.15) and Node version(v14.18.1) and Ubuntu OS version(18.04)**

2. Check the node and npm version by running following commands.

```sh
node -v
npm -v
```

# How to get up and running?

- Fork this repo 🍴
- Click on the Gitpod button above ☝️
- It opens a complete development setup directly 😄
- No need to clone and struggle with installing packages, managing node versions, banging head on the keyboard, etc (Cool right?)

### This is how it looks 👀
![Gitpod Image](https://user-images.githubusercontent.com/46066481/227315278-7e4f4ee7-ffa5-4ffb-b614-54126d72f467.png)

# How to interact?
- If you go to ports on terminal and open the `React Wrapper app` running on port 3000 you can see a demo UI like this 👇

![Workfow Demo UI](https://user-images.githubusercontent.com/46066481/227316968-487e52db-0236-4282-b57a-73d71788d4ea.gif)
- Currently offering 4 demo flows namely
- Jumping Forms (Opening of next form once once is submitted)
- Hasura Submissions (Basically saving the form data to any database, hasura extending postgres in this case)
- Offline capabilites (How the form behaves when working offline)
- File Upload (How to handle uploading files to any desired CDN, Minio in this case)

# Flows Explained 📝
## Jumping Forms
- This flow basically covers how you can configure your forms using form spec file (covered in a little while) to handle how the submission works. Like opening another form or redirecting to some page within the app or opening this link [here](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

![Jumping Form Workflow](https://user-images.githubusercontent.com/46066481/227321550-55aee2c8-8c2e-4443-a922-9c23134e6e23.gif)

## Hasura Submissions
- Covering how to handle form data submission to your database be it a sql or NoSql based db. In our setup we have used Hasura which creates an instant GraphQL data provider to use with Postgres based db


![Hasura Submissions](https://user-images.githubusercontent.com/46066481/227329443-0c832935-ac4c-42ea-80e6-ee00282aa6e6.gif)

## Offline Capabilites
- Just touching on to the offline capabilites offered right now. Here we have configured the form such that rather than failing form submissions entirely, it throws a warning/info message to the user indicating that the user is offline and is advised to resubmit the form once they're back online.

![Offline Capabilites](https://user-images.githubusercontent.com/46066481/227333111-fba64444-de4b-4075-8c71-8cb1f783a1b7.gif)


## File Upload
- One of the most important thing in any kind of form input is how to handle file uploads. Workflow module allows you to configure your cdn easily and point file uploads directly to the CDN effortleslly 💃 In our configuration we have used Minio to store all the uploaded files.

![File Upload](https://user-images.githubusercontent.com/46066481/227331536-c28224a7-4b60-41ce-93a3-59fe20033201.gif)


# How to integrate custom backend?

In order to achiever this, the submission url in the form spec (covered later below) with your hosted backend.
![Submission Url](https://user-images.githubusercontent.com/46066481/227327334-30bd083e-cee3-488c-81b5-e8d68a72c91f.png)

# Future Enhancements :rocket:

- [Encrypting query parameters on rendering the enketo form. ](https://github.com/Samagra-Development/enketo/issues/1)
- Writing a API for changing an XML form directly from it.
- add npm scripts for install

We are trying to an inversion of control here.

# API Docs 🤓

### For Get API

`curl --location --request GET 'http://localhost:3002/form/form2'`

### Form PrefillXML API

```sh
curl 'https://3006-samagradevelop-workflow-mxpsr1yqse0.ws-us92.gitpod.io/prefillXML?form=jumping_form_1&onFormSuccessData=formFunction' \
  -H 'authority: 3006-samagradevelop-workflow-mxpsr1yqse0.ws-us92.gitpod.io' \
  -H 'accept: */*' \
  -H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
  -H 'content-type: text/plain;charset=UTF-8' \
  -H 'origin: https://3000-samagradevelop-workflow-mxpsr1yqse0.ws-us92.gitpod.io' \
  -H 'referer: https://3000-samagradevelop-workflow-mxpsr1yqse0.ws-us92.gitpod.io/' \
  -H 'sec-ch-ua: "Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36' \
  --data-raw '{}' \
  --compressed
```

## Architecture

<!-- Insert LLD Image here -->
![alt text](./docs/images/LLD.png "Title")


## Wrapper Config

Example config
```json
{
  "start": "form1",
  "forms": {
    "form1": {
      "skipOnSuccessMessage": true,
      "prefill": {},
      "submissionURL": "http://esamwad.samagra.io/api/v4/form/submit",
      "name": "SampleForm",
      "successCheck": "async (formData) => { console.log('From isSuccess', formData.getElementsByTagName('reg_no')[0].textContent); return formData.getElementsByTagName('reg_no')[0].textContent === 'registration123'; }",
      "onSuccess": {
        "notificationMessage": "Form submitted successfully or not Maybe",
        "sideEffect": "async (formData) => { return JSON.parse(decodeURIComponent('%7B%0A%20%20%20%20%20%20%20%20%22name%22%3A%20%22DEVA%22%2C%0A%20%20%20%20%20%20%20%20%22batch%22%3A%20%222021-2023%22%2C%0A%20%20%20%20%20%20%20%20%22id%22%3A%208%2C%0A%20%20%20%20%20%20%20%20%22DOB%22%3A%20%222005-03-04%22%2C%0A%20%20%20%20%20%20%20%20%22affiliationType%22%3A%20%22NCVT%22%2C%0A%20%20%20%20%20%20%20%20%22registrationNumber%22%3A%20%22ICA211021569832%22%2C%0A%20%20%20%20%20%20%20%20%22tradeName%22%3A%20%22Electrician%22%2C%0A%20%20%20%20%20%20%20%20%22iti%22%3A%207%2C%0A%20%20%20%20%20%20%20%20%22industry%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%22itiByIti%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22id%22%3A%207%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22name%22%3A%20%22GITI%20Nagina%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%22industryByIndustry%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22id%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22name%22%3A%20%22Kaushal%20Bhawan%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22latitude%22%3A%2030.695753%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22longitude%22%3A%2076.872025%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22schedules%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22is_industry%22%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D')); }",
        "next": {
          "type": "form",
          "id": "form2"
        }
      },
      "onFailure": {
        "message": "Form submission failed",
        "sideEffect": "async (formData) => { console.log(formData); }",
        "next": {
          "type": "url",
          "id": "google"
        }
      },
      "metaData": {
        "constant1": "Test"
      }
    },
    "form2": {
      "skipOnSuccessMessage": true,
      "prefill": {
        "pf_name": "`${onFormSuccessData.name}`",
        "pf_iti": "`${onFormSuccessData.itiByIti.name}`",
        "pf_trade": "`${onFormSuccessData.tradeName}`",
        "pf_batch": "`${onFormSuccessData.batch}`",
        "pf_industry": "`${onFormSuccessData.industryByIndustry.name}`"
      },
      "submissionURL": "http://esamwad.samagra.io/api/v4/form/submit",
      "name": "SampleForm",
      "successCheck": "async (formData) => { console.log('From isSuccess', formData.getElementsByTagName('reg_no')[0].textContent); return formData.getElementsByTagName('reg_no')[0].textContent === 'registration123'; }",
      "onSuccess": {
        "message": "Form submitted successfully",
        "sideEffect": "async (formData) => { console.log(formData); }",
        "next": {
          "type": "form",
          "id": "form2"
        }
      },
      "onFailure": {
        "notificationMessage": "Form submission failed",
        "sideEffect": "async (formData) => { console.log(formData); }",
        "next": {
          "type": "url",
          "id": "https://google.com"
        }
      },
       "metaData": {
        "constantForm2": "Test"
      }
    }
  },
  "urls": {
    "google": {
      "url": "https://google.com",
      "queryParams": {},
      "onSuccess": {
        "message": null,
        "sideEffect": "async (formData) => { console.log(formData); }",
        "next": null
      }
    }
  },
  "metaData": {}
}
```

### State
State for prefilling, sideEffect.
```json
{
    "onFormSuccessData": {},
    "formConfig": {},
    "formState": {},
}
```

TODO: Add details on the specifications

## Possible Attack Vectors
1. XSS (High Priority) - Simple form
2. SQL Injection (High Priority) - needs to be fixed.


### LocalSetup
1. Fork the repository on your local machine.
2. Make sure you have docker and docker compose on your machine.
3. Change the enviroment variables in sample.env or .env file as shown below.
   It will use the locally created containers and connect to those services. 
    ```
    REACT_APP_ENKETO_URL=http://localhost:8065
    REACT_APP_FORM_MANAGER_URL=http://localhost:3006
    REACT_APP_HASURA_URL=http://localhost:8080
    ```
4. Run the command
    - For Development Environment
        ```sh
        type -p curl >/dev/null || sudo apt install curl -y
        curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
        sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
        sudo apt update
        sudo apt install gh -y
        ```
   - For installing ODK-Central
        ```sh
        bash install-central.sh
        ```
   - To start Services

    1. If you have v1 of docker then excute this command
         ```sh
         docker-compose up -d
         ```
    2. Otherwisse execute this 
         ```sh
         docker compose up -d
         ```
NOTE:
-----
```
For local development enketo-express needs node 14 and pnpm@7
Run nvm use 14 && npm i -g pnpm@7 if developing in enketo-express
```
