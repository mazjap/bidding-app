let store = window.localStorage;
refresh();

class Bid {
    constructor(amount, playerId) {
        this.amount = amount;
        this.playerId = playerId;
    }
}

function getBids() {
    return JSON.parse(store.getItem("bids") ?? '[]');
}

function saveBids(arr) {
    store.setItem("bids", JSON.stringify(arr));
    refresh();
}

function placeBid(player) {
    let bids = getBids();

    const lastAmount = bids[bids.length - 1].amount;
    const amount = document.getElementById("text-" + player).value;

    if (amount > lastAmount) {
        bids.push(new Bid(amount, player));
        saveBids(bids);
    }
}

function refresh() {
    const first = document.getElementById("first");
    const list = document.getElementById("list");

    let bids = getBids();

    if (bids.length > 0) {
        first.innerText = bids[bids.length - 1].amount + " - Player " + bids[0].playerId;

        if (bids.length > 1) {
            let html = "";

            for (let i=bids.length - 2; i>-1; i--) {
                html += `<li>${bids[i].amount}</li>`;
            }
    
            list.innerHTML = html
        }
    }
}