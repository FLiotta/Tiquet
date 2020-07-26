import os
import psycopg2

class Database:
    def __init__(self):
        self.con = psycopg2.connect(
            host=os.environ.get('DB_HOST'),
            database=os.environ.get('DB'),
            user=os.environ.get('DB_USER'),
            password=os.environ.get('DB_PASSWORD')
        )
        self.cur = self.con.cursor()
    
    def query(self, query):
        self.cur.execute(query)
    
    def commit(self):
        self.con.commit()
    
    def close(self):
        self.cur.close()
        self.con.close()