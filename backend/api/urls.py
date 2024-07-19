from django.urls import path
from api.views import HomeView, LogoutView, RegisterView, FilesView, UserView

urlpatterns = [
    path('users/', HomeView.as_view(), name='users'),
    path('user/<pk>', UserView.as_view(), name='user'),
    path('users/<pk>/files/', FilesView.as_view(), name='disk'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view()),
]
