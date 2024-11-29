# editor/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class DocumentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.document_id = self.scope['url_route']['kwargs']['document_id']
        self.group_name = f'document_{self.document_id}'

        # Add user to the group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Remove user from the group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        content = data.get('content', '')

        # Broadcast changes to the group
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'document_update',
                'content': content,
            }
        )

    async def document_update(self, event):
        content = event['content']

        # Send updates to WebSocket
        await self.send(text_data=json.dumps({
            'content': content,
        }))
