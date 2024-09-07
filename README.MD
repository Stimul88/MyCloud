# Добро пожаловать в Paw Disk. Облачный диск для ваших файлов.

[![My Skills](https://skillicons.dev/icons?i=js,py,django,postgres,html,css,react,github)](https://skillicons.dev)

## Инструкция для разворачивания на сервере:


* ### 1. Установить Docker и Docker-compose на сервер.

* ### 2. Клонировать репозиторий на сервер:
 git clone https://github.com/Stimul88/MyCloud.git

* ### 3. Перейти в папку MyCloud/frontend:
 cd MyCloud/frontend

* ### 4. Открыть файл .env:
sudo nano .env

* ### 5. Изменить адрес сервера на свой:
REACT_APP_API_URL=http://[ваш адрес]:8000/

* ### 6. Вернуться в папку MyCloud:
cd ..

* ### 7. Запустить Docker-compose:
docker compose up

* ### 8. Перейти по адресу:
http://[ваш адрес]:8000/
