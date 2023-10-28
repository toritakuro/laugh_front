export default interface ContentReq {
  id: number | null;
  userAddress: string;
  userName: string;
  userNameKana: string;
  userType: number | null;
  password: string;
  debutYear: number | null;
  debutMonth: number | null;
  memberNum: number | null;
  gender: number | null;
  officeId: number | null;
  comedyStyleIdList: number[];
  feeType: number | null;
  fee: number | null;
  specialSkillIdList: number[];
  anotherSkill: string;
  areaId: number | null;
  selfIntroduction: string;
  profileImgPath: string;
}