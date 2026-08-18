// Daily Cog feature: shop
function totalEarnedStars() {
  return state.gameSessions.reduce((sum,item)=>sum+(Number(item.stars)||0),0);
}

function hasUnlimitedShopStars() {
  return Boolean(state.isAdmin);
}

function availableShopStars() {
  if(hasUnlimitedShopStars())return Infinity;
  return Math.max(0,totalEarnedStars()-(Number(state.shop.spent)||0));
}

function spendShopStars(amount) {
  if(!hasUnlimitedShopStars())state.shop.spent+=Number(amount)||0;
}

function selectedDogBreed() {
  return DOG_BREED;
}

function isDogFed() {
  return Number(state.shop.fedUntil)>Date.now();
}

function dogHungerAt() {
  const happinessEndedAt=Number(state.shop.fedUntil)||0;
  return happinessEndedAt?happinessEndedAt+DOG_HUNGER_DELAY_MS:0;
}

function isDogHungry() {
  const hungerAt=dogHungerAt();
  return !isDogFed()&&hungerAt>0&&Date.now()>=hungerAt;
}

function scheduleDogFedReset() {
  clearTimeout(dogFedResetTimer);
  dogFedResetTimer=null;
  if(!state.user)return;
  const now=Date.now();
  const nextChangeAt=isDogFed()?Number(state.shop.fedUntil):(!isDogHungry()?dogHungerAt():0);
  if(!nextChangeAt||nextChangeAt<=now)return;
  dogFedResetTimer=setTimeout(()=>{
    if(['dashboard','shop'].includes(state.screen))renderPreservingScroll();
    else scheduleDogFedReset();
  },Math.min(nextChangeAt-now+50,2147483647));
}

function dogGrowthInfo() {
  const stage=['baby','adult','final'].includes(state.shop.growthStage)?state.shop.growthStage:'baby';
  const isFinal=stage==='final';
  const isAdult=stage==='adult'||isFinal;
  const nextStage=stage==='baby'?'adult':stage==='adult'?'final':null;
  const upgradeCost=nextStage==='adult'?DOG_ADULT_UPGRADE_COST:nextStage==='final'?DOG_FINAL_UPGRADE_COST:0;
  const balance=availableShopStars();
  return {
    total:totalEarnedStars(),
    balance,
    isAdult,
    isFinal,
    stage,
    nextStage,
    upgradeCost,
    progress:isFinal?100:Math.min(100,Math.round(balance/upgradeCost*100)),
    remaining:isFinal?0:Math.max(0,upgradeCost-balance)
  };
}

function dogGrowthHtml(compact=false) {
  const growth=dogGrowthInfo();
  const balanceLabel=hasUnlimitedShopStars()?'∞':Math.min(growth.balance,growth.upgradeCost);
  const heading=growth.isFinal?'최종 성장 완료!':growth.isAdult?'성견 · 최종 업그레이드 준비':'아기 강아지 · 성견 업그레이드 준비';
  const detail=growth.isFinal
    ?'별 포인트를 사용해 최종 성장 단계를 해제했어요!'
    :growth.isAdult
      ?`최종 업그레이드까지 별 포인트 ${growth.remaining}개가 더 필요해요`
      :`성견 업그레이드까지 별 포인트 ${growth.remaining}개가 더 필요해요`;
  return `<div class="dog-growth ${compact?'compact':''} ${growth.isFinal?'final':growth.isAdult?'adult':''}">
    <div class="dog-growth-head"><span>${heading}</span><strong><span class="star-emoji compact" aria-hidden="true">⭐</span> ${growth.isFinal?'완료':hasUnlimitedShopStars()?balanceLabel:`${balanceLabel} / ${growth.upgradeCost}`}</strong></div>
    <div class="dog-growth-track" role="progressbar" aria-label="강아지 업그레이드 포인트" aria-valuemin="0" aria-valuemax="${growth.isFinal?100:growth.upgradeCost}" aria-valuenow="${growth.isFinal?100:Math.min(growth.balance,growth.upgradeCost)}"><i style="width:${growth.progress}%"></i></div>
    <small>${detail}</small>
  </div>`;
}

