from flask import Flask, render_template
from flask_pymongo import PyMongo
import requests

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://heroku_9v26jv3z:jmfjg0g4642ejlj3dkp4hso9ll@ds047447.mlab.com:47447/heroku_9v26jv3z"
mongo = PyMongo(app)



@app.route("/scrape")
def scraper():
    mars_data = mongo.db.mars_data
    results = scrape_mars.scrape()
    mars_data.update({}, results, upsert=True)
    return redirect("/", code=302)