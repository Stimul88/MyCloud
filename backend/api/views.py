import os

from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse, Http404, FileResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from drf_extra_fields.fields import Base64ImageField
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, RetrieveAPIView, DestroyAPIView, RetrieveUpdateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken

from api.models import User, Files
from api.serializers import UserSerializer, UserFilesSerializer, FilesSerializer, UserRegSerializer
# from api.serializers import UserSerializerUserWithSerializer, \
#     UserRegSerializer
from backend import settings



# class RegisterView(APIView):
# 	def post(self,request):
# 		serializer =  UserSerializer(data=request.data)
# 		serializer.is_valid(raise_exception=True)
# 		serializer.save()
# 		return Response(serializer.data)


class RegisterView(APIView):

    def post(self, request):
        serializer = UserRegSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

        # try:
        #     serializer = UserRegSerializer(data=request.data)
        #     serializer.is_valid(raise_exception=True)
        #     serializer.save()
        #     return Response(serializer.data)
        # except Exception as e:
        #     raise ValidationError('Юзер с таким логином или паролем уже существует')



# from api.models import Files, Client
# from api.serializers import FilesSerializer, ClientSerializer


# @csrf_exempt

# class ClientViewSet(ModelViewSet):
#     queryset = Client.objects.all()
#     serializer_class = ClientSerializer
#
# @csrf_exempt
# def create_files(request):
#     files = Files.objects.all()
#     files.save()
#     return Response({'status': 'OK'})

# class PostAPIView(APIView):
#     permission_classes = [IsAuthenticated]
#     file = Base64ImageField()
#
#     def post(self, request, *args, **kwargs):
#         file = request.FILES['path']
#         file_title = request.data['title']
#         fs = FileSystemStorage()
#         # сохраняем на файловой системе
#         filename = fs.save(file.name, file)
#         # получение адреса по которому лежит файл
#         file_url = fs.url(filename)
#
#         newFile = Files(path=file, title=file_title)
#         newFile.save()
#         # print(request.data['cover'])
#         # serializer = PostSerializer(data=request.data)
#         # serializer.is_valid(raise_exception=True)
#         # instance = serializer.save()
#         # response = {"title": instance.title, "cover": instance.cover, "date": instance.date_posted.strftime("%a %H:%M %d/%m/%y"), "file": instance.file.url,
#         #     "url": instance.get_absolute_url()
#         # }
#         return Response({'status': 'OK'})

    # def post(self, request, *args, **kwargs):
    #     print(request.data['cover'])
    #     serializer = PostSerializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     instance = serializer.save()
    #     # response = {"title": instance.title, "cover": instance.cover, "date": instance.date_posted.strftime("%a %H:%M %d/%m/%y"), "file": instance.file.url,
    #     #     "url": instance.get_absolute_url()
    #     # }
    #     return Response({'status': 'OK'})


class UserView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = User.objects.all()
    serializer_class = UserFilesSerializer


