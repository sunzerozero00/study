// 애니메이션 구간 = 스크롤 값으로 판단
// 눈에 보이는 구간만 애니메이션 처리
// 애니메이션에 필요한 정보 (ex. 스크롤 높이, 비디오 재생 시간, 애니메이션 타이밍 등)은 한 곳의 배열에 모아둠

// 전역 변수 사용을 피하기 위해 익명 함수 호출
(() => {

	let yOffset = 0; //window.pageYoffset 대신 쓸 변수
	let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합을 저장할 변수
	let currentScene = 0; // 현재 스크롤하고 있는 스크롤 섹션

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

		// 새로고침 했을 때 currentScene 반영
		yOffset = window.pageYOffset;

		let totalScrollHeight = 0;
		for (let i = 0; i < sceneInfo.length; i++) {
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if (totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}
		document.body.setAttribute('id', `show-scene-${currentScene}`);
	}

	function scrollLoop() { // 몇 번째 섹션에서 스크롤 중인지 계산하는 함수
		prevScrollHeight = 0; // 초기값은 항상 0으로 고정
		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight; // prevScrollHeight = 현재 활성화 된 스크롤 섹션보다 앞에 있는 스크롤 섹션들의 scrollHeight 합
		}

		if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) { // yOffset이 prevScrollHeight + 현재 활성화 된 스크롤 섹션의 scrollHeight 값까지 더해준 값보다 클 때 currentScene 인덱스 증가
			currentScene++;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}

		if (yOffset < prevScrollHeight) { //yOffset이 precScrollHeight보다 작으면 currentScene 인덱스 감소
			if(currentScene === 0) return; // IOS에서 바운스 효과로 currentScene이 마이너스가 되는 상황을 방지
			currentScene--;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}
	}
	
	window.addEventListener('scroll', () => { // 스크롤하면 기본적으로 실행할 함수
		yOffset = window.pageYOffset; // 사용의 용이성을 위해 변수 처리함
		scrollLoop();
	})
	window.addEventListener('load', setLayout); //윈도우가 로드될 때 함수 호출, DOMContentLoded도 가능하지만 모든 에셋 로드 후에 실행하기 위해서 load 사용
	window.addEventListener('resize', setLayout); //윈도우 크기 달라질 때마다 새로 적용

})();