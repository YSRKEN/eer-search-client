import sqlite3
from contextlib import closing


class Database:
    def __init__(self, db_name: str):
        self.db_name = db_name
        with closing(sqlite3.connect(self.db_name)) as conn:
            c = conn.cursor()
            query = '''CREATE TABLE IF NOT EXISTS page_cache (
                id TEXT PRIMARY KEY,
                url TEXT NOT NULL,
                last_update INTEGER NOT NULL,
                title TEXT NOT NULL,
                body TEXT NOT NULL)'''
            c.execute(query)
            query = '''CREATE TABLE IF NOT EXISTS image_cache (
                id TEXT PRIMARY KEY,
                url TEXT NOT NULL,
                last_update INTEGER NOT NULL,
                body TEXT NOT NULL)'''
            c.execute(query)
