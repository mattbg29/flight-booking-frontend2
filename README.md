# Welcome
Welcome to my latest flight booking app!  For this app to run, make sure to also run the flght-booking-backend.  You will need to provide an Amadeus Developer key and an openweatherapp API key for this to run.  You can get free versions of each on their respective websites.

Once the above is setup, run the app!  This app takes as entry an airport origin (currently limited to just the 9 available with the free tier of Amadeus), a duration (2 to 12 days), a departure date, and a maximum price.  This app will pull the flight data from Amadeus (currently limited to 68 of the largest internatially), as well as the current weather from openweatherapp.  

# Next steps
If I had the full openweatherapi, I would set this up so that it pulls a weather forecast for trips within 2 weeks and the historical weather for trips further into the future.  For anyone with such access - this should be a reasonably straightforward code change, and would make the app more valuable.

Additionally, if I had the full Amadeus API, I would alter the input origin to allow any aiport and expand the destination airports within api/cityCode.js.  One day, perhaps...

Enjoy!