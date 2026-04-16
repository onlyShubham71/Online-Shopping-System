import mysql.connector

# import mysql.connector

def get_db_connection():
    connection = mysql.connector.connect(
        host="127.0.0.1",
        port=3306,          # This is the new port you set in DBngin
        user="root",
        password="",        # DBngin uses no password by default
        database="ecommerce_db"
    )
    return connection
