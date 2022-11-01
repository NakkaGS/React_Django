from imp import is_builtin
from django.shortcuts import render

from django.contrib.auth.models import User #takes the User accounts data, used also for permisition


#Django Rest Framework - Representational state transfer (REST) 
#In general, RESTful web APIs are loosely based on HTTP methods such as GET, POST, PUT, PATCH, DELETE, OPTIONS. 
#HTTP requests are used to access data or resources in the web application via URL-encoded parameters. 
#Responses are generally formatted as either JSON or XML to transmit the data
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response 

#from .products import products #--imports the data from product.py
from base.serializers import UserSerializerWithToken #this creates a javascript file to be use as data
from base.serializers import UserSerializer, UserSerializerWithToken


# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import status
from django.contrib.auth.hashers import make_password

@api_view(['GET'])
@permission_classes([IsAuthenticated]) #It blocks the request to get data for just those who is authenticated
def getUserProfile(request):
    user = request.user
    
    serializer = UserSerializer(user, many=False) #show just one Item

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser]) #It blocks the request to get data for just those who is Admin
def getUsers(request):
    users = User.objects.all() #show all the products
    serializer = UserSerializer(users, many=True) #show many 'products'
    return Response(serializer.data)



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data
        