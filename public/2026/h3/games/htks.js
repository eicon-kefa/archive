(function registerHtks(registry) {
  registry.register({
    id:'htks',
    age:'child',
    title:'반대로 움직이기',
    original:'HTKS · 신체 역반응 청각',
    icon:'🙌',
    target:'작업기억 · 억제 제어',
    desc:'들은 지시와 반대되는 동작을 골라 주의력과 자기조절을 연습해요.',
    research:{
      ko:'스트룹 효과와 반응 억제 과제의 원리를 바탕으로 합니다. 눈앞의 지시가 유도하는 우세 반응을 억제하고 의도적으로 반대 행동을 선택해야 하므로 집행기능의 핵심 요소인 억제 제어를 다룹니다.',
      en:'Based on Stroop-like conflict and response-inhibition tasks, this activity requires suppressing the dominant response prompted by an instruction and deliberately choosing the opposite action, engaging inhibitory control within executive function.',
      zh:'本活动基于类似斯特鲁普冲突和反应抑制任务的原理。玩家需要抑制指令引发的优势反应，并有意识地选择相反动作，主要涉及执行功能中的抑制控制。'
    },
    paper:'Diamond, A. (2013). Executive functions. Annual Review of Psychology, 64, 135–168.',
    paperUrl:'https://pmc.ncbi.nlm.nih.gov/articles/PMC4084861/',
    type:'opposite',
    instruction:()=>'말과 반대되는 동작을 선택하세요.',
    round(ctx) {
      const d=ctx.state.session.difficulty;
      const commands=[
        {prompt:'손을 올려요',direct:'🙌',directLabel:'올리기',opposite:'👇',oppositeLabel:'내리기'},
        {prompt:'오른쪽을 봐요',direct:'→',directLabel:'오른쪽',opposite:'←',oppositeLabel:'왼쪽'},
        {prompt:'일어나요',direct:'⬆',directLabel:'일어서기',opposite:'⬇',oppositeLabel:'앉기'}
      ];
      const pool=d==='easy'?commands.slice(0,2):commands;
      const first=pool[Math.floor(Math.random()*pool.length)];
      if(d!=='hard'){
        ctx.choiceStage('반대로 움직여요',`“${first.prompt}”`,ctx.shuffled([{value:'direct',label:first.directLabel},{value:'opposite',label:first.oppositeLabel}]),'opposite');
        return;
      }
      const second=commands.filter(item=>item!==first)[Math.floor(Math.random()*2)];
      const correct=`${first.opposite}${second.opposite}`;
      ctx.choiceStage('두 지시를 순서대로 반대로 하세요',`“${first.prompt}, 그리고 ${second.prompt}”`,ctx.shuffled([
        {value:`${first.opposite}${second.opposite}`,label:`${first.opposite} ${second.opposite}`},
        {value:`${first.direct}${second.opposite}`,label:`${first.direct} ${second.opposite}`},
        {value:`${first.opposite}${second.direct}`,label:`${first.opposite} ${second.direct}`},
        {value:`${first.direct}${second.direct}`,label:`${first.direct} ${second.direct}`}
      ]),correct);
    }
  });
})(window.DailyCogGames);
