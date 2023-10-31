export default interface Oogiri {
  themeId: number;
  themeUserId: number;
  themeUserName: string;
  img: string;
  userType: number;
  themeContent: string;
  themeCreatedAt: string;
  themeUpdatedAt: string | null;
  answers: Answer[];
  answerCount: number;
}

interface Answer {
  answerId: number;
  answerUserId: number;
  answerUserName: string;
  img: string;
  userType: number;
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