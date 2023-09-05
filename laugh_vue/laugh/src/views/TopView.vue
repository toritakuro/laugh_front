<template>
  <main class="main-content">
  <section>
    <div class="sort-box">
      <select>
        <option></option>
        <option>最終投稿日</option>
        <option>芸歴(昇順)</option>
        <option>芸歴(降順)</option>
      </select>
    </div>  
    <div class="user-detail-box">
      <div class="user-wrap">
        <div class="user-photo">
          <img src="./user.jpg">
        </div>
        <ul class="profile">
          <li>活動名： よしもと</li>
          <li>活動歴： 1年未満</li>
          <li>芸風の種類： 漫才</li>
          <li>一言： よろしくお願いします。</li>
        </ul>
      </div>
      <div class="user-wrap">
        <div class="user-photo">
          <img src="./user.jpg">
        </div>
        <ul class="profile">
          <li>活動名： よしもと</li>
          <li>活動歴： 1年未満</li>
          <li>芸風の種類： 漫才</li>
          <li>一言： よろしくお願いします。</li>
        </ul>
      </div>
      <div class="user-wrap">
        <div class="user-photo">
          <img src="./user.jpg">
        </div>
        <ul class="profile">
          <li>活動名： よしもと</li>
          <li>活動歴： 1年未満</li>
          <li>芸風の種類： 漫才</li>
          <li>一言： よろしくお願いします。</li>
        </ul>
      </div>
      <div class="user-wrap">
        <div class="user-photo">
          <img src="./user.jpg">
        </div>
        <ul class="profile">
          <li>活動名： よしもと</li>
          <li>活動歴： 1年未満</li>
          <li>芸風の種類： 漫才</li>
          <li>一言： よろしくお願いします。</li>
        </ul>
      </div>    
  </div>
</section> 
  <ul class="user-search-box">
    <li class="search-ttl">芸名</li>
    <li><input type="text" name=usrName placeholder="芸名" class="user-name-box"/></li>

    <li class="search-ttl">性別</li>
    <li>
      <input type="radio" name=gender value=1 id="man"/>
      <label for="man">男</label>
    </li>
    <li>
      <input type="radio" name=gender value=2 id="weman"/>
      <label for="weman">女</label>
    </li>
    <li>
      <input type="radio" name=gender value=3 id="nonbinary"/>
      <label for="nonbinary">男女</label>
    </li>

    <li class="search-ttl">活動歴</li>
    <li>
      <input type="radio" name=activeHistory value=0 id="severalMonths"/>
      <label for="severalMonths">1年未満</label>
    </li>
    <li>
      <input type="radio" name=activeHistory value=1 id="1year"/>
      <label for="1year">1年以上</label>
    </li>
    <li>
      <input type="radio" name=activeHistory value=3 id="3year"/>
      <label for="3year">3年以上</label>
    </li>
    <li>
      <input type="radio" name=activeHistory value=5 id="5year"/>
      <label for="5year">5年以上</label>
    </li>
    <li>
      <input type="radio" name=activeHistory value=7 id="7year"/>
      <label for="7year">7年以上</label>
    </li>
    <li>
      <input type="radio" name=activeHistory value=9 id="9year"/>
      <label for="9year">9年以上</label>
    </li>
    <li>
      <input type="radio" name=activeHistory value=11 id="nonRequest"/>
      <label for="nonRequest">指定しない</label>
    </li>

    <li class="search-ttl">事務所</li>
    <li>
      <input type="checkbox" name="office" value=1 id="yoshimoto" class="checkbox"/>
      <label for="yoshimoto">吉本興業</label>
    </li>
    <li>
      <input type="checkbox" name="office" value=2 id="jinrikisha"/>
      <label for="jinrikisha">人力舎</label>
    </li>
    <li>
      <input type="checkbox" name="office" value=3 id="maseki"/>
      <label for="maseki">マセキ芸能社</label>
    </li>
    <li>
      <input type="checkbox" name="office" value=4 id="shochiku"/>
      <label for="shochiku">松竹芸能</label>
    </li>
    <li>
      <input type="checkbox" name="office" value=0 id="sonota"/>
      <label for="sonota">その他</label>
    </li>

    <li class="search-ttl">芸風</li>
    <li>
      <input type="checkbox" name="style" value=1 id="manzai"/>
      <label for="manzai">漫才</label>
    </li>
    <li>
      <input type="checkbox" name="style" value=2 id="pin"/>
      <label for="pin">ピン</label>
    </li>
    <li>
      <input type="checkbox" name="style" value=3 id="konto"/>
      <label for="konto">コント</label>
    </li>
    <li>
      <input type="checkbox" name="style" value=4 id="gyagu"/>
      <label for="gyagu">ギャグ</label>
    </li>
    <li>
      <input type="checkbox" name="style" value=5 id="monomane"/>
      <label for="monomane">モノマネ</label>
    </li>
    <li>
      <input type="checkbox" name="style" value=6 id="songMaterial"/>
      <label for="songMaterial">歌ネタ</label>
    </li>
    <li>
      <input type="checkbox" name="style" value=7 id="rhythmMaterial"/>
      <label for="rhythmMaterial">リズムネタ</label>
    </li>
    <li>
      <input type="checkbox" name="style" value=0 id="others"/>
      <label for="others">その他</label>
    </li>

    <li class="search-ttl">料金体系</li>
    <li>
      <select class="fee-box">
        <option></option>
        <option>時給</option>
        <option>出来高</option>
      </select>
    </li>

    <li class="search-ttl">金額</li>
    <li>
      <select class="money-box">
        <option>下限なし</option>
        <option>1,000円</option>
        <option>2,000円</option>
        <option>3,000円</option>
        <option>4,000円</option>
        <option>5,000円</option>
        <option>6,000円</option>
        <option>7,000円</option>
        <option>8,000円</option>
        <option>9,000円</option>
        <option>10,000円</option>
      </select>
      <span>～</span>
      <select class="money-box">
        <option>上限なし</option>
        <option>1,000円</option>
        <option>2,000円</option>
        <option>3,000円</option>
        <option>4,000円</option>
        <option>5,000円</option>
        <option>6,000円</option>
        <option>7,000円</option>
        <option>8,000円</option>
        <option>9,000円</option>
        <option>10,000円</option>
      </select>
    </li>

    <li class="search-ttl">特殊スキル</li>
    <li>
      <input type="checkbox" name="specialSkill" value=1 id="videoEdit"/>
      <label for="videoEdit">動画編集</label>
    </li>
    <li>
      <input type="checkbox" name="specialSkill" value=2 id="illustration"/>
      <label for="illustration">イラスト</label>
    </li>
    <li>
      <input type="checkbox" name="specialSkill" value=3 id="soundMake"/>
      <label for="soundMake">音源制作</label>
    </li>
    <li>
      <input type="checkbox" name="specialSkill" value=0 id="sonohoka"/>
      <label for="sonohoka">その他</label>
    </li>

    <li class="search-ttl">活動場所</li>
    <li>
      <select name=activePlace class="active-place">
        <option></option>
          <option value=hokkaido>北海道</option>
          <option value=tohoku>東北</option>
          <option value=kanto>関東</option>
          <option value=chubu>中部</option>
          <option value=kinki>近畿</option>
          <option value=chugoku・shikoku>中国・四国</option>
          <option value=kyushu>九州</option>
      </select>
    </li>

    <div>
      <button type="button" class="search-btn">絞り込み</button>
      <button type="button" class="search-btn">条件クリア</button>
    </div>
  </ul>
