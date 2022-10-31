# Introduction to Workflow

Workflow is an Open Source project aimed towards the creation of data flow models using config files thereby allowing you to easily create and interact with stateful applications with minimum setup.

We appreciate your interest in the project. Here are a few resources which you might find useful in order to get started or dive deeper into its architecture.

[Introduction to Workflow](https://samagra-development.github.io/workflow/) 👈 You are here

👉󠀠󠀠󠀠 󠀠󠀠󠀠󠀠󠀠[Getting Started](https://samagra-development.github.io/workflow/category/getting-started) <br/>
👉 [Guides](https://samagra-development.github.io/workflow/category/guides) <br/>
👉 [Advanced Guides](https://samagra-development.github.io/workflow/category/advanced-guides) <br/>
👉 [Future Roadmaps](https://samagra-development.github.io/workflow/category/future-roadmaps) <br/>
👉 [Community](https://samagra-development.github.io/workflow/category/community)

> If you would like to contribute to this project, kindly refer to the **Contributions** Page under the **Community** category. Kindly make

<br>

# Setup and Installation

## System Requirements

The primary requirements of the project include [**NodeJS**](https://nodejs.org/en/) and [**Docker**](https://www.docker.com/). Multiple ```node``` versions have been used and hence it is recommended that you have the latest version of ```NVM - Node Version Manager``` installed on your computer. A ```.nvmrc``` file will be added to every directory in order to make sure that the current ```node``` version is being used to build it.

> **Recommended :** NPM version (6.14.15) and Node versio (v14.18.1) and Ubuntu OS version (18.04)
> Your machine should have [Yarn](https://yarnpkg.com/) / [NPM](https://www.npmjs.com/) & [Python](https://www.python.org/) installed.

> You can check your ```node``` and ```npm``` versions by running the following commands

```
node -v
npm -v
```

## Installation

In order to make the process of getting started with the project as easy and seamless as possible, we have a single command setup for enabling fast and convenient setup.

👉 Go ahead and fork the repository to get your own copy by clicking on the ```Fork``` button.

👉 Clone the repository and select the **workflow** directory as the current directory.

```bash
git clone https://github.com/Samagra-Development/workflow
cd workflow
```

👉 Setup and all start packages and applications by running this single command
```bash
npm run start
```

This command should setup and initialize all the different packages on which the project depends on and also start the sample application for you to experiment with.

👉 The repository is structured as a **monorepo** managed using [**Turborepo**](https://turborepo.org/) in order to cache and speed up builds, create pipelines and enabling the concurrent execution of scripts, all of which result in an improved Developer Experience (DX). Active work continues on this and progress can be tracked [**here**](https://github.com/Samagra-Development/workflow) 

> Make sure you have ```Docker``` installed on your system as some of the packages depend on underlying docker containers. The team is currently planning to shift all servers to containers. You can track the progress on this migration [here](https://github.com/Samagra-Development/workflow/issues/14)

<hr>

### For Get API

`curl --location --request GET 'http://localhost:3002/form/form2'`

### Form Prefill API

```sh
curl --location --request POST 'http://localhost:3002/prefill' \
--header 'Content-Type: application/json' \
--data-raw '{
    "prefillSpec": {
        "pf_name": "`${onFormSuccessData.name}`",
        "pf_iti": "`${onFormSuccessData.itiByIti.name}`",
        "pf_trade": "`${onFormSuccessData.tradeName}`",
        "pf_batch": "`${onFormSuccessData.batch}`",
        "pf_industry": "`${onFormSuccessData.industryByIndustry.name}`",
        "ojt_month": "`${onFormSuccessData.industryByIndustry.schedules[0].is_industry === true ? 1 : 0}`"
    },
    "onFormSuccessData": {
        "name": "DEVA",
        "batch": "2021-2023",
        "id": 8,
        "DOB": "2005-03-04",
        "affiliationType": "NCVT",
        "registrationNumber": "ICA211021569832",
        "tradeName": "Electrician",
        "iti": 7,
        "industry": 1,
        "itiByIti": {
            "id": 7,
            "name": "GITI Nagina"
        },
        "industryByIndustry": {
            "id": 1,
            "name": "Kaushal Bhawan",
            "latitude": 30.695753,
            "longitude": 76.872025,
            "schedules": [
                {
                    "is_industry": true
                }
            ]
        }
    },
    "form": "form2"
}'
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
1. XSS (High Priority) - Simple form.
2. SQL Injection (High Priority) - needs to be fixed.