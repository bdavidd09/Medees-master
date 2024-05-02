function requestNotificationPermission() {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
      return;
    }
  
    Notification.requestPermission().then(function (permission) {
      if (permission !== "granted") {
        console.log("Permission denied");
      }
    });
  }
  
  function displayNotification() {
    if (Notification.permission === "granted") {
      var notification = new Notification("Reminder", {
        body: "Time for your medication!",
      });
  
      // Optionally handle click on the notification
      notification.onclick = function () {
        // Handle notification click event
        console.log("Notification clicked");
      };

    } else {
      console.log("Permission denied to show notification");
    }
  }
  
  export {requestNotificationPermission, displayNotification };
