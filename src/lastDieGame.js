import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const BASE_AMOUNT = 10;
const AMOUNT_BEFORE_LAST_INTERACTION = 4;
const BASE_DIVIDABLE = 3;
const PLAYER_WIN = "player";
const COMPUTER_WIN = "computer";

class LeaveLastCoin extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            coinsLeft: BASE_AMOUNT,
            playerTurn: true
        }
    }


    render() {
        const winner = this.checkWinner(this.state.playerTurn);
        if (winner) {
            return this.renderWinner(winner);
        }

        if (!this.state.playerTurn) {
            this.computeTurn()
        }

        return (
            <div className="game-laslos">
                <div className="div-btns-game">

                    <button className="btn-game" onClick={() => {
                        this.userTriedToTakeCoins(1)
                    }}>Одну
                    </button>

                    <button className="btn-game" onClick={() => {
                        this.userTriedToTakeCoins(2)
                    }}>Две
                    </button>


                </div>

                <Scores currentAmount={this.state.coinsLeft}/>

                <Opponent currentStatus={this.getStatus()}/>


                {/*<p className="score-sign">{this.state.coinsLeft}</p>*/}

                {/*<p>{this.getStatus()}</p>*/}

            </div>
        );
    }

    getStatus() {
        if (this.state.coinsLeft === BASE_AMOUNT) {
            return "Ждет пока ты наконец начнешь"
        } else if (this.state.playerTurn) {
            return "Ждет соперника"
        } else {
            return "Думает..."
        }
    }

    userTriedToTakeCoins(amount) {
        if (this.state.playerTurn) {
            this.coinsTaken(amount)
        }
    }
    coinsTaken(amount) {
        const isPlayerTurn = !this.state.playerTurn;
        const coins = this.state.coinsLeft - amount;
        this.setState({
            coinsLeft: coins,
            playerTurn: isPlayerTurn

        });
    }

    checkWinner(playerTurn) {
        if (this.state.coinsLeft === 0 || this.state.coinsLeft === 1) {
            return playerTurn ? COMPUTER_WIN : PLAYER_WIN
        }
    }

    renderWinner(winner) {
        if (winner === PLAYER_WIN) {
            return (<div><p>Мои поздравляхи!</p> <button onClick={()=>{this.revenge()}}>Еще раз</button> </div>)
        } else {
            return <div>
                Ты всосал! Попробуешь еще?

                <div>
                    <button onClick={this.revenge()}>Да:)</button>
                    <button onClick={this.revenge()}>Нет:)</button>
                </div>
            </div>
        }
    }

    revenge() {
        this.setState({
            coinsLeft: BASE_AMOUNT
        })
    }

    computeTurn() {
        var x = 0;
        const coinsLeft = this.state.coinsLeft;
        if (coinsLeft > AMOUNT_BEFORE_LAST_INTERACTION) {
            const restCoins = coinsLeft - AMOUNT_BEFORE_LAST_INTERACTION;

            const restTillDividable = restCoins % BASE_DIVIDABLE;
            if (restTillDividable > 0) {
                x = restTillDividable
            } else {
                x = this.getRandomIntInclusive(1, 2)
            }
        } else {
            if (coinsLeft === AMOUNT_BEFORE_LAST_INTERACTION) {
                x = this.getRandomIntInclusive(1, 2)
            } else {
                x = coinsLeft - 1
            }
        }


        setTimeout(()=>{ this.coinsTaken(x) }, 1000);
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

class Scores extends React.Component {

    render() {

        return (
            <p className="score-sign">{this.props.currentAmount}</p>
        )
    }
}

class Opponent extends React.Component {

    render() {
        return (
            <p className="opponent-status">{this.props.currentStatus}</p>
        )
    }
}

export default LeaveLastCoin;