function dogUpgradeButtonHtml() {
  const growth=dogGrowthInfo();
  if(growth.isFinal)return `<button class="dog-upgrade-button complete" type="button" disabled>최종 성장 완료</button>`;
  const canUpgrade=growth.balance>=growth.upgradeCost;
  const label=growth.nextStage==='adult'?'성견으로 업그레이드':'최종 단계로 업그레이드';
  return `<button class="dog-upgrade-button" type="button" data-dog-upgrade ${canUpgrade?'':'disabled'}><span>${label}</span><strong><span class="star-emoji compact" aria-hidden="true">⭐</span> ${growth.upgradeCost}</strong></button>`;
}

async function upgradeDog() {
  const growth=dogGrowthInfo();
  if(growth.isFinal)return;
  if(growth.balance<growth.upgradeCost){toast('강아지를 업그레이드할 별 포인트가 부족해요.');return;}
  const message=hasUnlimitedShopStars()
    ?growth.nextStage==='adult'
      ?'관리자 무제한 별로 강아지를 성견으로 업그레이드할까요?'
      :'관리자 무제한 별로 강아지를 최종 성장 단계로 업그레이드할까요?'
    :growth.nextStage==='adult'
      ?`별 포인트 ${growth.upgradeCost}개를 사용해 강아지를 성견으로 업그레이드할까요?`
      :`별 포인트 ${growth.upgradeCost}개를 사용해 강아지를 최종 성장 단계로 업그레이드할까요?`;
  const localized=window.DailyCogI18n?window.DailyCogI18n.translate(message,state.settings.language):message;
  if(!window.confirm(localized))return;
  const previousShop=normalizeShopState(JSON.parse(JSON.stringify(state.shop)));
  state.shop.growthStage=growth.nextStage;
  spendShopStars(growth.upgradeCost);
  if(!await saveShopState()){state.shop=previousShop;renderPreservingScroll();return;}
  renderPreservingScroll();
  toast(growth.nextStage==='adult'?'강아지가 성견으로 성장했어요!':'강아지가 최종 성장 단계로 업그레이드됐어요!');
}

function babyNativeOutfitImage() {
  const hat=state.shop.equipped.hat||'none';
  const glasses=state.shop.equipped.glasses||'none';
  const scarf=state.shop.equipped.scarf||'none';
  if(hat==='gold_crown')return `assets/dog/baby/native/happy--gold_crown--${glasses}--${scarf}.png`;
  if(hat==='party_hat'&&glasses==='none'&&scarf==='none')return 'assets/dog/baby/native/happy--party_hat--none--none.png';
  if(glasses==='none'&&scarf==='none')return '';
  return `assets/dog/baby/native/happy--${glasses}--${scarf}.png`;
}

function dogAccessoriesHtml(stage, usesNativeBabyOutfit=false, forceOverlayAll=false) {
  if(stage==='final')return '';
  if(forceOverlayAll){
    return Object.entries(state.shop.equipped).map(([slot,id])=>{
      const item=SHOP_ITEMS.find(product=>product.id===id&&product.slot===slot);
      return item?`<img class="dog-accessory dog-${slot} item-${item.id}" src="assets/dog/accessories/${item.asset}" alt="" aria-hidden="true">`:'';
    }).join('');
  }
  if(stage==='baby'){
    if(!usesNativeBabyOutfit)return '';
    const hatId=state.shop.equipped.hat;
    if(hatId==='gold_crown')return '';
    if(hatId==='party_hat'&&!state.shop.equipped.glasses&&!state.shop.equipped.scarf)return '';
    const item=SHOP_ITEMS.find(product=>product.id===hatId&&product.slot==='hat');
    return item?`<img class="dog-accessory dog-hat item-${item.id}" src="assets/dog/accessories/${item.asset}" alt="" aria-hidden="true">`:'';
  }
  return Object.entries(state.shop.equipped).filter(([slot,id])=>slot!=='scarf'&&!['sunglasses','round_glasses','gold_crown'].includes(id)).map(([slot,id])=>{
    const item=SHOP_ITEMS.find(product=>product.id===id&&product.slot===slot);
    return item?`<img class="dog-accessory dog-${slot} item-${item.id}" src="assets/dog/accessories/${item.asset}" alt="" aria-hidden="true">`:'';
  }).join('');
}

