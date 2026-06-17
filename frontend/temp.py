import os
from PIL import Image
import numpy as np

def get_hash(p):
    img = Image.open(p).convert('L').resize((16,16))
    return np.array(img).astype(float).flatten()

t = get_hash(r"C:\Users\USER\.gemini\antigravity-ide\brain\c19eacc2-ff7f-4de8-9536-6a328ecf9086\media__1781669303325.jpg")

for i in range(1,9):
    try:
        p = rf"c:\Users\USER\Downloads\Web Portofolio Design\my-portfolio\frontend\public\brin_activities\img_{i}.jpg"
        err = np.mean((t - get_hash(p))**2)
        print(f"img_{i}.jpg: {err}")
    except Exception as e:
        print(f"img_{i}.jpg error: {e}")
