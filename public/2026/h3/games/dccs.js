(function registerDccs(registry) {
  const COLORS={빨강:'#e36f5d',파랑:'#5989bd'};

  function shapeSvg(shape,color,variant) {
    const geometry=shape==='circle'
      ? `<circle cx="50" cy="50" r="32" fill="${color}"></circle>`
      : `<polygon points="50,18 82,82 18,82" fill="${color}"></polygon>`;
    return `<svg class="dccs-shape ${variant||''}" viewBox="0 0 100 100" aria-hidden="true">${geometry}</svg>`;
  }

  function optionLabel(shape,color,label) {
    return `<span class="dccs-choice">${shapeSvg(shape,color,'dccs-choice-shape')}<span>${label}</span></span>`;
  }

  registry.register({
    id:'dccs',
    age:'child',
    title:'바꿔서 분류하기',
    original:'DCCS · 차원 변경 카드 분류',
    icon:'🔴',
    target:'인지적 유연성',
    desc:'색깔 규칙과 모양 규칙을 번갈아 적용해 카드를 분류해요.',
    research:{
      ko:'위스콘신 카드 분류 검사(WCST)와 차원 변경 카드 분류(DCCS) 패러다임을 바탕으로 합니다. 색상 기준에서 모양 기준으로 규칙이 바뀔 때 새 규칙에 적응하는 인지 유연성과 집행기능을 다룹니다.',
      en:'Based on the WCST and DCCS paradigms, this activity asks the player to adapt when the sorting rule changes from color to shape, engaging cognitive flexibility and executive function.',
      zh:'本活动以威斯康星卡片分类测验和维度转换卡片分类范式为基础，要求玩家在分类规则由颜色变为形状时及时调整，主要涉及认知灵活性与执行功能。'
    },
    paper:'Zelazo, P. D. (2006). The Dimensional Change Card Sort (DCCS): a method of assessing executive function in children. Nature Protocols, 1, 297–301.',
    paperUrl:'https://www.nature.com/articles/nprot.2006.46',
    type:'classify',
    instruction:()=>'화면에 표시된 규칙에 맞는 답을 골라주세요.',
    round(ctx) {
      const s=ctx.state.session,d=s.difficulty;
      let rule;
      if(d==='easy')rule=s.round<=Math.ceil(s.total/2)?'색깔':'모양';
      else if(d==='medium')rule=Math.floor((s.round-1)/2)%2===0?'색깔':'모양';
      else rule=s.data.lastRule==='색깔'?'모양':'색깔';
      s.data.lastRule=rule;

      const color=Math.random()>.5?'빨강':'파랑';
      const shape=Math.random()>.5?'circle':'triangle';
      const correct=rule==='색깔'?color:(shape==='circle'?'동그라미':'세모');
      const choices=rule==='색깔'
        ?[
          {value:'빨강',label:optionLabel('circle',COLORS.빨강,'빨강')},
          {value:'파랑',label:optionLabel('circle',COLORS.파랑,'파랑')}
        ]
        :[
          {value:'동그라미',label:optionLabel('circle','#33294f','동그라미')},
          {value:'세모',label:optionLabel('triangle','#33294f','세모')}
        ];
      ctx.choiceStage(
        `${rule}별로 분류해요`,
        `<span class="dccs-stimulus">${shapeSvg(shape,COLORS[color],'dccs-main-shape')}</span>`,
        choices,
        correct
      );
    }
  });
})(window.DailyCogGames);
