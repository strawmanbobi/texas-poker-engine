/**
 * Created by dummy-team
 * 2017-10-21
 */

function rankKickers(cards, noOfCards, result) {
    var i, j, k;

    var basicCard = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    for (i = 0; i < noOfCards; i++) {
        var maxRank = 13;
        var maxCard = '2';
        var index = 0;
        for (j = 0; j < cards.length; j += 1) {
            for (k = 0; k < basicCard.length; k++) {
                if (cards[j][0] === basicCard[k] && k < maxRank) {
                    maxRank = k;
                    maxCard = cards[j];
                    index = j;
                    break;
                }
            }
        }
        result.push(maxCard);
        cards.splice(index, 1);
    }

}

function getCardByNumber(cards, number) {
    var result = "N/A";
    for (var i = 0; i < cards.length; i++) {
        if (cards[i][0] === number) {
            result = cards[i];
            cards.splice(i, 1);
            break;
        }
    }
    return result;
}

function getCardsByNumber(cards, data, result) {
    for (var i = 0; i < data.length; i++)
        result.push(getCardByNumber(cards, data[i]));
}

function getCardsByColor(cards, data, result) {
    for (var i = 0; i < data.length; i++)
        result.push(getCardByColor(cards, data[i]));

}

function getCardByColor(cards, color) {
    var result = "N/A";
    var index = 0;
    var maxRank = 22;
    var basicCard = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    for (var i = 0; i < cards.length; i++) {
        var rank = basicCard.indexOf(cards[i][0]);
        if (cards[i][1] == color && rank < maxRank) {
            index = i;
            maxRank = rank;
        }
    }
    result = cards[index];
    cards.splice(index, 1);
    return result;
}


