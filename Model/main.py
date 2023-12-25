import pandas as pd
import os

from fasade import RecSys

root_data_dir = 'C:/Users/Julia/Documents/Magistracy/2 Course/1 Semester/ML RecSys'


orders_train = (
    pd.read_csv(
        os.path.join(root_data_dir, 'Data', 'train_data.zip'),
        nrows=10000,
        index_col=0))


orders_test = (
    pd.read_csv(
        os.path.join(root_data_dir, 'Data', 'test_data.zip'),
        nrows=10000,
        index_col=0))


products_data = (
    pd.read_csv(
        os.path.join(root_data_dir, 'Data', 'products_sg.zip'),
        index_col=0))



print('train rows %d, test rows %d' % (orders_train.shape[0], orders_test.shape[0]))


model = RecSys(orders_train, orders_test, products_data)

model.baseline()
model.vectorization()

recsys = model.recommendations()

recs_pers, acc_pers = recsys.personal_rec('71dd99ef78', N=50)
recs_pop, acc_pop = recsys.popularity_rec(N=50)
recs_pop_last10days, acc_pop_last10days = recsys.popularity_rec_days(N=50)
recs_rand, acc_rand = recsys.random_rec(N=50)


print('Personal recommendations accuracy: ', acc_pers)
print('Popularity recommendations accuracy: ', acc_pop)
print('Popularity last 10 days recommendations accuracy: ', acc_pop_last10days)
print('Random recommendations accuracy: ', acc_rand)





