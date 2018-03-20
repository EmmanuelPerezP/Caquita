from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from score.models import HighScore
from score.serializers import ScoreSerializer


class ScoreList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        scores = HighScore.objects.all()
        serializer = ScoreSerializer(scores, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ScoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
