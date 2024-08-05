from django.conf import settings
from django.urls import path, re_path
from django.views.static import serve

from api.views import LogoutView, RegisterView, UserWithFilesView, UserView, DeleteFile, FilesView, FileView, \
    SomeMethodView, DeleteUser

urlpatterns = [
    path('users/', UserWithFilesView.as_view(), name='users'),
    path('users/<pk>/', UserView.as_view(), name='user'),
    path('file/<pk>/', FileView.as_view(), name='file'),
    path('change/<pk>/', SomeMethodView.as_view(), name='put'),
    path('users/<pk>/files/', FilesView.as_view(), name='files'),
    path('delete/<pk>/', DeleteFile.as_view(), name='delete_file'),
    path('delete_user/<pk>/', DeleteUser.as_view(), name='delete_user'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view()),
]