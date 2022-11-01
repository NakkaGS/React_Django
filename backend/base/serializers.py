#models.py->serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User #takes the User accounts data, used also for permisition

from .models import Product #call the data from the Database (Models = Table)

from rest_framework_simplejwt.tokens import RefreshToken

class ProductSerializer(serializers.ModelSerializer): #take all the model (Table) and converts to js
    class Meta:
        model = Product
        fields = '__all__'



class UserSerializer(serializers.ModelSerializer): #take all the model (Table) and converts to js
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = User
        fields = ['id', '_id' 'username', 'email', 'name', 'isAdmin']

    def get_isAdmin (self, obj):
        return obj.is_staff

    def get__id (self, obj):
        return obj.id

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

class UserSerializerWithToken (UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model: User
        fields = ['id', '_id' 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)