import { ref } from 'vue'
import { defineStore } from 'pinia'
import {useItemStore} from "@/stores/itemStore.js";
import {useGameStore} from "@/stores/game.js";

export const useMoneyStore = defineStore('money', () => {
    const game = useGameStore();

    const money = ref(0)
    const totalMoney = ref(money.value);
    const debt = ref(1000000)

    const moneyDelta = ref(0.01)
    const moneyPerSec = ref(0.00)

    function Round(num) {
        return Math.round(num * 100) / 100
    }

    function Clamp(val, min, max) {
        return Math.max(Math.min(val, max), min)
    }

    function PayDebt() {
        if(money.value === 0) return;

        const moneyBuff = money.value;
        money.value = Round(money.value - Clamp(money.value, 0, debt.value));
        debt.value = Round(Clamp(debt.value - moneyBuff, 0, Infinity))

        if(debt.value === 0){
            game.EndGame(true);
        }
    }

    function AddMoney(amount) {
        const itemStore = useItemStore() // перемещено сюда
        const multiplier = itemStore.bought['Mr.Penis'] * itemStore.GetItem('Mr.Penis').modifier
        money.value += amount * Math.max(1, multiplier || 0)
        totalMoney.value += money.value
        money.value = Round(money.value)
        totalMoney.value = Round(totalMoney.value)
    }

    return {
        money,
        totalMoney,
        debt,
        moneyDelta,
        moneyPerSec,
        Round,
        Clamp,
        PayDebt,
        AddMoney,
    }
})
