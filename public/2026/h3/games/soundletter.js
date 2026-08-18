(function registerSoundLetterBridge(registry) {
  const CONTENT={
    ko:{
      voice:'ko-KR',
      items:[
        {symbol:'가',spoken:'가',kind:'consonant',partA:'ㄱ',partB:'ㅏ',ending:'',word:'가지',picture:'🍆'},
        {symbol:'나',spoken:'나',kind:'consonant',partA:'ㄴ',partB:'ㅏ',ending:'',word:'나비',picture:'🦋'},
        {symbol:'강',spoken:'강',kind:'consonant',partA:'ㄱ',partB:'ㅏ',ending:'ㅇ',word:'강물',picture:'🏞️'},
        {symbol:'문',spoken:'문',kind:'consonant',partA:'ㅁ',partB:'ㅜ',ending:'ㄴ',word:'문',picture:'🚪'},
        {symbol:'별',spoken:'별',kind:'consonant',partA:'ㅂ',partB:'ㅕ',ending:'ㄹ',word:'별',picture:'⭐'},
        {symbol:'사',spoken:'사',kind:'consonant',partA:'ㅅ',partB:'ㅏ',ending:'',word:'사과',picture:'🍎'},
        {symbol:'차',spoken:'차',kind:'consonant',partA:'ㅊ',partB:'ㅏ',ending:'',word:'자동차',picture:'🚗'},
        {symbol:'집',spoken:'집',kind:'consonant',partA:'ㅈ',partB:'ㅣ',ending:'ㅂ',word:'집',picture:'🏠'},
        {symbol:'해',spoken:'해',kind:'consonant',partA:'ㅎ',partB:'ㅐ',ending:'',word:'해',picture:'☀️'},
        {symbol:'공',spoken:'공',kind:'consonant',partA:'ㄱ',partB:'ㅗ',ending:'ㅇ',word:'공',picture:'⚽'},
        {symbol:'책',spoken:'책',kind:'consonant',partA:'ㅊ',partB:'ㅐ',ending:'ㄱ',word:'책',picture:'📘'},
        {symbol:'눈',spoken:'눈',kind:'consonant',partA:'ㄴ',partB:'ㅜ',ending:'ㄴ',word:'눈',picture:'❄️'}
      ],
      lexical:[
        {text:'나비',real:true},{text:'사과',real:true},{text:'자동차',real:true},{text:'우산',real:true},{text:'바다',real:true},
        {text:'가무',real:false},{text:'버누',real:false},{text:'초딘',real:false},{text:'두팡',real:false},{text:'미존',real:false}
      ],
      sentences:[
        {text:'하늘에 별이 반짝여요.',target:'별'},{text:'빨간 사과를 한입 먹었어요.',target:'사과'},
        {text:'나비가 꽃 위에 앉았어요.',target:'나비'},{text:'자동차가 길을 달려요.',target:'자동차'},
        {text:'비가 와서 우산을 펼쳤어요.',target:'우산'},{text:'파란 공을 힘껏 찼어요.',target:'공'},
        {text:'재미있는 책을 읽었어요.',target:'책'},{text:'아침에 밝은 해가 떴어요.',target:'해'}
      ],
      labels:{first:'자음',second:'모음',yes:'받침 있음',no:'받침 없음',real:'실제 단어',pseudo:'가짜 단어'},
      prompts:{
        classify:['자음과 모음을 구별하세요','보이는 글자가 자음인지 모음인지 고르세요'],listen:['들리는 소리와 같은 글자를 고르세요','소리를 듣고 알맞은 글자를 찾아보세요'],
        ending:'이 글자에는 받침이 있나요?',blend:'자음과 모음을 합쳐 알맞은 음절을 고르세요',
        picture:'단어와 알맞은 그림을 연결하세요',lexical:'실제로 사용하는 단어인지 구별하세요',
        sentence:target=>`문장에서 “${target}”을 찾아보세요`,audioError:'이 브라우저에서 음성을 재생할 수 없어요.'
      }
    },
    en:{
      voice:'en-US',
      items:[
        {symbol:'B',spoken:'B',kind:'consonant',partA:'b',partB:'anana',ending:'a',word:'banana',picture:'🍌'},
        {symbol:'M',spoken:'M',kind:'consonant',partA:'m',partB:'oon',ending:'n',word:'moon',picture:'🌙'},
        {symbol:'S',spoken:'S',kind:'consonant',partA:'s',partB:'un',ending:'n',word:'sun',picture:'☀️'},
        {symbol:'A',spoken:'A',kind:'vowel',partA:'a',partB:'pple',ending:'e',word:'apple',picture:'🍎'},
        {symbol:'E',spoken:'E',kind:'vowel',partA:'e',partB:'gg',ending:'g',word:'egg',picture:'🥚'},
        {symbol:'H',spoken:'H',kind:'consonant',partA:'h',partB:'ouse',ending:'e',word:'house',picture:'🏠'},
        {symbol:'C',spoken:'C',kind:'consonant',partA:'c',partB:'at',ending:'t',word:'cat',picture:'🐱'},
        {symbol:'O',spoken:'O',kind:'vowel',partA:'o',partB:'range',ending:'e',word:'orange',picture:'🍊'},
        {symbol:'F',spoken:'F',kind:'consonant',partA:'f',partB:'ish',ending:'h',word:'fish',picture:'🐟'},
        {symbol:'T',spoken:'T',kind:'consonant',partA:'t',partB:'ree',ending:'e',word:'tree',picture:'🌳'},
        {symbol:'U',spoken:'U',kind:'vowel',partA:'u',partB:'mbrella',ending:'a',word:'umbrella',picture:'☂️'},
        {symbol:'I',spoken:'I',kind:'vowel',partA:'i',partB:'ce',ending:'e',word:'ice',picture:'🧊'}
      ],
      lexical:[
        {text:'butterfly',real:true},{text:'apple',real:true},{text:'car',real:true},{text:'window',real:true},{text:'garden',real:true},
        {text:'mippo',real:false},{text:'vabu',real:false},{text:'zindle',real:false},{text:'fepan',real:false},{text:'lompy',real:false}
      ],
      sentences:[
        {text:'The moon shines at night.',target:'moon'},{text:'I ate a red apple.',target:'apple'},
        {text:'A butterfly landed on the flower.',target:'butterfly'},{text:'The car moves down the road.',target:'car'},
        {text:'The fish swims in the water.',target:'fish'},{text:'A tall tree grows in the garden.',target:'tree'},
        {text:'I opened my umbrella in the rain.',target:'umbrella'},{text:'The ice feels very cold.',target:'ice'}
      ],
      labels:{first:'Consonant',second:'Vowel',yes:'Ends with a consonant',no:'Does not end with a consonant',real:'Real word',pseudo:'Made-up word'},
      prompts:{
        classify:['Tell consonants and vowels apart.','Decide whether the letter is a consonant or a vowel.'],listen:['Choose the letter that matches the sound.','Listen and find the matching letter.'],
        ending:'Does this word end with a consonant letter?',blend:'Blend the parts and choose the matching word.',
        picture:'Match the word with its picture.',lexical:'Decide whether this is a real word.',
        sentence:target=>`Find “${target}” in the sentence.`,audioError:'Audio playback is unavailable in this browser.'
      }
    },
    zh:{
      voice:'zh-CN',
      items:[
        {symbol:'妈',spoken:'妈',kind:'initial',partA:'m',partB:'a',tone:'1',word:'妈妈',picture:'👩'},
        {symbol:'马',spoken:'马',kind:'initial',partA:'m',partB:'a',tone:'3',word:'马',picture:'🐴'},
        {symbol:'花',spoken:'花',kind:'initial',partA:'h',partB:'ua',tone:'1',word:'花',picture:'🌸'},
        {symbol:'鱼',spoken:'鱼',kind:'initial',partA:'y',partB:'u',tone:'2',word:'鱼',picture:'🐟'},
        {symbol:'鸟',spoken:'鸟',kind:'initial',partA:'n',partB:'iao',tone:'3',word:'小鸟',picture:'🐦'},
        {symbol:'月',spoken:'月',kind:'initial',partA:'y',partB:'ue',tone:'4',word:'月亮',picture:'🌙'},
        {symbol:'猫',spoken:'猫',kind:'initial',partA:'m',partB:'ao',tone:'1',word:'小猫',picture:'🐱'},
        {symbol:'车',spoken:'车',kind:'initial',partA:'ch',partB:'e',tone:'1',word:'汽车',picture:'🚗'},
        {symbol:'狗',spoken:'狗',kind:'initial',partA:'g',partB:'ou',tone:'3',word:'小狗',picture:'🐶'},
        {symbol:'书',spoken:'书',kind:'initial',partA:'sh',partB:'u',tone:'1',word:'书',picture:'📘'},
        {symbol:'水',spoken:'水',kind:'initial',partA:'sh',partB:'ui',tone:'3',word:'水',picture:'💧'},
        {symbol:'山',spoken:'山',kind:'initial',partA:'sh',partB:'an',tone:'1',word:'山',picture:'⛰️'}
      ],
      lexical:[
        {text:'蝴蝶',real:true},{text:'苹果',real:true},{text:'汽车',real:true},{text:'花园',real:true},{text:'朋友',real:true},
        {text:'桌云',real:false},{text:'果车',real:false},{text:'书猫',real:false},{text:'月鞋',real:false},{text:'山杯',real:false}
      ],
      sentences:[
        {text:'月亮在夜空中发光。',target:'月亮'},{text:'我吃了一个红苹果。',target:'苹果'},
        {text:'蝴蝶停在花朵上。',target:'蝴蝶'},{text:'汽车在道路上行驶。',target:'汽车'},
        {text:'小狗在公园里奔跑。',target:'小狗'},{text:'我每天都会读一本书。',target:'书'},
        {text:'杯子里装着清水。',target:'水'},{text:'远处有一座高山。',target:'山'}
      ],
      labels:{first:'声母',second:'韵母',real:'真实词语',pseudo:'非词组合'},
      prompts:{
        classify:['区分声母和韵母。','判断看到的是声母还是韵母。'],listen:['选择与听到的声音对应的汉字。','听声音并找出对应的汉字。'],
        ending:'选择这个汉字的声调。',blend:'组合声母和韵母并选择正确的拼音。',
        picture:'将词语与正确图片配对。',lexical:'判断这是不是实际使用的词语。',
        sentence:target=>`在句子中找出“${target}”。`,audioError:'此浏览器无法播放语音。'
      }
    }
  };

  function language(ctx) {
    const selected=ctx.state.settings&&ctx.state.settings.language;
    return CONTENT[selected]||CONTENT.en;
  }

  function speak(ctx,text,content) {
    try{
      if(!window.speechSynthesis||typeof window.SpeechSynthesisUtterance!=='function')return;
      window.speechSynthesis.cancel();
      const utterance=new SpeechSynthesisUtterance(text);
      utterance.lang=content.voice;
      utterance.rate=ctx.state.session.difficulty==='hard'?.88:.7;
      window.speechSynthesis.speak(utterance);
    }catch(error){
      ctx.toast(content.prompts.audioError);
    }
  }

  function choiceCount(ctx) {
    return ctx.state.session.difficulty==='easy'?2:ctx.state.session.difficulty==='hard'?4:3;
  }

  function uniqueChoices(ctx,correct,values) {
    const wrong=ctx.shuffled(values.filter(value=>value!==correct)
      .filter((value,index,array)=>array.indexOf(value)===index));
    return ctx.shuffled([correct,...wrong.slice(0,choiceCount(ctx)-1)]).map(value=>({value,label:value}));
  }

  function sentenceWords(text,languageCode) {
    if(languageCode==='zh')return Array.from(text.replace(/[。！？]/g,''));
    return text.replace(/[.!?]/g,'').split(/\s+/);
  }

  const RECENT_SELECTIONS={
    ko:{},en:{},zh:{}
  };

  function nextDeckItem(ctx,languageCode,key,items) {
    const s=ctx.state.session;
    s.data.soundLetterDecks=s.data.soundLetterDecks||{};
    let deck=s.data.soundLetterDecks[key];
    if(!Array.isArray(deck)||!deck.length){
      deck=ctx.shuffled(items.map((item,index)=>index));
      const recent=RECENT_SELECTIONS[languageCode][key];
      if(deck.length>1&&deck[0]===recent){
        const first=deck[0];
        deck[0]=deck[1];
        deck[1]=first;
      }
      s.data.soundLetterDecks[key]=deck;
    }
    const index=deck.shift();
    RECENT_SELECTIONS[languageCode][key]=index;
    return items[index];
  }

  function promptFor(content,key,round,value) {
    const prompt=content.prompts[key];
    if(typeof prompt==='function')return prompt(value);
    if(Array.isArray(prompt))return prompt[(round-1)%prompt.length];
    return prompt;
  }

  registry.register({
    id:'soundletter',
    age:'adult',
    title:'소리 다리',
    original:'Sound bridge',
    icon:'🌉',
    target:'글자-소리 대응 · 단어 읽기',
    desc:'들리는 소리와 자음·모음·글자·음절·단어를 단계적으로 연결해요.',
    research:{
      ko:'Bradley와 Bryant의 연구를 바탕으로 음소(Phoneme)와 문자(Grapheme)를 연결합니다. 소리 분류, 글자-소리 대응과 음절 조합을 통해 음운 인식과 읽기 기초 능력을 다룹니다.',
      en:'Based on Bradley and Bryant’s work, this activity connects phonemes with graphemes. Sound categorization, letter–sound mapping, and blending engage phonological awareness and foundational reading skills.',
      zh:'本活动依据Bradley与Bryant的研究，把音素与字形相互连接。通过声音分类、字母—声音对应和音节组合，练习语音意识与基础阅读能力。'
    },
    paper:'Bradley, L., & Bryant, P. E. (1983). Categorizing sounds and learning to read—a causal connection. Nature, 301, 419–421.',
    paperUrl:'https://www.nature.com/articles/301419a0',
    type:'language',
    recommendationDomain:'language',
    measurements:['글자-소리 대응 정확도','음절 조합 정확도','실제 단어 판별률','단어 읽기속도','읽기 오류유형'],
    instruction:()=>'소리를 잘 듣고 알맞은 글자·음절·단어를 찾아보세요.',
    round(ctx) {
      const languageCode=ctx.state.settings&&ctx.state.settings.language||'en';
      const content=language(ctx),s=ctx.state.session,phase=(s.round-1)%7;
      const item=nextDeckItem(ctx,languageCode,'items',content.items);
      if(phase===0){
        const showFirst=s.round%2===1;
        const stimulus=languageCode==='zh'||languageCode==='ko'
          ? (showFirst?item.partA:item.partB)
          : item.symbol;
        const correct=languageCode==='zh'||languageCode==='ko'
          ? (showFirst?'first':'second')
          : (item.kind==='vowel'?'second':'first');
        ctx.choiceStage(promptFor(content,'classify',s.round),stimulus,[{value:'first',label:content.labels.first},{value:'second',label:content.labels.second}],correct);
        return;
      }
      if(phase===1){
        ctx.choiceStage(promptFor(content,'listen',s.round),'🔊',uniqueChoices(ctx,item.symbol,content.items.map(value=>value.symbol)),item.symbol);
        setTimeout(()=>s.finished||s.locked?null:speak(ctx,item.spoken,content),80);
        return;
      }
      if(phase===2){
        if(languageCode==='zh'){
          const tones=['1','2','3','4'].slice(0,choiceCount(ctx));
          if(!tones.includes(item.tone))tones[tones.length-1]=item.tone;
          const choices=ctx.shuffled(tones).map(tone=>({value:tone,label:`第${tone}声`}));
          ctx.choiceStage(promptFor(content,'ending',s.round),item.symbol,choices,item.tone);
        }else{
          const endsWithConsonant=languageCode==='ko'?Boolean(item.ending):!/^[aeiou]$/i.test(item.ending);
          ctx.choiceStage(promptFor(content,'ending',s.round),languageCode==='ko'?item.symbol:item.word,[{value:'yes',label:content.labels.yes},{value:'no',label:content.labels.no}],endsWithConsonant?'yes':'no');
        }
        return;
      }
      if(phase===3){
        const pieces=`${item.partA} + ${item.partB}${languageCode==='ko'&&item.ending?` + ${item.ending}`:''}`;
        const answer=languageCode==='ko'?item.symbol:languageCode==='zh'?`${item.partA}${item.partB}`:item.word;
        const values=content.items.map(value=>languageCode==='ko'?value.symbol:languageCode==='zh'?`${value.partA}${value.partB}`:value.word);
        ctx.choiceStage(promptFor(content,'blend',s.round),pieces,uniqueChoices(ctx,answer,values),answer);
        return;
      }
      if(phase===4){
        const candidates=ctx.shuffled([item,...ctx.shuffled(content.items.filter(value=>value!==item)).slice(0,choiceCount(ctx)-1)]);
        ctx.choiceStage(promptFor(content,'picture',s.round),item.word,candidates.map(value=>({value:value.word,label:value.picture})),item.word);
        return;
      }
      if(phase===5){
        const lexical=nextDeckItem(ctx,languageCode,'lexical',content.lexical);
        ctx.choiceStage(promptFor(content,'lexical',s.round),lexical.text,[{value:'real',label:content.labels.real},{value:'pseudo',label:content.labels.pseudo}],lexical.real?'real':'pseudo');
        return;
      }
      const sentence=nextDeckItem(ctx,languageCode,'sentences',content.sentences);
      const choices=languageCode==='zh'
        ? uniqueChoices(ctx,sentence.target,content.sentences.map(value=>value.target))
        : sentenceWords(sentence.text,languageCode).map(word=>({value:word,label:word}));
      const correct=languageCode==='zh'
        ? sentence.target
        : (choices.find(choice=>choice.value.includes(sentence.target))||{}).value;
      ctx.choiceStage(
        promptFor(content,'sentence',s.round,sentence.target),
        sentence.text,
        choices,
        correct
      );
    }
  });
})(window.DailyCogGames);
