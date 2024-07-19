from datetime import datetime
from fileinput import filename

from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import AbstractUser
from django.db import models


def user_directory_path(instance, filename):
    # путь, куда будет осуществлена загрузка MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.user.username, filename)


class User(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    path = models.CharField(max_length=60, default='', null=True, blank=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'events_userlocation'

    def save(self, *args, **kwargs):
        self.path = f"files/{self.username.lower()}"
        super().save(*args, **kwargs)


# class Client(models.Model):
#     login = models.CharField(db_index=True, max_length=20, unique=True)
#     full_name = models.CharField(max_length=20)
#     email = models.EmailField(db_index=True, unique=True,  null=True, blank=True)
#     password = models.CharField(max_length=20)
#     is_admin = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)
#     path = models.CharField(default=user_directory_path)


class Files(models.Model):
    # client = models.ForeignKey(Client,on_delete=models.CASCADE)
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    # filename = models.FileField()
    # size = models.FileField()
    created_at = models.DateTimeField(auto_now_add=True)
    download_date = models.DateTimeField(auto_now=True)
    title = models.TextField()
    # cover = models.FileField(upload_to='files/')
    path = models.FileField(User, upload_to='path')

    class Meta:
        managed = True
        db_table = 'events_fileslocation'





