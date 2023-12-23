import pandas as pd
import os

from fasade import RecSys


root_data_dir = 'C:/Users/Julia/Documents/Magistracy/2 Course/1 Semester/ML RecSys'


orders_train = (
    pd.read_csv(
        os.path.join(root_data_dir, 'Data', 'train_data.txt'),
        nrows=10000,
        index_col=0))


orders_test = (
    pd.read_csv(
        os.path.join(root_data_dir, 'Data', 'test_data.txt'),
        nrows=10000,
        index_col=0))


products_data = (
    pd.read_csv(
        os.path.join(root_data_dir, 'Data', 'products_sg.txt'),
        index_col=0))



print('train rows %d, test rows %d' % (orders_train.shape[0], orders_test.shape[0]))


model = RecSys(orders_train, orders_test, products_data, user_id=0)

model.baseline()
model.vectorization()

recs_pers, acc_pers = model.recommendations('personal', '5dff46b6b0')
recs_pop, acc_pop = model.recommendations()
recs_rand, acc_rand = model.recommendations('random')

print('Personal recommendations accuracy: ', acc_pers)
print('Popularity recommendations accuracy: ', acc_pop)
print('Random recommendations accuracy: ', acc_rand)





