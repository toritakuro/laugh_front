export default interface Chat {
  chatRoomId: number;
  chatId: number;
  name: String;
  img: String;
  message: String;
  sendAt: String;
  sendTime: String;
  isMyMessage: boolean;
  chatList: Chat[];
}