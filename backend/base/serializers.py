#models.py->serializers.py

#it takes the data from the DB using the models from model.py 
from rest_framework import serializers 

#it takes the User accounts data, used also for permision
from django.contrib.auth.models import User 

#call the data from the Database (Models = Table)
from .models import Product 

##############################
#It is used for authentication
#Simple JWT provides a JSON Web Token authentication backend for the Django REST Framework. 
#It aims to cover the most common use cases of JWTs by offering a conservative set of default features. 
#It also aims to be easily extensible in case a desired feature is not present.

from rest_framework_simplejwt.tokens import RefreshToken
##############################

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