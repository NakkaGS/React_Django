from cgi import print_exception
from logging.handlers import RotatingFileHandler
from types import CoroutineType

from django.db import models #(Model = Tab;e)
from django.contrib.auth.models import User #takes the User accounts data, used also for permisition

# Create your models here.
# class creates a Table with Name and inside () shows that it is a Model
# ImageField needs the package 'Pillow' to support the images

# pip install pillow
# pip install djangorestframework
# npm install axios
# pip install django-cors-headers

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) # user can have a lot of products
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null = True, blank = True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self): #used to change the named of the item on the Django Admin Database
        return self.name 

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True) #a product can have a lot of review
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) #a product can have review from a lot of users
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null = True, blank = True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self): #used to change the named of the item on the Django Admin Database
        return str(self.rating)

class Order(models.Model): #it is when the user create a cart and generate a order
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) #a user can have a lot of orders
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self): #used to change the named of the item on the Django Admin Database
        return str(self.createAt)

class OrderItem(models.Model): #it is when a order is generated, the order is separated by items. (Items in the Order)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True) #a product can be seen in a lot of Items (Order Items)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True) #a order can have a lot of Items (Order Items)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self): #used to change the named of the item on the Django Admin Database
        return str(self.name)

class ShippingAddress(models.Model): #it is the shipping address
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True) #a order can have just one address
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self): #used to change the named of the item on the Django Admin Database
        return str(self.address)