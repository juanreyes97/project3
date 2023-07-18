# This is the main script.
from flask import Flask, jsonify, render_template
import pandas as pd
from sqlalchemy import create_engine


# Create database connection
connection_string= 'postgresql+psycopg2://postgres:alvin1997@localhost:5432/airbnb_project'
engine = create_engine(connection_string)

app = Flask(__name__)

@app.route('/')
def main():
    # return '<h1>Hola Mundo</h1>'
    return render_template('index.html')


@app.route('/map-api')
def map():

    data = pd.read_sql("select * from airbnb where room_type= 'Shared room' or room_type= 'Entire home/apt' ", engine)
    
    response = data.to_json(orient='records') 

    return response

@app.route('/chart-api')
def chart():
    
    response = pd.read_sql("select * from airbnb where room_type= 'Shared room' or room_type= 'Entire home/apt' ", engine)
    response2 = pd.read_sql('select neighbourhood, avg(price) from airbnb group by neighbourhood', engine)
    response3 = pd.read_sql("select name, number_of_reviews from airbnb order by number_of_reviews desc limit 10", engine)
    response4= pd.read_sql("select room_type, count(room_type) from airbnb group by room_type", engine)

    response = {
        'id': response['id'].to_list(),
        'name': response['name'].to_list(),
        'host_id': response['host_id'].to_list(),
        'host_name': response['host_name'].to_list(),
        'neighbourhood_group': response['neighbourhood_group'].to_list(),
        'neighbourhood': response['neighbourhood'].to_list(),
        'latitude': response['latitude'].to_list(),
        'longitude': response['longitude'].to_list(),
        'room_type': response['room_type'].to_list(),
        'price': response['price'].to_list(),
        'minimum_nights': response['minimum_nights'].to_list(),
        'number_of_reviews': response['number_of_reviews'].to_list(),
        'last_review': response['last_review'].to_list(),
        'reviews_per_month': response['reviews_per_month'].to_list(),
        'calculated_host_listings_count': response['calculated_host_listings_count'].to_list(),
        'availability_365': response['availability_365'].to_list(),

        'ngbh': response2['neighbourhood'].to_list(),
        'avg': response2['avg'].to_list(),

        'airname': response3['name'].to_list(),
        'review': response3['number_of_reviews'].to_list(),

        'room': response4['room_type'].to_list(),
        'count': response4['count'].to_list(),
        
    }

    return response

if __name__ == '__main__':
    app.run(debug=False)