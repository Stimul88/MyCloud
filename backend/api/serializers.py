from rest_framework import serializers
from api.models import User, Files


class UserSerializer(serializers.ModelSerializer):
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


# class ClientSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         # fields = ['id', 'login', 'full_name', 'email', 'password', 'is_admin', 'created_at', 'path']
#         fields = '__all__'


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        # fields = ['id', 'client', 'created_at', 'download_date', 'title', 'cover']
        fields = '__all__'



