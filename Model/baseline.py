import collections
from implicit.als import AlternatingLeastSquares
from scipy.sparse import csr_matrix
import pandas as pd
import numpy as np


class BaseLine:

    def __init__(self, train_df, test_df):
        self.orders_train = train_df
        self.orders_test = test_df
        

    def sorted_products(self):
        
        data_with_count = self.orders_train.groupby(['product_id'])['product_id'].count().reset_index(name='product_id_count')
        sort_data = data_with_count.sort_values(['product_id_count'], ascending=False)
        
        return sort_data

    def sorted_products_days(self):

        
        order_day_max = self.orders_train['order_day_int'].max()
        order_day_next = order_day_max - 10
        
        last_10_days_data = self.orders_train[(self.orders_train['order_day_int'] <= order_day_max) & (self.orders_train['order_day_int'] >= order_day_next)]['product_id'].reset_index(name='product_id')
        
        data_with_count = last_10_days_data.groupby(['product_id'])['product_id'].count().reset_index(name='product_id_count')
        sort_last_10_days_data = data_with_count.sort_values(['product_id_count'], ascending=False)
        
        return sort_last_10_days_data
        
    def indexing(self):
       
        unique_customers = self.orders_train.customer_id.unique()
        unique_products = self.orders_train.product_id.unique()
        
        # прямая и обратная индексация контента
        product_to_id = {j: i for i, j in enumerate(unique_products)}
        id_to_product = {j: i for i, j in product_to_id.items()}

        # прямая индексация пользователей
        customer_to_id = {j: i for i, j in enumerate(unique_customers)}

        return product_to_id, id_to_product, customer_to_id

    def last_views_top(self):
        order_day_max = 90
        order_day_min = 1
        
        orders_filter = self.orders_train.loc[(self.orders_train['order_day_int'] < order_day_max) & (self.orders_train['order_day_int'] > order_day_min)][['customer_id', 'product_id']].drop_duplicates()
        
        entries = np.ones(orders_filter.shape[0])
        return orders_filter, entries

    def create_csr(self, customer_to_id, product_to_id):

        orders_filter, entries = self.last_views_top()

        num_rows = len(customer_to_id)
        num_cols = len(product_to_id)
        entries = np.ones(orders_filter.shape[0])  # проставляем ненулевые элементы - единицы
        rows = tuple(customer_to_id[i] for i in orders_filter.customer_id.values)
        cols = tuple(product_to_id[i] for i in orders_filter.product_id.values)

        train_set_csr = csr_matrix(
            (entries, (rows, cols)),
            shape=(num_rows, num_cols),
            dtype=np.float32)

        return train_set_csr

    def model_als_fit(self, train_set_csr, customer_to_id, product_to_id, factors=64, iterations=1):
        
        implict_als_params = {'factors': factors, 'regularization': 0.1, 'alpha': 1.0, 'iterations': iterations, 'calculate_training_loss': True}
        model = AlternatingLeastSquares(**implict_als_params)

        # на вход подаём матрицу user_item
        model.fit(train_set_csr)
        return model


