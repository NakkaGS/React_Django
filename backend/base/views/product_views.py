#urls.py->product_urls.py->product_views.py

from imp import is_builtin
from django.shortcuts import render

#Pagination
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

#Django Rest Framework - Representational state transfer (REST) 
#In general, RESTful web APIs are loosely based on HTTP methods such as GET, POST, PUT, PATCH, DELETE, OPTIONS. 
#HTTP requests are used to access data or resources in the web application via URL-encoded parameters. 
#Responses are generally formatted as either JSON or XML to transmit the data
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response 
from rest_framework import status

#from .products import products #--imports the data from product.py
from base.models import Product, Review #call the data from the Database (Models = Table)
from base.serializers import ProductSerializer


#it is used to show all the product in the HomeScreen
@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword') #this is from the Search

    #print(query)
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query).order_by('_id') #if the 'name' constains any value in the query
    
    #Paginator
    page = request.query_params.get('page') #this is from the Paginator (backend)
    paginator = Paginator(products, 2)

    try:
        products = paginator.page(page)
    
    except PageNotAnInteger:
        products = paginator.page(1)
    
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    
    page = int(page)

    print('Page:', page)
    
    #products = Product.objects.all() #show all the products
    serializer = ProductSerializer(products, many=True) #show many 'products'
    return Response({'products':serializer.data, 
                    'page':page, 
                    'pages':paginator.num_pages})

#################

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

#################
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product was deleted')

#################
@api_view(['POST'])
def createProduct(request):
    user = request.user #that is what the user writes

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data #that is what the user writes
    product = Product.objects.get(_id=pk) #that is the data from the database

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

#################
@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')

    product.save()
    return Response('Image was uploaded')

#################
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):

    user = request.user #user data
    product = Product.objects.get(_id=pk) #product data
    data = request.data #data to go to review (customer input)

    #1 - Review allready exists (customer already did a review for the product)
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'details': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #2 - No Rating or 0 (customer must make a rating)
    elif data['rating'] == 0:
        content = {'details': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)       
        product.save()

        return Response('Review Added')