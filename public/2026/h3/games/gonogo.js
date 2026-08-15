(function registerGoNoGo(registry) {
  registry.register({
    id:'gonogo',
    age:'child',
    title:'멈춰! 출발!',
    original:'Go / No-go',
    icon:'🚦',
    target:'충동 조절 · 주의집중',
    desc:'초록 신호에는 빠르게 누르고, 빨간 신호에는 잠깐 멈춰요.',
    research:{
      ko:'Go/No-Go 파라다임을 단순화한 과제로, 신경 전달 및 정보 처리 과정의 선천적·후천적 속도인 반응시간(Reaction Time)을 다룹니다.',
      en:'This activity simplifies the Go/No-Go paradigm and focuses on reaction time, reflecting innate and acquired differences in the speed of neural transmission and information processing.',
      zh:'本活动简化了Go/No-Go范式，主要考察反应时间，即神经传递与信息处理过程中先天和后天形成的速度差异。'
    },
    paper:'Vernon, P. A., Nador, S., & Kantor, L. (1985). Group differences in intelligence and speed of information-processing. Intelligence, 9(2), 137–148.',
    paperUrl:'https://psycnet.apa.org/record/1985-00269-001',
    type:'gonogo',
    instruction:()=>'초록 원은 누르고, 빨간 원은 기다리세요.',
    round(ctx) {
      const d=ctx.state.session.difficulty;
      const go=Math.random()>(d==='easy'?.25:d==='medium'?.38:.5);
      const conflicting=d==='hard'&&Math.random()>.45;
      const buttonText=conflicting?(go?'멈춤':'출발'):(go?'출발':'멈춤');
      ctx.$('#stage').innerHTML=`<div class="stage-inner"><h2>${d==='hard'?'글자가 아닌 원의 색에 반응하세요':go?'초록불! 빠르게 눌러요':'빨간불! 누르지 마세요'}</h2><button class="choice-btn" id="signal" style="width:180px;height:180px;border-radius:50%;font-size:42px;background:${go?'#77b879':'#e27667'}">${buttonText}</button><div class="feedback"></div></div>`;
      let acted=false;
      ctx.$('#signal').onclick=()=>{acted=true;ctx.answer(go,go?'':'빨간불에는 잠깐 멈춰요!');};
      const windowMs=d==='easy'?1800:d==='medium'?1250:1000;
      ctx.state.session.auto=setTimeout(()=>{if(!acted)ctx.answer(!go,go?'초록불에는 눌러주세요!':'멈추기 성공!');},windowMs);
    }
  });
})(window.DailyCogGames);
