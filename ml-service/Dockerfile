FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# ✅ Étape clé : changer de source PyPI pour un miroir rapide
RUN pip install --upgrade pip setuptools wheel \
 && pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple \
 && pip install --no-cache-dir -r requirements.txt --default-timeout=300

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
