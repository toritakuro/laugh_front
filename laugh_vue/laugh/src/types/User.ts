export default interface User {
    id: number;
    userName: string;
    userNameKana: string;
    searchUserName: string;
    userType: number;
    debutDt: string;
    activityDt: string;
    activityNum: number;
    gender: number;
    officeId: number;
    officeName: string;
    areaId: number;
    areaNmae: string;
    selfIntroduction: string;
    loginAt: string;
    updateAt: string;
    memberNum: number;
    feeType: number;
    fee: number;
    comedyStyleIdList: Array<number>;
    comedyStyleName: string;
    specialSkillIdList: Array<number>;
    specialSkillName: string;
  }