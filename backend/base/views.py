from imp import is_builtin
from django.shortcuts import render
from django.http import JsonResponse #it is used to read a js file and show the data on HTML

#Django Rest Framework
from rest_framework.decorators import api_view
from rest_framework.response import Response 

#from .products import products #--imports the data from product.py
from .models import Product #call the data from the Database (Models = Table)
from .serializers import ProductSerializer #this creates a javascript file to be use as data

@api_view(['GET']) #Thats it just for the next function
# Create your views here. which one of the routes has a function
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