</main>
</template>

<style>
/* ヘッダー */
.user-header { 
    text-align: center;
    padding: 20px 0;
    background-color: #ffe1a9;
    position: relative;
    width: 100%;
}
.user-header > h2 {
    margin: auto;
    letter-spacing: 0.2em;
}
.logo {
    position: absolute;
    left: 40px;
    top: 18%;
    transform: translateY(-50%);
    padding: 4px 8px;
    border: 2px solid #ff8300;
    color: #ff8300;
    border-radius: 4px;
    font-weight: bold;
    font-size: 24px;
}

/* 全体 */
.main-content {
    display: flex;
    gap: 30px;
    justify-content: center;
    margin: 0 auto;
    padding: 12px;
}

/* ユーザー一覧 */
.sort-box > select {
    border-radius: 3px;
}
.sort-box {
    text-align: end;
}
.user-wrap {
    display: flex;
    margin-top: 20px;
    width: 500px;
    border: 2px solid #008000;
    border-radius: 10px;
}
.user-photo > img {
    width: 200px;
    padding: 12px;
}
.profile {
    list-style: none;
    margin: auto 0;
    padding: 0 12px;
}
.profile > li + li {
    margin-top: 12px;
}


/* 自由検索欄 */
.user-search-box {
    list-style: none;
    margin-top: 44px;
    padding: 10px 10px;
    background-color: #ffe1a9;
    width: 350px;
    border-radius: 6px;
}
.search-ttl {
    margin-top: 12px;
    margin-bottom: 8px;
    padding: 3px 0 3px 10px;
    font-weight: bold;
    border-left: 5px solid #6fba2c;
}
.user-search-box > li {
    margin-left: 10px;
}
.user-name-box {
    border-radius: 3px;
}
.fee-box {
    border-radius: 3px;
}
.money-box {
    border-radius: 3px;
}
.active-place {
    border-radius: 3px;
}
.search-btn {
    align-items: center;
    justify-content: center;
    margin-top: 14px;
    padding: 7px 20px;
    color: #fff;
    text-align: center;
    overflow-wrap: anywhere;
    background-color: #ff8300;
    border-radius: 18px;
    border: none;
    box-shadow: rgb(217, 217, 217) 0px 2px 1px;
}
.search-btn:hover {
    transition: background-color 0.2s;
    opacity: 0.8;
    cursor: pointer;
}
</style>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type ResponseData from "@/types/ResponseData";
import TopService from '@/services/TopService';
import type User from "@/types/User";

const demos = ref([] as User[])

const getData = async () => {
  TopService.getUserList()
  .then((response: ResponseData) => 
  {
    demos.value = response.data;
    console.log(response.data);
  });
};
onMounted(() => {
  getData();
})

</script>