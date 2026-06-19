export const playSound = () => {
  const audio = new Audio("/notification.mp3");
  audio.play();
};

export const notify = (message) => {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("HomePot Kitchen", {
      body: message,
      icon: "/logo.png",
    });
  }
};