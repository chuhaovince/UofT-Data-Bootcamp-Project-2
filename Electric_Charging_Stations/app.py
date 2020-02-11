# import necessary libraries
from flask import Flask, render_template, jsonify, request, redirect
from flask_pymongo import PyMongo
import requests
from bson.json_util import dumps
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

# track the application-level data during a request
app.app_context().push()

#################################################
# Database Setup
#################################################

# Distributed under the MIT license - http://opensource.org/licenses/MIT
# __author__ = 'mLab'

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/charging_station"
mongo = PyMongo(app)

# Store the API url
opendataURL = "https://api.openchargemap.io/v3/poi/?output=json&latitude=43.6532&longitude=-79.3832&distance=500&distanceunit=KM&countrycode=CA&maxresults=1000&opendata=true&client=Ontario%20charging%20stations&key=opendatapi"

# track the application-level data during a request
app.app_context().push()

# Get resutls in json format
response = requests.get(opendataURL).json()

# Create a new collection called stations
stationData = mongo.db.stations

# Insert data into this collection(raw data)
stationData.insert_many(response)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results
@app.route("/add", methods=["GET", "POST"])
def add():
    if request.method == "POST":
        addressTitle = request.form["addresstitle"]
        address = request.form["address"]
        town = request.form["town"]
        province = request.form["state"]
        lat = request.form["Lat"]
        lng = request.form["Lon"]
        connectionTitle = request.form["connextiontitle"]
        levelID = request.form["levelid"]

        new_location = {
            "OperatorInfo" : {
                "Title" : operatorInfoTitle,
                "ID" : operatorID
            },
            "UsageCost" : usagecost,
            "AddressInfo" : {
                "Title" : addressTitle,
                "AddressLine1" : address,
                "Town" : town,
                "StateOrProvince" : province,
                "Country" : {
                    "Title" : country
                }
            },
            "Latitude" : lat,
            "longitude" : lng,
            "Connections" : [{
                "Title" : connectionTitle,
                "LevelID" : levelID
            }]
        }

        # Insert the new location data into database collection called stations
        mongo.db.stations.insert(new_location)

        return redirect("/", code=302)

    return render_template("Add.html")


@app.route("/api/allocations")
def locations():
    # Fetch all data from database and jsonify it
    data = mongo.db.stations.find()
    data = jsonify(dumps(data))
    #print(type(data))
    return data

@app.route("/search")
def search():

    return render_template("search.html")

@app.route("/login")
def login():
    return render_template("login.html")
    
@app.route("/api/filter")
def filterlocation():
        # Get the user selected level
    connector_level = request.form.get("level_select")
    connector_type = request.form.get("type")
    # Filter the database with the selected level
    data = mongo.db.stations.find({{"Connections.LevelID" : connector_level}, {"Connections.ConnectionType.Title" : connector_type}})
    jsondata = jsonify(dumps(data)) # serialization/convert to json object

    return jsondata

    
if __name__ == "__main__":
    app.run()