class SomeMethodView (UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Files.objects.all()
    serializer_class = FilesSerializer


    # def partial_update(self,  request, *args, **kwargs):
    #     print(request)
    #     return Response('Ok')


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

        # newFile = Files(owner_id=owner_id, path=file, title=file_title, size=size, url=file, filename=name)
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
        # instance = self.get_object()
        # os.remove(f'media/{instance.path}')
        return self.destroy(request, *args, **kwargs)





class UserWithFilesView(ListAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = User.objects.all()
    serializer_class = UserFilesSerializer

    # def post(self, request, *args, **kwargs):
    #     file = request.FILES['cover']
    #     file_title = request.data['title']
    #     fs = FileSystemStorage()
    #     # сохраняем на файловой системе
    #     filename = fs.save(file.name, file)
    #     # получение адреса по которому лежит файл
    #     file_url = fs.url(filename)
    #
    #     newFile = Files(cover=file_url, title=file_title)
    #     newFile.save()
    #     # print(request.data['cover'])
    #     # serializer = PostSerializer(data=request.data)
    #     # serializer.is_valid(raise_exception=True)
    #     # instance = serializer.save()
    #     # response = {"title": instance.title, "cover": instance.cover, "date": instance.date_posted.strftime("%a %H:%M %d/%m/%y"), "file": instance.file.url,
    #     #     "url": instance.get_absolute_url()
    #     # }
    #     return Response({'status': 'OK'})

        # return Response(newFile)

    # def post(self, request, pk):
    # def post(self, request, pk):
    #     file = request.FILES['cover']
    #
    #     fs = FileSystemStorage()
    #     filename = fs.save(file.name, file)
    #
    #     file_url = fs.url(filename)

        # serializer = FilesSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # serializer.save()

        # cover = request.data['cover']
        # # print(request.data)
        # title = request.data['title']
        # Files.objects.create(title=title, cover=cover)
        # # print(request)
        # serializer = FilesSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # instance = serializer.save()
        # file = request.FILES['file']
        # fs = FileSystemStorage()
        # fs.save(file.name, file)
        # return Response()



        # serializer = FilesSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # instance = serializer.save()
        # response = {"title": instance.title, "content": instance.content,
        #             "date": instance.date_posted.strftime("%a %H:%M %d/%m/%y"), "file": instance.file.url,
        #             "url": instance.get_absolute_url()
        #             }
        # return Response(response)
        # form = UploadFileForm(request.POST, request.FILES
        # serializer = FilesSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # instance = serializer.save()
        # file = request.FILES['file']
        # fs = FileSystemStorage()
        # fs.save(file.name, file)
        # # filename = fs.save(file.name, file)
        # # file_url = fs.url(filename)
        # print(instance)
        # # request.save()
        # # return Response({'status': 'OK'})
        # return Response({'status': 'OK'})

    # def post(self, request):
    #     print(request)
        # serializer = FilesSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # serializer.save()
        # return Response(serializer.data)



# class UsersArrayView(RetrieveAPIView):
#     permission_classes = (IsAuthenticated,)
#
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class FilesViewPost(APIView):
#     permission_classes = (IsAuthenticated,)
#
#     queryset = Files.objects.all()
#     serializer_class = FilesSerializer




    # def get(self, request):
    #     # serializer = UserSerializer(data=request.data)
    #     # serializer.is_valid(raise_exception=True)
    #     # return Response(serializer.data)
    #
    #     # queryset = User.objects.all()
    #     # serializer_class = UserSerializer
    #     users = User.objects.all()
    #     ser = UserSerializer(users, many=True)
    #
    #     # content = {'message': f'Welcome to main page {request.user}'}
    #     return Response(ser.data)

    # queryset = User.objects.all()
    # serializer_class = UserSerializer





# class UsersView(RetrieveAPIView):
#     permission_classes = (IsAuthenticated,)
#
#     def get(self, request):
#         # serializer = UserSerializer(data=request.data)
#         # serializer.is_valid(raise_exception=True)
#         # return Response(serializer.data)
#
#         # queryset = User.objects.all()
#         # serializer_class = UserSerializer
#         users = User.objects.all()
#         ser = UserSerializer(users, many=True)
#
#         # content = {'message': f'Welcome to main page {request.user}'}
#         return Response(ser.data)

    # queryset = User.objects.all()
    # serializer_class = UserSerializer

    # def get(self, request):
    #     files = Files.objects.all()
    #     ser = FilesSerializer(files, many=True)
    #
    #     return Response(ser.data)


# class HomeView(APIView):
#     permission_classes = (IsAuthenticated,)
#
#     def get(self, request):
#         # serializer = UserSerializer(data=request.data)
#         # serializer.is_valid(raise_exception=True)
#         # return Response(serializer.data)
#
#         # queryset = User.objects.all()
#         # serializer_class = UserSerializer
#         users = User.objects.all()
#         ser = UserFilesSerializer(users, many=True)
#
#         # content = {'message': f'Welcome to main page {request.user}'}
#         return Response(ser.data)


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


# def download(request, path):
#     file_path = os.path.join(settings.MEDIA_ROOT, path)
#     if os.path.exists(file_path):
#         with open(file_path, 'rb') as fh:
#             response = HttpResponse(fh.read(), content_type="application/vnd.ms-excel")
#             response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
#             return response
#     raise Http404


# def download(request, path):
#     # get the download path
#     download_path = os.path.join(settings.MEDIA_ROOT, path)
#     if os.path.exists(download_path):
#         with open(download_path, "rb") as fh:
#             response = HttpResponse(fh.read(), content_type="application/adminupload")
#             response["Content-Disposition"] = "inline; filename=" + os.path.basename(
#                 download_path
#             )
#             return response
#     raise Http404


# def change_su(request):
#
#     if request.method == 'POST':
#         ids = request.POST.getlist('selected')
#
#         for id in ids:
#             try:
#                 rev = User.objects.get(pk=id)
#                 if rev.is_superuser == 1:
#                     rev.is_superuser = 0
#                     rev.save()
#                     messages.info(request, _('User with id %(id)s is no superuser anymore') % {'id': id})
#                 else:
#                     rev.is_superuser = 1
#                     rev.save()
#                     messages.info(request, _('User with id %(id)s is now superuser') % {'id': id})
#
#             except Exception as e:
#                 logging.getLogger(__name__).exception(e)
#                 messages.error(request, _('Failed to change superuser status for reviewer with id %(id)s') % {'id': id})
#
#  return HttpResponseRedirect(reverse('admin_index'))

