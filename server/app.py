from flask import Flask, request, jsonify
from config import SessionLocal, engine
from models import Base, Task, User
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)

# Create the database tables if they don't exist
Base.metadata.create_all(bind=engine)

# Seed initial users for testing
Session = sessionmaker(bind=engine)
session = Session()

#  Check if users already exist to avoid duplicates
if session.query(User).count() == 0:
    noah = User(username="NOAH", role="Child", pincode="8925")
    naja = User(username="NAJA", role="Child", pincode="2409")
    far = User(username="FAR", role="Parent", pincode="0000")
    
    session.add_all([noah, naja, far])
    session.commit()
session.close()

@app.route('/')
def hello():
    return "Hello from the LaundryMoneyAlly API!"

@app.route('/tasks', methods=['GET'])
def get_tasks():
    session = SessionLocal()
    tasks = session.query(Task).all()
    session.close()
    return jsonify([{"id": task.id, "name": task.name, "reward": task.reward} for task in tasks])

@app.route('/validate_pincode', methods=['POST'])
def validate_pincode():
    data = request.json
    username = data.get('username')
    pincode = data.get('pincode')
    
    session = SessionLocal()
    user = session.query(User).filter_by(username=username).first()
    session.close()
    
    if user and user.pincode == pincode:
        return jsonify({"status": "success", "message": "Pincode valid"})
    else:
        return jsonify({"status": "failure", "message": "Invalid pincode"}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
