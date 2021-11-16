# trippin - Travel Tracker

Turing School of Software & Design

2108 Front-End Engineering, Mod 2 - Final Solo Project

## Abstract
Trippin is a place for both planning new and remembering old adventures. Built from scratch via APIs with traveler, trip, and destination data, it simulates a travel agency's client-facing web app. Clients, or members, visit the site, log in with their unique id number, and can review past, pending, and approved upcoming trips. They can request to book a new trip from a large assortment of destinations by filling out a form at the top. 

## Languages/Technoligy
Javascript, HTML, Sass, Webpack, day.js

## Learning Goals
* Apply all that we have learned in the past 6 weeks from network requests to WAI-ARIA to Sass
* Work with multiple APIs to dynamically send and receive data- build out an effective code structure for processing data
* Use OOP to drive the design of a complex application

## Install & Setup
1. Clone down the local server [here](https://github.com/turingschool-examples/travel-tracker-api)
2. `cd` into the directory
3. Run `npm install` and then `npm start`
4. In a separate Terminal window, clone down this repo
5. `cd` into the directory
6. Run `npm install` and then `npm start`
7. With both servers running in two different Terminal windows, head to `localhost:8080` in your browser  

## Web App Attributes 
1. On page load, a traveler login page is seen. Use any username from traveler1 - traveler50 (traveler## format) to see unique data for 50 different travelers. Password: travel
* If details are not correctly entered, error messaging shows
2. Once logged in, travelers are greeted with a homepage that shows any upcoming trips. A box on the right side will display if they are currently on a trip. Users can hover over the person icon on the upper right to see their profile data: name, personalized 'traveler type' and total spent in 2021 so far (approved trips only). This amount includes a 10% travel agent fee added to each trip.
3. In the top header section, clients can request new trips. All fields are required: they choose from a dropdown of alphabetized destinations, a departure/start date (with minimum restricted to the day after present day), number of days, and number of people. Once all fields are filled out, a cost estimate based on the details displays. This includes a 10% travel agent fee. It will change dynamically should the user continue to update any details prior to submitting. When they hit submit, a success or error message will replace the cost estimation box- this will disappear after 2 seconds. This newly added trip can be seen in via the 'Pending' option of the 'My Trips' dropdown.
4. Finally, a client can navigate between viewing their upcoming, past, or pending trips via the dropdown in the 'My Trips' section. Each trip is represented by a rectangular widget. The B&W background image enables clients to get a first, enticing visual of the location. Information present is the destination name, departure/start date & duration, and number of travelers.
5. If, for any reason, there is an issue with the request/response cycle on load or when adding a trip, proper error messaging will display.

## Future Improvements
* Add better responsiveness
* Add animations on button hover states
* Add flip card feature for trip cards with individual cost estimates on the back

## Project Spec & Rubric
[Here](https://frontend.turing.edu/projects/travel-tracker.html)

## Contributors
Kyra Bergsund


Header background illustration by [Tanyadzu](https://www.shutterstock.com/g/dziubanovska) via Adobe Stock
Person icon by [iconmonstr](https://iconmonstr.com/)