"""
Priya Senthilkumar, ECE 140A Winter 2023
Final Project - Leaderboard
Python file to initialize our database with the tables needed
"""
# Add the necessary imports
import mysql.connector as mysql
import os
from dotenv import load_dotenv
# Ensure we can open our database
load_dotenv("credentials.env")

# Read Database connection variables
db_host = os.environ['MYSQL_HOST']
db_user = os.environ['MYSQL_USER']
db_pass = os.environ['MYSQL_PASSWORD']

# Connect to the db and create a cursor object
db = mysql.connect(user=db_user, password=db_pass, host=db_host)
cursor = db.cursor()
# Create Leaderboard database and tables needed
cursor.execute("CREATE DATABASE if not exists Leaderboard;")
cursor.execute("USE Leaderboard;")
cursor.execute("drop table if exists User_settings;")
cursor.execute("drop table if exists Users;")
cursor.execute("drop table if exists sessions;")
""" Not completed 
cursor.execute("drop table if exists MVP_comments;")
cursor.execute("drop table if exists MVP_comments_history;") """
# ensure the creation was successful or return error
try:
    cursor.execute("""
    CREATE TABLE Users (
       user_id         integer  AUTO_INCREMENT PRIMARY KEY,
       first_name            VARCHAR(100) NOT NULL, 
       last_name            VARCHAR(100) NOT NULL,
       student_id           VARCHAR(9) NOT NULL,
       email                VARCHAR(150) UNIQUE NOT NULL,
       username             VARCHAR(50) UNIQUE NOT NULL,
       password             VARCHAR(255) NOT NULL,
       created_at TIMESTAMP NOT NULL default current_timestamp
   );
 """)
except RuntimeError as err:
    print("runtime error: {0}".format(err))

try:
    cursor.execute("""
   CREATE TABLE User_settings (
       id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
       user_id         integer  NOT NULL,
       email                VARCHAR(150) UNIQUE NOT NULL,
       username             VARCHAR(50) UNIQUE NOT NULL,
       password             VARCHAR(255) NOT NULL,
       FOREIGN KEY(user_id) REFERENCES Users(user_id)
   );
 """)
except RuntimeError as err:
    print("runtime error: {0}".format(err))

try:
    cursor.execute("""
   CREATE TABLE sessions (
       session_id         VARCHAR (64)  PRIMARY KEY,
        session_data json NOT NULL,
        created_at TIMESTAMP NOT NULL default current_timestamp
   );
 """)
except RuntimeError as err:
    print("runtime error: {0}".format(err))

"""
Not completed
try:
    cursor.execute(
   CREATE TABLE MVP_comments (
       user_id         integer  PRIMARY KEY,
       email                VARCHAR(150) NOT NULL,
       username             VARCHAR(50) UNIQUE NOT NULL,
       password             VARCHAR(255) NOT NULL
       FOREIGN KEY(user_id) REFERENCES User_login(user_id)
   );
)
except RuntimeError as err:
    print("runtime error: {0}".format(err))"""
