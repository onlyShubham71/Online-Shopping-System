import sys
import flask
import mysql.connector

def check_setup():
    print("--- Environment Check ---")
    print(f"Python Version: {sys.version}")
    print(f"Flask Version: {flask.__version__}")
    
    try:
        # Replace with your actual MySQL credentials to test the connection
        db = mysql.connector.connect(
            host="localhost",
            user="root", 
            password="your_password" 
        )
        if db.is_connected():
            print("✅ MySQL Connection: SUCCESS")
            db.close()
    except Exception as e:
        print(f"❌ MySQL Connection: FAILED (Error: {e})")
        print("Tip: Make sure your MySQL Server is running in System Settings.")

if __name__ == "__main__":
    check_setup()