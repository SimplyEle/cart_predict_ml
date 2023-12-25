import pandas as pd
import numpy as np

class Recommendations:

    def __init__(self, model, content_df: pd.DataFrame, sort_pop_products, sort_pop_10_days_products, train_valid_pairs, train_set_csr, id_to_product, product_to_id, customer_to_id):
        self.products_data = content_df
        self.train_valid_pairs = train_valid_pairs
        self.sort_data = sort_pop_products 
        self.sort_10_days_data = sort_pop_10_days_products
        self.train_set_csr = train_set_csr
        self.id_to_product = id_to_product
        self.product_to_id = product_to_id
        self.customer_to_id = customer_to_id
        self.model = model


    def id_to_content_df(self, ids, id_to_item, scores=np.array([])):
        items = tuple(id_to_item[i] for i in ids)

        result_df = self.products_data[self.products_data.product_id.isin(items)]

        if scores.size != 0:
            result_df.loc[:, 'Recommended scores'] = scores
        
        return result_df

    def cust_history_recommend(self, customer_id, N=10):

        idx = [i for i in range(len(self.train_valid_pairs)) if customer_id == self.train_valid_pairs[i][0]][0]

        recommended_content, recommended_scores = self.model.recommend(
                    userid = customer_id,
                    user_items=self.train_valid_pairs[idx][1],
                    N=N,
                    filter_already_liked_items=False,
                    recalculate_user=True
        )
        res = self.id_to_content_df(recommended_content, self.id_to_product, recommended_scores)

        return res

    def apk(self, actual, predicted, k=10):

        if len(predicted) > k:
            predicted = predicted[:k]

        score = 0
        num_hits = 0

        if len(actual) == 0:
            return 0

        for i,p in enumerate(predicted):
            if p in actual and p not in predicted[:i]:
                num_hits += 1
                score += num_hits / (i+1)
  
        return score / min(len(actual), k)

    def top_n_recommends(self, order_history, top_n_result, apk=False):

        hit = 0

        if apk == True:
            hit = self.apk(order_history[2], top_n_result, 5)
            return hit

        if len(order_history[2]) > 0 and np.intersect1d(order_history[2], top_n_result).size > 0:
            hit = 1

        return hit


    def top_n_recommends_personal(self, order_history, customer_id, N, apk=False):
        top_n_result, recommended_scores = self.model.recommend(
                userid=order_history[0],
                user_items=order_history[1], #csr matrix here
                N=N,
                filter_already_liked_items=False,
                recalculate_user=True
        )
        
        
        hit = 0

        if apk == True:
            hit = self.apk(order_history[2], top_n_result, 5)
            return hit

        if len(order_history[2]) > 0 and np.intersect1d(order_history[2], top_n_result).size > 0:
            hit = 1
        

        return hit


    def random_rec(self, N=1):

        all_content = np.array(list(self.id_to_product.keys())) 
        top_n_result = np.random.choice(all_content, size=N, replace=True)
        
        hits = [self.top_n_recommends(i, top_n_result) for i in self.train_valid_pairs]

        acc = sum(hits)/len(hits)*100

        res = self.id_to_content_df(top_n_result, self.id_to_product)

        return res, acc

    def popularity_rec(self, N=10):

        top_n_popular_items = [self.product_to_id[i] for i in self.sort_data['product_id'][:N].tolist()]

        hits = [self.top_n_recommends(i, top_n_popular_items) for i in self.train_valid_pairs]

        acc = sum(hits)/len(hits)*100

        res = self.id_to_content_df(top_n_popular_items, self.id_to_product)

        return res, acc

    def popularity_rec_days(self, N=10):
        top_n_popular_items = [self.product_to_id[i] for i in self.sort_10_days_data['product_id'][:N].tolist()]

        hits = [self.top_n_recommends(i, top_n_popular_items) for i in self.train_valid_pairs]

        acc = sum(hits)/len(hits)*100

        res = self.id_to_content_df(top_n_popular_items, self.id_to_product)

        return res, acc

    def personal_rec(self, customer_id_str, N=10):

        customer_id = self.customer_to_id[customer_id_str]

        hits = [self.top_n_recommends_personal(i, customer_id, N) for i in self.train_valid_pairs]
             
        acc = sum(hits)/len(hits)*100

        res = self.cust_history_recommend(customer_id, N=50)

        return res, acc

    

    


