from recommendations import Recommendations
from baseline import BaseLine
from vectorization import Vectorization

class RecSys:
    def __init__(self, train_data, test_data, content_data, user_id):
        self.orders_train = train_data
        self.orders_test = test_data
        self.products_data = content_data
        self.customer_id = user_id

    def baseline(self):
        model = BaseLine(self.orders_train, self.orders_test)

        self.product_to_id, self.id_to_product, self.customer_to_id = model.indexing()
        self.csr_matrix = model.create_csr(self.customer_to_id, self.product_to_id)
        self.model = model.model_als_fit(self.csr_matrix, self.customer_to_id, self.product_to_id, factors=250, iterations=1)
        return self.model

    def vectorization(self):

        pairs = Vectorization(self.orders_train,self.orders_test, self.product_to_id, self.customer_to_id)

        self.pairs = pairs.train_valid_union()

        return self.pairs

    def recommendations(self, rec='popularity', customer_id_str='f374c8c54c'):

        recs = Recommendations(self.model, self.products_data, self.pairs, self.csr_matrix, self.id_to_product, self.product_to_id, self.customer_to_id)

        if rec == 'random':
            recsys, accuracy = recs.random_rec(N=50)

        elif rec == 'personal':
            recsys, accuracy = recs.personal_rec(customer_id_str, N=50)

        else:        
            recsys, accuracy = recs.popularity_rec(N=50)

        return recsys, accuracy