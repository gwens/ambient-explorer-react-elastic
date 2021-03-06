# Email Archive Explorer with React and Elasticsearch

Application for searching and exploring the archives of Hyperreal's Ambient Music mailing list: 

https://ambient-explorer.ml

Archives in their original format: http://music.hyperreal.org/lists/ambient/archives/ (~ 75k emails total)

These archives have been parsed and converted to JSON using PowerShell, then loaded into Elasticsearch on AWS. The front end is built in React and compiled with Webpack. 

This is the final version of this application. Overview of the different versions:

1. Plain JavaScript prototype using a small subset of the data (1000 emails) loaded in the client (https://github.com/gwens/ambient-explorer-vanillajs). Searches as you type and returns prioritized results using a basic scoring system. Basic date filters. 
2. First React version, using create-react-app (https://github.com/gwens/ambient-explorer-react). Still uses client-side JSON data (doesn't work with the full dataset). Can set a date range but there are no sorting or filtering options. 
3. This version. Rebuilt using my Webpack build template, without create-react-app. Data now lives in Elasticsearch on AWS, protected by a proxy (https://github.com/gwens/elasticsearch-proxy. Can explore the full archive of 75k emails. Includes sorting and search filters. Styled!

Roadmap:

* Error handling for Elasticsearch 
* Clear search and reset filters
* Log in and save favourites
* Email threading..?

## Install dependencies

`npm install`

## Serve development build with Webpack Dev Server

`npm run dev`

## Create production build with Webpack

`npm run build`

## Serve production build locally with Express

`npm run serve`