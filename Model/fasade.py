from recommendations import Recommendations
from baseline import BaseLine
from vectorization import Vectorization

class RecSys:
    def __init__(self, train_data, test_data, content_data):
        self.orders_train = train_data
        self.orders_test = test_data
        self.products_data = content_data

    def baseline(self):
        model = BaseLine(self.orders_train, self.orders_test)

        self.sort_pop_products = model.sorted_products()
        self.sort_pop_10_days_products = model.sorted_products_days()
        self.product_to_id, self.id_to_product, self.customer_to_id = model.indexing()
        self.csr_matrix = model.create_csr(self.customer_to_id, self.product_to_id)
        self.model = model.model_als_fit(self.csr_matrix, self.customer_to_id, self.product_to_id, factors=100, iterations=1)
        return self.model

    def vectorization(self):

        pairs = Vectorization(self.orders_train, self.orders_test, self.product_to_id, self.customer_to_id)

        self.pairs, self.test_vecs = pairs.train_valid_union()

        return self.pairs, self.test_vecs

    def recommendations(self):

        recs = Recommendations(self.model, self.products_data, self.sort_pop_products, self.sort_pop_10_days_products, self.pairs, self.test_vecs, self.csr_matrix, self.id_to_product, self.product_to_id, self.customer_to_id)

        return recs