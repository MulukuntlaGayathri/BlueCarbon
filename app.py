import os
import json
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from services import calculate_carbon_credits, issue_carbon_credits
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# In-memory storage (temporary, lost on restart)
projects = []
MOCK_USER_ID = 1

from flask import send_from_directory

@app.route("/")
def index():
    """Serve the main index.html page from the static folder."""
    return send_from_directory("static", "index.html")

@app.route("/<path:filename>")
def serve_html(filename):
    """Serve any other static HTML file from the static folder."""
    return send_from_directory("static", filename)


@app.route("/api/projects", methods=['POST'])
def add_project():
    data = request.get_json()
    project_name = data.get('projectName')
    project_location = data.get('projectLocation')
    trees_planted = data.get('treesPlanted')

    if not all([project_name, project_location, trees_planted]):
        return jsonify({"error": "Missing data"}), 400

    carbon_tons = calculate_carbon_credits(int(trees_planted))
    token_id, tx_hash = issue_carbon_credits("mock_id", carbon_tons)

    project = {
        "id": len(projects) + 1,
        "name": project_name,
        "owner_id": MOCK_USER_ID,
        "location": project_location,
        "trees_planted": trees_planted,
        "carbon_rate_tons": carbon_tons,
        "is_ai_verified": True,
        "blockchain_tx_hash": tx_hash
    }

    projects.append(project)
    return jsonify({"success": True, "project": project_name}), 201

@app.route("/api/projects", methods=['GET'])
def get_projects():
    return jsonify(projects), 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
