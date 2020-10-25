# #EndChildFoodPoverty

This project by [Joe Innes](https://joeinn.es) & [Traist Web Services](https://traist.co.uk) was designed after the UK government decided not to extend free school meals to children during the October half-term.

Although children do not normally receive free school meals outside of term time, the unprecedented economic situation caused by COVID-19 and mass layoffs means that many parents face the very real threat of being unable to feed their children properly over the coming week.

[@MarcusRashford](https://twitter.com/MarcusRashford) started an initiative to encourage local businesses to step in to fill the gap left when the government failed.

This site allows parents to quickly identify businesses near them who will feed their children for free over the coming week.

![Screenshot of app](https://cdn.glitch.com/4c0f61c1-ab19-4504-a817-db81aa851c36%2FScreen%20Shot%202020-10-25%20at%2011.59.16.png?v=1603623604484)
![Screenshot of app](https://cdn.glitch.com/4c0f61c1-ab19-4504-a817-db81aa851c36%2FScreen%20Shot%202020-10-25%20at%2011.59.45.png?v=1603623604922)

## Technical Details

This is a relatively simple Express app. There is a master data repository on Airtable, where it can be updated prior to syncing to the site.

For performance reasons, and to minimise the API calls out to Airtable, locations are synced into a local SQLite database, which is cached in memory for thirty seconds (theoretically if the server was persistent, it would be enough to cache in memory until the next sync with Airtable, but Glitch may spin this site down for inactivity, so we can't rely on in-memory stores).

On the front-end, the site uses Leaflet.js and the Geolocation API, but no user data is sent back to the server.

### Requirements
* Node
* Express
* Sequelize
* SQLite

### Installation
1. Clone this project (or remix)
2. Run `npm install`
3. Run `npm run start`