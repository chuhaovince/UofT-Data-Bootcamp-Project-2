import pymongo
import requests

# connect to mongodb server

client = pymongo.MongoClient("mongodb+srv://chuhaovince:biqu92cala@startmeup-k8pb0.mongodb.net/test?retryWrites=true&w=majority")

# Create database call ChargingStations
db = client.ChargingStations

# Create our table/collections
myCollection = db.charging_stations

# Store the API url
dataURL = "https://api.openchargemap.io/v3/poi/?output=json&latitude=43.6532&longitude=-79.3832&distance=500&distanceunit=KM&countrycode=CA&maxresults=1000&opendata=true&client=Ontario%20charging%20stations&key=f6e470b3-c2f2-4c69-a477-3dbac08fea4b";

# Get resutls in json format
response = requests.get(dataURL).json()

# Clean up the database before updating new data
myCollection.delete_many({})

# Updating new dataset
station_data = myCollection.insert_many(response)


