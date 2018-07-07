from django.conf import settings
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
import json
from api.firebase_auth.authentication import TokenAuthentication

db = settings.FIREBASE.database()

class CommentView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        thread = request.GET.get('thread', False)
        if not thread:
            return HttpResponseBadRequest('No thread specified')

        thread_data = db.child('comments').child(thread).get().val()
        user_data = {}
        for user in thread_data['participants']:
            tmp_user = db.child('users').child(user).get().val()
            user_data[user] = dict(tmp_user)
        response = {}
        response['userData'] = user_data
        response['commnets'] = thread_data['comments']
        return JsonResponse(response, safe=False)

    def post(self, request):
        # try:
        commentData = json.loads(request.POST.get('commentData', False))
        thread = commentData['thread']
        text = commentData['text']
        # except:
        #     return HttpResponseBadRequest('Bad Request')

        uid = str(request.user)
        val = db.child('comments').child(thread).child('comments').push({
            'text': text,
            'user': uid,
        })
        db.child('comments').child(thread).child('participants').update({
            uid: True
        })
        
        return JsonResponse({'id': val['name']}, safe=False)