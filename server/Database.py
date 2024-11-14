import mysql.connector
import os
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from datetime import datetime
import pytz
import random

kst = pytz.timezone('Asia/Seoul')

# .env 파일 로드
load_dotenv(dotenv_path="../chating/.env")

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

create_table_query = """
CREATE TABLE IF NOT EXISTS chating (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(50) NOT NULL,
    receiver_name VARCHAR(50) NOT NULL,
    content VARCHAR(500) NOT NULL,
    day_time DATETIME
);
"""

cursor.execute(create_table_query)

def addChating(data):
    sender_name = data.sender_name
    receiver_name = data.receiver_name
    content = data.content
    day_time = datetime.now(kst)
    
    random_content = str(random.randint(0,101010))
    chating_info = [sender_name,receiver_name,content,day_time]
    chating_info_reverse = [receiver_name,sender_name,random_content,day_time
                            ] 
    sql = "INSERT INTO chating (sender_name, receiver_name, content, day_time) VALUES (%s,%s,%s,%s)"
    
    cursor.execute(sql, chating_info)

    cursor.execute(sql,chating_info_reverse)
    # 변경 사항을 커밋
    connection.commit()

    print("데이터가 성공적으로 삽입되었습니다.")
    print(chating_info)
    
    return {"status":200,"chating_info":chating_info}

def getChatByName(name):
    sql = "SELECT * FROM chating WHERE sender_name = %s OR receiver_name = %s"
    
    cursor.execute(sql,(name,name))

    # 결과 가져오기
    chatings = cursor.fetchall()  # 모든 행 가져오기
    
    for chatting in chatings:
        for key, value in chatting.items():
            if isinstance(value, datetime):
                chatting[key] = value.isoformat()  # datetime을 문자열로 변환
            
    return JSONResponse(content=chatings)

