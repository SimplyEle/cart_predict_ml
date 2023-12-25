from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pickle
import pandas as pd
import os
from model.fasade import RecSys

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


root_data_dir = 'data'

orders_train = (
    pd.read_csv(
        os.path.join(root_data_dir, 'data_sg', 'train_data.zip'),
        nrows=20000,
        index_col=0))


orders_test = (
    pd.read_csv(
        os.path.join(root_data_dir, 'data_sg', 'test_data.zip'),
        nrows=20000,
        index_col=0))


products_data = (
    pd.read_csv(
        os.path.join(root_data_dir, 'data_sg', 'products_sg.zip'),
        index_col=0))


model = RecSys(orders_train, orders_test, products_data)

model.baseline()
model.vectorization()

@app.route('/top_n_days', methods=['GET'])
@cross_origin()
def top_n_days():
    prediction, acc = model.recommendations().popularity_rec_days(N=100)
    prediction = prediction.values.tolist()
    return jsonify({'res_list': prediction})

@app.route('/get_random', methods=['GET'])
@cross_origin()
def get_random():
    prediction, acc = model.recommendations().random_rec()
    prediction = prediction.values.tolist()
    return jsonify({'rand_pr': prediction})

@app.route('/<user_id>', methods=['POST'])
@cross_origin()
def predict_cart(user_id):
    # vendor_id, product_id, name, unit_price
    prediction, acc = model.recommendations().personal_rec(user_id, N=100)
    prediction = prediction.values.tolist()
    return jsonify({'res_list': prediction})

@app.route('/', methods=['GET'])
@cross_origin()
def show_top():
    # vendor_id, product_id, name, unit_price
    prediction, acc = model.recommendations().popularity_rec(N=100)
    prediction = prediction.values.tolist()
    return jsonify({'res_list': prediction})