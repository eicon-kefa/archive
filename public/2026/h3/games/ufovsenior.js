(function registerUfovSenior(registry) {
  const COLORS={
    coral:'#df6f67',
    blue:'#5f87d7',
    green:'#59a982'
  };
  const SHAPES=['circle','square','triangle','diamond'];
  const MARKS=['none','dot','line'];

  function tokenValue(token) {
    return `${token.shape}-${token.color}-${token.mark}`;
  }

  function tokenSvg(token,className) {
    const color=COLORS[token.color];
    const shape=token.shape==='circle'
      ?`<circle cx="50" cy="50" r="29" fill="${color}"></circle>`
      :token.shape==='square'
        ?`<rect x="21" y="21" width="58" height="58" rx="7" fill="${color}"></rect>`
        :token.shape==='triangle'
          ?`<polygon points="50,18 82,78 18,78" fill="${color}"></polygon>`
          :`<polygon points="50,15 85,50 50,85 15,50" fill="${color}"></polygon>`;
    const mark=token.mark==='dot'
      ?'<circle cx="50" cy="50" r="7" fill="#fff"></circle>'
      :token.mark==='line'
        ?'<path d="M35 50 H65" stroke="#fff" stroke-width="8" stroke-linecap="round"></path>'
        :'';
    return `<svg class="visual-search-token ${className||''}" viewBox="0 0 100 100" aria-hidden="true">${shape}${mark}</svg>`;
  }

  function universe(colors,shapes,marks) {
    const tokens=[];
    colors.forEach(color=>shapes.forEach(shape=>marks.forEach(mark=>tokens.push({color,shape,mark}))));
    return tokens;
  }

  registry.register({
    id:'ufovsenior',
    age:'senior',
    title:'빠른 포착',
    original:'Quick Glance',
    icon:'🔎',
    target:'선택적 주의 · 시각 탐색',
    desc:'비슷한 방해 항목 사이에서 목표의 색·모양·표시가 모두 같은 항목을 찾아요.',
    research:{
      ko:'트레이스만과 겔레이드의 특성 통합 이론에 근거한 시각 탐색 과제입니다. 색·모양 같은 특징을 결합해 불필요한 시각적 잡음 속 목표를 찾으며 선택적 주의집중을 다룹니다.',
      en:'This visual-search task is grounded in Treisman and Gelade’s feature-integration theory. Finding a target among visual noise by combining features such as color and shape engages selective attention.',
      zh:'该视觉搜索任务基于特雷斯曼与盖拉德的特征整合理论。玩家需要结合颜色、形状等特征，在视觉干扰中寻找目标，主要涉及选择性注意。'
    },
    paper:'Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. Cognitive Psychology, 12(1), 97–136.',
    paperUrl:'https://www.sciencedirect.com/science/article/abs/pii/0010028580900055?via%3Dihub',
    type:'search',
    instruction:()=>'위에 제시된 목표와 완전히 같은 항목을 방해 항목 사이에서 찾으세요.',
    round(ctx) {
      const difficulty=ctx.state.session.difficulty;
      const colors=difficulty==='easy'?['coral']:['coral','blue','green'];
      const shapes=difficulty==='easy'?SHAPES:SHAPES;
      const marks=difficulty==='hard'?MARKS:['none'];
      const itemCount=difficulty==='easy'?4:difficulty==='medium'?12:20;
      const tokens=universe(colors,shapes,marks);
      const target={...ctx.shuffled(tokens)[0]};
      const distractors=ctx.shuffled(tokens.filter(token=>tokenValue(token)!==tokenValue(target))).slice(0,itemCount-1);
      const choices=ctx.shuffled([target,...distractors]).map(token=>({
        value:tokenValue(token),
        label:tokenSvg(token,'search-choice-token')
      }));
      const stimulus=`<div class="visual-search-target"><span>찾을 목표</span>${tokenSvg(target,'search-target-token')}</div>`;

      ctx.choiceStage(
        '위 목표와 완전히 같은 항목을 찾으세요',
        stimulus,
        choices,
        tokenValue(target)
      );
    }
  });
})(window.DailyCogGames);
