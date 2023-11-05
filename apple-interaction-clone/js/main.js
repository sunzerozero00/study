// 애니메이션 구간 = 스크롤 값으로 판단
// 눈에 보이는 구간만 애니메이션 처리
// 애니메이션에 필요한 정보 (ex. 스크롤 높이, 비디오 재생 시간, 애니메이션 타이밍 등)은 한 곳의 배열에 모아둠

// 전역 변수 사용을 피하기 위해 익명 함수 호출
(() => {

	const sceneInfo = [
		{
			// 0
			type: 'sticky', // 스크롤 애니메이션 타입 지정 'normal|sticky'
			heightNum: 5, // 각 섹션의 스크롤 높이를 브라우저 높이의 n배수로 설정(다양한 브라우저에 유연하게 대응 가능)
			scrollHeight: 0, // 스크롤 높이(애니메이션 구간 설정 및 애니메이션 속도 조절): 
											 // 각 섹션에서 얼만큼 스크롤할지 높이를 지정(높이가 길면 스크롤을 많이 하기 때문에 애니메이션이 느림 / 높이가 짧으면 스크롤을 조금만 해도 되기 때문에 애니메이션이 빠름)
			objs: { // 애니메이션을 적용할 HTML 요소를 모아둘 객체
				container: document.querySelector('#scroll-section-0'),
			}
		},
		{
			// 1
			type: 'normal',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1'),
			}
		},
		{
			// 2
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2'),
			}
		},
		{
			// 3
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3'),
			}
		},
	];

	function setLayout() {
		// 각 스크롤 섹션의 높이 세팅
		for (let i = 0; i < sceneInfo.length; i++) {
			sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; //scrollHeight 값 계산
			sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; // 계산한 scrollHeight 값을 html에 적용
			// template 문자열: ${변수}
		}
	}
	
	window.addEventListener('resize', setLayout); //윈도우 크기 달라질 때마다 새로 적용
	
	setLayout();

})();