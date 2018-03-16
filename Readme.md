# Email Archive Explorer with React and Elasticsearch

Application for searching and exploring the archives of Hyperreal's Ambient Music mailing list: 

https://ambient-explorer.ml

Archives in their original format: http://music.hyperreal.org/lists/ambient/archives/ (~ 75k emails total)

These archives have been parsed and converted to JSON using PowerShell, then loaded into Elasticsearch on AWS. The front end is built in React and compiled with Webpack. 

This is version 3 of this application. Overview of the different versions:

1. Plain JavaScript app using a small subset of the data (1000 emails) loaded in the client (https://github.com/gwens/ambient-explorer-vanillajs). Searches as you type and returns prioritized results using a basic scoring system. Basic date filters. 
2. First React version, using create-react-app (https://github.com/gwens/ambient-explorer-react). Still uses client-side JSON data (doesn't work with the full dataset). Can set a date range but there are no sorting or filtering options. 
3. This version. Rebuilt using my Webpack build template, without create-react-app. Data now lives in an (unsecured) Elasticsearch on AWS. Can explore the full archive of 75k emails. Includes sorting and search filters. Styled!

Roadmap:

* Add lightweight API layer to add some security to the Elasticsearch
* Have another look at how the Elasticsearch API calls are handled (they are currently callbacks in various places after state changes)
* Refactor App.js (e.g. all search logic is handled by one big function at the moment...)
* Email threading..?

## Install dependencies

`npm install`

## Serve development build with Webpack Dev Server

`npm run dev`

## Create production build with Webpack

`npm run build`

## Serve production build locally with Express

`npm run serve`