function dogOutfitImage(image, stage) {
  const hungry=/daily-cog-(?:dog|puppy)-hungry\.png$/.test(image);
  const scarf=state.shop.equipped.scarf||'none';
  const glasses=state.shop.equipped.glasses||'none';
  const hat=state.shop.equipped.hat||'none';
  const mood=hungry?'hungry':(image.match(/daily-cog-dog-(calm|happy|celebrate)\.png$/)||[])[1];
  if(stage==='final'&&mood){
    return `assets/dog/final/outfits/${mood}--${hat}--${glasses}--${scarf}.webp`;
  }
  if(hungry){
    if(stage==='baby')return 'assets/dog/baby/daily-cog-puppy-hungry.png';
    return 'assets/dog/daily-cog-dog-hungry.png';
  }
  const hasCrown=state.shop.equipped.hat==='gold_crown';
  if(!mood)return image;
  if(stage==='baby'){
    const nativeOutfit=babyNativeOutfitImage();
    if(nativeOutfit)return nativeOutfit;
    return `assets/dog/baby/outfits/${mood}--${hat||'none'}--${glasses||'none'}--${scarf||'none'}.webp`;
  }
  const scarfName=['lavender_scarf','star_scarf'].includes(scarf)?scarf.replaceAll('_','-'):'';
  if(hasCrown||glasses==='round_glasses'){
    const parts=[mood];
    if(scarfName)parts.push(scarfName);
    if(['sunglasses','round_glasses'].includes(glasses))parts.push(glasses.replaceAll('_','-'));
    if(hasCrown)parts.push('crown');
    return `assets/dog/composed/${parts.join('-')}.webp`;
  }
  if(glasses==='sunglasses'){
    const outfit=scarfName?`${scarfName}-sunglasses`:'sunglasses';
    return `assets/dog/outfits/${mood}-${outfit}.png`;
  }
  return scarfName?`assets/dog/outfits/${mood}-${scarfName}.png`:image;
}

function dogCharacterHtml(image, extraClass='') {
  const growth=dogGrowthInfo();
  const hungry=/daily-cog-(?:dog|puppy)-hungry\.png$/.test(image);
  const equippedCount=Object.keys(SHOP_SLOTS).filter(slot=>state.shop.equipped[slot]).length;
  const stageLabel=growth.isFinal?'최종 성장 강아지':growth.isAdult?'성견':'아기 강아지';
  const usesNativeBabyOutfit=!hungry&&growth.stage==='baby'&&Boolean(babyNativeOutfitImage());
  return `<div class="dog-character breed-retriever stage-${growth.stage} ${usesNativeBabyOutfit?'baby-native-outfit':''} combo-${equippedCount} ${isDogFed()?'dog-fed':''} ${hungry?'dog-hungry':''} ${extraClass}"><img class="dog-base" src="${dogOutfitImage(image,growth.stage)}" alt="${DOG_BREED.name} ${stageLabel}${hungry?' 배고픈':''} Daily Cog 강아지 캐릭터">${dogAccessoriesHtml(growth.stage,usesNativeBabyOutfit,hungry)}${isDogFed()?'<span class="fed-heart" aria-hidden="true">♥</span><span class="fed-spark" aria-hidden="true">✦</span>':''}</div>`;
}

async function saveShopState() {
  state.shop=normalizeShopState(state.shop);
  if(!SUPABASE_ENABLED){persistCurrentLocalAccount();return true;}
  const result=await db.from('profiles').update({
    shop_state:state.shop,
    updated_at:new Date().toISOString()
  }).eq('id',state.user.id);
  if(result.error){console.error(result.error);toast('상점 정보를 저장하지 못했습니다.');return false;}
  return true;
}

