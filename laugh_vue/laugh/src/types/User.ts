export default interface User {
    id?: number;
    userName?: string;
    userNameKana?: string;
    searchUserName?: string;
    userType?: number;
    debutDt?: string;
    debutDtStr?: string;
    activityDt?: string;
    activityNum?: number;
    gender?: number;
    officeId?: number;
    officeName?: string;
    areaId?: number;
    areaName?: string;
    selfIntroduction?: string;
    loginAt?: string;
    loginAtInt?: number;
    updateAt?: string;
    updateAtInt?: number;
    memberNum?: number;
    feeType?: number;
    profileImgPath?: string;
    fee?: number;
    comedyStyleIdList?: Array<number>;
    comedyStyleNameList?: Array<string>;
    comedyStyleNames?: string;
    specialSkillIdList?: Array<number>;
    specialSkillNameList?: Array<string>;
    specialSkillNames?: string;
    anotherSkill?: string;
  }
