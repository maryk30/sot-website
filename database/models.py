from werkzeug.security import generate_password_hash, check_password_hash

def create_admin(mongo, username, password):
    return mongo.db.admins.insert_one({
        "username": username,
        "password": generate_password_hash(password)
    })

def verify_admin(mongo, username, password):
    admin = mongo.db.admins.find_one({"username": username})
    if admin and check_password_hash(admin["password"], password):
        return admin
    return None