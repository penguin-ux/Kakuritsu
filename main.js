// 初期状態
let rollCount = 0;  // 振った回数
let diceCount = 2;  // 最初のサイコロの数
let diceNumber = 6;  // 最初のサイコロの数

// サイコロを振るボタンのクリックイベント
document.getElementById('roll-button').addEventListener('click', function() {
  rollDice();
});

// SE音を再生する関数
function playSE(soundFile) {
  const audio = new Audio(soundFile);
  audio.play().catch(error => {
    console.error('音声の再生に失敗しました:', error);
  });
}

// サイコロを増やすボタンのクリックイベント
function addDiceButtonClick() {
  diceCount++;  // サイコロの数を増やす
  rollCount = 0;  // 振った回数をリセット
  document.getElementById('rollCount').textContent = rollCount;  // 振った回数を画面に反映

  diceNumber = diceNumber * 6;
  document.getElementById('diceNumber').textContent = diceNumber;  // 確率の分母を画面に反映

  // メッセージを消す
  document.getElementById('message-container').textContent = '';

  // SNSを消す
  document.getElementById('result-container').textContent = '';
  
  // 「サイコロを振る」ボタンを表示し直す
  document.getElementById('button-container').classList.remove('disabled');
  document.getElementById('roll-button').style.display = 'inline-block';  // ボタンを再表示
  
  // 「サイコロを増やす」ボタンを非表示にする
  document.getElementById('add-dice-container').innerHTML = '';

  // SE音を鳴らす
  playSE('決定ボタンを押す44.mp3');

}

// サイコロを振る関数
function rollDice() {
  rollCount++;  // 振った回数を増加
  document.getElementById('rollCount').textContent = rollCount;

  const diceContainer = document.getElementById('dice-container');
  diceContainer.innerHTML = '';  // サイコロの表示をクリア

  let diceValues = [];
  for (let i = 0; i < diceCount; i++) {
    const diceValue = Math.floor(Math.random() * 6) + 1;  // サイコロの目（1から6）
    diceValues.push(diceValue);
    const diceDiv = document.createElement('div');
    diceDiv.classList.add('dice');
    diceDiv.classList.add(`dice-${diceValue}`); // サイコロの目に応じたクラスを追加
    // サイコロの目に応じてドットを追加
    for (let j = 0; j < diceValue; j++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      diceDiv.appendChild(dot);
    }
    diceContainer.appendChild(diceDiv);
  }

  // SE音を鳴らす
  playSE('カーソル移動12.mp3');

  // ゾロ目が出た場合、サイコロの数を増やして振った回数をリセット
  if (new Set(diceValues).size === 1) {  // ゾロ目の判定
    // ゾロ目メッセージを表示
    document.getElementById('message-container').textContent = "おめでとうございます！";

    // 結果を表示する要素を取得
    var resultContainer = document.getElementById('result-container');

    // ゲームの結果とシェア用リンクを含めたHTMLを設定
    var tweetText = encodeURIComponent("1/"+ diceNumber + " を達成しました！\nサイコロを振った回数:" + rollCount + "回\n確率の限界\nURL");

    resultContainer.innerHTML =
    `<!-- Twitterリンク -->
    <a href="https://twitter.com/intent/tweet?text=${tweetText}" target="_blank" class="share-link">
      <img src="logo.svg" alt="Twitter" alt="X" class="social-icon">
    </a>`

    // 「サイコロを振る」ボタンを非表示にする
    document.getElementById('roll-button').style.display = 'none';  // ボタンを非表示にする

    // おめでとうSE音を鳴らす
    playSE('決定ボタンを押す4.mp3');

    // 「サイコロを増やす」ボタンがまだ表示されていない場合のみ表示する
    if (!document.getElementById('add-dice-button')) {
      const addDiceButton = document.createElement('button');
      addDiceButton.id = 'add-dice-button';
      addDiceButton.textContent = 'サイコロを増やす';
      addDiceButton.addEventListener('click', addDiceButtonClick);
      document.getElementById('add-dice-container').appendChild(addDiceButton);
    }
  }
}
