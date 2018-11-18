# SendIT 
## Project Overview

SendIT is a courier service that helps users deliver parcels to different destinations. SendIT
provides courier quotes based on weight categories. 

| EndPoint | Functionality |
| --- | --- |
| GET /parcels | Fetch all parcel delivery orders |
| GET /parcels/<parcelId> | Fetch a specific parcel delivery order |
| GET /users/<userId>/parcels | Fetch all parcel delivery orders by a specific user |
| POST /parcels | Create a parcel delivery order |
| PUT /parcels/<parcelId>/cancel | Cancel the specific parcel delivery order |

[![Build Status](https://travis-ci.org/niomwungeri-fabrice/andela-dev-challange.svg?branch=develop)](https://travis-ci.org/niomwungeri-fabrice/andela-dev-challange) <a href="https://codeclimate.com/github/niomwungeri-fabrice/andela-dev-challange/maintainability"><img src="https://api.codeclimate.com/v1/badges/fb87df2ab268be391be9/maintainability" /></a> [![Coverage Status](https://coveralls.io/repos/github/niomwungeri-fabrice/andela-dev-challange/badge.svg)](https://coveralls.io/github/niomwungeri-fabrice/andela-dev-challange)
