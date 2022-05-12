from django.contrib import admin
from .models import Paragraph

# Register your models here.
class final_projectAdmin(admin.ModelAdmin):
    list_display = ('title', 'body')

admin.site.register(Paragraph, final_projectAdmin)