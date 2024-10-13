from flask import Flask, request, jsonify
from config import SessionLocal, engine
from models import Base, User
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from config import SessionLocal, engine
from models import Base, Task, User
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Create the database tables if they don't exist
Base.metadata.create_all(bind=engine)

# Seed initial users
Session = sessionmaker(bind=engine)
session = Session()

# Check if users already exist to avoid duplicates
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


@app.route('/users/children', methods=['GET'])
def get_children():
    session = SessionLocal()
    children = session.query(User).filter(User.role == "Child").all()
    session.close()
    return jsonify([{"id": child.id, "username": child.username} for child in children])

@app.route('/users/parents', methods=['GET'])
def get_parents():
    session = SessionLocal()
    parents = session.query(User).filter(User.role == "Parent").all()
    session.close()
    return jsonify([{"id": parent.id, "username": parent.username} for parent in parents])

@app.route('/users/children', methods=['POST'])
def add_child():
    data = request.json
    username = data.get('username')
    pincode = data.get('pincode')

    session = SessionLocal()
    existing_user = session.query(User).filter_by(username=username).first()
    if existing_user:
        session.close()
        return jsonify({"status": "failure", "message": "Username already exists"}), 400

    new_child = User(username=username, role="Child", pincode=pincode)
    session.add(new_child)
    session.commit()
    session.close()
    return jsonify({"status": "success", "message": "Child added successfully"}), 201

@app.route('/users/parents', methods=['POST'])
def add_parent():
    data = request.json
    username = data.get('username')
    pincode = data.get('pincode')

    session = SessionLocal()
    existing_user = session.query(User).filter_by(username=username).first()
    if existing_user:
        session.close()
        return jsonify({"status": "failure", "message": "Username already exists"}), 400

    new_parent = User(username=username, role="Parent", pincode=pincode)
    session.add(new_parent)
    session.commit()
    session.close()
    return jsonify({"status": "success", "message": "Parent added successfully"}), 201

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
