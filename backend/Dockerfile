FROM python:3.10-alpine
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /backend
COPY requirements.txt /backend/
RUN pip install -r requirements.txt
COPY . .
