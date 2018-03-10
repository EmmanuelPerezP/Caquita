from django.db import models


class HighScore(models.Model):
    """
    Class representing a blog post
    """
    name = models.CharField(max_length=255)
    score = models.BigIntegerField()
    datePublished = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-score"]

    def __str__(self):
        """
        String representing the model
        """
        return self.name + ": " + str(self.score)
