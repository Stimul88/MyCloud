FROM python:3.10

WORKDIR /backend

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip
RUN pip install psycopg2-binary==2.8.6

COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY . .

#RUN apt-get update \
#    && apt-get -y install libpq-dev gcc \
#    && pip install psycopg2 \