async function selectShopItem(itemId) {
  const item=SHOP_ITEMS.find(product=>product.id===itemId);
  if(!item)return;
  const previousShop=normalizeShopState(JSON.parse(JSON.stringify(state.shop)));
  const owned=state.shop.owned.includes(item.id);
  if(!owned){
    if(availableShopStars()<item.price){toast('별이 부족해요. 게임을 완료해 별을 모아보세요!');return;}
    state.shop.owned.push(item.id);
    spendShopStars(item.price);
    state.shop.equipped[item.slot]=item.id;
    if(!await saveShopState()){state.shop=previousShop;renderPreservingScroll();return;}
    renderPreservingScroll();
    toast(`${item.name} 구매 완료! 바로 착용했어요.`);
    return;
  }
  if(state.shop.equipped[item.slot]===item.id){
    delete state.shop.equipped[item.slot];
    if(!await saveShopState()){state.shop=previousShop;renderPreservingScroll();return;}
    renderPreservingScroll();
    toast(`${item.name}을 벗었어요.`);
    return;
  }
  state.shop.equipped[item.slot]=item.id;
  if(!await saveShopState()){state.shop=previousShop;renderPreservingScroll();return;}
  renderPreservingScroll();
  toast(`${item.name}을 착용했어요.`);
}

async function buyDogTreat(treatId) {
  const treat=DOG_TREATS.find(item=>item.id===treatId);
  if(!treat)return;
  if(availableShopStars()<treat.price){toast('별이 부족해요. 게임을 완료해 별을 모아보세요!');return;}
  const previousShop=normalizeShopState(JSON.parse(JSON.stringify(state.shop)));
  state.shop.treats[treat.id]=(state.shop.treats[treat.id]||0)+1;
  spendShopStars(treat.price);
  if(!await saveShopState()){state.shop=previousShop;renderPreservingScroll();return;}
  renderPreservingScroll();
  toast(`${treat.name}을 구매했어요!`);
}

async function feedDogTreat(treatId) {
  const treat=DOG_TREATS.find(item=>item.id===treatId);
  if(!treat||!state.shop.treats[treat.id])return;
  const previousShop=normalizeShopState(JSON.parse(JSON.stringify(state.shop)));
  state.shop.treats[treat.id]-=1;
  state.shop.lastTreat=treat.id;
  state.shop.fedUntil=Date.now()+treat.minutes*60*1000;
  if(!await saveShopState()){state.shop=previousShop;renderPreservingScroll();return;}
  renderPreservingScroll();
  toast(`${treat.name}을 맛있게 먹고 더 행복해졌어요!`);
}

