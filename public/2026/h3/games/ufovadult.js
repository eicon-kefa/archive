(function registerUfovAdult(registry) {
  const POSITIONS=[
    {key:'up-left',label:'왼쪽 위'},
    {key:'up',label:'위'},
    {key:'up-right',label:'오른쪽 위'},
    {key:'left',label:'왼쪽'},
    {key:'right',label:'오른쪽'},
    {key:'down-left',label:'왼쪽 아래'},
    {key:'down',label:'아래'},
    {key:'down-right',label:'오른쪽 아래'}
  ];
  const SYMBOLS=['●','▲','■','◆'];

  function choicesFor(ctx,symbols,positions,correctSymbol,correctPosition) {
    const correct=`${correctSymbol}|${correctPosition.key}`;
    const combinations=[];
    symbols.forEach(symbol=>positions.forEach(position=>{
      const value=`${symbol}|${position.key}`;
      if(value!==correct)combinations.push({value,label:`${symbol} · ${position.label}`});
    }));
    return ctx.shuffled([
      {value:correct,label:`${correctSymbol} · ${correctPosition.label}`},
      ...ctx.shuffled(combinations).slice(0,3)
    ]);
  }

  registry.register({
    id:'ufovadult',
    age:'adult',
    title:'표적 찾기',
    original:'Spot the target',
    icon:'◎',
    target:'처리 속도 · 유용 시야',
    desc:'중앙 기호와 주변 위치를 짧은 순간에 동시에 파악해 빠르게 결합해요.',
    research:{
      ko:'자극을 정확히 구별하는 데 필요한 최소 노출시간을 다루는 점검 시간(Inspection Time) 연구에 근거합니다. 매우 짧게 제시되는 중앙 기호와 주변 위치를 파악하며 시각 정보 수용과 초기 인지 처리속도를 다룹니다.',
      en:'Grounded in inspection-time research, this activity focuses on the minimum exposure needed to discriminate visual information. Brief central and peripheral cues engage visual intake and early cognitive processing speed.',
      zh:'本活动依据视觉检查时间研究，关注准确辨别视觉信息所需的最短呈现时间。短暂出现的中央符号与周边位置主要涉及视觉信息接收和早期认知处理速度。'
    },
    paper:'Deary, I. J., & Stough, C. (1996). Intelligence and inspection time: Achievements, prospects, and problems. American Psychologist, 51(6), 599–608.',
    paperUrl:'https://psycnet.apa.org/record/1996-04950-002',
    type:'ufov',
    instruction:()=>'잠깐 나타나는 중앙 기호와 주변 점 위치를 모두 기억하세요.',
    round(ctx) {
      const difficulty=ctx.state.session.difficulty;
      const symbols=difficulty==='easy'?SYMBOLS.slice(0,2):difficulty==='medium'?SYMBOLS.slice(0,3):SYMBOLS;
      const positions=difficulty==='easy'
        ?POSITIONS.filter(position=>['left','right'].includes(position.key))
        :difficulty==='medium'
          ?POSITIONS.filter(position=>['up','left','right','down'].includes(position.key))
          :POSITIONS;
      const symbol=symbols[Math.floor(Math.random()*symbols.length)];
      const position=positions[Math.floor(Math.random()*positions.length)];
      const exposure=difficulty==='easy'?1200:difficulty==='medium'?700:400;

      ctx.$('#stage').innerHTML=`<div class="stage-inner">
        <h2>중앙 기호와 주변 점을 한눈에 보세요</h2>
        <div class="ufov-speed-display">
          <div class="ufov-speed-grid">
            ${POSITIONS.map(item=>`<span class="speed-cell ${item.key}">${item.key===position.key?'<i>●</i>':''}</span>`).join('')}
            <strong class="speed-center">${symbol}</strong>
          </div>
        </div>
        <p>${Math.round(exposure/100)/10}초 후 사라집니다</p>
      </div>`;
      if(ctx.applyDisplaySettings)ctx.applyDisplaySettings();

      ctx.state.session.timer=setTimeout(()=>{
        const correct=`${symbol}|${position.key}`;
        ctx.choiceStage(
          '보았던 중앙 기호와 주변 점 위치를 함께 고르세요',
          '',
          choicesFor(ctx,symbols,positions,symbol,position),
          correct
        );
      },exposure);
    }
  });
})(window.DailyCogGames);
