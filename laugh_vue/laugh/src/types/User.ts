export default interface User {
  id?: number;
  userName?: string;
  userNameKana?: string;
  profileImg?: string;
  userType?: number;
  debutDt?: string;
  activityDt?: string;
  activityNum?: number;
  gender?: number;
  officeId?: number;
  officeName?: string;
  areaId?: number;
  areaName?: string;
  comedyStyleNameList?: [];
  comedyStyleIdList?: [];
  specialSkillNameList?: [];
  specialSkillIdList?: [];
}
