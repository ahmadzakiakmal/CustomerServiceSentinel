export default function cutMessage(message) {
  return message?.split(":")[1] ?? message;
}