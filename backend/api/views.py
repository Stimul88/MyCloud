import os
from django.core.files.storage import FileSystemStorage
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import User, Files
from api.serializers import UserSerializer, UserFilesSerializer, FilesSerializer, UserRegSerializer


class RegisterView(APIView):

    def post(self, request):
        serializer = UserRegSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = User.objects.all()
    serializer_class = UserFilesSerializer


class SomeMethodView (UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Files.objects.all()
    serializer_class = FilesSerializer


class FilesView(ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        files = Files.objects.filter(owner_id=pk)
        ser = FilesSerializer(files, many=True)
        return Response(ser.data)

    def post(self, request, *args, **kwargs):

        print(request.data)
        file = request.FILES['path']
        file_title = request.data['title']
        fs = FileSystemStorage()
        name = request.data['fileName']
        # сохраняем на файловой системе
        filename = request.data['fileName']
        # получение адреса по которому лежит файл
        file_url = fs.url(filename)
        size = request.data['size']
        owner_id = request.data['id']

        newFile = Files(owner_id=owner_id, path=file, title=file_title, size=size, filename=name)
        newFile.save()

        return Response('OK')


class FileView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Files.objects.all()
    serializer_class = FilesSerializer


class DeleteFile(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Files.objects.all()
    serializer_class = FilesSerializer

    def delete(self,  request, *args, **kwargs):
        instance = self.get_object()
        os.remove(f'media/{instance.path}')
        return self.destroy(request, *args, **kwargs)


class DeleteUser(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def delete(self,  request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class UserWithFilesView(ListAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = User.objects.all()
    serializer_class = UserFilesSerializer


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
