export default interface Oogiri {
  themeId: number;
  themeUserId: number;
  themeUserName: string;
  img: string;
  type: number;
  themeContent: string;
  themeCreatedAt: string;
  themeUpdatedAt: string | null;
  answers: Answer[];
}

interface Answer {
  answerId: number;
  answerUserId: number;
  answerUserName: string;
  img: string;
  type: number;
  answerContent: string;
  answerCreatedAt: string;
  answerDeletedAt: string;
  reactions: Reaction[];
  dialog: boolean;
}

interface Reaction {
  reactionId: number;
  reactionUserId: number;
  reactionStatus: number;
}