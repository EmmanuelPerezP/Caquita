from rest_framework import serializers
from score.models import HighScore


class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = HighScore
        fields = ('name', 'score', 'datePublished')
