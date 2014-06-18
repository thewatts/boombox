/*
  In this step, you'll implement a feature that shows the duration of the
  currently playing song. If you click on it, it should hide the total duration
  and show the time remaining.

  Remember, if you want to reference the duration in your template, you should
  use `view.duration`.

  By now, this should be a pretty simple feature for you to implement. Just use
  the concepts you put to use yesterday.

  To increase the challenge, this time, you'll be writing your own tests. First,
  write a test to describe the feature. Then, begin implementing it until all
  of your tests pass.

  Here are a couple things we suggest you test:

  * If no song is playing, the current time should not appear.
  * When you play a song, the current time should appear in the Now Playing panel.
  * When you click on the current time, it should show the remaining time.

  Note: You'll probably need to use jQuery to set up a listener to know when the
  song has loaded. Because these tests are asynchronous, make sure you use QUnit's
  start() and stop() methods. If you finish this early, you should write a helper
  to clean up this code.

  Good luck!
*/

step(16, "Click to Toggle Remaining Time");

testComponent('audio-time', "By default it will show the current time", function(component) {
  Ember.run(function() {
    component.set('currentTime', 100);
  });

  equal(component.$('p.current-time').text(), "1:40");
});

testComponent('audio-time', "When isShowingRemaining is true, the current time is not displayed and the remaining time is displayed", function(component) {
  Ember.run(function() {
    component.set('currentTime', 100);
    component.set('duration', 250);

    component.set('isShowingRemaining', true);
  });

  equal(component.$('p.current-time').length, "0", "the current time is not displayed");
  equal(component.$('p.remaining-time').text(), "2:30");
});

testComponent('audio-time', "When clicking on the component, the isShowingRemaining property is toggled", function(component) {
  Ember.run(function() {
    component.set('currentTime', 100);
    component.set('duration', 250);

    component.set('isShowingRemaining', true);
  });

  click('p.current-time');

  equal(component.$('p.current-time').length, "0", "the current time is not displayed");
  equal(component.$('p.remaining-time').text(), "2:30");
});

testComponent('audioPlayer', "once the component's src is set, the play button changes to a pause button", function(component) {
  Ember.run(function() {
    component.set('src', "audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3");
  });

  waitFor(component, 'isPlaying').then(function() {
    equal(component.$('p.current-time').length, 1);
  });
});
