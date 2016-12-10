function plus_safe_google_api_auth_on_ready() {
  var it = plus_safe_google_api_auth_on_ready;
  it.ready = true;
  for (var i = 0; i < it.subscribers.length; i++) {
    it.subscribers[i]();
  }

  it.subscribers = [];
}

plus_safe_google_api_auth_on_ready.subscribers = [];
plus_safe_google_api_auth_on_ready.subscribe = function (callback) {
  var it = plus_safe_google_api_auth_on_ready;
  if (it.ready) {
    return callback();
  } else {
    it.subscribers.push(callback);
  }
};
