import pymongo
import requests
from config import opendatapi
import sys

# Distributed under the MIT license - http://opensource.org/licenses/MIT

__author__ = 'mLab'

# Set the mongodb URL
mongoURI = "mongodb://heroku_kmpx4htl:388nghofnub05u3dgf17qgf8lb@ds045588.mlab.com:45588/heroku_kmpx4htl?retryWrites=false"

# Store the API url
opendataURL = "https://api.openchargemap.io/v3/poi/?output=json&latitude=43.6532&longitude=-79.3832&distance=500&distanceunit=KM&countrycode=CA&maxresults=1000&opendata=true&client=Ontario%20charging%20stations&key=opendatapi"

# Get resutls in json format
response = requests.get(opendataURL).json()

def main(args):

    # Connect to mongodb server
    client = pymongo.MongoClient(mongoURI)

    # Get the default database heroku give us
    db = client.get_default_database()

    # Create new collections under the default database
    opendataCollection = db["OpenData"]

    # Clean up the database before updating new data
    opendataCollection.delete_many({})

    # Insert new data into the opendataCollection/ build the table
    opendataCollection.insert_many(response)

    # Clocse the connection
    client.close()


if __name__ == '__main__':
    main(sys.argv[1:])
