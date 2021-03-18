## Circle Back Mall

This is a genericized version of a simulation I built on contract for a machine learning company, which displays entrances and exists detected at a shopping mall over the course of a Saturday in 2018. I've updated the code to make it more in-line with contemporary React best-practices (including the hooks API, which hadn't been released yet when I built the simulation). While I was making changes, I also set up a GraphQL endpoint for the app to fetch data from (instead of loading data from a file included with the app).

The idea behind the simulation is that a "dot" represents 10 visitors (employees, shoppers, and so on) to the mall. Each hour, multiple dots drift towards the center of the mall from the entrances vistors were tracked using. Shortly afterwards, dots drift out of the mall, towards the exits that visitors used to leave. The process repeats every hour. 

The simulation is controlled using React - you can view most of the control logic in `src/components/ControlHeader.jsx`. The dots are drawn and moved using D3.js - most of the code related to that is located in `src/utils/movement.js`. As mentioned above, the app runs on data that it's getting from a GraphQL endpoint. You can get a sense of what the sample data might look like by taking a look at `src/graphql/queries.js`.

For security reasons, I'm storing the data endpoint's location as an environment variable (locally and on Heroku), so you won't be able to clone this repoository and run the app locally. If you want to see how it works, you can visit: https://circle-back-mall.herokuapp.com/. 

