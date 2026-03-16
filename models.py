from database import db
from datetime import datetime

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    role = db.Column(db.String(50), nullable=False)  # 'company', 'community', or 'ngo'
    projects = db.relationship('Project', backref='owner', lazy=True)

    def __repr__(self):
        return f"<User {self.username}, Role: {self.role}>"

class Project(db.Model):
    __tablename__ = "project"
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    trees_planted = db.Column(db.Integer, nullable=False)
    planting_cost = db.Column(db.Float, default=0.0)
    maintenance_cost = db.Column(db.Float, default=0.0)
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), default='pending_verification')
    carbon_rate_tons = db.Column(db.Float)
    is_ai_verified = db.Column(db.Boolean, default=False)
    blockchain_tx_hash = db.Column(db.String(256))

    credits = db.relationship('CarbonCredit', backref='project', lazy=True)

    def __repr__(self):
        return f"<Project {self.name}, Owner ID: {self.owner_id}>"

class CarbonCredit(db.Model):
    __tablename__ = "carbon_credit"
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    amount_tons = db.Column(db.Float, nullable=False)
    token_id = db.Column(db.String(256), unique=True, nullable=False)
    issued_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<CarbonCredit {self.token_id}, Project ID: {self.project_id}, Amount: {self.amount_tons}>"
