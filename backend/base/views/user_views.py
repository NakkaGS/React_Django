#urls.py->product_urls.py->product_views.py

from imp import is_builtin
from django.shortcuts import render

#takes the User accounts data, used also for permisition
from django.contrib.auth.models import User 

#Django Rest Framework - Representational state transfer (REST) 
#In general, RESTful web APIs are loosely based on HTTP methods such as GET, POST, PUT, PATCH, DELETE, OPTIONS. 
#HTTP requests are used to access data or resources in the web application via URL-encoded parameters. 
#Responses are generally formatted as either JSON or XML to transmit the data
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response 
from rest_framework import status

#from .products import products #--imports the data from product.py
from base.serializers import UserSerializerWithToken #this creates a javascript file to be use as data
from base.serializers import UserSerializer, UserSerializerWithToken

##############################
#It is used for authentication
#Simple JWT provides a JSON Web Token authentication backend for the Django REST Framework. 
#It aims to cover the most common use cases of JWTs by offering a conservative set of default features. 
#It also aims to be easily extensible in case a desired feature is not present.
##############################
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password

#################

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#################

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
        
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

#################

@api_view(['GET'])
@permission_classes([IsAuthenticated]) #It blocks the request to get data for just those who is authenticated
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False) #show just one Item
    return Response(serializer.data)

#################

@api_view(['PUT'])
@permission_classes([IsAuthenticated]) #It blocks the request to get data for just those who is authenticated
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False) #show just one Item

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])
    
    user.save()

    return Response(serializer.data)

#################

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

#################

@api_view(['PUT'])
@permission_classes([IsAdminUser]) #It blocks the request to get data for just those who is authenticated
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']
    
    user.save()

    serializer = UserSerializerWithToken(user, many=False) #show just one Item

    return Response(serializer.data)

#################

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

#################

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')