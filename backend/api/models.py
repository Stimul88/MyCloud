import os
from datetime import datetime
from fileinput import filename

from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid


def user_directory_path(instance, filename):
    print()
    # путь, куда будет осуществлена загрузка MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.owner.id, filename)


class User(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    path = models.CharField(max_length=60, default='', null=True, blank=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super(User, self).save()
        print(args)
        if not self.path:
            self.path = 'media/user_' + str(self.id)
            self.save()


class Files(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owners')
    filename = models.CharField(max_length=255, unique=True)
    size = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    download_date = models.DateTimeField(auto_now=True)
    # url = models.FileField(upload_to=user_directory_path)
    title = models.TextField()
    path = models.FileField(upload_to=user_directory_path)

    # def __int__(self):
    #     return self.owner





