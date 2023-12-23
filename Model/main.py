import pandas as pd
import os

from fasade import RecSys

#from sklearn.ensemble import GradientBoostingRegressor

def replace_order_day(x):
    return int(x.replace(' days', ''))

root_data_dir = 'C:/Users/Sover/Desktop/July/'

orders_train = (
    pd.read_csv(
        os.path.join(root_data_dir, 'data_sg', 'orders_sg_train.txt'),
        nrows=200000,
        index_col=0))


orders_test = (
    pd.read_csv(
        os.path.join(root_data_dir, 'data_sg', 'orders_sg_test.txt'),
        nrows=100000,
        index_col=0))


products_data = (
    pd.read_csv(
        os.path.join(root_data_dir, 'data_sg', 'products_sg.txt'),
        #nrows=20000,
        index_col=0))


print('train rows %d, test rows %d' % (orders_train.shape[0], orders_test.shape[0]))

orders_train['order_day'] = orders_train['order_day'].apply(replace_order_day)


model = RecSys(orders_train, orders_test, products_data, user_id=10)

model.baseline()
model.vectorization()
#print(model.recommendations())
#print(model.recommendations('random'))
print(model.recommendations('personal'))