function renderShop() {
  const balance=availableShopStars(),unlimitedStars=hasUnlimitedShopStars(),ownedCount=state.shop.owned.length,breed=selectedDogBreed(),fed=isDogFed(),hungry=isDogHungry();
  const previewImage=fed?'assets/dog/daily-cog-dog-celebrate.png':hungry?'assets/dog/daily-cog-dog-hungry.png':'assets/dog/daily-cog-dog-happy.png';
  app.innerHTML=`<div class="shell">${header()}<section class="dashboard shop-page">
    <div class="shop-head">
      <div><span class="step-label">DOG BOUTIQUE</span><h1>강아지 친구</h1><p>별로 장식과 맛있는 간식을 구매해 골든 리트리버 학습 친구를 돌봐주세요.</p></div>
      <div class="shop-wallet ${unlimitedStars?'unlimited':''}"><span>사용 가능한 별</span><strong><span class="star-emoji compact" aria-hidden="true">⭐</span> ${unlimitedStars?'∞':balance}</strong><small>${unlimitedStars?'관리자 무제한 별':`누적 ${totalEarnedStars()} · 사용 ${state.shop.spent}`}</small></div>
    </div>
    <div class="shop-layout">
      <aside class="shop-preview">
        <span class="step-label">MY DAILY COG</span>
        <h2>${escapeHtml(state.user.name)}님의 학습 친구</h2>
        ${dogCharacterHtml(previewImage,'shop-dog')}
        ${dogGrowthHtml()}
        ${dogUpgradeButtonHtml()}
        <div class="dog-care-status ${fed?'full':hungry?'hungry':''}"><span>${fed?'♥ 배부르고 행복해요!':hungry?'♡ 배가 고파요':'♡ 간식을 기다리고 있어요'}</span><small>${breed.name}${fed&&state.shop.lastTreat?` · ${DOG_TREATS.find(item=>item.id===state.shop.lastTreat).name}`:hungry?' · 간식을 먹여주세요':''}</small></div>
        <div class="equipped-list">${Object.entries(SHOP_SLOTS).map(([slot,label])=>{
          const item=SHOP_ITEMS.find(product=>product.id===state.shop.equipped[slot]);
          return `<span><b>${label}</b>${item?item.name:'착용 안 함'}</span>`;
        }).join('')}</div>
        <p>선택한 장식과 간식 효과는 홈 화면에도 바로 적용돼요.</p>
      </aside>
      <section class="shop-catalog">
        <div class="shop-catalog-head"><div><span class="step-label">MY PET SHOP</span><h2>간식</h2></div><span>골든 리트리버 전용</span></div>
        <div class="shop-category treat-category">
          <h3>강아지 간식</h3>
          <p class="category-copy">간식을 구매해 먹이면 강아지가 배부르고 더 행복해져요.</p>
          <div class="treat-items">${DOG_TREATS.map(item=>{
            const count=state.shop.treats[item.id]||0,canBuy=balance>=item.price;
            return `<article class="treat-item">
              <div class="treat-icon">${item.asset?`<img src="assets/dog/treats/${item.asset}" alt="${item.name}">`:`<span>${item.icon}</span>`}<i>${count}개 보유</i></div>
              <div class="treat-info"><h4>${item.name}</h4><p>${item.desc} · 행복 ${item.minutes}분</p><strong><span class="star-emoji compact" aria-hidden="true">⭐</span> ${item.price}</strong></div>
              <div class="treat-actions"><button data-buy-treat="${item.id}" ${!canBuy?'disabled':''}>${canBuy?'구매하기':'별 부족'}</button><button data-feed-treat="${item.id}" ${!count?'disabled':''}>먹이기</button></div>
            </article>`;
          }).join('')}</div>
        </div>
        <div class="shop-catalog-head accessory-heading"><div><span class="step-label">ACCESSORIES</span><h2>장식 아이템</h2></div><span>${ownedCount} / ${SHOP_ITEMS.length} 보유</span></div>
        ${Object.entries(SHOP_SLOTS).map(([slot,label])=>`<div class="shop-category">
          <h3>${label}</h3>
          <div class="shop-items">${SHOP_ITEMS.filter(item=>item.slot===slot).map(item=>{
            const owned=state.shop.owned.includes(item.id),equipped=state.shop.equipped[item.slot]===item.id,canBuy=balance>=item.price;
            return `<article class="shop-item ${owned?'owned':''} ${equipped?'equipped':''}">
              <div class="shop-item-icon"><img src="${item.previewAsset||`assets/dog/accessory-previews/${item.id}.webp`}" alt="${item.name} 상품 이미지">${owned?'<i>✓ 보유</i>':''}</div>
              <div class="shop-item-info"><span>${SHOP_SLOTS[item.slot]}</span><h4>${item.name}</h4><strong><span class="star-emoji compact" aria-hidden="true">⭐</span> ${item.price}</strong></div>
              <button data-shop-item="${item.id}" ${!owned&&!canBuy?'disabled':''}>${equipped?'벗기':owned?'착용하기':canBuy?'구매하기':'별 부족'}</button>
            </article>`;
          }).join('')}</div>
        </div>`).join('')}
      </section>
    </div>
  </section></div>`;
  $$('[data-shop-item]').forEach(button=>button.onclick=()=>selectShopItem(button.dataset.shopItem));
  $$('[data-buy-treat]').forEach(button=>button.onclick=()=>buyDogTreat(button.dataset.buyTreat));
  $$('[data-feed-treat]').forEach(button=>button.onclick=()=>feedDogTreat(button.dataset.feedTreat));
  $$('[data-dog-upgrade]').forEach(button=>button.onclick=upgradeDog);
}
