// export class Profile {
//   id: number | null = null;
//   userAddress: string = "";
//   userName: string = "";
//   userNameKana: string = "";
//   userType: number | null = null;
//   password: string = "";
//   debutYear: number | null = null;
//   debutMonth: number | null = null;
//   memberNum: number | null = null;
//   gender: number | null = null;
//   officeId: number | null = null;
//   comedyStyleIdList: number | null = null;
//   feeType: number | null = null;
//   fee: number | null = null;
//   specialSkillIdList: number[] | null = null;
//   anotherSkill: string = "";
//   areaId: number | null = null;
//   selfIntroduction: string = "";
//   profileImg: string = "";
//   delete_flg: number | null = null;
// }

// import type { ExecOptionsWithStringEncoding } from "child_process";


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
  comedyStyleIdList: number[];
  feeType: number;
  fee: number;
  specialSkillIdList: number[];
  anotherSkill: string;
  areaId: number;
  selfIntroduction: string;
  profileImg: string;
}