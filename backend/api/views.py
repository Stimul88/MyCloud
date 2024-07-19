from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken

from api.models import User, Files
from api.serializers import UserSerializer, FilesSerializer


# from api.models import Files, Client
# from api.serializers import FilesSerializer, ClientSerializer


# @csrf_exempt

# class ClientViewSet(ModelViewSet):
#     queryset = Client.objects.all()
#     serializer_class = ClientSerializer
#
#

class FilesView(ListAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = Files.objects.all()
    serializer_class = FilesSerializer


# class UsersArrayView(RetrieveAPIView):
#     permission_classes = (IsAuthenticated,)
#
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


class UserView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = User.objects.all()
    serializer_class = UserSerializer

    # def get(self, request):
    #     files = Files.objects.all()
    #     ser = FilesSerializer(files, many=True)
    #
    #     return Response(ser.data)


class HomeView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        # serializer = UserSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # return Response(serializer.data)

        # queryset = User.objects.all()
        # serializer_class = UserSerializer
        users = User.objects.all()
        ser = UserSerializer(users, many=True)

        # content = {'message': f'Welcome to main page {request.user}'}
        return Response(ser.data)


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


class RegisterView(APIView):
    def post(self, request):
        # serializer = UserSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # serializer.save()
        # return Response(serializer.data)

        try:
            serializer = UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Exception as e:
            raise ValidationError('Юзер с таким логином или паролем уже существует')




