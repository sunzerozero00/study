const dialogEl = document.querySelector(".dialog");
// const dialogEl = $('.dialog');
const openEl = document.querySelector(".btn-open");
// const openEl = $('.btn-open);
const closeEl = document.querySelector(".btn-close");
// const closeEl = $('.btn-open);

openEl.addEventListener("click", () => {
  // 예약어가 jQuery의 show와 동일하기 때문에 JS에서만 사용 가능함
  // dialogEl.show(); 일반 팝업
  dialogEl.showModal(); // 모달 팝업
});
// openEl.on('click', () => {});
// openEl.on('click', function(){});

closeEl.addEventListener("click", () => {
  dialogEl.close();
});
