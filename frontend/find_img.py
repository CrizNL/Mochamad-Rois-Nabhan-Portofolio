import os
from PIL import Image
import numpy as np

def get_hash(p):
    img = Image.open(p).convert('L').resize((16,16))
    return np.array(img).astype(float).flatten()

t = get_hash(r"C:\Users\USER\.gemini\antigravity-ide\brain\c19eacc2-ff7f-4de8-9536-6a328ecf9086\media__1781671992620.jpg")
d = r"c:\Users\USER\Downloads\Web Portofolio Design\my-portfolio\frontend\public\kampus_mengajar_activities"

best_match = None
min_dist = float('inf')

for f in os.listdir(d):
    if f.endswith('.jpg'):
        p = os.path.join(d, f)
        h = get_hash(p)
        dist = np.mean((t - h)**2)
        if dist < min_dist:
            min_dist = dist
            best_match = f

print(f"Best match: {best_match} (dist: {min_dist})")
