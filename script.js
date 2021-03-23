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
    console.log(bids);

    const lastAmount = bids[bids.length - 1]?.amount ?? 0;
    const amount = Number(document.getElementById("text-" + player).value);

    if (amount > lastAmount) {
        let value;
        if (!isNaN(Number(amount))) {
            bids.push(new Bid(amount, player));
            saveBids(bids);
        } else {
            alert("Your input must be a number!");
        }
    }
}

function refresh() {
    const currentBid = document.getElementById("first");
    const bidList = document.getElementById("list");

    let bids = getBids();

    if (bids.length > 0) {
        currentBid.innerText = formatAmount(bids[bids.length - 1].amount) + " - Player " + bids[0].playerId;

        if (bids.length > 1) {
            let html = "";

            for (let i=bids.length - 2; i>-1; i--) {
                html += `<li>$${formatAmount(bids[i].amount)}</li>`;
            }
    
            bidList.innerHTML = html
        }
    }
}

function formatAmount(amount) {
    return (amount * 100 / 100).toFixed(2)
}