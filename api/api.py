from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pickle
import pandas as pd
import os
from model.fasade import RecSys
from model.main import replace_order_day

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


root_data_dir = 'data'


orders_train = (
    pd.read_csv(
        os.path.join(root_data_dir, 'data_sg', 'orders_sg_train.txt'),
        nrows=10000,
        index_col=0))


orders_test = (
    pd.read_csv(
        os.path.join(root_data_dir, 'data_sg', 'orders_sg_test.txt'),
        nrows=10000,
        index_col=0))


products_data = (
    pd.read_csv(
        os.path.join(root_data_dir, 'data_sg', 'products_sg.txt'),
        index_col=0))

orders_train['order_day'] = orders_train['order_day'].apply(replace_order_day)

model = RecSys(orders_train, orders_test, products_data, user_id=0)

model.baseline()
model.vectorization()

@app.route('/', methods=['GET'])
@cross_origin()
def predict_cart(user_id='2e7276ad3a'):
    # vendor_id, product_id, name, unit_price
    prediction = model.recommendations('personal', user_id).personal_rec(user_id).values.tolist()
    return jsonify({'res_list': prediction})