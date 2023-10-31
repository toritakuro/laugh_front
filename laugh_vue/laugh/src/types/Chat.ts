export default interface Chat {
  chatRoomId: number;
  chatId: number;
  name: String;
  img: String;
  message: String;
  sendAt: String;
  sendTime: String;
  unreadCount: number;
  isMyMessage: boolean;
  targetUserId: number;
  chatList: Chat[];
}