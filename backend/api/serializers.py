from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers
from api.models import User, Files


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = '__all__'


class UserRegSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserFilesSerializer(serializers.ModelSerializer):
    owners = FilesSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class PostSerializer(serializers.ModelSerializer):
    file = Base64ImageField()

    class Meta:
        model = Files
        fields = '__all__'


# class FilesSerializer(serializers.ModelSerializer):
#     # file = Base64ImageField()
#     class Meta:
#         model = Files
#         # model = Tasks.objects.filter(account_id=pk)# fields = ['id', 'client', 'created_at', 'download_date', 'title', 'cover']
#         fields = '__all__'
        # read_only_fields = ('id',)

        # def __get__(self, request, pk):
        #     model = Files.objects.filter(client_id=pk)


        # def create(self, validated_data):
        #     password = validated_data.pop('password', None)
        #     instance = self.Meta.model(**validated_data)
        #     if password is not None:
        #         instance.set_password(password)
        #     instance.save()
        #     return instance

# class PostSerializer(serializers.ModelSerializer):
#     file = Base64ImageField()
#
#     class Meta:
#         model = Files
#         fields = '__all__'


class UserWithSerializer(serializers.ModelSerializer):
    # file = Base64ImageField()
    owners = UserSerializer(read_only=True, many=True)

    class Meta:
        model = User
        # fields = ['username', 'first_name', 'email', 'path', 'created_at', 'owners', 'USERNAME_FIELD',
        #           'REQUIRED_FIELDS']
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    # class Meta:
    #     model = User
    #     fields = '__all__'
    #     # model = Tasks.objects.filter(account_id=pk)# fields = ['id', 'client', 'created_at', 'download_date', 'title', 'cover']
    #     fields = ['username', 'first_name', 'email', 'path', 'created_at', 'owners', 'USERNAME_FIELD', 'REQUIRED_FIELDS']


# class UserFilesSerializer(serializers.ModelSerializer):
#     # owners = serializers.RelatedField(source='owners', read_only=True)
#     owners = UserSerializer(read_only=True, many=True)
#
#     class Meta:
#         model = User
#         fields = '__all__'