function rankHandInt(handCards) {
    var rankCards, message, handRanks, handSuits, ranks, suits, cards, i, j, k;

    rankCards = [];
    message = '';
    handRanks = [];
    handSuits = [];

    for (i = 0; i < handCards.length; i += 1) {
        handRanks[i] = handCards[i].substr(0, 1);
        handSuits[i] = handCards[i].substr(1, 2);
    }

    ranks = handRanks.sort().toString().replace(/\W/g, '');
    suits = handSuits.sort().toString().replace(/\W/g, '');
    cards = handCards.toString();
    var basicCard = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    var basicColor = ['C', 'D', 'H', 'S'];

    // Four of a kind
    if (rankCards.length === 0) {
        for (i = 0; i < basicCard.length; i++) {
            var data = '';
            for (j = 0; j < 4; j++)
                data += basicCard[i];
            if (ranks.indexOf(data) > -1 && rankCards.length === 0) {
                getCardsByNumber(handCards, data, rankCards);
                rankKickers(handCards, 1, rankCards);
            }
        }

        if (rankCards.length !== 0) {
            message = 'Four of a kind';
        }
    }

    // Full House
    if (rankCards.length === 0) {
        for (i = 0; i < basicCard.length; i++) {
            var data = '';
            for (j = 0; j < 3; j++)
                data += basicCard[i];
            for (k = 0; k < basicCard.length; k++) {
                if (basicCard[k] === basicCard[i])
                    continue;
                var data2 = '';
                for (j = 0; j < 2; j++)
                    data2 += basicCard[k];
                if (ranks.indexOf(data) > -1 && ranks.indexOf(data2) > -1 && rankCards.length === 0) {
                    getCardsByNumber(handCards, data, rankCards);
                    getCardsByNumber(handCards, data2, rankCards);
                }
            }

        }

        if (rankCards.length !== 0) {
            message = 'Full House';
        }
    }

    // Flush
    if (rankCards.length === 0) {

        for (i = 4; i < basicCard.length; i++) {
            var t1 = basicCard[i - 4];
            var t2 = basicCard[i - 3];
            var t3 = basicCard[i - 2];
            var t4 = basicCard[i - 1];
            var t5 = basicCard[i];
            for (j = 0; j < basicColor.length; j++) {
                t1 += basicColor[j];
                t2 += basicColor[j];
                t3 += basicColor[j];
                t4 += basicColor[j];
                t5 += basicColor[j];
                if (cards.indexOf(t1) > -1 && cards.indexOf(t2) > -1 && cards.indexOf(t3) > -1 && cards.indexOf(t4) > -1 && cards.indexOf(t5) > -1 && rankCards.length === 0) {
                    rankCards.push(t1);
                    rankCards.push(t2);
                    rankCards.push(t3);
                    rankCards.push(t4);
                    rankCards.push(t5);

                }
            }
        }

        if (rankCards.length === 0) {
            for (i = 0; i < basicColor.length; i++) {
                var data = '';
                for (j = 0; j < 5; j++)
                    data += basicColor[i];
                if (suits.indexOf(data) > -1 && rankCards.length === 0) {
                    getCardsByColor(handCards, data, rankCards);
                    break;
                }
            }

        }

        if (rankCards.length !== 0) {
            message = 'Flush';
        }
    }


    // Straight
    if (rankCards.length === 0) {
        for (i = 4; i < basicCard.length; i++) {
            var t1 = basicCard[i - 4];
            var t2 = basicCard[i - 3];
            var t3 = basicCard[i - 2];
            var t4 = basicCard[i - 1];
            var t5 = basicCard[i];

            if (cards.indexOf(t1) > -1 && cards.indexOf(t2) > -1 && cards.indexOf(t3) > -1 && cards.indexOf(t4) > -1 && cards.indexOf(t5) > -1 && rankCards.length === 0) {
                var data = t1 + t2 + t3 + t4 + t5;
                getCardsByNumber(handCards, data, rankCards);

            }

        }

        if (cards.indexOf("A") > -1 && cards.indexOf("2") > -1 && cards.indexOf("3") > -1 && cards.indexOf("4") > -1 && cards.indexOf("5") > -1 && rankCards.length === 0) {
            var data = "A2345";
            getCardsByNumber(handCards, data, rankCards);

        }
        if (rankCards.length !== 0) {
            message = 'Straight';
        }
    }

    // Three of a kind
    if (rankCards.length === 0) {
        for (i = 0; i < basicCard.length; i++) {
            var data = '';
            for (j = 0; j < 3; j++)
                data += basicCard[i];
            if (ranks.indexOf(data) > -1 && rankCards.length === 0) {
                getCardsByNumber(handCards, data, rankCards);
                rankKickers(handCards, 2, rankCards);
            }
        }

        if (rankCards.length !== 0) {
            message = 'Three of a Kind';
        }
    }

    // Two pair
    if (rankCards.length === 0) {
        for (i = 0; i < basicCard.length; i++) {
            var data = '';
            for (j = 0; j < 2; j++)
                data += basicCard[i];
            for (k = 0; k < basicCard.length; k++) {
                if (basicCard[k] === basicCard[i])
                    continue;
                var data2 = '';
                for (j = 0; j < 2; j++)
                    data2 += basicCard[k];
                if (ranks.indexOf(data) > -1 && ranks.indexOf(data2) > -1 && rankCards.length === 0) {
                    getCardsByNumber(handCards, data, rankCards);
                    getCardsByNumber(handCards, data2, rankCards);
                    rankKickers(handCards, 1, rankCards);
                }
            }

        }

        if (rankCards.length !== 0) {
            message = 'Two Pair';
        }
    }

    // One Pair
    if (rankCards.length === 0) {
        for (i = 0; i < basicCard.length; i++) {
            var data = '';
            for (j = 0; j < 2; j++)
                data += basicCard[i];
            if (ranks.indexOf(data) > -1 && rankCards.length === 0) {
                getCardsByNumber(handCards, data, rankCards);
                rankKickers(handCards, 3, rankCards);
            }
        }

        if (rankCards.length !== 0) {
            message = 'Pair';
        }
    }

    // High Card
    if (rankCards.length === 0) {
        rankKickers(handCards, 5, rankCards);

        if (rankCards.length !== 0) {
            message = 'High Card';
        }
    }
    return rankCards;
}