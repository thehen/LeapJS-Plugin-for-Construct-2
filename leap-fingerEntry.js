(function() {
  var fingerEntry;

  fingerEntry = function() {
    var previousFingerIds;
    previousFingerIds = [];
    previousFingerIds.remove = function() {
      var what, a = arguments, L = a.length, ax;
      while (L && this.length) {
          what = a[--L];
          while ((ax = this.indexOf(what)) !== -1) {
              this.splice(ax, 1);
          }
      }
      return this;
  };
    this.on("deviceDisconnected", function() {
      var id, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = previousFingerIds.length; _i < _len; _i++) {
        id = previousFingerIds[_i];
        console.log(this.lastConnectionFrame.finger(id));
        _results.push(this.emit('fingerLost', this.lastConnectionFrame.finger(id)));
      }
      return _results;
    });
    return {
      frame: function(frame) {
        var id, newValidFingerIds, _i, _j, _len, _len1, _results;
        newValidFingerIds = frame.fingers.map(function(finger) {
          return finger.id;
        });
        
        for (_i = 0, _len = previousFingerIds.length; _i < _len; _i++) {
          id = previousFingerIds[_i];
          if (newValidFingerIds.indexOf(id) === -1) {
            previousFingerIds.remove(id);
            this.emit('fingerLost', this.lastConnectionFrame.finger(id));
          }
        }
        _results = [];
        for (_j = 0, _len1 = newValidFingerIds.length; _j < _len1; _j++) {
          id = newValidFingerIds[_j];
          if (previousFingerIds.indexOf(id) === -1) {
            previousFingerIds.push(id);
            _results.push(this.emit('fingerFound', frame.finger(id)));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };
  };

  if ((typeof Leap !== 'undefined') && Leap.Controller) {
    Leap.Controller.plugin('fingerEntry', fingerEntry);
  } else {
    module.exports.fingerEntry = fingerEntry;
  }

}).call(this);