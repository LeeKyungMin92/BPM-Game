from logging import debug
import logging
from django.test import TestCase, Client
from django.urls import reverse
# import logging
from .models import Notice


class BoardTestCase(TestCase):
  def setUp(self):
    Notice.objects.create(title='NOTICE_TEST_TITLE_1', content='NOTICE_TEST_CONTENT_1')
    Notice.objects.create(title='NOTICE_TEST_TITLE_2', content='NOTICE_TEST_CONTENT_2')
    Notice.objects.create(title='NOTICE_TEST_TITLE_3', content='NOTICE_TEST_CONTENT_3')

  def test_post_count(self):
    self.assertEqual(Notice.objects.all().count(), 3)

  def test_invalid_board_name(self):
    client = Client()

    response = client.get('/api/abcde/')
    self.assertEquals(response.status_code, 400)

    response = client.get('/api/abcde/1/')
    self.assertEquals(response.status_code, 400)

  def test_get_post(self):
    client = Client()

    response = client.get('/api/notice/1/')
    self.assertEqual(response.status_code, 200)
    self.assertIn('1', response.content.decode())

    response = client.get('/api/notice/5/')
    self.assertEqual(response.status_code, 400)

  def test_get_posts(self):
    client = Client()

    response = client.get('/api/notice/')
    self.assertEqual(response.status_code, 200)
    self.assertIn('1', response.content.decode())
    self.assertIn('2', response.content.decode())
    self.assertIn('3', response.content.decode())

  def test_delete_post(self):
    client = Client()

    response = client.delete('/api/notice/1/')
    self.assertEqual(response.status_code, 204, 200)

    response = client.delete('/api/notice/')
    self.assertEquals(response.status_code, 405)

    response = client.delete('/api/notice/5/')
    self.assertEqual(response.status_code, 400)

  def test_post_post(self):
    client = Client()
    postData = {
      'title': 'NOTICE_TEST_TITLE_4',
      'content': 'NOTICE_TEST_CONTENT_4',
    }
    response = client.post('/api/notice/', postData, content_type = "application/json")
    self.assertEquals(response.status_code, 201)
    self.assertEqual(Notice.objects.all().count(), 4)

    response = client.post('/api/notice/1/', postData, content_type = "application/json")
    self.assertEquals(response.status_code, 405)

    postData = {
      'abc': 'NOTICE_TEST_TITLE_4',
      'def': 'NOTICE_TEST_CONTENT_4',
    }
    response = client.post('/api/notice/', postData, content_type = "application/json")
    self.assertEquals(response.status_code, 400)


    '''
    logger = logging.getLogger('myLogger')
    logger.error(response)
    '''