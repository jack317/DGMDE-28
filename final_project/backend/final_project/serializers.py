from rest_framework import serializers
from .models import Paragraph, Saved

# Custom Serializer for the API

class ParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paragraph
        fields = ('id', 'title', 'body')

class SavedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Saved
        fields = ('id', 'title_saved', 'body_saved')