import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
  'videoConnection.create'() {
    try {
      const apiUrl = 'https://www.video.zoomcare.kz/data';
      const response = HTTP.get(apiUrl);
      console.log(response)
      return response.data.data.room; // Return the response data to the client
    } catch (error) {
      throw new Meteor.Error(
        'http-request-failed',
        'Failed to make HTTP request',
      );
    }
  },
});
