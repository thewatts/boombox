(function() {
"use strict";

window.App = Ember.Application.create();

// Router
App.Router.map(function() {
  this.resource('album', { path: '/album/:album_id' });
});

// Routes
App.ApplicationRoute = Ember.Route.extend({
  events: {
    play: function(song) {
      this.controllerFor('nowPlaying').set('model', song);
    },
  }
});

App.AlbumRoute = Ember.Route.extend({
  model: function(params) {
    return App.ALBUM_FIXTURES.findProperty('id', params.album_id);
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.ALBUM_FIXTURES;
  }
});

// Controllers
App.NowPlayingController = Ember.ObjectController.extend();

App.SongItemController = Ember.ObjectController.extend({
  needs: ['nowPlaying'],

  isPlaying: function() {
    return this.get('model') === this.get('controllers.nowPlaying.model');
  }.property('model', 'controllers.nowPlaying.model')
});

// Models
App.Album = Ember.Object.extend({
  totalDuration: function() {
    return this.get('songs').reduce(function(sum, song) {
      return sum + song.duration;
    }, 0);
  }.property('songs.@each.duration')
});

App.Song  = Ember.Object.extend();

// Components
App.AudioPlayerComponent = Ember.Component.extend({
  classNames: 'audio-control',
  currentTime: 0,
  duration: null,
  isLoaded: false,

  play: function() {
    this.$('audio')[0].play();
  },
  pause: function() {
    this.$('audio')[0].pause();
  },

  didInsertElement: function() {
    var component = this;

    this.$('audio')
      .on('timeupdate', function() {
        component.set('currentTime', Math.floor(this.currentTime));
      })
      .on('loadeddata', function() {
        component.set('isLoaded', true);
        component.set('duration', Math.floor(this.duration));
      })
      .on('playing', function() {
        component.set('isPlaying', true);
      })
      .on('pause', function() {
        component.set('isPlaying', false);
      });
  },
});

App.AudioTimeComponent = Ember.Component.extend({
  remainingTime: function() {
    return this.get('duration') - this.get('currentTime');
  }.property('duration', 'currentTime'),

  click: function() {
    this.toggleProperty('isShowingRemaining');
  }
});

// Helpers
Ember.Handlebars.helper('format-duration', function(seconds) {
  var minutes = Math.floor(seconds/60);
  var remainingSeconds = seconds % 60;

  var result = '';
  if (remainingSeconds < 10) {
    result = "0";
  }

  result += String(remainingSeconds);

  result = minutes + ":" + result;

  return result;
});

})();
