export default interface Profile {
  id: number;
  userAddress: string;
  userName: string;
  userNameKana: string;
  userType: number;
  password: string;
  debutYear: number;
  debutMonth: number;
  memberNum: number;
  gender: number;
  officeId: number;
  comedyStyleIdList: number;
  feeType: number;
  fee: number;
  specialSkillIdList: number[];
  anotherSkill: string;
  areaId: number;
  selfIntroduction: string;
  profileImg: string;
  delete_flg: number;
}
