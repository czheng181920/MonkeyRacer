import { socket } from "./socket";

export const getMembers = () =>
  fetch("/api/members")
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });

/**
 * Creates a new game
 * Generates new room and assigns guest username if not logged in
 * @param user Username
 */
export function createGame(user = "") {
  // Generate guest username
  if (user == "") {
    user = generateGuestName();
  }
  socket.emit("create_room", {
    username: user,
    room: makeid(8),
  });
}

export function joinGame(user = "", room = "") {
  if (room == "") {
    // TODO - display an error or something
  } else {
    if (user == "") {
      user = generateGuestName();
    }
    // TODO - validate that room exists here or on server side
    socket.emit("join_room", {
      username: user,
      room: room,
    });
  }
}

/**
 * Generate random string
 * @param length Length of string
 * @returns Random string
 */
function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

/**
 * Generates a guest username
 * @returns Guest username
 */
function generateGuestName(): string {
  let name = "Guest";

  for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    name += randomNumber.toString();
  }

  return name;
}
