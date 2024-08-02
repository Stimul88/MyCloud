import os
from datetime import datetime
from fileinput import filename

from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid


# def update_filename(instance, filename):
#     # path = "upload/path/"
#     format = instance.owner + instance.transaction_uuid + instance.file_extension
#     # return os.path.join(path, format)
#     # return 'user_{0}/{1}'.format(instance.owner.id, uuid.uuid4())
#     return 'user_{0}/{1}'.instance.owner + instance.transaction_uuid + instance.file_extension


def user_directory_path(instance, filename):
    print()
    # путь, куда будет осуществлена загрузка MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.owner.id, filename)
    # print(filename)
    # return 'user_{0}/{1}'.format(instance.owner.id, uuid.uuid4())

# def user_path(instance, filename):
#     # путь, куда будет осуществлена загрузка MEDIA_ROOT/user_<id>/<filename>
#     return 'user_{0}/{1}'.format(instance.owner.id, filename)


class User(AbstractUser):
    # id = models.AutoField(primary_key=True, editable=False)
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    # path = models.CharField(max_length=60, default='', null=True, blank=True)
    path = models.CharField(max_length=60, default='', null=True, blank=True)
    # path = models.CharField(max_length=60, default='', editable=False)
    # path = models.CharField(upload_to=user_directory_path)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super(User, self).save()
        print(args)
        if not self.path:
            self.path = 'media/user_' + str(self.id)
            self.save()

    # def save(self, *args, **kwargs):
    #     print(kwargs)
    #     # self.path = f"media/user_{self.username}"
    #     self.path = f"media/user_{self.username}"
    #     super().save(*args, **kwargs)

    # def save(self, *args, **kwargs):
    #     print(kwargs)
    #     # self.path = f"media/user_{self.username}"
    #     self.path = f"media/user_{self.username}"
    #     super().save(*args, **kwargs)

    # def save(self, *args, **kwargs):
    #     self.path = f"media/user_{self.username.lower()}"
    #     super().save(*args, **kwargs)


class Files(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owners')
    # path = models.ForeignKey(User, on_delete=models.CASCADE, related_name='path')
    filename = models.CharField(max_length=255, unique=True)
    size = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    download_date = models.DateTimeField(auto_now=True)
    # title = models.TextField()
    # cover = models.FileField(upload_to='user_directory_path', blank=True)
    # path = models.FileField(User, upload_to='path')
    # url = models.URLField(max_length=255)
    # url = models.FileField(upload_to=user_directory_path)
    title = models.TextField()
    # path = models.FileField(User, upload_to=user_directory_path)
    path = models.FileField(upload_to=user_directory_path)
    # path = models.FileField(User, upload_to=user_directory_path)

    # def __int__(self):
    #     return self.owner





