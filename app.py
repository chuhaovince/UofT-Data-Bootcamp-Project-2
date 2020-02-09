# import necessary libraries
import os, sys
from flask import Flask, render_template, jsonify, request, redirect
from flask_pymongo import PyMongo
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

# Distributed under the MIT license - http://opensource.org/licenses/MIT
__author__ = 'mLab'

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://heroku_kmpx4htl:388nghofnub05u3dgf17qgf8lb@ds045588.mlab.com:45588/heroku_kmpx4htl?retryWrites=false"
mongo = PyMongo(app)



# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results
@app.route("/add", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        mongo.db.
        operatorInfoTitle = request.form["operatortitle"]
        operatorID = request.form["operatorid"]
        usagecost = request.form["usagecost"]
        addressTitle = request.form["addresstitle"]
        address = request.form["address"]
        town = request.form["town"]
        state = request.form["state"]
        country = request.form["country"]
        lat = request.form["Lat"]
        lon = request.form["Lon"]

        pet = Pet(name=name, lat=lat, lon=lon)
        db.session.add(pet)
        db.session.commit()
        return redirect("/", code=302)

    return render_template("form.html")


@app.route("/api/location")
def pals():
    results = mongo.session.query(Pet.name, Pet.lat, Pet.lon).all()

    hover_text = [result[0] for result in results]
    lat = [result[1] for result in results]
    lon = [result[2] for result in results]

    pet_data = [{
        "type": "scattergeo",
        "locationmode": "USA-states",
        "lat": lat,
        "lon": lon,
        "text": hover_text,
        "hoverinfo": "text",
        "marker": {
            "size": 50,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]

    return jsonify(pet_data)


if __name__ == "__main__":
    app.run()
