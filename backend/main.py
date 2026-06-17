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
            "description": "Specialized in Material Physics. Cultivating disciplined approach to research and focus on high-quality results. Cultivated a passion for data science and machine learning to bridge theoretical physics with data-driven industrial solutions.",
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
                "company": "PT Bank Rakyat Indonesia Tbk (BRI)",
                "location": "Sudirman Jakarta, Indonesia",
                "role": "Consumer Risk Management (CRM) Data Analytics Internship",
                "duration": "November 2025 - Mei 2026",
                "highlights": [
                    "Supported end-to-end development of Application, Behavior, and Collection scorecards.",
                    "Finalized the technical review of the merged (NFI-FI) Credit Scorecard model.",
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
                    "Perform advanced analysis using Scanning Electron Microscopy and X-Ray Diffraction."
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
