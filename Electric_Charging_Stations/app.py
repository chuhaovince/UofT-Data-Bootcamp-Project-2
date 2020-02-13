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
 #__author__ = 'mLab'

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://heroku_kmpx4htl:388nghofnub05u3dgf17qgf8lb@ds045588.mlab.com:45588/heroku_kmpx4htl?retryWrites=false"
mongo = PyMongo(app)

# Store the API url
opendataURL = "https://api.openchargemap.io/v3/poi/?output=json&latitude=43.6532&longitude=-79.3832&distance=500&distanceunit=KM&countrycode=CA&maxresults=1000&opendata=true&client=Ontario%20charging%20stations&key=opendatapi"

# track the application-level data during a request
app.app_context().push()

# Get resutls in json format
#response = requests.get(opendataURL).json()

# Create a new collection called stations
#stationData = mongo.db.stations

# Insert data into this collection(raw data)
#stationData.insert_many(response)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results
@app.route("/add", methods=["GET", "POST"])
def add():
    if request.method == "POST":
        addressTitle = request.form["Title"]
        address = request.form["Address"]
        town = request.form["town"]
        province = request.form["state"]
        lat = request.form["Lat"]
        lng = request.form["Lon"]
        connectionTitle = request.form["Plug_type"]
        ID = request.form["ID"]
        levelID = request.form["Level"]

        new_location = {
            "AddressInfo" : {
                "Title" : addressTitle,
                "AddressLine1" : address,
                "Town" : town,
                "StateOrProvince" : province,
                "Latitude" : lat,
                "Longitude" : lng
            },
            "Connections" : [{
                "ConnectionType" : {
                    "Title" : connectionTitle
                },
                "LevelID" : ID;
                "Level" : {
                    "Title" : levelID
                }
            }]
        }
        # Insert the new location data into database collection called stations
        mongo.db.OpenData.insert(new_location)
        return redirect("/", code=302)

    return render_template("Add.html")


@app.route("/api/allocations")
def locations():
    # Fetch all data from database and jsonify it
    data = mongo.db.OpenData.find()
    data = dumps(data)
    #print(data)
    return data

# @app.route("/api/types")
# def types():
#     data = mongo.db.OpenData.distinct("Connections.ConnectionType.Title")
#     print(dumps(data))
#     return dumps(data)

@app.route("/search")
def search():
    return render_template("search_new.html")

@app.route("/login")
def login():
    return render_template("login.html")
    

# @app.route("/api/filter")
# def filterlocation():

#     # Get the user selected level
#     # connector_level = request.form("level_select")
#     # connector_type = request.form("type_select")
#     # Filter the database with the selected level
#     # data = mongo.db.stations.find({"$and" :[{"Connections.LevelID" : connector_level}, {"Connections.ConnectionType.Title" : connector_type}]})
    
#     print(f'sssss: {connector_level}')
#     jsondata = dumps(data) # serialization/convert to json object
#     print(type(jsondata))
#     return jsondata


    
if __name__ == "__main__":
    app.run(debug=True)
