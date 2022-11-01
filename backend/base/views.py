from imp import is_builtin
from django.shortcuts import render
from django.http import JsonResponse #it is used to read a js file and show the data on HTML

from django.contrib.auth.models import User #takes the User accounts data, used also for permisition


#Django Rest Framework - Representational state transfer (REST) 
#In general, RESTful web APIs are loosely based on HTTP methods such as GET, POST, PUT, PATCH, DELETE, OPTIONS. 
#HTTP requests are used to access data or resources in the web application via URL-encoded parameters. 
#Responses are generally formatted as either JSON or XML to transmit the data
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response 

#from .products import products #--imports the data from product.py
from .models import Product #call the data from the Database (Models = Table)
from .serializers import ProductSerializer, UserSerializerWithToken #this creates a javascript file to be use as data
from .serializers import UserSerializer, UserSerializerWithToken

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


@api_view(['GET']) #Thats it just for the next function
# Create your views here. which one of the routes has a function
#it can be tested with Postman website
def getRouter(request):
    routes = [
        '/api/products/', #call all the products (it is show in HomeScreen)
        '/api/products/create/', #create a new product
        '/api/products/upload', #NO IDEA
        '/api/products/<id>/reviews/', #give back the rating from the <id> product
        '/api/products/top/', #NO IDEA
        '/api/products/<id>', #cal the product with ID equal to <id>
        '/api/products/delete/<id>/', #delete the product <id>
        '/api/products/<update>/<id>/', #update the data from the product <id>
    ]
    return Response(routes)

#it is used to show all the product in the HomeScreen
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all() #show all the products
    serializer = ProductSerializer(products, many=True) #show many 'products'
    return Response(serializer.data)

#it is used to show the product requested in the HomeScreen, it is used in ProductScreen
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk) #show the product with the <id> == pk (primary key)
    serializer = ProductSerializer(product, many=False) #show just one Item



    #it is used for read the products.js
    # product = None
    # for i in products:
    #     if i['_id'] == pk:
    #         product = i
    #         break
    return Response(serializer.data)

    #it is used to show the product requested in the HomeScreen, it is used in ProductScreen
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
        