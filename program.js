$(function () {
    // パンの種類と対応する値段を設定
    const pan_vec = {
      86:  ["シュガートースト"],
      118: ["塩バターパン", "揚げパン（ｼｭｶﾞｰ）", "カレーナン", "ミルクドーナツ"],
      129: ["バター香るメロンパン"],
      140: ["生キャラメル＆アーモンドロール", "アップルティーンパン", "豆乳バターのミニこしあんぱん"],
      162: ["フライドベーコンポテトパイ"],
      172: ["ココアチョコベーグル", "粗挽きミートのポロネーゼパン"],
      194: ["ピザパン", "ＮＹチーズケーキパイ"],
      216: ["ﾁｷﾝｶﾂ(ｶﾂﾐｿ)", "ベーコンペッパーピザ"],
      237: ["バジルソーセージパン"],
      492: ["管理栄養士監修弁当"]
    };
    let val_vec = [108, 129, 151, 118, 183,  194, 216, 492];
    let bal = 1200;
    let bal_max = bal + 100;

    for(let i of val_vec) {
      const listItem = `<li>${i}</li>`;
      document.getElementById('hyouji').insertAdjacentHTML('beforeend', listItem);
    }
    /*
    function save() {
      localStorage.setItem("Sample", JSON.stringify([a,b,c]));
    }
  
    function load() {
      var x = JSON.parse(localStorage.getItem("Sample"));
      a = x[0];
      b = x[1];
      c = x[2];
    }
    */
    $('.calbutton').click(function() {

      bal = ($("#bal_in").val());

      // ランク格納用のセット
      let rank_dw = new Set();
      let rank_up = new Set();

      // 組み合わせ生成関数
      function gene_comb(n, k, comb, start, sum) {
        if (comb.length > 0) sum += val_vec[comb[comb.length - 1] - 1];
        if (sum > bal_max) return;

        if (k === 0) {
            if (sum <= bal) {
                rank_dw.add({ sum, comb: [...comb] });
                if (rank_dw.size > 50) {
                    const minItem = [...rank_dw].reduce((min, item) => item.sum < min.sum ? item : min);
                    rank_dw.delete(minItem);
                }
            } else {
                rank_up.add({ sum, comb: [...comb] });
                if (rank_up.size > 50) {
                    const maxItem = [...rank_up].reduce((max, item) => item.sum > max.sum ? item : max);
                    rank_up.delete(maxItem);
                }
            }
            return;
        }

        for (let i = start; i <= n; ++i) {
            comb.push(i);
            gene_comb(n, k - 1, comb, i, sum);
            comb.pop();
        }
      }

      const n = val_vec.length;
      const max_k = 15;
      bal_max = bal + 100;
      let comb = [];

      for (let k = 1; k <= max_k; k++) {
        gene_comb(n, k, comb, 1, 0);
      }
  
      switch($(this).attr("id")) {
      case "out":
        // 出力
        let count_dw = rank_dw.size;
        console.log("「"+`${bal}`+"円での組み合わせ上位50選下位50選」");
        for (const item of [...rank_dw].sort((a, b) => a.sum - b.sum)) {
          console.log(`${count_dw} ${item.sum}円 ${item.comb.join(" ")}`);
          count_dw--;
        }

        console.log("  （中心）");
        let count_up = 1;
        for (const item of [...rank_up].sort((a, b) => a.sum - b.sum)) {
          console.log(`${count_up} ${item.sum}円 ${item.comb.join(" ")}`);
          count_up++;
        }
        break;
      case "add":

        break;
      case "remove":

        break;
      }
  
      //$("#hyouji").html();
      //save();
    });
    /*
    if(localStorage.getItem("Sample")) {
        load();
    }
    */
  
  });




