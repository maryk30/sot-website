from flask import Flask, render_template
from flask_pymongo import PyMongo
from config import Config
from flask import request, redirect, url_for, session
from database.models import verify_admin   
from flask import jsonify
from chatbot.rules import get_chatbot_response

app = Flask(__name__)
app.config.from_object(Config)

mongo = PyMongo(app)

# ---------- ROUTES ----------

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json()
    user_message = data.get("message", "")
    response = get_chatbot_response(mongo, user_message)
    return jsonify({"response": response})

@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        admin = verify_admin(mongo, username, password)
        if admin:
            session["admin"] = username
            return redirect(url_for("admin_dashboard"))

    return render_template("admin/login.html")

@app.route("/admin/dashboard")
def admin_dashboard():
    if "admin" not in session:
        return redirect(url_for("admin_login"))
    return render_template("admin/dashboard.html")

@app.route("/admin/logout")
def admin_logout():
    session.pop("admin", None)
    return redirect(url_for("home"))

# ---------- PUBLIC FACULTY ----------
@app.route("/faculty")
def faculty():
    faculty_list = mongo.db.faculty.find()
    return render_template("faculty.html", faculty=faculty_list)


# ---------- ADMIN FACULTY ----------
@app.route("/admin/faculty", methods=["GET", "POST"])
def manage_faculty():
    if "admin" not in session:
        return redirect(url_for("admin_login"))

    if request.method == "POST":
        mongo.db.faculty.insert_one({
            "name": request.form["name"],
            "designation": request.form["designation"],
            "department": request.form["department"],
            "email": request.form["email"]
        })

    faculty_list = mongo.db.faculty.find()
    return render_template("admin/manage_faculty.html", faculty=faculty_list)

# ---------- EVENTS ----------
@app.route("/events")
def events():
    events = mongo.db.events.find()
    return render_template("events.html", events=events)


@app.route("/admin/events", methods=["GET", "POST"])
def manage_events():
    if "admin" not in session:
        return redirect(url_for("admin_login"))

    if request.method == "POST":
        mongo.db.events.insert_one({
            "title": request.form["title"],
            "date": request.form["date"],
            "description": request.form["description"]
        })

    events = mongo.db.events.find()
    return render_template("admin/manage_events.html", events=events)


# ---------- ARTICLES ----------
@app.route("/articles")
def articles():
    articles = mongo.db.articles.find()
    return render_template("articles.html", articles=articles)


@app.route("/admin/articles", methods=["GET", "POST"])
def manage_articles():
    if "admin" not in session:
        return redirect(url_for("admin_login"))

    if request.method == "POST":
        mongo.db.articles.insert_one({
            "title": request.form["title"],
            "content": request.form["content"],
            "author": request.form["author"],
            "date": request.form["date"]
        })

    articles = mongo.db.articles.find()
    return render_template("admin/manage_articles.html", articles=articles)

@app.route("/placements")
def placements():
    return render_template("placements.html")
# ---------- MAIN ----------

if __name__ == "__main__":
    app.run(debug=True)