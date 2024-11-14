import mysql.connector
import os
from dotenv import load_dotenv
from fastapi.responses import JSONResponse

# .env 파일 로드
load_dotenv(dotenv_path="chating/.env")

username = os.getenv('user')
password = os.getenv('password')

# MySQL local 서버에 연결
connection = mysql.connector.connect(
    host="localhost",       # MySQL 서버 호스트 주소 (로컬이면 'localhost')
    user=username,   # MySQL 사용자 이름
    password=password, # MySQL 비밀번호
    database="chating",  # 사용할 데이터베이스 이름
    port=4000 #포트번호
)

if connection.is_connected():
    print("MySQL에 성공적으로 연결되었습니다.")
    
cursor = connection.cursor(dictionary=True) #데이터를 가져올 때 dict 형태로 가지고 오기