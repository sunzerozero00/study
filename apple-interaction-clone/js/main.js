// 애니메이션 구간 = 스크롤 값으로 판단
// 눈에 보이는 구간만 애니메이션 처리
// 애니메이션에 필요한 정보 (ex. 스크롤 높이, 비디오 재생 시간, 애니메이션 타이밍 등)은 한 곳의 배열에 모아둠

// 전역 변수 사용을 피하기 위해 익명 함수 호출
(() => {

	let yOffset = 0; //window.pageYoffset 대신 쓸 변수
	let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합을 저장할 변수
	let currentScene = 0; // 현재 스크롤하고 있는 스크롤 섹션
	let enterNewScene = false; //새로운 scene이 시작된 순간 true

	const sceneInfo = [
		{
			// 0
			type: 'sticky', // 스크롤 애니메이션 타입 지정 'normal|sticky'
			heightNum: 5, // 각 섹션의 스크롤 높이를 브라우저 높이의 n배수로 설정(다양한 브라우저에 유연하게 대응 가능)
			scrollHeight: 0, // 스크롤 높이(애니메이션 구간 설정 및 애니메이션 속도 조절): 
											 // 각 섹션에서 얼만큼 스크롤할지 높이를 지정(높이가 길면 스크롤을 많이 하기 때문에 애니메이션이 느림 / 높이가 짧으면 스크롤을 조금만 해도 되기 때문에 애니메이션이 빠름)
			objs: { // 애니메이션을 적용할 HTML 요소를 모아둘 객체
				container: document.querySelector('#scroll-section-0'),
				messageA: document.querySelector('#scroll-section-0 .main-message.a'),
				messageB: document.querySelector('#scroll-section-0 .main-message.b'),
				messageC: document.querySelector('#scroll-section-0 .main-message.c'),
				messageD: document.querySelector('#scroll-section-0 .main-message.d'),
			},
			values: {
				messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
				messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
				messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
				messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
				messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
				messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
				messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
				messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
				messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
				messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
				messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
				messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
				messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
			}
		},
		{
			// 1
			type: 'normal',
			// heightNum: 5, //type normal에서는 필요 없음
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
				messageA: document.querySelector('#scroll-section-2 .a'),
				messageB: document.querySelector('#scroll-section-2 .b'),
				messageC: document.querySelector('#scroll-section-2 .c'),
				pinB: document.querySelector('#scroll-section-2 .b .pin'),
				pinC: document.querySelector('#scroll-section-2 .c .pin'),
			},
			values: {
				messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
				messageB_translateY_in: [20, 0, { start: 0.5, end: 0.55 }],
				messageC_translateY_in: [20, 0, { start: 0.72, end: 0.77 }],
				messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
				messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
				messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
				messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
				messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
				pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
				pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				pinB_opacity_out: [0, 1, { start: 0.58, end: 0.63 }],
				pinC_opacity_out: [0, 1, { start: 0.85, end: 0.9 }],
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
			if (sceneInfo[i].type === 'sticky') {
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; //scrollHeight 값 계산
			} else if (sceneInfo[i].type === 'normal') {
				sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
			}
			sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; // 계산한 scrollHeight 값을 html에 적용
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

	function calcValues(values, currentYOffset) {
		let rv;
		// 현재 스크롤 섹션에서 스크롤 된 범위를 비율로 구하기
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		let scrollRatio = currentYOffset / scrollHeight; // 현재 얼만큼 스크롤 되었는지 / 현재 씬의 전체의 범위

		// 애니메이션 값?
		if(values.length === 3) {
			// start ~ end 사이에 애니메이션 실행
			const partScrollStart = values[2].start * scrollHeight;
			const partScrollEnd = values[2].end * scrollHeight;
			const partScrollHeight = partScrollEnd - partScrollStart;

			if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) { // 스크롤이 구간 내에 있을 때
				rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0]; //부분 스크롤 범위의 비율

			} else if(currentYOffset < partScrollStart) { // 스크롤이 구간 전에 있을 때
				rv = values[0];
			} else if (currentYOffset > partScrollEnd) { // 스크롤이 구간 후에 있을 때
				rv = values[1];
			}
		} else {
			rv = scrollRatio * (values[1] - values[0]) + values[0]; // 현재 스크롤 섹션에서 스크롤 된 범위의 비율 * (끝값 - 초기값) + 초기값
		}

		return rv;
	}

	function playAnimation() {
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight; // 현재 스크롤 섹션 내에서 스크롤 된 높이
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;// 현재 스크롤 섹션 내에서 스크롤 된 높이 / 현재 씬의 scrollHeight

		switch (currentScene) {
			case 0:
				// console.log('0 play');
				if (scrollRatio <= 0.22) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.42) {
					// in
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.62) {
					// in
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.82) {
					// in
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
				}
				break;

			case 2: 
				// console.log('2 play');
				if (scrollRatio <= 0.25) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.57) {
					// in
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				}

				if (scrollRatio <= 0.83) {
					// in
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				}
				break;

			case 3: 
				// console.log('3 play');
				break;
		}
	}

	function scrollLoop() { // 몇 번째 섹션에서 스크롤 중인지 계산하는 함수
		enterNewScene = false;
		prevScrollHeight = 0; // 초기값은 항상 0으로 고정
		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight; // prevScrollHeight = 현재 활성화 된 스크롤 섹션보다 앞에 있는 스크롤 섹션들의 scrollHeight 합
		}

		if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) { // yOffset이 prevScrollHeight + 현재 활성화 된 스크롤 섹션의 scrollHeight 값까지 더해준 값보다 클 때 currentScene 인덱스 증가
			enterNewScene = true;
			currentScene++;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}

		if (yOffset < prevScrollHeight) { //yOffset이 precScrollHeight보다 작으면 currentScene 인덱스 감소
			enterNewScene = true;
			if(currentScene === 0) return; // IOS에서 바운스 효과로 currentScene이 마이너스가 되는 상황을 방지
			currentScene--;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}

		if (enterNewScene) return;

		playAnimation();
	}
	
	window.addEventListener('scroll', () => { // 스크롤하면 기본적으로 실행할 함수
		yOffset = window.pageYOffset; // 사용의 용이성을 위해 변수 처리함
		scrollLoop();
	})
	window.addEventListener('load', setLayout); //윈도우가 로드될 때 함수 호출, DOMContentLoded도 가능하지만 모든 에셋 로드 후에 실행하기 위해서 load 사용
	window.addEventListener('resize', setLayout); //윈도우 크기 달라질 때마다 새로 적용

})();