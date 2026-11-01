from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from datetime import datetime
import os

app = FastAPI(title="Dynamic Portfolio API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Setup
DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://postgres:Hansolo1808%2318@db.gydspeetlwfgsuuaprmz.supabase.co:5432/postgres")
# Ensure the dialect is correct for SQLAlchemy
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

SQLALCHEMY_DATABASE_URL = DATABASE_URL
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String)
    message = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

@app.post("/contact")
def submit_contact(req: ContactRequest, db: Session = Depends(get_db)):
    try:
        new_msg = ContactMessage(name=req.name, email=req.email, message=req.message)
        db.add(new_msg)
        db.commit()
        db.refresh(new_msg)
        return {"status": "success", "message": "Contact message received!"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/portfolio-data")
def get_portfolio_data():
    return {
        "profile": {
            "name": "Mochamad Rois Nabhan",
            "title": "Digital Designer & Developer",
            "description": "Specialized in Material Physics with a strong focus on high quality analytical outcomes. Cultivated a passion for data science and machine learning to bridge theoretical physics with data driven industrial solutions.",
            "email": "roisnabhan.01@gmail.com",
            "phone": "+62 81312930543",
            "location": "South Jakarta, DKI Jakarta",
            "linkedin": "www.linkedin.com/in/mchronn"
        },
        "education": [
            {
                "institution": "Universitas Pendidikan Indonesia",
                "location": "Bandung, Indonesia",
                "degree": "Bachelor of Science (S.Si), Physics",
                "gpa": "3.40/4.0",
                "year": "2025"
            }
        ],
        "experience": [
            {
                "company": "PT Bank Rakyat Indonesia Tbk (BRI) • Danantara Indonesia",
                "location": "Jakarta, Indonesia",
                "role": "Data Analyst (Network & Retail Funding)",
                "duration": "Juni 2026 - Present",
                "highlights": [
                    "Evaluated risk profiles to ensure all credit card approvals strictly aligned with internal compliance and target market policies.",
                    "Conducted end to end applicant data validation across multiple financial systems to prevent fraud.",
                    "Analyzed applicant incomes and existing banking assets to make data driven, responsible credit limit recommendations.",
                    "Evaluation process for diverse card products, including Co Branded, Regular, and Virtual Credit Cards (VCC)."
                ]
            },
            {
                "company": "PT Bank Rakyat Indonesia Tbk (BRI)",
                "location": "Sudirman Jakarta, Indonesia",
                "role": "Consumer Risk Management (CRM) Data Analytics Internship",
                "duration": "November 2025 - Mei 2026",
                "highlights": [
                    "Supported end to end development of Application, Behavior, and Collection scorecards.",
                    "Finalized technical review of the merged NFI and FI Credit Scorecard model.",
                    "Conducted advanced statistical analysis using IV, WoE, and PD calculations."
                ]
            },
            {
                "company": "Badan Riset dan Inovasi Nasional (BRIN)",
                "location": "Bandung. Indonesia",
                "role": "Bachelor Thesis Research and Researcher Internship",
                "duration": "Januari 2025 - Juli 2025",
                "highlights": [
                    "Researched and developed activated carbon specifically targeting Methylene Blue dye removal.",
                    "Conducted advanced studies on adsorption isotherms and kinetics.",
                    "Perform advanced analysis using Scanning Electron Microscopy and X Ray Diffraction."
                ]
            },
            {
                "company": "Kampus Mengajar",
                "location": "Serang, Indonesia",
                "role": "Tutor Junior High School",
                "duration": "August 2021 - December 2021",
                "highlights": [
                    "Taught four students about physics, mathematics, and logical thinking.",
                    "Monitored the development process of each student."
                ]
            }
        ],
        "projects": [
            {
                "title": "Credit Data System",
                "category": "Data Analytics",
                "year": "2026",
                "desc": "Comprehensive credit record lookup, automated credit eligibility calculations, and SLIK applicant validation platform for enterprise lending workflows.",
                "tags": ["React", "FastAPI", "SQL", "Risk Scoring", "SLIK"],
                "badge": "Enterprise Platform",
                "image": "/credit_lookup/img_1.jpg"
            },
            {
                "title": "Dhira Foundation Financial Apps",
                "category": "Financial Operations",
                "year": "2026",
                "desc": "Comprehensive financial operations and enterprise management platform built for Yayasan Dhira. Features live cashflow analytics tracking income and expense trends across 30 days, tiered approval workflows for operational spending, automated honorarium billing for doctors and staff, digital attendance logging, patient therapy monitoring, and role based access control protected by Cloudflare Turnstile.",
                "tags": ["Full Stack Web", "Financial Analytics", "Cashflow ERP", "Approval Workflow", "Cloudflare Security"],
                "badge": "Enterprise Platform",
                "image": "/dhira/dashboard.png"
            },
            {
                "title": "NLP Voice Scoring (Sentinel)",
                "category": "AI & Machine Learning",
                "year": "2026",
                "desc": "Deep dive analysis and voice scoring dashboard with light glassmorphism UI for audio emotion & sentiment analysis.",
                "tags": ["Python", "NLP", "Machine Learning", "FastText", "Speech Analytics"],
                "badge": "AI Powered",
                "image": "/nlp-voice-scoring.gif"
            },
            {
                "title": "Merged Credit Scorecard Model",
                "category": "Data Science",
                "year": "2026",
                "desc": "Technical review and advanced statistical analysis for risk prediction evaluating KS Statistic, PSI, and score banding.",
                "tags": ["Python", "Risk Modeling", "KS Stat", "PSI", "WoE / IV"],
                "badge": "Financial Modeling",
                "image": "/merged-credit-scorecard.gif"
            },
            {
                "title": "Scorecard Builder App",
                "category": "Data Analytics",
                "year": "2026",
                "desc": "Interactive web application for credit scorecard management with dynamic risk grading and manual override capabilities.",
                "tags": ["Web App", "Python", "Interactive Analytics", "Risk Decisioning"],
                "badge": "Internal Tool",
                "image": "/scorecard-builder.gif"
            },
            {
                "title": "Activated Carbon Dye Removal",
                "category": "Material Science",
                "year": "2025",
                "desc": "Research on adsorption isotherms and reaction kinetics for Methylene Blue dye removal using high performance activated carbon.",
                "tags": ["Material Physics", "Adsorption Kinetics", "SEM & XRD", "BRIN Research"],
                "badge": "National Research",
                "image": "/activated-carbon.gif"
            },
            {
                "title": "CalGen",
                "category": "Software",
                "year": "2022",
                "desc": "Customizable Calculating App Generator Platform designed to assist students and researchers in mathematical computing.",
                "tags": ["Software Dev", "Algorithm", "App Generator", "Python"],
                "badge": "🥈 Silver Award • MIIX 2022",
                "image": "/calgen.gif"
            },
            {
                "title": "AFIF - TDCS",
                "category": "IoT",
                "year": "2021",
                "desc": "Automatic Fish Feeder and Turbidity Device Censored System integrating sensors, automated microcontrollers, and live monitoring.",
                "tags": ["IoT Hardware", "Microcontroller", "Turbidity Sensor", "Automation"],
                "badge": "🥉 Bronze Award • IIIC 2021",
                "image": "/afif-tdcs.gif"
            }
        ],
        "achievements": [
            {
                "title": "FPMIPA Awards & HMF Appreciation 2021",
                "role": "Awardee",
                "date": "August - December 2021",
                "description": "Received awards for IoT projects that have been completed in international events."
            },
            {
                "title": "International Invention and Innovative Competition 2021",
                "role": "Bronze Award",
                "date": "June 2021",
                "description": "Contributed as a Project Leader and Initiator of 'AFIF - TDCS' (Automatic Fish Feeder and Turbidity Device Censored System)."
            },
            {
                "title": "Malaysia Invention and Inovation Expo 2022",
                "role": "Silver Award",
                "date": "April 2022",
                "description": "Contributed as a part Initiator and project scriptwriter of 'CalGen' (Customizable Calculating App Generator Platform)."
            }
        ]
    }
